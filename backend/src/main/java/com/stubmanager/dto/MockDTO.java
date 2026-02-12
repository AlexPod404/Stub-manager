package com.stubmanager.dto;

import com.stubmanager.model.Protocol;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MockDTO {
    private Long id;
    private String name;
    private String description;
    private Protocol protocol;
    private Boolean isActive;
    private Integer responseDelay;
}
