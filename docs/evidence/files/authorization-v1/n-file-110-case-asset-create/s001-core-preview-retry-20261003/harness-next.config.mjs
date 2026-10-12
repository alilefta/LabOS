import { fileURLToPath } from 'node:url'

const nextConfig = {
  outputFileTracingRoot: fileURLToPath(new URL('.', import.meta.url)),
  serverExternalPackages: ['@julusian/jpeg-turbo'],
  outputFileTracingIncludes: {
    '/api/probe': [
      './fixtures/*.jpg',
      './node_modules/@julusian/jpeg-turbo/prebuilds/jpeg-turbo-linux-x64/node-napi-v10.node',
      './node_modules/@julusian/jpeg-turbo/prebuilds/jpeg-turbo-linux-x64/libturbojpeg.so.0',
    ],
  },
}

export default nextConfig
