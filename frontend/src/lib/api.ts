import type { ServiceHistory, ServiceStatus } from './types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, options)

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`)
  }

  return response.json() as Promise<T>
}

export function getStatuses() {
  return request<ServiceStatus[]>('/services/status')
}

export function checkServices() {
  return request<ServiceStatus[]>('/services/check', { method: 'POST' })
}

export function getHistory() {
  return request<ServiceHistory>('/services/history')
}
