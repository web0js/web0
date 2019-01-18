import { Route, Context } from '@web0js/router'
import { InitialData } from '../common'
import { ClientView } from './types'
import { ClientRouter } from './client-router'

export interface ClientAppOptions<P> {
  view: ClientView<P>
  routes: Route[]
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
