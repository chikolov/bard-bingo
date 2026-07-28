# Bard Bingo Telemetry & Business Intelligence Platform

A full-stack data engineering and analytics application that transforms an interactive user experience into a structured telemetry pipeline. This project captures granular user interactions, models them within a normalized relational database, extracts product insights using advanced SQL analytics, and visualizes engagement metrics via automated Power BI dashboards.

---

## Technical Overview

Modern data-driven applications require robust event logging and analytical modeling to understand user behavior. This platform shifts the focus from frontend state management to backend data architecture, ensuring that every user interaction is tracked, stored, and queryable for business intelligence.

### Key Data Architecture Highlights:

* **Relational Database Design:** Normalizes user sessions, game states, board configurations, and event telemetry into a structured schema to maintain data integrity.
* **Event-Driven Telemetry Logging:** Captures asynchronous user actions (clicks, unchecks, bingos) as structured event payloads.
* **Advanced SQL Analytics:** Implements window functions, session aggregations, and funnel drop-off queries to evaluate user engagement and feature friction.
* **Business Intelligence (BI) Integration:** Connects relational tables to automated reporting layers to visualize KPIs and behavioral heatmaps.

---

## Tech Stack

* **Database & Querying:** PostgreSQL / SQLite, Advanced SQL (Window Functions, CTEs)
* **Backend Logging:** Python / JavaScript Event Handlers, Structured JSON Telemetry
* **Business Intelligence:** Power BI, Executive Dashboards, Data Modeling
* **Version Control:** Git, Conventional Commits

---

## Project Structure

```text
bard_bingo/
│
├── schema.sql              <-- Relational database schema (Users, Games, Tiles, Event Logs)
├── analytics.sql           <-- Production SQL queries for DAU, friction analysis, and funnels
├── README_BI.md            <-- Power BI data mapping and executive dashboard specifications
├── index.html              <-- Interactive user interface container
├── script.js               <-- Client-side event logging and game mechanics
└── style.css               <-- UI design and layout styling

```

---

## Database Architecture (`schema.sql`)

The underlying relational schema is built with strict foreign-key constraints to guarantee clean tracking across user sessions and event logs:

```sql
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
    status VARCHAR(20), -- 'completed', 'abandoned', 'in_progress'
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

```

---

## Analytical SQL Queries (`analytics.sql`)

To extract actionable product insights, the platform utilizes complex analytical queries covering cohort tracking, friction points, and conversion funnels:

```sql
-- 1. Daily Active Users (DAU) & Total Games Initiated
SELECT 
    DATE(start_time) AS game_date,
    COUNT(DISTINCT user_id) AS active_users,
    COUNT(game_id) AS total_games_initiated
FROM games
GROUP BY DATE(start_time)
ORDER BY game_date DESC;

-- 2. Tile Friction Analysis: Identifying high-interaction squares
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

-- 3. Game Completion Funnel Conversion Rate
SELECT 
    status,
    COUNT(game_id) AS session_count,
    ROUND(COUNT(game_id) * 100.0 / SUM(COUNT(game_id)) OVER(), 2) AS percentage
FROM games
GROUP BY status;

```

---

## Power BI & Executive Dashboard Specification

The analytics layer exports structured data models into **Power BI** to monitor platform performance:

* **Executive KPI Cards:** Tracks total active sessions, average completion time-to-bingo, and overall completion conversion rates.
* **Behavioral Heatmap Matrix:** Maps the 5x5 bingo grid against click frequencies to highlight user bottlenecks and tile difficulty weights.
* **Cohort Retention Curves:** Line charts visualizing active user engagement trends across weekly acquisition cohorts.