import { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { emailAuthApi, vkAuthApi, yandexAuthApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

type Mode = 'login' | 'register' | 'verify' | 'reset-request' | 'reset-confirm';

const Login = () => {
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [refCode, setRefCode] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const ref = searchParams.get('ref');
    if (ref) {
      localStorage.setItem('codebase_ref', ref.toUpperCase());
      setRefCode(ref.toUpperCase());
    } else {
      const saved = localStorage.getItem('codebase_ref') || '';
      if (saved) setRefCode(saved);
    }
  }, [searchParams]);

  const finishLogin = async () => {
    const state = await emailAuthApi.login(email, password);
    login('', state.user);
    navigate('/cabinet');
  };

  const doLogin = async () => {
    if (!email.includes('@')) return toast.error('Введите корректный email');
    if (!password) return toast.error('Введите пароль');
    setLoading(true);
    try {
      await finishLogin();
      toast.success('С возвращением!');
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const doRegister = async () => {
    if (!email.includes('@')) return toast.error('Введите корректный email');
    if (password.length < 8) return toast.error('Пароль минимум 8 символов');
    setLoading(true);
    try {
      const res = await emailAuthApi.register(email, password, name);
      if (res.email_verification_required) {
        setMode('verify');
        toast.success('Код подтверждения отправлен на почту');
      } else {
        await finishLogin();
        toast.success('Добро пожаловать в CodeBase! 🚀');
      }
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const doVerify = async () => {
    if (code.length < 4) return toast.error('Введите код из письма');
    setLoading(true);
    try {
      await emailAuthApi.verifyEmail(email, code);
      await finishLogin();
      if (refCode) localStorage.removeItem('codebase_ref');
      toast.success('Добро пожаловать в CodeBase! 🚀');
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const doResetRequest = async () => {
    if (!email.includes('@')) return toast.error('Введите корректный email');
    setLoading(true);
    try {
      await emailAuthApi.requestReset(email);
      setMode('reset-confirm');
      toast.success('Код для сброса отправлен на почту');
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const doResetConfirm = async () => {
    if (code.length < 4) return toast.error('Введите код из письма');
    if (password.length < 8) return toast.error('Пароль минимум 8 символов');
    setLoading(true);
    try {
      await emailAuthApi.confirmReset(email, code, password);
      toast.success('Пароль обновлён! Войдите с новым паролем');
      setCode('');
      setMode('login');
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const doVkLogin = async () => {
    setLoading(true);
    try {
      await vkAuthApi.start();
    } catch (e) {
      toast.error((e as Error).message || 'Вход через VK пока недоступен');
      setLoading(false);
    }
  };

  const doYandexLogin = async () => {
    setLoading(true);
    try {
      await yandexAuthApi.start();
    } catch (e) {
      toast.error((e as Error).message || 'Вход через Яндекс пока недоступен');
      setLoading(false);
    }
  };

  const titles: Record<Mode, string> = {
    login: 'Вход в кабинет',
    register: 'Регистрация',
    verify: 'Подтвердите почту',
    'reset-request': 'Восстановление пароля',
    'reset-confirm': 'Новый пароль',
  };

  return (
    <div className="min-h-screen bg-background text-foreground grid-bg flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-accent/20 rounded-full blur-[120px]" />

      <div className="relative w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 font-mono font-extrabold text-xl mb-8">
          <span className="text-primary">{'{'}</span>
          CodeBase
          <span className="text-primary">{'}'}</span>
        </Link>

        <div className="glass rounded-2xl p-8">
          <h1 className="text-2xl font-extrabold mb-2">{titles[mode]}</h1>

          {refCode && (mode === 'login' || mode === 'register') && (
            <div className="flex items-center gap-2 rounded-xl bg-accent/10 border border-accent/30 p-3 mb-5 mt-3">
              <Icon name="Gift" size={18} className="text-accent shrink-0" />
              <p className="text-xs text-foreground">
                Вы пришли по приглашению! Купите любой курс и получите <span className="font-bold text-accent">+150 XP</span> в подарок.
              </p>
            </div>
          )}

          {(mode === 'login' || mode === 'register' || mode === 'reset-request') && (
            <>
              <p className="text-sm text-muted-foreground mb-6 mt-1">
                {mode === 'login' && 'Введите email и пароль от аккаунта.'}
                {mode === 'register' && 'Создайте аккаунт по email и паролю.'}
                {mode === 'reset-request' && 'Введите email — пришлём код для сброса пароля.'}
              </p>

              {mode === 'register' && (
                <>
                  <label className="text-sm font-medium mb-2 block">Имя</label>
                  <Input
                    type="text"
                    placeholder="Как вас зовут"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 bg-background/60 border-border mb-4"
                  />
                </>
              )}

              <label className="text-sm font-medium mb-2 block">Email</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-background/60 border-border font-mono mb-4"
              />

              {mode !== 'reset-request' && (
                <>
                  <label className="text-sm font-medium mb-2 block">Пароль</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (mode === 'login' ? doLogin() : doRegister())}
                    className="h-12 bg-background/60 border-border mb-5"
                  />
                </>
              )}

              <Button
                onClick={mode === 'login' ? doLogin : mode === 'register' ? doRegister : doResetRequest}
                disabled={loading}
                className="w-full h-12 font-semibold glow-green"
              >
                {loading ? 'Подождите...' : mode === 'login' ? 'Войти' : mode === 'register' ? 'Создать аккаунт' : 'Получить код'}
                {!loading && <Icon name="ArrowRight" size={18} className="ml-1" />}
              </Button>

              {(mode === 'login' || mode === 'register') && (
                <>
                  <div className="flex items-center gap-3 my-5">
                    <div className="h-px flex-1 bg-border" />
                    <span className="text-xs text-muted-foreground">или</span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <button
                    type="button"
                    onClick={doVkLogin}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 w-full h-12 rounded-xl font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                    style={{ background: '#0077FF' }}
                  >
                    <Icon name="AtSign" size={20} />
                    Войти через ВКонтакте
                  </button>
                  <button
                    type="button"
                    onClick={doYandexLogin}
                    disabled={loading}
                    className="flex items-center justify-center gap-2 w-full h-12 rounded-xl font-semibold text-black bg-white transition-opacity hover:opacity-90 disabled:opacity-60 mt-3"
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#FC3F1D] text-white font-bold text-sm leading-none">Я</span>
                    Войти через Яндекс ID
                  </button>
                </>
              )}
            </>
          )}

          {(mode === 'verify' || mode === 'reset-confirm') && (
            <>
              <p className="text-sm text-muted-foreground mb-6 mt-1">
                Код отправлен на <span className="text-primary font-mono">{email}</span>
              </p>
              <label className="text-sm font-medium mb-2 block">Код из письма</label>
              <Input
                type="text"
                inputMode="numeric"
                placeholder="000000"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="h-14 bg-background/60 border-border font-mono text-2xl tracking-[0.5em] text-center mb-4"
              />
              {mode === 'reset-confirm' && (
                <>
                  <label className="text-sm font-medium mb-2 block">Новый пароль</label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 bg-background/60 border-border mb-5"
                  />
                </>
              )}
              <Button
                onClick={mode === 'verify' ? doVerify : doResetConfirm}
                disabled={loading}
                className="w-full h-12 font-semibold glow-green"
              >
                {loading ? 'Проверяем...' : mode === 'verify' ? 'Подтвердить' : 'Сохранить пароль'}
              </Button>
            </>
          )}

          <div className="mt-6 space-y-2 text-center text-sm">
            {mode === 'login' && (
              <>
                <button onClick={() => setMode('register')} className="block w-full text-muted-foreground hover:text-primary transition-colors">
                  Нет аккаунта? <span className="text-primary font-medium">Зарегистрироваться</span>
                </button>
                <button onClick={() => setMode('reset-request')} className="block w-full text-muted-foreground hover:text-primary transition-colors">
                  Забыли пароль?
                </button>
              </>
            )}
            {mode === 'register' && (
              <button onClick={() => setMode('login')} className="block w-full text-muted-foreground hover:text-primary transition-colors">
                Уже есть аккаунт? <span className="text-primary font-medium">Войти</span>
              </button>
            )}
            {(mode === 'verify' || mode === 'reset-request' || mode === 'reset-confirm') && (
              <button onClick={() => setMode('login')} className="flex items-center justify-center gap-1 w-full text-muted-foreground hover:text-primary transition-colors">
                <Icon name="ArrowLeft" size={16} /> к входу
              </button>
            )}
          </div>
        </div>

        <Link to="/" className="block text-center text-sm text-muted-foreground hover:text-primary mt-6 transition-colors">
          ← на главную
        </Link>
      </div>
    </div>
  );
};

export default Login;