import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { dashboardApi, CourseLessons, Lesson } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

const SoftwareDialog = ({ lesson }: { lesson: Lesson }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" size="sm" className="border-primary/40 text-primary hover:bg-primary/10">
        <Icon name="Wrench" size={15} className="mr-1.5" />
        Что нужно для урока
      </Button>
    </DialogTrigger>
    <DialogContent className="glass border-border max-w-lg max-h-[85vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Icon name="Download" size={20} className="text-primary" />
          Инструменты для урока
        </DialogTitle>
      </DialogHeader>
      <p className="text-sm text-muted-foreground -mt-1 mb-2">
        Здесь всё, что понадобится. Можно работать прямо в браузере — устанавливать ничего не обязательно.
      </p>
      <div className="space-y-4">
        {lesson.software.map((s, i) => (
          <div key={i} className="rounded-xl bg-background/50 border border-border p-4">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div>
                <div className="font-bold flex items-center gap-2">
                  <Icon name="Package" size={16} className="text-primary" />
                  {s.name}
                </div>
                <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
              </div>
            </div>
            <div className="rounded-lg bg-background/60 p-3 mt-2">
              <div className="text-xs font-mono text-primary mb-1.5">// как установить</div>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{s.install}</p>
            </div>
            <a href={s.url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline mt-3 font-medium">
              <Icon name="ExternalLink" size={14} />
              Открыть {s.name}
            </a>
          </div>
        ))}
      </div>
    </DialogContent>
  </Dialog>
);

const Learn = () => {
  const { courseId = '' } = useParams();
  const navigate = useNavigate();
  const { isAuthed, loading: authLoading } = useAuth();
  const [data, setData] = useState<CourseLessons | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const [busy, setBusy] = useState(false);

  // состояние теста
  const [answers, setAnswers] = useState<Record<number, number>>({});

  useEffect(() => {
    if (!authLoading && !isAuthed) navigate('/login');
  }, [authLoading, isAuthed, navigate]);

  const load = () => {
    dashboardApi.getCourseLessons(courseId)
      .then((d) => {
        setData(d);
        const first = d.lessons.findIndex((l) => !l.locked);
        setActiveIdx(first === -1 ? 0 : first);
      })
      .catch((e) => toast.error((e as Error).message))
      .finally(() => setLoading(false));
  };

  useEffect(() => { if (isAuthed) load(); }, [isAuthed, courseId]);

  if (authLoading || loading || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Icon name="Loader2" size={32} className="text-primary animate-spin" />
      </div>
    );
  }

  if (!data.owned) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
        <div className="glass rounded-2xl p-10 text-center max-w-md">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-xl font-bold mb-2">Курс не куплен</h2>
          <p className="text-muted-foreground mb-6">Купи курс в кабинете, чтобы открыть все уроки.</p>
          <Link to="/cabinet"><Button className="font-semibold glow-green">В кабинет</Button></Link>
        </div>
      </div>
    );
  }

  const lesson = data.lessons[activeIdx];
  const total = data.lessons.length;
  const doneCount = data.done_count;
  const progress = Math.round((doneCount / total) * 100);
  const allQuizAnswered = lesson.quiz.length > 0 && lesson.quiz.every((_, i) => answers[i] !== undefined);
  const allCorrect = lesson.quiz.every((q, i) => answers[i] === q.correct);

  const selectLesson = (idx: number, l: Lesson) => {
    if (l.locked) {
      toast.error('Сначала пройди предыдущие уроки');
      return;
    }
    setActiveIdx(idx);
    setAnswers({});
  };

  const answer = (qi: number, oi: number) => {
    if (answers[qi] !== undefined) return;
    setAnswers((prev) => ({ ...prev, [qi]: oi }));
  };

  const finishLesson = async () => {
    if (lesson.quiz.length > 0 && !(allQuizAnswered && allCorrect)) {
      toast.error('Ответь верно на все вопросы теста');
      return;
    }
    setBusy(true);
    try {
      const updated = await dashboardApi.completeLesson(lesson.id);
      setData(updated);
      toast.success('Урок пройден! +10 XP 🎉');
      const next = updated.lessons.findIndex((l, i) => i > activeIdx && !l.locked);
      if (next !== -1) { setActiveIdx(next); setAnswers({}); }
      else toast.success('Поздравляем, курс пройден! 🏆');
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="glass sticky top-0 z-40">
        <div className="container flex items-center justify-between h-16 gap-3">
          <Link to="/cabinet" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors shrink-0">
            <Icon name="ArrowLeft" size={18} /> <span className="hidden sm:inline">в кабинет</span>
          </Link>
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xl">{data.course.icon}</span>
            <span className="font-bold truncate">{data.course.title}</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <Progress value={progress} className="h-2 w-24" />
            <span className="font-mono text-xs text-muted-foreground">{doneCount}/{total}</span>
          </div>
        </div>
      </header>

      <main className="container py-8 grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          {/* Видео */}
          <div className="glass rounded-2xl overflow-hidden">
            <div className="aspect-video bg-black">
              <iframe
                key={lesson.id}
                src={lesson.video_url}
                title={lesson.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="font-mono text-xs text-primary mb-1">
                  Урок {lesson.position} · {lesson.duration}
                </div>
                <h1 className="text-xl font-bold">{lesson.title}</h1>
              </div>
              {lesson.software.length > 0 && <SoftwareDialog lesson={lesson} />}
            </div>
          </div>

          {/* Вступление "для чайников" */}
          {lesson.intro && (
            <div className="glass rounded-2xl p-5 flex gap-3 border-l-2 border-l-primary">
              <Icon name="Lightbulb" size={20} className="text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed">{lesson.intro}</p>
            </div>
          )}

          {/* Пошаговая инструкция */}
          {lesson.steps.length > 0 && (
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <Icon name="ListOrdered" size={20} className="text-primary" />
                <h3 className="font-bold text-lg">Пошагово</h3>
                <span className="font-mono text-xs text-muted-foreground ml-auto">для новичков</span>
              </div>
              <ol className="space-y-4">
                {lesson.steps.map((s, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/15 text-primary font-mono font-bold flex items-center justify-center shrink-0">
                      {i + 1}
                    </div>
                    <div className="pt-0.5">
                      <div className="font-semibold mb-1">{s.title}</div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Конспект (краткий итог) */}
          {lesson.content && (
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="FileText" size={20} className="text-primary" />
                <h3 className="font-bold text-lg">Памятка</h3>
              </div>
              <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line font-sans">
                {lesson.content}
              </div>
            </div>
          )}

          {/* Тест */}
          {lesson.quiz.length > 0 && (
            <div className="glass rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <Icon name="ListChecks" size={20} className="text-primary" />
                <h3 className="font-bold text-lg">Практический тест</h3>
                <span className="ml-auto font-mono text-xs text-muted-foreground">
                  {Object.keys(answers).length} / {lesson.quiz.length}
                </span>
              </div>

              <div className="space-y-6">
                {lesson.quiz.map((q, qi) => (
                  <div key={qi}>
                    <p className="font-semibold mb-3">{qi + 1}. {q.q}</p>
                    <div className="space-y-2">
                      {q.options.map((opt, oi) => {
                        const picked = answers[qi];
                        const answered = picked !== undefined;
                        const isCorrect = answered && oi === q.correct;
                        const isWrong = answered && oi === picked && oi !== q.correct;
                        return (
                          <button
                            key={oi}
                            onClick={() => answer(qi, oi)}
                            disabled={answered}
                            className={`w-full text-left px-4 py-3 rounded-xl border font-mono text-sm transition-all flex items-center gap-3
                              ${isCorrect ? 'border-primary bg-primary/10 text-primary' : ''}
                              ${isWrong ? 'border-destructive bg-destructive/10 text-destructive' : ''}
                              ${!answered ? 'border-border bg-background/40 hover:border-primary/60' : ''}
                              ${answered && !isCorrect && !isWrong ? 'border-border opacity-50' : ''}`}
                          >
                            <span className="w-6 h-6 rounded-md bg-secondary flex items-center justify-center text-xs shrink-0">
                              {String.fromCharCode(65 + oi)}
                            </span>
                            {opt}
                            {isCorrect && <Icon name="Check" size={16} className="ml-auto" />}
                            {isWrong && <Icon name="X" size={16} className="ml-auto" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button
            onClick={finishLesson}
            disabled={busy || lesson.done && activeIdx < doneCount}
            className="w-full h-12 font-semibold glow-green"
          >
            {lesson.done ? 'Урок пройден ✓ Перейти дальше' : 'Завершить урок'}
            <Icon name="ArrowRight" size={18} className="ml-1" />
          </Button>
        </div>

        {/* Список уроков */}
        <div className="glass rounded-2xl p-6 h-fit lg:sticky lg:top-24">
          <h3 className="font-bold text-lg mb-5">Программа курса</h3>
          <div className="space-y-2">
            {data.lessons.map((l, idx) => (
              <button
                key={l.id}
                onClick={() => selectLesson(idx, l)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors text-left
                  ${idx === activeIdx ? 'bg-primary/10 border border-primary/40' : 'hover:bg-background/50'}
                  ${l.locked ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0
                  ${l.done ? 'bg-primary text-background' : 'bg-secondary text-muted-foreground'}`}>
                  <Icon name={l.done ? 'Check' : l.locked ? 'Lock' : 'Play'} size={15} />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{l.title}</div>
                  <div className="font-mono text-xs text-muted-foreground">{l.duration}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Learn;