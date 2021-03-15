import typescript from 'rollup-plugin-typescript2'

export default {
  input: 'src/index.ts',
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      sourcemap: true,
      exports: 'default',
      entryFileNames: '[name].cjs',
      chunkFileNames: '[name].cjs'
    },
    {
      dir: 'dist',
      format: 'esm',
      sourcemap: true,
      entryFileNames: '[name].mjs',
      chunkFileNames: '[name].mjs'
    }
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
      tsconfigOverride: {
        exclude: ['src/**/__tests__/**']
      }
    })
  ]
}