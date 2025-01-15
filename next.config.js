const createMDX = require("@next/mdx");

module.default = {
  experimental: {
    ppr: true,
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
});
