package com.stubmanager.service;

import com.stubmanager.dto.RouteDTO;
import com.stubmanager.entity.Mock;
import com.stubmanager.entity.Route;
import com.stubmanager.exception.ResourceNotFoundException;
import com.stubmanager.repository.MockRepository;
import com.stubmanager.repository.RouteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RouteService {
    
    private final RouteRepository routeRepository;
    private final MockRepository mockRepository;
    
    @Transactional
    public RouteDTO createRoute(Long mockId, RouteDTO dto) {
        Mock mock = mockRepository.findById(mockId)
                .orElseThrow(() -> new ResourceNotFoundException("Mock not found with id: " + mockId));
        
        Route route = new Route();
        route.setMock(mock);
        route.setPath(dto.getPath());
        route.setMethod(dto.getMethod());
        route.setIsActive(dto.getIsActive() != null ? dto.getIsActive() : true);
        
        Route saved = routeRepository.save(route);
        return toDTO(saved);
    }
    
    public List<RouteDTO> getRoutesByMockId(Long mockId) {
        return routeRepository.findByMockId(mockId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public RouteDTO updateRoute(Long id, RouteDTO dto) {
        Route route = routeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Route not found with id: " + id));
        
        if (dto.getPath() != null) route.setPath(dto.getPath());
        if (dto.getMethod() != null) route.setMethod(dto.getMethod());
        if (dto.getIsActive() != null) route.setIsActive(dto.getIsActive());
        
        Route updated = routeRepository.save(route);
        return toDTO(updated);
    }
    
    @Transactional
    public void deleteRoute(Long id) {
        if (!routeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Route not found with id: " + id);
        }
        routeRepository.deleteById(id);
    }
    
    private RouteDTO toDTO(Route route) {
        RouteDTO dto = new RouteDTO();
        dto.setId(route.getId());
        dto.setMockId(route.getMock().getId());
        dto.setPath(route.getPath());
        dto.setMethod(route.getMethod());
        dto.setIsActive(route.getIsActive());
        return dto;
    }
}
