import { Context } from './web-common-types'

interface HasGetPageData {
  getPageData: (context: Context) => Promise<any>
}

const isHasGetPageData = (page: any): page is HasGetPageData => {
  return typeof page.getPageData === 'function'
}

export const getPageData = async (page: any, context: Context): Promise<any> => {
  if (isHasGetPageData(page)) {
    return page.getPageData(context)
  }
  return {}
}
