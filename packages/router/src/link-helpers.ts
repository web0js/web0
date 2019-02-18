import { LinkEvent } from './types'

const isModifiedEvent = (event: LinkEvent): boolean => {
  return event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
}

export const postHandleLinkEvent = (event: LinkEvent, target?: string) => {
  if (
    !event.defaultPrevented && // onClick prevented default
    event.button === 0 && // ignore everything but left clicks
    (!target || target === "_self") && // let browser handle "target=_blank" etc.
    !isModifiedEvent(event) // ignore clicks with modifier keys
  ) {
    event.preventDefault()
  }
}
