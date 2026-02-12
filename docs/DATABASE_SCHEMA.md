# Database Schema

## Диаграмма

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│    mocks    │──────<│   routes    │──────<│ conditions  │
└─────────────┘       └─────────────┘       └─────────────┘
                                                    │
                                                    │
                                             ┌──────────────┐
                                             │  responses   │
                                             └──────────────┘

┌──────────────┐       ┌─────────────────────┐
│  scenarios   │──────<│  scenario_actions   │
└──────────────┘       └─────────────────────┘
       │
       │
       v
┌──────────────────────┐
│ scenario_executions  │
└──────────────────────┘
```

## Таблицы

### mocks

Заглушки (моки).

| Поле        | Тип          | Описание                  |
|-------------|--------------|---------------------------|
| id          | UUID         | PK                        |
| name        | VARCHAR(255) | Название заглушки         |
| description | TEXT         | Описание                  |
| protocol    | ENUM         | REST, GRPC, KAFKA         |
| status      | ENUM         | ACTIVE, INACTIVE          |
| created_at  | TIMESTAMP    | Дата создания             |
| updated_at  | TIMESTAMP    | Дата обновления           |

### routes

Роуты для заглушек.

| Поле       | Тип          | Описание                  |
|------------|--------------|---------------------------|
| id         | UUID         | PK                        |
| mock_id    | UUID         | FK -> mocks.id            |
| path       | VARCHAR(255) | Путь роута                |
| method     | VARCHAR(10)  | HTTP метод                |
| delay_ms   | INTEGER      | Задержка в мс             |
| is_active  | BOOLEAN      | Активен ли роут           |
| created_at | TIMESTAMP    | Дата создания             |
| updated_at | TIMESTAMP    | Дата обновления           |

**Индексы:**
- `idx_routes_mock_id` на `mock_id`

### conditions

Условия для роутов.

| Поле             | Тип          | Описание                      |
|------------------|--------------|-------------------------------|
| id               | UUID         | PK                            |
| route_id         | UUID         | FK -> routes.id               |
| type             | ENUM         | equals, contains, regex       |
| parameter_name   | VARCHAR(255) | Имя параметра                 |
| parameter_source | ENUM         | header, query, body, path     |
| parameter_path   | VARCHAR(500) | Путь к параметру (для body)   |
| value            | TEXT         | Значение для сравнения        |
| priority         | INTEGER      | Приоритет условия             |
| created_at       | TIMESTAMP    | Дата создания                 |
| updated_at       | TIMESTAMP    | Дата обновления               |

**Индексы:**
- `idx_conditions_route_id` на `route_id`
- `idx_conditions_priority` на `priority`

### responses

Ответы для условий.

| Поле         | Тип       | Описание              |
|--------------|-----------|------------------------|
| id           | UUID      | PK                     |
| condition_id | UUID      | FK -> conditions.id    |
| status_code  | INTEGER   | HTTP статус код        |
| body         | JSONB     | Тело ответа            |
| headers      | JSONB     | Заголовки ответа       |
| created_at   | TIMESTAMP | Дата создания          |
| updated_at   | TIMESTAMP | Дата обновления        |

**Индексы:**
- `idx_responses_condition_id` на `condition_id`

### scenarios

Сценарии тестирования.

| Поле        | Тип          | Описание        |
|-------------|--------------|-----------------|
| id          | UUID         | PK              |
| name        | VARCHAR(255) | Название        |
| description | TEXT         | Описание        |
| created_at  | TIMESTAMP    | Дата создания   |
| updated_at  | TIMESTAMP    | Дата обновления |

### scenario_actions

Действия сценариев.

| Поле           | Тип       | Описание                      |
|----------------|-----------|-------------------------------|
| id             | UUID      | PK                            |
| scenario_id    | UUID      | FK -> scenarios.id            |
| time_offset_ms | INTEGER   | Смещение по времени в мс      |
| action_type    | ENUM      | start, stop, set_delay        |
| target_mock_id | UUID      | ID целевой заглушки           |
| params         | JSONB     | Параметры действия            |
| order          | INTEGER   | Порядок выполнения            |
| created_at     | TIMESTAMP | Дата создания                 |
| updated_at     | TIMESTAMP | Дата обновления               |

**Индексы:**
- `idx_scenario_actions_scenario_id` на `scenario_id`
- `idx_scenario_actions_order` на `order`

### scenario_executions

Результаты выполнения сценариев.

| Поле         | Тип       | Описание                          |
|--------------|-----------|-----------------------------------|
| id           | UUID      | PK                                |
| scenario_id  | UUID      | FK -> scenarios.id                |
| status       | ENUM      | pending, running, completed, failed |
| started_at   | TIMESTAMP | Время начала                      |
| completed_at | TIMESTAMP | Время завершения                  |
| results      | JSONB     | Результаты выполнения             |

**Индексы:**
- `idx_scenario_executions_scenario_id` на `scenario_id`
- `idx_scenario_executions_status` на `status`

## Миграции

Миграции находятся в `backend/src/migrations/`.

Команды:
```bash
npm run migration:generate -- -n MigrationName
npm run migration:run
npm run migration:revert
```

## Отношения

- `mocks` 1:N `routes`
- `routes` 1:N `conditions`
- `conditions` 1:1 `responses`
- `scenarios` 1:N `scenario_actions`
- `scenarios` 1:N `scenario_executions`
