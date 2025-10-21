import { useEffect, useState } from 'react';

interface UseFetchJsonReturn<T> {
  data: T | null;
  loading: boolean;
  error: boolean;
}

export const useFetchJson = <T>(url: string): UseFetchJsonReturn<T> => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    fetch(url, { signal: controller.signal })
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }

        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        if ('name' in error && error.name === 'AbortError') {
          return;
        }
        setLoading(false);
        setError(true);
      });

    return () => {
      controller.abort();
    };
  }, [url]);

  console.log(url, {
    data,
    loading,
    error,
  });

  return {
    data,
    loading,
    error,
  };
};
