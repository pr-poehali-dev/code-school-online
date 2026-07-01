import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { yandexAuthApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

const YandexCallback = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState('');
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    yandexAuthApi
      .handleCallback()
      .then((state) => {
        login('', state.user);
        navigate('/cabinet');
      })
      .catch((e: Error) => setError(e.message || 'Не удалось войти через Яндекс'));
  }, [login, navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground grid-bg flex items-center justify-center px-4">
      <div className="glass rounded-2xl p-8 text-center max-w-sm w-full">
        {error ? (
          <>
            <Icon name="TriangleAlert" size={40} className="text-destructive mx-auto mb-4" />
            <h1 className="text-lg font-bold mb-2">Ошибка входа</h1>
            <p className="text-sm text-muted-foreground mb-5">{error}</p>
            <button
              onClick={() => navigate('/login')}
              className="w-full h-11 rounded-xl font-semibold glow-green bg-primary text-primary-foreground"
            >
              Вернуться ко входу
            </button>
          </>
        ) : (
          <>
            <Icon name="LoaderCircle" size={40} className="text-primary mx-auto mb-4 animate-spin" />
            <p className="text-sm text-muted-foreground">Входим через Яндекс...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default YandexCallback;
