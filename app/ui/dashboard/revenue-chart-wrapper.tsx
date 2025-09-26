// app/ui/dashboard/revenue-chart-wrapper.tsx
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import { fetchRevenue } from '@/app/lib/data';

export default async function RevenueChartWrapper() {
  const revenue = await fetchRevenue();
  return <RevenueChart revenue={revenue} />;
}
