"use client";

import { useState } from "react";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setSuccess(false);

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      setSuccess(true);
      form.reset(); // 🔥 vide le formulaire
    }

    setLoading(false);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Contact</h1>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-4"
      >
        <input name="name" type="text" placeholder="Nom" className="border p-2 rounded" />
        <input name="email" type="email" placeholder="Email" className="border p-2 rounded" />
        <textarea name="message" placeholder="Message" className="border p-2 rounded" />

        <button
          disabled={loading}
          className="bg-black text-white p-2 rounded disabled:opacity-50"
        >
          {loading ? "Envoi..." : "Envoyer"}
        </button>
      </form>

      {success && (
        <p className="text-green-600">Message envoyé avec succès !</p>
      )}
    </main>
  );
}
