"use client";

import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function PricingApp() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="font-bold text-lg">Combien facturer ?</h1>
          <a href="#calculateur" className="text-sm font-medium text-slate-600">Calculer mon tarif</a>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="max-w-5xl mx-auto px-6 py-12">
          <h2 className="text-4xl font-bold leading-tight">
            Calcule ton tarif freelance en quelques secondes
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl">
            Indique ton objectif de revenu et ton rythme de travail. L’outil te propose un tarif journalier cohérent pour atteindre tes objectifs.
          </p>
          <a href="#calculateur" className="inline-flex items-center gap-2 mt-6 bg-slate-900 text-white px-5 py-3 rounded-xl">
            Commencer le calcul <ArrowRight size={16} />
          </a>
        </section>

        {/* CALCULATEUR */}
        <section id="calculateur" className="max-w-2xl mx-auto px-6 pb-16">
          <Calculator />
        </section>

        {/* DISCLAIMER */}
        <section className="max-w-3xl mx-auto px-6 pb-16">
          <p className="text-sm text-slate-500 leading-6">
            ⚠️ Ce calculateur fournit une estimation basée sur les informations saisies. Il ne remplace pas une analyse de marché ou une stratégie de positionnement.
          </p>
        </section>
      </main>
    </div>
  );
}

function Calculator() {
  const [income, setIncome] = useState(3000);
  const [charges, setCharges] = useState(30);
  const [days, setDays] = useState(18);
  const [rate, setRate] = useState(250);
  const [premium, setPremium] = useState(false);

  const result = useMemo(() => {
    const total = income + income * (charges / 100);
    const tjm = total / days;
    const gap = tjm - rate;
    const yearly = gap * days * 12;

    return { tjm, gap, yearly };
  }, [income, charges, days, rate]);

  return (
    <div className="bg-slate-50 border rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-4">Calculateur</h3>

      <div className="space-y-3">
        <Input label="Revenu mensuel (€)" value={income} onChange={setIncome} />
        <Input label="Charges (%)" value={charges} onChange={setCharges} />
        <Input label="Jours travaillés / mois" value={days} onChange={setDays} />
        <Input label="Tarif actuel (€ / jour)" value={rate} onChange={setRate} />
      </div>

      <div className="mt-6 bg-white border rounded-xl p-4">
        <p className="text-sm text-slate-500">Tarif estimé</p>
        <p className="text-2xl font-bold">{format(result.tjm)} / jour</p>
      </div>

      <div className="mt-4 text-sm">
        {result.gap > 0
          ? `Tu pourrais augmenter ton tarif d’environ ${format(result.gap)} / jour.`
          : `Ton tarif actuel est cohérent avec ton objectif.`}
      </div>

      {!premium ? (
        <div className="mt-6 border rounded-xl p-4 bg-white">
          <p className="font-medium">Voir l’analyse complète</p>
          <p className="text-sm text-slate-600 mt-1">
            Découvre ton potentiel de revenus annuel et des conseils pour ajuster tes tarifs.
          </p>
          <button
            onClick={() => setPremium(true)}
            className="mt-3 bg-slate-900 text-white px-4 py-2 rounded-lg"
          >
            Accéder à l’analyse
          </button>
        </div>
      ) : (
        <div className="mt-6 bg-slate-900 text-white p-4 rounded-xl">
          <p className="font-semibold">Analyse</p>
          <p className="mt-2">Potentiel annuel : {format(result.yearly)}</p>
          <p className="text-sm mt-2">
            Ajuste progressivement tes tarifs et teste différents positionnements pour améliorer ta rentabilité.
          </p>
        </div>
      )}
    </div>
  );
}

function Input({ label, value, onChange }) {
  return (
    <input
      type="number"
      placeholder={label}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full p-3 border rounded-lg"
    />
  );
}

function format(val) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(val);
}
