"use client";

import Link from "next/link";
import { useState } from "react";
import {
  contactRequestSchema,
  type ContactRequestInput,
} from "@/lib/validations/contact";

type ContactValidationErrors = Partial<
  Record<keyof ContactRequestInput, string[]>
>;

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<ContactValidationErrors>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSuccess(false);
    setErrors({});

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    const result = contactRequestSchema.safeParse(data);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setLoading(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(result.data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      setSuccess(true);
      form.reset();
    } else if (res.status === 400) {
      const body = (await res.json()) as { errors?: ContactValidationErrors };
      setErrors(body.errors ?? {});
    }

    setLoading(false);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
        ← Retour à l&apos;accueil
      </Link>

      <h1 className="text-3xl font-bold">Contact</h1>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-md flex-col gap-4"
      >
        <div className="flex flex-col gap-1">
          <input
            name="name"
            type="text"
            placeholder="Nom"
            className="border p-2 rounded"
          />
          {errors.name && <p className="text-sm text-red-600">{errors.name[0]}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email[0]}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <textarea
            name="message"
            placeholder="Message"
            className="border p-2 rounded"
          />
          {errors.message && (
            <p className="text-sm text-red-600">{errors.message[0]}</p>
          )}
        </div>

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
