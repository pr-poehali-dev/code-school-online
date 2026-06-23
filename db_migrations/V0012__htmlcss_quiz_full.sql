INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Какой тег для маркированного списка?', '<ol>|||<ul>|||<list>|||<li>', 1 FROM lessons WHERE course_id='html-css' AND position=3;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Какой атрибут задаёт адрес ссылки?', 'src|||href|||link|||url', 1 FROM lessons WHERE course_id='html-css' AND position=3;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Какой тег вставляет картинку?', '<picture>|||<img>|||<image>|||<src>', 1 FROM lessons WHERE course_id='html-css' AND position=4;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Для чего нужен атрибут alt?', 'Размер|||Описание картинки|||Цвет|||Ссылка', 1 FROM lessons WHERE course_id='html-css' AND position=4;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что меняет цвет фона?', 'color|||background-color|||fill|||bg', 1 FROM lessons WHERE course_id='html-css' AND position=5;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'С чего начинается код цвета?', 'С $|||С #|||С %|||С &', 1 FROM lessons WHERE course_id='html-css' AND position=5;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что такое padding?', 'Внешний отступ|||Внутренний отступ|||Рамка|||Цвет', 1 FROM lessons WHERE course_id='html-css' AND position=6;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что задаёт рамку?', 'margin|||padding|||border|||outline', 2 FROM lessons WHERE course_id='html-css' AND position=6;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что делает font-weight: bold?', 'Меняет размер|||Делает жирным|||Меняет цвет|||Выравнивает', 1 FROM lessons WHERE course_id='html-css' AND position=7;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что центрирует текст?', 'text-align: center|||align: middle|||center: true|||position: center', 0 FROM lessons WHERE course_id='html-css' AND position=7;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что включает flexbox?', 'display: block|||display: flex|||flex: on|||layout: flex', 1 FROM lessons WHERE course_id='html-css' AND position=8;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что выравнивает по горизонтали во flex?', 'align-items|||justify-content|||text-align|||float', 1 FROM lessons WHERE course_id='html-css' AND position=8;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Какой псевдокласс срабатывает при наведении?', ':click|||:hover|||:over|||:mouse', 1 FROM lessons WHERE course_id='html-css' AND position=9;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что делает плавный переход?', 'animation|||transition|||smooth|||ease', 1 FROM lessons WHERE course_id='html-css' AND position=9;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что меняет стили для разных экранов?', '@screen|||@media|||@device|||@responsive', 1 FROM lessons WHERE course_id='html-css' AND position=10;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Зачем нужна адаптивность?', 'Для скорости|||Чтобы сайт работал на телефонах|||Для цвета|||Не нужна', 1 FROM lessons WHERE course_id='html-css' AND position=10;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что скругляет углы?', 'border-round|||border-radius|||corner|||radius', 1 FROM lessons WHERE course_id='html-css' AND position=11;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что добавляет тень?', 'shadow|||box-shadow|||text-shadow только|||drop', 1 FROM lessons WHERE course_id='html-css' AND position=11;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Чем центрируют блок на странице?', 'text-align|||flexbox с justify и align|||margin: 0|||float', 1 FROM lessons WHERE course_id='html-css' AND position=12;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что делает 100vh у body?', 'Ширина 100|||Высота во весь экран|||Отступ|||Цвет', 1 FROM lessons WHERE course_id='html-css' AND position=12;