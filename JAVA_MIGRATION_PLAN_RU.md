# 🔄 План миграции проекта на Java

## ⚠️ ВАЖНО: Это полная переписка проекта

Переписывание на Java - это **НЕ модификация**, а **создание нового проекта** на другом языке.

**Текущий проект**: Node.js/TypeScript (NestJS, Express, React)  
**Целевой проект**: Java (Spring Boot)

---

## 📊 Масштаб работ

### Что нужно переписать:

```
Node.js/TypeScript           →    Java/Spring Boot
─────────────────────────────────────────────────────
NestJS Backend (40+ файлов)  →    Spring Boot (~50+ файлов)
Express Runtime (7 файлов)   →    Java сервис (~10+ файлов)
TypeORM entities             →    JPA/Hibernate entities
npm зависимости              →    Maven/Gradle зависимости
package.json                 →    pom.xml или build.gradle
TypeScript                   →    Java
JavaScript                   →    Java
```

**Примерно: 3000+ строк кода нужно переписать**

---

## 🎯 Стратегия миграции

### Вариант 1: Полная миграция (2-4 недели)

Создать полноценную Java версию со всем функционалом:

```
stub-manager-java/
├── src/main/java/
│   └── com/stub/manager/
│       ├── StubManagerApplication.java
│       ├── config/
│       │   ├── DatabaseConfig.java
│       │   ├── RedisConfig.java
│       │   └── SwaggerConfig.java
│       ├── controllers/
│       │   ├── MockController.java
│       │   ├── RouteController.java
│       │   ├── ConditionController.java
│       │   └── ScenarioController.java
│       ├── services/
│       │   ├── MockService.java
│       │   ├── RouteService.java
│       │   ├── ConditionService.java
│       │   ├── ScenarioService.java
│       │   ├── ExecutorService.java
│       │   ├── GeneratorService.java
│       │   └── CacheService.java
│       ├── entities/
│       │   ├── Mock.java
│       │   ├── Route.java
│       │   ├── Condition.java
│       │   ├── Scenario.java
│       │   ├── ScenarioAction.java
│       │   └── TestResult.java
│       ├── dto/
│       │   ├── CreateMockDto.java
│       │   ├── UpdateMockDto.java
│       │   └── ...
│       ├── repositories/
│       │   ├── MockRepository.java
│       │   └── ...
│       └── enums/
│           ├── MockProtocol.java
│           ├── MockStatus.java
│           └── ...
├── src/main/resources/
│   ├── application.yml
│   └── application-dev.yml
├── pom.xml
└── README.md
```

### Вариант 2: Постепенная миграция (4-8 недель)

1. **Неделя 1-2**: Базовая структура + Mocks модуль
2. **Неделя 3**: Routes + Conditions модули
3. **Неделя 4**: Scenarios + Executor
4. **Неделя 5**: Generator + Cache
5. **Неделя 6-8**: Тестирование и доработка

### Вариант 3: Starter проект (2-3 дня)

Создать минимальную работающую версию:
- Spring Boot приложение
- 1-2 модуля в качестве примера
- Работающий JAR
- Готово к запуску в IntelliJ IDEA

---

## 🛠️ Технологический стек для Java версии

### Backend:

```xml
<dependencies>
    <!-- Spring Boot -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    
    <!-- Spring Data JPA -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    
    <!-- PostgreSQL -->
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
    </dependency>
    
    <!-- Redis -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-redis</artifactId>
    </dependency>
    
    <!-- Validation -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    
    <!-- Swagger/OpenAPI -->
    <dependency>
        <groupId>org.springdoc</groupId>
        <artifactId>springdoc-openapi-ui</artifactId>
    </dependency>
    
    <!-- Lombok (опционально) -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
    
    <!-- Kafka (для Runtime) -->
    <dependency>
        <groupId>org.springframework.kafka</groupId>
        <artifactId>spring-kafka</artifactId>
    </dependency>
    
    <!-- gRPC (для Runtime) -->
    <dependency>
        <groupId>net.devh</groupId>
        <artifactId>grpc-spring-boot-starter</artifactId>
    </dependency>
</dependencies>
```

---

## 📝 Примеры миграции кода

### Entity: TypeORM → JPA

**TypeScript (TypeORM):**
```typescript
@Entity('mocks')
export class Mock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({
    type: 'enum',
    enum: MockProtocol,
    default: MockProtocol.REST,
  })
  protocol: MockProtocol;
  
  @OneToMany(() => Route, (route) => route.mock)
  routes: Route[];
}
```

