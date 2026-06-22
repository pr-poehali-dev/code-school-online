import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const stats = [
  { value: '12K+', label: 'учеников' },
  { value: '40+', label: 'курсов' },
  { value: '4.9', label: 'рейтинг' },
];

const Hero = () => {
  return (
    <section id="top" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden grid-bg">
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/20 rounded-full blur-[120px]" />

      <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-mono text-primary mb-6 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            набор открыт · старт в любой день
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05] mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            Научись писать{' '}
            <span className="text-gradient font-mono">код</span>
            <br />
            <span className="cursor-blink">с нуля</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-md mb-8 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Онлайн-школа базового программирования. Понятные уроки, практика и тесты — без скучной теории.
          </p>

          <div className="flex flex-wrap gap-4 mb-12 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Button size="lg" className="font-semibold glow-green h-12 px-7">
              Выбрать курс
              <Icon name="ArrowRight" size={18} className="ml-1" />
            </Button>
            <Button size="lg" variant="outline" className="font-semibold h-12 px-7 border-border">
              <Icon name="Play" size={16} className="mr-1" />
              Как это работает
            </Button>
          </div>

          <div className="flex gap-8 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl md:text-3xl font-extrabold font-mono text-primary">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <div className="absolute -inset-4 bg-gradient-to-tr from-primary/30 to-accent/30 rounded-3xl blur-2xl opacity-60" />
          <div className="relative glass rounded-2xl p-1.5 animate-float">
            <div className="flex items-center gap-2 px-4 py-3">
              <span className="w-3 h-3 rounded-full bg-destructive/80" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <span className="w-3 h-3 rounded-full bg-primary/80" />
              <span className="ml-2 text-xs font-mono text-muted-foreground">lesson_01.py</span>
            </div>
            <div className="bg-background/80 rounded-xl p-5 font-mono text-sm leading-relaxed">
              <div><span className="text-accent">def</span> <span className="text-primary">learn</span>(student):</div>
              <div className="pl-4 text-muted-foreground"># твой путь в IT</div>
              <div className="pl-4"><span className="text-accent">while</span> student.motivated:</div>
              <div className="pl-8">student.skills += <span className="text-primary">1</span></div>
              <div className="pl-8"><span className="text-accent">print</span>(<span className="text-yellow-400">"Уровень повышен 🚀"</span>)</div>
              <div className="pl-4"><span className="text-accent">return</span> <span className="text-yellow-400">"job_offer"</span> <span className="cursor-blink" /></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
