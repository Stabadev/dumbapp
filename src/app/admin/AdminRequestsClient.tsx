"use client";

import { useCallback, useState } from "react";

export type ContactRequestItem = {
  id: number;
  name: string;
  email: string;
  message: string;
  status: string;
  createdAt: string;
};

type AdminRequestsClientProps = {
  initialRequests: ContactRequestItem[];
};

const statuses = [
  { value: "NOUVEAU", label: "Nouveau", className: "bg-gray-200" },
  { value: "EN_COURS", label: "En cours", className: "bg-yellow-200" },
  { value: "TERMINE", label: "Terminé", className: "bg-green-200" },
] as const;

function formatDate(date: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Europe/Paris",
  }).format(new Date(date));
}

export default function AdminRequestsClient({
  initialRequests,
}: AdminRequestsClientProps) {
  const [requests, setRequests] = useState<ContactRequestItem[]>(initialRequests);

  const load = useCallback(async () => {
    const res = await fetch("/api/contact");
    const data = await res.json();
    setRequests(data);
  }, []);

  async function updateStatus(id: number, status: string) {
    await fetch(`/api/contact/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // load est mémorisée avec useCallback : si on la réutilise plus tard dans
    // un hook, elle pourra être déclarée en dépendance sans boucle de rendu.
    await load();
  }

  const renderStatusButtons = (requestId: number) => (
    <div className="flex flex-wrap gap-2 md:flex-nowrap">
      {statuses.map((status) => (
        <button
          type="button"
          key={status.value}
          onClick={() => updateStatus(requestId, status.value)}
          className={`rounded px-3 py-2 text-sm leading-none md:px-2 md:py-1 ${status.className}`}
        >
          {status.label}
        </button>
      ))}
    </div>
  );

  if (requests.length === 0) {
    return (
      <p className="rounded border border-dashed p-4 text-sm text-gray-600">
        Aucune demande pour le moment.
      </p>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4 md:hidden">
        {requests.map((request) => (
          <article key={request.id} className="rounded-lg border p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="truncate font-bold">{request.name}</h2>
                <p className="break-words text-sm text-gray-600">
                  {request.email}
                </p>
              </div>
              <span className="shrink-0 rounded bg-gray-100 px-2 py-1 text-xs font-medium">
                {request.status}
              </span>
            </div>

            <p className="mt-3 text-xs text-gray-500">
              {formatDate(request.createdAt)}
            </p>
            <p className="mt-2 break-words text-sm leading-6">
              {request.message}
            </p>

            <div className="mt-4">{renderStatusButtons(request.id)}</div>
          </article>
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-lg border md:block">
        <table className="w-full table-fixed text-left text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="w-1/6 px-4 py-3 font-medium">Nom</th>
              <th className="w-1/5 px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Message</th>
              <th className="w-28 px-4 py-3 font-medium">Statut</th>
              <th className="w-32 px-4 py-3 font-medium">Date</th>
              <th className="w-64 px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {requests.map((request) => (
              <tr key={request.id}>
                <td className="px-4 py-4 font-medium align-top">
                  <span className="block truncate">{request.name}</span>
                </td>
                <td className="px-4 py-4 align-top text-gray-600">
                  <span className="block break-words">{request.email}</span>
                </td>
                <td className="px-4 py-4 align-top">
                  <p className="line-clamp-3 break-words">{request.message}</p>
                </td>
                <td className="px-4 py-4 align-top">
                  <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium">
                    {request.status}
                  </span>
                </td>
                <td className="px-4 py-4 align-top text-gray-600">
                  {formatDate(request.createdAt)}
                </td>
                <td className="px-4 py-4 align-top">
                  {renderStatusButtons(request.id)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
