// app/ui/dashboard/latest-invoices-wrapper.tsx
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { fetchLatestInvoices } from '@/app/lib/data';

export default async function LatestInvoicesWrapper() {
  const latestInvoices = await fetchLatestInvoices();
  return <LatestInvoices latestInvoices={latestInvoices} />;
}
