import { useState, useRef } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

interface Props {
  lang: string;
  sample: string;
  output: string;
}

const editorLinks: Record<string, string> = {
  python: 'https://www.programiz.com/python-programming/online-compiler',
  sql: 'https://sqliteonline.com/',
  jsx: 'https://playcode.io/react',
};

const langLabels: Record<string, string> = {
  javascript: 'JavaScript',
  html: 'HTML + CSS',
  python: 'Python',
  sql: 'SQL',
  jsx: 'React',
};

const CodePlayground = ({ lang, sample, output }: Props) => {
  const [code, setCode] = useState(sample);
  const [consoleOut, setConsoleOut] = useState<string[]>([]);
  const [ran, setRan] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const isLive = lang === 'javascript' || lang === 'html';
  const editorLink = editorLinks[lang];

  const runJs = () => {
    const logs: string[] = [];
    const fakeConsole = {
      log: (...args: unknown[]) => logs.push(args.map(formatArg).join(' ')),
      error: (...args: unknown[]) => logs.push('Ошибка: ' + args.map(formatArg).join(' ')),
      warn: (...args: unknown[]) => logs.push(args.map(formatArg).join(' ')),
    };
    try {
       
      const fn = new Function('console', code);
      fn(fakeConsole);
      if (logs.length === 0) logs.push('(нет вывода — используй console.log)');
    } catch (e) {
      logs.push('Ошибка: ' + (e as Error).message);
    }
    setConsoleOut(logs);
    setRan(true);
  };

  const runHtml = () => {
    setRan(true);
    setTimeout(() => {
      const doc = iframeRef.current?.contentDocument;
      if (doc) {
        doc.open();
        doc.write(`<style>body{font-family:sans-serif;padding:12px;margin:0;color:#111}</style>${code}`);
        doc.close();
      }
    }, 0);
  };

  const run = () => {
    if (lang === 'javascript') runJs();
    else if (lang === 'html') runHtml();
    else setRan(true);
  };

  const reset = () => {
    setCode(sample);
    setConsoleOut([]);
    setRan(false);
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-border bg-[#0d1117]">
      {/* Заголовок окна */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-background/60 border-b border-border">
        <span className="w-3 h-3 rounded-full bg-destructive/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-primary/80" />
        <span className="ml-2 font-mono text-xs text-muted-foreground">
          {langLabels[lang] || 'Код'}
        </span>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={reset} className="h-7 px-2 text-xs">
            <Icon name="RotateCcw" size={13} className="mr-1" /> Сброс
          </Button>
          <Button size="sm" onClick={run} className="h-7 px-3 text-xs font-semibold glow-green">
            <Icon name="Play" size={13} className="mr-1" /> Запустить
          </Button>
        </div>
      </div>

      {/* Редактор */}
      <div className="relative">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          rows={Math.min(Math.max(code.split('\n').length, 4), 18)}
          className="w-full bg-transparent text-[#e6edf3] font-mono text-sm leading-relaxed p-4 resize-none outline-none"
          style={{ tabSize: 2 }}
        />
      </div>

      {/* Результат */}
      {ran && (
        <div className="border-t border-border">
          <div className="px-4 py-2 bg-background/40 font-mono text-xs text-primary flex items-center gap-1.5">
            <Icon name="Terminal" size={13} /> Результат
          </div>

          {lang === 'html' ? (
            <iframe
              ref={iframeRef}
              title="preview"
              className="w-full h-48 bg-white"
            />
          ) : lang === 'javascript' ? (
            <pre className="px-4 py-3 font-mono text-sm text-[#7ee787] whitespace-pre-wrap min-h-[48px]">
              {consoleOut.join('\n')}
            </pre>
          ) : (
            <pre className="px-4 py-3 font-mono text-sm text-[#7ee787] whitespace-pre-wrap min-h-[48px]">
              {output || '(нет вывода)'}
            </pre>
          )}
        </div>
      )}

      {/* Ссылка на редактор для невыполнимых языков */}
      {!isLive && editorLink && (
        <div className="px-4 py-3 border-t border-border bg-background/30">
          <a
            href={editorLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline font-medium"
          >
            <Icon name="ExternalLink" size={14} />
            Запустить по-настоящему в онлайн-редакторе
          </a>
          <p className="text-xs text-muted-foreground mt-1">
            {lang === 'python' && 'Python выполняется в специальном редакторе — скопируй код туда.'}
            {lang === 'sql' && 'SQL-запросы выполняются в тренажёре баз данных.'}
            {lang === 'jsx' && 'React-приложения запускаются в полноценной среде.'}
          </p>
        </div>
      )}
    </div>
  );
};

function formatArg(arg: unknown): string {
  if (typeof arg === 'object' && arg !== null) {
    try { return JSON.stringify(arg); } catch { return String(arg); }
  }
  return String(arg);
}

export default CodePlayground;
