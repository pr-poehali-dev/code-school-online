-- Уроки внутри курсов
CREATE TABLE IF NOT EXISTS lessons (
    id SERIAL PRIMARY KEY,
    course_id VARCHAR(50) NOT NULL REFERENCES courses(id),
    position INTEGER NOT NULL DEFAULT 0,
    title VARCHAR(255) NOT NULL,
    duration VARCHAR(10) NOT NULL DEFAULT '10:00',
    video_url VARCHAR(500) NOT NULL DEFAULT '',
    content TEXT NOT NULL DEFAULT ''
);
CREATE INDEX IF NOT EXISTS idx_lessons_course ON lessons(course_id);

-- Вопросы теста к уроку
CREATE TABLE IF NOT EXISTS quiz_questions (
    id SERIAL PRIMARY KEY,
    lesson_id INTEGER NOT NULL REFERENCES lessons(id),
    position INTEGER NOT NULL DEFAULT 0,
    question TEXT NOT NULL,
    options TEXT NOT NULL,
    correct INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_quiz_lesson ON quiz_questions(lesson_id);

-- ===== PYTHON =====
INSERT INTO lessons (course_id, position, title, duration, video_url, content) VALUES
('python', 1, 'Введение: как устроен код', '08:24', 'https://www.youtube.com/embed/_uQrJ0TkZlc',
'Программа — это набор инструкций, которые компьютер выполняет шаг за шагом. Python читает код сверху вниз, строка за строкой.

Первая программа классически выводит приветствие:

print("Привет, мир!")

Функция print() показывает текст на экране. Текст в кавычках называется строкой. Запусти код — и увидишь результат в консоли. Поздравляем, ты только что написал свою первую программу!'),
('python', 2, 'Переменные и типы данных', '12:10', 'https://www.youtube.com/embed/_uQrJ0TkZlc',
'Переменная — это контейнер для хранения данных. В Python создать её просто:

name = "Алекс"
age = 25
height = 1.75

Здесь name — строка (str), age — целое число (int), height — дробное число (float). Тип определяется автоматически. Переменную можно менять в любой момент, просто присвоив новое значение.'),
('python', 3, 'Условия и логика', '15:40', 'https://www.youtube.com/embed/_uQrJ0TkZlc',
'Условия позволяют программе принимать решения. Используем if, elif и else:

age = 18
if age >= 18:
    print("Доступ разрешён")
else:
    print("Доступ запрещён")

Отступы (4 пробела) обязательны — они показывают, какой код относится к условию. Сравнения: == равно, != не равно, > больше, < меньше.');

-- ===== JAVASCRIPT =====
INSERT INTO lessons (course_id, position, title, duration, video_url, content) VALUES
('javascript', 1, 'Что такое JavaScript', '09:15', 'https://www.youtube.com/embed/W6NZfCO5SIk',
'JavaScript — язык, который оживляет веб-страницы. С его помощью кнопки реагируют на клики, появляются всплывающие окна и обновляется контент без перезагрузки.

Вывести сообщение можно так:

console.log("Привет из JavaScript!");

console.log() выводит текст в консоль браузера (открой её клавишей F12). Это главный инструмент разработчика для проверки кода.'),
('javascript', 2, 'Переменные: let и const', '11:30', 'https://www.youtube.com/embed/W6NZfCO5SIk',
'В JavaScript переменные объявляют через let (можно менять) и const (нельзя менять):

let score = 0;
score = 10;

const name = "Анна";

Используй const по умолчанию, а let — только когда значение должно меняться. Это делает код надёжнее и понятнее.'),
('javascript', 3, 'Функции', '14:20', 'https://www.youtube.com/embed/W6NZfCO5SIk',
'Функция — это переиспользуемый блок кода. Объявляем и вызываем:

function greet(name) {
  return "Привет, " + name + "!";
}

console.log(greet("Мир"));

name — это параметр, значение передаётся при вызове. return возвращает результат. Функции помогают не повторять один и тот же код.');

-- ===== HTML/CSS =====
INSERT INTO lessons (course_id, position, title, duration, video_url, content) VALUES
('html-css', 1, 'Структура HTML-страницы', '10:05', 'https://www.youtube.com/embed/ok-plXl9oik',
'HTML описывает структуру страницы с помощью тегов. Базовый каркас:

<!DOCTYPE html>
<html>
  <head><title>Моя страница</title></head>
  <body>
    <h1>Заголовок</h1>
    <p>Абзац текста</p>
  </body>
</html>

Тег <h1> — главный заголовок, <p> — параграф. Теги обычно парные: открывающий и закрывающий со слешем.'),
('html-css', 2, 'Основы CSS', '13:40', 'https://www.youtube.com/embed/ok-plXl9oik',
'CSS отвечает за внешний вид. Стиль задаётся по селектору и свойствам:

h1 {
  color: blue;
  font-size: 32px;
}

Здесь h1 — селектор (что стилизуем), color и font-size — свойства. CSS можно подключить в теге <style> или отдельном файле.');

-- ===== SQL =====
INSERT INTO lessons (course_id, position, title, duration, video_url, content) VALUES
('sql', 1, 'Что такое база данных', '08:50', 'https://www.youtube.com/embed/HXV3zeQKqGY',
'База данных — это организованное хранилище информации в виде таблиц. Таблица состоит из строк (записей) и столбцов (полей).

Например таблица users:
id | name  | age
1  | Анна  | 25
2  | Иван  | 30

SQL — язык, на котором мы запрашиваем и изменяем данные в таблицах.'),
('sql', 2, 'Запрос SELECT', '12:15', 'https://www.youtube.com/embed/HXV3zeQKqGY',
'SELECT достаёт данные из таблицы:

SELECT name, age FROM users WHERE age > 18;

SELECT перечисляет нужные столбцы, FROM — из какой таблицы, WHERE — условие фильтрации. Чтобы выбрать все столбцы, используй звёздочку: SELECT * FROM users;');

-- ===== ВОПРОСЫ ТЕСТОВ =====
-- Python урок 1
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Какая функция выводит текст на экран?', 'show()|||print()|||echo()|||display()', 1 FROM lessons WHERE course_id='python' AND position=1;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Как Python выполняет код?', 'Случайно|||Снизу вверх|||Сверху вниз построчно|||Сразу весь', 2 FROM lessons WHERE course_id='python' AND position=1;
-- Python урок 2
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Как создать переменную в Python?', 'var x = 5|||x = 5|||int x = 5|||let x = 5', 1 FROM lessons WHERE course_id='python' AND position=2;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Какой тип у значения 1.75?', 'int|||str|||float|||bool', 2 FROM lessons WHERE course_id='python' AND position=2;
-- Python урок 3
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Какой оператор означает "равно"?', '=|||==|||!=|||=>', 1 FROM lessons WHERE course_id='python' AND position=3;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Сколько пробелов в стандартном отступе?', '2|||4|||1|||8', 1 FROM lessons WHERE course_id='python' AND position=3;

-- JS урок 1
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Чем занимается JavaScript на странице?', 'Хранит файлы|||Оживляет и добавляет интерактив|||Рисует базы данных|||Ничем', 1 FROM lessons WHERE course_id='javascript' AND position=1;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что выводит текст в консоль?', 'print()|||console.log()|||echo()|||log.console()', 1 FROM lessons WHERE course_id='javascript' AND position=1;
-- JS урок 2
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Какое ключевое слово для неизменяемой переменной?', 'let|||var|||const|||static', 2 FROM lessons WHERE course_id='javascript' AND position=2;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что использовать по умолчанию?', 'let|||const|||var|||function', 1 FROM lessons WHERE course_id='javascript' AND position=2;
-- JS урок 3
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что возвращает результат из функции?', 'give|||output|||return|||send', 2 FROM lessons WHERE course_id='javascript' AND position=3;

-- HTML урок 1
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Какой тег для главного заголовка?', '<head>|||<h1>|||<title>|||<header>', 1 FROM lessons WHERE course_id='html-css' AND position=1;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Какой тег для абзаца текста?', '<p>|||<text>|||<a>|||<span>', 0 FROM lessons WHERE course_id='html-css' AND position=1;
-- HTML урок 2
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Какое свойство меняет цвет текста?', 'background|||color|||font|||text-color', 1 FROM lessons WHERE course_id='html-css' AND position=2;

-- SQL урок 1
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Из чего состоит таблица?', 'Из файлов|||Из строк и столбцов|||Из тегов|||Из функций', 1 FROM lessons WHERE course_id='sql' AND position=1;
-- SQL урок 2
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Какая команда достаёт данные?', 'GET|||SELECT|||FETCH|||SHOW', 1 FROM lessons WHERE course_id='sql' AND position=2;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что фильтрует строки в запросе?', 'FROM|||WHERE|||SELECT|||ORDER', 1 FROM lessons WHERE course_id='sql' AND position=2;