import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { dashboardApi, QuizQuestion, ExamResult } from '@/lib/api';

interface Props {
  courseId: string;
  courseTitle: string;
  questions: QuizQuestion[];
  unlocked: boolean;
  result: ExamResult | null;
  onResult: (r: ExamResult) => void;
}

const ExamPanel = ({ courseId, courseTitle, questions, unlocked, result, onResult }: Props) => {
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [busy, setBusy] = useState(false);
  const [lastResult, setLastResult] = useState<ExamResult | null>(result);

  const total = questions.length;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === total && total > 0;

  if (!unlocked) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
          <Icon name="Lock" size={28} className="text-muted-foreground" />
        </div>
        <h3 className="font-bold text-lg mb-2">Финальный экзамен закрыт</h3>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          Пройди все уроки курса, чтобы открыть итоговое тестирование и проверить свои знания.
        </p>
      </div>
    );
  }

  const submit = async () => {
    setBusy(true);
    try {
      const arr = questions.map((_, i) => (answers[i] !== undefined ? answers[i] : -1));
      const res = await dashboardApi.submitExam(courseId, arr);
      setLastResult(res);
      onResult(res);
      if (res.passed) {
        const xp = res.xp_gained ? ` +${res.xp_gained} XP ⚡` : '';
        toast.success(`Экзамен сдан! ${res.percent}%${xp} 🎉`);
      } else {
        toast.error(`Недостаточно: ${res.percent}%. Попробуй ещё раз`);
      }
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const retry = () => {
    setStarted(true);
    setAnswers({});
    setLastResult(null);
  };

  // Экран результата
  if (lastResult && !started) {
    const grade = lastResult.percent >= 90 ? 'Отлично' : lastResult.percent >= 70 ? 'Хорошо' : 'Стоит повторить';
    const color = lastResult.passed ? 'hsl(152 90% 52%)' : 'hsl(0 84% 60%)';
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <div className="relative w-32 h-32 mx-auto mb-5">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="none" stroke="hsl(230 25% 18%)" strokeWidth="8" />
            <circle
              cx="50" cy="50" r="44" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
              strokeDasharray={`${(lastResult.percent / 100) * 276} 276`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold font-mono">{lastResult.percent}%</span>
          </div>
        </div>
        <div className="text-xl font-bold mb-1">{lastResult.passed ? '🎓 Экзамен сдан!' : 'Экзамен не сдан'}</div>
        <p className="text-muted-foreground text-sm mb-1">
          Правильных ответов: {lastResult.score} из {lastResult.total}
        </p>
        <div className="inline-block font-mono text-sm px-3 py-1 rounded-full mb-6"
          style={{ background: `${color.replace(')', ' / 0.15)')}`, color }}>
          Оценка: {grade}
        </div>
        <div>
          <Button onClick={retry} variant="outline" className="border-border">
            <Icon name="RotateCcw" size={16} className="mr-1" /> Пройти заново
          </Button>
        </div>
      </div>
    );
  }

  // Стартовый экран
  if (!started) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-4">
          <Icon name="GraduationCap" size={30} className="text-primary" />
        </div>
        <h3 className="font-bold text-xl mb-2">Финальный экзамен</h3>
        <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
          Итоговая проверка по курсу «{courseTitle}». {total} вопросов по всему материалу.
          Для успешной сдачи нужно набрать 70% и выше.
        </p>
        <Button onClick={() => setStarted(true)} className="font-semibold glow-green h-12 px-7">
          Начать экзамен
          <Icon name="ArrowRight" size={18} className="ml-1" />
        </Button>
      </div>
    );
  }

  // Процесс экзамена
  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <Icon name="GraduationCap" size={20} className="text-primary" />
        <h3 className="font-bold text-lg">Финальный экзамен</h3>
        <span className="ml-auto font-mono text-xs text-muted-foreground">{answeredCount} / {total}</span>
      </div>

      <div className="space-y-6">
        {questions.map((q, qi) => (
          <div key={qi}>
            <p className="font-semibold mb-3">{qi + 1}. {q.q}</p>
            <div className="space-y-2">
              {q.options.map((opt, oi) => {
                const picked = answers[qi] === oi;
                return (
                  <button
                    key={oi}
                    onClick={() => setAnswers((p) => ({ ...p, [qi]: oi }))}
                    className={`w-full text-left px-4 py-3 rounded-xl border font-mono text-sm transition-all flex items-center gap-3
                      ${picked ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-background/40 hover:border-primary/60'}`}
                  >
                    <span className="w-6 h-6 rounded-md bg-secondary flex items-center justify-center text-xs shrink-0">
                      {String.fromCharCode(65 + oi)}
                    </span>
                    {opt}
                    {picked && <Icon name="Check" size={16} className="ml-auto" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <Button
        onClick={submit}
        disabled={busy || !allAnswered}
        className="w-full h-12 font-semibold glow-green mt-6"
      >
        {allAnswered ? 'Завершить экзамен и узнать результат' : `Ответь на все вопросы (${answeredCount}/${total})`}
      </Button>
    </div>
  );
};

export default ExamPanel;