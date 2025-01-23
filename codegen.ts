import { CodegenConfig } from '@graphql-codegen/cli'


const config: CodegenConfig = {
  ignoreNoDocuments: true,
  generates: {
    'src/docs/prematch/types.ts': {
      schema: 'https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-polygon-amoy-dev-v3',
      plugins: [
        'typescript',
      ],
    },
    'src/docs/prematch': {
      preset: 'near-operation-file',
      schema: 'https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-polygon-amoy-dev-v3',
      documents: 'src/docs/prematch/**/*.graphql',
      presetConfig: {
        extension: '.ts',
        baseTypesPath: 'types.ts',
      },
      plugins: [
        'typescript-operations',
        'typescript-document-nodes',
      ],
      config: {
        withHooks: false,
        nameSuffix: 'Document',
        fragmentSuffix: 'FragmentDoc',
        scalars: {
          'BigInt': 'string',
          'BigDecimal': 'string',
        }
      },
    },
    'src/docs/live/types.ts': {
      schema: 'https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-live-data-feed-dev',
      plugins: [
        'typescript',
      ],
    },
    'src/docs/live': {
      preset: 'near-operation-file',
      schema: 'https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-live-data-feed-dev',
      documents: 'src/docs/live/**/*.graphql',
      presetConfig: {
        extension: '.ts',
        baseTypesPath: 'types.ts',
      },
      plugins: [
        'typescript-operations',
        'typescript-document-nodes',
      ],
      config: {
        withHooks: false,
        nameSuffix: 'Document',
        fragmentSuffix: 'FragmentDoc',
        scalars: {
          'BigInt': 'string',
          'BigDecimal': 'string',
        }
      },
    },
  },
}

export default config
