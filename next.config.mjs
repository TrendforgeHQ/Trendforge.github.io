/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // GitHub Pages user-site deployment lives at the root.
  // A future owned custom domain can override this via the environment.
  basePath: process.env.TREND_FORGE_BASE_PATH || '',
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
