'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { sql } from '@vercel/postgres';

// Definimos validación con Zod
const InvoiceSchema = z.object({
  customerId: z.string().uuid(),
  amount: z.coerce.number().int().positive(),
  status: z.enum(['pending', 'paid']),
});

// Acción para crear factura
export async function createInvoice(formData: FormData): Promise<void> {
  // 1. Validar datos recibidos
  const validatedFields = InvoiceSchema.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    console.error('Datos inválidos, por favor revisá el formulario.');
    return;
  }

  const { customerId, amount, status } = validatedFields.data;

  // 2. Guardar en la base de datos
  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status)
      VALUES (${customerId}, ${amount}, ${status})
    `;
  } catch (error) {
    console.error('Error insertando factura:', error);
    return;
  }

  // 3. Refrescar la lista de facturas
  revalidatePath('/dashboard/invoices');
}
