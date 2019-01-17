import { PageProps } from '@web0js/router'

export interface ClientView<P> {
  render: (page: P, container: HTMLElement | null, props: PageProps) => void
  hydrate: (page: P, container: HTMLElement | null, props: PageProps) => void
}
