import { Context } from './web-types'

interface HasGetData {
  getData: (context: Context) => Promise<any>
}

const isHasGetData = (page: any): page is HasGetData => {
  return typeof page.getData === 'function'
}

export const getPageData = async (page: any, context: Context): Promise<any> => {
  if (isHasGetData(page)) {
    return page.getData(context)
  }
  return {}
}
