import { useMemo } from 'react';

import { Table } from '../ds/Table';

import { EmployeeCell } from './EmployeeCell';
import { StatusBadge } from './StatusBadge';

import { formatDate, formatMoneyUSD } from '@/lib/format';
import type { Expense } from '@/types/api';

const COLUMNS = [
  {
    header: 'Employee',
    accessor: 'employee',
  },
  {
    header: 'Reimbursement Date',
    accessor: 'date',
  },
  {
    header: 'Amount',
    accessor: 'amount',
  },
  {
    header: 'Status',
    accessor: 'status',
  },
] as const;

export function ExpensesTable({ rows }: { rows: Expense[] }) {
  const processedRows = useMemo(
    () =>
      rows.map(row => ({
        id: row.id,
        employee: <EmployeeCell name={row.employeeName} />,
        date: formatDate(row.reimbursementDate),
        amount: formatMoneyUSD(row.amount),
        status: <StatusBadge status={row.status} />,
      })),
    [rows]
  );

  return <Table columns={COLUMNS} rows={processedRows} />;
}
