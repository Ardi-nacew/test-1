'use client';

import Link from 'next/link';
import { toggleTask, useTasks } from '@/lib/taskStore';

export default function TaskDetail({ id }: { id: number }) {
  const tasks = useTasks();
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return (
      <section className="mx-auto max-w-md p-6">
        <h1 className="text-2xl font-bold">Task not found</h1>
        <Link href="/board" className="mt-4 inline-block text-blue-600 underline">
          Back to the board
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-md p-6">
      <Link href="/board" className="text-sm text-blue-600 underline">
        Back to the board
      </Link>
      <h1 className={`mt-4 text-2xl font-bold ${task.done ? 'text-gray-400 line-through' : ''}`}>
        {task.title}
      </h1>
      <p className="mt-1 text-sm text-gray-600">Status: {task.done ? 'Done' : 'Open'}</p>
      <button
        type="button"
        onClick={() => toggleTask(task.id)}
        className="mt-4 rounded bg-black px-4 py-2 text-white"
      >
        {task.done ? 'Reopen task' : 'Mark as done'}
      </button>
    </section>
  );
}
