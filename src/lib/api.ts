const AUTH_URL = 'https://functions.poehali.dev/3bd8b5d2-2970-4383-83eb-d7c0fc4447a3';
const DASHBOARD_URL = 'https://functions.poehali.dev/e6eaca0a-8f77-4db4-af4a-5ba03ae1522c';
const AUTH_EMAIL_URL = 'https://functions.poehali.dev/f4c6879e-bdea-4ea6-97d1-efd3a4b90dfd';
const VK_AUTH_URL = 'https://functions.poehali.dev/9451e109-e6b4-41bb-9b9e-147853312695';
const YANDEX_AUTH_URL = 'https://functions.poehali.dev/d31d4c36-8b53-4391-9b95-6475d89f9273';
const ROBOKASSA_URL = 'https://functions.poehali.dev/9a0e4c92-bbc7-4858-968a-e09e4388b7b8';

const REFRESH_TOKEN_KEY = 'codebase_refresh_token';
export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY) || '';
export const setRefreshToken = (t: string) => localStorage.setItem(REFRESH_TOKEN_KEY, t);
export const clearRefreshToken = () => localStorage.removeItem(REFRESH_TOKEN_KEY);

const TOKEN_KEY = 'codebase_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY) || '';
export const setToken = (t: string) => localStorage.setItem(TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(TOKEN_KEY);

export interface ApiCourse {
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
  category: string;
  tier: string;
  locked?: boolean;
  progress?: number;
  completed_lessons?: number;
}

export interface Referral {
  code: string;
  invited_total: number;
  invited_bought: number;
  xp_earned: number;
}

export interface DashboardState {
  user: { id: number; email: string; name: string; avatar: string; balance: number; xp: number };
  my_courses: ApiCourse[];
  available_courses: ApiCourse[];
  recommended: ApiCourse[];
  stats: { courses: number; lessons_done: number; completed_courses: number };
  referral: Referral;
  pro_unlocked: boolean;
}

export interface QuizQuestion {
  q: string;
  options: string[];
  correct: number;
}

export interface LessonStep {
  title: string;
  text: string;
}

export interface Software {
  name: string;
  desc: string;
  url: string;
  install: string;
}

export interface Lesson {
  id: number;
  position: number;
  title: string;
  duration: string;
  video_url: string;
  content: string;
  intro: string;
  steps: LessonStep[];
  software: Software[];
  code_lang: string;
  code_sample: string;
  code_output: string;
  quiz: QuizQuestion[];
  done: boolean;
  locked: boolean;
}

export interface ExamResult {
  score: number;
  total: number;
  percent: number;
  passed: boolean;
  xp_gained?: number;
}

export interface CourseLessons {
  course: { id: string; title: string; lang: string; icon: string; color: string };
  owned: boolean;
  done_count: number;
  lessons: Lesson[];
  exam: QuizQuestion[];
  exam_unlocked: boolean;
  exam_result: ExamResult | null;
  xp_gained?: number;
}

async function post(url: string, body: object, auth = false) {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (auth) headers['X-Auth-Token'] = getToken();
  const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Ошибка запроса');
  return data;
}

export const authApi = {
  requestCode: (email: string) =>
    post(AUTH_URL, { action: 'request_code', email }) as Promise<{ ok: boolean; sent: boolean; demo_code?: string }>,
  verifyCode: (email: string, code: string, ref?: string) =>
    post(AUTH_URL, { action: 'verify_code', email, code, ref: ref || '' }) as Promise<{ token: string; is_new: boolean; user: DashboardState['user'] }>,
  logout: async () => {
    try {
      await fetch(AUTH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Auth-Token': getToken() },
        body: JSON.stringify({ action: 'logout' }),
      });
    } finally {
      clearToken();
    }
  },
};

async function postJson(url: string, body: object) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Ошибка запроса');
  return data;
}

interface EmailLoginResult {
  session_token: string;
  refresh_token: string;
  user: { id: number; email: string; name: string | null };
}

