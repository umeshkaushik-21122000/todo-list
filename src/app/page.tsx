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
    <TaskProvider>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Task Management</h1>
        <TaskForm />
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <TaskFilter />
          <TaskSearch />
        </div>
        <TaskList />
        <UndoRedo />
      </div>
    </TaskProvider>
  );
}
