import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { authApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const sendCode = async () => {
    if (!email.includes('@')) {
      toast.error('Введите корректный email');
      return;
    }
    setLoading(true);
    try {
      const res = await authApi.requestCode(email);
      setStep('code');
      if (res.demo_code) {
        toast.success(`Демо-режим: ваш код ${res.demo_code}`, { duration: 8000 });
      } else {
        toast.success('Код отправлен на почту');
      }
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const verify = async () => {
    if (code.length < 4) {
      toast.error('Введите код из письма');
      return;
    }
    setLoading(true);
    try {
      const res = await authApi.verifyCode(email, code);
      login(res.token, res.user);
      toast.success(res.is_new ? 'Добро пожаловать в CodeBase! 🚀' : 'С возвращением!');
      navigate('/cabinet');
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
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
          {step === 'email' ? (
            <>
              <h1 className="text-2xl font-extrabold mb-2">Вход в кабинет</h1>
              <p className="text-sm text-muted-foreground mb-6">
                Введите email — пришлём код для входа. Если аккаунта нет, создадим автоматически.
              </p>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendCode()}
                className="h-12 bg-background/60 border-border font-mono mb-5"
              />
              <Button onClick={sendCode} disabled={loading} className="w-full h-12 font-semibold glow-green">
                {loading ? 'Отправляем...' : 'Получить код'}
                {!loading && <Icon name="ArrowRight" size={18} className="ml-1" />}
              </Button>
            </>
          ) : (
            <>
              <button
                onClick={() => setStep('email')}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4 transition-colors"
              >
                <Icon name="ArrowLeft" size={16} /> назад
              </button>
              <h1 className="text-2xl font-extrabold mb-2">Введите код</h1>
              <p className="text-sm text-muted-foreground mb-6">
                Код отправлен на <span className="text-primary font-mono">{email}</span>
              </p>
              <label className="text-sm font-medium mb-2 block">Код из письма</label>
              <Input
                type="text"
                inputMode="numeric"
                placeholder="000000"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                onKeyDown={(e) => e.key === 'Enter' && verify()}
                className="h-14 bg-background/60 border-border font-mono text-2xl tracking-[0.5em] text-center mb-5"
              />
              <Button onClick={verify} disabled={loading} className="w-full h-12 font-semibold glow-green">
                {loading ? 'Проверяем...' : 'Войти'}
              </Button>
              <button
                onClick={sendCode}
                className="w-full text-center text-sm text-muted-foreground hover:text-primary mt-4 transition-colors"
              >
                Отправить код повторно
              </button>
            </>
          )}
        </div>

        <Link to="/" className="block text-center text-sm text-muted-foreground hover:text-primary mt-6 transition-colors">
          ← на главную
        </Link>
      </div>
    </div>
  );
};

export default Login;
