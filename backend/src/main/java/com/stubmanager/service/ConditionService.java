package com.stubmanager.service;

import com.stubmanager.dto.ConditionDTO;
import com.stubmanager.entity.Condition;
import com.stubmanager.entity.Response;
import com.stubmanager.entity.Route;
import com.stubmanager.exception.ResourceNotFoundException;
import com.stubmanager.repository.ConditionRepository;
import com.stubmanager.repository.RouteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ConditionService {
    
    private final ConditionRepository conditionRepository;
    private final RouteRepository routeRepository;
    
    @Transactional
    public ConditionDTO createCondition(Long routeId, ConditionDTO dto) {
        Route route = routeRepository.findById(routeId)
                .orElseThrow(() -> new ResourceNotFoundException("Route not found with id: " + routeId));
        
        Condition condition = new Condition();
        condition.setRoute(route);
        condition.setType(dto.getType());
        condition.setParameterName(dto.getParameterName());
        condition.setParameterSource(dto.getParameterSource());
        condition.setParameterPath(dto.getParameterPath());
        condition.setExpectedValue(dto.getExpectedValue());
        condition.setPriority(dto.getPriority() != null ? dto.getPriority() : 0);
        
        if (dto.getResponse() != null) {
            Response response = new Response();
            response.setCondition(condition);
            response.setStatusCode(dto.getResponse().getStatusCode() != null ? 
                    dto.getResponse().getStatusCode() : 200);
            response.setBody(dto.getResponse().getBody());
            response.setHeaders(dto.getResponse().getHeaders());
            response.setResponseDelay(dto.getResponse().getResponseDelay() != null ? 
                    dto.getResponse().getResponseDelay() : 0);
            condition.setResponse(response);
        }
        
        Condition saved = conditionRepository.save(condition);
        return toDTO(saved);
    }
    
    public List<ConditionDTO> getConditionsByRouteId(Long routeId) {
        return conditionRepository.findByRouteIdOrderByPriorityDesc(routeId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public ConditionDTO updateCondition(Long id, ConditionDTO dto) {
        Condition condition = conditionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Condition not found with id: " + id));
        
        if (dto.getType() != null) condition.setType(dto.getType());
        if (dto.getParameterName() != null) condition.setParameterName(dto.getParameterName());
        if (dto.getParameterSource() != null) condition.setParameterSource(dto.getParameterSource());
        if (dto.getParameterPath() != null) condition.setParameterPath(dto.getParameterPath());
        if (dto.getExpectedValue() != null) condition.setExpectedValue(dto.getExpectedValue());
        if (dto.getPriority() != null) condition.setPriority(dto.getPriority());
        
        Condition updated = conditionRepository.save(condition);
        return toDTO(updated);
    }
    
    @Transactional
    public void deleteCondition(Long id) {
        if (!conditionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Condition not found with id: " + id);
        }
        conditionRepository.deleteById(id);
    }
    
    private ConditionDTO toDTO(Condition condition) {
        ConditionDTO dto = new ConditionDTO();
        dto.setId(condition.getId());
        dto.setRouteId(condition.getRoute().getId());
        dto.setType(condition.getType());
        dto.setParameterName(condition.getParameterName());
        dto.setParameterSource(condition.getParameterSource());
        dto.setParameterPath(condition.getParameterPath());
        dto.setExpectedValue(condition.getExpectedValue());
        dto.setPriority(condition.getPriority());
        
        if (condition.getResponse() != null) {
            ConditionDTO.ResponseDTO responseDTO = new ConditionDTO.ResponseDTO();
            responseDTO.setStatusCode(condition.getResponse().getStatusCode());
            responseDTO.setBody(condition.getResponse().getBody());
            responseDTO.setHeaders(condition.getResponse().getHeaders());
            responseDTO.setResponseDelay(condition.getResponse().getResponseDelay());
            dto.setResponse(responseDTO);
        }
        
        return dto;
    }
}
