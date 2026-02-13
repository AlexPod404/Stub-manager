package com.stub.manager.controller;

import com.stub.manager.dto.CreateMockDto;
import com.stub.manager.dto.MockDto;
import com.stub.manager.service.MockService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

/**
 * REST Controller для управления Mock
 */
@RestController
@RequestMapping("/mocks")
@RequiredArgsConstructor
@Tag(name = "Mocks", description = "API для управления заглушками")
public class MockController {

    private final MockService mockService;

    @PostMapping
    @Operation(summary = "Создать новую заглушку")
    public ResponseEntity<MockDto> create(@Valid @RequestBody CreateMockDto dto) {
        MockDto created = mockService.create(dto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping
    @Operation(summary = "Получить все заглушки")
    public ResponseEntity<List<MockDto>> findAll() {
        return ResponseEntity.ok(mockService.findAll());
    }

    @GetMapping("/{id}")
    @Operation(summary = "Получить заглушку по ID")
    public ResponseEntity<MockDto> findById(@PathVariable UUID id) {
        return ResponseEntity.ok(mockService.findById(id));
    }

    @PostMapping("/{id}/start")
    @Operation(summary = "Запустить заглушку")
    public ResponseEntity<MockDto> start(@PathVariable UUID id) {
        return ResponseEntity.ok(mockService.start(id));
    }

    @PostMapping("/{id}/stop")
    @Operation(summary = "Остановить заглушку")
    public ResponseEntity<MockDto> stop(@PathVariable UUID id) {
        return ResponseEntity.ok(mockService.stop(id));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Удалить заглушку")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        mockService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
