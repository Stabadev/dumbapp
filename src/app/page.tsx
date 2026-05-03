import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#f6f7f3] px-4 py-6 text-[#17211c] sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(45,212,191,0.18),transparent_34%),linear-gradient(315deg,rgba(251,191,36,0.18),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.9),rgba(255,255,255,0))]" />

      <div className="relative z-10 flex justify-end">
        <Link
          href="/admin"
          className="rounded-full border border-[#17211c]/10 bg-white/70 px-4 py-2 text-sm font-medium text-[#4b5d52] shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:border-[#17211c]/20 hover:text-[#17211c] hover:shadow-md"
        >
          Espace admin
        </Link>
      </div>

      <section className="relative z-10 flex flex-1 flex-col items-center justify-center gap-7 text-center">
        <div className="rounded-full border border-emerald-900/10 bg-emerald-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
          Mini CRM
        </div>

        <h1 className="max-w-2xl text-5xl font-black leading-none text-[#17211c] sm:text-6xl lg:text-7xl">
          DumbApp
        </h1>

        <p className="max-w-sm text-base leading-7 text-[#58685f] sm:max-w-lg sm:text-lg">
          Mini CRM simple pour gérer tes demandes clients
        </p>

        <Link
          href="/contact"
          className="rounded-full bg-[#17211c] px-7 py-3 font-semibold text-white shadow-lg shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:bg-emerald-800 hover:shadow-xl hover:shadow-emerald-900/20 focus:outline-none focus:ring-4 focus:ring-emerald-200"
        >
          Accéder au formulaire
        </Link>
      </section>
    </main>
  );
}
