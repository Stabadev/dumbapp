import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-6">
      <Link
        href="/admin"
        className="absolute right-6 top-6 text-sm text-gray-500 hover:text-gray-900"
      >
        Espace admin
      </Link>

      <h1 className="text-4xl font-bold">DumbApp</h1>

      <p className="text-lg text-gray-600">
        Mini CRM simple pour gérer tes demandes clients
      </p>

      <Link
        href="/contact"
        className="rounded-lg bg-black px-6 py-3 text-white"
      >
        Accéder au formulaire
      </Link>
    </main>
  );
}
