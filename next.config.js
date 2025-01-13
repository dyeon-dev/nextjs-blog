const createMDX = require("@next/mdx");
const { withContentlayer } = require("next-contentlayer");

module.default = {
  experimental: {
    ppr: true,
  },
};

/** @type {import('next').NextConfig} */
const options = {
  reactStrictMode: true,
  swcMinify: false,
  // 옵션은 자유롭게 넣어주세요.
};

module.exports = withContentlayer(options);

const withMDX = createMDX({});

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
});
