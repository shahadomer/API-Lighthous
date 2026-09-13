import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import reactHooks from "eslint-plugin-react-hooks";
import nextPlugin from "@next/eslint-plugin-next";
import globals from "globals";

const HEX_COLOR_REGEX = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})\b/g;

/**
 * Custom lint rule: no-raw-hex
 * Disallows hardcoded hex color codes anywhere in TS/TSX component and application files.
 * All colors must originate from design system tokens in app/globals.css.
 */
const noRawHexRule = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow raw hex color codes outside design tokens in app/globals.css",
    },
    messages: {
      noRawHex:
        "Raw hex color '{{hex}}' is forbidden outside app/globals.css. Use design tokens (--color-*) or Tailwind utility classes instead.",
    },
  },
  create(context) {
    const filename = context.filename || context.getFilename?.() || "";
    // Allow globals.css and documentation/config files if inspected
    if (filename.includes("globals.css")) {
      return {};
    }

    function checkText(node, text) {
      if (!text || typeof text !== "string") return;
      // Exclude SVG attribute selectors such as [&_.recharts-grid[stroke='#ccc']]
      const sanitized = text.replace(/\[[^\]]*=[^\]]*\]/g, "");
      const matches = sanitized.match(HEX_COLOR_REGEX);
      if (matches) {
        for (const hex of matches) {
          context.report({
            node,
            messageId: "noRawHex",
            data: { hex },
          });
        }
      }
    }

    return {
      Literal(node) {
        if (typeof node.value === "string") {
          checkText(node, node.value);
        }
      },
      TemplateElement(node) {
        if (node.value && typeof node.value.raw === "string") {
          checkText(node, node.value.raw);
        }
      },
    };
  },
};

const designSystemPlugin = {
  rules: {
    "no-raw-hex": noRawHexRule,
  },
};

export default tseslint.config(
  {
    ignores: [
      ".next/**",
      "dist/**",
      "node_modules/**",
      ".output/**",
      ".vinxi/**",
      "public/**",
      "next-env.d.ts",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "@next/next": nextPlugin,
      "design-system": designSystemPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@typescript-eslint/no-unused-vars": "off",
      "design-system/no-raw-hex": "error",
    },
  },
  eslintPluginPrettier,
);
