/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin explicitly — a stray package.json/lockfile one directory up
  // (siyoni/package.json) makes Turbopack guess the wrong workspace root,
  // which was making it rescan a much bigger tree on every dev compile.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
