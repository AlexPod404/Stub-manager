package com.stubmanager.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.Cache;
import org.springframework.cache.CacheManager;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class DeadCacheService {
    
    private final CacheManager cacheManager;
    private final Map<String, LocalDateTime> cacheTimestamps = new HashMap<>();
    private static final Duration CACHE_TTL = Duration.ofHours(1);
    
    public void warmCache() {
        log.info("Warming dead cache for 1-hour offline operation");
        cacheTimestamps.put("mocks", LocalDateTime.now());
    }
    
    public boolean isCacheValid(String cacheName) {
        LocalDateTime timestamp = cacheTimestamps.get(cacheName);
        if (timestamp == null) {
            return false;
        }
        return Duration.between(timestamp, LocalDateTime.now()).compareTo(CACHE_TTL) < 0;
    }
    
    public void clearExpiredCache() {
        cacheTimestamps.entrySet().removeIf(entry -> 
            Duration.between(entry.getValue(), LocalDateTime.now()).compareTo(CACHE_TTL) >= 0
        );
    }
}
