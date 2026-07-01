import Icon from '@/components/ui/icon';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger,
} from '@/components/ui/dialog';

const TELEGRAM_URL = 'https://t.me/+RFFL7zzQh8I4MmZi';
const VK_URL = 'https://vk.com';
const EMAIL = 'codebaseschool@yandex.ru';

const SupportButton = () => (
  <Dialog>
    <DialogTrigger asChild>
      <button
        type="button"
        className="flex items-center justify-center gap-2 w-full h-11 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
      >
        <Icon name="LifeBuoy" size={17} />
        Столкнулись с проблемой?
      </button>
    </DialogTrigger>
    <DialogContent className="glass border-border max-w-sm">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <Icon name="LifeBuoy" size={20} className="text-primary" />
          Нужна помощь?
        </DialogTitle>
      </DialogHeader>
      <p className="text-sm text-muted-foreground -mt-1 mb-2">
        Напиши нам — поможем разобраться. Выбери удобный способ связи:
      </p>
      <div className="space-y-3">
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 w-full p-4 rounded-xl border border-border bg-background/40 hover:border-primary/60 hover:bg-primary/5 transition-all"
        >
          <Icon name="Send" size={22} className="text-primary shrink-0" />
          <div>
            <div className="font-semibold">Telegram</div>
            <div className="text-xs text-muted-foreground">Написать в чат поддержки</div>
          </div>
          <Icon name="ChevronRight" size={18} className="ml-auto text-muted-foreground" />
        </a>
        <a
          href={VK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 w-full p-4 rounded-xl border border-border bg-background/40 hover:border-primary/60 hover:bg-primary/5 transition-all"
        >
          <Icon name="MessageCircle" size={22} className="text-primary shrink-0" />
          <div>
            <div className="font-semibold">ВКонтакте</div>
            <div className="text-xs text-muted-foreground">Написать в сообщения сообщества</div>
          </div>
          <Icon name="ChevronRight" size={18} className="ml-auto text-muted-foreground" />
        </a>
        <a
          href={`mailto:${EMAIL}`}
          className="flex items-center gap-3 w-full p-4 rounded-xl border border-border bg-background/40 hover:border-primary/60 hover:bg-primary/5 transition-all"
        >
          <Icon name="Mail" size={22} className="text-primary shrink-0" />
          <div>
            <div className="font-semibold">Почта</div>
            <div className="text-xs text-muted-foreground">{EMAIL}</div>
          </div>
          <Icon name="ChevronRight" size={18} className="ml-auto text-muted-foreground" />
        </a>
      </div>
    </DialogContent>
  </Dialog>
);

export default SupportButton;