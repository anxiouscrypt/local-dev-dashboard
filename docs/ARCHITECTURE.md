# Architecture

## System Components

- `services.json` defines local services and health URLs.
- FastAPI backend loads service definitions and performs health checks.
- In-memory status store keeps current status, recent history, and event logs.
- React dashboard renders service cards, history, logs, and refresh controls.

## Data Flow

```txt
services.json -> service loader -> health checker -> status store -> API -> React dashboard
```

## Known Limitations

- Local-only tool.
- In-memory history resets when the backend restarts.
- No background worker; checks run when the API is called.
- The tool observes services but does not manage their processes.

## Service Definition

Each service has:

- `name`
- `url`
- `port`
- `description`

The backend validates this shape when loading `services.json`.

## Health Check Model

Each check records:

- service name
- status: `healthy`, `unhealthy`, or `unknown`
- HTTP status code when available
- response time in milliseconds
- error message when the request fails
- timestamp

Connection failures are expected in local development, so they are represented as normal status data instead of unhandled exceptions.

## API Design

- `GET /services` returns configured services.
- `POST /services/check` actively checks all services and stores the latest results.
- `GET /services/status` returns the latest status snapshot.
- `GET /services/history` returns recent status history and event logs.
