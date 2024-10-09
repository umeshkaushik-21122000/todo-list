// src/components/UndoRedo.tsx
import React from 'react';
import { useTaskContext } from '@/context/TaskContext';

export default function UndoRedo() {
  const { state, dispatch } = useTaskContext();

  return (
    <div className="mt-4">
      <button
        onClick={() => dispatch({ type: 'UNDO' })}
        disabled={state.historyIndex <= 0}
        className="bg-gray-500 text-white p-2 rounded mr-2"
      >
        Undo
      </button>
      <button
        onClick={() => dispatch({ type: 'REDO' })}
        disabled={state.historyIndex >= (state.history?.length || 0) - 1}
        className="bg-gray-500 text-white p-2 rounded"
      >
        Redo
      </button>
    </div>
  );
}