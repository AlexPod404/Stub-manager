package com.stubmanager.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScenarioDTO {
    private Long id;
    private String name;
    private String description;
    private List<ActionDTO> actions;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ActionDTO {
        private String actionType;
        private Long mockId;
        private Integer timeOffset;
        private Integer delayValue;
        private Integer sequenceOrder;
    }
}
