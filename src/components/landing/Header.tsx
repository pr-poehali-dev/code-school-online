import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const links = [
  { label: 'Курсы', href: '#courses' },
  { label: 'Кабинет', href: '#dashboard' },
  { label: 'Уроки', href: '#lesson' },
  { label: 'О школе', href: '#about' },
  { label: 'FAQ', href: '#faq' },
];

const Header = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 glass">
      <div className="container flex items-center justify-between h-16">
        <a href="#top" className="flex items-center gap-2 font-mono font-extrabold text-lg">
          <span className="text-primary">{'{'}</span>
          <span>CodeBase</span>
          <span className="text-primary">{'}'}</span>
        </a>

        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" className="font-medium">
            Войти
          </Button>
          <Button size="sm" className="font-semibold glow-green">
            Начать учиться
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          <Icon name={open ? 'X' : 'Menu'} size={26} />
        </button>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-border animate-fade-up" style={{ animationDelay: '0s' }}>
          <div className="container py-4 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base text-muted-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
            <Button className="mt-2 font-semibold">Начать учиться</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
