import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { PageProps, ServerView } from '@web0js/web/lib/web-types'
import { ReactPage } from './react-types'

export class ReactServerView implements ServerView<ReactPage> {
  renderToString (page: ReactPage, props: PageProps): string {
    return renderToString(createElement(page, props))
  }
}
