import Vue from 'vue'
import { PageProps } from '@web0js/router'
import { ClientView } from '@web0js/core/lib/client'
import { VuePage } from '../common'

export class VueClientView implements ClientView<VuePage> {
  render (page: VuePage, container: HTMLElement | null, props: PageProps) {
    const wrapperPage = Vue.extend({
      data () {
        return {
          data: props.data,
          context: props.context,
        }
      }
    })
    page.el = container ? container.id : 'app'
    new wrapperPage(page)
  }

  hydrate (page: VuePage, container: HTMLElement | null, props: PageProps) {
    this.render(page, container, props)
  }
}
