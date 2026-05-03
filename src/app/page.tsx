import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex justify-end">
        <Link
          href="/admin"
          className="text-sm text-gray-500 hover:text-gray-900"
        >
          Espace admin
        </Link>
      </div>

      <section className="flex flex-1 flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">DumbApp</h1>

        <p className="max-w-sm text-base text-gray-600 sm:max-w-none sm:text-lg">
          Mini CRM simple pour gérer tes demandes clients
        </p>

        <Link
          href="/contact"
          className="rounded-lg bg-black px-6 py-3 text-white"
        >
          Accéder au formulaire
        </Link>
      </section>
    </main>
  );
}
