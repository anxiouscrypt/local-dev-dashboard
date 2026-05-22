from datetime import datetime, timezone
from time import perf_counter

import httpx

from app.models import ServiceDefinition, ServiceStatus


async def check_service(
    service: ServiceDefinition,
    timeout_seconds: float = 2.0,
    transport: httpx.AsyncBaseTransport | None = None,
) -> ServiceStatus:
    started = perf_counter()

    try:
        async with httpx.AsyncClient(
            timeout=timeout_seconds,
            transport=transport,
        ) as client:
            response = await client.get(str(service.url))
        elapsed_ms = (perf_counter() - started) * 1000
        status = "healthy" if 200 <= response.status_code < 400 else "unhealthy"

        return ServiceStatus(
            name=service.name,
            url=str(service.url),
            port=service.port,
            description=service.description,
            status=status,
            statusCode=response.status_code,
            responseTimeMs=round(elapsed_ms, 2),
            checkedAt=datetime.now(timezone.utc),
        )
    except httpx.HTTPError as error:
        elapsed_ms = (perf_counter() - started) * 1000

        return ServiceStatus(
            name=service.name,
            url=str(service.url),
            port=service.port,
            description=service.description,
            status="unhealthy",
            responseTimeMs=round(elapsed_ms, 2),
            error=str(error),
            checkedAt=datetime.now(timezone.utc),
        )


async def check_services(services: list[ServiceDefinition]) -> list[ServiceStatus]:
    return [await check_service(service) for service in services]
