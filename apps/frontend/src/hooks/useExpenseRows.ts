import { useMemo } from 'react'

import type { Employee, Expense } from '@/types/api'

export type ExpenseRow = Expense & { employee?: Employee }

export function useExpenseRows(employees: Employee[] | null, expenses: Expense[] | null) {
  return useMemo(() => {
    if (!employees || !expenses) return null
    const byId = new Map(employees.map((e) => [e.id, e]))
    return expenses.map((ex) => ({ ...ex, employee: byId.get(ex.employeeId) }))
  }, [employees, expenses])
}

