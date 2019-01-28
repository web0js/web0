import React, { Component, MouseEvent, MouseEventHandler } from 'react'
import { isModifiedEvent } from '@web0js/router/lib/events'

interface ReactLinkProps {
  to: string
  onClick?: MouseEventHandler
}

export class ReactLink extends Component<ReactLinkProps> {
  private onClick = (event: MouseEvent) => {
    if (this.props.onClick) {
      this.props.onClick(event)
    }
    // TODO: make this common
    if (!event.defaultPrevented && !isModifiedEvent(event)) {
      event.preventDefault()
    }
  }

  render () {
    const { to, ...rest } = this.props
    return (
      <a
        {...rest}
        href={to}
        onClick={this.onClick}
      />
    )
  }
}
