import { Request, Response, NextFunction } from 'express'
import { Context, RequestInfo, getPageData } from '@web0js/web'
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
      const requestInfo: RequestInfo = {
        params,
        query: req.query,
      }
      const context: Context = {
        isServer: true,
        isClient: false,
        path: req.path,
        route: { ...route, ...requestInfo },
        render: (page: P) => async () => {
          const data = await getPageData(page, context)
          res.send(
            templateRenderer.render({
              initialData: {
                data,
                route: {
                  path: req.path,
                  routeIndex,
                  ...requestInfo,
                },
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
