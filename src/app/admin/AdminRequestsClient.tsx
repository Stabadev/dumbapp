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
  {
    value: "NOUVEAU",
    label: "Nouveau",
    className:
      "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200",
  },
  {
    value: "EN_COURS",
    label: "En cours",
    className:
      "border-amber-200 bg-amber-100 text-amber-800 hover:bg-amber-200",
  },
  {
    value: "TERMINE",
    label: "Terminé",
    className:
      "border-emerald-200 bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
  },
] as const;

const statusStyles: Record<string, string> = {
  NOUVEAU: "border-slate-200 bg-slate-100 text-slate-700",
  EN_COURS: "border-amber-200 bg-amber-100 text-amber-800",
  TERMINE: "border-emerald-200 bg-emerald-100 text-emerald-800",
};

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
          className={`rounded-full border px-3 py-2 text-sm font-semibold leading-none transition hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-emerald-100 md:px-2.5 md:py-1.5 ${status.className}`}
        >
          {status.label}
        </button>
      ))}
    </div>
  );

  if (requests.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-emerald-300 bg-white/70 p-5 text-sm font-medium text-[#58685f] shadow-sm backdrop-blur">
        Aucune demande pour le moment.
      </p>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-4 md:hidden">
        {requests.map((request) => (
          <article
            key={request.id}
            className="rounded-2xl border border-white/70 bg-white/80 p-4 shadow-lg shadow-emerald-950/5 backdrop-blur"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h2 className="truncate font-bold text-[#17211c]">
                  {request.name}
                </h2>
                <p className="break-words text-sm text-[#58685f]">
                  {request.email}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-bold ${
                  statusStyles[request.status] ??
                  "border-slate-200 bg-slate-100 text-slate-700"
                }`}
              >
                {request.status}
              </span>
            </div>

            <p className="mt-3 text-xs font-medium text-[#7a887f]">
              {formatDate(request.createdAt)}
            </p>
            <p className="mt-2 break-words text-sm leading-6 text-[#29372f]">
              {request.message}
            </p>

            <div className="mt-4">{renderStatusButtons(request.id)}</div>
          </article>
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-2xl border border-white/70 bg-white/80 shadow-xl shadow-emerald-950/5 backdrop-blur md:block">
        <table className="w-full table-fixed text-left text-sm">
          <thead className="bg-[#edf5ef] text-xs uppercase tracking-[0.08em] text-[#58685f]">
            <tr>
              <th className="w-1/6 px-4 py-3 font-medium">Nom</th>
              <th className="w-1/5 px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Message</th>
              <th className="w-28 px-4 py-3 font-medium">Statut</th>
              <th className="w-32 px-4 py-3 font-medium">Date</th>
              <th className="w-64 px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e4ebe3]">
            {requests.map((request) => (
              <tr key={request.id} className="transition hover:bg-emerald-50/60">
                <td className="px-4 py-4 font-medium align-top">
                  <span className="block truncate">{request.name}</span>
                </td>
                <td className="px-4 py-4 align-top text-[#58685f]">
                  <span className="block break-words">{request.email}</span>
                </td>
                <td className="px-4 py-4 align-top text-[#29372f]">
                  <p className="line-clamp-3 break-words">{request.message}</p>
                </td>
                <td className="px-4 py-4 align-top">
                  <span
                    className={`rounded-full border px-2.5 py-1 text-xs font-bold ${
                      statusStyles[request.status] ??
                      "border-slate-200 bg-slate-100 text-slate-700"
                    }`}
                  >
                    {request.status}
                  </span>
                </td>
                <td className="px-4 py-4 align-top text-[#58685f]">
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
