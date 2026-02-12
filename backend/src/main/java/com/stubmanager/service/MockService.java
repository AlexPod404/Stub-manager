package com.stubmanager.service;

import com.stubmanager.dto.MockDTO;
import com.stubmanager.entity.Mock;
import com.stubmanager.exception.ResourceNotFoundException;
import com.stubmanager.repository.MockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MockService {
    
    private final MockRepository mockRepository;
    
    @Transactional
    @CacheEvict(value = "mocks", allEntries = true)
    public MockDTO createMock(MockDTO dto) {
        Mock mock = new Mock();
        mock.setName(dto.getName());
        mock.setDescription(dto.getDescription());
        mock.setProtocol(dto.getProtocol());
        mock.setIsActive(dto.getIsActive() != null ? dto.getIsActive() : true);
        mock.setResponseDelay(dto.getResponseDelay() != null ? dto.getResponseDelay() : 0);
        
        Mock saved = mockRepository.save(mock);
        return toDTO(saved);
    }
    
    @Cacheable(value = "mocks")
    public List<MockDTO> getAllMocks() {
        return mockRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
    
    @Cacheable(value = "mocks", key = "#id")
    public MockDTO getMockById(Long id) {
        Mock mock = mockRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mock not found with id: " + id));
        return toDTO(mock);
    }
    
    @Transactional
    @CacheEvict(value = "mocks", allEntries = true)
    public MockDTO updateMock(Long id, MockDTO dto) {
        Mock mock = mockRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mock not found with id: " + id));
        
        if (dto.getName() != null) mock.setName(dto.getName());
        if (dto.getDescription() != null) mock.setDescription(dto.getDescription());
        if (dto.getProtocol() != null) mock.setProtocol(dto.getProtocol());
        if (dto.getIsActive() != null) mock.setIsActive(dto.getIsActive());
        if (dto.getResponseDelay() != null) mock.setResponseDelay(dto.getResponseDelay());
        
        Mock updated = mockRepository.save(mock);
        return toDTO(updated);
    }
    
    @Transactional
    @CacheEvict(value = "mocks", allEntries = true)
    public void deleteMock(Long id) {
        if (!mockRepository.existsById(id)) {
            throw new ResourceNotFoundException("Mock not found with id: " + id);
        }
        mockRepository.deleteById(id);
    }
    
    @Transactional
    @CacheEvict(value = "mocks", allEntries = true)
    public void startMock(Long id) {
        Mock mock = mockRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mock not found with id: " + id));
        mock.setIsActive(true);
        mockRepository.save(mock);
    }
    
    @Transactional
    @CacheEvict(value = "mocks", allEntries = true)
    public void stopMock(Long id) {
        Mock mock = mockRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mock not found with id: " + id));
        mock.setIsActive(false);
        mockRepository.save(mock);
    }
    
    @Transactional
    @CacheEvict(value = "mocks", allEntries = true)
    public void setDelay(Long id, Integer delay) {
        Mock mock = mockRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Mock not found with id: " + id));
        mock.setResponseDelay(delay);
        mockRepository.save(mock);
    }
    
    private MockDTO toDTO(Mock mock) {
        MockDTO dto = new MockDTO();
        dto.setId(mock.getId());
        dto.setName(mock.getName());
        dto.setDescription(mock.getDescription());
        dto.setProtocol(mock.getProtocol());
        dto.setIsActive(mock.getIsActive());
        dto.setResponseDelay(mock.getResponseDelay());
        return dto;
    }
}
