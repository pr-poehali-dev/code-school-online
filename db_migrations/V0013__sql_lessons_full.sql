INSERT INTO lessons (course_id, position, title, duration, video_url, content, intro, steps, software) VALUES
('sql', 3, 'Фильтрация WHERE', '13:00', 'https://www.youtube.com/embed/HXV3zeQKqGY',
'WHERE отбирает строки по условию. Операторы: = равно, > больше, < меньше, AND и, OR или.',
'Часто нужны не все данные, а только подходящие. WHERE — твой фильтр для точных запросов.',
'[
  {"title": "Открой тренажёр", "text": "Зайди на sqliteonline.com."},
  {"title": "Простой фильтр", "text": "Напиши: SELECT * FROM users WHERE age > 18; Покажутся только взрослые."},
  {"title": "Точное совпадение", "text": "Напиши: SELECT * FROM users WHERE name = ''Анна''; Только записи с именем Анна."},
  {"title": "Несколько условий", "text": "Напиши: SELECT * FROM users WHERE age > 18 AND age < 30; AND объединяет условия — оба должны выполниться."},
  {"title": "Условие ИЛИ", "text": "Напиши: SELECT * FROM users WHERE age < 18 OR age > 60; OR — выполнится хотя бы одно условие."}
]',
'[{"name": "SQLite Online", "desc": "Тренажёр SQL в браузере.", "url": "https://sqliteonline.com/", "install": "Открой ссылку — учебные таблицы готовы."}]'),

('sql', 4, 'Сортировка ORDER BY', '11:30', 'https://www.youtube.com/embed/HXV3zeQKqGY',
'ORDER BY сортирует результат. ASC — по возрастанию (по умолчанию), DESC — по убыванию.',
'Данные удобнее читать упорядоченными. Научимся сортировать результаты запросов.',
'[
  {"title": "Открой тренажёр", "text": "Зайди на sqliteonline.com."},
  {"title": "Сортировка по возрастанию", "text": "Напиши: SELECT * FROM users ORDER BY age; Записи выстроятся от младших к старшим."},
  {"title": "По убыванию", "text": "Напиши: SELECT * FROM users ORDER BY age DESC; Теперь от старших к младшим."},
  {"title": "Сортировка по имени", "text": "Напиши: SELECT * FROM users ORDER BY name; Имена выстроятся по алфавиту."},
  {"title": "Соедини с фильтром", "text": "Напиши: SELECT * FROM users WHERE age > 18 ORDER BY age DESC; Сначала фильтр, потом сортировка."}
]',
'[{"name": "SQLite Online", "desc": "Тренажёр SQL в браузере.", "url": "https://sqliteonline.com/", "install": "Открой ссылку — учебные таблицы готовы."}]'),

('sql', 5, 'Ограничение LIMIT', '09:30', 'https://www.youtube.com/embed/HXV3zeQKqGY',
'LIMIT ограничивает количество строк в результате. Полезно для топ-списков.',
'Иногда нужны только первые несколько записей. LIMIT покажет ровно столько, сколько попросишь.',
'[
  {"title": "Открой тренажёр", "text": "Зайди на sqliteonline.com."},
  {"title": "Ограничь вывод", "text": "Напиши: SELECT * FROM users LIMIT 3; Покажутся только первые 3 записи."},
  {"title": "Топ по возрасту", "text": "Напиши: SELECT * FROM users ORDER BY age DESC LIMIT 1; Покажет самого старшего."},
  {"title": "Топ-5", "text": "Поменяй на LIMIT 5; Покажутся первые 5 строк."},
  {"title": "Запомни порядок", "text": "LIMIT всегда пишется в самом конце запроса — после WHERE и ORDER BY."}
]',
'[{"name": "SQLite Online", "desc": "Тренажёр SQL в браузере.", "url": "https://sqliteonline.com/", "install": "Открой ссылку — учебные таблицы готовы."}]'),

