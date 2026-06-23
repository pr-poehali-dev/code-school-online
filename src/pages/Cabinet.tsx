import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { dashboardApi, DashboardState, ApiCourse } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

const topupOptions = [500, 1000, 2000, 5000];

const Cabinet = () => {
  const { isAuthed, loading: authLoading, logout, setUser } = useAuth();
  const navigate = useNavigate();
  const [state, setState] = useState<DashboardState | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState('');
  const [nameInput, setNameInput] = useState('');

  useEffect(() => {
    if (!authLoading && !isAuthed) navigate('/login');
  }, [authLoading, isAuthed, navigate]);

  const load = () => {
    dashboardApi.get()
      .then((s) => { setState(s); setNameInput(s.user.name); })
      .catch((e) => toast.error((e as Error).message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { if (isAuthed) load(); }, [isAuthed]);

  const apply = (s: DashboardState) => { setState(s); setUser(s.user); };

  const topup = async (amount: number) => {
    setBusy('topup');
    try { apply(await dashboardApi.topup(amount)); toast.success(`Баланс пополнен на ${amount} ₽`); }
    catch (e) { toast.error((e as Error).message); }
    finally { setBusy(''); }
  };

  const buy = async (c: ApiCourse) => {
    setBusy(c.id);
    try { apply(await dashboardApi.buy(c.id)); toast.success(`Курс «${c.title}» куплен! 🎉`); }
    catch (e) { toast.error((e as Error).message); }
    finally { setBusy(''); }
  };

  const goLearn = (c: ApiCourse) => navigate(`/learn/${c.id}`);

  const saveProfile = async () => {
    setBusy('profile');
    try { apply(await dashboardApi.updateProfile(nameInput)); toast.success('Профиль обновлён'); }
    catch (e) { toast.error((e as Error).message); }
    finally { setBusy(''); }
  };

  if (authLoading || loading || !state) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Icon name="Loader2" size={32} className="text-primary animate-spin" />
      </div>
    );
  }

  const { user, my_courses, available_courses, recommended, stats } = state;
  const initials = user.name.slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top bar */}
      <header className="glass sticky top-0 z-40">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-mono font-extrabold text-lg">
            <span className="text-primary">{'{'}</span>CodeBase<span className="text-primary">{'}'}</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 glass rounded-lg px-3 py-1.5">
              <Icon name="Wallet" size={16} className="text-primary" />
              <span className="font-mono font-bold">{user.balance.toLocaleString('ru')} ₽</span>
            </div>
            <Button variant="ghost" size="sm" onClick={() => logout().then(() => navigate('/'))}>
              <Icon name="LogOut" size={18} />
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Hero profile */}
        <div className="glass rounded-2xl p-6 mb-6 flex flex-col sm:flex-row items-center gap-5 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/15 rounded-full blur-3xl" />
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-2xl font-extrabold text-background shrink-0">
            {initials}
          </div>
          <div className="relative text-center sm:text-left flex-1">
            <h1 className="text-2xl font-extrabold">{user.name}</h1>
            <p className="text-sm text-muted-foreground font-mono">{user.email}</p>
          </div>
          <div className="relative grid grid-cols-3 gap-3 w-full sm:w-auto">
            {[
              { v: stats.courses, l: 'курса' },
              { v: stats.lessons_done, l: 'уроков' },
              { v: stats.completed_courses, l: 'завершено' },
            ].map((s) => (
              <div key={s.l} className="text-center bg-background/40 rounded-xl px-4 py-3">
                <div className="font-mono font-bold text-xl text-primary">{s.v}</div>
                <div className="text-xs text-muted-foreground">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <Tabs defaultValue="courses">
          <TabsList className="bg-secondary/50 mb-6 flex-wrap h-auto">
            <TabsTrigger value="courses">Мои курсы</TabsTrigger>
            <TabsTrigger value="catalog">Каталог</TabsTrigger>
            <TabsTrigger value="balance">Баланс</TabsTrigger>
            <TabsTrigger value="settings">Профиль</TabsTrigger>
          </TabsList>

          {/* МОИ КУРСЫ + ПРОГРЕСС */}
          <TabsContent value="courses" className="space-y-5">
            {my_courses.length === 0 ? (
              <div className="glass rounded-2xl p-12 text-center">
                <div className="text-5xl mb-4">📚</div>
                <h3 className="font-bold text-lg mb-2">Пока нет курсов</h3>
                <p className="text-muted-foreground mb-5">Загляни в каталог и начни учиться уже сегодня.</p>
              </div>
            ) : (
              my_courses.map((c) => (
                <div key={c.id} className="glass rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-4 gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-2xl">{c.icon}</span>
                      <div className="min-w-0">
                        <div className="font-bold truncate">{c.title}</div>
                        <div className="text-xs text-muted-foreground font-mono">
                          {c.completed_lessons} из {c.lessons} уроков
                        </div>
                      </div>
                    </div>
                    {c.progress === 100 ? (
                      <Button size="sm" variant="outline" onClick={() => goLearn(c)} className="shrink-0 border-primary/40 text-primary">
                        <Icon name="RotateCcw" size={14} className="mr-1" /> Повторить
                      </Button>
                    ) : (
                      <Button size="sm" onClick={() => goLearn(c)} className="shrink-0">
                        <Icon name="Play" size={14} className="mr-1" /> Продолжить
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={c.progress} className="h-2" />
                    <span className="font-mono text-xs text-muted-foreground w-9 text-right">{c.progress}%</span>
                  </div>
                </div>
              ))
            )}

            {recommended.length > 0 && (
              <div>
                <h3 className="font-mono text-sm text-primary mb-4 mt-8">// похожие курсы для тебя</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {recommended.map((c) => (
                    <CourseCard key={c.id} c={c} busy={busy} onBuy={buy} balance={user.balance} />
                  ))}
                </div>
              </div>
            )}
          </TabsContent>

          {/* КАТАЛОГ */}
          <TabsContent value="catalog">
            {available_courses.length === 0 ? (
              <div className="glass rounded-2xl p-12 text-center">
                <div className="text-5xl mb-4">🏆</div>
                <h3 className="font-bold text-lg">Ты купил все курсы!</h3>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {available_courses.map((c) => (
                  <CourseCard key={c.id} c={c} busy={busy} onBuy={buy} balance={user.balance} />
                ))}
              </div>
            )}
          </TabsContent>

          {/* БАЛАНС */}
          <TabsContent value="balance">
            <div className="glass rounded-2xl p-8 max-w-lg mx-auto text-center">
              <div className="text-sm text-muted-foreground mb-1">Текущий баланс</div>
              <div className="text-5xl font-extrabold font-mono text-primary mb-8">
                {user.balance.toLocaleString('ru')} ₽
              </div>
              <div className="text-sm font-medium mb-3 text-left">Быстрое пополнение</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                {topupOptions.map((a) => (
                  <Button key={a} variant="outline" disabled={busy === 'topup'} onClick={() => topup(a)}
                    className="border-border h-14 font-mono font-bold hover:border-primary hover:text-primary">
                    +{a}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Демо-режим: баланс пополняется мгновенно без реальной оплаты.
              </p>
            </div>
          </TabsContent>

          {/* ПРОФИЛЬ */}
          <TabsContent value="settings">
            <div className="glass rounded-2xl p-8 max-w-lg mx-auto">
              <h3 className="font-bold text-lg mb-6">Настройки профиля</h3>
              <label className="text-sm font-medium mb-2 block">Имя</label>
              <Input value={nameInput} onChange={(e) => setNameInput(e.target.value)}
                className="h-12 bg-background/60 border-border mb-4" />
              <label className="text-sm font-medium mb-2 block">Email</label>
              <Input value={user.email} disabled className="h-12 bg-background/40 border-border font-mono mb-6" />
              <div className="flex gap-3">
                <Button onClick={saveProfile} disabled={busy === 'profile'} className="font-semibold glow-green">
                  Сохранить
                </Button>
                <Button variant="outline" className="border-border"
                  onClick={() => logout().then(() => navigate('/'))}>
                  <Icon name="LogOut" size={16} className="mr-1" /> Выйти
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

const CourseCard = ({ c, busy, onBuy, balance }: {
  c: ApiCourse; busy: string; onBuy: (c: ApiCourse) => void; balance: number;
}) => {
  const canAfford = balance >= c.price;
  return (
    <div className="glass rounded-2xl p-5 relative overflow-hidden flex flex-col">
      <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-3xl opacity-40"
        style={{ background: `hsl(${c.color})` }} />
      <div className="relative flex flex-col flex-1">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3"
          style={{ background: `hsl(${c.color} / 0.15)` }}>{c.icon}</div>
        <div className="font-bold mb-1">{c.title}</div>
        <p className="text-xs text-muted-foreground mb-3 flex-1">{c.desc}</p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono mb-4">
          <span className="flex items-center gap-1"><Icon name="BookOpen" size={13} /> {c.lessons}</span>
          <span className="flex items-center gap-1"><Icon name="Clock" size={13} /> {c.hours}ч</span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="font-mono font-bold">{c.price} ₽</span>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="font-semibold">Купить</Button>
            </DialogTrigger>
            <DialogContent className="glass border-border">
              <DialogHeader>
                <DialogTitle>Покупка курса</DialogTitle>
              </DialogHeader>
              <div className="py-2">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{c.icon}</span>
                  <div>
                    <div className="font-bold">{c.title}</div>
                    <div className="text-sm text-muted-foreground">{c.lessons} уроков · {c.hours} часов</div>
                  </div>
                </div>
                <div className="flex justify-between text-sm py-2 border-t border-border">
                  <span className="text-muted-foreground">Стоимость</span>
                  <span className="font-mono font-bold">{c.price} ₽</span>
                </div>
                <div className="flex justify-between text-sm py-2 border-t border-border">
                  <span className="text-muted-foreground">Ваш баланс</span>
                  <span className={`font-mono font-bold ${canAfford ? '' : 'text-destructive'}`}>
                    {balance.toLocaleString('ru')} ₽
                  </span>
                </div>
                {!canAfford && (
                  <p className="text-xs text-destructive mt-2">Недостаточно средств — пополните баланс.</p>
                )}
              </div>
              <DialogFooter>
                <Button disabled={!canAfford || busy === c.id} onClick={() => onBuy(c)}
                  className="w-full font-semibold glow-green">
                  {canAfford ? `Оплатить ${c.price} ₽ с баланса` : 'Недостаточно средств'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Cabinet;