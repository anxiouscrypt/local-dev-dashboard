# Decisions

## services.json for Configuration

A file-based service list keeps the dashboard simple and easy to adapt for any local project.

## In-Memory History

The MVP uses in-memory history because local status checks are ephemeral and do not need durable storage for the first version.

## Manual and Frontend Polling

Health checks run through API calls. The frontend can poll every 10 seconds without requiring a separate backend scheduler.
