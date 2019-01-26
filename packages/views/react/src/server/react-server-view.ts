import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { PageProps } from '@web0js/router'
import { ServerView } from '@web0js/core/lib/server'
import { ReactPage } from '../common'

export class ReactServerView implements ServerView<ReactPage> {
  renderToString (page: ReactPage, props: PageProps): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        resolve(renderToString(createElement(page, props)))
      } catch (err) {
        reject(err)
      }
    })
  }
}
