import { Box, Button, Center, Heading, HStack, Spinner, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { EmployeeFilter } from '@/components/expenses/EmployeeFilter';
import { ExpensesTable } from '@/components/expenses/ExpensesTable';
import { useExpenses } from '@/hooks/useExpenses';

const PAGE_SIZE = 10;

export default function ExpensesPage() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const {
    items,
    meta: { total },
    loading,
    error,
  } = useExpenses({ employeeId: selectedEmployeeId, page, pageSize: PAGE_SIZE });
  const maxPage = Math.max(1, Math.ceil(total / PAGE_SIZE));

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

  if (!items) {
    return (
      <Center p={10}>
        <Box color="gray.500">No data available.</Box>
      </Center>
    );
  }

  return (
    <Box px={8} py={6} width="100%">
      <Heading size="lg" mb={4}>
        Expenses
      </Heading>
      <HStack mb={4}>
        <EmployeeFilter selectedEmployeeId={selectedEmployeeId} onChange={setSelectedEmployeeId} />
      </HStack>
      <ExpensesTable rows={items} />
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
