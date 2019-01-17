import { Action } from './action'

export interface Context<PT = any, QT = any> {
  isServer: boolean
  isClient: boolean
  path: string
  params: PT
  query: QT
  render: (page: any) => Action
  nextRoute: () => Action
}
