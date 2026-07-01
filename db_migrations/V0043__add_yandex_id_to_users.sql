ALTER TABLE t_p80207328_code_school_online.users ADD COLUMN IF NOT EXISTS yandex_id VARCHAR(50);
CREATE INDEX IF NOT EXISTS idx_users_yandex_id ON t_p80207328_code_school_online.users(yandex_id);