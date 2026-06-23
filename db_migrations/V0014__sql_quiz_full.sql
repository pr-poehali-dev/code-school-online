INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что делает WHERE?', 'Сортирует|||Фильтрует строки|||Удаляет|||Считает', 1 FROM lessons WHERE course_id='sql' AND position=3;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что объединяет несколько условий?', 'PLUS|||AND|||WITH|||JOIN', 1 FROM lessons WHERE course_id='sql' AND position=3;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что сортирует результат?', 'SORT BY|||ORDER BY|||GROUP BY|||FILTER', 1 FROM lessons WHERE course_id='sql' AND position=4;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что значит DESC?', 'По возрастанию|||По убыванию|||Случайно|||По алфавиту', 1 FROM lessons WHERE course_id='sql' AND position=4;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что ограничивает число строк?', 'MAX|||LIMIT|||TOP|||COUNT', 1 FROM lessons WHERE course_id='sql' AND position=5;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Где пишется LIMIT?', 'В начале|||В конце запроса|||После SELECT|||Где угодно', 1 FROM lessons WHERE course_id='sql' AND position=5;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что добавляет новую строку?', 'ADD|||INSERT INTO|||CREATE|||NEW', 1 FROM lessons WHERE course_id='sql' AND position=6;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Какое слово идёт перед значениями?', 'DATA|||VALUES|||SET|||ROW', 1 FROM lessons WHERE course_id='sql' AND position=6;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что меняет существующие данные?', 'CHANGE|||UPDATE|||EDIT|||MODIFY', 1 FROM lessons WHERE course_id='sql' AND position=7;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что обязательно при изменении одной записи?', 'ORDER BY|||WHERE|||LIMIT|||GROUP', 1 FROM lessons WHERE course_id='sql' AND position=7;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что считает количество строк?', 'SUM|||COUNT|||AVG|||MAX', 1 FROM lessons WHERE course_id='sql' AND position=8;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что находит среднее значение?', 'MID|||AVG|||MEAN|||SUM', 1 FROM lessons WHERE course_id='sql' AND position=8;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что группирует строки?', 'ORDER BY|||GROUP BY|||SORT|||JOIN', 1 FROM lessons WHERE course_id='sql' AND position=9;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'С чем часто используют GROUP BY?', 'С WHERE|||С COUNT|||С LIMIT|||С DESC', 1 FROM lessons WHERE course_id='sql' AND position=9;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что соединяет две таблицы?', 'MERGE|||JOIN|||LINK|||CONNECT', 1 FROM lessons WHERE course_id='sql' AND position=10;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что указывает поле для связи?', 'BY|||ON|||WITH|||AT', 1 FROM lessons WHERE course_id='sql' AND position=10;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что обязательно при удалении строки?', 'ORDER BY|||WHERE|||LIMIT|||SET', 1 FROM lessons WHERE course_id='sql' AND position=11;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что будет без условия WHERE при удалении?', 'Ничего|||Затронет все строки|||Ошибка|||Удалит одну', 1 FROM lessons WHERE course_id='sql' AND position=11;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что создаёт новую таблицу?', 'NEW TABLE|||CREATE TABLE|||MAKE TABLE|||ADD TABLE', 1 FROM lessons WHERE course_id='sql' AND position=12;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Как посчитать товары по категориям?', 'GROUP BY category с COUNT|||ORDER BY|||LIMIT|||WHERE', 0 FROM lessons WHERE course_id='sql' AND position=12;