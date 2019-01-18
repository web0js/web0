import Handlebars from 'handlebars'
import { InitialData } from '../common'

export interface TemplateRenderOptions {
  initialData: InitialData
  pageContent: string
}

interface TemplateContext {
  initialDataName: string
  initialData: string
  pageContent: string
}

export class TemplateRenderer {
  private readonly renderTemplate: (context: TemplateContext) => string

  constructor (template: string) {
    this.renderTemplate = Handlebars.compile<TemplateContext>(template)
  }

  render ({ initialData, pageContent }: TemplateRenderOptions): string {
    return this.renderTemplate({
      initialDataName: 'WEB0_INITIAL_DATA',
      initialData: JSON.stringify(initialData),
      pageContent,
    })
  }
}
