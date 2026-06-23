INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что выведет range(3)?', 'Числа 1,2,3|||Числа 0,1,2|||Число 3|||Ничего', 1 FROM lessons WHERE course_id='python' AND position=4;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Пока какое условие работает цикл while?', 'Пока ложно|||Всегда|||Пока истинно|||Один раз', 2 FROM lessons WHERE course_id='python' AND position=4;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Как обратиться к первому элементу списка?', 'list[1]|||list[0]|||list.first|||list(0)', 1 FROM lessons WHERE course_id='python' AND position=5;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Какой метод добавляет элемент в список?', 'add()|||push()|||append()|||insert()', 2 FROM lessons WHERE course_id='python' AND position=5;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Какое слово создаёт функцию?', 'function|||def|||func|||define', 1 FROM lessons WHERE course_id='python' AND position=6;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что возвращает результат из функции?', 'print|||give|||return|||back', 2 FROM lessons WHERE course_id='python' AND position=6;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Как хранятся данные в словаре?', 'По номерам|||Пары ключ-значение|||В строку|||Случайно', 1 FROM lessons WHERE course_id='python' AND position=7;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Как получить значение по ключу name?', 'dict.name|||dict(name)|||dict[\"name\"]|||dict->name', 2 FROM lessons WHERE course_id='python' AND position=7;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Какая функция запрашивает данные у пользователя?', 'get()|||input()|||ask()|||read()', 1 FROM lessons WHERE course_id='python' AND position=8;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что делает int(input())?', 'Выводит число|||Превращает ввод в число|||Удаляет ввод|||Ничего', 1 FROM lessons WHERE course_id='python' AND position=8;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что делает .upper()?', 'Считает длину|||Делает текст заглавным|||Удаляет текст|||Меняет цвет', 1 FROM lessons WHERE course_id='python' AND position=9;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Как узнать длину строки?', 'size()|||count()|||len()|||length()', 2 FROM lessons WHERE course_id='python' AND position=9;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Какой блок ловит ошибки?', 'catch|||try/except|||error|||if/else', 1 FROM lessons WHERE course_id='python' AND position=10;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что пишут в блоке except?', 'Опасный код|||Что делать при ошибке|||Импорты|||Комментарии', 1 FROM lessons WHERE course_id='python' AND position=10;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Как подключить готовый модуль?', 'include|||import|||use|||add', 1 FROM lessons WHERE course_id='python' AND position=11;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Какой модуль даёт случайные числа?', 'math|||random|||time|||os', 1 FROM lessons WHERE course_id='python' AND position=11;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что делает break в цикле?', 'Пропускает шаг|||Прерывает цикл|||Перезапускает|||Ничего', 1 FROM lessons WHERE course_id='python' AND position=12;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Чем загадывают число в игре?', 'input()|||random.randint()|||print()|||len()', 1 FROM lessons WHERE course_id='python' AND position=12;