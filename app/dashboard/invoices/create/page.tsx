import Link from 'next/link';
import { createInvoice } from '@/app/lib/actions';

export default function CreateInvoicePage() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Crear factura</h1>

      <form action={createInvoice} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium">Cliente (UUID)</label>
          <input
            type="text"
            name="customerId"
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Monto (centavos)</label>
          <input
            type="number"
            name="amount"
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Estado</label>
          <select name="status" className="border p-2 w-full">
            <option value="pending">Pendiente</option>
            <option value="paid">Pagada</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Guardar
          </button>

          <Link
            href="/dashboard/invoices"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Volver al listado
          </Link>
        </div>
      </form>
    </main>
  );
}
