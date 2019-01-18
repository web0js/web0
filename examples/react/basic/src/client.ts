import { ClientApp } from '@web0js/core/lib/client'
import { ReactPage } from '@web0js/react/lib/common'
import { ReactClientView } from '@web0js/react/lib/client'
import { routes } from './routes'

const main = async (): Promise<void> => {
  const app = new ClientApp<ReactPage>({
    view: new ReactClientView(),
    routes,
  })
  await app.start()
}

main().catch(console.error)
