"use client";

import { useMemo, useState } from "react";
import { BadgeEuro, BarChart3, ShieldCheck, Info, Sparkles } from "lucide-react";

export default function PricingApp() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Outil pour freelances</p>
            <h1 className="text-xl font-bold">Combien facturer ?</h1>
          </div>
        </div>
      </header>

      {/* PUB TOP */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="bg-slate-200 text-center py-6 rounded-xl text-slate-500">
          Espace publicitaire
        </div>
      </div>

      <main>
        <section className="max-w-6xl mx-auto px-6 pt-6 pb-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-start">
          {/* LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1 text-sm text-slate-600 mb-5">
              <Sparkles size={14} /> Calcule ton tarif idéal
            </div>

            <h2 className="text-4xl font-bold leading-tight">
              Tu ne sais pas combien facturer ?
            </h2>

            <p className="mt-5 text-lg text-slate-600 leading-8">
              Entre tes objectifs, tes charges et ton marché. Obtiens une estimation complète et réaliste.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <FeatureMini icon={<BadgeEuro size={18} />} title="Tarif" text="Un repère clair." />
              <FeatureMini icon={<BarChart3 size={18} />} title="Marché" text="Comparaison intégrée." />
              <FeatureMini icon={<ShieldCheck size={18} />} title="Simple" text="Facile à utiliser." />
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-white rounded-[28px] shadow-sm border p-6">
            <Calculator />
          </div>
        </section>
      </main>
    </div>
  );
}

function Calculator() {
  const [service, setService] = useState("design");
  const [experience, setExperience] = useState("intermediate");
  const [client, setClient] = useState("small");
  const [income, setIncome] = useState(3000);
  const [charges, setCharges] = useState(30);
  const [days, setDays] = useState(18);
  const [hours, setHours] = useState(7);
  const [rate, setRate] = useState(250);

  const market = {
    design: { beginner: 220, intermediate: 350, expert: 550 },
    dev: { beginner: 300, intermediate: 500, expert: 800 },
    marketing: { beginner: 220, intermediate: 380, expert: 620 },
  };

  const results = useMemo(() => {
    const total = income + income * (charges / 100);
    const tjm = total / days;
    const marketRate = market[service][experience];
    const recommended = Math.max(tjm, marketRate);
    const yearly = (recommended - rate) * days * 12;

    return { tjm, marketRate, recommended, yearly };
  }, [service, experience, income, charges, days, hours, rate]);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Simulateur complet</h3>

      <div className="grid gap-3 sm:grid-cols-2">
        <Select value={service} set={setService} label="Service" options={{ design: "Design", dev: "Dev", marketing: "Marketing" }} />
        <Select value={experience} set={setExperience} label="Expérience" options={{ beginner: "Débutant", intermediate: "Confirmé", expert: "Expert" }} />
        <Input label="Revenu (€)" value={income} set={setIncome} />
        <Input label="Charges (%)" value={charges} set={setCharges} />
        <Input label="Jours / mois" value={days} set={setDays} />
        <Input label="Heures / jour" value={hours} set={setHours} />
        <Input label="Tarif actuel" value={rate} set={setRate} />
      </div>

      {/* PUB MID */}
      <div className="bg-slate-200 text-center py-4 rounded-xl text-slate-500">
        Espace publicitaire
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card label="Minimum" value={`${format(results.tjm)} / jour`} />
        <Card label="Marché" value={`${format(results.marketRate)} / jour`} />
        <Card label="Recommandé" value={`${format(results.recommended)} / jour`} highlight />
      </div>

      <div className="bg-amber-50 p-4 rounded-xl border">
        <p className="font-medium">Potentiel annuel</p>
        <p className="text-xl font-bold mt-1">{format(results.yearly)} / an</p>
      </div>
    </div>
  );
}

function Input({ label, value, set }) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => set(Number(e.target.value))}
      placeholder={label}
      className="p-3 border rounded-lg"
    />
  );
}

function Select({ label, value, set, options }) {
  return (
    <select value={value} onChange={(e) => set(e.target.value)} className="p-3 border rounded-lg">
      {Object.entries(options).map(([k, v]) => (
        <option key={k} value={k}>{v}</option>
      ))}
    </select>
  );
}

function Card({ label, value, highlight }) {
  return (
    <div className={`p-4 border rounded-xl ${highlight ? "bg-emerald-50" : "bg-white"}`}>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

function FeatureMini({ icon, title, text }) {
  return (
    <div className="p-4 border rounded-xl bg-white">
      <div className="mb-2">{icon}</div>
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-slate-600">{text}</p>
    </div>
  );
}

function format(val) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(val);
}
