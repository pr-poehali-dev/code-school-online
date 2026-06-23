import json
import os
import random
import secrets
import smtplib
from datetime import datetime, timedelta
from email.mime.text import MIMEText

import psycopg2


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


def send_email_code(email: str, code: str) -> bool:
    host = os.environ.get('SMTP_HOST')
    user = os.environ.get('SMTP_USER')
    password = os.environ.get('SMTP_PASSWORD')
    if not (host and user and password):
        return False
    msg = MIMEText(
        f'Ваш код для входа в CodeBase: {code}\n\nКод действует 10 минут.',
        'plain', 'utf-8'
    )
    msg['Subject'] = f'Код входа CodeBase: {code}'
    msg['From'] = user
    msg['To'] = email
    with smtplib.SMTP_SSL(host, 465) as server:
        server.login(user, password)
        server.sendmail(user, [email], msg.as_string())
    return True


def handler(event: dict, context) -> dict:
    '''Авторизация учеников по email и коду из письма. Создаёт сессии и хранит токены.'''
    method = event.get('httpMethod', 'GET')
    if method == 'OPTIONS':
        return {'statusCode': 200, 'headers': cors_headers(), 'body': ''}

    body = json.loads(event.get('body') or '{}')
    action = body.get('action', '')

    conn = get_conn()
    cur = conn.cursor()

    try:
        if action == 'request_code':
            email = (body.get('email') or '').strip().lower()
            if '@' not in email:
                return {'statusCode': 400, 'headers': cors_headers(),
                        'body': json.dumps({'error': 'Введите корректный email'})}
            code = f'{random.randint(0, 999999):06d}'
            expires = datetime.utcnow() + timedelta(minutes=10)
            cur.execute(
                "INSERT INTO login_codes (email, code, expires_at) VALUES (%s, %s, %s)",
                (email, code, expires)
            )
            conn.commit()
            sent = send_email_code(email, code)
            resp = {'ok': True, 'sent': sent}
            if not sent:
                resp['demo_code'] = code
            return {'statusCode': 200, 'headers': cors_headers(), 'body': json.dumps(resp)}

        if action == 'verify_code':
            email = (body.get('email') or '').strip().lower()
            code = (body.get('code') or '').strip()
            cur.execute(
                "SELECT id FROM login_codes WHERE email=%s AND code=%s AND used=FALSE "
                "AND expires_at > NOW() ORDER BY id DESC LIMIT 1",
                (email, code)
            )
            row = cur.fetchone()
            if not row:
                return {'statusCode': 400, 'headers': cors_headers(),
                        'body': json.dumps({'error': 'Неверный или просроченный код'})}
            cur.execute("UPDATE login_codes SET used=TRUE WHERE id=%s", (row[0],))

            cur.execute("SELECT id, name, avatar, balance FROM users WHERE email=%s", (email,))
            user = cur.fetchone()
            is_new = False
            if not user:
                default_name = email.split('@')[0]
                new_ref_code = secrets.token_hex(4).upper()
                # реферальный код пригласившего (если есть)
                ref = (body.get('ref') or '').strip().upper()
                referred_by = None
                if ref:
                    cur.execute("SELECT id FROM users WHERE ref_code=%s", (ref,))
                    rrow = cur.fetchone()
                    if rrow:
                        referred_by = rrow[0]
                cur.execute(
                    "INSERT INTO users (email, name, ref_code, referred_by) "
                    "VALUES (%s, %s, %s, %s) RETURNING id, name, avatar, balance",
                    (email, default_name, new_ref_code, referred_by)
                )
                user = cur.fetchone()
                is_new = True

            token = secrets.token_hex(32)
            expires = datetime.utcnow() + timedelta(days=30)
            cur.execute(
                "INSERT INTO sessions (user_id, token, expires_at) VALUES (%s, %s, %s)",
                (user[0], token, expires)
            )
            conn.commit()
            return {'statusCode': 200, 'headers': cors_headers(), 'body': json.dumps({
                'token': token,
                'is_new': is_new,
                'user': {'id': user[0], 'email': email, 'name': user[1],
                         'avatar': user[2], 'balance': user[3]}
            })}

        if action == 'logout':
            token = event.get('headers', {}).get('X-Auth-Token') or event.get('headers', {}).get('x-auth-token', '')
            cur.execute("UPDATE sessions SET expires_at = NOW() WHERE token=%s", (token,))
            conn.commit()
            return {'statusCode': 200, 'headers': cors_headers(), 'body': json.dumps({'ok': True})}

        return {'statusCode': 400, 'headers': cors_headers(),
                'body': json.dumps({'error': 'Неизвестное действие'})}
    finally:
        cur.close()
        conn.close()