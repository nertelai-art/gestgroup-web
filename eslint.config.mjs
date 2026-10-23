import next from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const pure = { group: ["react", "react-dom", "next/*"], message: "Aquest fitxer ha de ser TypeScript pur, sense React ni Next." };

const config = [
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts", "_source/**"] },
  ...next,
  ...nextTs,
  {
    // La lògica de les escenes, les dades i els textos són TypeScript pur: es proven sense navegador.
    files: ["src/lib/**", "src/i18n/**", "src/data/**", "src/components/**/*-phases.ts"],
    rules: { "no-restricted-imports": ["error", { patterns: [pure] }] },
  },
];

export default config;
