import React, { Component } from 'react'
import { MatchedRoute } from '@web0js/web'

export interface QueryProps {
  route: MatchedRoute
}

export class Query extends Component<QueryProps> {
  render () {
    const { route } = this.props
    return (
      <div><strong>Query:</strong> {JSON.stringify(route.query)}</div>
    )
  }
}
