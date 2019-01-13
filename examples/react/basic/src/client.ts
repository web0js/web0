import { ClientApp } from '@web0js/web/lib/client-app'
import { ReactPage } from '@web0js/react/lib/react-types'
import { ReactClientView } from '@web0js/react/lib/react-client-view'
import { routes } from './routes'

const main = async (): Promise<void> => {
  const app = new ClientApp<ReactPage>({
    view: new ReactClientView(),
    routes,
  })
  await app.start()
}

main().catch(console.error)
