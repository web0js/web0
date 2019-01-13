import { Route, Action } from '@web0js/router/lib/router-types'

export interface MatchedRoute extends Route<Context> {
  index: number
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

export interface PageProps<D = any> {
  data: D
  context: Context
}

export interface ServerView<P> {
  renderToString: (page: P, props: PageProps) => string
}

export interface ClientView<P> {
  render: (page: P, container: HTMLElement, props: PageProps) => void
  hydrate: (page: P, container: HTMLElement, props: PageProps) => void
}

export interface ServerAppOptions<P> {
  view: ServerView<P>
  routes: Route<Context>[]
  template: string
  publicPath: string
  port: number
  host: string
}

export interface ServerApp<P> {
  setOptions: (options: ServerAppOptions<P>) => void
  start: () => Promise<void>
}
