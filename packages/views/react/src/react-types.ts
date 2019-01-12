import { Context } from '@web0js/web/lib/web-types'

export interface ReactPageProps<D = any> {
  data: D
  context: Context
}
