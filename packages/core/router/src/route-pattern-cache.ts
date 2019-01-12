import pathToRegexp, { Key } from 'path-to-regexp'
import { Route } from './router-types'

export { Key }

export interface RoutePattern {
  keys: Key[]
  test: (path: string) => string[] | null
}

export class RoutePatternCache {
  private readonly routePatternByPath: Record<string, RoutePattern> = {}

  get<C> (route: Route<C>): RoutePattern {
    const cachedRoutePattern: RoutePattern = this.routePatternByPath[route.path]
    if (cachedRoutePattern) {
      return cachedRoutePattern
    }
    const keys: Key[] = []
    const regExp = pathToRegexp(route.path, keys)
    const routePattern: RoutePattern = {
      keys,
      test: (path: string): string[] | null => regExp.exec(path),
    }
    this.routePatternByPath[route.path] = routePattern
    return routePattern
  }
}
