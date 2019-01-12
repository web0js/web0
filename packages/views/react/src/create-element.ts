import React, { ComponentClass } from 'react'
import { Context } from '@web0js/web/lib/web-types'
import { ReactPageProps } from './react-types'

export const createElement = (page: ComponentClass<ReactPageProps>, data: any, context: Context) => {
  return React.createElement(page, { data, context })
}
