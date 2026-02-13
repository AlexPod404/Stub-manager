package com.stubmanager.runtime.cache;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Component;

import java.time.Duration;

@Component
@RequiredArgsConstructor
public class CacheManager {
    
    private final RedisTemplate<String, Object> redisTemplate;
    
    public void cache(String key, Object value) {
        redisTemplate.opsForValue().set(key, value, Duration.ofHours(1));
    }
    
    public Object get(String key) {
        return redisTemplate.opsForValue().get(key);
    }
}
