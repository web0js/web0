const { cli } = require('../tools/dev/lib/cli')

if (require.main === module) {
  cli(['watch', ...process.argv.slice(2)])
}
