import express, { Express } from 'express'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import { queryParser } from '@web0js/core/lib/common'
import { ServerApp, ServerAppOptions, TemplateRenderer } from '@web0js/core/lib/server'
import { ExpressRouter } from './express-router'

export class ExpressServerApp<P> implements ServerApp<P> {
  private app?: Express
  private options?: ServerAppOptions<P>

  setOptions (options: ServerAppOptions<P>) {
    this.options = options
    const app = (this.app = express())
    const { template, view, routes, publicPath } = options
    app.set('query parser', queryParser)
    app.use(helmet())
    app.use(compression())
    app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
    app.use('/public', express.static(publicPath))
    app.get(
      '*',
      new ExpressRouter({
        templateRenderer: new TemplateRenderer(template),
        view,
        routes,
      }).middleware(),
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
