/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const isGhPages = process.env.DEPLOY_TARGET === 'gh-pages';

const repoName = 'capolavoro-pcto';

const nextConfig = {
  output: 'export',
  // disabled in dev because R3F + double-mount under strict mode tries to
  // acquire a second WebGL context on the same canvas and fails.
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  ...(isProd && isGhPages
    ? {
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`,
      }
    : {}),
  transpilePackages: ['three'],
};

module.exports = nextConfig;
