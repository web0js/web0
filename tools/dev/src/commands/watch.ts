import chokidar from 'chokidar'
import path from 'path'
import fs from 'fs'
import spawn from 'cross-spawn'

export const watch = (argv: string[]): Promise<number> => {
  return new Promise<number>((resolve, reject) => {
    const isPackage = (pkg: string): boolean => {
      if (fs.existsSync(path.join(pkg, 'src'))) {
        if (fs.existsSync(path.join(pkg, 'package.json'))) {
          const pkgJson = require(path.join(pkg, 'package.json'))
          return pkgJson.scripts && pkgJson.scripts[argv[0]]
        }
      }
      return false
    }
    const scanPackages = (dir: string): string[] => {
      const results = []
      if (isPackage(dir)) {
        results.push(path.join(dir, 'src'))
      } else {
        fs.readdirSync(dir).forEach((entity) => {
          if (entity !== 'node_modules' && fs.statSync(path.join(dir, entity)).isDirectory()) {
            results.push(...scanPackages(path.join(dir, entity)))
          }
        })
      }
      return results
    }
    const packages = scanPackages(process.cwd())
    const watcher = chokidar.watch(packages)
    watcher.on('change', (filePath) => {
      spawn('npm', ['run', 'build'], { cwd: filePath.split('src')[0], stdio: ['pipe', process.stdout, process.stderr] })
    })
    watcher.on('error', reject)
  })
}
