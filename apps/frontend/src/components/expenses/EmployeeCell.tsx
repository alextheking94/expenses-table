import { Avatar, HStack, Text } from '@chakra-ui/react'

export function EmployeeCell({ name }: { name?: string }) {
  if (!name) {
    return (
      <HStack spacing={3}>
        <Avatar size="sm" name="Unknown" />
        <Text color="gray.500">Unknown</Text>
      </HStack>
    )
  }
  return (
    <HStack spacing={3}>
      <Avatar size="sm" name={name} />
      <Text>{name}</Text>
    </HStack>
  )
}

