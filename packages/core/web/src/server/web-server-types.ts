import { Route } from '@web0js/router'
import { PageProps, Context } from '../web-common-types'

export interface ServerView<P> {
  renderToString: (page: P, props: PageProps) => string
}

export interface ServerAppOptions<P> {
  view: ServerView<P>
  routes: Route<Context>[]
  template: string
  publicPath: string
  port: number
  host: string
}

export interface ServerApp<P> {
  setOptions: (options: ServerAppOptions<P>) => void
  start: () => Promise<void>
}
