import { CheckCircleIcon, WarningTwoIcon, TimeIcon, RepeatIcon } from '@chakra-ui/icons'
import { HStack, Icon, Text } from '@chakra-ui/react'

import type { ExpenseStatus } from '@/types/api'

export function StatusBadge({ status }: { status: ExpenseStatus }) {
  let bg = 'gray.700'
  let fg = 'white'
  let Comp: any = TimeIcon
  switch (status) {
    case 'Pending Reimbursement':
      bg = 'yellow.700'
      Comp = TimeIcon
      break
    case 'Processing Reimbursement':
      bg = 'blue.600'
      Comp = RepeatIcon
      break
    case 'Reimbursed':
      bg = 'green.600'
      Comp = CheckCircleIcon
      break
    case 'Reimbursement Failed':
      bg = 'red.600'
      Comp = WarningTwoIcon
      break
  }
  return (
    <HStack bg={bg} color={fg} spacing={2} justify="center" px={2} py={1} borderRadius="md">
      <Icon as={Comp} boxSize={4} />
      <Text fontSize="sm" fontWeight="semibold">{status}</Text>
    </HStack>
  )
}

