import { Router, Route } from '@web0js/router'
import { Context, InitialData } from '../web-common-types'
import { queryParser } from '../query-parser'
import { ClientView } from './web-client-types'

export class ClientRouter<P> {
  private readonly router: Router<Context>

  constructor (private readonly view: ClientView<P>, routes: Route<Context>[]) {
    this.router = new Router<Context>(routes)
  }

  async hydrate ({ data, matchedRouteIndex }: InitialData): Promise<void> {
    const createContext = (route: Route<Context>, routeIndex: number, params: Record<string, string>) => {
      const context: Context = {
        isServer: false,
        isClient: true,
        path: location.pathname,
        route: {
          ...route,
          params,
          query: queryParser(location.search.slice(1)),
        },
        render: (page: P) => async () => {
          this.view.hydrate(page, document.getElementById('app'), { data, context })
        },
        nextRoute: () => () => {
          throw new Error(`'nextRoute' is not supported`)
        },
      }
      return context
    }
    await this.router.handlePath(location.pathname, createContext, matchedRouteIndex)
  }
}
