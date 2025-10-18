# Resi Backend

Serviço FastAPI responsável por autenticação, cálculo do ResidentScore, gestão de parceiros, ofertas e resgates.

## Requisitos
- Python 3.11+
- Poetry ou pip + virtualenv

## Configuração rápida
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Arquitetura
- `app/main.py`: ponto de entrada FastAPI.
- `app/models.py`: modelos SQLModel vinculados ao banco SQLite.
- `app/schemas.py`: objetos de transferência de dados (DTOs).
- `app/services/resident_score.py`: regras para cálculo de ResidentScore.
- `app/services/offer_rules.py`: motor de regras de resgate.
- `app/db.py`: conexão e inicialização do banco.
- `app/security.py`: geração e validação de tokens JWT para QR dinâmicos.

O banco padrão (`resi.db`) é criado automaticamente em desenvolvimento.
