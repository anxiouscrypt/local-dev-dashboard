import httpx
import pytest

from app.health_checker import check_service
from app.models import ServiceDefinition


@pytest.mark.anyio
async def test_check_service_success():
    service = ServiceDefinition(
        name="API",
        url="http://localhost:8000/health",
        port=8000,
        description="Backend",
    )

    async def handler(_: httpx.Request) -> httpx.Response:
        return httpx.Response(200, json={"status": "ok"})

    status = await check_service(service, transport=httpx.MockTransport(handler))

    assert status.status == "healthy"
    assert status.statusCode == 200
    assert status.responseTimeMs is not None
    assert status.checkedAt is not None


@pytest.mark.anyio
async def test_check_service_connection_failure():
    service = ServiceDefinition(
        name="Down API",
        url="http://localhost:8001/health",
        port=8001,
        description="Stopped service",
    )

    async def handler(_: httpx.Request) -> httpx.Response:
        raise httpx.ConnectError("connection refused")

    status = await check_service(service, transport=httpx.MockTransport(handler))

    assert status.status == "unhealthy"
    assert status.statusCode is None
    assert "connection refused" in status.error
