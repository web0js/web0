export type Action = () => void | Promise<void>

export interface Route<C> {
  path: string
  handler: (context: C) => Action | Promise<Action>
}

export interface MatchedRoute extends Route<Context> {
  params: Record<string, string>
  query: Record<string, string>
}

export interface Context {
  isServer: boolean
  isClient: boolean
  path: string
  route: MatchedRoute
  render: (page: any) => Action
  nextRoute: () => Action
}

export interface View<P> {
  render: (page: P, container: HTMLElement, data: any, context: Context) => void
  renderToString: (page: P, data: any, context: Context) => string
  hydrate: (page: P, container: HTMLElement, data: any, context: Context) => void
}
