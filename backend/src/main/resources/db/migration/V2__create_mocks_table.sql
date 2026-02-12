-- Create mocks table
CREATE TABLE mocks (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    protocol VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    response_delay INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_mocks_protocol ON mocks(protocol);
CREATE INDEX idx_mocks_is_active ON mocks(is_active);
