import { useEffect, useMemo, useState } from 'react'

import { fetchJson } from '@/lib/http'
import type { Expense, Paginated } from '@/types/api'

export type UseExpensesParams = {
  employeeId?: string | null
  page?: number
  pageSize?: number
}

export function useExpenses(params: UseExpensesParams = {}) {
  const { employeeId = undefined, page = 1, pageSize = 10 } = params
  const query = useMemo(() => {
    const q = new URLSearchParams()
    if (employeeId) q.set('employeeId', employeeId)
    if (page) q.set('page', String(page))
    if (pageSize) q.set('pageSize', String(pageSize))
    return q.toString()
  }, [employeeId, page, pageSize])

  const [items, setItems] = useState<Expense[] | null>(null)
  const [total, setTotal] = useState<number>(0)
  const [meta, setMeta] = useState<{ page: number; pageSize: number }>({ page, pageSize })
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    fetchJson<Paginated<Expense>>(`/api/expenses?${query}`)
      .then((res) => {
        if (cancelled) return
        setItems(res.items)
        setTotal(res.total)
        setMeta({ page: res.page, pageSize: res.pageSize })
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
  }, [query])

  return { items, total, page: meta.page, pageSize: meta.pageSize, error, loading }
}
