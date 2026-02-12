# Stub Manager Architecture

## System Overview

Stub Manager is a dynamic stub management system built with Java and Spring Boot that supports multiple protocols (REST, gRPC, Kafka) for creating and managing mock services.

## Architecture Components

### 1. Backend Service
**Technology:** Spring Boot 3.2.2, Java 17

**Responsibilities:**
- Mock management (CRUD operations)
- Route configuration
- Condition evaluation setup
- Scenario creation and execution
- Dead cache management

**Key Modules:**
- **Controllers:** REST API endpoints
- **Services:** Business logic layer
- **Repositories:** Data persistence layer
- **Entities:** Database models
- **Configuration:** System configuration

### 2. Runtime Service
**Technology:** Spring Boot 3.2.2, Java 17

**Responsibilities:**
- Dynamic request processing
- Response generation based on conditions
- Protocol handling (REST, gRPC, Kafka)
- Parameter extraction and substitution

**Key Modules:**
- **Engine:** Request processing, response building
- **Protocol Handlers:** REST, gRPC, Kafka support
- **Cache Manager:** Redis integration

### 3. Database Layer
**Technology:** PostgreSQL 15

**Responsibilities:**
- Persistent storage for mocks, routes, conditions
- Scenario and test result storage

**Tables:**
- `mocks`: Mock service definitions
- `routes`: Endpoint configurations
- `conditions`: Matching conditions
- `responses`: Response templates
- `scenarios`: Test scenarios
- `scenario_actions`: Scenario steps
- `test_results`: Test execution results

### 4. Cache Layer
**Technology:** Redis 7

**Responsibilities:**
- Dead cache (1-hour offline operation)
- Performance optimization
- Session management

### 5. Message Queue
**Technology:** Apache Kafka

**Responsibilities:**
- Asynchronous message handling
- Event-driven architecture support

## Data Flow

### Mock Request Flow
```
Client Request → Runtime Service → Protocol Handler → 
Request Processor → Condition Evaluator → Response Builder → 
Client Response
```

### Configuration Flow
```
API Request → Backend Service → Service Layer → 
Repository → Database → Cache Update
```

## Deployment Architecture

### Local Development
- Docker Compose setup
- All services in containers
- Local PostgreSQL, Redis, Kafka

### Production (Kubernetes/OpenShift)
- Multi-replica deployments
- LoadBalancer for backend
- Persistent volumes for database
- Auto-scaling support

## Key Features

### 1. Dynamic Parameter Extraction
Extract values from:
- HTTP headers
- Query parameters
- Request body (JSONPath)
- Path variables

### 2. Conditional Routing
- Multiple conditions per route
- Priority-based evaluation
- Support for EQUALS, CONTAINS, REGEX

### 3. Response Templates
- Dynamic parameter substitution
- Configurable delays
- Custom headers and status codes

### 4. Resilience Testing
- Scenario-based testing
- Mock activation/deactivation
- Delay simulation
- Result tracking

### 5. Dead Cache
- 1-hour offline operation
- Redis-based caching
- Automatic cache warming

## Security Considerations

- Input validation on all endpoints
- SQL injection prevention (JPA/Hibernate)
- CORS configuration
- Future: OAuth2/JWT authentication

## Monitoring and Observability

- Health check endpoints
- Actuator metrics
- Structured logging
- Future: Prometheus metrics, distributed tracing
