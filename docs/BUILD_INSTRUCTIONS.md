# Build Instructions

## Prerequisites

- Java 17 or higher
- Maven 3.8+
- Docker and Docker Compose (for containerized deployment)
- PostgreSQL 15+ (for local development)
- Redis 7+ (for caching)

## Building the Project

### 1. Build Backend JAR

```bash
cd backend
mvn clean package
```

The JAR file will be created at: `backend/target/stub-manager-backend-1.0.0-SNAPSHOT.jar`

### 2. Build Runtime JAR

```bash
cd runtime
mvn clean package
```

The JAR file will be created at: `runtime/target/stub-manager-runtime-1.0.0-SNAPSHOT.jar`

### 3. Build Without Tests

```bash
cd backend
mvn clean package -DskipTests
```

## Running Locally

### Running with Java

#### Backend:
```bash
cd backend
java -jar target/stub-manager-backend-1.0.0-SNAPSHOT.jar
```

#### Runtime:
```bash
cd runtime
java -jar target/stub-manager-runtime-1.0.0-SNAPSHOT.jar
```

### Running with Maven

#### Backend:
```bash
cd backend
mvn spring-boot:run
```

#### Runtime:
```bash
cd runtime
mvn spring-boot:run
```

### Running with Profiles

#### Development profile:
```bash
java -jar target/stub-manager-backend-1.0.0-SNAPSHOT.jar --spring.profiles.active=dev
```

#### Production profile:
```bash
java -jar target/stub-manager-backend-1.0.0-SNAPSHOT.jar --spring.profiles.active=prod
```

## Docker Deployment

### Build Docker Images

#### Backend:
```bash
cd backend
docker build -t stub-manager-backend:1.0.0-SNAPSHOT .
```

#### Runtime:
```bash
cd runtime
docker build -t stub-manager-runtime:1.0.0-SNAPSHOT .
```

### Run with Docker Compose

```bash
cd docker
docker-compose up -d
```

This will start:
- PostgreSQL on port 5432
- Redis on port 6379
- Kafka on port 9092
- Backend on port 8080
- Runtime on port 8081

### Stop Docker Compose

```bash
cd docker
docker-compose down
```

### View Logs

```bash
docker-compose logs -f backend
docker-compose logs -f runtime
```

## Kubernetes Deployment

### Apply Kubernetes Manifests

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
```

### Check Deployment Status

```bash
kubectl get pods
kubectl get services
```

### Access Services

```bash
# Forward backend port
kubectl port-forward service/stub-manager-backend 8080:8080

# Access at http://localhost:8080
```

## Environment Variables

### Backend Service

| Variable | Description | Default |
|----------|-------------|---------|
| SPRING_PROFILES_ACTIVE | Active profile | dev |
| DATABASE_URL | PostgreSQL URL | jdbc:postgresql://localhost:5432/stubmanager |
| DATABASE_USER | Database username | postgres |
| DATABASE_PASSWORD | Database password | postgres |
| REDIS_HOST | Redis host | localhost |
| REDIS_PORT | Redis port | 6379 |
| KAFKA_BOOTSTRAP_SERVERS | Kafka servers | localhost:9092 |

## Accessing the Application

### API Endpoints
- Backend API: http://localhost:8080/api/v1
- Runtime API: http://localhost:8081

### Swagger UI
- Backend: http://localhost:8080/swagger-ui.html

### Health Check
- Backend: http://localhost:8080/api/v1/runtime/health

## Development Tips

### Hot Reload with Spring Boot DevTools

Add to `pom.xml`:
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <optional>true</optional>
</dependency>
```

### Database Migrations

Flyway runs automatically on startup. To manually run:
```bash
mvn flyway:migrate
```

### Clean Build

```bash
mvn clean
rm -rf target/
```

## Troubleshooting

### Port Already in Use
```bash
# Find process using port 8080
lsof -i :8080
# Kill the process
kill -9 <PID>
```

### Database Connection Issues
- Verify PostgreSQL is running
- Check connection credentials
- Ensure database exists

### Redis Connection Issues
- Verify Redis is running: `redis-cli ping`
- Check Redis port and host configuration

## Production Deployment

### Build Optimized JAR
```bash
mvn clean package -Pprod -DskipTests
```

### Set JVM Options
```bash
java -Xmx512m -Xms256m -jar target/stub-manager-backend-1.0.0-SNAPSHOT.jar
```

### Use External Configuration
```bash
java -jar app.jar --spring.config.location=/etc/stub-manager/application.yml
```
