import { Route, Action } from '@web0js/router'

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
