from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timedelta
from typing import Iterable

from ..models import ProofOfResidence, User

LEVELS = [
    (80, "Ouro"),
    (60, "Prata"),
    (40, "Bronze"),
]


@dataclass
class ScoreComponent:
    source: str
    score: int
    expires_at: datetime


def determine_level(score: int) -> str:
    for threshold, level in LEVELS:
        if score >= threshold:
            return level
    return "Visitante"


def aggregate_score(proofs: Iterable[ProofOfResidence]) -> tuple[int, list[ScoreComponent]]:
    total = 0
    components: list[ScoreComponent] = []
    now = datetime.utcnow()
    for proof in proofs:
        if proof.status != "aprovado":
            continue
        if proof.expires_at < now:
            continue
        total += proof.score_awarded
        components.append(
            ScoreComponent(
                source=proof.proof_type,
                score=proof.score_awarded,
                expires_at=proof.expires_at,
            )
        )
    total = max(0, min(total, 100))
    return total, components


def refresh_user_score(user: User) -> User:
    score, _ = aggregate_score(user.proofs)
    user.resident_score = score
    user.level = determine_level(score)
    user.touch()
    return user


def expires_in(days: int) -> datetime:
    return datetime.utcnow() + timedelta(days=days)
