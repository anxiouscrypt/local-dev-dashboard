from collections import defaultdict, deque

from app.models import ServiceDefinition, ServiceHistory, ServiceStatus

MAX_HISTORY = 20
MAX_LOGS = 80

_current_status: dict[str, ServiceStatus] = {}
_history: dict[str, deque[ServiceStatus]] = defaultdict(lambda: deque(maxlen=MAX_HISTORY))
_logs: deque[str] = deque(maxlen=MAX_LOGS)


def unknown_status(service: ServiceDefinition) -> ServiceStatus:
    return ServiceStatus(
        name=service.name,
        url=str(service.url),
        port=service.port,
        description=service.description,
        status="unknown",
    )


def get_status_snapshot(services: list[ServiceDefinition]) -> list[ServiceStatus]:
    return [
        _current_status.get(service.name) or unknown_status(service)
        for service in services
    ]


def record_statuses(statuses: list[ServiceStatus]) -> list[ServiceStatus]:
    for status in statuses:
        _current_status[status.name] = status
        _history[status.name].appendleft(status)
        if status.status == "healthy":
            _logs.appendleft(f"{status.name} healthy in {status.responseTimeMs}ms")
        else:
            detail = status.error or f"HTTP {status.statusCode}"
            _logs.appendleft(f"{status.name} unhealthy: {detail}")

    return statuses


def get_history() -> ServiceHistory:
    return ServiceHistory(
        statuses={name: list(entries) for name, entries in _history.items()},
        logs=list(_logs),
    )


def clear_status_store() -> None:
    _current_status.clear()
    _history.clear()
    _logs.clear()
