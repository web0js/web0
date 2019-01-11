const { cli } = require('../tools/dev/lib/cli')

if (require.main === module) {
  cli(['run', ...process.argv.slice(2)])
}
