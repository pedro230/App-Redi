# Resi — Plataforma verde de benefícios ao morador

Este repositório reúne o plano de negócios completo, o backend FastAPI e o frontend React (PWA) para o **Resi**, aplicativo que reconhece moradores locais da Costa Esmeralda (SC) com benefícios exclusivos enquanto impulsiona a economia regional.

## Estrutura

```
./docs            -> Plano de negócios e materiais estratégicos
./backend         -> API FastAPI com ResidentScore, ofertas e resgates
./frontend        -> PWA React com temática verde esmeralda
```

- Leia o plano detalhado em [`docs/plano-de-negocios-resi.md`](docs/plano-de-negocios-resi.md).
- Siga `backend/README.md` e `frontend/README.md` para executar cada serviço.

## Visão rápida do MVP
- **Verificação**: endpoint `/verify/address` registra comprovantes e atualiza ResidentScore.
- **Benefícios**: `/users/{id}/qrcode` gera QR dinâmico assinado via JWT; `/redeem` valida regras de ofertas.
- **Painéis**: interface React com áreas para morador, parceiro e prefeitura, usando cores verde esmeralda.

## Rodando localmente
1. `cd backend && python -m venv .venv && source .venv/bin/activate && pip install -r requirements.txt && uvicorn app.main:app --reload`
2. Em outro terminal: `cd frontend && npm install && npm run dev`
3. Acesse `http://localhost:5173` e utilize o endpoint `/seed` para popular dados de exemplo.

## Próximos passos sugeridos
- Conectar OCR real e armazenamento seguro para comprovantes.
- Implementar autenticação completa (usuário/parceiro/prefeitura) e métricas em tempo real.
- Automatizar deploy via CI/CD e infraestrutura escalável (Docker + Terraform).
