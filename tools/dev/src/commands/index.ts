import { add } from './add'
import { build } from './build'
import { clean } from './clean'
import { eslint } from './eslint'
import { format } from './format'
import { run } from './run'
import { tslint } from './tslint'

const commands: { [key: string]: (argv: string[]) => Promise<number> } = {
  add,
  build,
  clean,
  eslint,
  format,
  run,
  tslint,
}

export default commands
