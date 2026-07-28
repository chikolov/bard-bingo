-- 1. Daily Active Users (DAU) & Total Games Played
SELECT 
    DATE(start_time) AS game_date,
    COUNT(DISTINCT user_id) AS active_users,
    COUNT(game_id) AS total_games_initiated
FROM games
GROUP BY DATE(start_time)
ORDER BY game_date DESC;

-- 2. Tile Friction Analysis: Which squares take the longest or get interacted with last?
SELECT 
    t.tile_text,
    t.category,
    COUNT(e.event_id) AS total_interactions,
    AVG(t.difficulty_weight) as avg_weight
FROM event_logs e
JOIN bingo_tiles t ON e.tile_id = t.tile_id
WHERE e.action_type = 'click'
GROUP BY t.tile_text, t.category
ORDER BY total_interactions DESC;

-- 3. Game Completion Funnel Rate
SELECT 
    status,
    COUNT(game_id) AS session_count,
    ROUND(COUNT(game_id) * 100.0 / SUM(COUNT(game_id)) OVER(), 2) AS percentage
FROM games
GROUP BY status;