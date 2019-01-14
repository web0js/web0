export type Action = () => void | Promise<void>

export interface Route<C> {
  path: string
  handler: (context: C) => Action | Promise<Action>
}

export type CreateContext<C> = (route: Route<C>, routeIndex: number, params: Record<string, string>) => C
