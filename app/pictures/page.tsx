/* eslint-disable @next/next/no-img-element */
export default function PicturesPage() {
  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-bold">Pictures</h1>
      <img
        src="https://images.unsplash.com/photo-0000000000000-000000000000?w=320"
        width={320}
        height={200}
        alt="Missing photo"
      />
      <img
        src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=640"
        width={640}
        height={427}
        alt="Coffee"
      />
    </main>
  );
}
