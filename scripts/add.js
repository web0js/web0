const { cli } = require('../tools/dev/lib/cli')

if (require.main === module) {
  cli(['add', ...process.argv.slice(2)])
}
