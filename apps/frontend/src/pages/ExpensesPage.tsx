import { Box, Center, Heading, HStack, Spinner } from '@chakra-ui/react'
import { useMemo, useState } from 'react'

import { EmployeeFilter } from '@/components/expenses/EmployeeFilter'
import { ExpensesTable } from '@/components/expenses/ExpensesTable'
import { useExpenses } from '@/hooks/useExpenses'

export default function ExpensesPage() {
  const { data: expenses, loading: loadingExpenses, error: errExp } = useExpenses()
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null)
  const filteredRows = useMemo(() => {
    if (!expenses) return null
    if (!selectedEmployeeId) return expenses
    return expenses.filter((r) => r.employeeId === selectedEmployeeId)
  }, [expenses, selectedEmployeeId])

  if (loadingExpenses) {
    return (
      <Center p={10}>
        <Spinner />
      </Center>
    )
  }

  if (errExp) {
    return (
      <Center p={10}>
        <Box color="red.500">Failed to load data.</Box>
      </Center>
    )
  }

  if (!expenses) {
    return (
      <Center p={10}>
        <Box color="gray.500">No data available.</Box>
      </Center>
    )
  }

  return (
    <Box px={8} py={6} width="100%">
      <Heading size="lg" mb={4}>Expenses</Heading>
      <HStack mb={4}>
        <EmployeeFilter
          value={selectedEmployeeId}
          onChange={setSelectedEmployeeId}
        />
      </HStack>
      <ExpensesTable rows={filteredRows ?? expenses} />
    </Box>
  )
}

