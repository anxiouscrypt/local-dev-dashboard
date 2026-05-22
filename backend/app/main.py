from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.health_checker import check_services
from app.models import ServiceDefinition
from app.service_loader import load_services
from app.status_store import get_history, get_status_snapshot, record_statuses

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


@app.get("/services/status")
def read_service_status():
    services = load_services()
    return get_status_snapshot(services)


@app.post("/services/check")
async def check_service_status():
    services = load_services()
    statuses = await check_services(services)
    return record_statuses(statuses)


@app.get("/services/history")
def read_service_history():
    return get_history()
