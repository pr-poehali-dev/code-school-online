import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer id="contacts" className="border-t border-border bg-secondary/30">
      <div className="container py-16">
        <div className="glass rounded-3xl p-8 md:p-12 mb-16 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-primary/20 rounded-full blur-[100px]" />
          <div className="relative">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-3">
              Готов написать свой первый <span className="text-gradient font-mono">код</span>?
            </h2>
            <p className="text-muted-foreground mb-7 max-w-md mx-auto">
              Оставь почту — пришлём бесплатный вводный урок и подберём курс под тебя.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                placeholder="your@email.com"
                className="h-12 bg-background/60 border-border font-mono"
              />
              <Button size="lg" className="h-12 font-semibold glow-green shrink-0">
                Получить урок
              </Button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-mono font-extrabold text-lg mb-4">
              <span className="text-primary">{'{'}</span>
              CodeBase
              <span className="text-primary">{'}'}</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs mb-5">
              Онлайн-школа базового программирования. Превращаем новичков в уверенных разработчиков.
            </p>
            <div className="flex gap-3">
              {['Send', 'Github', 'Youtube', 'Instagram'].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="w-10 h-10 rounded-lg glass flex items-center justify-center hover:text-primary transition-colors"
                >
                  <Icon name={s} size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="font-semibold mb-4">Навигация</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#courses" className="hover:text-primary transition-colors">Курсы</a></li>
              <li><a href="#dashboard" className="hover:text-primary transition-colors">Кабинет</a></li>
              <li><a href="#about" className="hover:text-primary transition-colors">О школе</a></li>
              <li><a href="#faq" className="hover:text-primary transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold mb-4">Контакты</div>
            <ul className="space-y-2 text-sm text-muted-foreground font-mono">
              <li className="flex items-center gap-2"><Icon name="Mail" size={15} /> <a href="mailto:codebaseschool@yandex.ru" className="hover:text-primary transition-colors">codebaseschool@yandex.ru</a></li>
              <li className="flex items-center gap-2"><Icon name="Phone" size={15} /> 8 800 555-35-35</li>
              <li className="flex items-center gap-2"><Icon name="MessageCircle" size={15} /> @codebase_support</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border flex flex-col sm:flex-row justify-between gap-3 text-xs text-muted-foreground font-mono">
          <span>© 2026 CodeBase. Все права защищены.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-primary transition-colors">Политика</a>
            <a href="#" className="hover:text-primary transition-colors">Оферта</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;