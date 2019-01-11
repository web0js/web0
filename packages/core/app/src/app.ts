import express, { Express, Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import { Route, Context, View } from '@web0js/types'
import { Router } from '@web0js/router'

export interface AppOptions<V> {
  view: View<V>
  routes: Route<Context>[]
  port: number
  host: string
}

export class App<V> {
  private readonly app: Express

  constructor (private readonly options: AppOptions<V>) {
    const { routes, view } = options
    const app = (this.app = express())
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
    const { port, host } = this.options
    return new Promise<void>((resolve) => {
      this.app.listen(port, host, resolve)
    })
  }
}
