import { useEffect, useState } from 'react'

import { fetchJson } from '@/lib/http'
import type { Expense } from '@/types/api'

export function useExpenses() {
  const [data, setData] = useState<Expense[] | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchJson<Expense[]>('/api/expenses')
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