('sql', 6, 'Добавление данных INSERT', '13:30', 'https://www.youtube.com/embed/HXV3zeQKqGY',
'INSERT INTO добавляет новую строку: INSERT INTO users (name, age) VALUES (''Пётр'', 28).',
'База данных не только хранит, но и принимает новые данные. Научимся добавлять записи.',
'[
  {"title": "Открой тренажёр", "text": "Зайди на sqliteonline.com."},
  {"title": "Создай учебную таблицу", "text": "Напиши: CREATE TABLE people (id INTEGER, name TEXT, age INTEGER); и нажми Run."},
  {"title": "Добавь запись", "text": "Напиши: INSERT INTO people (id, name, age) VALUES (1, ''Пётр'', 28);"},
  {"title": "Добавь ещё", "text": "Напиши: INSERT INTO people (id, name, age) VALUES (2, ''Мария'', 34);"},
  {"title": "Проверь результат", "text": "Напиши: SELECT * FROM people; Увидишь обе добавленные записи."}
]',
'[{"name": "SQLite Online", "desc": "Тренажёр SQL в браузере.", "url": "https://sqliteonline.com/", "install": "Открой ссылку — можно создавать свои таблицы."}]'),

('sql', 7, 'Изменение данных UPDATE', '12:00', 'https://www.youtube.com/embed/HXV3zeQKqGY',
'UPDATE меняет существующие строки: UPDATE users SET age = 30 WHERE name = ''Пётр''. WHERE обязателен!',
'Данные меняются: возраст растёт, адрес обновляется. UPDATE поможет изменить записи в базе.',
'[
  {"title": "Открой свою таблицу", "text": "Используй таблицу people из прошлого урока на sqliteonline.com."},
  {"title": "Измени одну запись", "text": "Напиши: UPDATE people SET age = 29 WHERE name = ''Пётр'';"},
  {"title": "Проверь изменение", "text": "Напиши: SELECT * FROM people WHERE name = ''Пётр''; Возраст обновился на 29."},
  {"title": "ВАЖНО про WHERE", "text": "Без WHERE команда изменит ВСЕ строки! Всегда указывай условие, кого именно менять."},
  {"title": "Измени несколько полей", "text": "Напиши: UPDATE people SET age = 35, name = ''Мария А.'' WHERE id = 2;"}
]',
'[{"name": "SQLite Online", "desc": "Тренажёр SQL в браузере.", "url": "https://sqliteonline.com/", "install": "Открой ссылку — всё готово."}]'),

('sql', 8, 'Подсчёт COUNT и агрегация', '14:00', 'https://www.youtube.com/embed/HXV3zeQKqGY',
'COUNT считает строки, SUM суммирует, AVG среднее, MAX максимум, MIN минимум.',
'База умеет считать сама: сколько записей, средний возраст, максимум. Это агрегатные функции.',
'[
  {"title": "Открой тренажёр", "text": "Зайди на sqliteonline.com с готовыми таблицами."},
  {"title": "Посчитай строки", "text": "Напиши: SELECT COUNT(*) FROM users; Узнаешь, сколько всего записей."},
  {"title": "Средний возраст", "text": "Напиши: SELECT AVG(age) FROM users; База посчитает среднее значение."},
  {"title": "Максимум и минимум", "text": "Напиши: SELECT MAX(age), MIN(age) FROM users; Покажет самого старшего и младшего."},
  {"title": "Сумма", "text": "Напиши: SELECT SUM(age) FROM users; Сложит все возрасты вместе."}
]',
'[{"name": "SQLite Online", "desc": "Тренажёр SQL в браузере.", "url": "https://sqliteonline.com/", "install": "Открой ссылку — всё готово."}]'),

('sql', 9, 'Группировка GROUP BY', '15:30', 'https://www.youtube.com/embed/HXV3zeQKqGY',
'GROUP BY группирует строки по значению. Вместе с COUNT показывает количество в каждой группе.',
'Чтобы узнать сколько людей в каждом городе, данные группируют. GROUP BY — мощный инструмент аналитики.',
'[
  {"title": "Открой тренажёр", "text": "Зайди на sqliteonline.com."},
  {"title": "Сгруппируй данные", "text": "Напиши: SELECT city, COUNT(*) FROM users GROUP BY city; Покажет количество людей по городам."},
  {"title": "Разбери результат", "text": "Каждая строка — это город и число людей в нём. База сама посчитала группы."},
  {"title": "Средний возраст по группам", "text": "Напиши: SELECT city, AVG(age) FROM users GROUP BY city;"},
  {"title": "Запомни принцип", "text": "GROUP BY объединяет одинаковые значения в группы, а агрегатные функции считают по каждой группе."}
]',
'[{"name": "SQLite Online", "desc": "Тренажёр SQL в браузере.", "url": "https://sqliteonline.com/", "install": "Открой ссылку — всё готово."}]'),

