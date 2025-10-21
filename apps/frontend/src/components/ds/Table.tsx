import { Table as ChakraTable, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

interface Row {
  id: string;
  [key: string]: React.ReactNode;
}

interface TableProps<T extends Row> {
  columns: Readonly<
    Array<{
      header: string;
      accessor: keyof T;
    }>
  >;
  rows: T[];
}

export const Table = <T extends Row>({ columns, rows }: TableProps<T>) => {
  return (
    <ChakraTable variant="simple" size="sm" width="100%" sx={{ 'th, td': { py: 2 } }}>
      <Thead bg="gray.50">
        <Tr>
          {columns.map(column => (
            <Th>{column.header}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {rows.map(row => (
          <Tr key={row.id}>
            {columns.map(column => (
              <Td key={column.header}>{row[column.accessor]}</Td>
            ))}
          </Tr>
        ))}
      </Tbody>
    </ChakraTable>
  );
};
