type LogsPanelProps = {
  logs: string[]
}

export function LogsPanel({ logs }: LogsPanelProps) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-3">
        <h2 className="text-base font-semibold">Event logs</h2>
      </div>
      <div className="max-h-80 overflow-auto p-4">
        {logs.length === 0 ? (
          <p className="text-sm text-slate-500">No check events yet.</p>
        ) : (
          <div className="space-y-2">
            {logs.map((log, index) => (
              <p
                className="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-700"
                key={`${log}-${index}`}
              >
                {log}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
