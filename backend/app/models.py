from __future__ import annotations

from datetime import datetime
from typing import List, Optional

from sqlmodel import Field, Relationship, SQLModel


class TimestampedModel(SQLModel):
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)
    updated_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)

    def touch(self) -> None:
        self.updated_at = datetime.utcnow()


class User(TimestampedModel, table=True):
    __tablename__ = "users"

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str
    cpf_hash: Optional[str] = Field(default=None, index=True)
    phone: Optional[str] = None
    city: str
    level: str = Field(default="Visitante")
    resident_score: int = Field(default=0)
    consents: str = Field(default="[]")

    proofs: List["ProofOfResidence"] = Relationship(back_populates="user")
    redemptions: List["Redemption"] = Relationship(back_populates="user")


class ProofOfResidence(TimestampedModel, table=True):
    __tablename__ = "proofs"

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="users.id")
    proof_type: str
    cep: str
    city: str
    expires_at: datetime
    status: str = Field(default="pendente")
    file_reference: Optional[str] = None
    score_awarded: int = Field(default=0)

    user: User = Relationship(back_populates="proofs")


class Partner(TimestampedModel, table=True):
    __tablename__ = "partners"

    id: Optional[int] = Field(default=None, primary_key=True)
    trade_name: str
    slug: str = Field(index=True)
    city: str
    cnpj_hash: Optional[str] = Field(default=None, index=True)
    plan: str = Field(default="Standard")
    categories: str = Field(default="[]")
    address: Optional[str] = None

    offers: List["Offer"] = Relationship(back_populates="partner")
    redemptions: List["Redemption"] = Relationship(back_populates="partner")


class Offer(TimestampedModel, table=True):
    __tablename__ = "offers"

    id: Optional[int] = Field(default=None, primary_key=True)
    partner_id: int = Field(foreign_key="partners.id")
    title: str
    description: str
    min_level: str = Field(default="Bronze")
    discount_percent: float
    days_of_week: str = Field(default="[0,1,2,3,4,5,6]")
    start_time: Optional[str] = None
    end_time: Optional[str] = None
    usage_limit_per_user: int = Field(default=3)
    active: bool = Field(default=True)

    partner: Partner = Relationship(back_populates="offers")
    redemptions: List["Redemption"] = Relationship(back_populates="offer")


class Redemption(TimestampedModel, table=True):
    __tablename__ = "redemptions"

    id: Optional[int] = Field(default=None, primary_key=True)
    offer_id: int = Field(foreign_key="offers.id")
    partner_id: int = Field(foreign_key="partners.id")
    user_id: int = Field(foreign_key="users.id")
    status: str = Field(default="aprovado")
    qr_nonce: str
    metadata: Optional[str] = None

    offer: Offer = Relationship(back_populates="redemptions")
    partner: Partner = Relationship(back_populates="redemptions")
    user: User = Relationship(back_populates="redemptions")
