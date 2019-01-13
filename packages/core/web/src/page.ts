import { Context } from './web-types'

const prefix = 'WEB0'

export const APP_CONTAINER = `${prefix}_APP_CONTAINER`
export const INITIAL_DATA = `${prefix}_INITIAL_DATA`
export const PAGE_CONTENT = `${prefix}_PAGE_CONTENT`

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
