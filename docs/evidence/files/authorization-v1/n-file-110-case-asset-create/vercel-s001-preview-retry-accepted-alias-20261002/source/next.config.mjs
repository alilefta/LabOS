/** Isolated synthetic Preview experiment; never import this into LabOS. */
import { fileURLToPath } from 'node:url'

const nextConfig = {
  outputFileTracingRoot: fileURLToPath(new URL('.', import.meta.url)),
  serverExternalPackages: ['@julusian/jpeg-turbo', 'sharp'],
  outputFileTracingIncludes: {
    '/api/probe': [
      './fixtures/*.jpg',
      './fixtures/manifest.json',
      './node_modules/@julusian/jpeg-turbo/prebuilds/jpeg-turbo-linux-x64/*.node',
      './node_modules/@julusian/jpeg-turbo/prebuilds/jpeg-turbo-linux-x64/*.so.0',
    ],
  },
}

export default nextConfig
