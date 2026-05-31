// eslint.config.js
export default [
	{
		files: ["packages/website/**/*.{js,jsx,cjs,mjs,ts,tsx}"],
		settings: {
			"better-tailwindcss": {
				cwd: "./packages/website",
			},
		},
	},
	{
		files: ["packages/app/**/*.{js,jsx,cjs,mjs,ts,tsx}"],
		settings: {
			"better-tailwindcss": {
				cwd: "./packages/app",
			},
		},
	},
];
