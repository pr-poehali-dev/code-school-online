import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { courses } from '@/data/courses';

const tierSections = [
  { key: 'starter', emoji: '🚀', title: 'Без опыта', subtitle: 'Бесплатный старт — прощупай интерфейс и напиши первый код' },
  { key: 'base', emoji: '📘', title: 'Базовый уровень', subtitle: 'Учим программировать с нуля — основные языки и инструменты' },
  { key: 'pro', emoji: '⚡', title: 'Опытный уровень', subtitle: 'Самостоятельная практика — доступно после прохождения React' },
] as const;

const Courses = () => {
  return (
    <section id="courses" className="py-20 md:py-28 relative">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="font-mono text-sm text-primary mb-3">// каталог курсов</p>
            <h2 className="text-3xl md:text-5xl font-extrabold">
              Путь от нуля до профи
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm">
            Три уровня сложности: начни бесплатно, освой основы и собери своё приложение сам.
          </p>
        </div>

        <div className="space-y-14">
          {tierSections.map((section) => {
            const list = courses.filter((c) => c.tier === section.key);
            if (list.length === 0) return null;
            return (
              <div key={section.key}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center text-2xl">
                    {section.emoji}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold leading-tight">{section.title}</h3>
                    <p className="text-sm text-muted-foreground">{section.subtitle}</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {list.map((c, i) => {
                    const isFree = c.price === 0;
                    const isPro = c.tier === 'pro';
                    return (
                      <div
                        key={c.id}
                        className="group relative glass rounded-2xl p-6 hover-scale animate-fade-up overflow-hidden"
                        style={{ animationDelay: `${i * 0.08}s` }}
                      >
                        <div
                          className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity"
                          style={{ background: `hsl(${c.color})` }}
                        />
                        <div className="relative">
                          <div className="flex items-start justify-between mb-5">
                            <div
                              className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
                              style={{ background: `hsl(${c.color} / 0.15)` }}
                            >
                              {c.icon}
                            </div>
                            {isFree && (
                              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/15 text-primary">
                                Бесплатно
                              </span>
                            )}
                            {isPro && (
                              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-secondary text-muted-foreground flex items-center gap-1">
                                <Icon name="Lock" size={11} /> После React
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-mono text-xs px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                              {c.level}
                            </span>
                          </div>

                          <h3 className="text-lg font-bold mb-2">{c.title}</h3>
                          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{c.desc}</p>

                          <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono mb-5">
                            <span className="flex items-center gap-1">
                              <Icon name="BookOpen" size={14} /> {c.lessons} уроков
                            </span>
                            <span className="flex items-center gap-1">
                              <Icon name="Clock" size={14} /> {c.hours} ч
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-border">
                            <span className={`font-mono font-bold text-lg ${isFree ? 'text-primary' : ''}`}>
                              {isFree ? '0 ₽' : `${c.price} ₽`}
                            </span>
                            <Link to="/login">
                              <Button size="sm" className="font-semibold rounded-lg">
                                {isFree ? 'Начать' : 'Купить'}
                                <Icon name="ArrowRight" size={15} className="ml-1" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Courses;