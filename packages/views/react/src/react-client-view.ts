import ReactDOM from 'react-dom'
import { Context, ClientView } from '@web0js/web/lib/web-types'
import { ReactPage } from './react-types'
import { createElement } from './create-element'

export class ReactClientView implements ClientView<ReactPage> {
  render (page: ReactPage, container: HTMLElement, data: any, context: Context) {
    ReactDOM.render(createElement(page, data, context), container)
  }
  hydrate (page: ReactPage, container: HTMLElement, data: any, context: Context) {
    ReactDOM.hydrate(createElement(page, data, context), container)
  }
}
