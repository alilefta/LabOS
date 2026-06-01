// eslint.config.js

import jsxA11y from "eslint-plugin-jsx-a11y";

export default [
  {
    plugins: {
      "jsx-a11y": jsxA11y,
    },
    rules: {
      ...jsxA11y.configs.recommended.rules,
    },
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
  {
    extends: ["next/core-web-vitals"],
  },
];
