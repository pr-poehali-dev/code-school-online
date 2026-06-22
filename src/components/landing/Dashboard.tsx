import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const myCourses = [
  { title: 'Python с нуля', icon: '🐍', progress: 62, lessons: '15 из 24' },
  { title: 'HTML & CSS вёрстка', icon: '🎨', progress: 100, lessons: '18 из 18' },
  { title: 'JavaScript для веба', icon: '⚡', progress: 21, lessons: '6 из 28' },
];

const Dashboard = () => {
  return (
    <section id="dashboard" className="py-20 md:py-28 bg-secondary/30">
      <div className="container">
        <div className="text-center mb-12">
          <p className="font-mono text-sm text-primary mb-3">// личный кабинет</p>
          <h2 className="text-3xl md:text-5xl font-extrabold">Твоё пространство обучения</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Профиль + баланс */}
          <div className="glass rounded-2xl p-6 flex flex-col">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-accent flex items-center justify-center text-xl font-bold text-background">
                АК
              </div>
              <div>
                <div className="font-bold">Алекс Кодов</div>
                <div className="text-sm text-muted-foreground font-mono">@alexcode</div>
              </div>
            </div>

            <div className="rounded-xl bg-background/60 p-5 mb-4 border border-border">
              <div className="text-sm text-muted-foreground mb-1">Баланс</div>
              <div className="text-3xl font-extrabold font-mono text-primary mb-4">3 200 ₽</div>
              <Button className="w-full font-semibold glow-green">
                <Icon name="Plus" size={16} className="mr-1" />
                Пополнить баланс
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center mt-auto">
              {[
                { v: '3', l: 'курса' },
                { v: '21', l: 'урок' },
                { v: '7', l: 'дней' },
              ].map((s) => (
                <div key={s.l} className="rounded-lg bg-background/40 py-3">
                  <div className="font-mono font-bold text-lg text-primary">{s.v}</div>
                  <div className="text-xs text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Мои курсы */}
          <div className="lg:col-span-2 glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-lg">Мои курсы</h3>
              <span className="font-mono text-xs text-muted-foreground">прогресс обучения</span>
            </div>

            <div className="space-y-5">
              {myCourses.map((c) => (
                <div key={c.title} className="rounded-xl bg-background/50 p-4 border border-border hover-scale">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{c.icon}</span>
                      <div>
                        <div className="font-semibold">{c.title}</div>
                        <div className="text-xs text-muted-foreground font-mono">{c.lessons}</div>
                      </div>
                    </div>
                    {c.progress === 100 ? (
                      <span className="flex items-center gap-1 text-xs font-mono text-primary">
                        <Icon name="CheckCircle2" size={15} /> готово
                      </span>
                    ) : (
                      <Button size="sm" variant="outline" className="border-border">
                        Продолжить
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Progress value={c.progress} className="h-2" />
                    <span className="font-mono text-xs text-muted-foreground w-9 text-right">{c.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
