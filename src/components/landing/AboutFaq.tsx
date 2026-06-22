import Icon from '@/components/ui/icon';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const teachers = [
  { name: 'Мария Лебедева', role: 'Python · Backend', exp: '8 лет в IT', icon: '👩‍💻' },
  { name: 'Игорь Соколов', role: 'JavaScript · Frontend', exp: 'ex-Яндекс', icon: '🧑‍💻' },
  { name: 'Анна Дроздова', role: 'HTML/CSS · Дизайн', exp: '120+ проектов', icon: '👩‍🎨' },
];

const method = [
  { icon: 'Video', title: 'Видео + конспект', desc: 'Смотришь короткий урок и читаешь понятный конспект.' },
  { icon: 'Code', title: 'Практика сразу', desc: 'Закрепляешь знания на реальных задачах и тестах.' },
  { icon: 'TrendingUp', title: 'Трекинг прогресса', desc: 'Видишь свой рост и статистику по каждому курсу.' },
];

const faq = [
  { q: 'Как работает оплата курсов?', a: 'Ты пополняешь баланс личного кабинета любым удобным способом, а затем покупаешь курсы и отдельные уроки прямо с баланса в один клик.' },
  { q: 'Нужны ли начальные знания?', a: 'Нет. Наши базовые курсы рассчитаны на полный ноль — мы объясняем каждый термин простыми словами.' },
  { q: 'Останется ли доступ к курсу навсегда?', a: 'Да, после покупки курс остаётся в твоём кабинете навсегда, включая все будущие обновления материалов.' },
  { q: 'Есть ли практические задания?', a: 'Конечно! После каждого блока ждут тесты и практические задания с автоматической проверкой и начислением XP.' },
  { q: 'Можно ли учиться с телефона?', a: 'Да, платформа полностью адаптирована под мобильные устройства и планшеты — учись где угодно.' },
];

const AboutFaq = () => {
  return (
    <>
      <section id="about" className="py-20 md:py-28 bg-secondary/30">
        <div className="container">
          <div className="text-center mb-12">
            <p className="font-mono text-sm text-primary mb-3">// о школе</p>
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4">Учим понятно и по делу</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              CodeBase — это методика «от простого к сложному»: меньше теории, больше практики и поддержка наставников.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-16">
            {method.map((m, i) => (
              <div key={m.title} className="glass rounded-2xl p-6 animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-4">
                  <Icon name={m.icon} size={22} className="text-primary" />
                </div>
                <h3 className="font-bold mb-2">{m.title}</h3>
                <p className="text-sm text-muted-foreground">{m.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="text-center font-mono text-sm text-primary mb-8">// наши преподаватели</h3>
          <div className="grid sm:grid-cols-3 gap-5">
            {teachers.map((t) => (
              <div key={t.name} className="glass rounded-2xl p-6 text-center hover-scale">
                <div className="text-5xl mb-4">{t.icon}</div>
                <div className="font-bold">{t.name}</div>
                <div className="text-sm text-primary font-mono">{t.role}</div>
                <div className="text-xs text-muted-foreground mt-1">{t.exp}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 md:py-28">
        <div className="container max-w-3xl">
          <div className="text-center mb-12">
            <p className="font-mono text-sm text-primary mb-3">// частые вопросы</p>
            <h2 className="text-3xl md:text-5xl font-extrabold">Вопросы и ответы</h2>
          </div>

          <Accordion type="single" collapsible className="space-y-3">
            {faq.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="glass rounded-xl px-5 border-none"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline hover:text-primary">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
};

export default AboutFaq;
