export interface Mock {
  id: string;
  name: string;
  description?: string;
  protocol: 'REST' | 'GRPC' | 'KAFKA';
  status: 'ACTIVE' | 'INACTIVE';
  responseDelay: number;
  metadata?: any;
  createdAt: string;
  updatedAt: string;
}

export interface Route {
  id: string;
  mockId: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  description?: string;
  defaultResponse?: any;
  statusCode?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Condition {
  id: string;
  routeId: string;
  parameterName: string;
  parameterSource: 'QUERY' | 'HEADER' | 'BODY' | 'PATH';
  operator: 'EQUALS' | 'NOT_EQUALS' | 'CONTAINS' | 'NOT_CONTAINS' | 'GREATER_THAN' | 'LESS_THAN' | 'REGEX';
  expectedValue: string;
  response: any;
  statusCode?: number;
  priority: number;
  createdAt: string;
  updatedAt: string;
}

export interface Scenario {
  id: string;
  name: string;
  description?: string;
  status: 'DRAFT' | 'READY' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  createdAt: string;
  updatedAt: string;
}
