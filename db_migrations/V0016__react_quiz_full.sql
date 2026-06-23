INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что такое React?', 'Язык программирования|||Библиотека для интерфейсов|||База данных|||Браузер', 1 FROM lessons WHERE course_id='react' AND position=1;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Из чего React собирает страницу?', 'Из файлов|||Из компонентов|||Из таблиц|||Из картинок', 1 FROM lessons WHERE course_id='react' AND position=1;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что такое JSX?', 'Новый язык|||HTML внутри JavaScript|||Стиль CSS|||База данных', 1 FROM lessons WHERE course_id='react' AND position=2;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Как вставить переменную в JSX?', 'В кавычках|||В фигурных скобках|||В круглых|||Через $', 1 FROM lessons WHERE course_id='react' AND position=2;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'С какой буквы пишут имя компонента?', 'С маленькой|||С большой|||С цифры|||Без разницы', 1 FROM lessons WHERE course_id='react' AND position=3;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Как вставить компонент Welcome?', 'Welcome()|||<Welcome />|||{Welcome}|||call Welcome', 1 FROM lessons WHERE course_id='react' AND position=3;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что такое props?', 'Стили|||Параметры компонента|||События|||Состояние', 1 FROM lessons WHERE course_id='react' AND position=4;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Как передать props title?', 'Card.title|||<Card title=\"...\" />|||props(title)|||Card[title]', 1 FROM lessons WHERE course_id='react' AND position=4;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что хранит useState?', 'Стили|||Меняющиеся данные|||HTML|||Импорты', 1 FROM lessons WHERE course_id='react' AND position=5;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что делает setCount?', 'Удаляет count|||Меняет значение состояния|||Выводит count|||Ничего', 1 FROM lessons WHERE course_id='react' AND position=5;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что реагирует на клик в React?', 'onPress|||onClick|||onTap|||click', 1 FROM lessons WHERE course_id='react' AND position=6;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что отслеживает ввод в поле?', 'onClick|||onChange|||onType|||onInput только', 1 FROM lessons WHERE course_id='react' AND position=6;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Каким методом рисуют списки?', 'forEach|||map|||filter|||loop', 1 FROM lessons WHERE course_id='react' AND position=7;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Зачем нужен key в списке?', 'Для цвета|||Уникальная метка элемента|||Для размера|||Не нужен', 1 FROM lessons WHERE course_id='react' AND position=7;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Чем показывают элемент по условию?', 'if в JSX|||Тернарный оператор ?:|||switch|||for', 1 FROM lessons WHERE course_id='react' AND position=8;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что делает isLogged && <p>?', 'Всегда показывает|||Показывает если isLogged истинно|||Скрывает|||Ошибка', 1 FROM lessons WHERE course_id='react' AND position=8;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Чем связывают поле со состоянием?', 'value и onChange|||src и alt|||href|||key', 0 FROM lessons WHERE course_id='react' AND position=9;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Как называется поле, связанное с состоянием?', 'Свободное|||Управляемый компонент|||Статичное|||Пустое', 1 FROM lessons WHERE course_id='react' AND position=9;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Когда срабатывает useEffect с пустым []?', 'Постоянно|||Один раз при загрузке|||Никогда|||При клике', 1 FROM lessons WHERE course_id='react' AND position=10;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что в массиве зависимостей useEffect?', 'Стили|||За чем следить|||Импорты|||Цвета', 1 FROM lessons WHERE course_id='react' AND position=10;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Какой атрибут вместо class в React?', 'class|||className|||cssClass|||styleClass', 1 FROM lessons WHERE course_id='react' AND position=11;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Как задать инлайн-стиль?', 'style=\"...\"|||style={{...}}|||css={...}|||class={...}', 1 FROM lessons WHERE course_id='react' AND position=11;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что добавляет элемент в массив состояния?', 'list.push|||setList([...list, task])|||list.add|||append', 1 FROM lessons WHERE course_id='react' AND position=12;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Как узнать количество задач?', 'list.count|||list.length|||list.size|||count(list)', 1 FROM lessons WHERE course_id='react' AND position=12;