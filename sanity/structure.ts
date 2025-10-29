import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import {
  Files,
  FolderKanban,
  BookA,
  User,
  ListCollapse,
  Quote,
  Menu,
  Settings,
  FileText,
  Tag,
  Factory,
  Building2,
} from 'lucide-react';

export const structure = (S: any, context: any) =>
  S.list()
    .title('Content')
    .items([
      // Temporarily disabled due to orderRank corruption
      S.listItem()
        .title('Pages')
        .schemaType('page')
        .icon(Files)
        .child(
          S.documentTypeList('page')
            .title('Pages')
            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
        ),
      // orderableDocumentListDeskItem({
      //   type: 'page',
      //   title: 'Pages',
      //   icon: Files,
      //   S,
      //   context,
      // }),
      S.listItem()
        .title('Posts')
        .schemaType('post')
        .child(
          S.documentTypeList('post')
            .title('Post')
            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }]) // Default ordering
        ),
      S.listItem()
        .title('Projects')
        .schemaType('project')
        .icon(FolderKanban)
        .child(
          S.documentTypeList('project')
            .title('Project')
            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
        ),
      S.listItem()
        .title('Offerings')
        .schemaType('offering')
        .icon(Building2)
        .child(
          S.documentTypeList('offering')
            .title('Offering')
            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
        ),
      // Temporarily disabled due to orderRank corruption
      S.listItem()
        .title('Categories')
        .schemaType('category')
        .icon(BookA)
        .child(
          S.documentTypeList('category')
            .title('Categories')
            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
        ),
      S.listItem()
        .title('Industries')
        .schemaType('industry')
        .icon(Factory)
        .child(
          S.documentTypeList('industry')
            .title('Industries')
            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
        ),
      S.listItem()
        .title('Gallery Tags')
        .schemaType('gallery-tag')
        .icon(Tag)
        .child(
          S.documentTypeList('gallery-tag')
            .title('Gallery Tags')
            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
        ),
      S.listItem()
        .title('Authors')
        .schemaType('author')
        .icon(User)
        .child(
          S.documentTypeList('author')
            .title('Authors')
            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
        ),
      S.listItem()
        .title('FAQs')
        .schemaType('faq')
        .icon(ListCollapse)
        .child(
          S.documentTypeList('faq')
            .title('FAQs')
            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
        ),
      S.listItem()
        .title('Testimonials')
        .schemaType('testimonial')
        .icon(Quote)
        .child(
          S.documentTypeList('testimonial')
            .title('Testimonials')
            .defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
        ),
      // orderableDocumentListDeskItem({
      //   type: 'category',
      //   title: 'Categories',
      //   icon: BookA,
      //   S,
      //   context,
      //}),
      // orderableDocumentListDeskItem({
      //   type: 'industry',
      //   title: 'Industries',
      //   icon: Factory,
      //   S,
      //   context,
      // }),
      // orderableDocumentListDeskItem({
      //   type: 'gallery-tag',
      //   title: 'Gallery Tags',
      //   icon: Tag,
      //   S,
      //   context,
      // }),
      // orderableDocumentListDeskItem({
      //   type: 'author',
      //   title: 'Authors',
      //   icon: User,
      //   S,
      //   context,
      // }),
      // orderableDocumentListDeskItem({
      //   type: 'faq',
      //   title: 'FAQs',
      //   icon: ListCollapse,
      //   S,
      //   context,
      // }),
      // orderableDocumentListDeskItem({
      //   type: 'testimonial',
      //   title: 'Testimonials',
      //   icon: Quote,
      //   S,
      //   context,
      // }),
      S.divider({ title: 'Global' }),
      S.listItem()
        .title('Projects Page')
        .icon(FolderKanban)
        .child(
          S.editor()
            .id('projects-page')
            .schemaType('projects-page')
            .documentId('projects-page')
        ),
      S.listItem()
        .title('Blog Page')
        .icon(FileText)
        .child(
          S.editor()
            .id('blog-page')
            .schemaType('blog-page')
            .documentId('blog-page')
        ),
      S.listItem()
        .title('Offerings Page')
        .icon(Building2)
        .child(
          S.editor()
            .id('offerings-page')
            .schemaType('offerings-page')
            .documentId('offerings-page')
        ),
      S.listItem()
        .title('Navigation')
        .icon(Menu)
        .child(
          S.editor()
            .id('navigation')
            .schemaType('navigation')
            .documentId('navigation')
        ),
      S.listItem()
        .title('Settings')
        .icon(Settings)
        .child(
          S.editor()
            .id('settings')
            .schemaType('settings')
            .documentId('settings')
        ),
    ]);
