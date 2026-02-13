package com.stubmanager.controller;

import com.stubmanager.dto.MockDTO;
import com.stubmanager.service.MockService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/mocks")
@RequiredArgsConstructor
@Tag(name = "Mock Management", description = "APIs for managing mock stubs")
public class MockController {
    
    private final MockService mockService;
    
    @PostMapping
    @Operation(summary = "Create a new mock")
    public ResponseEntity<MockDTO> createMock(@RequestBody MockDTO dto) {
        MockDTO created = mockService.createMock(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
    
    @GetMapping
    @Operation(summary = "Get all mocks")
    public ResponseEntity<List<MockDTO>> getAllMocks() {
        List<MockDTO> mocks = mockService.getAllMocks();
        return ResponseEntity.ok(mocks);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get mock by ID")
    public ResponseEntity<MockDTO> getMockById(@PathVariable Long id) {
        MockDTO mock = mockService.getMockById(id);
        return ResponseEntity.ok(mock);
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update mock")
    public ResponseEntity<MockDTO> updateMock(@PathVariable Long id, @RequestBody MockDTO dto) {
        MockDTO updated = mockService.updateMock(id, dto);
        return ResponseEntity.ok(updated);
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete mock")
    public ResponseEntity<Void> deleteMock(@PathVariable Long id) {
        mockService.deleteMock(id);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/{id}/start")
    @Operation(summary = "Start mock")
    public ResponseEntity<Void> startMock(@PathVariable Long id) {
        mockService.startMock(id);
        return ResponseEntity.ok().build();
    }
    
    @PostMapping("/{id}/stop")
    @Operation(summary = "Stop mock")
    public ResponseEntity<Void> stopMock(@PathVariable Long id) {
        mockService.stopMock(id);
        return ResponseEntity.ok().build();
    }
    
    @PutMapping("/{id}/delay")
    @Operation(summary = "Set response delay")
    public ResponseEntity<Void> setDelay(@PathVariable Long id, @RequestBody Map<String, Integer> request) {
        Integer delay = request.get("delay");
        mockService.setDelay(id, delay);
        return ResponseEntity.ok().build();
    }
}
