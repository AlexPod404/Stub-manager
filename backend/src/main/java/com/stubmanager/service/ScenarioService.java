package com.stubmanager.service;

import com.stubmanager.dto.ScenarioDTO;
import com.stubmanager.entity.Mock;
import com.stubmanager.entity.Scenario;
import com.stubmanager.entity.ScenarioAction;
import com.stubmanager.exception.ResourceNotFoundException;
import com.stubmanager.model.ActionType;
import com.stubmanager.repository.MockRepository;
import com.stubmanager.repository.ScenarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ScenarioService {
    
    private final ScenarioRepository scenarioRepository;
    private final MockRepository mockRepository;
    
    @Transactional
    public ScenarioDTO createScenario(ScenarioDTO dto) {
        Scenario scenario = new Scenario();
        scenario.setName(dto.getName());
        scenario.setDescription(dto.getDescription());
        
        if (dto.getActions() != null) {
            for (ScenarioDTO.ActionDTO actionDTO : dto.getActions()) {
                ScenarioAction action = new ScenarioAction();
                action.setScenario(scenario);
                action.setActionType(ActionType.valueOf(actionDTO.getActionType()));
                
                if (actionDTO.getMockId() != null) {
                    Mock mock = mockRepository.findById(actionDTO.getMockId())
                            .orElseThrow(() -> new ResourceNotFoundException("Mock not found with id: " + actionDTO.getMockId()));
                    action.setMock(mock);
                }
                
                action.setTimeOffset(actionDTO.getTimeOffset());
                action.setDelayValue(actionDTO.getDelayValue());
                action.setSequenceOrder(actionDTO.getSequenceOrder());
                
                scenario.getActions().add(action);
            }
        }
        
        Scenario saved = scenarioRepository.save(scenario);
        return toDTO(saved);
    }
    
    public List<ScenarioDTO> getAllScenarios() {
        return scenarioRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    public ScenarioDTO getScenarioById(Long id) {
        Scenario scenario = scenarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Scenario not found with id: " + id));
        return toDTO(scenario);
    }
    
    @Transactional
    public ScenarioDTO updateScenario(Long id, ScenarioDTO dto) {
        Scenario scenario = scenarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Scenario not found with id: " + id));
        
        if (dto.getName() != null) scenario.setName(dto.getName());
        if (dto.getDescription() != null) scenario.setDescription(dto.getDescription());
        
        Scenario updated = scenarioRepository.save(scenario);
        return toDTO(updated);
    }
    
    @Transactional
    public void deleteScenario(Long id) {
        if (!scenarioRepository.existsById(id)) {
            throw new ResourceNotFoundException("Scenario not found with id: " + id);
        }
        scenarioRepository.deleteById(id);
    }
    
    private ScenarioDTO toDTO(Scenario scenario) {
        ScenarioDTO dto = new ScenarioDTO();
        dto.setId(scenario.getId());
        dto.setName(scenario.getName());
        dto.setDescription(scenario.getDescription());
        
        if (scenario.getActions() != null) {
            List<ScenarioDTO.ActionDTO> actions = scenario.getActions().stream()
                    .map(action -> {
                        ScenarioDTO.ActionDTO actionDTO = new ScenarioDTO.ActionDTO();
                        actionDTO.setActionType(action.getActionType().name());
                        actionDTO.setMockId(action.getMock() != null ? action.getMock().getId() : null);
                        actionDTO.setTimeOffset(action.getTimeOffset());
                        actionDTO.setDelayValue(action.getDelayValue());
                        actionDTO.setSequenceOrder(action.getSequenceOrder());
                        return actionDTO;
                    })
                    .collect(Collectors.toList());
            dto.setActions(actions);
        }
        
        return dto;
    }
}
