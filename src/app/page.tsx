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
      <div className="container p-8 font-semibold">
        <div className='flex flex-col lg:flex-row justify-between lg:items-center py-4 gap-y-4'>
        <h1 className="text-2xl align-middle font-bold">Task Management</h1>
          <TaskSearch />
          <TaskFilter />
        </div>
        <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center gap-y-4'>
        <TaskForm />
        <div>
        <UndoRedo />
        </div>
        </div>
        <TaskList />
      </div>
    </TaskProvider>

  );
}
