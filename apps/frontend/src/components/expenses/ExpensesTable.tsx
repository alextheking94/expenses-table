import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'

import { EmployeeCell } from './EmployeeCell'
import { StatusBadge } from './StatusBadge'

import { formatDate, formatMoneyUSD } from '@/lib/format'
  import type { Expense } from '@/types/api'

export function ExpensesTable({ rows }: { rows: Expense[] }) {
  return (
    <Table variant="simple" size="sm" width="100%" sx={{ 'th, td': { py: 2 } }}>
      <Thead bg="gray.50">
        <Tr>
          <Th>Employee</Th>
          <Th>Reimbursement Date</Th>
          <Th isNumeric>Amount</Th>
          <Th textAlign="right">Status</Th>
        </Tr>
      </Thead>
      <Tbody>
        {rows.map((r) => (
          <Tr key={r.id}>
            <Td><EmployeeCell name={r.employeeName} /></Td>
            <Td>{formatDate(r.reimbursementDate)}</Td>
            <Td isNumeric>{formatMoneyUSD(r.amount)}</Td>
            <Td><StatusBadge status={r.status} /></Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}
