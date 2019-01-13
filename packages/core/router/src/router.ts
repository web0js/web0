import { Route } from './router-types'
import { RoutePatternCache, RoutePattern, Key } from './route-pattern-cache'

export type CreateContextFunction<C> = (route: Route<C>, nextRouteIndex: number, params: Record<string, string>) => C

export class Router<C> {
  private readonly routePatternCache = new RoutePatternCache()

  constructor (private readonly routes: Route<C>[]) {}

  async handlePath (path: string, createContext: CreateContextFunction<C>, startRouteIndex: number = 0): Promise<void> {
    for (let routeIndex = startRouteIndex; routeIndex < this.routes.length; ++routeIndex) {
      const route = this.routes[routeIndex]
      const routePattern: RoutePattern = this.routePatternCache.get(route)
      const matches = routePattern.test(path)
      if (matches) {
        const params: Record<string, string> = {}
        routePattern.keys.forEach((key: Key, keyIndex: number) => {
          params[key.name] = matches[keyIndex + 1]
        })
        const context: C = createContext(route, routeIndex, params)
        const action = await route.handler(context)
        if (action) {
          await action()
        }
        return
      }
    }
  }
}
