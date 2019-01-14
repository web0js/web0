import { Route, Action } from '@web0js/router'

export interface RequestInfo {
  params: Record<string, string>
  query: Record<string, string>
}

export interface MatchedRoute extends Route<Context>, RequestInfo {}

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

export interface InitialRoute extends RequestInfo {
  path: string
  routeIndex: number
}

export interface InitialData {
  data: any
  route: InitialRoute
}
