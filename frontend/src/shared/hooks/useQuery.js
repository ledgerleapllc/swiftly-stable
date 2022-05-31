import { useLocation } from 'react-router-dom';

const { useMemo } = require('react');

export const useQuery = () => {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
};
