package com.stubmanager.repository;

import com.stubmanager.entity.Condition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ConditionRepository extends JpaRepository<Condition, Long> {
    List<Condition> findByRouteIdOrderByPriorityDesc(Long routeId);
}
