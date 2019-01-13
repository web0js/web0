import { Context } from './web-types'

const prefix = 'WEB0'

export const PAGE_PROPS = `${prefix}_PAGE_PROPS`
export const PAGE_CONTENT = `${prefix}_PAGE_CONTENT`

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
