import { Box, Button, Input, List, ListItem, Popover, PopoverArrow, PopoverBody, PopoverContent, PopoverTrigger, Text } from '@chakra-ui/react'
import { useEffect, useMemo, useState } from 'react'

import { fetchJson } from '@/lib/http'
import type { Employee } from '@/types/api'

type Props = {
  employees: Employee[]
  value: string | null
  onChange: (id: string | null) => void
}

export function EmployeeFilter({ employees, value, onChange }: Props) {
  const [query, setQuery] = useState('')
  const [remote, setRemote] = useState<Employee[] | null>(null)

  useEffect(() => {
    const q = query.trim()
    if (!q) {
      setRemote(null)
      return
    }
    fetchJson<Employee[]>(`/api/employees/search?q=${encodeURIComponent(q)}`)
      .then((res) => {
        setRemote(res)
      })
      .catch(() => {
        setRemote([])
      })
  }, [query])

  const filtered = useMemo(() => {
    const q = query.trim()
    if (!q) return employees
    return remote ?? []
  }, [employees, query, remote])

  const selected = employees.find((e) => e.id === value)

  return (
    <Popover placement="bottom-start" matchWidth>
      <PopoverTrigger>
        <Button variant="outline" size="sm">
          {selected ? selected.name : 'All employees'}
        </Button>
      </PopoverTrigger>
      <PopoverContent w="sm">
        <PopoverArrow />
        <PopoverBody>
          <Box>
            <Input
              size="sm"
              placeholder="Search employees..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              mb={2}
            />
            <List maxH="240px" overflowY="auto" spacing={1}>
              <ListItem>
                <Button size="sm" variant="ghost" w="100%" justifyContent="flex-start" onClick={() => onChange(null)}>
                  All employees
                </Button>
              </ListItem>
              {filtered.map((e) => (
                <ListItem key={e.id}>
                  <Button
                    size="sm"
                    variant={value === e.id ? 'solid' : 'ghost'}
                    colorScheme={value === e.id ? 'teal' : undefined}
                    w="100%"
                    justifyContent="flex-start"
                    onClick={() => onChange(e.id)}
                  >
                    <Text>{e.name}</Text>
                  </Button>
                </ListItem>
              ))}
            </List>
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

