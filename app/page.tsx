import Link from 'next/link';

export default function Home() {
  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-3xl font-bold">Welcome</h1>
      <Link href="/board" className="mt-4 inline-block text-blue-600 underline">
        Go to the board
      </Link>
    </main>
  );
}
