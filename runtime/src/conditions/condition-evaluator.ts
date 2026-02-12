export class ConditionEvaluator {
  static evaluate(value: any, conditionType: string, expectedValue: any): boolean {
    switch (conditionType) {
      case 'equals':
        return value === expectedValue;
      
      case 'contains':
        return String(value).includes(String(expectedValue));
      
      case 'regex':
        const regex = new RegExp(expectedValue);
        return regex.test(String(value));
      
      default:
        return false;
    }
  }
}