export const emailAuthApi = {
  register: (email: string, password: string, name?: string) =>
    postJson(`${AUTH_EMAIL_URL}?action=register`, { email, password, name: name || '' }) as Promise<{
      user_id: number;
      email_verification_required: boolean;
      message?: string;
    }>,
  verifyEmail: (email: string, code: string) =>
    postJson(`${AUTH_EMAIL_URL}?action=verify-email`, { email, code }) as Promise<{ message?: string }>,
  login: async (email: string, password: string): Promise<DashboardState> => {
    const res = (await postJson(`${AUTH_EMAIL_URL}?action=login`, { email, password })) as EmailLoginResult;
    setToken(res.session_token);
    if (res.refresh_token) setRefreshToken(res.refresh_token);
    return dashboardApi.get();
  },
  requestReset: (email: string) =>
    postJson(`${AUTH_EMAIL_URL}?action=reset-password`, { email }) as Promise<{ message?: string; code?: string }>,
  confirmReset: (email: string, code: string, new_password: string) =>
    postJson(`${AUTH_EMAIL_URL}?action=reset-password`, { email, code, new_password }) as Promise<{ message?: string }>,
  logout: async () => {
    const rt = getRefreshToken();
    try {
      if (rt) {
        await fetch(`${AUTH_EMAIL_URL}?action=logout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token: rt }),
        });
      }
    } finally {
      clearToken();
      clearRefreshToken();
    }
  },
};

const VK_STATE_KEY = 'vk_state';
const VK_VERIFIER_KEY = 'vk_code_verifier';

export const vkAuthApi = {
  start: async () => {
    const res = await fetch(`${VK_AUTH_URL}?action=auth-url`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'VK недоступен');
    if (data.state) sessionStorage.setItem(VK_STATE_KEY, data.state);
    if (data.code_verifier) sessionStorage.setItem(VK_VERIFIER_KEY, data.code_verifier);
    window.location.href = data.auth_url;
  },
  handleCallback: async (): Promise<DashboardState> => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const device_id = params.get('device_id') || '';
    const state = params.get('state');
    if (!code) throw new Error('Не получен код авторизации');
    const storedState = sessionStorage.getItem(VK_STATE_KEY);
    if (storedState && state !== storedState) throw new Error('Ошибка проверки безопасности');
    const code_verifier = sessionStorage.getItem(VK_VERIFIER_KEY) || '';
    const res = (await postJson(`${VK_AUTH_URL}?action=callback`, {
      code,
      code_verifier,
      device_id,
    })) as { session_token: string; refresh_token: string };
    setToken(res.session_token);
    if (res.refresh_token) setRefreshToken(res.refresh_token);
    sessionStorage.removeItem(VK_STATE_KEY);
    sessionStorage.removeItem(VK_VERIFIER_KEY);
    return dashboardApi.get();
  },
};

const YANDEX_STATE_KEY = 'yandex_state';

export const yandexAuthApi = {
  start: async () => {
    const res = await fetch(`${YANDEX_AUTH_URL}?action=auth-url`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Яндекс недоступен');
    if (data.state) sessionStorage.setItem(YANDEX_STATE_KEY, data.state);
    window.location.href = data.auth_url;
  },
  handleCallback: async (): Promise<DashboardState> => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const state = params.get('state');
    if (!code) throw new Error('Не получен код авторизации');
    const storedState = sessionStorage.getItem(YANDEX_STATE_KEY);
    if (storedState && state !== storedState) throw new Error('Ошибка проверки безопасности');
    const res = (await postJson(`${YANDEX_AUTH_URL}?action=callback`, {
      code,
    })) as { session_token: string; refresh_token: string };
    setToken(res.session_token);
    if (res.refresh_token) setRefreshToken(res.refresh_token);
    sessionStorage.removeItem(YANDEX_STATE_KEY);
    return dashboardApi.get();
  },
};

export const robokassaApi = {
  topupBalance: async (
    amount: number,
    user: { name: string; email: string; id: number },
  ): Promise<{ payment_url: string; order_number: string }> => {
    const res = await fetch(ROBOKASSA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Auth-Token': getToken() },
      body: JSON.stringify({
        amount,
        user_id: user.id,
        user_name: user.name || 'Пользователь',
        user_email: user.email || 'user@codebaseschool.ru',
        order_comment: 'Пополнение баланса CodeBase',
        cart_items: [{ id: 'balance', name: 'Пополнение баланса', price: amount, quantity: 1 }],
        success_url: `${window.location.origin}/cabinet?payment=success`,
        fail_url: `${window.location.origin}/cabinet?payment=fail`,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Не удалось создать платёж');
    return data;
  },
};

export const dashboardApi = {
  get: async (): Promise<DashboardState> => {
    const res = await fetch(DASHBOARD_URL, { headers: { 'X-Auth-Token': getToken() } });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Ошибка загрузки');
    return data;
  },
  topup: (amount: number) => post(DASHBOARD_URL, { action: 'topup', amount }, true) as Promise<DashboardState>,
  buy: (course_id: string) => post(DASHBOARD_URL, { action: 'buy', course_id }, true) as Promise<DashboardState>,
  updateProfile: (name: string, avatar?: string) =>
    post(DASHBOARD_URL, { action: 'update_profile', name, avatar: avatar || '' }, true) as Promise<DashboardState>,
  getCourseLessons: async (course_id: string): Promise<CourseLessons> => {
    const res = await fetch(`${DASHBOARD_URL}?course_id=${encodeURIComponent(course_id)}`, {
      headers: { 'X-Auth-Token': getToken() },
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Ошибка загрузки');
    return data;
  },
  completeLesson: (lesson_id: number) =>
    post(DASHBOARD_URL, { action: 'complete_lesson', lesson_id }, true) as Promise<CourseLessons>,
  submitExam: (course_id: string, answers: number[], hint_penalty = 0) =>
    post(DASHBOARD_URL, { action: 'submit_exam', course_id, answers, hint_penalty }, true) as Promise<ExamResult>,
  quizAnswer: (lesson_id: number, q_idx: number, correct: boolean) =>
    post(DASHBOARD_URL, { action: 'quiz_answer', lesson_id, q_idx, correct }, true) as Promise<{ xp: number; xp_delta: number }>,
  exchangeXp: (amount: number) =>
    post(DASHBOARD_URL, { action: 'exchange_xp', amount }, true) as Promise<DashboardState>,
};