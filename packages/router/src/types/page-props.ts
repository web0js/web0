import { Context } from './context'

export interface PageProps<D = any> {
  data: D
  context: Context
}
