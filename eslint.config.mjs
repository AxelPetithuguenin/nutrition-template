import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

/**
 * Configuration ESLint (format « flat », ESLint 9).
 * Règles Next.js + TypeScript, sans personnalisation propre au template.
 */
const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  { ignores: [".next/**", "node_modules/**", "out/**"] },
];

export default eslintConfig;
