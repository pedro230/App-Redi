from __future__ import annotations

import json
from datetime import datetime
from typing import List

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import select

from .db import get_session, init_db
from .models import Offer, Partner, ProofOfResidence, Redemption, User
from .schemas import (
    OfferCreate,
    OfferResponse,
    PartnerCreate,
    PartnerResponse,
    ProofPayload,
    ProofResponse,
    QRCodeResponse,
    RedemptionRequest,
    RedemptionResponse,
    UserCreate,
    UserResponse,
)
from .security import create_qr_token, decode_qr_token
from .services.offer_rules import check_usage_limits, validate_offer_access
from .services.resident_score import refresh_user_score

app = FastAPI(title="Resi API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    init_db()


@app.post("/users", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(payload: UserCreate, session=Depends(get_session)) -> UserResponse:
    user = User(
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        city=payload.city,
        consents=json.dumps(["contrato_base"]),
    )
    session.add(user)
    session.commit()
    session.refresh(user)
    return UserResponse(
        id=user.id,
        name=user.name,
        email=user.email,
        city=user.city,
        level=user.level,
        resident_score=user.resident_score,
        consents=json.loads(user.consents),
    )


@app.get("/users", response_model=List[UserResponse])
def list_users(session=Depends(get_session)) -> List[UserResponse]:
    users = session.exec(select(User)).all()
    return [
        UserResponse(
            id=user.id,
            name=user.name,
            email=user.email,
            city=user.city,
            level=user.level,
            resident_score=user.resident_score,
            consents=json.loads(user.consents),
        )
        for user in users
    ]


@app.post("/partners", response_model=PartnerResponse, status_code=status.HTTP_201_CREATED)
def create_partner(payload: PartnerCreate, session=Depends(get_session)) -> PartnerResponse:
    partner = Partner(
        trade_name=payload.trade_name,
        slug=payload.slug,
        city=payload.city,
        plan=payload.plan,
        categories=json.dumps(payload.categories),
        address=payload.address,
    )
    session.add(partner)
    session.commit()
    session.refresh(partner)
    return PartnerResponse(
        id=partner.id,
        trade_name=partner.trade_name,
        slug=partner.slug,
        city=partner.city,
        plan=partner.plan,
        categories=json.loads(partner.categories),
        address=partner.address,
    )


@app.get("/partners", response_model=List[PartnerResponse])
def list_partners(session=Depends(get_session)) -> List[PartnerResponse]:
    partners = session.exec(select(Partner)).all()
    return [
        PartnerResponse(
            id=p.id,
            trade_name=p.trade_name,
            slug=p.slug,
            city=p.city,
            plan=p.plan,
            categories=json.loads(p.categories),
            address=p.address,
        )
        for p in partners
    ]


@app.post("/offers", response_model=OfferResponse, status_code=status.HTTP_201_CREATED)
def create_offer(payload: OfferCreate, session=Depends(get_session)) -> OfferResponse:
    partner = session.get(Partner, payload.partner_id)
    if not partner:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Parceiro não encontrado")
    offer = Offer(
        partner_id=payload.partner_id,
        title=payload.title,
        description=payload.description,
        min_level=payload.min_level,
        discount_percent=payload.discount_percent,
        days_of_week=json.dumps(payload.days_of_week),
        start_time=payload.start_time,
        end_time=payload.end_time,
        usage_limit_per_user=payload.usage_limit_per_user,
    )
    session.add(offer)
    session.commit()
    session.refresh(offer)
    return OfferResponse(
        id=offer.id,
        partner_id=offer.partner_id,
        title=offer.title,
        description=offer.description,
        min_level=offer.min_level,
        discount_percent=offer.discount_percent,
        days_of_week=json.loads(offer.days_of_week),
        start_time=offer.start_time,
        end_time=offer.end_time,
        usage_limit_per_user=offer.usage_limit_per_user,
    )


@app.get("/offers", response_model=List[OfferResponse])
def list_offers(session=Depends(get_session)) -> List[OfferResponse]:
    offers = session.exec(select(Offer)).all()
    return [
        OfferResponse(
            id=o.id,
            partner_id=o.partner_id,
            title=o.title,
            description=o.description,
            min_level=o.min_level,
            discount_percent=o.discount_percent,
            days_of_week=json.loads(o.days_of_week),
            start_time=o.start_time,
            end_time=o.end_time,
            usage_limit_per_user=o.usage_limit_per_user,
        )
        for o in offers
    ]


@app.post("/verify/address", response_model=ProofResponse)
def verify_address(payload: ProofPayload, session=Depends(get_session)) -> ProofResponse:
    user = session.get(User, payload.user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado")

    proof = ProofOfResidence(
        user_id=user.id,
        proof_type=payload.proof_type,
        cep=payload.cep,
        city=payload.city,
        expires_at=payload.expires_at,
        status="aprovado",
        score_awarded=payload.score_awarded,
        file_reference=payload.file_reference,
    )
    session.add(proof)
    session.commit()
    session.refresh(user)
    refresh_user_score(user)
    session.add(user)
    session.commit()
    approved = user.level in {"Bronze", "Prata", "Ouro"}
    return ProofResponse(resident_score=user.resident_score, level=user.level, approved=approved)


@app.get("/users/{user_id}/qrcode", response_model=QRCodeResponse)
def generate_qr(user_id: int, session=Depends(get_session)) -> QRCodeResponse:
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado")
    token, expires_at = create_qr_token({"sub": user.id, "level": user.level})
    return QRCodeResponse(token=token, expires_at=expires_at)


@app.post("/redeem", response_model=RedemptionResponse)
def redeem_offer(payload: RedemptionRequest, session=Depends(get_session)) -> RedemptionResponse:
    token_payload = decode_qr_token(payload.qr_token)
    user_id = token_payload.get("sub")
    level = token_payload.get("level", "Visitante")
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado")

    offer = session.get(Offer, payload.offer_id)
    partner = session.get(Partner, payload.partner_id)
    if not offer or not partner:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Oferta ou parceiro inválido")

    if offer.partner_id != partner.id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Oferta não pertence ao parceiro informado")

    validate_offer_access(user, offer)
    redemptions = session.exec(select(Redemption).where(Redemption.offer_id == offer.id)).all()
    check_usage_limits(user, offer, redemptions)

    redemption = Redemption(
        offer_id=offer.id,
        partner_id=partner.id,
        user_id=user.id,
        status="aprovado",
        qr_nonce=token_payload.get("jti", "manual"),
        metadata=json.dumps({"level": level, "redeemed_at": datetime.utcnow().isoformat()}),
    )
    session.add(redemption)
    session.commit()
    return RedemptionResponse(
        status="aprovado",
        discount_percent=offer.discount_percent,
        message=f"Benefício aplicado para nível {user.level}",
        level=user.level,
    )


@app.post("/seed", status_code=status.HTTP_201_CREATED)
def seed_data(session=Depends(get_session)) -> dict[str, str]:
    """Cria dados de demonstração para o front-end."""
    user = session.exec(select(User).where(User.email == "maria@resi.app")).first()
    if not user:
        user = User(name="Maria Silva", email="maria@resi.app", city="Porto Belo", level="Ouro", resident_score=85)
        session.add(user)
        session.commit()
        session.refresh(user)

    partner = session.exec(select(Partner).where(Partner.slug == "bali-hai")).first()
    if not partner:
        partner = Partner(trade_name="Bali Hai Beach Club", slug="bali-hai", city="Porto Belo", categories=json.dumps(["Beach Club", "ESG"]))
        session.add(partner)
        session.commit()
        session.refresh(partner)

    offer = session.exec(select(Offer).where(Offer.partner_id == partner.id)).first()
    if not offer:
        offer = Offer(
            partner_id=partner.id,
            title="Morador Ouro 20% OFF",
            description="Desconto especial para residentes verificados",
            min_level="Ouro",
            discount_percent=20.0,
            days_of_week=json.dumps([4, 5, 6]),
            usage_limit_per_user=5,
        )
        session.add(offer)
        session.commit()

    return {"status": "ok"}
