import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './schema.json',
  documents: ['./src/**/*.graphql'],
  generates: {
    './src/__generated__/types.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        skipTypename: true,
        flattenGeneratedTypes: true,
        documentMode: 'documentNode',
        avoidOptionals: true,
        withResultType: true,
      },
    },
  },
}

export default config
