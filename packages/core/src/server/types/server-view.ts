import { PageProps } from '@web0js/router'

export interface ServerView<P> {
  renderToString: (page: P, props: PageProps) => Promise<string>
}
