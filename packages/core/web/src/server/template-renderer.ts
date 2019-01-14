import Handlebars from 'handlebars'

export interface TemplateContext {
  initialData: string
  pageContent: string
}

export class TemplateRenderer {
  private readonly renderTemplate: (context: TemplateContext) => string

  constructor (template: string) {
    this.renderTemplate = Handlebars.compile<TemplateContext>(template)
  }

  render (templateContext: TemplateContext): string {
    return this.renderTemplate(templateContext)
  }
}
