-- PYTHON EXAM
INSERT INTO exam_questions (course_id, position, question, options, correct) VALUES
('python', 1, 'Какая функция выводит текст на экран?', 'show()|||print()|||echo()|||display()', 1),
('python', 2, 'Как создать переменную?', 'var x = 5|||x = 5|||int x = 5|||let x = 5', 1),
('python', 3, 'Какой оператор означает "равно" в условии?', '=|||==|||!=|||=>', 1),
('python', 4, 'Что выведет range(3)?', '1,2,3|||0,1,2|||3|||ничего', 1),
('python', 5, 'Как обратиться к первому элементу списка?', 'list[1]|||list[0]|||list.first|||list(0)', 1),
('python', 6, 'Какое слово создаёт функцию?', 'function|||def|||func|||define', 1),
('python', 7, 'Как хранятся данные в словаре?', 'По номерам|||Пары ключ-значение|||В строку|||Случайно', 1),
('python', 8, 'Какой блок ловит ошибки?', 'catch|||try/except|||error|||if/else', 1);

-- JAVASCRIPT EXAM
INSERT INTO exam_questions (course_id, position, question, options, correct) VALUES
('javascript', 1, 'Что выводит текст в консоль?', 'print()|||console.log()|||echo()|||log()', 1),
('javascript', 2, 'Какое слово для неизменяемой переменной?', 'let|||var|||const|||static', 2),
('javascript', 3, 'Что возвращает результат из функции?', 'give|||output|||return|||send', 2),
('javascript', 4, 'Что проверяет ===?', 'Больше|||Точное равенство|||Не равно|||Сложение', 1),
('javascript', 5, 'Как добавить элемент в массив?', 'add()|||push()|||append()|||insert()', 1),
('javascript', 6, 'Как получить свойство name объекта?', 'user->name|||user.name|||user(name)|||name.user', 1),
('javascript', 7, 'Что реагирует на клик?', 'onClick()|||addEventListener|||clickHandler|||click', 1),
('javascript', 8, 'Что делает map?', 'Фильтрует|||Преобразует каждый элемент|||Удаляет|||Сортирует', 1);

-- HTML/CSS EXAM
INSERT INTO exam_questions (course_id, position, question, options, correct) VALUES
('html-css', 1, 'Какой тег для главного заголовка?', '<head>|||<h1>|||<title>|||<header>', 1),
('html-css', 2, 'Какое свойство меняет цвет текста?', 'background|||color|||font|||text-color', 1),
('html-css', 3, 'Какой тег для маркированного списка?', '<ol>|||<ul>|||<list>|||<li>', 1),
('html-css', 4, 'Какой тег вставляет картинку?', '<picture>|||<img>|||<image>|||<src>', 1),
('html-css', 5, 'Что такое padding?', 'Внешний отступ|||Внутренний отступ|||Рамка|||Цвет', 1),
('html-css', 6, 'Что включает flexbox?', 'display: block|||display: flex|||flex: on|||layout', 1),
('html-css', 7, 'Какой псевдокласс срабатывает при наведении?', ':click|||:hover|||:over|||:mouse', 1),
('html-css', 8, 'Что меняет стили для разных экранов?', '@screen|||@media|||@device|||@responsive', 1);

-- SQL EXAM
INSERT INTO exam_questions (course_id, position, question, options, correct) VALUES
('sql', 1, 'Какая команда достаёт данные?', 'GET|||SELECT|||FETCH|||SHOW', 1),
('sql', 2, 'Что фильтрует строки?', 'FROM|||WHERE|||SELECT|||ORDER', 1),
('sql', 3, 'Что сортирует результат?', 'SORT BY|||ORDER BY|||GROUP BY|||FILTER', 1),
('sql', 4, 'Что ограничивает число строк?', 'MAX|||LIMIT|||TOP|||COUNT', 1),
('sql', 5, 'Что добавляет новую строку?', 'ADD|||INSERT INTO|||CREATE|||NEW', 1),
('sql', 6, 'Что считает количество строк?', 'SUM|||COUNT|||AVG|||MAX', 1),
('sql', 7, 'Что группирует строки?', 'ORDER BY|||GROUP BY|||SORT|||JOIN', 1),
('sql', 8, 'Что соединяет две таблицы?', 'MERGE|||JOIN|||LINK|||CONNECT', 1);

-- REACT EXAM
INSERT INTO exam_questions (course_id, position, question, options, correct) VALUES
('react', 1, 'Что такое React?', 'Язык|||Библиотека для интерфейсов|||База данных|||Браузер', 1),
('react', 2, 'Что такое JSX?', 'Новый язык|||HTML внутри JavaScript|||Стиль CSS|||База', 1),
('react', 3, 'С какой буквы пишут имя компонента?', 'С маленькой|||С большой|||С цифры|||Без разницы', 1),
('react', 4, 'Что такое props?', 'Стили|||Параметры компонента|||События|||Состояние', 1),
('react', 5, 'Что хранит useState?', 'Стили|||Меняющиеся данные|||HTML|||Импорты', 1),
('react', 6, 'Каким методом рисуют списки?', 'forEach|||map|||filter|||loop', 1),
('react', 7, 'Какой атрибут вместо class?', 'class|||className|||cssClass|||styleClass', 1),
('react', 8, 'Когда срабатывает useEffect с []?', 'Постоянно|||Один раз при загрузке|||Никогда|||При клике', 1);

-- GIT EXAM
INSERT INTO exam_questions (course_id, position, question, options, correct) VALUES
('git', 1, 'Что такое Git?', 'Язык|||Система контроля версий|||Браузер|||Редактор', 1),
('git', 2, 'Какая команда создаёт репозиторий?', 'git start|||git init|||git new|||git create', 1),
('git', 3, 'Что делает git add?', 'Стирает|||Подготавливает к сохранению|||Создаёт ветку|||Отправляет', 1),
('git', 4, 'Что сохраняет версию проекта?', 'git save|||git commit|||git add|||git push', 1),
('git', 5, 'Что показывает git log?', 'Файлы|||Историю коммитов|||Ветки|||Статус', 1),
('git', 6, 'Что объединяет ветки?', 'git branch|||git merge|||git add|||git push', 1),
('git', 7, 'Что отправляет код на GitHub?', 'git send|||git push|||git upload|||git commit', 1),
('git', 8, 'Что скачивает чужой репозиторий?', 'git download|||git clone|||git get|||git copy', 1);