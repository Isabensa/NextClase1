
import Image from 'next/image';


export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
     <Image
        src="/logo.png"   // 👈 la ruta corresponde al archivo dentro de public/
        alt="Mi Logo"
        width={200}
        height={200}
        priority
      />
      <h1 className="text-4xl font-bold text-blue-600">¡Hola Isa!</h1>

      {/* Triángulo negro usando Tailwind */}
      <div
        className="relative w-0 h-0 border-l-[15px] border-r-[15px] border-b-[26px]
                   border-l-transparent border-r-transparent border-b-black"
      />

      <p className="mt-4 text-gray-600">Tailwind ya está funcionando 🚀</p>
    </main>
  );
}
