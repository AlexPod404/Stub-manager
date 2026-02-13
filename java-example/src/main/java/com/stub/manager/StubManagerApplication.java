package com.stub.manager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * Stub Manager Application
 * 
 * Система управления динамическими заглушками с поддержкой:
 * - REST, gRPC, Kafka протоколов
 * - Динамического извлечения параметров и условных ответов
 * - Тестирования отказоустойчивости
 * - Dead cache (работа без БД 1 час)
 */
@SpringBootApplication
@EnableJpaAuditing
public class StubManagerApplication {

    public static void main(String[] args) {
        SpringApplication.run(StubManagerApplication.class, args);
        System.out.println("\n" +
            "╔══════════════════════════════════════════════════════════╗\n" +
            "║     Stub Manager запущен успешно! 🚀                    ║\n" +
            "║                                                          ║\n" +
            "║  API: http://localhost:8080/api                          ║\n" +
            "║  Swagger: http://localhost:8080/api/swagger-ui.html     ║\n" +
            "║  API Docs: http://localhost:8080/api/api-docs           ║\n" +
            "╚══════════════════════════════════════════════════════════╝\n"
        );
    }
}
