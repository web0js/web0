import { Request, Response, NextFunction } from 'express'
import { Context, getPageData } from '@web0js/web'
import { ServerView, TemplateRenderer } from '@web0js/web/lib/server'
import { Router, Route } from '@web0js/router'

export interface ExpressRouterOptions<P> {
  templateRenderer: TemplateRenderer
  view: ServerView<P>
  router: Router<Context>
}

export class ExpressRouter<P> {
  constructor (private readonly options: ExpressRouterOptions<P>) {}

  middleware = async (req: Request, res: Response, next: NextFunction) => {
    const { templateRenderer, view, router } = this.options
    const createContext = (route: Route<Context>, routeIndex: number, params: Record<string, string>) => {
      const context: Context = {
        isServer: true,
        isClient: false,
        path: req.path,
        route: {
          ...route,
          params,
          query: req.query,
        },
        render: (page: P) => async () => {
          const data = await getPageData(page, context)
          res.send(
            templateRenderer.render({
              initialData: {
                data,
                matchedRouteIndex: routeIndex,
              },
              pageContent: view.renderToString(page, { data, context }),
            }),
          )
        },
        nextRoute: () => () => {
          return router.handlePath(req.path, createContext, routeIndex + 1)
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
  }
}
