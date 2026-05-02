export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">DumbApp</h1>

      <p className="text-lg text-gray-600">
        Mini CRM simple pour gérer tes demandes clients
      </p>

      <a
        href="/contact"
        className="rounded-lg bg-black px-6 py-3 text-white"
      >
        Accéder au formulaire
      </a>
    </main>
  );
}
