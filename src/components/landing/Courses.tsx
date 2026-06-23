import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { courses } from '@/data/courses';

const Courses = () => {
  return (
    <section id="courses" className="py-20 md:py-28 relative">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="font-mono text-sm text-primary mb-3">// популярные курсы</p>
            <h2 className="text-3xl md:text-5xl font-extrabold">
              Выбери свой язык
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm">
            Каждый курс — это видео-уроки, конспекты и практические задания с проверкой.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {courses.map((c, i) => (
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
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl mb-5"
                  style={{ background: `hsl(${c.color} / 0.15)` }}
                >
                  {c.icon}
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
                  <span className="font-mono font-bold text-lg">{c.price} ₽</span>
                  <Link to="/login">
                    <Button size="sm" className="font-semibold rounded-lg">
                      Купить
                      <Icon name="ArrowRight" size={15} className="ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;