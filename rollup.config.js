import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import builtins from 'builtin-modules'

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true,
  },
  external: [ ...builtins ],
  plugins: [
    json(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
  ],
}
