from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field, HttpUrl

ServiceStatusValue = Literal["healthy", "unhealthy", "unknown"]


class ServiceDefinition(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    url: HttpUrl
    port: int = Field(ge=1, le=65535)
    description: str = ""


class ServicesFile(BaseModel):
    services: list[ServiceDefinition]


class ServiceStatus(BaseModel):
    name: str
    url: str
    port: int
    description: str
    status: ServiceStatusValue
    statusCode: int | None = None
    responseTimeMs: float | None = None
    error: str | None = None
    checkedAt: datetime | None = None


class ServiceHistory(BaseModel):
    statuses: dict[str, list[ServiceStatus]]
    logs: list[str]
