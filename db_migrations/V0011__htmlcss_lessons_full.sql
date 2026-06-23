INSERT INTO lessons (course_id, position, title, duration, video_url, content, intro, steps, software) VALUES
('html-css', 3, 'Списки и ссылки', '12:00', 'https://www.youtube.com/embed/ok-plXl9oik',
'Маркированный список <ul><li>, нумерованный <ol><li>. Ссылка <a href="адрес">текст</a>.',
'Любой сайт состоит из списков и ссылок. Научимся их создавать — это очень просто.',
'[
  {"title": "Открой редактор", "text": "Зайди на codepen.io/pen."},
  {"title": "Создай список", "text": "В HTML напиши: <ul><li>Молоко</li><li>Хлеб</li><li>Яблоки</li></ul>. ul — список, li — пункт."},
  {"title": "Сделай нумерованный", "text": "Замени ul на ol. Теперь пункты пронумеруются автоматически 1, 2, 3."},
  {"title": "Добавь ссылку", "text": "Напиши: <a href=\"https://google.com\">Перейти в Google</a>. href — адрес ссылки."},
  {"title": "Проверь", "text": "В превью кликни по ссылке — откроется сайт. Списки отобразятся с точками или цифрами."}
]',
'[{"name": "CodePen", "desc": "Редактор HTML/CSS.", "url": "https://codepen.io/pen", "install": "Открой ссылку — всё готово."}]'),

('html-css', 4, 'Картинки и изображения', '11:30', 'https://www.youtube.com/embed/ok-plXl9oik',
'Тег <img src="адрес" alt="описание"> вставляет картинку. src — путь, alt — текст если картинка не загрузилась.',
'Сайт без картинок скучный. Научимся вставлять изображения за пару шагов.',
'[
  {"title": "Открой редактор", "text": "Зайди на codepen.io/pen."},
  {"title": "Вставь картинку", "text": "В HTML напиши: <img src=\"https://picsum.photos/300\" alt=\"Случайное фото\">. picsum.photos даёт случайные изображения."},
  {"title": "Посмотри результат", "text": "В превью появится картинка размером 300 пикселей."},
  {"title": "Добавь alt-текст", "text": "alt описывает картинку для тех, кто её не видит. Это важно для доступности сайта."},
  {"title": "Поменяй размер через CSS", "text": "В CSS напиши: img { width: 150px; }. Картинка станет меньше."}
]',
'[{"name": "CodePen", "desc": "Редактор HTML/CSS.", "url": "https://codepen.io/pen", "install": "Открой ссылку — всё готово."}]'),

('html-css', 5, 'Цвета и фон', '13:00', 'https://www.youtube.com/embed/ok-plXl9oik',
'color меняет цвет текста, background-color — фон. Цвета задают словом (red), кодом (#ff0000) или rgb().',
'Цвет создаёт настроение сайта. Освоим все способы раскрашивания элементов.',
'[
  {"title": "Открой редактор", "text": "Зайди на codepen.io/pen. В HTML добавь <h1>Цветной заголовок</h1>."},
  {"title": "Цвет по названию", "text": "В CSS напиши: h1 { color: tomato; }. Заголовок станет оранжево-красным."},
  {"title": "Цвет по коду", "text": "Поменяй на color: #3498db;. Это синий — коды начинаются с решётки."},
  {"title": "Добавь фон", "text": "Допиши: background-color: #f1c40f;. Появится жёлтый фон у заголовка."},
  {"title": "Фон всей страницы", "text": "Напиши: body { background-color: #2c3e50; }. Вся страница станет тёмной."}
]',
'[{"name": "CodePen", "desc": "Редактор HTML/CSS.", "url": "https://codepen.io/pen", "install": "Открой ссылку — всё готово."}]'),

