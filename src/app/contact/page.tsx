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
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f6f7f3] px-4 py-8 text-[#17211c] sm:px-6">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(45,212,191,0.16),transparent_38%),linear-gradient(315deg,rgba(251,191,36,0.18),transparent_40%)]" />

      <Link
        href="/"
        className="relative z-10 mb-3 rounded-full border border-[#17211c]/10 bg-white/70 px-4 py-2 text-sm font-medium text-[#58685f] shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:text-[#17211c] hover:shadow-md"
      >
        ← Retour à l&apos;accueil
      </Link>

      <section className="relative z-10 w-full max-w-md rounded-2xl border border-white/70 bg-white/80 p-5 shadow-2xl shadow-emerald-950/10 backdrop-blur sm:p-7">
        <div className="mb-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Contact
          </p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">
            Une demande ?
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <input
              name="name"
              type="text"
              placeholder="Nom"
              className="rounded-xl border border-[#dfe6dd] bg-white px-4 py-3 text-base shadow-sm outline-none transition placeholder:text-[#8a988f] focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            />
            {errors.name && (
              <p className="text-sm font-medium text-rose-600">
                {errors.name[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="rounded-xl border border-[#dfe6dd] bg-white px-4 py-3 text-base shadow-sm outline-none transition placeholder:text-[#8a988f] focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            />
            {errors.email && (
              <p className="text-sm font-medium text-rose-600">
                {errors.email[0]}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <textarea
              name="message"
              placeholder="Message"
              className="min-h-36 rounded-xl border border-[#dfe6dd] bg-white px-4 py-3 text-base shadow-sm outline-none transition placeholder:text-[#8a988f] focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
            />
            {errors.message && (
              <p className="text-sm font-medium text-rose-600">
                {errors.message[0]}
              </p>
            )}
          </div>

          <button
            disabled={loading}
            className="rounded-xl bg-[#17211c] px-4 py-3 font-semibold text-white shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-xl hover:shadow-emerald-900/20 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:translate-y-0 disabled:opacity-50"
          >
            {loading ? "Envoi..." : "Envoyer"}
          </button>
        </form>

        {success && (
          <p className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
            Message envoyé avec succès !
          </p>
        )}
      </section>
    </main>
  );
}
