import { Context } from './context'
import { Action } from './action'

export interface Route {
  path: string
  handler: (context: Context) => Action | Promise<Action>
}
