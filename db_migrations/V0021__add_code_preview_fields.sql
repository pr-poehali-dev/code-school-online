-- Пример кода для интерактивного предпросмотра в уроке
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS code_lang VARCHAR(20) NOT NULL DEFAULT '';
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS code_sample TEXT NOT NULL DEFAULT '';
ALTER TABLE lessons ADD COLUMN IF NOT EXISTS code_output TEXT NOT NULL DEFAULT '';