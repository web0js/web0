import { Route } from '@web0js/router'
import { Context, InitialData } from '../web-common-types'
import { ClientView } from './web-client-types'
import { ClientRouter } from './client-router'

export interface ClientAppOptions<P> {
  view: ClientView<P>
  routes: Route<Context>[]
}

export class ClientApp<P> {
  private readonly router: ClientRouter<P>

  constructor (options: ClientAppOptions<P>) {
    const { view, routes } = options
    this.router = new ClientRouter<P>(view, routes)
  }

  async start (): Promise<void> {
    const initialData = (window as any).WEB0_INITIAL_DATA as InitialData
    await this.router.hydrate(initialData)
  }
}
