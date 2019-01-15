import { Route, Action } from '@web0js/router'

export interface MatchedRoute extends Route<Context> {
  params: Record<string, string>
  query: any
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

export interface InitialData {
  data: any
  matchedRouteIndex: number
}
