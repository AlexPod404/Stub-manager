# Database Schema Documentation

## Overview
Stub Manager uses PostgreSQL as the primary database with Flyway for schema migrations.

## Tables

### mocks
Stores mock service definitions.

| Column | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL | Primary key |
| name | VARCHAR(255) | Mock name |
| description | TEXT | Description |
| protocol | VARCHAR(50) | Protocol type (REST/GRPC/KAFKA) |
| is_active | BOOLEAN | Active status |
| response_delay | INTEGER | Default response delay (ms) |
| created_at | TIMESTAMP | Creation timestamp |
| updated_at | TIMESTAMP | Last update timestamp |

**Indexes:**
- `idx_mocks_protocol` on `protocol`
- `idx_mocks_is_active` on `is_active`

### routes
Stores endpoint routes for mocks.

| Column | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL | Primary key |
| mock_id | BIGINT | Foreign key to mocks |
| path | VARCHAR(500) | Route path |
| method | VARCHAR(20) | HTTP method |
| is_active | BOOLEAN | Active status |
| created_at | TIMESTAMP | Creation timestamp |

**Indexes:**
- `idx_routes_mock_id` on `mock_id`
- `idx_routes_is_active` on `is_active`

### conditions
Stores matching conditions for routes.

| Column | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL | Primary key |
| route_id | BIGINT | Foreign key to routes |
| type | VARCHAR(50) | Condition type (EQUALS/CONTAINS/REGEX) |
| parameter_name | VARCHAR(255) | Parameter name |
| parameter_source | VARCHAR(50) | Source (HEADER/QUERY/BODY/PATH) |
| parameter_path | VARCHAR(500) | JSONPath for body extraction |
| expected_value | TEXT | Expected value |
| priority | INTEGER | Evaluation priority |
| created_at | TIMESTAMP | Creation timestamp |

**Indexes:**
- `idx_conditions_route_id` on `route_id`
- `idx_conditions_priority` on `priority`

### responses
Stores response templates.

| Column | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL | Primary key |
| condition_id | BIGINT | Foreign key to conditions |
| status_code | INTEGER | HTTP status code |
| body | TEXT | Response body template |
| headers | JSONB | Response headers |
| response_delay | INTEGER | Response delay (ms) |
| created_at | TIMESTAMP | Creation timestamp |

**Indexes:**
- `idx_responses_condition_id` on `condition_id`

### scenarios
Stores test scenarios.

| Column | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL | Primary key |
| name | VARCHAR(255) | Scenario name |
| description | TEXT | Description |
| created_at | TIMESTAMP | Creation timestamp |

### scenario_actions
Stores scenario action steps.

| Column | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL | Primary key |
| scenario_id | BIGINT | Foreign key to scenarios |
| action_type | VARCHAR(50) | Action type (START/STOP/SET_DELAY) |
| mock_id | BIGINT | Foreign key to mocks |
| time_offset | INTEGER | Time offset from start (ms) |
| delay_value | INTEGER | Delay value for SET_DELAY |
| sequence_order | INTEGER | Execution order |
| created_at | TIMESTAMP | Creation timestamp |

**Indexes:**
- `idx_scenario_actions_scenario_id` on `scenario_id`
- `idx_scenario_actions_sequence_order` on `sequence_order`

### test_results
Stores scenario execution results.

| Column | Type | Description |
|--------|------|-------------|
| id | BIGSERIAL | Primary key |
| scenario_id | BIGINT | Foreign key to scenarios |
| execution_time | TIMESTAMP | Execution timestamp |
| status | VARCHAR(50) | Result status |
| metrics | JSONB | Performance metrics |
| error_message | TEXT | Error message if failed |
| created_at | TIMESTAMP | Creation timestamp |

**Indexes:**
- `idx_test_results_scenario_id` on `scenario_id`
- `idx_test_results_status` on `status`

## Relationships

```
mocks (1) ──< (N) routes
routes (1) ──< (N) conditions
conditions (1) ──< (1) responses
scenarios (1) ──< (N) scenario_actions
scenarios (1) ──< (N) test_results
mocks (1) ──< (N) scenario_actions
```

## Migrations

Flyway migrations are located in `backend/src/main/resources/db/migration/`:

- `V1__init_schema.sql` - Initialize extensions
- `V2__create_mocks_table.sql` - Create mocks table
- `V3__create_routes_table.sql` - Create routes, conditions, responses tables
- `V4__create_scenarios_table.sql` - Create scenarios and test results tables

## Sample Queries

### Get all active mocks with routes
```sql
SELECT m.*, r.path, r.method 
FROM mocks m 
LEFT JOIN routes r ON m.id = r.mock_id 
WHERE m.is_active = true;
```

### Get conditions for a route
```sql
SELECT * FROM conditions 
WHERE route_id = ? 
ORDER BY priority DESC;
```

### Get scenario execution history
```sql
SELECT s.name, tr.execution_time, tr.status 
FROM scenarios s 
JOIN test_results tr ON s.id = tr.scenario_id 
ORDER BY tr.execution_time DESC;
```
