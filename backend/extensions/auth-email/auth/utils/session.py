"""Bridge to legacy 'sessions' table so the existing dashboard keeps working."""
import secrets
from datetime import datetime, timedelta

from utils.db import execute, escape, get_schema

SESSION_EXPIRE_DAYS = 30


def create_legacy_session(user_id: int) -> str:
    """Create a random session token in the legacy 'sessions' table and return it.

    The dashboard backend authorizes requests by looking up X-Auth-Token in
    the 'sessions' table, so after a password login we mint such a token to
    keep the cabinet (XP, courses, balance) working unchanged.
    """
    S = get_schema()
    token = secrets.token_hex(32)
    expires_at = (datetime.utcnow() + timedelta(days=SESSION_EXPIRE_DAYS)).isoformat()
    execute(f"""
        INSERT INTO {S}sessions (user_id, token, expires_at)
        VALUES ({escape(user_id)}, {escape(token)}, {escape(expires_at)})
    """)
    return token
