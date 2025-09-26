export default function Loading() {
  return (
    <main className="animate-pulse">
      <div className="mb-4 h-7 w-48 rounded bg-gray-200 md:h-8" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-24 rounded-lg bg-gray-200" />
        ))}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <div className="h-72 rounded-lg bg-gray-200 md:col-span-4 lg:col-span-5" />
        <div className="h-72 rounded-lg bg-gray-200 md:col-span-4 lg:col-span-3" />
      </div>
    </main>
  );
}
