import express, { Express } from 'express'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import { Context } from '@web0js/web'
import { ServerApp, ServerAppOptions, TemplateRenderer } from '@web0js/web/lib/server'
import { Router } from '@web0js/router'
import { routeHandler } from './express-route-handler'

export class ExpressServerApp<P> implements ServerApp<P> {
  private app?: Express
  private options?: ServerAppOptions<P>

  setOptions (options: ServerAppOptions<P>) {
    this.options = options
    const app = (this.app = express())
    const { template, view, routes, publicPath } = options
    app.use(helmet())
    app.use(compression())
    app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
    app.use('/public', express.static(publicPath))
    app.get(
      '*',
      routeHandler({
        templateRenderer: new TemplateRenderer(template),
        view,
        router: new Router<Context>(routes),
      }),
    )
  }

  async start (): Promise<void> {
    if (!this.app) {
      throw new Error(`'app' is undefined`)
    }
    if (!this.options) {
      throw new Error(`'options' is undefined`)
    }
    const {
      app,
      options: { port, host },
    } = this
    return new Promise<void>((resolve) => {
      app.listen(port, host, resolve)
    })
  }
}
