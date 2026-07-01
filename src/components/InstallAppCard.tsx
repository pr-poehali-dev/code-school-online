import { useEffect, useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const isMobile = () =>
  /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent);

const isIOS = () =>
  /iPhone|iPad|iPod/i.test(navigator.userAgent) &&
  !(window as unknown as { MSStream?: unknown }).MSStream;

const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  (window.navigator as unknown as { standalone?: boolean }).standalone === true;

const InstallAppCard = () => {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if (!isMobile() || isStandalone()) return;
    setShow(true);

    const onPrompt = (e: Event) => {
      e.preventDefault();
      setPromptEvent(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => setInstalled(true);

    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  if (!show) return null;

  const install = async () => {
    if (!promptEvent) return;
    await promptEvent.prompt();
    const choice = await promptEvent.userChoice;
    if (choice.outcome === 'accepted') setInstalled(true);
    setPromptEvent(null);
  };

  if (installed) {
    return (
      <div className="glass rounded-2xl p-6 max-w-lg mx-auto mt-5 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
          <Icon name="CheckCircle2" size={20} className="text-primary" />
        </div>
        <div className="text-sm">Приложение добавлено на рабочий стол. Открывай его с иконки CodeBase.</div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6 max-w-lg mx-auto mt-5">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
          <Icon name="Smartphone" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-bold">Установить приложение</h3>
          <p className="text-xs text-muted-foreground">Иконка CodeBase на рабочем столе — быстрый вход без браузера</p>
        </div>
      </div>

      {promptEvent ? (
        <Button onClick={install} className="w-full h-12 font-semibold glow-green">
          <Icon name="Download" size={18} className="mr-1.5" /> Добавить на рабочий стол
        </Button>
      ) : isIOS() ? (
        <div className="rounded-xl bg-background/50 border border-border p-4 space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Icon name="Share" size={16} className="text-primary shrink-0" />
            <span>Нажми кнопку <b>«Поделиться»</b> внизу браузера Safari</span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Plus" size={16} className="text-primary shrink-0" />
            <span>Выбери <b>«На экран Домой»</b></span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="Check" size={16} className="text-primary shrink-0" />
            <span>Готово — иконка появится на рабочем столе</span>
          </div>
        </div>
      ) : (
        <div className="rounded-xl bg-background/50 border border-border p-4 text-sm text-muted-foreground">
          Открой меню браузера (три точки) и выбери <b className="text-foreground">«Установить приложение»</b> или <b className="text-foreground">«На главный экран»</b>.
        </div>
      )}
    </div>
  );
};

export default InstallAppCard;