export type Action = () => void | Promise<void>

export interface Route<C> {
  path: string
  handler: (context: C) => Action | Promise<Action>
}

export interface MatchedRoute<C> {
  route: Route<C>
  nextRouteIndex: number
  params: Record<string, string>
}

export interface RouterOptions<C> {
  routes: Route<C>[]
  createContext: (matchedRoute: MatchedRoute<C>) => C
}