('html-css', 6, 'Отступы и размеры (box model)', '15:00', 'https://www.youtube.com/embed/ok-plXl9oik',
'padding — внутренний отступ, margin — внешний, border — рамка, width/height — размеры. Это блочная модель.',
'Каждый элемент — это коробка с отступами и рамкой. Понять box model — значит научиться расставлять всё по местам.',
'[
  {"title": "Создай блок", "text": "В HTML напиши: <div class=\"box\">Я блок</div>."},
  {"title": "Задай размеры", "text": "В CSS напиши: .box { width: 200px; height: 100px; background: lightblue; }."},
  {"title": "Добавь внутренний отступ", "text": "Допиши: padding: 20px;. Текст отодвинется от краёв блока внутри."},
  {"title": "Добавь рамку", "text": "Допиши: border: 3px solid navy;. Появится синяя рамка вокруг блока."},
  {"title": "Добавь внешний отступ", "text": "Допиши: margin: 30px;. Блок отодвинется от краёв страницы."}
]',
'[{"name": "CodePen", "desc": "Редактор HTML/CSS.", "url": "https://codepen.io/pen", "install": "Открой ссылку — всё готово."}]'),

('html-css', 7, 'Шрифты и текст', '12:30', 'https://www.youtube.com/embed/ok-plXl9oik',
'font-size — размер, font-weight — жирность, text-align — выравнивание, font-family — шрифт.',
'Красивый текст — половина успеха сайта. Научимся управлять шрифтами и оформлением.',
'[
  {"title": "Создай текст", "text": "В HTML напиши: <p>Это мой текст для оформления</p>."},
  {"title": "Размер шрифта", "text": "В CSS: p { font-size: 24px; }. Текст станет крупнее."},
  {"title": "Жирность", "text": "Допиши: font-weight: bold;. Текст станет жирным."},
  {"title": "Выравнивание", "text": "Допиши: text-align: center;. Текст встанет по центру."},
  {"title": "Смени шрифт", "text": "Допиши: font-family: Arial, sans-serif;. Изменится начертание букв."}
]',
'[{"name": "CodePen", "desc": "Редактор HTML/CSS.", "url": "https://codepen.io/pen", "install": "Открой ссылку — всё готово."}]'),

('html-css', 8, 'Flexbox: выравнивание элементов', '17:00', 'https://www.youtube.com/embed/ok-plXl9oik',
'display: flex выстраивает элементы в ряд. justify-content выравнивает по горизонтали, align-items по вертикали.',
'Flexbox — главный инструмент современной вёрстки. С ним легко расположить блоки рядом и по центру.',
'[
  {"title": "Создай контейнер", "text": "В HTML: <div class=\"row\"><div>1</div><div>2</div><div>3</div></div>."},
  {"title": "Включи flex", "text": "В CSS: .row { display: flex; }. Три блока встанут в ряд."},
  {"title": "Добавь промежутки", "text": "Допиши: gap: 20px;. Между блоками появятся отступы."},
  {"title": "Выровняй по центру", "text": "Допиши: justify-content: center;. Блоки сгруппируются по центру."},
  {"title": "Раздвинь по краям", "text": "Поменяй на justify-content: space-between;. Блоки разъедутся по краям."}
]',
'[{"name": "CodePen", "desc": "Редактор HTML/CSS.", "url": "https://codepen.io/pen", "install": "Открой ссылку — всё готово."}]'),

('html-css', 9, 'Кнопки и наведение мыши', '13:30', 'https://www.youtube.com/embed/ok-plXl9oik',
'Псевдокласс :hover задаёт стиль при наведении. transition делает плавный переход.',
'Кнопки должны реагировать на мышь. Сделаем стильную кнопку, которая меняется при наведении.',
'[
  {"title": "Создай кнопку", "text": "В HTML: <button>Нажми меня</button>."},
  {"title": "Оформи кнопку", "text": "В CSS: button { padding: 12px 24px; background: #3498db; color: white; border: none; border-radius: 8px; }."},
  {"title": "Добавь реакцию на наведение", "text": "Допиши: button:hover { background: #2980b9; }. Наведи мышь — цвет изменится."},
  {"title": "Сделай плавность", "text": "В правило button добавь: transition: 0.3s;. Теперь цвет меняется плавно."},
  {"title": "Добавь курсор", "text": "В button добавь: cursor: pointer;. Курсор станет рукой при наведении."}
]',
'[{"name": "CodePen", "desc": "Редактор HTML/CSS.", "url": "https://codepen.io/pen", "install": "Открой ссылку — всё готово."}]'),

