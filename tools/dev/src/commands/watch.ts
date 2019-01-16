import chokidar from 'chokidar'
import path from 'path'
import { build } from './build'

export const watch = (argv: string[]): Promise<number> => {
  return new Promise<number>((resolve, reject) => {
    const cwd = path.join(__dirname, '../../../../')
    const ignored = ['**/node_modules/**', '**/lib/**']
    const watcher = chokidar.watch(argv, { ignored, cwd })
    watcher.on('change', async (filePath) => {
      console.log('Building...')
      const srcPackage = path.join(cwd, filePath.split('src')[0])
      await build(['-p', srcPackage])
      console.log('Watching...')
    })
    watcher.on('error', reject)
  })
}
