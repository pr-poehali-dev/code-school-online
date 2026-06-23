INSERT INTO lessons (course_id, position, title, duration, video_url, content, intro, steps, software) VALUES
('javascript', 4, 'Числа и математика', '13:00', 'https://www.youtube.com/embed/W6NZfCO5SIk',
'JavaScript умеет складывать (+), вычитать (-), умножать (*), делить (/) и брать остаток (%).',
'Любая программа считает. Разберём, как JavaScript работает с числами и арифметикой.',
'[
  {"title": "Открой песочницу", "text": "Зайди на playcode.io/javascript."},
  {"title": "Сложи числа", "text": "Напиши: console.log(5 + 3); Увидишь 8."},
  {"title": "Попробуй другие действия", "text": "Напиши console.log(10 - 4), console.log(6 * 2), console.log(8 / 2). Получишь 6, 12, 4."},
  {"title": "Остаток от деления", "text": "Напиши console.log(10 % 3). Знак % даёт остаток — увидишь 1."},
  {"title": "Считай с переменными", "text": "Напиши: let price = 100; let count = 3; console.log(price * count). Увидишь 300."}
]',
'[{"name": "PlayCode", "desc": "Онлайн-среда для JavaScript.", "url": "https://playcode.io/javascript", "install": "Открой ссылку — всё готово."}]'),

('javascript', 5, 'Условия if/else', '15:00', 'https://www.youtube.com/embed/W6NZfCO5SIk',
'if проверяет условие, else выполняется иначе. Сравнения: === равно, !== не равно, > больше, < меньше.',
'Программа должна принимать решения. Научим JavaScript выбирать действие в зависимости от условий.',
'[
  {"title": "Заведи переменную", "text": "Напиши: let age = 20;"},
  {"title": "Добавь условие", "text": "Напиши: if (age >= 18) { console.log(\"Взрослый\"); }. Условие в круглых скобках, код в фигурных."},
  {"title": "Добавь else", "text": "После закрывающей скобки напиши: else { console.log(\"Ребёнок\"); }"},
  {"title": "Проверь оба варианта", "text": "Запусти — увидишь Взрослый. Поменяй age на 10 и запусти снова."},
  {"title": "Используй ===", "text": "Напиши: if (age === 10) { console.log(\"Ровно 10\"); }. Тройное равно проверяет точное равенство."}
]',
'[{"name": "PlayCode", "desc": "Онлайн-среда для JavaScript.", "url": "https://playcode.io/javascript", "install": "Открой ссылку — всё готово."}]'),

('javascript', 6, 'Циклы for и while', '16:00', 'https://www.youtube.com/embed/W6NZfCO5SIk',
'Цикл for повторяет код заданное число раз. Конструкция: for (let i = 0; i < 5; i++).',
'Чтобы не писать одно и то же много раз, используют циклы. Разберём главный цикл JavaScript — for.',
'[
  {"title": "Открой песочницу", "text": "Зайди на playcode.io/javascript."},
  {"title": "Напиши цикл for", "text": "Напиши: for (let i = 0; i < 5; i++) { console.log(i); }. Внутри скобок: старт, условие, шаг."},
  {"title": "Посмотри результат", "text": "Запусти — увидишь числа от 0 до 4."},
  {"title": "Повтори текст", "text": "Замени тело цикла на console.log(\"Привет\"). Слово появится 5 раз."},
  {"title": "Цикл while", "text": "Напиши: let n = 0; while (n < 3) { console.log(n); n++; }. Цикл идёт, пока условие истинно."}
]',
'[{"name": "PlayCode", "desc": "Онлайн-среда для JavaScript.", "url": "https://playcode.io/javascript", "install": "Открой ссылку — всё готово."}]'),

