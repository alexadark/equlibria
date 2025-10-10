import { useCallback, useState } from 'react';
import { ArrayOfObjectsInputProps, set, useClient } from 'sanity';
import { Stack, Card, Text, Spinner } from '@sanity/ui';

// Helper function to generate random keys
function generateKey(length = 12): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function BulkImageArrayInput(props: ArrayOfObjectsInputProps) {
  const { onChange, schemaType, value = [] } = props;
  const client = useClient({ apiVersion: '2023-05-03' });
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileDrop = useCallback(
    async (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();

      const files = Array.from(event.dataTransfer.files);
      const imageFiles = files.filter((file) => file.type.startsWith('image/'));

      if (imageFiles.length === 0) {
        setUploadStatus('No image files found');
        setTimeout(() => setUploadStatus(''), 2000);
        return;
      }

      setUploading(true);
      setUploadStatus(`Uploading ${imageFiles.length} image(s)...`);

      try {
        // Upload all images in parallel
        const uploadPromises = imageFiles.map((file) =>
          client.assets.upload('image', file, {
            filename: file.name,
          })
        );

        const uploadedAssets = await Promise.all(uploadPromises);

        // Create gallery items for each uploaded image
        const newItems = uploadedAssets.map((asset) => ({
          _type: 'galleryItem',
          _key: generateKey(12),
          image: {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: asset._id,
            },
          },
          hasVideo: false,
        }));

        // Append new items to existing array
        const updatedValue = [...(value || []), ...newItems];
        onChange(set(updatedValue));

        setUploadStatus(`Successfully uploaded ${imageFiles.length} image(s)!`);
        setTimeout(() => setUploadStatus(''), 2000);
      } catch (error) {
        console.error('Error uploading images:', error);
        setUploadStatus(
          `Error uploading images: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
        setTimeout(() => setUploadStatus(''), 4000);
      } finally {
        setUploading(false);
      }
    },
    [client, onChange, value]
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
    },
    []
  );

  return (
    <Stack space={3}>
      <Card
        padding={4}
        radius={2}
        shadow={1}
        tone={uploading ? 'transparent' : 'primary'}
        onDrop={handleFileDrop}
        onDragOver={handleDragOver}
        style={{
          border: '2px dashed var(--card-border-color)',
          cursor: uploading ? 'wait' : 'pointer',
          opacity: uploading ? 0.7 : 1,
        }}
      >
        <Stack space={2}>
          {uploading && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Spinner />
            </div>
          )}
          <Text align="center" size={1}>
            {uploadStatus ||
              'Drag and drop multiple images here to bulk upload'}
          </Text>
        </Stack>
      </Card>
      {props.renderDefault(props)}
    </Stack>
  );
}
