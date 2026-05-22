from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.models import ServiceDefinition
from app.service_loader import load_services

app = FastAPI(title="Local Dev Dashboard API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/services", response_model=list[ServiceDefinition])
def read_services() -> list[ServiceDefinition]:
    return load_services()
