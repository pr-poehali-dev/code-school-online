import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { lessonPlan, quiz } from '@/data/courses';

const LessonPlayer = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const current = quiz[0];

  const check = (i: number) => {
    setSelected(i);
    setAnswered(true);
  };

  return (
    <section id="lesson" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-12">
          <p className="font-mono text-sm text-primary mb-3">// учебный класс</p>
          <h2 className="text-3xl md:text-5xl font-extrabold">Уроки и практика</h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Плеер + контент */}
          <div className="lg:col-span-2 space-y-5">
            <div className="glass rounded-2xl overflow-hidden">
              <div className="relative aspect-video bg-background/80 grid-bg flex items-center justify-center group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10" />
                <button className="relative w-20 h-20 rounded-full bg-primary flex items-center justify-center glow-green group-hover:scale-110 transition-transform">
                  <Icon name="Play" size={30} className="text-background ml-1" />
                </button>
                <span className="absolute bottom-4 left-4 font-mono text-xs px-2 py-1 rounded bg-background/70">
                  Урок 4 · Циклы: повторяем действия
                </span>
              </div>
            </div>

            {/* Тест */}
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <Icon name="ListChecks" size={20} className="text-primary" />
                <h3 className="font-bold text-lg">Практический тест</h3>
                <span className="ml-auto font-mono text-xs text-muted-foreground">1 / {quiz.length}</span>
              </div>

              <p className="font-semibold mb-5">{current.q}</p>

              <div className="space-y-3">
                {current.options.map((opt, i) => {
                  const isCorrect = answered && i === current.correct;
                  const isWrong = answered && i === selected && i !== current.correct;
                  return (
                    <button
                      key={i}
                      onClick={() => check(i)}
                      disabled={answered}
                      className={`w-full text-left px-4 py-3 rounded-xl border font-mono text-sm transition-all flex items-center gap-3
                        ${isCorrect ? 'border-primary bg-primary/10 text-primary' : ''}
                        ${isWrong ? 'border-destructive bg-destructive/10 text-destructive' : ''}
                        ${!answered ? 'border-border bg-background/40 hover:border-primary/60 hover:bg-background/70' : ''}
                        ${answered && !isCorrect && !isWrong ? 'border-border opacity-50' : ''}
                      `}
                    >
                      <span className="w-6 h-6 rounded-md bg-secondary flex items-center justify-center text-xs shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                      {isCorrect && <Icon name="Check" size={16} className="ml-auto" />}
                      {isWrong && <Icon name="X" size={16} className="ml-auto" />}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div className="mt-5 flex items-center justify-between animate-fade-up">
                  <span className={`text-sm font-medium ${selected === current.correct ? 'text-primary' : 'text-destructive'}`}>
                    {selected === current.correct ? '🎉 Верно! +10 XP' : '❌ Попробуй ещё раз'}
                  </span>
                  <Button size="sm" onClick={() => { setAnswered(false); setSelected(null); }} variant="outline" className="border-border">
                    Дальше
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Список уроков */}
          <div className="glass rounded-2xl p-6">
            <h3 className="font-bold text-lg mb-5">Программа курса</h3>
            <div className="space-y-2">
              {lessonPlan.map((l) => (
                <div
                  key={l.id}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                    l.locked ? 'opacity-50' : 'hover:bg-background/50 cursor-pointer'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      l.done ? 'bg-primary text-background' : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    <Icon name={l.done ? 'Check' : l.locked ? 'Lock' : 'Play'} size={15} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{l.title}</div>
                    <div className="font-mono text-xs text-muted-foreground">{l.duration}</div>
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

export default LessonPlayer;
