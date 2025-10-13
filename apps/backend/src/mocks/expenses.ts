import { employees } from './employees'

export type ExpenseStatus =
  | 'Pending Reimbursement'
  | 'Processing Reimbursement'
  | 'Reimbursed'
  | 'Reimbursement Failed'

export type Expense = {
  id: string
  employeeId: string
  reimbursementDate: number
  amount: number
  status: ExpenseStatus
}

const employeeIds = employees.map((e) => e.id)
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

export const expenses: Expense[] = Array.from({ length: 50 }).map((_, i) => {
  return {
    id: `${i + 1}`,
    employeeId: pick(employeeIds),
    reimbursementDate: Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30),
    amount: Number((Math.random() * 500 + 20).toFixed(2)),
    status: pick<ExpenseStatus>([
      'Pending Reimbursement',
      'Processing Reimbursement',
      'Reimbursed',
      'Reimbursement Failed',
    ]),
  }
})


