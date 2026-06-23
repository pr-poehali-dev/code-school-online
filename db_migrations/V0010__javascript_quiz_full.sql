INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Какой знак даёт остаток от деления?', '/|||%|||*|||#', 1 FROM lessons WHERE course_id='javascript' AND position=4;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Чему равно 6 * 2?', '8|||12|||62|||4', 1 FROM lessons WHERE course_id='javascript' AND position=4;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что проверяет ===?', 'Больше|||Точное равенство|||Не равно|||Сложение', 1 FROM lessons WHERE course_id='javascript' AND position=5;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Где пишется код условия if?', 'В круглых скобках|||В фигурных скобках|||В кавычках|||Без скобок', 1 FROM lessons WHERE course_id='javascript' AND position=5;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что делает i++ в цикле for?', 'Уменьшает i|||Увеличивает i на 1|||Удаляет i|||Ничего', 1 FROM lessons WHERE course_id='javascript' AND position=6;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Сколько частей в скобках цикла for?', 'Одна|||Две|||Три|||Четыре', 2 FROM lessons WHERE course_id='javascript' AND position=6;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Как добавить элемент в массив?', 'add()|||push()|||append()|||insert()', 1 FROM lessons WHERE course_id='javascript' AND position=7;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Как узнать длину массива?', 'arr.size|||arr.count|||arr.length|||len(arr)', 2 FROM lessons WHERE course_id='javascript' AND position=7;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Как получить свойство name объекта user?', 'user->name|||user.name|||user[name]|||name.user', 1 FROM lessons WHERE course_id='javascript' AND position=8;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'В каких скобках записывают объект?', 'Круглых|||Квадратных|||Фигурных|||Угловых', 2 FROM lessons WHERE course_id='javascript' AND position=8;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что реагирует на клик?', 'onClick()|||addEventListener|||clickHandler|||document.click', 1 FROM lessons WHERE course_id='javascript' AND position=9;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что находит элемент на странице?', 'document.querySelector|||document.find|||getElement|||search', 0 FROM lessons WHERE course_id='javascript' AND position=9;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Как выглядит стрелочная функция?', '(a) => a|||function a|||=> a|||a -> a', 0 FROM lessons WHERE course_id='javascript' AND position=10;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Какие кавычки у шаблонных строк?', 'Двойные|||Одинарные|||Обратные (backtick)|||Угловые', 2 FROM lessons WHERE course_id='javascript' AND position=10;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что делает map?', 'Фильтрует|||Преобразует каждый элемент|||Удаляет|||Сортирует', 1 FROM lessons WHERE course_id='javascript' AND position=11;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что делает filter?', 'Преобразует|||Отбирает подходящие|||Складывает|||Удваивает', 1 FROM lessons WHERE course_id='javascript' AND position=11;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что меняет текст элемента?', '.innerText только|||.textContent|||.value|||.change', 1 FROM lessons WHERE course_id='javascript' AND position=12;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что делает n++?', 'Удваивает n|||Увеличивает n на 1|||Обнуляет n|||Выводит n', 1 FROM lessons WHERE course_id='javascript' AND position=12;