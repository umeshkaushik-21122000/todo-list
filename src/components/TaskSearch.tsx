// Updated src/components/TaskSearch.tsx
import React, { useState, useEffect } from 'react';
import { useTaskContext } from '@/context/TaskContext';
import useDebounce from '../hooks/useDebounce';

export default function TaskSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const { dispatch } = useTaskContext();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    dispatch({ type: 'SET_SEARCH', payload: debouncedSearchTerm || '' });
  }, [debouncedSearchTerm, dispatch]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleSearch}
      placeholder="Search tasks"
      className="border p-2"
    />
  );
}