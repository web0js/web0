import express, { Express, Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import { Route, Context } from '@web0js/types'
import { Router } from '@web0js/router'

export interface AppOptions {
  routes: Route<Context>[]
  port: number
  host: string
}

export class App {
  private readonly app: Express

  constructor (private readonly options: AppOptions) {
    const { routes } = options
    const app = (this.app = express())
    app.use(helmet())
    app.use(compression())
    app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
    const router = new Router<Context>(routes)
    app.get('*', async (req: Request, res: Response, next: NextFunction) => {
      const createContext = (
        route: Route<Context>,
        nextRouteIndex: number,
        params: Record<string, string>,
      ): Context => {
        return {
          isServer: true,
          isClient: false,
          path: req.path,
          route: {
            ...route,
            params,
            query: req.query,
          },
          render: (page: any) => () => {
          },
          nextRoute: () => () => {
            return router.handlePath(req.path, createContext, nextRouteIndex)
          },
        }
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
