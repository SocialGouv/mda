/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  extends: ["@mda/eslint-config"],
  rules: {
    "import/no-default-export": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-restricted-imports": ["error", {}],
  },
  overrides: [
    {
      files: ["src/admin/**/*.ts*"],
      parserOptions: {
        project: ["src/admin/tsconfig.json"],
        sourceType: "module",
      },
      settings: {
        "import/resolver": {
          typescript: {
            alwaysTryTypes: true,
            project: ["src/admin/tsconfig.json"],
          },
        },
      },
    },
  ],
};

module.exports = config;
