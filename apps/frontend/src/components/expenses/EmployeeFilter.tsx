import { useState } from 'react';

import { Filter } from '../ds/Filter';

import { useEmployeesSearch } from '@/hooks/useEmployeesSearch';

type Props = {
  selectedEmployeeId: string | null;
  onChange: (id: string | null) => void;
};

export function EmployeeFilter({ selectedEmployeeId, onChange }: Props) {
  const [query, setQuery] = useState('');
  const { employees } = useEmployeesSearch({ searchTerm: query });

  const selected = employees?.find(employee => employee.id === selectedEmployeeId);

  return (
    <Filter
      title={selected ? selected.name : 'All employees'}
      filterOptions={[
        {
          id: 'all-employees-option',
          selected: selectedEmployeeId === null,
          onClick: () => onChange(null),
          title: 'All employees',
        },
      ].concat(
        employees?.map(employee => ({
          id: employee.id,
          selected: selected?.id === employee.id,
          onClick: () => onChange(employee.id),
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
