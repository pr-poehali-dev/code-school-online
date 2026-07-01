-- Интеграция расширения auth-email с существующей таблицей users
-- Добавляем недостающие колонки (существующие 7 пользователей сохраняются)

ALTER TABLE t_p80207328_code_school_online.users
    ADD COLUMN IF NOT EXISTS password_hash VARCHAR(72),
    ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT TRUE,
    ADD COLUMN IF NOT EXISTS failed_login_attempts INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS last_failed_login_at TIMESTAMP,
    ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMP,
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email_unique
    ON t_p80207328_code_school_online.users(email);

CREATE TABLE IF NOT EXISTS t_p80207328_code_school_online.refresh_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES t_p80207328_code_school_online.users(id),
    token_hash VARCHAR(64) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS t_p80207328_code_school_online.password_reset_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES t_p80207328_code_school_online.users(id),
    token_hash VARCHAR(64) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS t_p80207328_code_school_online.email_verification_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES t_p80207328_code_school_online.users(id),
    token_hash VARCHAR(64) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_refresh_tokens_hash ON t_p80207328_code_school_online.refresh_tokens(token_hash);
CREATE INDEX IF NOT EXISTS idx_password_reset_tokens_hash ON t_p80207328_code_school_online.password_reset_tokens(token_hash);
CREATE INDEX IF NOT EXISTS idx_email_verification_tokens_hash ON t_p80207328_code_school_online.email_verification_tokens(token_hash);