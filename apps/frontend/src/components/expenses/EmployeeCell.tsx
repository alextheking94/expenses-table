import { Avatar, HStack, Text } from '@chakra-ui/react'

import type { Employee } from '@/types/api'

export function EmployeeCell({ employee }: { employee?: Employee }) {
  if (!employee) {
    return (
      <HStack spacing={3}>
        <Avatar size="sm" name="Unknown" />
        <Text color="gray.500">Unknown</Text>
      </HStack>
    )
  }
  return (
    <HStack spacing={3}>
      <Avatar size="sm" name={employee.name} />
      <Text>{employee.name}</Text>
    </HStack>
  )
}

