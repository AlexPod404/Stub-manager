package com.stubmanager.controller;

import com.stubmanager.dto.RouteDTO;
import com.stubmanager.service.RouteService;
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
@Tag(name = "Route Management", description = "APIs for managing routes")
public class RouteController {
    
    private final RouteService routeService;
    
    @PostMapping("/mocks/{mockId}/routes")
    @Operation(summary = "Create a new route for a mock")
    public ResponseEntity<RouteDTO> createRoute(@PathVariable Long mockId, @RequestBody RouteDTO dto) {
        RouteDTO created = routeService.createRoute(mockId, dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
    
    @GetMapping("/mocks/{mockId}/routes")
    @Operation(summary = "Get all routes for a mock")
    public ResponseEntity<List<RouteDTO>> getRoutesByMockId(@PathVariable Long mockId) {
        List<RouteDTO> routes = routeService.getRoutesByMockId(mockId);
        return ResponseEntity.ok(routes);
    }
    
    @PutMapping("/routes/{id}")
    @Operation(summary = "Update route")
    public ResponseEntity<RouteDTO> updateRoute(@PathVariable Long id, @RequestBody RouteDTO dto) {
        RouteDTO updated = routeService.updateRoute(id, dto);
        return ResponseEntity.ok(updated);
    }
    
    @DeleteMapping("/routes/{id}")
    @Operation(summary = "Delete route")
    public ResponseEntity<Void> deleteRoute(@PathVariable Long id) {
        routeService.deleteRoute(id);
        return ResponseEntity.noContent().build();
    }
}
