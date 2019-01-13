import React, { Component } from 'react'
import { Context, PageProps } from '@web0js/web/lib/web-types'
import { ExpressServerApp } from '@web0js/express'
import { ReactPage } from '@web0js/react/lib/react-types'
import { ReactServerView } from '@web0js/react/lib/react-server-view'
import template from 'raw-loader!./client.hbs'

interface CommonPageData {
  message: string
}

const getData = ({ route }: Context): Promise<CommonPageData> => {
  return new Promise<CommonPageData>((resolve) => {
    setTimeout(() => resolve({ message: `You are at route ${route.path}.` }), 1000)
  })
}

class WelcomePage extends Component<PageProps<CommonPageData>> {
  static async getData (context: Context): Promise<CommonPageData> {
    return getData(context)
  }
  render () {
    const { message } = this.props.data
    return (
      <h3>Welcome! {message}</h3>
    )
  }
}

class HelloNamePage extends Component<PageProps<CommonPageData>> {
  static async getData (context: Context): Promise<CommonPageData> {
    return getData(context)
  }
  render () {
    const { message } = this.props.data
    const { route } = this.props.context
    return (
      <h2>Hi, {route.params.name}! {message}</h2>
    )
  }
}

class HelloSpecialNamePage extends Component<PageProps<CommonPageData>> {
  static async getData (context: Context): Promise<CommonPageData> {
    return getData(context)
  }
  render () {
    const { message } = this.props.data
    const { route } = this.props.context
    return (
      <h1>Hello, {route.params.specialName}! {message}</h1>
    )
  }
}

const main = async (): Promise<void> => {
  const app = new ExpressServerApp<ReactPage>()
  app.setOptions({
    view: new ReactServerView(),
    template,
    routes: [
      {
        path: '/',
        handler: ({ render }) => render(WelcomePage),
      },
      {
        path: '/:name',
        handler: async ({ route, render, nextRoute }) => {
          if (route.params.name === 'World') {
            return nextRoute()
          }
          return render(HelloNamePage)
        },
      },
      {
        path: '/:specialName',
        handler: ({ render }) => render(HelloSpecialNamePage),
      },
    ],
    port: 3000,
    host: 'localhost',
  })
  await app.start()
}

if (require.main === module) {
  main().catch(console.error)
}
