import { Route } from '@web0js/router/lib/router-types'
import { ClientView, Context } from './web-types'
import { INITIAL_DATA } from './page'

export interface ClientAppOptions<P> {
  view: ClientView<P>
  routes: Route<Context>[]
}

export class ClientApp<P> {
  constructor (private readonly options: ClientAppOptions<P>) {}

  async start (): Promise<void> {
    const { view, routes } = this.options
    const { data, route } = (window as any)[INITIAL_DATA]
    console.log({ view, routes, data, route })
  }
}