**Java (JPA):**
```java
@Entity
@Table(name = "mocks")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Mock {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    @Column(unique = true, nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MockProtocol protocol = MockProtocol.REST;

    @OneToMany(mappedBy = "mock", cascade = CascadeType.ALL)
    private List<Route> routes = new ArrayList<>();
    
    @CreatedDate
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    private LocalDateTime updatedAt;
}
```

### Controller: NestJS → Spring

**TypeScript (NestJS):**
```typescript
@Controller('mocks')
export class MocksController {
  constructor(private readonly mocksService: MocksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new mock' })
  create(@Body() createMockDto: CreateMockDto) {
    return this.mocksService.create(createMockDto);
  }

  @Get()
  findAll() {
    return this.mocksService.findAll();
  }
}
```

**Java (Spring):**
```java
@RestController
@RequestMapping("/api/mocks")
@RequiredArgsConstructor
public class MockController {
    private final MockService mockService;

    @PostMapping
    @Operation(summary = "Create a new mock")
    @ResponseStatus(HttpStatus.CREATED)
    public MockDto create(@Valid @RequestBody CreateMockDto dto) {
        return mockService.create(dto);
    }

    @GetMapping
    @Operation(summary = "Get all mocks")
    public List<MockDto> findAll() {
        return mockService.findAll();
    }
}
```

### Service: TypeScript → Java

**TypeScript:**
```typescript
@Injectable()
export class MocksService {
  constructor(
    @InjectRepository(Mock)
    private readonly mockRepository: Repository<Mock>,
  ) {}

  async create(createMockDto: CreateMockDto): Promise<Mock> {
    const mock = this.mockRepository.create(createMockDto);
    return this.mockRepository.save(mock);
  }
}
```

**Java:**
```java
@Service
@RequiredArgsConstructor
public class MockService {
    private final MockRepository mockRepository;
    private final ModelMapper modelMapper;

    @Transactional
    public MockDto create(CreateMockDto dto) {
        Mock mock = modelMapper.map(dto, Mock.class);
        Mock saved = mockRepository.save(mock);
        return modelMapper.map(saved, MockDto.class);
    }
}
```

---

## 🚀 Быстрый старт (IntelliJ IDEA)

### 1. Создать проект в IntelliJ IDEA

```
File → New → Project → Spring Initializr

Настройки:
- Language: Java
- Type: Maven
- Java: 17 или 21
- Packaging: Jar
- Group: com.stub
- Artifact: manager
- Name: stub-manager
- Package: com.stub.manager

Dependencies:
- Spring Web
- Spring Data JPA
- PostgreSQL Driver
- Spring Data Redis
- Validation
- Lombok
- Spring Boot DevTools
```

### 2. Структура pom.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.0</version>
    </parent>
    
    <groupId>com.stub</groupId>
    <artifactId>manager</artifactId>
    <version>1.0.0</version>
    <name>Stub Manager</name>
    <description>Dynamic stub/mock management system</description>
    
    <properties>
        <java.version>17</java.version>
    </properties>
    
    <!-- dependencies здесь -->
</project>
```

### 3. application.yml

```yaml
spring:
  application:
    name: stub-manager
  
  datasource:
    url: jdbc:postgresql://localhost:5432/stub_manager
    username: stub_manager
    password: stub_manager_password
    driver-class-name: org.postgresql.Driver
  
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
    properties:
      hibernate:
        format_sql: true
  
  data:
    redis:
      host: localhost
      port: 6379
      
server:
  port: 8080
  
springdoc:
  api-docs:
    path: /api-docs
  swagger-ui:
    path: /swagger-ui.html
```

### 4. Запуск в IntelliJ IDEA

```
1. Открыть проект: File → Open → выбрать папку проекта
2. Дождаться загрузки Maven зависимостей
3. Найти StubManagerApplication.java
4. Нажать ▶️ (Run) рядом с классом
5. Или: Run → Run 'StubManagerApplication'
```

### 5. Создание JAR файла

```bash
# В терминале IntelliJ или командной строке
mvn clean package

# JAR будет в:
target/stub-manager-1.0.0.jar

