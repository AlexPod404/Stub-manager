-- Create routes and conditions tables
CREATE TABLE routes (
    id BIGSERIAL PRIMARY KEY,
    mock_id BIGINT REFERENCES mocks(id) ON DELETE CASCADE,
    path VARCHAR(500) NOT NULL,
    method VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_routes_mock_id ON routes(mock_id);
CREATE INDEX idx_routes_is_active ON routes(is_active);

CREATE TABLE conditions (
    id BIGSERIAL PRIMARY KEY,
    route_id BIGINT REFERENCES routes(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL,
    parameter_name VARCHAR(255),
    parameter_source VARCHAR(50),
    parameter_path VARCHAR(500),
    expected_value TEXT,
    priority INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_conditions_route_id ON conditions(route_id);
CREATE INDEX idx_conditions_priority ON conditions(priority);

CREATE TABLE responses (
    id BIGSERIAL PRIMARY KEY,
    condition_id BIGINT REFERENCES conditions(id) ON DELETE CASCADE,
    status_code INTEGER DEFAULT 200,
    body TEXT,
    headers JSONB,
    response_delay INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_responses_condition_id ON responses(condition_id);
