package com.stub.manager.dto;

import com.stub.manager.enums.MockProtocol;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.Map;

/**
 * DTO для создания Mock
 */
@Data
public class CreateMockDto {

    @NotBlank(message = "Name is required")
    private String name;

    private String description;

    @NotNull(message = "Protocol is required")
    private MockProtocol protocol;

    @Min(value = 0, message = "Response delay must be >= 0")
    private Integer responseDelay = 0;

    private Map<String, Object> metadata;
}
