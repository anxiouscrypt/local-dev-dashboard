import type { ServiceStatusValue } from '../lib/types'

type StatusBadgeProps = {
  status: ServiceStatusValue
}

const classes: Record<ServiceStatusValue, string> = {
  healthy: 'bg-emerald-100 text-emerald-700',
  unhealthy: 'bg-rose-100 text-rose-700',
  unknown: 'bg-slate-100 text-slate-600',
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${classes[status]}`}>
      {status}
    </span>
  )
}
