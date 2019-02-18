import React, { Component, MouseEvent, MouseEventHandler } from 'react'
import { postHandleLinkEvent } from '@web0js/router/lib/link-helpers'

interface ReactLinkProps {
  to: string
  target?: string
  onClick?: MouseEventHandler
}

export class ReactLink extends Component<ReactLinkProps> {
  private handleClick = (event: MouseEvent) => {
    if (this.props.onClick) {
      this.props.onClick(event)
    }
    postHandleLinkEvent(event, this.props.target)
  }

  render () {
    const { to, ...rest } = this.props
    return (
      <a
        {...rest}
        href={to}
        onClick={this.handleClick}
      />
    )
  }
}
