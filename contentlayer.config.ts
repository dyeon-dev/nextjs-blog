import { defineDocumentType, FieldDefs, makeSource } from 'contentlayer/source-files';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import highlight from 'rehype-highlight';
import rehypePrettyCode from 'rehype-pretty-code';

import remarkGfm from 'remark-gfm';


const fields: FieldDefs = {
  title: { type: 'string', required: true },
  summary: { type: 'string', required: true },
  publishedAt: { type: 'date', required: true },
  image: { type: 'string' },
};

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields,
  computedFields: {
    slug: {
      type: 'string',
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
    // readingMinutes: {
    //   type: 'string',
    //   resolve: (post) => Math.ceil(readingTime(post.body.raw).minutes),
    // },
    // wordCount: {
    //   type: 'number',
    //   resolve: (post) => post.body.raw.split(/\s+/gu).length,
    // },
  },
}));

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
            ariaLabel: 'anchor',
          },
        },
      ],
      // [
      //   rehypePrettyCode,
      //   {
      //     theme: 'github-dark', // 코드작성시 적용할 테마
      //   },
      // ],
    ],
  },
});
