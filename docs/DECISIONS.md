# Decisions

## services.json for Configuration

A file-based service list keeps the dashboard simple and easy to adapt for any local project.

## In-Memory History

The MVP uses in-memory history because local status checks are ephemeral and do not need durable storage for the first version.

## Manual and Frontend Polling

Health checks run through API calls. The frontend can poll every 10 seconds without requiring a separate backend scheduler.

## Failure Handling

Failed connections are reported as `unhealthy` status snapshots with an error message. Local development often includes intentionally stopped services, so failures should be visible but not exceptional.

## No Process Management

The dashboard observes services but does not start, stop, or restart them. That keeps the tool focused on visibility rather than orchestration.
