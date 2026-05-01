import Link from "next/link";
import { useState } from "react";

export default function PremiumPage({ searchParams }) {
  const params = searchParams;

  const [monthlyIncome, setMonthlyIncome] = useState(Number(params?.monthlyIncome) || 3000);
  const [chargeRate, setChargeRate] = useState(Number(params?.chargeRate) || 30);
  const [workingDays, setWorkingDays] = useState(Number(params?.workingDays) || 18);
  const [currentRate, setCurrentRate] = useState(Number(params?.currentRate) || 250);

  const charges = monthlyIncome * (chargeRate / 100);
  const total = monthlyIncome + charges;
  const tjm = total / workingDays;
  const gap = tjm - currentRate;
  const yearly = gap * workingDays * 12;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between">
          <h1 className="font-bold">Analyse détaillée</h1>
          <Link href="/">Retour</Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <h2 className="text-3xl font-bold">Affiner ton analyse</h2>

        {/* Editable inputs */}
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Revenu mensuel" value={monthlyIncome} setValue={setMonthlyIncome} />
          <Input label="Charges (%)" value={chargeRate} setValue={setChargeRate} />
          <Input label="Jours / mois" value={workingDays} setValue={setWorkingDays} />
          <Input label="Tarif actuel" value={currentRate} setValue={setCurrentRate} />
        </div>

        {/* Results */}
        <div className="grid gap-4 sm:grid-cols-3">
          <Card label="TJM recommandé" value={`${format(tjm)} / jour`} />
          <Card label="Écart" value={`${format(gap)} / jour`} />
          <Card label="Potentiel annuel" value={`${format(yearly)} / an`} />
        </div>

        <div className="bg-white p-6 rounded-xl border">
          <p className="font-semibold">Analyse</p>
          <p className="mt-2 text-sm">
            {gap > 0
              ? `Tu peux augmenter tes tarifs progressivement pour atteindre ton objectif.`
              : `Ton tarif actuel est cohérent avec ton objectif.`}
          </p>
        </div>
      </main>
    </div>
  );
}

function Input({ label, value, setValue }) {
  return (
    <div>
      <p className="text-sm">{label}</p>
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full p-2 border rounded"
      />
    </div>
  );
}

function Card({ label, value }) {
  return (
    <div className="bg-white border p-4 rounded">
      <p className="text-sm">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}

function format(val) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(val);
}
