import React, { ComponentClass } from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import { View, Context } from '@web0js/types'

export interface ReactPageProps<D = any> {
  data: D
  context: Context
}

export class ReactView implements View<ComponentClass<ReactPageProps>> {
  render (page: ComponentClass<ReactPageProps>, container: HTMLElement, data: any, context: Context) {
    ReactDOM.render(this.createElement(page, data, context), container)
  }
  renderToString (page: ComponentClass<ReactPageProps>, data: any, context: Context): string {
    return ReactDOMServer.renderToString(this.createElement(page, data, context))
  }
  hydrate (page: ComponentClass<ReactPageProps>, container: HTMLElement, data: any, context: Context) {
    ReactDOM.hydrate(this.createElement(page, data, context), container)
  }
  private createElement (page: ComponentClass<ReactPageProps>, data: any, context: Context) {
    return React.createElement(page, { data, context })
  }
}
