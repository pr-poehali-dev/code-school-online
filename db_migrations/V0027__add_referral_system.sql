-- Реферальный код у каждого пользователя
ALTER TABLE users ADD COLUMN IF NOT EXISTS ref_code VARCHAR(12) DEFAULT '';
-- Кто пригласил данного пользователя (id реферера)
ALTER TABLE users ADD COLUMN IF NOT EXISTS referred_by INTEGER;
-- Была ли уже выдана реферальная награда за этого пользователя (за первую покупку)
ALTER TABLE users ADD COLUMN IF NOT EXISTS ref_rewarded BOOLEAN NOT NULL DEFAULT FALSE;

-- Генерируем реф-коды для уже существующих пользователей
UPDATE users SET ref_code = UPPER(SUBSTRING(MD5(id::text || email) FROM 1 FOR 8))
WHERE ref_code = '' OR ref_code IS NULL;

CREATE INDEX IF NOT EXISTS idx_users_ref_code ON users(ref_code);