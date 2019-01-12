import { ComponentClass } from 'react'
import ReactDOM from 'react-dom'
import { Context, ClientView } from '@web0js/web/lib/web-types'
import { ReactPageProps } from './react-types'
import { createElement } from './create-element'

export class ReactClientView implements ClientView<ComponentClass<ReactPageProps>> {
  render (page: ComponentClass<ReactPageProps>, container: HTMLElement, data: any, context: Context) {
    ReactDOM.render(createElement(page, data, context), container)
  }
  hydrate (page: ComponentClass<ReactPageProps>, container: HTMLElement, data: any, context: Context) {
    ReactDOM.hydrate(createElement(page, data, context), container)
  }
}
