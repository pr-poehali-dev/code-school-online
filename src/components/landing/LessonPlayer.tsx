import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { lessonPlan } from '@/data/courses';
import { useAuth } from '@/context/AuthContext';

const features = [
  { icon: 'Video', title: 'Видео-уроки', desc: 'Короткие понятные ролики с разбором каждой темы.' },
  { icon: 'FileText', title: 'Конспекты', desc: 'Текстовый разбор с примерами кода под каждым уроком.' },
  { icon: 'ListChecks', title: 'Тесты с проверкой', desc: 'Практические задания и автопроверка ответов с XP.' },
];

const LessonPlayer = () => {
  const { isAuthed } = useAuth();

  return (
    <section id="lesson" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center mb-12">
          <p className="font-mono text-sm text-primary mb-3">// учебный класс</p>
          <h2 className="text-3xl md:text-5xl font-extrabold">Уроки и практика</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mt-4">
            После покупки курса открывается личный учебный класс: видео, конспекты и тесты с проверкой прямо в кабинете.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Превью плеера */}
          <div className="lg:col-span-2 glass rounded-2xl overflow-hidden">
            <div className="relative aspect-video bg-background/80 grid-bg flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/10" />
              <Link to={isAuthed ? '/cabinet' : '/login'} className="relative">
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center glow-green group-hover:scale-110 transition-transform">
                  <Icon name="Play" size={30} className="text-background ml-1" />
                </div>
              </Link>
              <span className="absolute bottom-4 left-4 font-mono text-xs px-2 py-1 rounded bg-background/70">
                Урок · Циклы: повторяем действия
              </span>
            </div>
            <div className="p-6 grid sm:grid-cols-3 gap-5">
              {features.map((f) => (
                <div key={f.title}>
                  <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center mb-3">
                    <Icon name={f.icon} size={18} className="text-primary" />
                  </div>
                  <div className="font-semibold text-sm mb-1">{f.title}</div>
                  <p className="text-xs text-muted-foreground">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Программа курса + CTA */}
          <div className="glass rounded-2xl p-6 flex flex-col">
            <h3 className="font-bold text-lg mb-5">Программа курса</h3>
            <div className="space-y-2 mb-6">
              {lessonPlan.slice(0, 5).map((l) => (
                <div
                  key={l.id}
                  className={`flex items-center gap-3 p-3 rounded-xl ${l.locked ? 'opacity-50' : ''}`}
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
            <Link to={isAuthed ? '/cabinet' : '/login'} className="mt-auto">
              <Button className="w-full h-12 font-semibold glow-green">
                <Icon name="GraduationCap" size={18} className="mr-2" />
                Начать обучение
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LessonPlayer;