# Запуск JAR:
java -jar target/stub-manager-1.0.0.jar
```

---

## 📦 Что получится на выходе

После полной миграции:

```
stub-manager-java/
├── src/
│   └── main/
│       ├── java/...           ← Java код
│       └── resources/         ← Конфигурация
├── target/
│   └── stub-manager.jar       ← 🎯 JAR ФАЙЛ
├── pom.xml                    ← Maven конфигурация
├── .idea/                     ← IntelliJ IDEA настройки
└── README.md
```

**Размер JAR**: ~50-100 MB (с зависимостями)

**Запуск**:
```bash
java -jar stub-manager.jar
```

**В IntelliJ IDEA**:
- Открыть проект
- Run/Debug из IDE
- Автодополнение
- Debugging
- Все фичи Java IDE

---

## ⏱️ Детальный план работ

### Фаза 1: Инфраструктура (2-3 дня)

- [x] Создать Spring Boot проект
- [ ] Настроить Maven/Gradle
- [ ] Настроить PostgreSQL подключение
- [ ] Настроить Redis подключение
- [ ] Настроить Swagger/OpenAPI
- [ ] Создать базовые конфигурации
- [ ] Настроить логирование

### Фаза 2: Entities и Repositories (3-4 дня)

- [ ] Mock entity + repository
- [ ] Route entity + repository
- [ ] Condition entity + repository
- [ ] Scenario entity + repository
- [ ] ScenarioAction entity + repository
- [ ] TestResult entity + repository
- [ ] Enums (MockProtocol, MockStatus, etc.)

### Фаза 3: DTOs и Mappers (2-3 дня)

- [ ] CreateMockDto, UpdateMockDto
- [ ] CreateRouteDto, UpdateRouteDto
- [ ] CreateConditionDto, UpdateConditionDto
- [ ] CreateScenarioDto, UpdateScenarioDto
- [ ] ModelMapper конфигурация

### Фаза 4: Services (4-5 дней)

- [ ] MockService
- [ ] RouteService
- [ ] ConditionService
- [ ] ScenarioService
- [ ] ExecutorService
- [ ] GeneratorService
- [ ] CacheService

### Фаза 5: Controllers (3-4 дня)

- [ ] MockController
- [ ] RouteController
- [ ] ConditionController
- [ ] ScenarioController
- [ ] HealthController

### Фаза 6: Runtime сервис (5-7 дней)

- [ ] REST adapter
- [ ] gRPC adapter
- [ ] Kafka adapter
- [ ] Request engine
- [ ] Condition evaluation

### Фаза 7: Тестирование (3-5 дней)

- [ ] Unit тесты
- [ ] Integration тесты
- [ ] E2E тесты

### Фаза 8: Docker и Kubernetes (2-3 дня)

- [ ] Dockerfile для Java
- [ ] docker-compose.yml
- [ ] Kubernetes манифесты

---

## 💰 Альтернативные решения

### Если полная миграция слишком дорогая:

1. **Оставить Node.js версию**
   - Она работает отлично
   - Docker образы вместо JAR
   - Можно запустить в любой IDE

2. **Создать Java wrapper**
   - Тонкий Java слой
   - Вызывает Node.js процессы
   - JAR только для удобства запуска

3. **Использовать GraalVM**
   - Node.js + Java в одном runtime
   - Нативная компиляция
   - Быстрый запуск

4. **Микросервисная архитектура**
   - Часть на Java, часть на Node.js
   - Каждый сервис - свой язык
   - Общение через API

---

## ❓ FAQ

**Q: Сколько времени займет полная миграция?**  
A: 2-4 недели при полной занятости разработчика.

**Q: Можно ли автоматизировать миграцию?**  
A: Частично. Entities можно генерировать, но бизнес-логику нужно переписывать вручную.

**Q: Будет ли Java версия быстрее?**  
A: Зависит от задачи. Для I/O операций (БД, сеть) разница минимальна.

**Q: Нужно ли переписывать frontend?**  
A: Нет! React frontend может оставаться, он общается с backend через REST API.

**Q: Что лучше: Maven или Gradle?**  
A: Maven - проще для начинающих, Gradle - гибче и быстрее.

**Q: Можно ли запустить Node.js версию в IntelliJ IDEA?**  
A: Да! IntelliJ IDEA Ultimate поддерживает Node.js и TypeScript.

---

## 🎯 Рекомендация

Если цель - **просто запустить в IntelliJ IDEA**:
- Используйте IntelliJ IDEA Ultimate
- Откройте Node.js проект
- Установите Node.js plugin
- Запускайте через npm scripts

Если цель - **именно Java и JAR**:
- Начните с создания базового Spring Boot проекта
- Миграция по модулям
- Сохраните Node.js версию для reference

---

**Готовы начать? Предлагаю создать базовый Spring Boot starter проект как proof of concept.**
