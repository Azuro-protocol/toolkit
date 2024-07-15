import builtins from 'builtin-modules/static'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-typescript2'
import babel from 'rollup-plugin-babel'
import json from '@rollup/plugin-json'


export default [
  {
    input: {
      'index': 'src/index.ts',
    },
    output: [
      {
        dir: 'dist',
        format: 'es',
        exports: 'named',
      },
    ],
    external: [
      ...builtins,
    ],
    plugins: [
      commonjs(),
      json(),
      babel({
        exclude: 'node_modules/**',
      }),
      typescript({
        clean: true,
        tsconfig: './tsconfig.json',
      }),
    ],
  }
]
