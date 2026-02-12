# Database Schema

## Overview

PostgreSQL database schema for Stub Manager.

## Entity Relationship Diagram

```
┌──────────┐         ┌──────────┐         ┌──────────────┐
│  Mocks   │1──────n│  Routes  │1──────n│  Conditions  │
└──────────┘         └──────────┘         └──────────────┘

┌──────────────┐         ┌────────────────────┐
│  Scenarios   │1──────n│ Scenario_Actions   │
└──────────────┘         └────────────────────┘

┌──────────────┐
│Test_Results  │
└──────────────┘
```

## Tables

### mocks

Stores mock service definitions.

| Column         | Type        | Constraints           | Description                    |
|----------------|-------------|-----------------------|--------------------------------|
| id             | UUID        | PRIMARY KEY           | Unique identifier              |
| name           | VARCHAR     | UNIQUE, NOT NULL      | Mock name                      |
| description    | TEXT        | NULLABLE              | Mock description               |
| protocol       | ENUM        | NOT NULL              | REST, GRPC, KAFKA              |
| status         | ENUM        | NOT NULL, DEFAULT     | ACTIVE, INACTIVE               |
| responseDelay  | INTEGER     | DEFAULT 0             | Delay in milliseconds          |
| metadata       | JSONB       | NULLABLE              | Additional metadata            |
| createdAt      | TIMESTAMP   | NOT NULL              | Creation timestamp             |
| updatedAt      | TIMESTAMP   | NOT NULL              | Last update timestamp          |

**Indexes**:
- `idx_mocks_name` on `name`
- `idx_mocks_status` on `status`

### routes

Stores route configurations for mocks.

| Column          | Type        | Constraints              | Description                    |
|-----------------|-------------|--------------------------|--------------------------------|
| id              | UUID        | PRIMARY KEY              | Unique identifier              |
| mockId          | UUID        | FOREIGN KEY, NOT NULL    | Reference to mocks.id          |
| path            | VARCHAR     | NOT NULL                 | Route path                     |
| method          | ENUM        | NOT NULL                 | GET, POST, PUT, PATCH, DELETE  |
| description     | TEXT        | NULLABLE                 | Route description              |
| defaultResponse | JSONB       | NULLABLE                 | Default response object        |
| statusCode      | INTEGER     | NULLABLE                 | HTTP status code               |
| createdAt       | TIMESTAMP   | NOT NULL                 | Creation timestamp             |
| updatedAt       | TIMESTAMP   | NOT NULL                 | Last update timestamp          |

**Foreign Keys**:
- `mockId` REFERENCES `mocks(id)` ON DELETE CASCADE

**Indexes**:
- `idx_routes_mock_id` on `mockId`
- `idx_routes_path_method` on `(path, method)`

### conditions

Stores conditional logic for routes.

| Column          | Type        | Constraints              | Description                           |
|-----------------|-------------|--------------------------|---------------------------------------|
| id              | UUID        | PRIMARY KEY              | Unique identifier                     |
| routeId         | UUID        | FOREIGN KEY, NOT NULL    | Reference to routes.id                |
| parameterName   | VARCHAR     | NOT NULL                 | Parameter to check                    |
| parameterSource | ENUM        | NOT NULL                 | QUERY, HEADER, BODY, PATH             |
| operator        | ENUM        | NOT NULL                 | Comparison operator                   |
| expectedValue   | TEXT        | NOT NULL                 | Expected value                        |
| response        | JSONB       | NOT NULL                 | Response to return                    |
| statusCode      | INTEGER     | NULLABLE                 | HTTP status code                      |
| priority        | INTEGER     | DEFAULT 0                | Priority (higher = checked first)     |
| createdAt       | TIMESTAMP   | NOT NULL                 | Creation timestamp                    |
| updatedAt       | TIMESTAMP   | NOT NULL                 | Last update timestamp                 |

**Operators**:
- EQUALS
- NOT_EQUALS
- CONTAINS
- NOT_CONTAINS
- GREATER_THAN
- LESS_THAN
- REGEX

**Foreign Keys**:
- `routeId` REFERENCES `routes(id)` ON DELETE CASCADE

**Indexes**:
- `idx_conditions_route_id` on `routeId`
- `idx_conditions_priority` on `priority DESC`

