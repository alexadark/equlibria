'use client';

import { definePlugin } from 'sanity';
import { Tag } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Card,
  Stack,
  Text,
  Button,
  Checkbox,
  Box,
  Flex,
  Spinner,
  Label,
} from '@sanity/ui';
import { useClient } from 'sanity';

interface GalleryImageDocument {
  _id: string;
  documentId: string;
  documentTitle: string;
  documentType: string;
  blockKey: string;
  imageIndex: number;
  imageUrl: string;
  caption?: string;
  currentTags: string[];
}

interface GalleryTag {
  _id: string;
  title: string;
  slug: { current: string };
}

function BulkTagGalleryTool() {
  const client = useClient({ apiVersion: '2024-10-31' });
  const [images, setImages] = useState<GalleryImageDocument[]>([]);
  const [availableTags, setAvailableTags] = useState<GalleryTag[]>([]);
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchGalleryImages = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch all documents with blocks field (pages, projects, etc.)
      const query = `*[defined(blocks) && count(blocks[_type == "gallery-lightbox"]) > 0] {
        _id,
        _type,
        title,
        name,
        "galleryBlocks": blocks[_type == "gallery-lightbox"]{
          _key,
          title,
          images[]{
            _key,
            image{
              asset->{
                _id,
                url
              }
            },
            caption,
            tags[]->{
              _id,
              title
            }
          }
        }
      }`;

      const results = await client.fetch(query);
      const imageDocuments: GalleryImageDocument[] = [];

      for (const doc of results) {
        if (Array.isArray(doc.galleryBlocks) && doc.galleryBlocks.length > 0) {
          for (const block of doc.galleryBlocks) {
            if (Array.isArray(block.images) && block.images.length > 0) {
              for (let i = 0; i < block.images.length; i++) {
                const img = block.images[i];
                if (img?.image?.asset?.url) {
                  const blockTitle = block.title ? ` - ${block.title}` : '';
                  imageDocuments.push({
                    _id: `${doc._id}-${block._key}-${i}`,
                    documentId: doc._id,
                    documentTitle: `${doc.title || doc.name || 'Untitled'}${blockTitle}`,
                    documentType: doc._type,
                    blockKey: block._key,
                    imageIndex: i,
                    imageUrl: img.image.asset.url,
                    caption: img.caption,
                    currentTags: img.tags?.map((t: any) => t._id) || [],
                  });
                }
              }
            }
          }
        }
      }

      setImages(imageDocuments);

      // Fetch available tags
      const tagsQuery = `*[_type == "gallery-tag"] | order(title asc) {
        _id,
        title,
        slug
      }`;
      const tags = await client.fetch(tagsQuery);
      setAvailableTags(tags);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to fetch gallery images'
      );
      console.error('Error fetching gallery images:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const toggleImage = (id: string) => {
    const newSelected = new Set(selectedImages);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedImages(newSelected);
  };

  const toggleAllImages = () => {
    if (selectedImages.size === images.length) {
      setSelectedImages(new Set());
    } else {
      setSelectedImages(new Set(images.map((img) => img._id)));
    }
  };

  const toggleTag = (tagId: string) => {
    const newSelected = new Set(selectedTags);
    if (newSelected.has(tagId)) {
      newSelected.delete(tagId);
    } else {
      newSelected.add(tagId);
    }
    setSelectedTags(newSelected);
  };

  const applyTags = async () => {
    if (selectedImages.size === 0 || selectedTags.size === 0) {
      setError('Please select both images and tags to apply');
      return;
    }

    setApplying(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const selectedImageData = images.filter((img) =>
        selectedImages.has(img._id)
      );
      const tagReferences = Array.from(selectedTags).map((tagId) => ({
        _type: 'reference',
        _ref: tagId,
        _key: `tag-${tagId}`,
      }));

      // Group images by document for efficient patching
      const imagesByDocument = new Map<string, GalleryImageDocument[]>();
      for (const img of selectedImageData) {
        if (!imagesByDocument.has(img.documentId)) {
          imagesByDocument.set(img.documentId, []);
        }
        imagesByDocument.get(img.documentId)!.push(img);
      }

      let successCount = 0;

      for (const [documentId, docImages] of imagesByDocument.entries()) {
        // Fetch the full document
        const doc = await client.getDocument(documentId);
        if (!doc || !Array.isArray(doc.blocks)) continue;

        // Create patches for each image
        const patches: any = {};

        for (const img of docImages) {
          const blockIndex = doc.blocks.findIndex(
            (b: any) => b._key === img.blockKey
          );
          if (blockIndex === -1) continue;

          const block = doc.blocks[blockIndex];
          if (!Array.isArray(block.images)) continue;

          // Get existing tags and merge with new ones
          const existingTags = block.images[img.imageIndex]?.tags || [];
          const existingTagIds = new Set(
            existingTags.map((t: any) => t._ref).filter(Boolean)
          );

          // Add new tags that don't already exist
          const mergedTags = [...existingTags];
          for (const tagRef of tagReferences) {
            if (!existingTagIds.has(tagRef._ref)) {
              mergedTags.push(tagRef);
            }
          }

          patches[`blocks[${blockIndex}].images[${img.imageIndex}].tags`] =
            mergedTags;
        }

        // Apply all patches to the document at once
        if (Object.keys(patches).length > 0) {
          await client.patch(documentId).set(patches).commit();
          successCount += docImages.length;
        }
      }

      setSuccessMessage(
        `Successfully applied ${selectedTags.size} tag(s) to ${successCount} image(s)!`
      );
      setSelectedImages(new Set());
      setSelectedTags(new Set());

      // Refresh the list
      setTimeout(() => {
        fetchGalleryImages();
      }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to apply tags');
      console.error('Error applying tags:', err);
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <Card padding={4}>
        <Flex align="center" justify="center" style={{ minHeight: '200px' }}>
          <Spinner />
        </Flex>
      </Card>
    );
  }

  return (
    <Card padding={4}>
      <Stack space={4}>
        <Box>
          <Text size={3} weight="bold">
            Bulk Tag Gallery Images
          </Text>
          <Text size={1} muted style={{ marginTop: '0.5rem' }}>
            Select multiple gallery images and apply tags to them at once
          </Text>
        </Box>

        {error && (
          <Card tone="critical" padding={3}>
            <Text>{error}</Text>
          </Card>
        )}

        {successMessage && (
          <Card tone="positive" padding={3}>
            <Text weight="bold">✓ {successMessage}</Text>
          </Card>
        )}

        {availableTags.length === 0 ? (
          <Card padding={4} tone="caution" border>
            <Stack space={3}>
              <Text align="center" weight="bold">
                No gallery tags found
              </Text>
              <Text align="center" size={1} muted>
                Please create gallery tags first before tagging images. Go to
                Content → Gallery Tags to create new tags.
              </Text>
            </Stack>
          </Card>
        ) : images.length === 0 ? (
          <Card padding={4} tone="transparent" border>
            <Text align="center" muted>
              No gallery images found
            </Text>
          </Card>
        ) : (
          <>
            {/* Tags Selection */}
            <Card padding={3} border>
              <Stack space={3}>
                <Label size={1} weight="semibold">
                  Select Tags to Apply ({selectedTags.size} selected)
                </Label>
                <Flex wrap="wrap" gap={2}>
                  {availableTags.map((tag) => (
                    <Button
                      key={tag._id}
                      text={tag.title}
                      mode={selectedTags.has(tag._id) ? 'default' : 'ghost'}
                      tone={selectedTags.has(tag._id) ? 'primary' : 'default'}
                      onClick={() => toggleTag(tag._id)}
                      icon={selectedTags.has(tag._id) ? Tag : undefined}
                    />
                  ))}
                </Flex>
              </Stack>
            </Card>

            {/* Action Buttons */}
            <Flex gap={3} wrap="wrap">
              <Button
                text={`${selectedImages.size === images.length ? 'Deselect' : 'Select'} All Images (${images.length})`}
                mode="ghost"
                onClick={toggleAllImages}
              />
              <Button
                text={`Apply Tags (${selectedImages.size} images, ${selectedTags.size} tags)`}
                tone="positive"
                icon={Tag}
                onClick={applyTags}
                disabled={
                  selectedImages.size === 0 ||
                  selectedTags.size === 0 ||
                  applying
                }
                loading={applying}
              />
              <Button
                text="Refresh"
                mode="ghost"
                onClick={fetchGalleryImages}
                disabled={applying}
              />
            </Flex>

            {/* Images List */}
            <Stack space={2}>
              {images.map((image) => {
                const tagNames = availableTags
                  .filter((tag) => image.currentTags.includes(tag._id))
                  .map((tag) => tag.title);

                return (
                  <Card
                    key={image._id}
                    padding={3}
                    border
                    tone={selectedImages.has(image._id) ? 'primary' : 'default'}
                    style={{ cursor: 'pointer' }}
                    onClick={() => toggleImage(image._id)}
                  >
                    <Flex align="flex-start" gap={3}>
                      <Checkbox
                        checked={selectedImages.has(image._id)}
                        onChange={() => toggleImage(image._id)}
                      />
                      <Box
                        style={{
                          width: '80px',
                          height: '80px',
                          overflow: 'hidden',
                          borderRadius: '4px',
                          flexShrink: 0,
                        }}
                      >
                        <img
                          src={`${image.imageUrl}?w=160&h=160&fit=crop`}
                          alt=""
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </Box>
                      <Box flex={1}>
                        <Text weight="semibold">
                          {image.documentTitle}
                          {image.caption && ` - ${image.caption}`}
                        </Text>
                        <Flex gap={2} style={{ marginTop: '0.25rem' }}>
                          <Text size={1} muted>
                            {image.documentType}
                          </Text>
                          <Text size={1} muted>
                            •
                          </Text>
                          <Text size={1} muted>
                            Image {image.imageIndex + 1}
                          </Text>
                        </Flex>
                        {tagNames.length > 0 && (
                          <Box style={{ marginTop: '0.5rem' }}>
                            <Text size={1} weight="semibold" muted>
                              Current tags:
                            </Text>
                            <Flex
                              gap={1}
                              wrap="wrap"
                              style={{ marginTop: '0.25rem' }}
                            >
                              {tagNames.map((tagName) => (
                                <Box
                                  key={tagName}
                                  style={{
                                    padding: '2px 8px',
                                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                    borderRadius: '4px',
                                  }}
                                >
                                  <Text size={0}>{tagName}</Text>
                                </Box>
                              ))}
                            </Flex>
                          </Box>
                        )}
                      </Box>
                    </Flex>
                  </Card>
                );
              })}
            </Stack>
          </>
        )}
      </Stack>
    </Card>
  );
}

export const bulkTagGalleryTool = definePlugin({
  name: 'bulk-tag-gallery-tool',
  tools: (prev) => [
    ...prev,
    {
      name: 'bulk-tag-gallery',
      title: 'Bulk Tag Gallery',
      icon: Tag,
      component: BulkTagGalleryTool,
    },
  ],
});
