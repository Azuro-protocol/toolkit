import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import builtins from 'builtin-modules/static';

export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true,
  },
  external: [...builtins],
  plugins: [
    json(),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true,
      clean: true,
      tsconfig: './tsconfig.json',
    }),
  ]
};
