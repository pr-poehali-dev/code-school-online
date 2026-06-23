import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { dashboardApi, ExamResult } from '@/lib/api';

interface Props {
  courseId: string;
  courseTitle: string;
  unlocked: boolean;
  result: ExamResult | null;
  onResult: (r: ExamResult) => void;
}

interface CheckResult {
  ok: boolean;
  output?: string;
  hints: string[];
}

// Подробная проверка команды print("любой текст")
function checkPrint(raw: string): CheckResult {
  const hints: string[] = [];
  const code = raw.trim();

  if (!code) {
    return { ok: false, hints: ['Поле пустое. Напиши команду для вывода текста.'] };
  }

  // 0. Должна быть ровно одна команда в одной строке
  const nonEmptyLines = code.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
  if (nonEmptyLines.length > 1) {
    return {
      ok: false,
      hints: ['Здесь нужна только одна команда. Ты написал несколько строк — оставь одну команду вывода текста, остальные удали.'],
    };
  }

  // Несколько вызовов в одной строке тоже не годятся для этого задания
  const openCountAll = (code.match(/\(/g) || []).length;
  if (openCountAll > 1) {
    return {
      ok: false,
      hints: ['В строке несколько команд. Для этого задания нужна только одна команда вывода текста — оставь одну, лишнее убери.'],
    };
  }

  // 1. Проверяем имя функции print
  const funcMatch = code.match(/^([A-Za-zА-Яа-я_][\w]*)\s*\(/);
  const funcName = funcMatch ? funcMatch[1] : '';

  if (!funcName) {
    if (!code.includes('(')) {
      hints.push('Не хватает скобок ( ). Команда вызывается так: print(...). Без скобок Python не поймёт, что это вызов функции.');
    } else {
      hints.push('Перед скобками должно стоять имя команды. Напиши print перед открывающей скобкой.');
    }
  } else if (funcName !== 'print') {
    if (['Print', 'PRINT'].includes(funcName)) {
      hints.push(`Команда написана с заглавной буквы: «${funcName}». Python чувствителен к регистру — пиши строчными буквами: print.`);
    } else if (['echo', 'console', 'log', 'printf', 'cout', 'write', 'say', 'show', 'display'].includes(funcName.toLowerCase())) {
      hints.push(`«${funcName}» — это не команда Python для вывода текста. В Python текст выводит команда print.`);
    } else {
      hints.push(`«${funcName}» — неизвестная команда. Для вывода текста в Python используется print.`);
    }
  }

  // 2. Проверяем скобки
  const openCount = (code.match(/\(/g) || []).length;
  const closeCount = (code.match(/\)/g) || []).length;
  if (openCount === 0) {
    hints.push('Не хватает открывающей скобки «(» после print.');
  }
  if (closeCount === 0) {
    hints.push('Не хватает закрывающей скобки «)» в конце команды.');
  }
  if (openCount > 0 && closeCount > 0 && openCount !== closeCount) {
    hints.push(`Скобки не сбалансированы: открывающих «(» — ${openCount}, закрывающих «)» — ${closeCount}. Их должно быть поровну.`);
  }

  // Достаём содержимое внутри внешних скобок
  const inner = code.slice(code.indexOf('(') + 1, code.lastIndexOf(')'));
  const innerTrim = (openCount > 0 && closeCount > 0) ? inner.trim() : '';

  // 3. Проверяем кавычки вокруг текста
  const doubleQuotes = (innerTrim.match(/"/g) || []).length;
  const singleQuotes = (innerTrim.match(/'/g) || []).length;

  if (innerTrim.length > 0) {
    const hasOpeningQuote = /^["']/.test(innerTrim);
    const hasClosingQuote = /["']$/.test(innerTrim);

    if (doubleQuotes === 0 && singleQuotes === 0) {
      // текст без кавычек
      if (/^[A-Za-z_]\w*$/.test(innerTrim)) {
        hints.push(`Текст «${innerTrim}» написан без кавычек, поэтому Python ищет переменную с таким именем, а не выводит текст. Оберни текст в кавычки.`);
      } else {
        hints.push('Текст внутри скобок нужно обернуть в кавычки — двойные "…" или одинарные \'…\'. Без кавычек Python не понимает, что это текст для вывода.');
      }
    } else if (doubleQuotes === 1 || singleQuotes === 1) {
      hints.push('Кавычка не закрыта. Текст должен быть с двух сторон в кавычках: открывающая и закрывающая.');
    } else if (!hasOpeningQuote) {
      hints.push('Открывающая кавычка должна стоять сразу после открывающей скобки «(».');
    } else if (!hasClosingQuote) {
      hints.push('Закрывающая кавычка должна стоять прямо перед закрывающей скобкой «)».');
    } else if (doubleQuotes % 2 !== 0) {
      hints.push('Двойные кавычки не парные — проверь, что каждая открывающая " имеет закрывающую.');
    } else if (singleQuotes % 2 !== 0) {
      hints.push("Одинарные кавычки не парные — проверь, что каждая открывающая ' имеет закрывающую.");
    }
  } else if (openCount > 0 && closeCount > 0) {
    hints.push('Внутри скобок пусто. Напиши текст в кавычках, который нужно вывести.');
  }

  // 4. Проверяем, что после закрывающей скобки нет ничего лишнего
  if (openCount > 0 && closeCount > 0) {
    const afterParen = code.slice(code.lastIndexOf(')') + 1).trim();
    if (afterParen.length > 0) {
      if (afterParen === ',' || afterParen.startsWith(',')) {
        hints.push('После закрывающей скобки стоит лишняя запятая. Команда print должна заканчиваться на «)», без запятой в конце — иначе Python создаст кортеж, а не просто выведет текст.');
      } else {
        hints.push(`После закрывающей скобки «)» есть лишние символы: «${afterParen}». Команда должна заканчиваться ровно на «)».`);
      }
    }
  }

  // Если ошибок нет — всё верно
  if (hints.length === 0 && funcName === 'print') {
    // извлекаем сам текст без кавычек для «вывода»
    const text = innerTrim.replace(/^["']|["']$/g, '');
    return { ok: true, output: text, hints: [] };
  }

  return { ok: false, hints };
}

const CodeExamPanel = ({ courseId, courseTitle, unlocked, result, onResult }: Props) => {
  const [started, setStarted] = useState(false);
  const [code, setCode] = useState('');
  const [check, setCheck] = useState<CheckResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [lastResult, setLastResult] = useState<ExamResult | null>(result);
  const [attempts, setAttempts] = useState(0);
  const [failedAttempts, setFailedAttempts] = useState(0);

  const PENALTY_PER_FAIL = 5;
  const MAX_REWARD = 30;
  const MIN_REWARD = 5;
  const projectedReward = Math.max(MIN_REWARD, MAX_REWARD - failedAttempts * PENALTY_PER_FAIL);

  if (!unlocked) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
          <Icon name="Lock" size={28} className="text-muted-foreground" />
        </div>
        <h3 className="font-bold text-lg mb-2">Финальный экзамен закрыт</h3>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          Пройди все уроки курса, чтобы открыть итоговое практическое задание.
        </p>
      </div>
    );
  }

  const run = () => {
    const res = checkPrint(code);
    setCheck(res);
  };

  const submit = async () => {
    const res = checkPrint(code);
    setCheck(res);
    setAttempts((a) => a + 1);
    if (!res.ok) {
      // неудачная попытка с подсказками — снижает будущую награду
      setFailedAttempts((f) => f + 1);
      toast.error('В коде есть ошибки — исправь их по подсказкам ниже');
      return;
    }
    setBusy(true);
    try {
      const penalty = failedAttempts * PENALTY_PER_FAIL;
      const examRes = await dashboardApi.submitExam(courseId, [1], penalty);
      setLastResult(examRes);
      onResult(examRes);
      const xp = examRes.xp_gained ? ` +${examRes.xp_gained} XP ⚡` : '';
      toast.success(`Задание выполнено! Экзамен сдан 🎉${xp}`);
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  const retry = () => {
    setStarted(true);
    setCode('');
    setCheck(null);
    setLastResult(null);
    setAttempts(0);
    setFailedAttempts(0);
  };

  // Экран результата
  if (lastResult && !started) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <div className="w-20 h-20 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-5">
          <Icon name="CheckCircle2" size={38} className="text-primary" />
        </div>
        <div className="text-xl font-bold mb-2">🎓 Практический экзамен сдан!</div>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto mb-6">
          Ты самостоятельно написал рабочую команду вывода текста. Это твой первый настоящий код!
        </p>
        <Button onClick={retry} variant="outline" className="border-border">
          <Icon name="RotateCcw" size={16} className="mr-1" /> Пройти заново
        </Button>
      </div>
    );
  }

  // Стартовый экран
  if (!started) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-4">
          <Icon name="Terminal" size={30} className="text-primary" />
        </div>
        <h3 className="font-bold text-xl mb-2">Практический экзамен</h3>
        <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
          Итоговое задание по курсу «{courseTitle}». Тебе нужно самому написать рабочую
          команду вывода текста на экран — как настоящий программист. Если ошибёшься,
          подскажу, что именно не так, но каждая попытка с подсказкой снижает награду
          на {PENALTY_PER_FAIL} XP (с {MAX_REWARD} до минимум {MIN_REWARD}). Решишь сам — получишь максимум.
        </p>
        <Button onClick={() => setStarted(true)} className="font-semibold glow-green h-12 px-7">
          Начать задание
          <Icon name="ArrowRight" size={18} className="ml-1" />
        </Button>
      </div>
    );
  }

  // Процесс экзамена — редактор кода
  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Terminal" size={20} className="text-primary" />
        <h3 className="font-bold text-lg">Практическое задание</h3>
        <span className="ml-auto flex items-center gap-2 font-mono text-xs">
          <span className="text-muted-foreground" title="Сделано попыток сдать">
            Попытки: {attempts}
          </span>
          <span className={`px-2 py-0.5 rounded-full ${projectedReward === MAX_REWARD ? 'bg-primary/15 text-primary' : 'bg-yellow-500/15 text-yellow-500'}`}
            title="Награда снижается за неверные попытки с подсказками">
            <Icon name="Zap" size={11} className="inline mr-0.5" />{projectedReward} XP
          </span>
        </span>
      </div>

      <div className="rounded-xl bg-accent/10 border border-accent/30 p-4 mb-5">
        <p className="text-sm">
          <span className="font-semibold">Задание:</span> напиши команду, которая выведет на экран
          любой текст по твоему выбору. Вспомни, какую команду для вывода текста ты изучил в уроках,
          и примени её самостоятельно — это твой мини-экзамен.
        </p>
      </div>

      {/* Редактор */}
      <label className="text-sm font-medium mb-2 block">Твой код</label>
      <div className="rounded-xl overflow-hidden border border-border bg-[#0d1117] mb-3">
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-border bg-background/40">
          <span className="w-3 h-3 rounded-full bg-red-500/70" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-2 font-mono text-xs text-muted-foreground">main.py</span>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          rows={3}
          placeholder='Напиши свою команду здесь...'
          className="w-full bg-transparent text-green-400 font-mono text-sm p-4 outline-none resize-none placeholder:text-muted-foreground/50"
        />
      </div>

      <div className="flex gap-2 mb-5">
        <Button onClick={run} variant="outline" className="border-border font-semibold">
          <Icon name="Play" size={15} className="mr-1.5" /> Предпросмотр кода
        </Button>
        <Button onClick={submit} disabled={busy} className="font-semibold glow-green flex-1">
          <Icon name="Check" size={16} className="mr-1.5" /> Проверить и сдать
        </Button>
      </div>

      {/* Результат проверки */}
      {check && check.ok && (
        <div className="rounded-xl border border-primary/40 bg-primary/10 p-4">
          <div className="flex items-center gap-2 mb-2 text-primary font-semibold text-sm">
            <Icon name="CheckCircle2" size={16} /> Код верный! Вывод программы:
          </div>
          <div className="font-mono text-sm bg-[#0d1117] rounded-lg p-3 text-green-400">
            {check.output || '(пустая строка)'}
          </div>
        </div>
      )}

      {check && !check.ok && (
        <div className="rounded-xl border border-destructive/40 bg-destructive/10 p-4">
          <div className="flex items-center gap-2 mb-3 text-destructive font-semibold text-sm">
            <Icon name="XCircle" size={16} /> В коде есть ошибки:
          </div>
          <ul className="space-y-2.5">
            {check.hints.map((h, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <Icon name="AlertCircle" size={15} className="text-destructive shrink-0 mt-0.5" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
          {failedAttempts > 0 && projectedReward > MIN_REWARD && (
            <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border flex items-center gap-1.5">
              <Icon name="TrendingDown" size={13} className="text-yellow-500" />
              За использование подсказок награда снижена до {projectedReward} XP. Реши сам — получишь больше.
            </p>
          )}
          {failedAttempts > 0 && projectedReward === MIN_REWARD && (
            <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-border flex items-center gap-1.5">
              <Icon name="TrendingDown" size={13} className="text-yellow-500" />
              Награда за это задание сейчас минимальная — {MIN_REWARD} XP.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CodeExamPanel;