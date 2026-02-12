# Stub Manager

Система управления динамическими заглушками (Mock/Stub Manager) с поддержкой тестирования отказоустойчивости.

## Возможности

- 🎯 **Управление заглушками** - создание и управление REST, gRPC, Kafka заглушками
- 🔄 **Динамические роуты** - настройка путей и методов для каждой заглушки
- ⚙️ **Условные ответы** - возврат разных ответов в зависимости от параметров запроса
- 📊 **Сценарии тестирования** - автоматизация тестирования отказоустойчивости
- ⏱️ **Управление задержками** - настройка времени отклика
- 💾 **Dead Cache** - работа при потере связи с БД в течение 1 часа

## Архитектура

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│   Backend   │────▶│  PostgreSQL │
│   (React)   │     │  (NestJS)   │     │             │
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           │
                    ┌──────┴──────┐
                    │             │
              ┌─────▼─────┐ ┌────▼─────┐
              │   Redis   │ │  Runtime │
              │  (Cache)  │ │ (Mocks)  │
              └───────────┘ └──────────┘
```

## Технологический стек

### Backend
- **Framework**: NestJS
- **Language**: TypeScript
- **ORM**: TypeORM
- **Database**: PostgreSQL
- **Cache**: Redis
- **Message Queue**: Kafka

### Runtime
- **Platform**: Node.js
- **Server**: Express
- **Protocols**: REST, gRPC, Kafka

### Frontend
- **Framework**: React
- **Language**: TypeScript
- **UI Library**: Material-UI
- **Build Tool**: Vite

### Infrastructure
- **Containerization**: Docker
- **Orchestration**: Kubernetes / OpenShift

## Быстрый старт

### Требования

- Node.js 18+
- Docker и Docker Compose
- Git

### Установка

1. Клонировать репозиторий:

```bash
git clone https://github.com/AlexPod404/Stub-manager.git
cd Stub-manager
```

2. Создать файл окружения:

```bash
cp .env.example .env
```

3. Запустить все сервисы:

```bash
docker-compose -f docker/docker-compose.yml up -d
```

4. Дождаться запуска всех сервисов:

```bash
docker-compose -f docker/docker-compose.yml ps
```

### Доступ к приложению

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api/docs
- **Runtime**: http://localhost:3001

## Структура проекта

```
Stub-manager/
├── backend/              # Backend (NestJS)
│   ├── src/
│   │   ├── modules/      # Модули приложения
│   │   ├── common/       # Общие утилиты
│   │   ├── config/       # Конфигурация
│   │   └── main.ts       # Точка входа
│   └── test/             # Тесты
├── runtime/              # Runtime для заглушек
│   └── src/
│       ├── protocols/    # Обработчики протоколов
│       ├── extractors/   # Извлечение параметров
│       ├── conditions/   # Оценка условий
│       └── responders/   # Построение ответов
├── frontend/             # Frontend (React)
│   └── src/
│       ├── components/   # React компоненты
│       ├── pages/        # Страницы
│       └── services/     # API сервисы
├── docker/               # Docker конфигурация
│   ├── docker-compose.yml
│   └── Dockerfile.*
├── k8s/                  # Kubernetes манифесты
├── docs/                 # Документация
└── README.md
```

## Разработка

### Backend

```bash
cd backend
npm install
npm run start:dev
```

### Runtime

```bash
cd runtime
npm install
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Документация

- [API Documentation](docs/API.md) - REST API endpoints
- [Architecture](docs/ARCHITECTURE.md) - Архитектура системы
- [Database Schema](docs/DATABASE_SCHEMA.md) - Схема базы данных
- [Deployment](docs/DEPLOYMENT.md) - Инструкции по развертыванию
- [User Guide](docs/USER_GUIDE.md) - Руководство пользователя

## Примеры использования

### Создание заглушки через API

```bash
curl -X POST http://localhost:3000/api/mocks \
  -H "Content-Type: application/json" \
  -d '{
    "name": "User Service",
    "description": "Mock для сервиса пользователей",
    "protocol": "REST"
  }'
```

### Создание роута

```bash
curl -X POST http://localhost:3000/api/mocks/{mockId}/routes \
  -H "Content-Type: application/json" \
  -d '{
    "path": "/api/users/:id",
    "method": "GET",
    "delayMs": 0
  }'
```

### Создание условия

```bash
curl -X POST http://localhost:3000/api/routes/{routeId}/conditions \
  -H "Content-Type: application/json" \
  -d '{
    "type": "equals",
    "parameterName": "id",
    "parameterSource": "path",
    "value": "123",
    "response": {
      "statusCode": 200,
      "body": {
        "id": "123",
        "name": "John Doe"
      }
    }
  }'
```

## Тестирование

```bash
# Backend tests
cd backend
npm test

# E2E tests
npm run test:e2e
```

## Развертывание

### Docker Compose

```bash
docker-compose -f docker/docker-compose.yml up -d
```

### Kubernetes

```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/postgres-deployment.yaml
kubectl apply -f k8s/redis-deployment.yaml
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/runtime-deployment.yaml
```

### OpenShift

```bash
oc new-project stub-manager
oc apply -f k8s/
```

## Roadmap

- [x] Базовая структура проекта
- [x] REST заглушки
- [ ] gRPC заглушки
- [ ] Kafka заглушки
- [ ] Веб-интерфейс
- [ ] Аутентификация и авторизация
- [ ] Мониторинг и метрики
- [ ] Расширенная документация

## Вклад в проект

Мы приветствуем ваш вклад! Пожалуйста:

1. Форкните репозиторий
2. Создайте ветку для новой функции (`git checkout -b feature/AmazingFeature`)
3. Закоммитьте изменения (`git commit -m 'Add some AmazingFeature'`)
4. Запушьте в ветку (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## Лицензия

MIT

## Контакты

- GitHub: [@AlexPod404](https://github.com/AlexPod404)
- Repository: [Stub-manager](https://github.com/AlexPod404/Stub-manager)
