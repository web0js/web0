import { createElement } from 'react'
import { render, hydrate } from 'react-dom'
import { PageProps } from '@web0js/web'
import { ClientView } from '@web0js/web/lib/client'
import { ReactPage } from '../react-common-types'

export class ReactClientView implements ClientView<ReactPage> {
  render (page: ReactPage, container: HTMLElement, props: PageProps) {
    render(createElement(page, props), container)
  }

  hydrate (page: ReactPage, container: HTMLElement, props: PageProps) {
    hydrate(createElement(page, props), container)
  }
}
