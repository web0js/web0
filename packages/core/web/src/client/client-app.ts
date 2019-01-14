import { Route } from '@web0js/router'
import { Context } from '../web-common-types'
import { ClientView } from './web-client-types'

export interface ClientAppOptions<P> {
  view: ClientView<P>
  routes: Route<Context>[]
}

export class ClientApp<P> {
  constructor (private readonly options: ClientAppOptions<P>) {}

  async start (): Promise<void> {
    const { view, routes } = this.options
    const { data, route } = (window as any).initialData
    console.log({ view, routes, data, route })
  }
}
