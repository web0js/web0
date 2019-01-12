import ReactDOMServer from 'react-dom/server'
import { Context, ServerView } from '@web0js/web/lib/web-types'
import { ReactPage } from './react-types'
import { createElement } from './create-element'

export class ReactServerView implements ServerView<ReactPage> {
  renderToString (page: ReactPage, data: any, context: Context): string {
    return ReactDOMServer.renderToString(createElement(page, data, context))
  }
}
