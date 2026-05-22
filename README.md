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

Setup instructions will be completed with the MVP.

## API Endpoints

- `GET /health`
- `GET /services`
- `GET /services/status`
- `POST /services/check`
- `GET /services/history`
