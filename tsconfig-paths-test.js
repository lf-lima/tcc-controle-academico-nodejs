/* eslint-disable @typescript-eslint/no-var-requires */
const { compilerOptions } = require('./tsconfig.json')
const tsconfigPaths = require('tsconfig-paths')

console.log(compilerOptions)
const cleanup = tsconfigPaths.register({
  baseUrl: './',
  paths: compilerOptions.paths
})

cleanup()
