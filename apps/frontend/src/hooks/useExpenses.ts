import { useEffect, useMemo, useState } from 'react';

import { useFetchJson } from './useFetchJson';

import type { Expense, Paginated } from '@/types/api';

export interface UseExpensesParams {
  employeeId?: string | null;
  page?: number;
  pageSize?: number;
}

const EXPENSES_BASE_PATH = '/api/expenses';

export const useExpenses = ({ employeeId, page = 1, pageSize = 10 }: UseExpensesParams) => {
  const [items, setItems] = useState<Expense[] | null>(null);
  const [meta, setMeta] = useState<{ page: number; pageSize: number; total: number }>({
    page,
    pageSize,
    total: 0,
  });

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

    return searchParams.toString();
  }, [employeeId, page, pageSize]);

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
