# API Documentation

## Обзор

Stub Manager API предоставляет RESTful интерфейс для управления динамическими заглушками.

Base URL: `http://localhost:3000/api`

## Аутентификация

В текущей версии аутентификация не реализована.

## Endpoints

### Mocks (Заглушки)

#### GET /api/mocks
Получение списка всех заглушек.

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "User Service Mock",
    "description": "Mock для сервиса пользователей",
    "protocol": "REST",
    "status": "ACTIVE",
    "createdAt": "2024-01-01T00:00:00Z",
    "updatedAt": "2024-01-01T00:00:00Z"
  }
]
```

#### POST /api/mocks
Создание новой заглушки.

**Request:**
```json
{
  "name": "User Service Mock",
  "description": "Mock для сервиса пользователей",
  "protocol": "REST"
}
```

**Response:** 201 Created

#### PUT /api/mocks/:id
Обновление заглушки.

#### DELETE /api/mocks/:id
Удаление заглушки.

#### POST /api/mocks/:id/start
Запуск заглушки.

#### POST /api/mocks/:id/stop
Остановка заглушки.

#### PUT /api/mocks/:id/delay
Установка задержки ответа.

**Request:**
```json
{
  "delayMs": 1000
}
```

### Routes (Роуты)

#### GET /api/mocks/:mockId/routes
Получение списка роутов для заглушки.

#### POST /api/mocks/:mockId/routes
Создание роута.

**Request:**
```json
{
  "path": "/api/users",
  "method": "GET",
  "delayMs": 100,
  "isActive": true
}
```

#### PUT /api/routes/:id
Обновление роута.

#### DELETE /api/routes/:id
Удаление роута.

### Conditions (Условия)

#### GET /api/routes/:routeId/conditions
Получение условий для роута.

#### POST /api/routes/:routeId/conditions
Создание условия.

**Request:**
```json
{
  "type": "equals",
  "parameterName": "userId",
  "parameterSource": "query",
  "value": "123",
  "priority": 1,
  "response": {
    "statusCode": 200,
    "body": {
      "id": "123",
      "name": "John Doe"
    },
    "headers": {
      "Content-Type": "application/json"
    }
  }
}
```

#### PUT /api/conditions/:id
Обновление условия.

#### DELETE /api/conditions/:id
Удаление условия.

### Scenarios (Сценарии)

#### GET /api/scenarios
Получение списка сценариев.

#### POST /api/scenarios
Создание сценария.

**Request:**
```json
{
  "name": "Test Scenario",
  "description": "Тестирование отказоустойчивости",
  "actions": [
    {
      "timeOffsetMs": 0,
      "actionType": "start",
      "targetMockId": "uuid",
      "order": 1
    },
    {
      "timeOffsetMs": 5000,
      "actionType": "set_delay",
      "targetMockId": "uuid",
      "params": { "delayMs": 2000 },
      "order": 2
    },
    {
      "timeOffsetMs": 10000,
      "actionType": "stop",
      "targetMockId": "uuid",
      "order": 3
    }
  ]
}
```

#### POST /api/scenarios/:id/execute
Выполнение сценария.

#### GET /api/scenarios/executions/:id/results
Получение результатов выполнения сценария.

## Status Codes

- 200: OK
- 201: Created
- 204: No Content
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

## Swagger Documentation

После запуска сервера документация доступна по адресу:
`http://localhost:3000/api/docs`
