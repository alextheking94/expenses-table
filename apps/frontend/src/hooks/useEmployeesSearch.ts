import { useFetchJson } from './useFetchJson';

import type { Employee } from '@/types/api';

interface UseEmployeesParams {
  searchTerm: string | null;
}

const EMPLOYEES_BASE_PATH = '/api/employees/search';

export const useEmployeesSearch = ({ searchTerm }: UseEmployeesParams) => {
  const {
    data: employees,
    loading,
    error,
  } = useFetchJson<Employee[]>(
    `${EMPLOYEES_BASE_PATH}?q=${encodeURIComponent(searchTerm?.trim() ?? '')}`
  );

  return {
    employees,
    loading,
    error,
  };
};
