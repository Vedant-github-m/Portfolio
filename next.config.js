/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Disable server-side rendering for 3D components
  experimental: {
    serverComponentsExternalPackages: ['@react-three/fiber', '@react-three/drei', 'three'],
  },
}

module.exports = nextConfig 