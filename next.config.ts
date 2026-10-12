import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	/* config options here */
	serverExternalPackages: ['@julusian/jpeg-turbo'],
	outputFileTracingIncludes: {
		'/api/cases/\\[caseId\\]/clinical-upload/complete': [
			'./node_modules/@julusian/jpeg-turbo/prebuilds/jpeg-turbo-linux-x64/node-napi-v10.node',
			'./node_modules/@julusian/jpeg-turbo/prebuilds/jpeg-turbo-linux-x64/libturbojpeg.so.0',
		],
	},
	reactStrictMode: false, // temporary test only
	logging: {
		fetches: {
			hmrRefreshes: true,
		},
	},

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'images.unsplash.com',
			},
			{
				protocol: 'https',
				hostname: 'utfs.io',
			},
			{
				protocol: 'https',
				hostname: 's4kda7yeil.ufs.sh',
			},
			{
				protocol: 'https',
				hostname: 'fyylnhrlmu.ufs.sh',
			},
			{
				protocol: 'https',
				hostname: 'github.com',
			},
		],
	},
}

export default nextConfig
