import { useState } from 'react';

import { Filter } from '../ds/Filter';

import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { useEmployeesSearch } from '@/hooks/useEmployeesSearch';
import type { Employee } from '@/types/api';

type Props = {
  selectedEmployee: Employee | null;
  onChange: (employee: Employee | null) => void;
};

export function EmployeeFilter({ selectedEmployee, onChange }: Props) {
  const [query, setQuery] = useState('');

  const debouncedQuery = useDebouncedValue(query, 300);

  const { employees } = useEmployeesSearch({ searchTerm: debouncedQuery });

  return (
    <Filter
      title={selectedEmployee ? selectedEmployee.name : 'All employees'}
      filterOptions={[
        {
          id: 'all-employees-option',
          selected: !selectedEmployee === null,
          onClick: () => onChange(null),
          title: 'All employees',
        },
      ].concat(
        employees?.map(employee => ({
          id: employee.id,
          selected: selectedEmployee?.id === employee.id,
          onClick: () => onChange(employee),
          title: employee.name,
        })) ?? []
      )}
      queryConfig={{
        active: true,
        onQueryChange: value => setQuery(value),
        placeholder: 'Search employees...',
      }}
    />
  );
}
