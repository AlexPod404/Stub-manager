# Deployment Guide

## Локальная разработка

### Требования

- Node.js 18+
- Docker и Docker Compose
- PostgreSQL 15+
- Redis 7+

### Запуск с Docker Compose

1. Клонировать репозиторий:
```bash
git clone https://github.com/AlexPod404/Stub-manager.git
cd Stub-manager
```

2. Создать файл `.env` в корне проекта:
```bash
cp .env.example .env
```

3. Запустить все сервисы:
```bash
docker-compose -f docker/docker-compose.yml up -d
```

4. Проверить статус сервисов:
```bash
docker-compose -f docker/docker-compose.yml ps
```

Доступные сервисы:
- Backend API: http://localhost:3000
- API Docs: http://localhost:3000/api/docs
- Runtime: http://localhost:3001
- Frontend: http://localhost:5173
- PostgreSQL: localhost:5432
- Redis: localhost:6379
- Kafka: localhost:9092

### Локальный запуск без Docker

#### Backend

```bash
cd backend
npm install
npm run start:dev
```

#### Runtime

```bash
cd runtime
npm install
npm run start:dev
```

#### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Развертывание в Kubernetes

### Требования

- Kubernetes cluster (1.25+)
- kubectl
- Доступ к Docker registry

### Шаги развертывания

1. Собрать Docker образы:

```bash
# Backend
docker build -t your-registry/stub-manager-backend:latest -f docker/Dockerfile.backend backend/

# Runtime
docker build -t your-registry/stub-manager-runtime:latest runtime/

# Frontend
docker build -t your-registry/stub-manager-frontend:latest -f docker/Dockerfile.frontend frontend/
```

2. Отправить образы в registry:

```bash
docker push your-registry/stub-manager-backend:latest
docker push your-registry/stub-manager-runtime:latest
docker push your-registry/stub-manager-frontend:latest
```

3. Создать namespace:

```bash
kubectl apply -f k8s/namespace.yaml
```

4. Развернуть компоненты:

```bash
kubectl apply -f k8s/postgres-deployment.yaml
kubectl apply -f k8s/redis-deployment.yaml
kubectl apply -f k8s/kafka-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/runtime-deployment.yaml
```

5. Проверить статус:

```bash
kubectl get pods -n stub-manager
kubectl get services -n stub-manager
```

### Обновление приложения

```bash
kubectl set image deployment/stub-manager-backend backend=your-registry/stub-manager-backend:new-version -n stub-manager
```

## Развертывание в OpenShift

### Требования

- OpenShift cluster
- oc CLI
- Доступ к OpenShift registry

### Шаги развертывания

1. Войти в OpenShift:

```bash
oc login https://your-openshift-cluster
```

2. Создать проект:

```bash
oc new-project stub-manager
```

3. Создать приложения из Docker образов:

```bash
oc new-app your-registry/stub-manager-backend:latest --name=backend
oc new-app your-registry/stub-manager-runtime:latest --name=runtime
oc new-app postgresql:15 --name=postgres -e POSTGRESQL_USER=postgres -e POSTGRESQL_PASSWORD=postgres -e POSTGRESQL_DATABASE=stub_manager
oc new-app redis:7 --name=redis
```

4. Создать routes:

```bash
oc expose svc/backend
oc expose svc/runtime
```

5. Получить URL приложений:

```bash
oc get routes
```

## Мониторинг

### Проверка здоровья

```bash
# Backend
curl http://localhost:3000/api/health

# Runtime
curl http://localhost:3001/health
```

### Логи

Docker Compose:
```bash
docker-compose -f docker/docker-compose.yml logs -f backend
```

Kubernetes:
```bash
kubectl logs -f deployment/stub-manager-backend -n stub-manager
```

OpenShift:
```bash
oc logs -f deployment/backend
```

## Бэкапы

### PostgreSQL

```bash
# Создание бэкапа
docker exec stub-manager-postgres pg_dump -U postgres stub_manager > backup.sql

# Восстановление
docker exec -i stub-manager-postgres psql -U postgres stub_manager < backup.sql
```

### Redis

```bash
# Бэкап выполняется автоматически в /data
docker exec stub-manager-redis redis-cli BGSAVE
```

## Масштабирование

### Kubernetes

```bash
kubectl scale deployment stub-manager-backend --replicas=3 -n stub-manager
```

### OpenShift

```bash
oc scale deployment/backend --replicas=3
```

## Безопасность

### Создание secrets

Kubernetes:
```bash
kubectl create secret generic postgres-secret \
  --from-literal=username=postgres \
  --from-literal=password=your-secure-password \
  -n stub-manager
```

OpenShift:
```bash
oc create secret generic postgres-secret \
  --from-literal=username=postgres \
  --from-literal=password=your-secure-password
```

## Troubleshooting

### Backend не запускается

1. Проверить логи
2. Убедиться, что PostgreSQL доступен
3. Проверить переменные окружения

### База данных недоступна

1. Проверить статус PostgreSQL pod
2. Проверить network connectivity
3. Проверить credentials

### Runtime не обрабатывает запросы

1. Проверить логи runtime
2. Убедиться, что роуты зарегистрированы
3. Проверить конфигурацию заглушек
