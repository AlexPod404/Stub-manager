package com.stubmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RouteDTO {
    private Long id;
    private Long mockId;
    private String path;
    private String method;
    private Boolean isActive;
}
