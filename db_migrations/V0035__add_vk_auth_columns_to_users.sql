-- Поддержка входа через ВКонтакте (VK ID)
ALTER TABLE t_p80207328_code_school_online.users
    ADD COLUMN IF NOT EXISTS vk_id VARCHAR(50),
    ADD COLUMN IF NOT EXISTS avatar_url TEXT;

CREATE INDEX IF NOT EXISTS idx_users_vk_id
    ON t_p80207328_code_school_online.users(vk_id);