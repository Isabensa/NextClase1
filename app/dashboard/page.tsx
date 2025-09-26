// app/dashboard/page.tsx
import { Suspense } from 'react';
import { lusitana } from '@/app/ui/fonts';
import CardsWrapper from '@/app/ui/dashboard/cards-wrapper';
import RevenueChartWrapper from '@/app/ui/dashboard/revenue-chart-wrapper';
import LatestInvoicesWrapper from '@/app/ui/dashboard/latest-invoices-wrapper';

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardsWrapper />
        </Suspense>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <div className="md:col-span-4 lg:col-span-5">
          <Suspense fallback={<ChartSkeleton />}>
            <RevenueChartWrapper />
          </Suspense>
        </div>
        <div className="md:col-span-4 lg:col-span-3">
          <Suspense fallback={<InvoicesSkeleton />}>
            <LatestInvoicesWrapper />
          </Suspense>
        </div>
      </div>
    </main>
  );
}

/* Skeletons (fallbacks) */
function CardsSkeleton() {
  return (
    <>
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-24 rounded-lg bg-gray-200 animate-pulse" />
      ))}
    </>
  );
}
function ChartSkeleton() {
  return <div className="h-72 rounded-lg bg-gray-200 animate-pulse" />;
}
function InvoicesSkeleton() {
  return <div className="h-72 rounded-lg bg-gray-200 animate-pulse" />;
}