### scenarios

Stores test scenario definitions.

| Column      | Type        | Constraints           | Description                    |
|-------------|-------------|-----------------------|--------------------------------|
| id          | UUID        | PRIMARY KEY           | Unique identifier              |
| name        | VARCHAR     | NOT NULL              | Scenario name                  |
| description | TEXT        | NULLABLE              | Scenario description           |
| status      | ENUM        | NOT NULL, DEFAULT     | Scenario status                |
| createdAt   | TIMESTAMP   | NOT NULL              | Creation timestamp             |
| updatedAt   | TIMESTAMP   | NOT NULL              | Last update timestamp          |

**Statuses**:
- DRAFT
- READY
- RUNNING
- COMPLETED
- FAILED

**Indexes**:
- `idx_scenarios_status` on `status`

### scenario_actions

Stores actions within scenarios.

| Column      | Type        | Constraints              | Description                    |
|-------------|-------------|--------------------------|--------------------------------|
| id          | UUID        | PRIMARY KEY              | Unique identifier              |
| scenarioId  | UUID        | FOREIGN KEY, NOT NULL    | Reference to scenarios.id      |
| order       | INTEGER     | NOT NULL                 | Execution order                |
| actionType  | ENUM        | NOT NULL                 | Type of action                 |
| parameters  | JSONB       | NOT NULL                 | Action parameters              |
| createdAt   | TIMESTAMP   | NOT NULL                 | Creation timestamp             |

**Action Types**:
- START_MOCK
- STOP_MOCK
- SET_DELAY
- WAIT
- HTTP_REQUEST

**Foreign Keys**:
- `scenarioId` REFERENCES `scenarios(id)` ON DELETE CASCADE

**Indexes**:
- `idx_scenario_actions_scenario_id` on `scenarioId`
- `idx_scenario_actions_order` on `(scenarioId, order)`

### test_results

Stores scenario execution results.

| Column       | Type        | Constraints           | Description                    |
|--------------|-------------|-----------------------|--------------------------------|
| id           | UUID        | PRIMARY KEY           | Unique identifier              |
| scenarioId   | UUID        | NOT NULL              | Reference to scenarios.id      |
| status       | ENUM        | NOT NULL              | Execution status               |
| results      | JSONB       | NOT NULL              | Detailed results               |
| duration     | INTEGER     | NOT NULL              | Execution duration (ms)        |
| errorMessage | TEXT        | NULLABLE              | Error message if failed        |
| executedAt   | TIMESTAMP   | NOT NULL              | Execution timestamp            |

**Statuses**:
- SUCCESS
- FAILED
- PARTIAL

**Indexes**:
- `idx_test_results_scenario_id` on `scenarioId`
- `idx_test_results_executed_at` on `executedAt DESC`

## Migrations

TypeORM will automatically generate migrations based on entity changes.

### Generate Migration
```bash
npm run migration:generate -- MigrationName
```

### Run Migrations
```bash
npm run migration:run
```

### Revert Migration
```bash
npm run migration:revert
```

## Database Initialization

For development, TypeORM's `synchronize: true` option is enabled, which automatically creates tables based on entities.

For production, use migrations:

1. Disable `synchronize`
2. Generate migrations from entity changes
3. Run migrations in controlled manner
4. Keep migration history in version control

## Performance Optimization

### Indexes

All foreign keys have indexes for join performance.

### Query Optimization

- Use relations selectively with `relations` option
- Implement pagination for large datasets
- Use `select` to fetch only needed columns

### Caching

- Use Redis for frequently accessed data
- Implement query result caching
- Use dead cache for resilience

## Backup Strategy

Recommended backup approach:

1. **Daily full backups**: PostgreSQL `pg_dump`
2. **Continuous WAL archiving**: Point-in-time recovery
3. **Test restores**: Regular restore testing
4. **Offsite storage**: Backup to cloud storage

## Security

1. **Encryption**: Enable SSL for connections
2. **Credentials**: Use strong passwords, rotate regularly
3. **Access Control**: Restrict database access by IP
4. **Auditing**: Enable PostgreSQL audit logging
5. **Secrets**: Use Kubernetes secrets or Vault
