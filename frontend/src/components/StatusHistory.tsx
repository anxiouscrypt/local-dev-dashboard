import type { ServiceHistory } from '../lib/types'

type StatusHistoryProps = {
  history: ServiceHistory
}

export function StatusHistory({ history }: StatusHistoryProps) {
  const entries = Object.entries(history.statuses)

  return (
    <section className="rounded-lg border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-base font-semibold">Status history</h2>
      </div>
      <div className="space-y-4 p-4">
        {entries.length === 0 ? (
          <p className="text-sm text-slate-500">Run a check to capture history.</p>
        ) : (
          entries.map(([name, statuses]) => (
            <div key={name}>
              <p className="mb-2 text-sm font-medium text-slate-800">{name}</p>
              <div className="flex gap-1">
                {statuses.slice(0, 20).map((status, index) => (
                  <span
                    className={
                      status.status === 'healthy'
                        ? 'h-3 w-3 rounded-sm bg-emerald-500'
                        : 'h-3 w-3 rounded-sm bg-rose-500'
                    }
                    key={`${status.checkedAt}-${index}`}
                    title={`${status.status} ${status.responseTimeMs ?? ''}ms`}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  )
}
