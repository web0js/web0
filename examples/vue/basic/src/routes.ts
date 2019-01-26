import Vue, { CreateElement } from 'vue'
import Component from 'vue-class-component'
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

@Component({
  components: {
    Counter,
  },
})
class WelcomePage extends Vue {
  static async getPageData (context: Context): Promise<CommonPageData> {
    return getPageData(context)
  }
  render (createElement: CreateElement) {
    const { message } = this.$data.data
    return createElement('div', [
      createElement('h3', `Welcome! ${message}`),
      createElement('Counter'),
    ])
  }
}

@Component({
  components: {
    Counter,
  },
})
class HelloNamePage extends Vue {
  static async getPageData (context: Context): Promise<CommonPageData> {
    return getPageData(context)
  }
  render (createElement: CreateElement) {
    const { message } = this.$data.data
    const { params } = this.$data.context
    return createElement('div', [
      createElement('h2', `Hi, ${params.name}! ${message}`),
      createElement('Counter', { props: { initialValue: 10 } }),
    ])
  }
}

@Component({
  components: {
    Counter,
  },
})
class HelloSpecialNamePage extends Vue {
  static async getPageData (context: Context): Promise<CommonPageData> {
    return getPageData(context)
  }
  render (createElement: CreateElement) {
    const { message } = this.$data.data
    const { params } = this.$data.context
    return createElement('div', [
      createElement('h1', `Hello, ${params.specialName}! ${message}`),
      createElement('Counter', { props: { initialValue: 20 } }),
    ])
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
