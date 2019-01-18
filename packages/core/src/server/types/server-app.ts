import { Route } from '@web0js/router'
import { ServerView } from './server-view'

export interface ServerAppOptions<P> {
  view: ServerView<P>
  routes: Route[]
  template: string
  publicPath: string
  port: number
  host: string
}

export interface ServerApp<P> {
  setOptions: (options: ServerAppOptions<P>) => void
  start: () => Promise<void>
}
