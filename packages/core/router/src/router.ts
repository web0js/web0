import { RouterOptions } from './types'
import { RoutePatternCache, RoutePattern, Key } from './route-pattern-cache'

export class Router<C> {
  private readonly routePatternCache = new RoutePatternCache()

  constructor (private readonly options: RouterOptions<C>) {}

  async handlePath (path: string, startRouteIndex: number = 0): Promise<void> {
    const { routes, createContext } = this.options
    for (let routeIndex = startRouteIndex; routeIndex < routes.length; ++routeIndex) {
      const route = routes[routeIndex]
      const routePattern: RoutePattern = this.routePatternCache.get(route)
      const matches = routePattern.test(path)
      if (matches) {
        const params: Record<string, string> = {}
        routePattern.keys.forEach((key: Key, keyIndex: number) => {
          params[key.name] = matches[keyIndex + 1]
        })
        const context: C = createContext({
          route,
          nextRouteIndex: routeIndex + 1,
          params,
        })
        const action = await route.handler(context)
        if (action) {
          await action()
        }
        return
      }
    }
  }
}
