import { useEffect, useState } from 'react'

import { fetchJson } from '@/lib/http'
import type { Employee } from '@/types/api'

export function useEmployees() {
  const [data, setData] = useState<Employee[] | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchJson<Employee[]>('/api/employees')
      .then((res) => {
        if (!cancelled) setData(res)
      })
      .catch((err) => {
        if (!cancelled) setError(err as Error)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return { data, error, loading }
}

