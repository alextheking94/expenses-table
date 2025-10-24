import { Box, Button, Heading, HStack, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { EmployeeFilter } from '@/components/expenses/EmployeeFilter';
import { ExpenseFilter } from '@/components/expenses/ExpenseFilter';
import { ExpensesTable } from '@/components/expenses/ExpensesTable';
import { useExpenses } from '@/hooks/useExpenses';
import type { Employee } from '@/types/api';

const PAGE_SIZE = 10;

export default function ExpensesPage() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [page, setPage] = useState(1);
  const [filterState, setFilterState] = useState([
    {
      id: '1',
      selected: false,
      title: 'PROCESSING',
    },
    {
      id: '2',
      selected: false,
      title: 'PENDING',
    },
    {
      id: '3',
      selected: false,
      title: 'REIMBURSED',
    },
    {
      id: '4',
      selected: false,
      title: 'FAILED',
    },
  ]);

  const filterOptions = filterState.map((filter, index) => {
    return {
      ...filter,
      onClick: () => {
        setFilterState(filters => {
          const copyOfState = [...filters];
          const selectedFilter = copyOfState[index];
          copyOfState[index] = { ...selectedFilter, selected: !selectedFilter.selected };
          return copyOfState;
        });
      },
    };
  });

  const statusArray = filterState.filter(f => f.selected).map(f => f.title);

  const {
    items,
    meta: { total },
    loading,
    error,
  } = useExpenses({
    employeeId: selectedEmployee?.id,
    page,
    pageSize: PAGE_SIZE,
    status: statusArray,
  });
  const maxPage = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <Box px={8} py={6} width="100%">
      <Heading size="lg" mb={4}>
        Expenses
      </Heading>
      <HStack mb={4}>
        <EmployeeFilter selectedEmployee={selectedEmployee} onChange={setSelectedEmployee} />
        <ExpenseFilter filterOptions={filterOptions} />
      </HStack>
      <ExpensesTable rows={items ?? []} loading={loading} error={error} />
      <HStack mt={4} justify="space-between">
        <Button size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} isDisabled={page === 1}>
          Prev
        </Button>
        <Text fontSize="sm">
          Page {page} of {maxPage}
        </Text>
        <Button
          size="sm"
          onClick={() => setPage(p => Math.min(maxPage, p + 1))}
          isDisabled={page >= maxPage}
        >
          Next
        </Button>
      </HStack>
    </Box>
  );
}
