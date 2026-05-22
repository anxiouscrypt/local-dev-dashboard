export type ServiceStatusValue = 'healthy' | 'unhealthy' | 'unknown'

export type ServiceStatus = {
  name: string
  url: string
  port: number
  description: string
  status: ServiceStatusValue
  statusCode: number | null
  responseTimeMs: number | null
  error: string | null
  checkedAt: string | null
}

export type ServiceHistory = {
  statuses: Record<string, ServiceStatus[]>
  logs: string[]
}
