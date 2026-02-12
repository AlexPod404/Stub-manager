export class ParameterExtractor {
  static extractFromHeader(req: any, paramName: string): any {
    return req.headers[paramName.toLowerCase()];
  }

  static extractFromQuery(req: any, paramName: string): any {
    return req.query[paramName];
  }

  static extractFromBody(req: any, path: string): any {
    const keys = path.split('.');
    let value = req.body;
    
    for (const key of keys) {
      if (value && typeof value === 'object') {
        value = value[key];
      } else {
        return undefined;
      }
    }
    
    return value;
  }

  static extractFromPath(req: any, paramName: string): any {
    return req.params[paramName];
  }
}