('html-css', 10, 'Адаптивность под телефоны', '16:00', 'https://www.youtube.com/embed/ok-plXl9oik',
'Медиа-запросы @media меняют стили для разных экранов. Так сайт хорошо выглядит и на телефоне, и на компьютере.',
'Половина людей заходят с телефона. Научимся делать сайт, который подстраивается под любой экран.',
'[
  {"title": "Создай блок", "text": "В HTML: <div class=\"card\">Карточка</div>. В CSS: .card { width: 600px; background: lightgreen; padding: 20px; }."},
  {"title": "Добавь медиа-запрос", "text": "Напиши: @media (max-width: 600px) { .card { width: 100%; } }. Это сработает на узких экранах."},
  {"title": "Проверь", "text": "Сузь окно превью или браузера — блок станет на всю ширину."},
  {"title": "Поменяй цвет на мобильном", "text": "Внутрь медиа-запроса добавь: background: salmon;. На узком экране карточка покраснеет."},
  {"title": "Запомни принцип", "text": "Медиа-запросы — основа адаптивного дизайна. Один сайт красиво работает везде."}
]',
'[{"name": "CodePen", "desc": "Редактор HTML/CSS.", "url": "https://codepen.io/pen", "install": "Открой ссылку — всё готово. Сужай окно для проверки адаптивности."}]'),

('html-css', 11, 'Тени и скругления', '11:00', 'https://www.youtube.com/embed/ok-plXl9oik',
'border-radius скругляет углы, box-shadow добавляет тень. Это делает дизайн современным и объёмным.',
'Тени и скругления превращают плоские блоки в красивые карточки. Добавим немного магии дизайна.',
'[
  {"title": "Создай карточку", "text": "В HTML: <div class=\"card\">Красивая карточка</div>. В CSS: .card { width: 250px; padding: 30px; background: white; }."},
  {"title": "Скругли углы", "text": "Допиши: border-radius: 16px;. Углы станут мягкими."},
  {"title": "Добавь тень", "text": "Допиши: box-shadow: 0 8px 20px rgba(0,0,0,0.15);. Карточка приподнимется над фоном."},
  {"title": "Сделай фон страницы", "text": "В body: background: #ecf0f1;. На сером фоне тень видна лучше."},
  {"title": "Поэкспериментируй", "text": "Меняй числа в box-shadow и border-radius, наблюдай за изменениями."}
]',
'[{"name": "CodePen", "desc": "Редактор HTML/CSS.", "url": "https://codepen.io/pen", "install": "Открой ссылку — всё готово."}]'),

('html-css', 12, 'Финальный проект: визитка-страница', '20:00', 'https://www.youtube.com/embed/ok-plXl9oik',
'Соберём всё: структура HTML, цвета, flexbox, тени, скругления и кнопка с наведением в одну красивую страницу-визитку.',
'Время сделать настоящую страницу! Соберём личную визитку со всем, что изучили. Это твоё первое портфолио-творение.',
'[
  {"title": "Создай структуру", "text": "В HTML: <div class=\"card\"><h1>Алекс Кодов</h1><p>Начинающий разработчик</p><button>Связаться</button></div>."},
  {"title": "Оформи карточку", "text": "В CSS: .card { width: 300px; padding: 40px; background: white; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center; }."},
  {"title": "Центрируй на странице", "text": "В body: { display: flex; justify-content: center; align-items: center; height: 100vh; background: #6c5ce7; }."},
  {"title": "Стилизуй заголовок", "text": "Добавь: h1 { color: #2d3436; font-size: 28px; }."},
  {"title": "Оформи кнопку", "text": "Добавь: button { padding: 12px 28px; background: #6c5ce7; color: white; border: none; border-radius: 10px; cursor: pointer; transition: 0.3s; }."},
  {"title": "Добавь наведение", "text": "Добавь: button:hover { background: #5641e0; }."},
  {"title": "Поздравляем!", "text": "Ты собрал красивую адаптивную визитку с нуля, используя все приёмы курса. Это готовый кусочек портфолио!"}
]',
'[{"name": "CodePen", "desc": "Редактор HTML/CSS для финального проекта.", "url": "https://codepen.io/pen", "install": "Открой ссылку — всё готово."}]');