('sql', 10, 'Связи таблиц JOIN', '18:00', 'https://www.youtube.com/embed/HXV3zeQKqGY',
'JOIN соединяет данные из двух таблиц по общему полю. Например пользователи и их заказы.',
'Данные часто разбиты на несколько таблиц. JOIN склеивает их вместе — это сердце реляционных баз.',
'[
  {"title": "Представь две таблицы", "text": "users (id, name) и orders (user_id, product). У заказа есть user_id, указывающий на пользователя."},
  {"title": "Открой тренажёр", "text": "Зайди на sqliteonline.com — там есть связанные учебные таблицы."},
  {"title": "Соедини таблицы", "text": "Напиши: SELECT users.name, orders.product FROM users JOIN orders ON users.id = orders.user_id;"},
  {"title": "Разбери ON", "text": "ON указывает, по какому полю связывать: id пользователя совпадает с user_id заказа."},
  {"title": "Запомни главное", "text": "JOIN позволяет видеть имя человека и его заказ вместе, хотя они в разных таблицах."}
]',
'[{"name": "SQLite Online", "desc": "Тренажёр SQL со связанными таблицами.", "url": "https://sqliteonline.com/", "install": "Открой ссылку — учебные таблицы с связями готовы."}]'),

('sql', 11, 'Удаление строк', '10:30', 'https://www.youtube.com/embed/HXV3zeQKqGY',
'Команда удаления убирает строки по условию WHERE. Без условия она затрагивает всю таблицу, поэтому WHERE обязателен.',
'Иногда строки нужно убрать из таблицы. Команда удаления справится, но будь осторожен — действие необратимо.',
'[
  {"title": "Открой свою таблицу", "text": "Используй таблицу people на sqliteonline.com."},
  {"title": "Убери одну запись", "text": "Напиши команду удаления: укажи FROM people и условие WHERE id = 1; Запись с этим id будет убрана."},
  {"title": "Проверь результат", "text": "Напиши: SELECT * FROM people; Запись с id 1 исчезла."},
  {"title": "ГЛАВНОЕ ПРАВИЛО", "text": "Без условия WHERE команда затронет ВСЕ записи таблицы! Всегда указывай, что именно убрать."},
  {"title": "Безопасный приём", "text": "Перед удалением сделай SELECT с тем же условием WHERE — убедись, что выбраны нужные строки."}
]',
'[{"name": "SQLite Online", "desc": "Тренажёр SQL в браузере.", "url": "https://sqliteonline.com/", "install": "Открой ссылку — всё готово."}]'),

('sql', 12, 'Финальный проект: база магазина', '22:00', 'https://www.youtube.com/embed/HXV3zeQKqGY',
'Создадим таблицу товаров, наполним данными и напишем аналитические запросы: топ дорогих, средняя цена, фильтры.',
'Соберём всё в реальную задачу — базу интернет-магазина. Создашь таблицу, наполнишь и проанализируешь данные.',
'[
  {"title": "Создай таблицу товаров", "text": "На sqliteonline.com напиши: CREATE TABLE products (id INTEGER, name TEXT, price INTEGER, category TEXT);"},
  {"title": "Добавь товары", "text": "INSERT INTO products VALUES (1, ''Телефон'', 30000, ''Электроника''); и ещё пару разных товаров."},
  {"title": "Посмотри всё", "text": "Напиши: SELECT * FROM products; Убедись, что товары добавились."},
  {"title": "Найди дорогие", "text": "Напиши: SELECT * FROM products WHERE price > 10000 ORDER BY price DESC;"},
  {"title": "Посчитай среднюю цену", "text": "Напиши: SELECT AVG(price) FROM products;"},
  {"title": "Сгруппируй по категориям", "text": "Напиши: SELECT category, COUNT(*) FROM products GROUP BY category;"},
  {"title": "Поздравляем!", "text": "Ты создал и проанализировал настоящую базу данных магазина, используя все приёмы курса!"}
]',
'[{"name": "SQLite Online", "desc": "Тренажёр SQL для финального проекта.", "url": "https://sqliteonline.com/", "install": "Открой ссылку — можно создавать свои таблицы."}]');