import json
import os

import psycopg2
from psycopg2.extras import RealDictCursor


def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])


def cors_headers():
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
        'Access-Control-Max-Age': '86400',
        'Content-Type': 'application/json',
    }


def get_user_id(cur, token: str):
    if not token:
        return None
    cur.execute(
        "SELECT user_id FROM sessions WHERE token=%s AND expires_at > NOW()",
        (token,)
    )
    row = cur.fetchone()
    return row['user_id'] if row else None


def serialize_course(c):
    return {
        'id': c['id'], 'title': c['title'], 'lang': c['lang'], 'icon': c['icon'],
        'color': c['color'], 'level': c['level'], 'lessons': c['lessons'],
        'hours': c['hours'], 'price': c['price'], 'desc': c['description'],
        'tags': c['tags'].split(',') if c['tags'] else [], 'category': c['category'],
    }


def build_state(cur, user_id):
    cur.execute("SELECT id, email, name, avatar, balance FROM users WHERE id=%s", (user_id,))
    user = cur.fetchone()

    cur.execute("SELECT * FROM courses ORDER BY price")
    all_courses = cur.fetchall()
    catalog = {c['id']: c for c in all_courses}

    cur.execute("SELECT course_id FROM purchases WHERE user_id=%s", (user_id,))
    owned_ids = [r['course_id'] for r in cur.fetchall()]

    cur.execute("SELECT course_id, completed_lessons FROM progress WHERE user_id=%s", (user_id,))
    prog = {r['course_id']: r['completed_lessons'] for r in cur.fetchall()}

    my_courses = []
    owned_categories = set()
    for cid in owned_ids:
        c = catalog.get(cid)
        if not c:
            continue
        owned_categories.add(c['category'])
        done = prog.get(cid, 0)
        total = c['lessons'] or 1
        item = serialize_course(c)
        item['completed_lessons'] = done
        item['progress'] = min(100, round(done * 100 / total))
        my_courses.append(item)

    available = [serialize_course(c) for c in all_courses if c['id'] not in owned_ids]

    recommended = [
        serialize_course(c) for c in all_courses
        if c['id'] not in owned_ids and c['category'] in owned_categories
    ][:3]

    total_done = sum(prog.get(cid, 0) for cid in owned_ids)
    stats = {
        'courses': len(owned_ids),
        'lessons_done': total_done,
        'completed_courses': sum(1 for c in my_courses if c['progress'] == 100),
    }

    return {
        'user': {'id': user['id'], 'email': user['email'], 'name': user['name'],
                 'avatar': user['avatar'], 'balance': user['balance']},
        'my_courses': my_courses,
        'available_courses': available,
        'recommended': recommended,
        'stats': stats,
    }


def handler(event: dict, context) -> dict:
    '''Личный кабинет ученика: баланс, пополнение, покупка курсов, прогресс, профиль и рекомендации.'''
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers(), 'body': ''}

    headers = event.get('headers', {})
    token = headers.get('X-Auth-Token') or headers.get('x-auth-token', '')

    conn = get_conn()
    cur = conn.cursor(cursor_factory=RealDictCursor)
    try:
        user_id = get_user_id(cur, token)
        if not user_id:
            return {'statusCode': 401, 'headers': cors_headers(),
                    'body': json.dumps({'error': 'Требуется вход'})}

        if method == 'GET':
            return {'statusCode': 200, 'headers': cors_headers(),
                    'body': json.dumps(build_state(cur, user_id))}

        body = json.loads(event.get('body') or '{}')
        action = body.get('action', '')

        if action == 'topup':
            amount = int(body.get('amount', 0))
            if amount <= 0:
                return {'statusCode': 400, 'headers': cors_headers(),
                        'body': json.dumps({'error': 'Неверная сумма'})}
            cur.execute("UPDATE users SET balance = balance + %s WHERE id=%s", (amount, user_id))
            conn.commit()
            return {'statusCode': 200, 'headers': cors_headers(),
                    'body': json.dumps(build_state(cur, user_id))}

        if action == 'buy':
            course_id = body.get('course_id', '')
            cur.execute("SELECT price FROM courses WHERE id=%s", (course_id,))
            crow = cur.fetchone()
            if not crow:
                return {'statusCode': 404, 'headers': cors_headers(),
                        'body': json.dumps({'error': 'Курс не найден'})}
            cur.execute("SELECT 1 FROM purchases WHERE user_id=%s AND course_id=%s",
                        (user_id, course_id))
            if cur.fetchone():
                return {'statusCode': 400, 'headers': cors_headers(),
                        'body': json.dumps({'error': 'Курс уже куплен'})}
            price = crow['price']
            cur.execute("SELECT balance FROM users WHERE id=%s", (user_id,))
            balance = cur.fetchone()['balance']
            if balance < price:
                return {'statusCode': 400, 'headers': cors_headers(),
                        'body': json.dumps({'error': 'Недостаточно средств на балансе'})}
            cur.execute("UPDATE users SET balance = balance - %s WHERE id=%s", (price, user_id))
            cur.execute(
                "INSERT INTO purchases (user_id, course_id, price) VALUES (%s, %s, %s)",
                (user_id, course_id, price)
            )
            cur.execute(
                "INSERT INTO progress (user_id, course_id, completed_lessons) VALUES (%s, %s, 0) "
                "ON CONFLICT (user_id, course_id) DO NOTHING",
                (user_id, course_id)
            )
            conn.commit()
            return {'statusCode': 200, 'headers': cors_headers(),
                    'body': json.dumps(build_state(cur, user_id))}

        if action == 'update_profile':
            name = (body.get('name') or '').strip()
            avatar = (body.get('avatar') or '').strip()
            if name:
                cur.execute("UPDATE users SET name=%s WHERE id=%s", (name, user_id))
            if avatar:
                cur.execute("UPDATE users SET avatar=%s WHERE id=%s", (avatar, user_id))
            conn.commit()
            return {'statusCode': 200, 'headers': cors_headers(),
                    'body': json.dumps(build_state(cur, user_id))}

        if action == 'complete_lesson':
            course_id = body.get('course_id', '')
            cur.execute("SELECT lessons FROM courses WHERE id=%s", (course_id,))
            crow = cur.fetchone()
            if crow:
                cur.execute(
                    "UPDATE progress SET completed_lessons = LEAST(%s, completed_lessons + 1), "
                    "updated_at = NOW() WHERE user_id=%s AND course_id=%s",
                    (crow['lessons'], user_id, course_id)
                )
                conn.commit()
            return {'statusCode': 200, 'headers': cors_headers(),
                    'body': json.dumps(build_state(cur, user_id))}

        return {'statusCode': 400, 'headers': cors_headers(),
                'body': json.dumps({'error': 'Неизвестное действие'})}
    finally:
        cur.close()
        conn.close()
