-- Курс по написанию промптов для ИИ (базовый уровень)
INSERT INTO t_p80207328_code_school_online.courses
    (id, title, lang, icon, color, level, lessons, hours, price, description, tags, category, tier)
VALUES (
    'ai-prompting',
    'Промпты для ИИ: полный курс',
    'Prompt Engineering',
    '🤖',
    '265 85% 65%',
    'Базовый',
    16,
    28,
    999,
    'Научись писать промпты для ChatGPT, Claude, Midjourney и других ИИ так, чтобы получать именно тот результат, который нужен. От основ до продвинутых техник: роли, контекст, цепочки рассуждений, работа с изображениями и автоматизация.',
    'ИИ,Промпты,ChatGPT,VPN',
    'general',
    'base'
)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    lang = EXCLUDED.lang,
    icon = EXCLUDED.icon,
    color = EXCLUDED.color,
    level = EXCLUDED.level,
    lessons = EXCLUDED.lessons,
    hours = EXCLUDED.hours,
    price = EXCLUDED.price,
    description = EXCLUDED.description,
    tags = EXCLUDED.tags,
    category = EXCLUDED.category,
    tier = EXCLUDED.tier;