package com.stubmanager.repository;

import com.stubmanager.entity.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {
    List<Route> findByMockId(Long mockId);
    List<Route> findByIsActive(Boolean isActive);
}
