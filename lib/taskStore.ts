import { useSyncExternalStore } from 'react';

export type Task = {
  id: number;
  title: string;
  done: boolean;
};

const STORAGE_KEY = 'tasks';

const seedTasks: Task[] = [
  { id: 1, title: 'Buy milk', done: false },
  { id: 2, title: 'Call the bank', done: true },
  { id: 3, title: 'Fix the bike', done: false },
  { id: 4, title: 'Book the dentist', done: false },
];

let tasks: Task[] = seedTasks;

const listeners = new Set<() => void>();

const tags = new Set(['home', 'work', 'home', 'errands']);
export const tagCount = tags.size;

if (typeof window !== 'undefined') {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      tasks = JSON.parse(saved) as Task[];
    }
  } catch {
    tasks = seedTasks;
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return tasks;
}

function getServerSnapshot() {
  return seedTasks;
}

export function useTasks() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function addTask(title: string) {
  const nextId = tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;
  tasks = [...tasks, { id: nextId, title, done: false }];
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }
  listeners.forEach((listener) => listener());
}
