import Link from "next/link";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";
import AdminRequestsClient, {
  type ContactRequestItem,
} from "./AdminRequestsClient";

export default async function AdminPage() {
  await connection();

  const requests = await prisma.contactRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  // La page est maintenant un Server Component : le premier chargement vient
  // directement de Prisma, ce qui évite un useEffect client dédié au fetch initial.
  const initialRequests: ContactRequestItem[] = requests.map((request) => ({
    ...request,
    createdAt: request.createdAt.toISOString(),
  }));

  return (
    <main className="min-h-screen bg-[#f6f7f3] px-4 py-6 text-[#17211c] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="mb-5 inline-flex rounded-full border border-[#17211c]/10 bg-white/70 px-4 py-2 text-sm font-medium text-[#58685f] shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:text-[#17211c] hover:shadow-md"
        >
          ← Retour à l&apos;accueil
        </Link>

        <header className="mb-6 rounded-2xl border border-white/70 bg-white/75 p-5 shadow-xl shadow-emerald-950/5 backdrop-blur sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Espace admin
          </p>
          <h1 className="mt-2 text-2xl font-black sm:text-3xl">
            Demandes clients
          </h1>
        </header>

        <AdminRequestsClient initialRequests={initialRequests} />
      </div>
    </main>
  );
}
