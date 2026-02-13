# Stub Manager

Dynamic stub management system built with Java and Spring Boot supporting REST, gRPC, and Kafka protocols.

## 🚀 Features

- **Multi-Protocol Support**: REST, gRPC, Kafka
- **Dynamic Parameter Extraction**: Extract from headers, query params, body (JSONPath), path
- **Conditional Routing**: Multiple conditions with priority-based evaluation
- **Response Templates**: Dynamic parameter substitution, configurable delays
- **Resilience Testing**: Scenario-based testing with mock activation/deactivation
- **Dead Cache**: 1-hour offline operation with Redis caching
- **Swagger UI**: Interactive API documentation

## 📋 Prerequisites

- Java 17 or higher
- Maven 3.8+
- Docker and Docker Compose (optional)
- PostgreSQL 15+ (for local development)
- Redis 7+ (for caching)

## 🏗️ Architecture

This is a Maven multi-module project with a parent POM for unified building.

```
Stub-manager/
├── pom.xml            # Parent POM (unifies all modules)
├── backend/           # Spring Boot backend service
├── runtime/           # Dynamic mock runtime engine
├── docker/            # Docker Compose configuration
├── k8s/               # Kubernetes manifests
├── docs/              # Documentation
└── scripts/           # Build and run scripts
```

## 🛠️ Quick Start

### Option 1: Docker Compose (Recommended)

```bash
# Start all services
cd docker
docker-compose up -d

# Access the application
# Backend API: http://localhost:8080/api/v1
# Swagger UI: http://localhost:8080/swagger-ui.html
# Runtime: http://localhost:8081
```

### Option 2: Local Build and Run

```bash
# Build the project (builds all modules from parent POM)
./scripts/build.sh

# Run locally (requires PostgreSQL and Redis)
./scripts/run.sh local

# Or run with Docker
./scripts/run.sh docker
```

### Option 3: Manual Build

```bash
# Build all modules from parent POM (recommended)
mvn clean package

# Or build individual modules
cd backend
mvn clean package

cd ../runtime
mvn clean package

# Run backend
java -jar backend/target/stub-manager-backend-1.0.0-SNAPSHOT.jar

# Run runtime (in another terminal)
java -jar runtime/target/stub-manager-runtime-1.0.0-SNAPSHOT.jar
```

## 📚 API Documentation

Full API documentation is available at:
- **Swagger UI**: http://localhost:8080/swagger-ui.html
- **API Docs**: [docs/API.md](docs/API.md)

### Quick API Examples

#### Create a Mock
```bash
curl -X POST http://localhost:8080/api/v1/mocks \
  -H "Content-Type: application/json" \
  -d '{
    "name": "User Service Mock",
    "protocol": "REST",
    "isActive": true
  }'
```

#### Create a Route
```bash
curl -X POST http://localhost:8080/api/v1/mocks/1/routes \
  -H "Content-Type: application/json" \
  -d '{
    "path": "/api/users",
    "method": "GET",
    "isActive": true
  }'
```

#### Create a Condition with Response
```bash
curl -X POST http://localhost:8080/api/v1/routes/1/conditions \
  -H "Content-Type: application/json" \
  -d '{
    "type": "EQUALS",
    "parameterName": "userId",
    "parameterSource": "QUERY",
    "expectedValue": "123",
    "priority": 1,
    "response": {
      "statusCode": 200,
      "body": "{\"id\": \"123\", \"name\": \"John Doe\"}"
    }
  }'
```

## 🗄️ Database Schema

The application uses PostgreSQL with Flyway migrations. Schema includes:
- **mocks**: Mock service definitions
- **routes**: Endpoint configurations
- **conditions**: Matching conditions
- **responses**: Response templates
- **scenarios**: Test scenarios
- **test_results**: Execution results

See [docs/DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md) for details.

## ☸️ Kubernetes Deployment

```bash
# Create secrets
kubectl create secret generic db-credentials \
  --from-literal=username=postgres \
  --from-literal=password=postgres

# Deploy services
kubectl apply -f k8s/postgres-deployment.yaml
kubectl apply -f k8s/redis-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/runtime-deployment.yaml

# Access backend
kubectl port-forward service/stub-manager-backend 8080:8080
```

## 🧪 Testing

### Create and Execute a Scenario

```bash
# Create a scenario
curl -X POST http://localhost:8080/api/v1/scenarios \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Resilience Test",
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
      }
    ]
  }'

# Execute scenario
curl -X POST http://localhost:8080/api/v1/scenarios/1/execute

# Get results
curl http://localhost:8080/api/v1/scenarios/1/results
```

## 📖 Documentation

- [API Documentation](docs/API.md)
- [Architecture](docs/ARCHITECTURE.md)
- [Database Schema](docs/DATABASE_SCHEMA.md)
- [Build Instructions](docs/BUILD_INSTRUCTIONS.md)

## 🔧 Configuration

### Application Profiles

- **dev**: Development profile (detailed logging, local DB)
- **prod**: Production profile (optimized settings, environment variables)

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL URL | jdbc:postgresql://localhost:5432/stubmanager |
| DATABASE_USER | Database username | postgres |
| DATABASE_PASSWORD | Database password | postgres |
| REDIS_HOST | Redis host | localhost |
| KAFKA_BOOTSTRAP_SERVERS | Kafka servers | localhost:9092 |

## 🐳 Docker Services

When using Docker Compose, the following services are started:
- **PostgreSQL** (port 5432)
- **Redis** (port 6379)
- **Kafka** (port 9092)
- **Zookeeper** (port 2181)
- **Backend** (port 8080)
- **Runtime** (port 8081)

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub.
