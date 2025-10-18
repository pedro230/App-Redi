from __future__ import annotations

from datetime import datetime, timedelta, timezone
from typing import Any, Dict

import jwt

SECRET = "resi-secret-key-change"
ALGORITHM = "HS256"
QR_EXPIRATION_SECONDS = 30


def create_qr_token(data: Dict[str, Any], expires_in: int = QR_EXPIRATION_SECONDS) -> tuple[str, datetime]:
    expire = datetime.now(tz=timezone.utc) + timedelta(seconds=expires_in)
    payload = {"exp": expire, **data}
    token = jwt.encode(payload, SECRET, algorithm=ALGORITHM)
    return token, expire


def decode_qr_token(token: str) -> Dict[str, Any]:
    return jwt.decode(token, SECRET, algorithms=[ALGORITHM])
