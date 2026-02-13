# Stub Manager - Java/Spring Boot Example

## 🎯 Это пример миграции на Java

Это **минимальный пример** Spring Boot проекта, показывающий как может выглядеть Stub Manager на Java.

⚠️ **ВАЖНО**: Это НЕ полная миграция, а только starter проект для демонстрации.

---

## 📦 Что включено

✅ Spring Boot 3.2.0 + Java 17  
✅ PostgreSQL + Spring Data JPA  
✅ Redis поддержка  
✅ Swagger/OpenAPI документация  
✅ Пример Mock entity, controller, service  
✅ Готов к запуску в IntelliJ IDEA  
✅ Создает JAR файл  

---

## 🚀 Быстрый старт в IntelliJ IDEA

### 1. Открыть проект

```
File → Open → выбрать папку java-example
```

IntelliJ IDEA автоматически:
- Распознает Maven проект
- Загрузит все зависимости
- Настроит Java SDK

### 2. Настроить базу данных (опционально)

Создать PostgreSQL базу:

```sql
CREATE DATABASE stub_manager;
CREATE USER stub_manager WITH PASSWORD 'stub_manager_password';
GRANT ALL PRIVILEGES ON DATABASE stub_manager TO stub_manager;
```

Или изменить `src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/your_db
    username: your_user
    password: your_password
```

### 3. Запустить приложение

**Способ 1: Из IDE**
1. Найти `StubManagerApplication.java`
2. Нажать ▶️ (Run) рядом с классом
3. Или: `Run → Run 'StubManagerApplication'`

**Способ 2: Maven**
```bash
mvn spring-boot:run
```

**Способ 3: JAR файл**
```bash
# Собрать JAR
mvn clean package

# Запустить JAR
java -jar target/stub-manager.jar
```

---

## 🌐 Доступные endpoints

После запуска:

- **Swagger UI**: http://localhost:8080/api/swagger-ui.html
- **API Docs**: http://localhost:8080/api/api-docs
- **Health Check**: http://localhost:8080/api/health
- **Create Mock**: POST http://localhost:8080/api/mocks
- **Get Mocks**: GET http://localhost:8080/api/mocks

---

## 📝 Пример использования API

### Создать Mock

```bash
curl -X POST http://localhost:8080/api/mocks \
  -H "Content-Type: application/json" \
  -d '{
    "name": "User Service Mock",
    "description": "Mock for user service",
    "protocol": "REST",
    "responseDelay": 100
  }'
```

### Получить все Mocks

```bash
curl http://localhost:8080/api/mocks
```

### Запустить Mock

```bash
curl -X POST http://localhost:8080/api/mocks/{id}/start
```

---

## 📁 Структура проекта

```
java-example/
├── src/main/java/com/stub/manager/
│   ├── StubManagerApplication.java     ← Main класс
│   ├── controller/
│   │   ├── MockController.java         ← REST контроллер
│   │   └── HealthController.java
│   ├── service/
│   │   └── MockService.java            ← Бизнес логика
│   ├── repository/
│   │   └── MockRepository.java         ← JPA репозиторий
│   ├── entity/
│   │   ├── Mock.java                   ← JPA Entity
│   │   └── JsonbConverter.java
│   ├── dto/
│   │   ├── CreateMockDto.java          ← DTO для создания
│   │   └── MockDto.java                ← DTO для возврата
│   └── enums/
│       ├── MockProtocol.java
│       └── MockStatus.java
├── src/main/resources/
│   └── application.yml                  ← Конфигурация
├── pom.xml                              ← Maven зависимости
└── README.md
```

---

## 🔨 Создание JAR файла

### В IntelliJ IDEA:

```
View → Tool Windows → Maven
Откроется Maven панель справа
stub-manager → Lifecycle → package (двойной клик)
```

JAR будет в: `target/stub-manager.jar`

### Через командную строку:

```bash
mvn clean package
```

### Запуск JAR:

```bash
java -jar target/stub-manager.jar
```

---

## 📊 Что реализовано

| Функционал | Статус | Комментарий |
|-----------|--------|-------------|
| Mock entity | ✅ | Полностью |
| Mock CRUD API | ✅ | Create, Read, Delete |
| Start/Stop Mock | ✅ | Да |
| PostgreSQL | ✅ | JPA + Hibernate |
| Swagger docs | ✅ | OpenAPI 3.0 |
| Health check | ✅ | /api/health |
| Route entity | ❌ | Не реализовано |
| Condition entity | ❌ | Не реализовано |
| Scenarios | ❌ | Не реализовано |
| Runtime service | ❌ | Не реализовано |
| Redis cache | ❌ | Подключение есть, использование нет |
| Kafka/gRPC | ❌ | Не реализовано |

---

## 🎯 Следующие шаги

Если хотите продолжить миграцию:

1. **Добавить Route entity и endpoints**
   - Создать `Route.java` entity
   - Создать `RouteController.java`
   - Связать с Mock через `@ManyToOne`

2. **Добавить Condition entity**
   - Создать `Condition.java` entity
   - Реализовать condition evaluation логику
   - Создать endpoints

3. **Реализовать Scenarios**
   - `Scenario.java`, `ScenarioAction.java`
   - Executor service
   - Queue система (Spring Batch или Quartz)

4. **Runtime service**
   - Отдельный микросервис или модуль
   - REST/gRPC/Kafka adapters
   - Request engine

5. **Cache service**
   - Использовать Spring Cache + Redis
   - Реализовать Dead Cache логику
   - TTL 1 час

6. **Generator service**
   - Генерация кода заглушек
   - Создание Docker/K8s манифестов

---

## 💡 Полезные команды

### Maven

```bash
# Очистка и сборка
mvn clean package

# Запуск приложения
mvn spring-boot:run

# Запуск тестов
mvn test

# Пропустить тесты при сборке
mvn clean package -DskipTests
```

### IntelliJ IDEA

```
Cmd/Ctrl + F9      → Пересобрать проект
Shift + F10        → Запустить
Shift + F9         → Debug
Cmd/Ctrl + Shift + F10 → Запустить текущий класс
```

---

## 🔧 Troubleshooting

### Проблема: База данных не подключается

**Решение**:
1. Проверьте что PostgreSQL запущен
2. Проверьте настройки в `application.yml`
3. Создайте базу данных
4. Проверьте пользователя и пароль

### Проблема: JAR не создается

**Решение**:
```bash
mvn clean install -U
```

### Проблема: Порт 8080 занят

**Решение**: Изменить порт в `application.yml`:
```yaml
server:
  port: 8081
```

---

## 📚 Дополнительная информация

- **Spring Boot Docs**: https://spring.io/projects/spring-boot
- **Spring Data JPA**: https://spring.io/projects/spring-data-jpa
- **SpringDoc OpenAPI**: https://springdoc.org/
- **Lombok**: https://projectlombok.org/

---

## ⚠️ Важно

Это **минимальный пример** для демонстрации.  
Для полной миграции потребуется переписать:
- ~40+ файлов backend
- ~7 файлов runtime
- Все бизнес-логику
- Все тесты

**Время**: 2-4 недели разработки

См. `JAVA_MIGRATION_PLAN_RU.md` для детального плана миграции.

---

**Удачи в разработке!** 🚀
