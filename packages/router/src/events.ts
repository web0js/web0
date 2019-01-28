export interface LinkClickEvent {
  metaKey: boolean
  altKey: boolean
  ctrlKey: boolean
  shiftKey: boolean
}

export const isModifiedEvent = (event: LinkClickEvent): boolean => {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
}
