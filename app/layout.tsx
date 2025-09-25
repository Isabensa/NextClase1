// app/layout.tsx

// 1) Importamos los estilos globales de la app
import './ui/global.css';

// 2) Importamos la fuente Inter desde next/font/google
import { Inter } from 'next/font/google';

// 3) Configuramos la fuente: usamos el subset 'latin'
//    Esto asegura que solo se incluyan los caracteres necesarios
const inter = Inter({ subsets: ['latin'] });

// Metadata básica para la aplicación
export const metadata = {
  title: 'Next.js Dashboard',
  description: 'Curso Dashboard App',
};

// RootLayout: se aplica a todas las páginas
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      {/* 4) Aplicamos la clase de la fuente al <body> */}
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
