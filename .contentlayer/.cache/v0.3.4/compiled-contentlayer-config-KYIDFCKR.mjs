// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
var fields = {
  title: { type: "string", required: true },
  summary: { type: "string", required: true },
  publishedAt: { type: "date", required: true },
  image: { type: "string" }
};
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields,
  computedFields: {
    slug: {
      type: "string",
      resolve: (post) => `/${post._raw.flattenedPath}`
    }
    // readingMinutes: {
    //   type: 'string',
    //   resolve: (post) => Math.ceil(readingTime(post.body.raw).minutes),
    // },
    // wordCount: {
    //   type: 'number',
    //   resolve: (post) => post.body.raw.split(/\s+/gu).length,
    // },
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "posts",
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["anchor"],
            ariaLabel: "anchor"
          }
        }
      ]
    ]
  }
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-KYIDFCKR.mjs.map
