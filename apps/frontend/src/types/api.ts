export type Employee = {
  id: string;
  name: string;
  title: string;
  department: string;
};

export type ExpenseStatus = 'PENDING' | 'PROCESSING' | 'REIMBURSED' | 'FAILED';

export type Expense = {
  id: string;
  employeeId: string;
  employeeName: string;
  reimbursementDate: number;
  amount: number;
  status: ExpenseStatus;
};

export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
};