('javascript', 7, 'Массивы', '17:00', 'https://www.youtube.com/embed/W6NZfCO5SIk',
'Массив хранит список значений: let arr = [1, 2, 3]. Доступ по индексу arr[0], добавление arr.push(4), длина arr.length.',
'Массив — это список значений в одной переменной. Незаменимая вещь для хранения множества данных.',
'[
  {"title": "Создай массив", "text": "Напиши: let fruits = [\"яблоко\", \"банан\", \"вишня\"];"},
  {"title": "Выведи элемент", "text": "Напиши console.log(fruits[0]). Индексы с нуля — увидишь яблоко."},
  {"title": "Добавь элемент", "text": "Напиши: fruits.push(\"груша\"); console.log(fruits). Груша добавится в конец."},
  {"title": "Узнай длину", "text": "Напиши console.log(fruits.length). Покажет количество элементов."},
  {"title": "Перебери массив", "text": "Напиши: for (let f of fruits) { console.log(f); }. Каждый фрукт на своей строке."}
]',
'[{"name": "PlayCode", "desc": "Онлайн-среда для JavaScript.", "url": "https://playcode.io/javascript", "install": "Открой ссылку — всё готово."}]'),

('javascript', 8, 'Объекты', '16:30', 'https://www.youtube.com/embed/W6NZfCO5SIk',
'Объект хранит свойства: let user = {name: "Алекс", age: 25}. Доступ через точку: user.name.',
'Объект группирует связанные данные с понятными названиями. Это основа всего современного JavaScript.',
'[
  {"title": "Создай объект", "text": "Напиши: let user = { name: \"Алекс\", age: 25 };"},
  {"title": "Получи свойство", "text": "Напиши console.log(user.name). Через точку — увидишь Алекс."},
  {"title": "Измени свойство", "text": "Напиши: user.age = 26; console.log(user.age). Увидишь 26."},
  {"title": "Добавь свойство", "text": "Напиши: user.city = \"Москва\"; console.log(user). Новое свойство добавится."},
  {"title": "Объект со всем сразу", "text": "Напиши console.log(user.name + \" из \" + user.city). Соберёшь данные в одну фразу."}
]',
'[{"name": "PlayCode", "desc": "Онлайн-среда для JavaScript.", "url": "https://playcode.io/javascript", "install": "Открой ссылку — всё готово."}]'),

('javascript', 9, 'Кнопки и события на странице', '18:00', 'https://www.youtube.com/embed/W6NZfCO5SIk',
'addEventListener реагирует на клики. document.querySelector находит элемент на странице.',
'Самое интересное — оживить страницу! Сделаем кнопку, которая реагирует на нажатие.',
'[
  {"title": "Создай страницу", "text": "Зайди на codepen.io/pen. В поле HTML напиши: <button id=\"btn\">Нажми меня</button>"},
  {"title": "Найди кнопку в JS", "text": "В поле JS напиши: let btn = document.querySelector(\"#btn\"); Это находит кнопку по её id."},
  {"title": "Добавь реакцию на клик", "text": "Напиши: btn.addEventListener(\"click\", function() { alert(\"Привет!\"); });"},
  {"title": "Проверь", "text": "Нажми на кнопку в превью — появится всплывающее окно с приветствием!"},
  {"title": "Поменяй текст", "text": "Замени alert на console.log(\"Клик!\") и смотри в консоль при каждом нажатии."}
]',
'[
  {"name": "CodePen", "desc": "Редактор HTML+CSS+JS с предпросмотром — нужен для работы с кнопками.", "url": "https://codepen.io/pen", "install": "Открой ссылку — поля HTML, CSS и JS уже на экране."}
]'),

