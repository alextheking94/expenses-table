import { Box, Center, Spinner } from '@chakra-ui/react';
import { useMemo } from 'react';

import { Table } from '../ds/Table';

import { EmployeeCell } from './EmployeeCell';
import { StatusBadge } from './StatusBadge';

import { formatDate, formatMoneyUSD } from '@/lib/format';
import type { Expense } from '@/types/api';

interface ExpensesTableProps {
  rows?: Expense[];
  loading: boolean;
  error: boolean;
}

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

export function ExpensesTable({ rows, loading, error }: ExpensesTableProps) {
  const processedRows = useMemo(
    () =>
      rows?.map(row => ({
        id: row.id,
        employee: <EmployeeCell name={row.employeeName} />,
        date: formatDate(row.reimbursementDate),
        amount: formatMoneyUSD(row.amount),
        status: <StatusBadge status={row.status} />,
      })),
    [rows]
  );

  if (loading) {
    return (
      <Center p={10}>
        <Spinner />
      </Center>
    );
  }

  if (error) {
    return (
      <Center p={10}>
        <Box color="red.500">Failed to load data.</Box>
      </Center>
    );
  }

  if (!processedRows || processedRows.length === 0) {
    return (
      <Center p={10}>
        <Box color="gray.500">No data available.</Box>
      </Center>
    );
  }

  return <Table columns={COLUMNS} rows={processedRows} />;
}
