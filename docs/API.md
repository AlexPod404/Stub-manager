# Stub Manager API Documentation

## Overview
Stub Manager provides REST API for managing dynamic stubs with support for REST, gRPC, and Kafka protocols.

## Base URL
```
http://localhost:8080/api/v1
```

## Swagger UI
Interactive API documentation is available at:
```
http://localhost:8080/swagger-ui.html
```

## Authentication
Currently, no authentication is required. This will be added in future releases.

## Mock Management

### Create Mock
**POST** `/mocks`

Request body:
```json
{
  "name": "User Service Mock",
  "description": "Mock for user service",
  "protocol": "REST",
  "isActive": true,
  "responseDelay": 0
}
```

### Get All Mocks
**GET** `/mocks`

### Get Mock by ID
**GET** `/mocks/{id}`

### Update Mock
**PUT** `/mocks/{id}`

### Delete Mock
**DELETE** `/mocks/{id}`

### Start Mock
**POST** `/mocks/{id}/start`

### Stop Mock
**POST** `/mocks/{id}/stop`

### Set Delay
**PUT** `/mocks/{id}/delay`

Request body:
```json
{
  "delay": 1000
}
```

## Route Management

### Create Route
**POST** `/mocks/{mockId}/routes`

Request body:
```json
{
  "path": "/api/users",
  "method": "GET",
  "isActive": true
}
```

### Get Routes
**GET** `/mocks/{mockId}/routes`

### Update Route
**PUT** `/routes/{id}`

### Delete Route
**DELETE** `/routes/{id}`

## Condition Management

### Create Condition
**POST** `/routes/{routeId}/conditions`

Request body:
```json
{
  "type": "EQUALS",
  "parameterName": "userId",
  "parameterSource": "QUERY",
  "expectedValue": "123",
  "priority": 1,
  "response": {
    "statusCode": 200,
    "body": "{\"id\": \"123\", \"name\": \"John Doe\"}",
    "headers": "{\"Content-Type\": \"application/json\"}",
    "responseDelay": 0
  }
}
```

### Get Conditions
**GET** `/routes/{routeId}/conditions`

### Update Condition
**PUT** `/conditions/{id}`

### Delete Condition
**DELETE** `/conditions/{id}`

## Scenario Management

### Create Scenario
**POST** `/scenarios`

Request body:
```json
{
  "name": "Resilience Test Scenario",
  "description": "Test service resilience",
  "actions": [
    {
      "actionType": "START",
      "mockId": 1,
      "timeOffset": 0,
      "sequenceOrder": 1
    },
    {
      "actionType": "SET_DELAY",
      "mockId": 1,
      "delayValue": 5000,
      "timeOffset": 10000,
      "sequenceOrder": 2
    },
    {
      "actionType": "STOP",
      "mockId": 1,
      "timeOffset": 20000,
      "sequenceOrder": 3
    }
  ]
}
```

### Get All Scenarios
**GET** `/scenarios`

### Get Scenario
**GET** `/scenarios/{id}`

### Update Scenario
**PUT** `/scenarios/{id}`

### Delete Scenario
**DELETE** `/scenarios/{id}`

### Execute Scenario
**POST** `/scenarios/{id}/execute`

### Get Scenario Results
**GET** `/scenarios/{id}/results`

## Error Responses

### Not Found (404)
```json
{
  "timestamp": "2024-02-12T17:00:00",
  "status": 404,
  "error": "Not Found",
  "message": "Mock not found with id: 123"
}
```

### Internal Server Error (500)
```json
{
  "timestamp": "2024-02-12T17:00:00",
  "status": 500,
  "error": "Internal Server Error",
  "message": "Error processing request"
}
```
