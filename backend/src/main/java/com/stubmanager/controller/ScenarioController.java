package com.stubmanager.controller;

import com.stubmanager.dto.ScenarioDTO;
import com.stubmanager.dto.TestResultDTO;
import com.stubmanager.service.ScenarioExecutorService;
import com.stubmanager.service.ScenarioService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/scenarios")
@RequiredArgsConstructor
@Tag(name = "Scenario Management", description = "APIs for managing test scenarios")
public class ScenarioController {
    
    private final ScenarioService scenarioService;
    private final ScenarioExecutorService executorService;
    
    @PostMapping
    @Operation(summary = "Create a new scenario")
    public ResponseEntity<ScenarioDTO> createScenario(@RequestBody ScenarioDTO dto) {
        ScenarioDTO created = scenarioService.createScenario(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
    
    @GetMapping
    @Operation(summary = "Get all scenarios")
    public ResponseEntity<List<ScenarioDTO>> getAllScenarios() {
        List<ScenarioDTO> scenarios = scenarioService.getAllScenarios();
        return ResponseEntity.ok(scenarios);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get scenario by ID")
    public ResponseEntity<ScenarioDTO> getScenarioById(@PathVariable Long id) {
        ScenarioDTO scenario = scenarioService.getScenarioById(id);
        return ResponseEntity.ok(scenario);
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update scenario")
    public ResponseEntity<ScenarioDTO> updateScenario(@PathVariable Long id, @RequestBody ScenarioDTO dto) {
        ScenarioDTO updated = scenarioService.updateScenario(id, dto);
        return ResponseEntity.ok(updated);
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete scenario")
    public ResponseEntity<Void> deleteScenario(@PathVariable Long id) {
        scenarioService.deleteScenario(id);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/{id}/execute")
    @Operation(summary = "Execute scenario")
    public ResponseEntity<TestResultDTO> executeScenario(@PathVariable Long id) {
        TestResultDTO result = executorService.executeScenario(id);
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/{id}/results")
    @Operation(summary = "Get scenario execution results")
    public ResponseEntity<List<TestResultDTO>> getScenarioResults(@PathVariable Long id) {
        List<TestResultDTO> results = executorService.getScenarioResults(id);
        return ResponseEntity.ok(results);
    }
}
