import { CodegenConfig } from '@graphql-codegen/cli'


const config: CodegenConfig = {
  ignoreNoDocuments: true,
  generates: {
    'src/docs/feed/types.ts': {
      schema: 'https://thegraph.onchainfeed.org/subgraphs/name/azuro-protocol/azuro-data-feed-polygon-amoy-dev',
      plugins: [
        'typescript',
      ],
    },
    'src/docs/feed': {
      preset: 'near-operation-file',
      schema: 'https://thegraph.onchainfeed.org/subgraphs/name/azuro-protocol/azuro-data-feed-polygon-amoy-dev',
      documents: 'src/docs/feed/**/*.graphql',
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
    'src/docs/bets/types.ts': {
      schema: 'https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-polygon-amoy-dev-v3',
      plugins: [
        'typescript',
      ],
    },
    'src/docs/bets': {
      preset: 'near-operation-file',
      schema: 'https://thegraph.azuro.org/subgraphs/name/azuro-protocol/azuro-api-polygon-amoy-dev-v3',
      documents: 'src/docs/bets/**/*.graphql',
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
    }
  }
}

export default config
