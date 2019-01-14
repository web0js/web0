import { Request, Response, NextFunction } from 'express'
import { Context, getPageData } from '@web0js/web'
import { ServerView, TemplateRenderer } from '@web0js/web/lib/server'
import { Router, Route } from '@web0js/router'

export interface RouteHandlerOptions<P> {
  templateRenderer: TemplateRenderer
  view: ServerView<P>
  router: Router<Context>
}

export const routeHandler = <P>(options: RouteHandlerOptions<P>) => {
  const { templateRenderer, view, router } = options
  return async (req: Request, res: Response, next: NextFunction) => {
    const createContext = (route: Route<Context>, routeIndex: number, params: Record<string, string>) => {
      const context: Context = {
        isServer: true,
        isClient: false,
        path: req.path,
        route: {
          ...route,
          index: routeIndex,
          params,
          query: req.query,
        },
        render: (page: P) => async () => {
          const data = await getPageData(page, context)
          res.send(
            templateRenderer.render({
              initialData: JSON.stringify({ data, route: context.route }),
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
