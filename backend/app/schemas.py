from __future__ import annotations

from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, EmailStr, Field


class ProofPayload(BaseModel):
    user_id: int
    proof_type: str = Field(pattern=r"^(conta|selfie|geo|comunidade)$")
    cep: str
    city: str
    score_awarded: int
    expires_at: datetime
    file_reference: Optional[str] = None


class ProofResponse(BaseModel):
    resident_score: int
    level: str
    approved: bool


class ResidentScoreBreakdown(BaseModel):
    source: str
    score: int
    metadata: dict[str, str] | None = None


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    city: str


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    city: str
    level: str
    resident_score: int
    consents: List[str]

    class Config:
        from_attributes = True


class QRCodeResponse(BaseModel):
    token: str
    expires_at: datetime


class RedemptionRequest(BaseModel):
    qr_token: str
    partner_id: int
    offer_id: int


class RedemptionResponse(BaseModel):
    status: str
    discount_percent: float
    message: str
    level: str


class OfferCreate(BaseModel):
    partner_id: int
    title: str
    description: str
    min_level: str = "Bronze"
    discount_percent: float
    days_of_week: List[int] = Field(default_factory=lambda: list(range(7)))
    start_time: Optional[str] = None
    end_time: Optional[str] = None
    usage_limit_per_user: int = 3


class OfferResponse(BaseModel):
    id: int
    partner_id: int
    title: str
    description: str
    min_level: str
    discount_percent: float
    days_of_week: List[int]
    start_time: Optional[str]
    end_time: Optional[str]
    usage_limit_per_user: int

    class Config:
        from_attributes = True


class PartnerCreate(BaseModel):
    trade_name: str
    slug: str
    city: str
    plan: str = "Standard"
    categories: List[str] = Field(default_factory=list)
    address: Optional[str] = None


class PartnerResponse(BaseModel):
    id: int
    trade_name: str
    slug: str
    city: str
    plan: str
    categories: List[str]
    address: Optional[str]

    class Config:
        from_attributes = True
