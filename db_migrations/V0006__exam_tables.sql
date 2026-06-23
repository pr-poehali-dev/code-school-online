-- Вопросы финального экзамена по курсу
CREATE TABLE IF NOT EXISTS exam_questions (
    id SERIAL PRIMARY KEY,
    course_id VARCHAR(50) NOT NULL REFERENCES courses(id),
    position INTEGER NOT NULL DEFAULT 0,
    question TEXT NOT NULL,
    options TEXT NOT NULL,
    correct INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_exam_course ON exam_questions(course_id);

-- Результаты экзаменов учеников
CREATE TABLE IF NOT EXISTS exam_results (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    course_id VARCHAR(50) NOT NULL REFERENCES courses(id),
    score INTEGER NOT NULL DEFAULT 0,
    total INTEGER NOT NULL DEFAULT 0,
    percent INTEGER NOT NULL DEFAULT 0,
    passed BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, course_id)
);