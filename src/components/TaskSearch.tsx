// Updated src/components/TaskSearch.tsx
import React, { useState, useEffect } from 'react';
import { useTaskContext } from '@/context/TaskContext';
import useDebounce from '../hooks/useDebounce';
import SearchIcon from '@/Assets/Search.svg';
import Image from 'next/image';
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
    <div className='relative'>
      <Image src={SearchIcon} className='absolute top-3 left-2' alt="search-icon" height={20} width={20} />
      <input
      type="text"
      value={searchTerm}
      onChange={handleSearch}
      placeholder="Search tasks"
      className="w-100 border text-gray-600 border-gray-400 px-12 py-2 rounded-full"
    />
    </div>


  );
}