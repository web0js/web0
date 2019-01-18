import { createElement } from 'react'
import { render, hydrate } from 'react-dom'
import { PageProps } from '@web0js/router'
import { ClientView } from '@web0js/core/lib/client'
import { ReactPage } from '../common'

export class ReactClientView implements ClientView<ReactPage> {
  render (page: ReactPage, container: HTMLElement | null, props: PageProps) {
    render(createElement(page, props), container)
  }

  hydrate (page: ReactPage, container: HTMLElement | null, props: PageProps) {
    hydrate(createElement(page, props), container)
  }
}
