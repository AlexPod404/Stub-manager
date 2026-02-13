package com.stub.manager.repository;

import com.stub.manager.entity.Mock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

/**
 * Repository для Mock entities
 */
@Repository
public interface MockRepository extends JpaRepository<Mock, UUID> {
    
    Optional<Mock> findByName(String name);
    
    boolean existsByName(String name);
}
