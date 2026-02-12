-- Create scenarios and test results tables
CREATE TABLE scenarios (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE scenario_actions (
    id BIGSERIAL PRIMARY KEY,
    scenario_id BIGINT REFERENCES scenarios(id) ON DELETE CASCADE,
    action_type VARCHAR(50) NOT NULL,
    mock_id BIGINT REFERENCES mocks(id),
    time_offset INTEGER,
    delay_value INTEGER,
    sequence_order INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_scenario_actions_scenario_id ON scenario_actions(scenario_id);
CREATE INDEX idx_scenario_actions_sequence_order ON scenario_actions(sequence_order);

CREATE TABLE test_results (
    id BIGSERIAL PRIMARY KEY,
    scenario_id BIGINT REFERENCES scenarios(id),
    execution_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50),
    metrics JSONB,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_test_results_scenario_id ON test_results(scenario_id);
CREATE INDEX idx_test_results_status ON test_results(status);
