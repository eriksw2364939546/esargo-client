// next.config.mjs
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		formats: ['image/avif', 'image/webp'],
		remotePatterns: [
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '5000',
				pathname: '/uploads/**',
			},
			{
				protocol: 'http',
				hostname: 'localhost',
				pathname: '/api/uploads/**',
			},
			{
				protocol: 'https',
				hostname: 'example.com',
			},
			{
				protocol: 'https',
				hostname: 'xxx.com',
			},
		],
		minimumCacheTTL: 31536000,
	},

	compress: true,
	reactStrictMode: true,
	poweredByHeader: false,

	typescript: { ignoreBuildErrors: true },
	eslint: { ignoreDuringBuilds: true },

	experimental: {
		optimizeCss: true,
	},

	async headers() {
		return [
			{
				source: '/(.*)',
				headers: [
					{ key: 'X-Content-Type-Options', value: 'nosniff' },
					{ key: 'X-Frame-Options', value: 'DENY' },
					{ key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
				],
			},
		];
	},
};

export default withNextIntl(nextConfig);