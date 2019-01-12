export type Action = () => void | Promise<void>

export interface Route<C> {
  path: string
  handler: (context: C) => Action | Promise<Action>
}
