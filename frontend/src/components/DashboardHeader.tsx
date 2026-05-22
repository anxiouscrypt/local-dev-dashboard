import { RefreshCw } from 'lucide-react'

type DashboardHeaderProps = {
  loading: boolean
  onRefresh: () => void
}

export function DashboardHeader({ loading, onRefresh }: DashboardHeaderProps) {
  return (
    <header className="mb-5 flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-medium text-teal-700">Local Dev Dashboard</p>
        <h1 className="text-2xl font-semibold text-slate-950">
          Service health at a glance
        </h1>
      </div>
      <button
        className="inline-flex h-10 items-center gap-2 rounded-md bg-slate-950 px-3 text-sm font-medium text-white hover:bg-slate-800"
        disabled={loading}
        onClick={onRefresh}
        type="button"
      >
        <RefreshCw className={loading ? 'h-4 w-4 animate-spin' : 'h-4 w-4'} />
        Refresh
      </button>
    </header>
  )
}
