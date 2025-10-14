import { employees } from './employees'

export type ExpenseStatusKey = 'PENDING' | 'PROCESSING' | 'REIMBURSED' | 'FAILED'

export type Expense = {
  id: string
  employeeId: string
  reimbursementDate: number
  amount: number
  status: ExpenseStatusKey
}

const employeeIds = employees.map((e) => e.id)
const pick = <T,>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)]

const EXPENSE_STATUS_KEYS: readonly ExpenseStatusKey[] = [
  'PENDING',
  'PROCESSING',
  'REIMBURSED',
  'FAILED',
] as const

export const EXPENSE_STATUS_SET: ReadonlySet<string> = new Set(EXPENSE_STATUS_KEYS as unknown as string[])

export const expenses: Expense[] = Array.from({ length: 100 }).map((_, i) => {
  return {
    id: `${i + 1}`,
    employeeId: pick(employeeIds),
    reimbursementDate: Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30),
    amount: Number((Math.random() * 500 + 20).toFixed(2)),
    status: pick<ExpenseStatusKey>(EXPENSE_STATUS_KEYS),
  }
})


