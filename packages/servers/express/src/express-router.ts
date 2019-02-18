import { Request, Response, NextFunction } from 'express'
import { Route, Context } from '@web0js/router'
import { BaseRouter } from '@web0js/router/lib/base-router'
import { getPageData } from '@web0js/core/lib/common'
import { ServerView, TemplateRenderer } from '@web0js/core/lib/server'

export interface ExpressRouterOptions<P> {
  templateRenderer: TemplateRenderer
  view: ServerView<P>
  routes: Route[]
}

export class ExpressRouter<P> {
  private readonly baseRouter: BaseRouter

  constructor (private readonly options: ExpressRouterOptions<P>) {
    this.baseRouter = new BaseRouter(options.routes)
  }

  middleware () {
    return async (req: Request, res: Response, next: NextFunction) => {
      const { templateRenderer, view } = this.options
      const createContext = (route: Route, routeIndex: number, params: any) => {
        const context: Context = {
          isServer: true,
          isClient: false,
          path: req.path,
          params,
          query: req.query,
          render: (page: P) => async () => {
            const data = await getPageData(page, context)
            res.send(
              templateRenderer.render({
                initialData: {
                  data,
                  matchedRouteIndex: routeIndex,
                },
                pageContent: await view.renderToString(page, { data, context }),
              }),
            )
          },
          nextRoute: () => () => {
            return this.baseRouter.handlePath(req.path, createContext, routeIndex + 1)
          },
        }
        return context
      }
      try {
        await this.baseRouter.handlePath(req.path, createContext)
        next()
      } catch (err) {
        next(err)
      }
    }
  }
}
