import { Route, Context } from '@web0js/router'
import { BaseRouter } from '@web0js/router/lib/base-router'
import { InitialData, queryParser } from '../common'
import { ClientView } from './types'

export class ClientRouter<P> {
  private readonly baseRouter: BaseRouter

  constructor (private readonly view: ClientView<P>, routes: Route[]) {
    this.baseRouter = new BaseRouter(routes)
  }

  async hydrate ({ data, matchedRouteIndex }: InitialData): Promise<void> {
    const createContext = (route: Route, routeIndex: number, params: any) => {
      const context: Context = {
        isServer: false,
        isClient: true,
        path: location.pathname,
        params,
        query: queryParser(location.search.slice(1)),
        render: (page: P) => async () => {
          this.view.hydrate(page, document.getElementById('app'), { data, context })
        },
        nextRoute: () => () => {
          throw new Error(`'nextRoute' is not supported`)
        },
      }
      return context
    }
    await this.baseRouter.handlePath(location.pathname, createContext, matchedRouteIndex)
  }
}
