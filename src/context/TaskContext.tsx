// src/context/TaskContext.tsx
import React, { createContext, useContext, useEffect, useReducer } from 'react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

type ActionType =
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_FILTER'; payload: string }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'UNDO' }
  | { type: 'REDO' };

interface State {
  tasks: Task[];
  filter: string;
  searchTerm: string;
  history: Task[][];
  historyIndex: number;
}

const initialState: State = {
    tasks: [],
    filter: 'all',
    searchTerm: '',
    history: [],
    historyIndex: -1,
  };
  


const TaskContext = createContext<{
  state: State;
  dispatch: React.Dispatch<ActionType>;
} | undefined>(undefined);

function taskReducer(state: State, action: ActionType): State {
  let newTasks: Task[];
  let newHistory: Task[][];
  let newHistoryIndex: number;

  switch (action.type) {
    case 'ADD_TASK':
        newTasks = [...(state.tasks || []), action.payload];
        newHistory = [...(state.history || []).slice(0, state.historyIndex + 1), newTasks];
        newHistoryIndex = newHistory.length - 1;
        return { ...state, tasks: newTasks, history: newHistory, historyIndex: newHistoryIndex };
  
      case 'TOGGLE_TASK':
        newTasks = (state.tasks || []).map((task) =>
          task.id === action.payload ? { ...task, completed: !task.completed } : task
        );
        newHistory = [...(state.history || []).slice(0, state.historyIndex + 1), newTasks];
        newHistoryIndex = newHistory.length - 1;
        return { ...state, tasks: newTasks, history: newHistory, historyIndex: newHistoryIndex };
  
      case 'DELETE_TASK':
        newTasks = (state.tasks || []).filter((task) => task.id !== action.payload);
        newHistory = [...(state.history || []).slice(0, state.historyIndex + 1), newTasks];
        newHistoryIndex = newHistory.length - 1;
        return { ...state, tasks: newTasks, history: newHistory, historyIndex: newHistoryIndex };  

    case 'SET_FILTER':
      return { ...state, filter: action.payload };

    case 'SET_SEARCH':
      return { ...state, searchTerm: action.payload };

    case 'UNDO':
      if (state.historyIndex > 0) {
        return {
          ...state,
          tasks: state.history[state.historyIndex - 1],
          historyIndex: state.historyIndex - 1,
        };
      }
      return state;

    case 'REDO':
      if (state.historyIndex < state.history.length - 1) {
        return {
          ...state,
          tasks: state.history[state.historyIndex + 1],
          historyIndex: state.historyIndex + 1,
        };
      }
      return state;

    default:
      return state;
  }
}

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      dispatch({ type: 'ADD_TASK', payload: parsedTasks });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}
