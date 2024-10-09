// src/components/TaskFilter.tsx
import React from 'react';
import { useTaskContext } from '@/context/TaskContext';

export default function TaskFilter() {
  const { dispatch } = useTaskContext();

  return (
    <div className="mb-4">
      <select
        onChange={(e) => dispatch({ type: 'SET_FILTER', payload: e.target.value })}
        className="border p-2"
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>
    </div>
  );
}