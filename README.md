# Local Dev Dashboard

A local dashboard for monitoring development services, health checks, ports, response times, and recent status history.

## Problem

Multi-service development environments make it easy to lose track of which local services are running, which ports they use, and what failed. This dashboard makes that environment state visible.

## Demo

Screenshot placeholder: `docs/screenshots/local-dev-dashboard.png`

## Features

- Load service definitions from `services.json`
- Check service health URLs
- Show healthy, unhealthy, or unknown status
- Track response time, status code, errors, and last checked timestamp
- Manual refresh and automatic frontend polling
- Recent status history and event logs

## Architecture

`services.json` -> FastAPI health checker -> in-memory status store -> React dashboard.

```txt
services.json
  -> FastAPI service loader
  -> health checker
  -> status store
  -> React dashboard
```

## Tech Stack

- React, TypeScript, Vite
- Tailwind CSS
- FastAPI, Python, httpx
- Pytest

## Local Setup

Prerequisites:

- Node.js 20 or newer
- Python 3.11 or newer

Run both services:

```bash
chmod +x scripts/dev.sh
./scripts/dev.sh
```

The frontend runs at `http://localhost:5173`.
The backend runs at `http://localhost:8000`.

Manual backend:

```bash
python3 -m venv .venv
.venv/bin/pip install -r backend/requirements.txt
PYTHONPATH=backend .venv/bin/uvicorn app.main:app --reload --port 8000
```

Manual frontend:

```bash
cd frontend
npm install
npm run dev
```

Run checks:

```bash
PYTHONPATH=backend .venv/bin/pytest backend/tests
cd frontend && npm run build
```

## services.json

```json
{
  "services": [
    {
      "name": "API Gateway",
      "url": "http://localhost:8000/health",
      "port": 8000,
      "description": "Main FastAPI gateway"
    }
  ]
}
```

## What I Learned

- Local developer tooling is often about making hidden system state visible.
- Failed health checks should be treated as expected data, not app-breaking errors.
- A simple in-memory history is enough to show trends without overbuilding storage.

## API Endpoints

- `GET /health`
- `GET /services`
- `GET /services/status`
- `POST /services/check`
- `GET /services/history`
