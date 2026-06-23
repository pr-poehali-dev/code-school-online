const AUTH_URL = 'https://functions.poehali.dev/3bd8b5d2-2970-4383-83eb-d7c0fc4447a3';
const DASHBOARD_URL = 'https://functions.poehali.dev/e6eaca0a-8f77-4db4-af4a-5ba03ae1522c';

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
  progress?: number;
  completed_lessons?: number;
}

export interface DashboardState {
  user: { id: number; email: string; name: string; avatar: string; balance: number };
  my_courses: ApiCourse[];
  available_courses: ApiCourse[];
  recommended: ApiCourse[];
  stats: { courses: number; lessons_done: number; completed_courses: number };
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
  verifyCode: (email: string, code: string) =>
    post(AUTH_URL, { action: 'verify_code', email, code }) as Promise<{ token: string; is_new: boolean; user: DashboardState['user'] }>,
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
  completeLesson: (course_id: string) =>
    post(DASHBOARD_URL, { action: 'complete_lesson', course_id }, true) as Promise<DashboardState>,
};
