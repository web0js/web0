import React, { Component } from 'react'
import { Route, Context, PageProps } from '@web0js/router'
import { Counter } from './Counter'

interface CommonPageData {
  message: string
}

const getPageData = ({ query }: Context): Promise<CommonPageData> => {
  return new Promise<CommonPageData>((resolve) => {
    setTimeout(() => resolve({ message: `Query: ${JSON.stringify(query)}.` }), 500)
  })
}

class WelcomePage extends Component<PageProps<CommonPageData>> {
  static async getPageData (context: Context): Promise<CommonPageData> {
    return getPageData(context)
  }
  render () {
    const { message } = this.props.data
    return (
      <div>
        <h3>Welcome! {message}</h3>
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
    const { params } = this.props.context
    return (
      <div>
        <h2>Hi, {params.name}! {message}</h2>
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
    const { params } = this.props.context
    return (
      <div>
        <h1>Hello, {params.specialName}! {message}</h1>
        <Counter initialValue={20}/>
      </div>
    )
  }
}

export const routes: Route[] = [
  {
    path: '/',
    handler: ({ render }: Context) => render(WelcomePage),
  },
  {
    path: '/:name',
    handler: async ({ params, render, nextRoute }: Context) => {
      if (params.name === 'World') {
        return nextRoute()
      }
      return render(HelloNamePage)
    },
  },
  {
    path: '/:specialName',
    handler: ({ render }: Context) => render(HelloSpecialNamePage),
  },
]
