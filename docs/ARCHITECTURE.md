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
