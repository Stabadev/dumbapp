import { prisma } from "@/lib/prisma";
import AdminRequestsClient, {
  type ContactRequestItem,
} from "./AdminRequestsClient";

export default async function AdminPage() {
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
      <h1 className="mb-6 text-3xl font-bold">Admin — demandes</h1>
      <AdminRequestsClient initialRequests={initialRequests} />
    </main>
  );
}
