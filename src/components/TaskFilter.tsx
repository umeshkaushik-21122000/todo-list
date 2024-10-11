// src/components/TaskFilter.tsx
import React, { useState } from 'react';
import { useTaskContext } from '@/context/TaskContext';

const options = ['all', 'completed', 'incomplete']; 

export default function TaskFilter() {
  const { dispatch } = useTaskContext();
  const [selected, setSelected] = useState<number>(0);

  const handleClick = (index: number) => {
    setSelected(index);
    dispatch({ type: 'SET_FILTER', payload: options[index] });
  };


  return (
    <div className="flex gap-x-3 text-white  text-sm">
      {options.map((val, index) => (
        <button
          key={val}
          className={`border px-4  py-2 rounded-lg ${index === selected ? 'bg-green-600' : 'bg-black'}`}
          onClick={() => {
            handleClick(index);
          }}
        >
          {val.toUpperCase()}
        </button>
      ))}
    </div>
  );
}