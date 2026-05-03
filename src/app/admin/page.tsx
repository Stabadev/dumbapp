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
    <main className="min-h-screen p-8">
      <Link href="/" className="mb-4 inline-block text-sm text-gray-500 hover:text-gray-900">
        ← Retour à l&apos;accueil
      </Link>

      <h1 className="mb-6 text-3xl font-bold">Admin — demandes</h1>
      <AdminRequestsClient initialRequests={initialRequests} />
    </main>
  );
}
