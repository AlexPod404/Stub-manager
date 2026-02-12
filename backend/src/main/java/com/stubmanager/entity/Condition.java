package com.stubmanager.entity;

import com.stubmanager.model.ConditionType;
import com.stubmanager.model.ParameterSource;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "conditions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Condition {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "route_id", nullable = false)
    private Route route;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private ConditionType type;
    
    @Column(name = "parameter_name")
    private String parameterName;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "parameter_source", length = 50)
    private ParameterSource parameterSource;
    
    @Column(name = "parameter_path", length = 500)
    private String parameterPath;
    
    @Column(name = "expected_value", columnDefinition = "TEXT")
    private String expectedValue;
    
    @Column(nullable = false)
    private Integer priority = 0;
    
    @OneToOne(mappedBy = "condition", cascade = CascadeType.ALL, orphanRemoval = true)
    private Response response;
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
