import Vue, { CreateElement } from 'vue'
import { Component, Prop } from 'vue-property-decorator'

@Component
export class Counter extends Vue {
  @Prop() initialValue!: number
  value = this.initialValue || 0
  render (createElement: CreateElement) {
    return createElement('div', [
      createElement('p', ` Value: ${this.value}`),
      createElement('button', { attrs: { type: 'button' }, on: { click: this.increase } }, 'Increase'),
      createElement('button', { attrs: { type: 'button' }, on: { click: this.decrease } }, 'Decrease'),
    ])
  }
  increase () {
    this.value++
  }
  decrease () {
    this.value--
  }
}
