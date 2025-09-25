// app/seed/route.ts
import { NextResponse } from 'next/server';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function GET() {
  try {
    // 1) Crear tablas si no existen (base)
    await sql/*sql*/`
      CREATE TABLE IF NOT EXISTS customers (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
      );
    `;

    await sql/*sql*/`
      CREATE TABLE IF NOT EXISTS invoices (
        id SERIAL PRIMARY KEY,
        customer_id INTEGER NOT NULL REFERENCES customers(id),
        amount INTEGER NOT NULL
      );
    `;

    await sql/*sql*/`
      CREATE TABLE IF NOT EXISTS revenue (
        month TEXT PRIMARY KEY,
        revenue INTEGER NOT NULL
      );
    `;

    // 2) Migraciones suaves: agregar columnas si faltan
    await sql/*sql*/`ALTER TABLE customers ADD COLUMN IF NOT EXISTS email TEXT;`;
    await sql/*sql*/`ALTER TABLE customers ADD COLUMN IF NOT EXISTS image_url TEXT;`;
    await sql/*sql*/`ALTER TABLE invoices  ADD COLUMN IF NOT EXISTS status TEXT;`;
    await sql/*sql*/`ALTER TABLE invoices  ADD COLUMN IF NOT EXISTS date DATE;`;

    // 2.1) Asegurar UNIQUE en customers.email (si no existe)
    await sql/*sql*/`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint
          WHERE conname = 'customers_email_key'
        ) THEN
          ALTER TABLE customers ADD CONSTRAINT customers_email_key UNIQUE (email);
        END IF;
      END
      $$;
    `;

    // 2.2) Backfill para filas antiguas (evita NULLs)
    await sql/*sql*/`UPDATE invoices SET status = 'paid' WHERE status IS NULL;`;
    await sql/*sql*/`UPDATE invoices SET date   = CURRENT_DATE WHERE date IS NULL;`;

    // 3) Insertar datos de ejemplo (idempotente)
    await sql/*sql*/`
      INSERT INTO customers (name, email, image_url) VALUES
        ('Ada Lovelace','ada@example.com','https://i.pravatar.cc/64?img=1'),
        ('Grace Hopper','grace@example.com','https://i.pravatar.cc/64?img=2'),
        ('Evil Rabbit','rabbit@example.com','https://i.pravatar.cc/64?img=3')
      ON CONFLICT (email) DO NOTHING;
    `;

    const ada   = await sql/*sql*/`SELECT id FROM customers WHERE email='ada@example.com' LIMIT 1;`;
    const grace = await sql/*sql*/`SELECT id FROM customers WHERE email='grace@example.com' LIMIT 1;`;
    const evil  = await sql/*sql*/`SELECT id FROM customers WHERE email='rabbit@example.com' LIMIT 1;`;

    await sql/*sql*/`
      INSERT INTO invoices (customer_id, amount, status, date) VALUES
        (${ada[0].id},   145000, 'paid',    '2025-08-02'),
        (${grace[0].id},  99000, 'pending', '2025-08-03'),
        (${evil[0].id},   66600, 'paid',    '2025-08-04'),
        (${ada[0].id},   250000, 'paid',    '2025-08-06'),
        (${grace[0].id},  12000, 'pending', '2025-08-07')
      ON CONFLICT DO NOTHING;
    `;

    await sql/*sql*/`
      INSERT INTO revenue (month, revenue) VALUES
        ('Jan',1200000),('Feb',900000),('Mar',1500000),
        ('Apr',800000),('May',1000000),('Jun',1700000),
        ('Jul',1600000),('Aug',1900000),('Sep',1100000),
        ('Oct',1300000),('Nov',1400000),('Dec',2000000)
      ON CONFLICT (month) DO NOTHING;
    `;

    return NextResponse.json({ ok: true, message: 'Database seeded successfully' });
  } catch (e: any) {
    // Desempaquetar AggregateError para ver el motivo real
    const msg =
      e?.errors?.map?.((x: any) => x?.message || String(x)).join(' | ') ||
      e?.message ||
      String(e);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  } finally {
    await sql.end({ timeout: 1 });
  }
}
