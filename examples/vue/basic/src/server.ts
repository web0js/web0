import path from 'path'
import { ExpressServerApp } from '@web0js/express'
import { VuePage } from '@web0js/vue/lib/common'
import { VueServerView } from '@web0js/vue/lib/server'
import { routes } from './routes'
import template from 'raw-loader!./client.hbs'

const main = async (): Promise<void> => {
  const app = new ExpressServerApp<VuePage>()
  app.setOptions({
    view: new VueServerView(),
    routes,
    template,
    publicPath: path.join(__dirname, 'public'),
    port: 3000,
    host: 'localhost',
  })
  await app.start()
}

if (require.main === module) {
  main().catch(console.error)
}
