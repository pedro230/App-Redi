from __future__ import annotations

import json
from datetime import datetime
from typing import Iterable

from fastapi import HTTPException, status

from ..models import Offer, Redemption, User

LEVEL_ORDER = {"Visitante": 0, "Bronze": 1, "Prata": 2, "Ouro": 3}


def _parse_days(days: str) -> set[int]:
    try:
        parsed = json.loads(days)
        if isinstance(parsed, list):
            return {int(day) for day in parsed}
    except json.JSONDecodeError:
        pass
    return set()


def validate_offer_access(user: User, offer: Offer) -> None:
    required_level = LEVEL_ORDER.get(offer.min_level, 0)
    user_level = LEVEL_ORDER.get(user.level, 0)
    if user_level < required_level:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Nível insuficiente para este benefício",
        )

    if not offer.active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Oferta inativa",
        )

    today = datetime.utcnow().weekday()
    allowed_days = _parse_days(offer.days_of_week)
    if allowed_days and today not in allowed_days:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Oferta indisponível hoje",
        )


def check_usage_limits(user: User, offer: Offer, redemptions: Iterable[Redemption]) -> None:
    count = sum(1 for redemption in redemptions if redemption.user_id == user.id)
    if count >= offer.usage_limit_per_user:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Limite de uso atingido",
        )
