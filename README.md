# Stub Manager

Dynamic stub/mock management system with support for REST, gRPC, and Kafka protocols.

## Features

- 🚀 **Multi-Protocol Support**: REST, gRPC, Kafka
- 🔄 **Dynamic Configuration**: Create and modify stubs without redeployment
- 📊 **Conditional Responses**: Return different responses based on request parameters
- ⏱️ **Response Delay Simulation**: Test timeout scenarios
- 🧪 **Fault Tolerance Testing**: Create and execute test scenarios
- 💾 **Dead Cache**: Continues operation for 1 hour without database
- 🐳 **Docker & Kubernetes**: Ready for containerized deployment
- 📱 **Modern UI**: React-based management interface

## Architecture

The system consists of three main components:

1. **Backend** (NestJS): Configuration management API
2. **Runtime** (Express): Dynamic mock execution engine
3. **Frontend** (React): User interface

See [ARCHITECTURE.md](docs/ARCHITECTURE.md) for detailed architecture documentation.

## Quick Start

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- PostgreSQL 15+
- Redis 7+

### Using Docker Compose (Recommended)

```bash
# Clone the repository
git clone https://github.com/AlexPod404/Stub-manager.git
cd Stub-manager

# Start all services
cd docker
docker-compose up -d

# Access the application
# Frontend: http://localhost
# Backend API: http://localhost:3000
# API Docs: http://localhost:3000/api/docs
# Runtime: http://localhost:3001
```

### Manual Setup

#### Backend

```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your database credentials

# Run migrations
npm run migration:run

# Start development server
npm run start:dev
```

#### Runtime

```bash
cd runtime

# Install dependencies
npm install

# Start development server
npm run start:dev
```

#### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## Configuration

### Environment Variables

#### Backend (.env)

```env
NODE_ENV=development
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=stub_manager
DB_PASSWORD=stub_manager_password
DB_DATABASE=stub_manager
REDIS_HOST=localhost
REDIS_PORT=6379
CACHE_TTL=3600
```

#### Runtime

```env
PORT=3001
NODE_ENV=development
```

## Usage

### Creating a Mock

1. Open the frontend at http://localhost
2. Navigate to "Mocks"
3. Click "Create Mock"
4. Configure mock settings:
   - Name
   - Protocol (REST/gRPC/Kafka)
   - Response delay
5. Save the mock

### Adding Routes

1. Select a mock
2. Click "Add Route"
3. Configure route:
   - Path (e.g., `/users/:id`)
   - HTTP Method
   - Default response
4. Save the route

### Creating Conditions

1. Select a route
2. Click "Add Condition"
3. Configure condition:
   - Parameter name
   - Parameter source (Query/Header/Body/Path)
   - Operator (Equals/Contains/etc.)
   - Expected value
   - Response to return
4. Save the condition

### Running Scenarios

1. Navigate to "Scenarios"
2. Create a new scenario
3. Add actions:
   - Start/stop mocks
   - Set delays
   - Make HTTP requests
4. Execute the scenario
5. View results

## API Documentation

Swagger documentation is available at: http://localhost:3000/api/docs

See [API.md](docs/API.md) for detailed API documentation.

## Database Schema

See [DATABASE_SCHEMA.md](docs/DATABASE_SCHEMA.md) for database schema documentation.

## Deployment

### Kubernetes/OpenShift

```bash
# Create namespace
kubectl create namespace stub-manager

# Deploy secrets
kubectl apply -f k8s/secrets.yaml

# Deploy PostgreSQL
kubectl apply -f k8s/postgres-statefulset.yaml

# Deploy Redis
kubectl apply -f k8s/redis-deployment.yaml

# Deploy Backend
kubectl apply -f k8s/backend-deployment.yaml

# Deploy Runtime
kubectl apply -f k8s/runtime-deployment.yaml
```

### Docker

```bash
# Build images
docker build -f docker/backend.Dockerfile -t stub-manager/backend:latest ./backend
docker build -f docker/runtime.Dockerfile -t stub-manager/runtime:latest ./runtime
docker build -f docker/frontend.Dockerfile -t stub-manager/frontend:latest ./frontend

# Run with docker-compose
docker-compose -f docker/docker-compose.yml up -d
```

## Development

### Project Structure

```
Stub-manager/
├── backend/          # NestJS backend
├── runtime/          # Runtime execution engine
├── frontend/         # React frontend
├── docker/           # Docker configurations
├── k8s/             # Kubernetes manifests
└── docs/            # Documentation
```

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Runtime tests
cd runtime
npm test

# Frontend tests
cd frontend
npm test
```

### Code Style

```bash
# Backend
cd backend
npm run lint

# Runtime
cd runtime
npm run lint

# Frontend
cd frontend
npm run lint
```

## Technology Stack

### Backend
- NestJS
- TypeORM
- PostgreSQL
- Redis
- Bull (Queue)

### Runtime
- Express
- gRPC
- KafkaJS

### Frontend
- React 18
- TypeScript
- Ant Design
- React Query
- Vite

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- GitHub Issues: https://github.com/AlexPod404/Stub-manager/issues
- Documentation: See `/docs` folder

## Roadmap

- [ ] Authentication and Authorization
- [ ] WebSocket support for real-time updates
- [ ] Mock versioning
- [ ] Analytics and reporting
- [ ] Mock templates library
- [ ] Import/export functionality
- [ ] Multi-tenancy support
- [ ] Monitoring dashboard
- [ ] Performance metrics
- [ ] Advanced gRPC support

## Authors

- AlexPod404

## Acknowledgments

- NestJS team for the excellent framework
- React team for the UI library
- All contributors to the open-source dependencies used in this project
