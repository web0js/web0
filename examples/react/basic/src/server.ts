import path from 'path'
import { ExpressServerApp } from '@web0js/express'
import { ReactPage } from '@web0js/react/lib/react-types'
import { ReactServerView } from '@web0js/react/lib/react-server-view'
import { routes } from './routes'
import template from 'raw-loader!./client.hbs'

const main = async (): Promise<void> => {
  const app = new ExpressServerApp<ReactPage>()
  app.setOptions({
    view: new ReactServerView(),
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
