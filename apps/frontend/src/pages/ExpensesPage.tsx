import { Box, Center, Heading, HStack, Spinner } from '@chakra-ui/react'
import { useMemo, useState } from 'react'

import { EmployeeFilter } from '@/components/expenses/EmployeeFilter'
import { ExpensesTable } from '@/components/expenses/ExpensesTable'
import { useEmployees } from '@/hooks/useEmployees'
import { useExpenseRows } from '@/hooks/useExpenseRows'
import { useExpenses } from '@/hooks/useExpenses'

export default function ExpensesPage() {
  const { data: employees, loading: loadingEmployees, error: errEmp } = useEmployees()
  const { data: expenses, loading: loadingExpenses, error: errExp } = useExpenses()
  const rows = useExpenseRows(employees, expenses)
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null)
  const filteredRows = useMemo(() => {
    if (!rows) return null
    if (!selectedEmployeeId) return rows
    return rows.filter((r) => r.employeeId === selectedEmployeeId)
  }, [rows, selectedEmployeeId])

  if (loadingEmployees || loadingExpenses) {
    return (
      <Center p={10}>
        <Spinner />
      </Center>
    )
  }

  if (errEmp || errExp) {
    return (
      <Center p={10}>
        <Box color="red.500">Failed to load data.</Box>
      </Center>
    )
  }

  if (!rows) {
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
        {employees && (
          <EmployeeFilter
            employees={employees}
            value={selectedEmployeeId}
            onChange={setSelectedEmployeeId}
          />
        )}
      </HStack>
      <ExpensesTable rows={filteredRows ?? rows} />
    </Box>
  )
}

