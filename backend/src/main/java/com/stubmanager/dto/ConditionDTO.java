package com.stubmanager.dto;

import com.stubmanager.model.ConditionType;
import com.stubmanager.model.ParameterSource;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConditionDTO {
    private Long id;
    private Long routeId;
    private ConditionType type;
    private String parameterName;
    private ParameterSource parameterSource;
    private String parameterPath;
    private String expectedValue;
    private Integer priority;
    private ResponseDTO response;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ResponseDTO {
        private Integer statusCode;
        private String body;
        private String headers;
        private Integer responseDelay;
    }
}
