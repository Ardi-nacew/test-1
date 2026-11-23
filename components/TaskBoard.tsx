'use client';

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { addTask, tagCount, useTasks } from '@/lib/taskStore';

type Filter = 'all' | 'open' | 'done';

export default function TaskBoard() {
  const tasks = useTasks();
  const [filter, setFilter] = useState<Filter>('all');
  const [title, setTitle] = useState('');

  const open = tasks.filter((task) => !task.done).length;

  const visibleTasks = tasks.filter((task) => {
    if (filter === 'open') return !task.done;
    if (filter === 'done') return task.done;
    return true;
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    addTask(trimmed);
    setTitle('');
  }

  return (
    <section className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-bold">My task board</h1>
      <p className="mt-1 text-sm text-gray-600">
        {open} open · {tagCount} tags
      </p>

      <div className="mt-4">
        {open > 2 ? (<Image src="/next.svg" alt="Busy" width={80} height={20} />) : (<span>All calm</span>)}
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="New task"
          aria-label="New task"
          className="flex-1 rounded border border-gray-300 px-3 py-2"
        />
        <button type="submit" className="rounded bg-black px-4 py-2 text-white">
          Add
        </button>
      </form>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`rounded px-3 py-1 ${filter === 'all' ? 'bg-black text-white' : 'bg-gray-100'}`}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => setFilter('open')}
          className={`rounded px-3 py-1 ${filter === 'open' ? 'bg-black text-white' : 'bg-gray-100'}`}
        >
          Open
        </button>
        <button
          type="button"
          onClick={() => setFilter('done')}
          className={`rounded px-3 py-1 ${filter === 'done' ? 'bg-black text-white' : 'bg-gray-100'}`}
        >
          Done
        </button>
      </div>

      <ul className="mt-4 space-y-2">
        {visibleTasks.map((task) => (
          <li key={task.id}>
            <Link
              href={`/board/${task.id}`}
              className={`block rounded border border-gray-200 px-3 py-2 hover:bg-gray-50 ${task.done ? 'text-gray-400 line-through' : ''}`}
            >
              {task.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
