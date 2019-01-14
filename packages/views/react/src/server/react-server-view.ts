import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { PageProps } from '@web0js/web'
import { ServerView } from '@web0js/web/lib/server'
import { ReactPage } from '../react-common-types'

export class ReactServerView implements ServerView<ReactPage> {
  renderToString (page: ReactPage, props: PageProps): string {
    return renderToString(createElement(page, props))
  }
}
