import express, { Express, Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import { ServerApp, ServerAppOptions, Context } from '@web0js/web/lib/web-types'
import { Router } from '@web0js/router'
import { Route } from '@web0js/router/lib/router-types'

export class ExpressServerApp<V> implements ServerApp<V> {
  private app?: Express
  private options?: ServerAppOptions<V>

  setOptions (options: ServerAppOptions<V>) {
    this.options = options
    const app = (this.app = express())
    const { routes, view } = options
    app.use(helmet())
    app.use(compression())
    app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
    const router = new Router<Context>(routes)
    app.get('*', async (req: Request, res: Response, next: NextFunction) => {
      const createContext = (route: Route<Context>, nextRouteIndex: number, params: Record<string, string>) => {
        const context: Context = {
          isServer: true,
          isClient: false,
          path: req.path,
          route: {
            ...route,
            params,
            query: req.query,
          },
          render: (page: V) => () => {
            res.send(view.renderToString(page, {}, context))
          },
          nextRoute: () => () => {
            return router.handlePath(req.path, createContext, nextRouteIndex)
          },
        }
        return context
      }
      try {
        await router.handlePath(req.path, createContext)
        next()
      } catch (err) {
        next(err)
      }
    })
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