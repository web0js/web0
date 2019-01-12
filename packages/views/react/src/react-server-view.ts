import { ComponentClass } from 'react'
import ReactDOMServer from 'react-dom/server'
import { Context, ServerView } from '@web0js/web/lib/web-types'
import { ReactPageProps } from './react-types'
import { createElement } from './create-element'

export class ReactServerView implements ServerView<ComponentClass<ReactPageProps>> {
  renderToString (page: ComponentClass<ReactPageProps>, data: any, context: Context): string {
    return ReactDOMServer.renderToString(createElement(page, data, context))
  }
}
