import { useEffect, useMemo, useState } from 'react';

import { useFetchJson } from './useFetchJson';

import type { Expense, Paginated } from '@/types/api';

export interface UseExpensesParams {
  employeeId?: string | null;
  page?: number;
  pageSize?: number;
  status?: string[];
}

const EXPENSES_BASE_PATH = '/api/expenses';

// `/api/expenses?status=PENDING,FAILED`
// `/api/expenses?employeeId=5&status=PROCESSING,REIMBURSED`

export const useExpenses = ({
  employeeId,
  page = 1,
  pageSize = 10,
  status = [],
}: UseExpensesParams) => {
  const [items, setItems] = useState<Expense[] | null>(null);
  const [meta, setMeta] = useState<{ page: number; pageSize: number; total: number }>({
    page,
    pageSize,
    total: 0,
  });

  const statusString = status.length ? status.join(',') : null;

  const query = useMemo(() => {
    const searchParams = new URLSearchParams();
    if (employeeId) {
      searchParams.set('employeeId', employeeId);
    }
    if (page) {
      searchParams.set('page', String(page));
    }
    if (pageSize) {
      searchParams.set('pageSize', String(pageSize));
    }
    if (statusString) {
      searchParams.set('status', statusString);
    }

    return searchParams.toString();
  }, [employeeId, page, pageSize, statusString]);

  const {
    data: expensesResponse,
    loading,
    error,
  } = useFetchJson<Paginated<Expense>>(`${EXPENSES_BASE_PATH}?${query}`);

  useEffect(() => {
    if (expensesResponse) {
      setItems(expensesResponse.items);
      setMeta({
        page: expensesResponse.page,
        pageSize: expensesResponse.pageSize,
        total: expensesResponse.total,
      });
    }
  }, [expensesResponse]);

  return {
    items,
    meta,
    loading,
    error,
  };
};
