import { Activity, Clock, Server } from 'lucide-react'
import { StatusBadge } from './StatusBadge'
import type { ServiceStatus } from '../lib/types'

type ServiceCardProps = {
  status: ServiceStatus
}

export function ServiceCard({ status }: ServiceCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold text-slate-950">
            {status.name}
          </h2>
          <p className="mt-1 text-sm text-slate-500">{status.description}</p>
        </div>
        <StatusBadge status={status.status} />
      </div>
      <div className="mt-4 grid gap-3 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <Server className="h-4 w-4 text-slate-400" />
          <span className="font-mono">:{status.port}</span>
        </div>
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-slate-400" />
          <span>
            {status.responseTimeMs === null
              ? 'No response time yet'
              : `${status.responseTimeMs}ms`}
            {status.statusCode ? `, HTTP ${status.statusCode}` : ''}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-slate-400" />
          <span>
            {status.checkedAt
              ? new Date(status.checkedAt).toLocaleTimeString()
              : 'Not checked yet'}
          </span>
        </div>
      </div>
      {status.error && (
        <p className="mt-4 rounded-md bg-rose-50 p-3 text-sm text-rose-700">
          {status.error}
        </p>
      )}
    </article>
  )
}
