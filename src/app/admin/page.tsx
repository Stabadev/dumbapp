"use client";

import { useEffect, useState } from "react";

type Request = {
  id: number;
  name: string;
  email: string;
  message: string;
  status: string;
  createdAt: string;
};

export default function AdminPage() {
  const [requests, setRequests] = useState<Request[]>([]);

  async function load() {
    const res = await fetch("/api/contact");
    const data = await res.json();
    setRequests(data);
  }

  async function updateStatus(id: number, status: string) {
    await fetch(`/api/contact/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    load(); // reload après update
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <main className="min-h-screen p-8">
      <h1 className="mb-6 text-3xl font-bold">Admin — demandes</h1>

      <div className="flex flex-col gap-4">
        {requests.map((r) => (
          <div key={r.id} className="rounded-lg border p-4">
            <div className="flex justify-between">
              <h2 className="font-bold">{r.name}</h2>
              <span>{r.status}</span>
            </div>

            <p className="text-sm text-gray-600">{r.email}</p>
            <p className="mt-2">{r.message}</p>

            <div className="mt-3 flex gap-2">
              <button
                onClick={() => updateStatus(r.id, "NOUVEAU")}
                className="bg-gray-200 px-2 py-1 rounded"
              >
                Nouveau
              </button>
              <button
                onClick={() => updateStatus(r.id, "EN_COURS")}
                className="bg-yellow-200 px-2 py-1 rounded"
              >
                En cours
              </button>
              <button
                onClick={() => updateStatus(r.id, "TERMINE")}
                className="bg-green-200 px-2 py-1 rounded"
              >
                Terminé
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
