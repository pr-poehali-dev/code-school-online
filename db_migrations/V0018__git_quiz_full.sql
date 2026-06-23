INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что такое Git?', 'Язык программирования|||Система контроля версий|||Браузер|||Редактор', 1 FROM lessons WHERE course_id='git' AND position=1;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что хранит Git?', 'Только файлы|||Историю изменений|||Картинки|||Пароли', 1 FROM lessons WHERE course_id='git' AND position=1;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Чем проверить версию Git?', 'git -v только|||git --version|||git check|||git info', 1 FROM lessons WHERE course_id='git' AND position=2;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что настраивают командой git config?', 'Цвет|||Имя и почту|||Пароль|||Шрифт', 1 FROM lessons WHERE course_id='git' AND position=2;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Какая команда создаёт репозиторий?', 'git start|||git init|||git new|||git create', 1 FROM lessons WHERE course_id='git' AND position=3;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что показывает git status?', 'Историю|||Текущее состояние|||Версию|||Ветки', 1 FROM lessons WHERE course_id='git' AND position=3;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что делает git add?', 'Стирает файл|||Подготавливает к сохранению|||Создаёт ветку|||Отправляет код', 1 FROM lessons WHERE course_id='git' AND position=4;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что добавляет git add . ?', 'Один файл|||Все изменения|||Ничего|||Папку .git', 1 FROM lessons WHERE course_id='git' AND position=4;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что сохраняет версию проекта?', 'git save|||git commit|||git add|||git push', 1 FROM lessons WHERE course_id='git' AND position=5;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что делает флаг -m?', 'Стирает|||Добавляет описание коммита|||Создаёт ветку|||Меняет имя', 1 FROM lessons WHERE course_id='git' AND position=5;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что показывает git log?', 'Файлы|||Историю коммитов|||Ветки|||Статус', 1 FROM lessons WHERE course_id='git' AND position=6;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что даёт git log --oneline?', 'Подробный вид|||Коммит в одну строку|||Стирание|||Ветки', 1 FROM lessons WHERE course_id='git' AND position=6;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что такое ветка в Git?', 'Файл|||Параллельная версия проекта|||Коммит|||Папка', 1 FROM lessons WHERE course_id='git' AND position=7;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что переключает ветки?', 'git switch только|||git checkout|||git branch|||git move', 1 FROM lessons WHERE course_id='git' AND position=7;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что делает git merge?', 'Создаёт ветку|||Объединяет ветки|||Стирает|||Отправляет', 1 FROM lessons WHERE course_id='git' AND position=8;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Куда обычно сливают готовую функцию?', 'В feature|||В основную ветку main|||Никуда|||В архив', 1 FROM lessons WHERE course_id='git' AND position=8;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что такое GitHub?', 'Язык|||Сайт для хранения репозиториев|||Команда|||Редактор', 1 FROM lessons WHERE course_id='git' AND position=9;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Зачем нужен GitHub?', 'Для игр|||Хранение кода и командная работа|||Для фото|||Для музыки', 1 FROM lessons WHERE course_id='git' AND position=9;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что отправляет код на GitHub?', 'git send|||git push|||git upload|||git commit', 1 FROM lessons WHERE course_id='git' AND position=10;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что связывает с удалённым репозиторием?', 'git link|||git remote add|||git connect|||git bind', 1 FROM lessons WHERE course_id='git' AND position=10;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'Что скачивает чужой репозиторий?', 'git download|||git clone|||git get|||git copy', 1 FROM lessons WHERE course_id='git' AND position=11;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Что забирает свежие изменения?', 'git push|||git pull|||git fetch только|||git update', 1 FROM lessons WHERE course_id='git' AND position=11;

INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 1, 'С чего начинается работа с Git в папке?', 'git push|||git init|||git clone|||git add', 1 FROM lessons WHERE course_id='git' AND position=12;
INSERT INTO quiz_questions (lesson_id, position, question, options, correct)
SELECT id, 2, 'Какой полный цикл работы?', 'add-commit-push|||только commit|||только push|||init-stop', 0 FROM lessons WHERE course_id='git' AND position=12;