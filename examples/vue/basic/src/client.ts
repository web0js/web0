import { ClientApp } from '@web0js/core/lib/client'
import { VuePage } from '@web0js/vue/lib/common'
import { VueClientView } from '@web0js/vue/lib/client'
import { routes } from './routes'

const main = async (): Promise<void> => {
  const app = new ClientApp<VuePage>({
    view: new VueClientView(),
    routes,
  })
  await app.start()
}

main().catch(console.error)
