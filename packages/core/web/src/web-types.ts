import { Route, Action } from '@web0js/router/lib/router-types'

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

export interface ServerView<P> {
  renderToString: (page: P, data: any, context: Context) => string
}

export interface ClientView<P> {
  render: (page: P, container: HTMLElement, data: any, context: Context) => void
  hydrate: (page: P, container: HTMLElement, data: any, context: Context) => void
}

export interface ServerAppOptions<P> {
  template: string
  view: ServerView<P>
  routes: Route<Context>[]
  port: number
  host: string
}

export interface ServerApp<P> {
  setOptions: (options: ServerAppOptions<P>) => void
  start: () => Promise<void>
}
