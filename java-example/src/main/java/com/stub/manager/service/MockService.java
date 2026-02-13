package com.stub.manager.service;

import com.stub.manager.dto.CreateMockDto;
import com.stub.manager.dto.MockDto;
import com.stub.manager.entity.Mock;
import com.stub.manager.enums.MockStatus;
import com.stub.manager.repository.MockRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

/**
 * Service для работы с Mock
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class MockService {

    private final MockRepository mockRepository;

    @Transactional
    public MockDto create(CreateMockDto dto) {
        log.info("Creating mock: {}", dto.getName());
        
        if (mockRepository.existsByName(dto.getName())) {
            throw new IllegalArgumentException("Mock with name '" + dto.getName() + "' already exists");
        }

        Mock mock = new Mock();
        mock.setName(dto.getName());
        mock.setDescription(dto.getDescription());
        mock.setProtocol(dto.getProtocol());
        mock.setResponseDelay(dto.getResponseDelay());
        mock.setMetadata(dto.getMetadata());
        mock.setStatus(MockStatus.INACTIVE);

        Mock saved = mockRepository.save(mock);
        return toDto(saved);
    }

    @Transactional(readOnly = true)
    public List<MockDto> findAll() {
        log.info("Fetching all mocks");
        return mockRepository.findAll().stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public MockDto findById(UUID id) {
        log.info("Fetching mock by id: {}", id);
        Mock mock = mockRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Mock not found with id: " + id));
        return toDto(mock);
    }

    @Transactional
    public MockDto start(UUID id) {
        log.info("Starting mock: {}", id);
        Mock mock = mockRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Mock not found with id: " + id));
        mock.setStatus(MockStatus.ACTIVE);
        return toDto(mockRepository.save(mock));
    }

    @Transactional
    public MockDto stop(UUID id) {
        log.info("Stopping mock: {}", id);
        Mock mock = mockRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Mock not found with id: " + id));
        mock.setStatus(MockStatus.INACTIVE);
        return toDto(mockRepository.save(mock));
    }

    @Transactional
    public void delete(UUID id) {
        log.info("Deleting mock: {}", id);
        mockRepository.deleteById(id);
    }

    private MockDto toDto(Mock mock) {
        MockDto dto = new MockDto();
        dto.setId(mock.getId());
        dto.setName(mock.getName());
        dto.setDescription(mock.getDescription());
        dto.setProtocol(mock.getProtocol());
        dto.setStatus(mock.getStatus());
        dto.setResponseDelay(mock.getResponseDelay());
        dto.setMetadata(mock.getMetadata());
        dto.setCreatedAt(mock.getCreatedAt());
        dto.setUpdatedAt(mock.getUpdatedAt());
        return dto;
    }
}
