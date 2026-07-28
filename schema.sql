-- Bard Bingo Telemetry & Analytics Database Schema

CREATE TABLE users (
    user_id VARCHAR(64) PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cohort_date DATE
);

CREATE TABLE games (
    game_id VARCHAR(64) PRIMARY KEY,
    user_id VARCHAR(64),
    start_time TIMESTAMP,
    end_time TIMESTAMP,
    status VARCHAR(20) -- 'completed', 'abandoned', 'in_progress'
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE bingo_tiles (
    tile_id INT PRIMARY KEY,
    category VARCHAR(50),
    tile_text TEXT,
    difficulty_weight FLOAT
);

CREATE TABLE event_logs (
    event_id SERIAL PRIMARY KEY,
    game_id VARCHAR(64),
    tile_id INT,
    action_type VARCHAR(30), -- 'click', 'uncheck', 'bingo_achieved'
    event_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (game_id) REFERENCES games(game_id),
    FOREIGN KEY (tile_id) REFERENCES bingo_tiles(tile_id)
);