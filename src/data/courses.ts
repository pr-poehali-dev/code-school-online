export interface Course {
  id: string;
  title: string;
  lang: string;
  icon: string;
  color: string;
  level: string;
  lessons: number;
  hours: number;
  price: number;
  desc: string;
  tags: string[];
  tier: 'starter' | 'base' | 'pro';
}

export const courses: Course[] = [
  {
    id: 'starter-intro',
    title: 'Старт без опыта',
    lang: 'Основы',
    icon: '🚀',
    color: '152 90% 52%',
    level: 'Без опыта',
    lessons: 3,
    hours: 1,
    price: 0,
    desc: 'Бесплатные разогревающие уроки: познакомишься с интерфейсом и напишешь первый код.',
    tags: ['Бесплатно', 'Старт', 'Для новичков'],
    tier: 'starter',
  },
  {
    id: 'ai-prompting',
    title: 'Промпты для ИИ: полный курс',
    lang: 'Prompt Engineering',
    icon: '🤖',
    color: '265 85% 65%',
    level: 'Без опыта',
    lessons: 16,
    hours: 28,
    price: 999,
    desc: 'Научись писать промпты для ChatGPT, Claude и Midjourney так, чтобы получать нужный результат. От основ до продвинутых техник.',
    tags: ['ИИ', 'Промпты', 'ChatGPT', 'VPN'],
    tier: 'starter',
  },
  {
    id: 'python',
    title: 'Python с нуля',
    lang: 'Python',
    icon: '🐍',
    color: '152 90% 52%',
    level: 'Начальный',
    lessons: 24,
    hours: 18,
    price: 1490,
    desc: 'Самый дружелюбный язык для старта. Переменные, циклы, функции и первый проект.',
    tags: ['Основы', 'Бэкенд', 'Автоматизация'],
    tier: 'base',
  },
  {
    id: 'javascript',
    title: 'JavaScript для веба',
    lang: 'JavaScript',
    icon: '⚡',
    color: '48 95% 60%',
    level: 'Начальный',
    lessons: 28,
    hours: 22,
    price: 1790,
    desc: 'Оживи сайты: DOM, события, анимации и интерактив прямо в браузере.',
    tags: ['Фронтенд', 'Веб', 'Интерактив'],
    tier: 'base',
  },
  {
    id: 'html-css',
    title: 'HTML & CSS вёрстка',
    lang: 'HTML/CSS',
    icon: '🎨',
    color: '265 85% 65%',
    level: 'Базовый',
    lessons: 18,
    hours: 12,
    price: 990,
    desc: 'Создай свою первую красивую страницу с нуля. Flexbox, Grid и адаптив.',
    tags: ['Вёрстка', 'Дизайн', 'Веб'],
    tier: 'base',
  },
  {
    id: 'sql',
    title: 'Базы данных и SQL',
    lang: 'SQL',
    icon: '🗄️',
    color: '195 90% 55%',
    level: 'Базовый',
    lessons: 16,
    hours: 14,
    price: 1290,
    desc: 'Научись хранить и доставать данные. SELECT, JOIN и реальные запросы.',
    tags: ['Данные', 'Бэкенд', 'Аналитика'],
    tier: 'base',
  },
  {
    id: 'react-pro',
    title: 'React Pro: своё приложение',
    lang: 'React',
    icon: '⚛️',
    color: '199 89% 60%',
    level: 'Опытный',
    lessons: 4,
    hours: 16,
    price: 2990,
    desc: 'Самостоятельная практика без подсказок: спроектируй и собери своё приложение на React.',
    tags: ['React', 'Практика', 'Портфолио'],
    tier: 'pro',
  },
];

export interface Lesson {
  id: number;
  title: string;
  duration: string;
  done: boolean;
  locked: boolean;
}

export const lessonPlan: Lesson[] = [
  { id: 1, title: 'Введение: как устроен код', duration: '08:24', done: true, locked: false },
  { id: 2, title: 'Переменные и типы данных', duration: '12:10', done: true, locked: false },
  { id: 3, title: 'Условия и логика', duration: '15:40', done: true, locked: false },
  { id: 4, title: 'Циклы: повторяем действия', duration: '14:05', done: false, locked: false },
  { id: 5, title: 'Функции и переиспользование', duration: '18:30', done: false, locked: true },
  { id: 6, title: 'Списки и коллекции', duration: '16:20', done: false, locked: true },
];

export interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
}

export const quiz: QuizQuestion[] = [
  {
    q: 'Как создать переменную в Python?',
    options: ['var x = 5', 'x = 5', 'int x = 5', 'let x = 5'],
    correct: 1,
  },
  {
    q: 'Что выведет print(2 ** 3)?',
    options: ['6', '8', '5', '23'],
    correct: 1,
  },
  {
    q: 'Какой цикл перебирает элементы списка?',
    options: ['while', 'repeat', 'for', 'loop'],
    correct: 2,
  },
];