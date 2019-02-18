export interface LinkEvent {
  metaKey: boolean
  altKey: boolean
  ctrlKey: boolean
  shiftKey: boolean
  button: number
  defaultPrevented: boolean
  preventDefault(): void
}
