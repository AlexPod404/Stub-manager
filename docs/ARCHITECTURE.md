# Stub Manager Architecture

## Overview

Stub Manager is a system for managing dynamic stubs with support for multiple protocols (REST, gRPC, Kafka), dynamic parameter extraction, conditional responses, and fault tolerance testing.

## System Architecture

```
┌─────────────────┐
│    Frontend     │  (React + TypeScript)
│   (Port 80)     │
└────────┬────────┘
         │
         ├─────────────────────┐
         │                     │
┌────────▼────────┐   ┌────────▼────────┐
│    Backend      │   │    Runtime      │
│  (Port 3000)    │   │  (Port 3001)    │
│   NestJS        │   │  Express        │
└────┬────┬───────┘   └─────────────────┘
     │    │
     │    └──────────┐
     │               │
┌────▼────┐   ┌──────▼──────┐
│PostgreSQL│   │    Redis    │
└─────────┘   └─────────────┘
```

## Components

### 1. Frontend (React + TypeScript)

- **Technology**: React 18, TypeScript, Ant Design, React Query
- **Purpose**: User interface for managing mocks, routes, conditions, and scenarios
- **Port**: 80 (nginx)

**Key Features**:
- Mock management UI
- Route configuration
- Condition builder
- Scenario editor
- Real-time status monitoring

### 2. Backend (NestJS)

- **Technology**: NestJS, TypeORM, PostgreSQL, Redis, Bull
- **Purpose**: API server for configuration management
- **Port**: 3000

**Modules**:

#### Mocks Module
- Create, read, update, delete mocks
- Start/stop mocks
- Configure response delays
- Protocol support (REST, gRPC, Kafka)

#### Routes Module
- Define endpoints for mocks
- Configure HTTP methods
- Set default responses

#### Conditions Module
- Define conditional logic
- Parameter extraction rules
- Conditional responses based on request data

#### Scenarios Module
- Create test scenarios
- Define action sequences
- Store scenario metadata

#### Executor Module
- Execute test scenarios
- Manage scenario lifecycle
- Queue-based execution (Bull)

#### Generator Module
- Generate mock code dynamically
- Create Docker configurations
- Generate Kubernetes manifests

#### Cache Module (Dead Cache)
- Redis-based caching
- TTL: 1 hour
- Fallback when database is unavailable

### 3. Runtime (Express)

- **Technology**: Express, gRPC, KafkaJS
- **Purpose**: Execute dynamic mocks
- **Port**: 3001

**Adapters**:
- **REST Adapter**: Handle HTTP requests
- **gRPC Adapter**: Handle gRPC calls
- **Kafka Adapter**: Produce/consume Kafka messages

**Request Engine**:
- Parameter extraction (query, header, body, path)
- Condition evaluation
- Response selection
- Delay simulation

### 4. Database (PostgreSQL)

**Tables**:
- `mocks` - Mock definitions
- `routes` - Route configurations
- `conditions` - Conditional logic
- `scenarios` - Test scenarios
- `scenario_actions` - Scenario steps
- `test_results` - Execution results

### 5. Cache (Redis)

- Dead cache with 1-hour TTL
- Session storage
- Queue management (Bull)

## Data Flow

### Mock Creation Flow

```
User → Frontend → Backend API → PostgreSQL
                              → Redis (cache)
                              → Generator Service
                              → Runtime Deployment
```

### Request Handling Flow

```
Client Request → Runtime
              → Request Engine
              → Condition Evaluation
              → Response Selection
              → Delay Simulation
              → Response
```

### Scenario Execution Flow

```
User → Frontend → Backend API
                → Executor Service
                → Bull Queue
                → Scenario Actions
                → Runtime Control
                → Test Results
```

## Dead Cache Strategy

When PostgreSQL is unavailable:

1. Backend attempts database connection
2. On failure, switches to Redis cache
3. Cache serves data for up to 1 hour (TTL)
4. New configurations queue for later persistence
5. On database recovery, queue is processed

## Deployment Architecture

### Docker Compose (Development)

```
docker-compose.yml:
  - PostgreSQL
  - Redis
  - Backend
  - Runtime
  - Frontend
```

### Kubernetes/OpenShift (Production)

```
Deployments:
  - Backend (2 replicas)
  - Runtime (3 replicas)
  
StatefulSets:
  - PostgreSQL (1 replica)
  
Deployments:
  - Redis (1 replica)
  
Services:
  - backend-service
  - runtime-service
  - postgres-service
  - redis-service
```

## Security Considerations

1. **Authentication**: Should be implemented (JWT, OAuth2)
2. **Database Credentials**: Stored in Kubernetes secrets
3. **API Rate Limiting**: Should be implemented
4. **Input Validation**: Using class-validator
5. **CORS**: Configured for specific origins in production

## Scalability

1. **Horizontal Scaling**:
   - Backend: Stateless, can scale horizontally
   - Runtime: Stateless, can scale horizontally
   - PostgreSQL: Can use read replicas
   - Redis: Can use Redis Cluster

2. **Caching Strategy**:
   - Dead cache for resilience
   - Query result caching
   - Mock configuration caching

3. **Queue Management**:
   - Bull for scenario execution
   - Prevents overload
   - Ensures ordered execution

## Monitoring and Observability

Recommended additions:
- **Logging**: Winston, ELK Stack
- **Metrics**: Prometheus, Grafana
- **Tracing**: OpenTelemetry
- **Health Checks**: Implemented in all services

## Future Enhancements

1. Authentication and Authorization
2. WebSocket support for real-time updates
3. Mock versioning
4. Analytics and reporting
5. Mock templates library
6. Import/export functionality
7. Multi-tenancy support
