export type Employee = {
  id: string
  name: string
  title: string
  department: string
}

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

