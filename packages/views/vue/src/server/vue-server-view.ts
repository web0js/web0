import Vue from 'vue'
import { createRenderer } from 'vue-server-renderer'
import { PageProps } from '@web0js/router'
import { ServerView } from '@web0js/core/lib/server'
import { VuePage } from '../common'

export class VueServerView implements ServerView<VuePage> {
  renderToString (page: VuePage, props: PageProps): Promise<string> {
    const wrapperPage = Vue.extend({
      data () {
        return {
          data: props.data,
          context: props.context,
        }
      }
    })
    return createRenderer().renderToString(new wrapperPage(page))
  }
}
