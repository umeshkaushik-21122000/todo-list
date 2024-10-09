// src/components/TaskForm.tsx
import  { useState } from 'react';
import { useTaskContext } from '@/context/TaskContext';

export default function TaskForm() {
  const [taskText, setTaskText] = useState('');
  const { dispatch } = useTaskContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      dispatch({
        type: 'ADD_TASK',
        payload: { id: Date.now().toString(), text: taskText.trim(), completed: false },
      });
      setTaskText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add a new task"
        className="border p-2 mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Task
      </button>
    </form>
  );
}
