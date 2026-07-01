import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { emailAuthApi, getToken, setToken, clearToken, DashboardState } from '@/lib/api';

type User = DashboardState['user'];

interface AuthCtx {
  user: User | null;
  loading: boolean;
  isAuthed: boolean;
  login: (token: string, user: User) => void;
  logout: () => Promise<void>;
  setUser: (u: User) => void;
}

const Ctx = createContext<AuthCtx | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    import('@/lib/api').then(({ dashboardApi }) => {
      dashboardApi
        .get()
        .then((s) => setUserState(s.user))
        .catch(() => clearToken())
        .finally(() => setLoading(false));
    });
  }, []);

  const login = (token: string, u: User) => {
    setToken(token);
    setUserState(u);
  };

  const logout = async () => {
    await emailAuthApi.logout();
    setUserState(null);
  };

  return (
    <Ctx.Provider value={{ user, loading, isAuthed: !!user, login, logout, setUser: setUserState }}>
      {children}
    </Ctx.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};