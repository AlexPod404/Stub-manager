package com.stubmanager.service;

import com.stubmanager.dto.TestResultDTO;
import com.stubmanager.entity.Scenario;
import com.stubmanager.entity.TestResult;
import com.stubmanager.exception.ResourceNotFoundException;
import com.stubmanager.repository.ScenarioRepository;
import com.stubmanager.repository.TestResultRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ScenarioExecutorService {
    
    private final ScenarioRepository scenarioRepository;
    private final TestResultRepository testResultRepository;
    private final MockService mockService;
    
    @Transactional
    public TestResultDTO executeScenario(Long scenarioId) {
        Scenario scenario = scenarioRepository.findById(scenarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Scenario not found with id: " + scenarioId));
        
        TestResult result = new TestResult();
        result.setScenario(scenario);
        result.setExecutionTime(LocalDateTime.now());
        
        try {
            scenario.getActions().stream()
                    .sorted((a1, a2) -> {
                        int seq1 = a1.getSequenceOrder() != null ? a1.getSequenceOrder() : 0;
                        int seq2 = a2.getSequenceOrder() != null ? a2.getSequenceOrder() : 0;
                        return Integer.compare(seq1, seq2);
                    })
                    .forEach(action -> {
                        try {
                            if (action.getTimeOffset() != null && action.getTimeOffset() > 0) {
                                Thread.sleep(action.getTimeOffset());
                            }
                            
                            switch (action.getActionType()) {
                                case START:
                                    if (action.getMock() != null) {
                                        mockService.startMock(action.getMock().getId());
                                    }
                                    break;
                                case STOP:
                                    if (action.getMock() != null) {
                                        mockService.stopMock(action.getMock().getId());
                                    }
                                    break;
                                case SET_DELAY:
                                    if (action.getMock() != null && action.getDelayValue() != null) {
                                        mockService.setDelay(action.getMock().getId(), action.getDelayValue());
                                    }
                                    break;
                            }
                        } catch (InterruptedException e) {
                            Thread.currentThread().interrupt();
                            throw new RuntimeException("Scenario execution interrupted", e);
                        }
                    });
            
            result.setStatus("SUCCESS");
            result.setMetrics("{\"executedActions\": " + scenario.getActions().size() + "}");
        } catch (Exception e) {
            log.error("Error executing scenario {}", scenarioId, e);
            result.setStatus("FAILED");
            result.setErrorMessage(e.getMessage());
        }
        
        TestResult saved = testResultRepository.save(result);
        return toDTO(saved);
    }
    
    public List<TestResultDTO> getScenarioResults(Long scenarioId) {
        return testResultRepository.findByScenarioId(scenarioId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    private TestResultDTO toDTO(TestResult result) {
        TestResultDTO dto = new TestResultDTO();
        dto.setId(result.getId());
        dto.setScenarioId(result.getScenario().getId());
        dto.setExecutionTime(result.getExecutionTime());
        dto.setStatus(result.getStatus());
        dto.setMetrics(result.getMetrics());
        dto.setErrorMessage(result.getErrorMessage());
        return dto;
    }
}
