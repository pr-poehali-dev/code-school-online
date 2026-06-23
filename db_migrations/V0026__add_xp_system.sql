-- Баланс XP пользователя (может быть отрицательным)
ALTER TABLE users ADD COLUMN IF NOT EXISTS xp INTEGER NOT NULL DEFAULT 0;

-- Учёт уже начисленных наград, чтобы не давать XP повторно.
-- reward_key уникален в рамках пользователя: 'lesson:{id}', 'quiz:{lessonId}:{questionIdx}', 'exam:{courseId}'
CREATE TABLE IF NOT EXISTS xp_rewards (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    reward_key VARCHAR(100) NOT NULL,
    amount INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, reward_key)
);
CREATE INDEX IF NOT EXISTS idx_xp_rewards_user ON xp_rewards(user_id);