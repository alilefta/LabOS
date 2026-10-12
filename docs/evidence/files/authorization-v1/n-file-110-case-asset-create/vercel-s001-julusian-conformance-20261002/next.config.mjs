/** Isolated synthetic Preview experiment; no LabOS application imports. */
import { fileURLToPath } from 'node:url'

const nextConfig = {
  outputFileTracingRoot: fileURLToPath(new URL('.', import.meta.url)),
  serverExternalPackages: ['@julusian/jpeg-turbo'],
  outputFileTracingIncludes: {
    '/api/conformance': [
      './fixtures/*.jpg',
      './node_modules/@julusian/jpeg-turbo/prebuilds/jpeg-turbo-linux-x64/*.node',
      './node_modules/@julusian/jpeg-turbo/prebuilds/jpeg-turbo-linux-x64/*.so.0',
    ],
  },
}

export default nextConfig
