import Vue, { CreateElement } from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export class Counter extends Vue {
  @Prop({ default: 0 }) initialValue!: number
  value = this.initialValue
  render (createElement: CreateElement) {
    return createElement('div', [
      createElement('p', `Value: ${this.value}`),
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
