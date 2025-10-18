from contextlib import contextmanager
from typing import Generator

from sqlmodel import Session, SQLModel, create_engine

DATABASE_URL = "sqlite:///resi.db"
engine = create_engine(DATABASE_URL, echo=False, connect_args={"check_same_thread": False})


def init_db() -> None:
    SQLModel.metadata.create_all(engine)


@contextmanager
def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session
