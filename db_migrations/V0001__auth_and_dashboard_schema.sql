-- Пользователи
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL DEFAULT 'Ученик',
    avatar VARCHAR(500) DEFAULT '',
    balance INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Коды подтверждения для входа по email
CREATE TABLE IF NOT EXISTS login_codes (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    code VARCHAR(6) NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    used BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_login_codes_email ON login_codes(email);

-- Сессии (токены)
CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    token VARCHAR(64) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);

-- Каталог курсов
CREATE TABLE IF NOT EXISTS courses (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    lang VARCHAR(100) NOT NULL,
    icon VARCHAR(20) NOT NULL DEFAULT '',
    color VARCHAR(50) NOT NULL DEFAULT '152 90% 52%',
    level VARCHAR(50) NOT NULL DEFAULT '',
    lessons INTEGER NOT NULL DEFAULT 0,
    hours INTEGER NOT NULL DEFAULT 0,
    price INTEGER NOT NULL DEFAULT 0,
    description TEXT NOT NULL DEFAULT '',
    tags TEXT NOT NULL DEFAULT '',
    category VARCHAR(50) NOT NULL DEFAULT 'general'
);

-- Покупки курсов
CREATE TABLE IF NOT EXISTS purchases (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    course_id VARCHAR(50) NOT NULL REFERENCES courses(id),
    price INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, course_id)
);

-- Прогресс по курсам
CREATE TABLE IF NOT EXISTS progress (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    course_id VARCHAR(50) NOT NULL REFERENCES courses(id),
    completed_lessons INTEGER NOT NULL DEFAULT 0,
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, course_id)
);

-- Начальный каталог курсов
INSERT INTO courses (id, title, lang, icon, color, level, lessons, hours, price, description, tags, category) VALUES
('python', 'Python с нуля', 'Python', '🐍', '152 90% 52%', 'Начальный', 24, 18, 1490, 'Самый дружелюбный язык для старта. Переменные, циклы, функции и первый проект.', 'Основы,Бэкенд,Автоматизация', 'backend'),
('javascript', 'JavaScript для веба', 'JavaScript', '⚡', '48 95% 60%', 'Начальный', 28, 22, 1790, 'Оживи сайты: DOM, события, анимации и интерактив прямо в браузере.', 'Фронтенд,Веб,Интерактив', 'frontend'),
('html-css', 'HTML & CSS вёрстка', 'HTML/CSS', '🎨', '265 85% 65%', 'Базовый', 18, 12, 990, 'Создай свою первую красивую страницу с нуля. Flexbox, Grid и адаптив.', 'Вёрстка,Дизайн,Веб', 'frontend'),
('sql', 'Базы данных и SQL', 'SQL', '🗄️', '195 90% 55%', 'Базовый', 16, 14, 1290, 'Научись хранить и доставать данные. SELECT, JOIN и реальные запросы.', 'Данные,Бэкенд,Аналитика', 'backend'),
('react', 'React для начинающих', 'React', '⚛️', '190 95% 55%', 'Средний', 26, 20, 2290, 'Собери современное приложение на самой популярной библиотеке.', 'Фронтенд,Веб,Интерактив', 'frontend'),
('git', 'Git и командная работа', 'Git', '🌿', '20 90% 60%', 'Базовый', 12, 8, 790, 'Контроль версий, ветки и совместная разработка в команде.', 'Инструменты,Основы', 'tools')
ON CONFLICT (id) DO NOTHING;