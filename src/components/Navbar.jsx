import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold">Inmobiliaria</Link>
      <div className="space-x-4">
        <Link href="/propiedades" className="text-gray-600 hover:text-indigo-600">Propiedades</Link>
        <Link href="/admin" className="text-gray-600 hover:text-indigo-600">Admin</Link>
      </div>
    </nav>
  );
}
