# Stub Manager API Documentation

## Overview

The Stub Manager API provides endpoints for managing dynamic stubs, routes, conditions, and test scenarios.

Base URL: `http://localhost:3000/api`

API Documentation (Swagger): `http://localhost:3000/api/docs`

## Authentication

Currently, no authentication is required. This should be added in production.

## API Endpoints

### Mock Management

#### Create Mock
```http
POST /api/mocks
Content-Type: application/json

{
  "name": "User Service Mock",
  "description": "Mock for user service endpoints",
  "protocol": "REST",
  "responseDelay": 100,
  "metadata": {}
}
```

#### Get All Mocks
```http
GET /api/mocks
```

#### Get Mock by ID
```http
GET /api/mocks/:id
```

#### Update Mock
```http
PUT /api/mocks/:id
Content-Type: application/json

{
  "name": "Updated Mock Name",
  "responseDelay": 200
}
```

#### Delete Mock
```http
DELETE /api/mocks/:id
```

#### Start Mock
```http
POST /api/mocks/:id/start
```

#### Stop Mock
```http
POST /api/mocks/:id/stop
```

#### Set Response Delay
```http
PUT /api/mocks/:id/delay
Content-Type: application/json

{
  "delay": 500
}
```

### Route Management

#### Create Route
```http
POST /api/mocks/:mockId/routes
Content-Type: application/json

{
  "path": "/users/:id",
  "method": "GET",
  "description": "Get user by ID",
  "defaultResponse": {
    "id": 1,
    "name": "John Doe"
  },
  "statusCode": 200
}
```

#### Get Routes for Mock
```http
GET /api/mocks/:mockId/routes
```

#### Get Route by ID
```http
GET /api/routes/:id
```

#### Update Route
```http
PUT /api/routes/:id
Content-Type: application/json

{
  "path": "/users/:id",
  "statusCode": 201
}
```

#### Delete Route
```http
DELETE /api/routes/:id
```

### Condition Management

#### Create Condition
```http
POST /api/routes/:routeId/conditions
Content-Type: application/json

{
  "parameterName": "userId",
  "parameterSource": "QUERY",
  "operator": "EQUALS",
  "expectedValue": "123",
  "response": {
    "id": 123,
    "name": "Special User"
  },
  "statusCode": 200,
  "priority": 10
}
```

#### Get Conditions for Route
```http
GET /api/routes/:routeId/conditions
```

#### Get Condition by ID
```http
GET /api/conditions/:id
```

#### Update Condition
```http
PUT /api/conditions/:id
Content-Type: application/json

{
  "expectedValue": "456",
  "priority": 20
}
```

#### Delete Condition
```http
DELETE /api/conditions/:id
```

### Scenario Management

#### Create Scenario
```http
POST /api/scenarios
Content-Type: application/json

{
  "name": "Fault Tolerance Test",
  "description": "Test service behavior during failures"
}
```

#### Get All Scenarios
```http
GET /api/scenarios
```

#### Get Scenario by ID
```http
GET /api/scenarios/:id
```

#### Update Scenario
```http
PUT /api/scenarios/:id
Content-Type: application/json

{
  "name": "Updated Scenario Name"
}
```

#### Delete Scenario
```http
DELETE /api/scenarios/:id
```

#### Add Action to Scenario
```http
POST /api/scenarios/:id/actions
Content-Type: application/json

{
  "order": 1,
  "actionType": "START_MOCK",
  "parameters": {
    "mockId": "uuid-here"
  }
}
```

#### Execute Scenario
```http
POST /api/scenarios/:id/execute
```

#### Get Scenario Results
```http
GET /api/scenarios/:id/results
```

## Data Models

### Mock
```typescript
{
  id: string;
  name: string;
  description?: string;
  protocol: 'REST' | 'GRPC' | 'KAFKA';
  status: 'ACTIVE' | 'INACTIVE';
  responseDelay: number;
  metadata?: object;
  createdAt: Date;
  updatedAt: Date;
}
```

### Route
```typescript
{
  id: string;
  mockId: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  description?: string;
  defaultResponse?: object;
  statusCode?: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Condition
```typescript
{
  id: string;
  routeId: string;
  parameterName: string;
  parameterSource: 'QUERY' | 'HEADER' | 'BODY' | 'PATH';
  operator: 'EQUALS' | 'NOT_EQUALS' | 'CONTAINS' | 'NOT_CONTAINS' | 'GREATER_THAN' | 'LESS_THAN' | 'REGEX';
  expectedValue: string;
  response: object;
  statusCode?: number;
  priority: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Scenario
```typescript
{
  id: string;
  name: string;
  description?: string;
  status: 'DRAFT' | 'READY' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  createdAt: Date;
  updatedAt: Date;
}
```

## Error Responses

All error responses follow this format:

```json
{
  "statusCode": 400,
  "message": "Error message",
  "error": "Bad Request"
}
```

Common status codes:
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error
