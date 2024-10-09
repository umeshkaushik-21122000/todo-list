'use client';
import { useTaskContext } from '@/context/TaskContext';

export default function TaskList() {
  const { state, dispatch } = useTaskContext();

  const filteredTasks = (state.tasks || []).filter((task) => {
    if (state.filter === 'completed') return task.completed;
    if (state.filter === 'incomplete') return !task.completed;
    return true;
  })
  .filter((task) =>{
      if(task.text) return task.text.toLowerCase().includes((state.searchTerm || '').toLowerCase())
      return true;
  }
  );

  return (
    <ul>
      {filteredTasks.map((task) => (
        <li key={task.id} className="flex items-center mb-2">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => dispatch({ type: 'TOGGLE_TASK', payload: task.id })}
            className="mr-2"
          />
          <span className={task.completed ? 'line-through' : ''}>{task.text}</span>
          <button
            onClick={() => dispatch({ type: 'DELETE_TASK', payload: task.id })}
            className="ml-auto bg-red-500 text-white p-1 rounded"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}