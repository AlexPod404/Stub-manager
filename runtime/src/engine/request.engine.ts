export interface MockRequest {
  method: string;
  path: string;
  query?: Record<string, any>;
  headers?: Record<string, any>;
  body?: any;
}

export interface MockResponse {
  statusCode: number;
  headers?: Record<string, any>;
  body: any;
}

export class RequestEngine {
  evaluateConditions(request: MockRequest, conditions: any[]): MockResponse | null {
    // Sort by priority
    const sortedConditions = conditions.sort((a, b) => b.priority - a.priority);

    for (const condition of sortedConditions) {
      if (this.checkCondition(request, condition)) {
        return {
          statusCode: condition.statusCode || 200,
          body: condition.response,
        };
      }
    }

    return null;
  }

  private checkCondition(request: MockRequest, condition: any): boolean {
    const value = this.extractValue(request, condition.parameterSource, condition.parameterName);
    
    if (value === undefined) {
      return false;
    }

    switch (condition.operator) {
      case 'EQUALS':
        return String(value) === condition.expectedValue;
      case 'NOT_EQUALS':
        return String(value) !== condition.expectedValue;
      case 'CONTAINS':
        return String(value).includes(condition.expectedValue);
      case 'NOT_CONTAINS':
        return !String(value).includes(condition.expectedValue);
      case 'GREATER_THAN':
        return Number(value) > Number(condition.expectedValue);
      case 'LESS_THAN':
        return Number(value) < Number(condition.expectedValue);
      case 'REGEX':
        return new RegExp(condition.expectedValue).test(String(value));
      default:
        return false;
    }
  }

  private extractValue(request: MockRequest, source: string, name: string): any {
    switch (source) {
      case 'QUERY':
        return request.query?.[name];
      case 'HEADER':
        return request.headers?.[name];
      case 'BODY':
        return request.body?.[name];
      case 'PATH':
        // TODO: Implement path parameter extraction
        return undefined;
      default:
        return undefined;
    }
  }
}
