package com.stubmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestResultDTO {
    private Long id;
    private Long scenarioId;
    private LocalDateTime executionTime;
    private String status;
    private String metrics;
    private String errorMessage;
}