('javascript', 10, 'Функции-стрелки и современный синтаксис', '14:00', 'https://www.youtube.com/embed/W6NZfCO5SIk',
'Стрелочные функции — короткая запись: const add = (a, b) => a + b. Шаблонные строки используют обратные кавычки.',
'Современный JavaScript пишут компактно. Освоим стрелочные функции и удобные шаблонные строки.',
'[
  {"title": "Обычная функция", "text": "Напиши: function add(a, b) { return a + b; } console.log(add(2, 3));"},
  {"title": "Перепиши стрелкой", "text": "Напиши: const add2 = (a, b) => a + b; console.log(add2(2, 3)). Короче и то же самое!"},
  {"title": "Шаблонные строки", "text": "Напиши: let name = \"Алекс\"; console.log(`Привет, ${name}!`). Обратные кавычки и ${} для вставки переменных."},
  {"title": "Соедини всё", "text": "Напиши: const greet = name => `Здравствуй, ${name}`; console.log(greet(\"Мир\"))."},
  {"title": "Сравни подходы", "text": "Запусти обе версии функций — результат одинаковый, но стрелочная запись современнее."}
]',
'[{"name": "PlayCode", "desc": "Онлайн-среда для JavaScript.", "url": "https://playcode.io/javascript", "install": "Открой ссылку — всё готово."}]'),

('javascript', 11, 'Перебор массивов: map и filter', '15:30', 'https://www.youtube.com/embed/W6NZfCO5SIk',
'map преобразует каждый элемент массива, filter отбирает подходящие. Это основа обработки данных.',
'Профессионалы редко пишут циклы вручную — используют map и filter. Это магия обработки списков.',
'[
  {"title": "Создай массив чисел", "text": "Напиши: let nums = [1, 2, 3, 4];"},
  {"title": "Удвой каждое число", "text": "Напиши: let doubled = nums.map(n => n * 2); console.log(doubled). Увидишь [2, 4, 6, 8]."},
  {"title": "Отфильтруй большие", "text": "Напиши: let big = nums.filter(n => n > 2); console.log(big). Останутся [3, 4]."},
  {"title": "Работай с текстом", "text": "Напиши: let names = [\"анна\", \"иван\"]; let caps = names.map(n => n.toUpperCase()); console.log(caps)."},
  {"title": "Объедини", "text": "Напиши: console.log(nums.filter(n => n > 1).map(n => n * 10)). Сначала фильтр, потом преобразование."}
]',
'[{"name": "PlayCode", "desc": "Онлайн-среда для JavaScript.", "url": "https://playcode.io/javascript", "install": "Открой ссылку — всё готово."}]'),

('javascript', 12, 'Финальный проект: счётчик кликов', '20:00', 'https://www.youtube.com/embed/W6NZfCO5SIk',
'Соберём интерактивную страницу: кнопка увеличивает число на экране при каждом клике.',
'Время для настоящего проекта! Сделаем интерактивный счётчик: нажимаешь кнопку — число растёт. Это твоя первая живая страница.',
'[
  {"title": "Создай разметку", "text": "Зайди на codepen.io/pen. В HTML напиши: <h1 id=\"count\">0</h1> <button id=\"btn\">Клик</button>"},
  {"title": "Найди элементы", "text": "В JS: let count = document.querySelector(\"#count\"); let btn = document.querySelector(\"#btn\");"},
  {"title": "Заведи счётчик", "text": "Напиши: let n = 0; Это переменная для подсчёта кликов."},
  {"title": "Добавь обработчик", "text": "Напиши: btn.addEventListener(\"click\", () => { n++; count.textContent = n; });"},
  {"title": "Проверь работу", "text": "Нажимай кнопку в превью — число на экране увеличивается с каждым кликом!"},
  {"title": "Улучши проект", "text": "Добавь в CSS: h1 { color: green; font-size: 60px; }. Сделай счётчик красивым."},
  {"title": "Поздравляем!", "text": "Ты создал интерактивную веб-страницу с нуля. Это фундамент любого современного сайта."}
]',
'[
  {"name": "CodePen", "desc": "Редактор HTML+CSS+JS для финального проекта.", "url": "https://codepen.io/pen", "install": "Открой ссылку — все три поля уже на экране."}
]');