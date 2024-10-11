'use client';

import React from 'react';
import { TaskProvider } from '@/context/TaskContext';
import TaskList from '@/components/TaskList';
import TaskForm from '@/components/TaskForm';
import TaskFilter from '@/components/TaskFilter';
import TaskSearch from '@/components/TaskSearch';
import UndoRedo from '@/components/UndoRedo';

export default function Home() {
  return (

    <TaskProvider >
      <div className="container p-8">
        <div className='flex justify-between'>
        <h1 className="text-2xl font-bold mb-4">Task Management</h1>
          <TaskSearch />
          <TaskFilter />
        </div>
        <TaskForm />
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        </div>
        <TaskList />
        <UndoRedo />
      </div>
    </TaskProvider>

  );
}
