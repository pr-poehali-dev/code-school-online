import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const links = [
  { label: 'Курсы', href: '#courses' },
  { label: 'Уроки', href: '#lesson' },
  { label: 'О школе', href: '#about' },
  { label: 'FAQ', href: '#faq' },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const { isAuthed } = useAuth();

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
          {isAuthed ? (
            <Link to="/cabinet">
              <Button size="sm" className="font-semibold glow-green">
                <Icon name="LayoutDashboard" size={16} className="mr-1" />
                Личный кабинет
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="font-medium">Войти</Button>
              </Link>
              <Link to="/login">
                <Button size="sm" className="font-semibold glow-green">Начать учиться</Button>
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          <Icon name={open ? 'X' : 'Menu'} size={26} />
        </button>
      </div>

      {open && (
        <div className="md:hidden glass border-t border-border">
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
            <Link to={isAuthed ? '/cabinet' : '/login'} onClick={() => setOpen(false)}>
              <Button className="mt-2 w-full font-semibold">
                {isAuthed ? 'Личный кабинет' : 'Начать учиться'}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
