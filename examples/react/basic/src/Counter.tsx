import React, { Component } from 'react'

interface CounterProps {
  initialValue: number
}

interface CounterState {
  value: number
}

export class Counter extends Component<CounterProps, CounterState> {
  static defaultProps = {
    initialValue: 0,
  }

  constructor (props: CounterProps) {
    super(props)
    this.state = {
      value: props.initialValue,
    }
  }

  increase = () => {
    this.setState({ value: this.state.value + 1 })
  }

  decrease = () => {
    this.setState({ value: this.state.value - 1 })
  }

  render () {
    return (
      <div>
        <p>Value: {this.state.value}</p>
        <button type='button' onClick={this.increase}>Increase</button>
        <button type='button' onClick={this.decrease}>Decrease</button>
      </div>
    )
  }
}
