import { createElement } from 'react'
import { render, hydrate } from 'react-dom'
import { PageProps, ClientView } from '@web0js/web/lib/web-types'
import { ReactPage } from './react-types'

export class ReactClientView implements ClientView<ReactPage> {
  render (page: ReactPage, container: HTMLElement, props: PageProps) {
    render(createElement(page, props), container)
  }
  hydrate (page: ReactPage, container: HTMLElement, props: PageProps) {
    hydrate(createElement(page, props), container)
  }
}
