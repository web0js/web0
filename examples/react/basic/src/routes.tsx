import React, { Component } from 'react'
import { Context, PageProps } from '@web0js/web'
import { Route } from '@web0js/router'
import { Query } from './Query'
import { Counter } from './Counter'

interface CommonPageData {
  message: string
}

const getPageData = ({ route }: Context): Promise<CommonPageData> => {
  return new Promise<CommonPageData>((resolve) => {
    setTimeout(() => resolve({ message: `You are at route ${route.path}.` }), 500)
  })
}

class WelcomePage extends Component<PageProps<CommonPageData>> {
  static async getPageData (context: Context): Promise<CommonPageData> {
    return getPageData(context)
  }
  render () {
    const { message } = this.props.data
    const { route } = this.props.context
    return (
      <div>
        <h3>Welcome! {message}</h3>
        <Query route={route}/>
        <Counter/>
      </div>
    )
  }
}

class HelloNamePage extends Component<PageProps<CommonPageData>> {
  static async getPageData (context: Context): Promise<CommonPageData> {
    return getPageData(context)
  }
  render () {
    const { message } = this.props.data
    const { route } = this.props.context
    return (
      <div>
        <h2>Hi, {route.params.name}! {message}</h2>
        <Query route={route}/>
        <Counter initialValue={10}/>
      </div>
    )
  }
}

class HelloSpecialNamePage extends Component<PageProps<CommonPageData>> {
  static async getPageData (context: Context): Promise<CommonPageData> {
    return getPageData(context)
  }
  render () {
    const { message } = this.props.data
    const { route } = this.props.context
    return (
      <div>
        <h1>Hello, {route.params.specialName}! {message}</h1>
        <Query route={route}/>
        <Counter initialValue={20}/>
      </div>
    )
  }
}

export const routes: Route<Context>[] = [
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
]
