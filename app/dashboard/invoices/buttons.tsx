import Link from 'next/link';

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="rounded bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
    >
      Crear factura
    </Link>
  );
}
