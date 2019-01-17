import { parse as qsParse } from 'qs'

export const queryParser = (search: string) => {
  return qsParse(search)
}
