import { CheckCircleIcon, WarningTwoIcon, TimeIcon, RepeatIcon } from '@chakra-ui/icons';
import { HStack, Icon, Text } from '@chakra-ui/react';

import type { ExpenseStatus } from '@/types/api';

const statusMeta: Record<ExpenseStatus, { label: string; icon: any; bg: string }> = {
  PENDING: { label: 'Pending Reimbursement', icon: TimeIcon, bg: 'yellow.700' },
  PROCESSING: { label: 'Processing Reimbursement', icon: RepeatIcon, bg: 'blue.600' },
  REIMBURSED: { label: 'Reimbursed', icon: CheckCircleIcon, bg: 'green.600' },
  FAILED: { label: 'Reimbursement Failed', icon: WarningTwoIcon, bg: 'red.600' },
};

export function StatusBadge({ status }: { status: ExpenseStatus }) {
  const meta = statusMeta[status];
  const bg = meta.bg;
  const fg = 'white';
  const Comp = meta.icon;
  return (
    <HStack bg={bg} color={fg} spacing={2} justify="center" px={2} py={1} borderRadius="md">
      <Icon as={Comp} boxSize={4} />
      <Text fontSize="sm" fontWeight="semibold">
        {meta.label}
      </Text>
    </HStack>
  );
}
