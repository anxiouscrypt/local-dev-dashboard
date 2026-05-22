import { useEffect, useState } from 'react'
import { DashboardHeader } from './components/DashboardHeader'
import { LogsPanel } from './components/LogsPanel'
import { ServiceCard } from './components/ServiceCard'
import { StatusHistory } from './components/StatusHistory'
import { checkServices, getHistory, getStatuses } from './lib/api'
import type { ServiceHistory, ServiceStatus } from './lib/types'

function App() {
  const [statuses, setStatuses] = useState<ServiceStatus[]>([])
  const [history, setHistory] = useState<ServiceHistory>({ statuses: {}, logs: [] })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    void loadSnapshot()
  }, [])

  async function loadSnapshot() {
    try {
      const [nextStatuses, nextHistory] = await Promise.all([
        getStatuses(),
        getHistory(),
      ])
      setStatuses(nextStatuses)
      setHistory(nextHistory)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load services')
    }
  }

  async function refresh() {
    setLoading(true)
    try {
      setStatuses(await checkServices())
      setHistory(await getHistory())
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not check services')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f3f5f7] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <DashboardHeader loading={loading} onRefresh={refresh} />
        {error && <p className="mb-4 text-sm text-rose-700">{error}</p>}
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="grid gap-4 md:grid-cols-2">
            {statuses.map((status) => (
              <ServiceCard key={status.name} status={status} />
            ))}
          </section>
          <aside className="space-y-4">
            <StatusHistory history={history} />
            <LogsPanel logs={history.logs} />
          </aside>
        </div>
      </div>
    </main>
  )
}

export default App
