import { Route } from '@web0js/router'
import { Context, InitialData } from '../web-common-types'
import { ClientView } from './web-client-types'

export interface ClientAppOptions<P> {
  view: ClientView<P>
  routes: Route<Context>[]
}

export class ClientApp<P> {
  constructor (private readonly options: ClientAppOptions<P>) {}

  async start (): Promise<void> {
    const { view, routes } = this.options
    const {
      data,
      route: { path, routeIndex, params, query },
    } = (window as any).WEB0_INITIAL_DATA as InitialData
    const route = routes[routeIndex]
    const context = {
      isServer: false,
      isClient: true,
      path,
      route: {
        ...route,
        params,
        query,
      },
      render: (page: P) => async () => {
        view.hydrate(page, document.getElementById('app'), { data, context })
      },
      nextRoute: () => () => {
        throw new Error(`'nextRoute' is not supported`)
      },
    }
    const action = await routes[routeIndex].handler(context)
    if (action) {
      await action()
    }
  }
}
