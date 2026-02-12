package com.stubmanager.repository;

import com.stubmanager.entity.Mock;
import com.stubmanager.model.Protocol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MockRepository extends JpaRepository<Mock, Long> {
    List<Mock> findByProtocol(Protocol protocol);
    List<Mock> findByIsActive(Boolean isActive);
}
