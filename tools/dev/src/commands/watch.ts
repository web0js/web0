import path from 'path'
import fs from 'fs'
import chokidar from 'chokidar'
import spawn from 'cross-spawn'

const isPackage = (dirPath: string): boolean => {
  return fs.existsSync(path.join(dirPath, 'package.json'))
}

const shouldWatch = (pkgPath: string, scriptName: string): boolean => {
  if (!fs.existsSync(path.join(pkgPath, 'src'))) {
    return false
  }
  const pkgJson = require(path.join(pkgPath, 'package.json'))
  return pkgJson.scripts && pkgJson.scripts[scriptName]
}

const findPackages = (dirPath: string, scriptName: string): string[] => {
  const packages: string[] = []
  fs.readdirSync(dirPath).forEach((childName) => {
    if (childName === 'node_modules') {
      return
    }
    const childPath = path.join(dirPath, childName)
    if (!fs.statSync(childPath).isDirectory()) {
      return
    }
    if (isPackage(childPath)) {
      if (shouldWatch(childPath, scriptName)) {
        packages.push(childPath)
      }
      return
    }
    packages.push(...findPackages(childPath, scriptName))
  })
  return packages
}

export const watch = async (argv: string[]): Promise<number> => {
  const scriptName = argv[0]
  const rootPath = process.cwd()
  const packages = findPackages(rootPath, scriptName)
  console.log(`Watching the following packages to run '${scriptName}' script:`)
  console.log()
  packages.forEach((pkgPath) => {
    console.log(`- ${path.relative(rootPath, pkgPath)}`)
  })
  console.log()
  const watcher = chokidar.watch(packages.map((pkgPath) => path.join(pkgPath, 'src')))
  watcher.on('change', (filePath) => {
    const pkgPath = filePath.split('src')[0]
    spawn('npm', ['run', 'build'], { cwd: pkgPath, stdio: ['pipe', process.stdout, process.stderr] })
  })
  watcher.on('error', console.error)
  return 0
}
