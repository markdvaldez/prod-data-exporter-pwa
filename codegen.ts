import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      "https://dbapi.dev1.hisausapps.org/graphql": {
        headers: {
          "x-api-key": "Key1",
          "Content-Type": "application/graphql-response+json; charset=utf-8",
        },
      },
    },
  ],
  documents: "src/**/*.{ts,tsx}",
  generates: {
    "src/services/gql/": {
      preset: "client",
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
    "schema.graphql": {
      plugins: ["schema-ast"],
    },
  },
};

export default config;
