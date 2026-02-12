export class ResponseBuilder {
  static build(template: any, parameters: Record<string, any>): any {
    const responseStr = JSON.stringify(template);
    let result = responseStr;

    // Replace parameters in template
    for (const [key, value] of Object.entries(parameters)) {
      const placeholder = `{{${key}}}`;
      result = result.replace(new RegExp(placeholder, 'g'), String(value));
    }

    return JSON.parse(result);
  }
}
