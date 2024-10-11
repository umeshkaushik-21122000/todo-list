// src/components/TaskFilter.tsx
import React, { useState } from 'react';
import { useTaskContext } from '@/context/TaskContext';

const options = ['all', 'completed', 'incomplete'] as const; 

export default function TaskFilter() {
  const { dispatch } = useTaskContext();
  const [selected, setSelected] = useState<number>(0);

  const handleClick = (index: number) => {
    setSelected(index);
  };

  const handleDispatch = () => {
    dispatch({ type: 'SET_FILTER', payload: options[selected] });
  };

  return (
    <div className="flex gap-x-3 text-white  text-sm">
      {options.map((val, index) => (
        <button
          key={val}
          className={`border px-4  py-2 rounded-lg ${index === selected ? 'bg-green-600' : 'bg-black'}`}
          onClick={() => {
            handleClick(index);
            handleDispatch();
          }}
        >
          {val.toUpperCase()}
        </button>
      ))}
    </div>
  );
}