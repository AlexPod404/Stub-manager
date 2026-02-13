package com.stub.manager.dto;

import com.stub.manager.enums.MockProtocol;
import com.stub.manager.enums.MockStatus;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

/**
 * DTO для возврата Mock данных
 */
@Data
public class MockDto {
    private UUID id;
    private String name;
    private String description;
    private MockProtocol protocol;
    private MockStatus status;
    private Integer responseDelay;
    private Map<String, Object> metadata;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
