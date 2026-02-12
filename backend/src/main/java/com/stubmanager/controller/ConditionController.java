package com.stubmanager.controller;

import com.stubmanager.dto.ConditionDTO;
import com.stubmanager.service.ConditionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Tag(name = "Condition Management", description = "APIs for managing conditions")
public class ConditionController {
    
    private final ConditionService conditionService;
    
    @PostMapping("/routes/{routeId}/conditions")
    @Operation(summary = "Create a new condition for a route")
    public ResponseEntity<ConditionDTO> createCondition(@PathVariable Long routeId, @RequestBody ConditionDTO dto) {
        ConditionDTO created = conditionService.createCondition(routeId, dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
    
    @GetMapping("/routes/{routeId}/conditions")
    @Operation(summary = "Get all conditions for a route")
    public ResponseEntity<List<ConditionDTO>> getConditionsByRouteId(@PathVariable Long routeId) {
        List<ConditionDTO> conditions = conditionService.getConditionsByRouteId(routeId);
        return ResponseEntity.ok(conditions);
    }
    
    @PutMapping("/conditions/{id}")
    @Operation(summary = "Update condition")
    public ResponseEntity<ConditionDTO> updateCondition(@PathVariable Long id, @RequestBody ConditionDTO dto) {
        ConditionDTO updated = conditionService.updateCondition(id, dto);
        return ResponseEntity.ok(updated);
    }
    
    @DeleteMapping("/conditions/{id}")
    @Operation(summary = "Delete condition")
    public ResponseEntity<Void> deleteCondition(@PathVariable Long id) {
        conditionService.deleteCondition(id);
        return ResponseEntity.noContent().build();
    }
}
