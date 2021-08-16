import { existsSync } from 'fs'
import type { Plugin } from 'vite'
import { run as aspida } from 'aspida/dist/cli'
import { run as openapi2aspida } from 'openapi2aspida/dist/cli'
import rimraf from 'rimraf'
import chalk from 'chalk'

export interface Option {
  // https://github.com/aspida/openapi2aspida#build-from-config-file
  // https://github.com/aspida/aspida/blob/master/packages/aspida/README.md#command-line-interface-options
  config?: string
  input?: string
}

export default function ViteAspida({ config, input }: Option): Plugin {
  return {
    name: 'aspida',
    enforce: 'pre',
    config: async(_, env) => {
      console.info(chalk.blue(`[aspida] ${input}`))

      const openapi2aspidaArgs: string[] = []
      const aspidaArgs: string[] = []

      if (config) {
        openapi2aspidaArgs.push('-c')
        openapi2aspidaArgs.push(config)
        aspidaArgs.push('-c')
        aspidaArgs.push(config)
      }

      // Run once
      if (input) {
        openapi2aspidaArgs.push('-i')
        openapi2aspidaArgs.push(input)

        await new Promise((resolve) => {
          rimraf('./api/*', () => {
            openapi2aspida(openapi2aspidaArgs)
            const checkFile = () => {
              if (existsSync('./api/$api.ts'))
                resolve(true)
              else setTimeout(checkFile, 200)
            }
            checkFile()
          },
          )
        })
      }
      else if (env.mode === 'production') {
        aspida(aspidaArgs)
      }

      // Watch
      if (env.mode === 'development') {
        console.log(chalk.blue(`[aspida] watching ${input}`))

        aspidaArgs.push('--watch') // watch mode

        aspida(aspidaArgs)
      }
    },
  }
}
