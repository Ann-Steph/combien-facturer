"use client";

import { useMemo, useState } from "react";
import { Check, Lock, Sparkles, ArrowRight, BadgeEuro, BarChart3, ShieldCheck, Info } from "lucide-react";

export default function PricingApp() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Outil pour freelances</p>
            <h1 className="text-xl font-bold">Combien facturer ?</h1>
          </div>
          <a href="#calculateur" className="rounded-2xl bg-slate-900 text-white px-4 py-2 font-medium hover:opacity-90">
            Calculer mon tarif
          </a>
        </div>
      </header>

      <main>
        <section className="max-w-6xl mx-auto px-6 pt-12 pb-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-start">
          {/* LEFT: TEXTE */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600 mb-5">
              <Sparkles size={14} /> Trouve ton tarif idéal en 30 secondes
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              Tu ne sais pas <span className="text-slate-500">combien facturer</span> ?
            </h2>
            <p className="mt-5 text-lg text-slate-600 leading-8">
              Entre tes objectifs de revenu, tes charges et ton rythme de travail. L’outil estime un tarif journalier cohérent pour ton activité freelance.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <FeatureMini icon={<BadgeEuro size={18} />} title="Tarif estimé" text="Un repère concret pour fixer tes prix." />
              <FeatureMini icon={<BarChart3 size={18} />} title="Écart identifié" text="Découvre si tu es sous-payé(e)." />
              <FeatureMini icon={<ShieldCheck size={18} />} title="Simple" text="Aucune connaissance technique." />
            </div>
          </div>

          {/* RIGHT: CALCULATEUR (PLUS LARGE) */}
          <div id="calculateur" className="bg-white rounded-[28px] shadow-sm border border-slate-200 p-6">
            <PricingCalculator />
          </div>
        </section>

        {/* DISCLAIMER */}
        <section className="max-w-5xl mx-auto px-6 pb-16">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600 leading-7 flex gap-3">
            <Info size={18} className="mt-1 shrink-0 text-slate-400" />
            <p>
              Cette estimation est calculée à partir des informations que tu saisis. Elle donne un point de départ utile, mais ne remplace pas une analyse complète du marché, de ton expérience ou de ton positionnement.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

function PricingCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(3000);
  const [chargeRate, setChargeRate] = useState(30);
  const [workingDays, setWorkingDays] = useState(18);
  const [hoursPerDay, setHoursPerDay] = useState(7);
  const [currentRate, setCurrentRate] = useState(250);
  const [premiumUnlocked, setPremiumUnlocked] = useState(true);

  const results = useMemo(() => {
    const chargesAmount = monthlyIncome * (chargeRate / 100);
    const totalToGenerate = monthlyIncome + chargesAmount;
    const tjm = workingDays > 0 ? totalToGenerate / workingDays : 0;
    const hourlyRate = hoursPerDay > 0 ? tjm / hoursPerDay : 0;
    const gap = tjm - currentRate;
    const annualGap = gap * workingDays * 12;
    const prudentRate = tjm * 0.9;
    const premiumRate = tjm * 1.2;

    let positioning = "Ton tarif actuel semble cohérent avec ton objectif.";
    if (currentRate < tjm * 0.9) positioning = "Tu es probablement sous-payé(e) par rapport à ton objectif.";
    if (currentRate > tjm * 1.15) positioning = "Tu es déjà positionné(e) au-dessus de ton minimum cible.";

    return {
      chargesAmount,
      totalToGenerate,
      tjm,
      hourlyRate,
      gap,
      annualGap,
      prudentRate,
      premiumRate,
      positioning,
    };
  }, [monthlyIncome, chargeRate, workingDays, hoursPerDay, currentRate]);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-slate-500">Calculateur gratuit</p>
        <h3 className="text-2xl font-bold mt-1">Estime ton tarif freelance</h3>
        <p className="text-sm text-slate-600 mt-2 leading-6">
          Remplis les champs ci-dessous. Chaque donnée sert à calculer le tarif journalier dont tu as besoin pour atteindre ton revenu mensuel.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Revenu mensuel souhaité"
          helper="Revenu net que tu veux atteindre chaque mois grâce à ton activité."
          suffix="€ / mois"
          value={monthlyIncome}
          onChange={setMonthlyIncome}
          step="100"
        />
        <Field
          label="Charges estimées"
          helper="Pourcentage de charges à prévoir : cotisations, outils, impôts, frais divers."
          suffix="%"
          value={chargeRate}
          onChange={setChargeRate}
          step="1"
        />
        <Field
          label="Jours facturables par mois"
          helper="Nombre de jours où tu peux réellement facturer des clients."
          suffix="jours"
          value={workingDays}
          onChange={setWorkingDays}
          step="1"
        />
        <Field
          label="Heures facturables par jour"
          helper="Nombre d’heures que tu peux vendre chaque jour quand tu travailles pour un client."
          suffix="h / jour"
          value={hoursPerDay}
          onChange={setHoursPerDay}
          step="0.5"
        />
        <Field
          label="Tarif actuel"
          helper="Tarif journalier moyen actuel, si tu en as déjà un."
          suffix="€ / jour"
          value={currentRate}
          onChange={setCurrentRate}
          step="10"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <ResultCard
          label="Tarif journalier estimé"
          helper="Tarif minimum journalier à viser pour atteindre ton objectif de revenu."
          value={`${formatEuro(results.tjm)} / jour`}
        />
        <ResultCard
          label="Tarif horaire estimé"
          helper="Conversion pratique de ton tarif journalier en tarif par heure."
          value={`${formatEuro(results.hourlyRate)} / h`}
        />
        <ResultCard
          label="Montant total à générer"
          helper="Total mensuel à facturer pour couvrir ton revenu souhaité et tes charges."
          value={`${formatEuro(results.totalToGenerate)} / mois`}
        />
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-medium text-amber-900">Diagnostic rapide</p>
        <p className="mt-1 text-lg font-semibold text-amber-950">{results.positioning}</p>
        <p className="mt-2 text-sm text-amber-800 leading-6">
          {results.gap > 0
            ? `Pour atteindre ton objectif, tu pourrais viser environ ${formatEuro(results.gap)} de plus par jour que ton tarif actuel.`
            : `Ton tarif actuel couvre déjà ton objectif minimal estimé.`}
        </p>
      </div>

      {!premiumUnlocked ? (
        <div className="rounded-3xl border border-slate-200 p-5 bg-slate-100">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 border border-slate-200">
            <Lock size={14} /> Analyse complète
          </div>
          <h4 className="text-xl font-semibold mt-3">Va plus loin avec une analyse détaillée</h4>
          <p className="text-slate-600 mt-2 leading-7">
            Découvre une fourchette de prix, ton potentiel annuel d’augmentation et quelques conseils simples pour ajuster ton positionnement.
          </p>
          <button
            onClick={() => setPremiumUnlocked(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-white font-medium hover:opacity-90"
          >
            <Sparkles size={16} /> Voir l’analyse complète
          </button>
        </div>
      ) : (
        <PremiumPanel results={results} currentRate={currentRate} />
      )}
    </div>
  );
}

function PremiumPanel({ results, currentRate }) {
  const advice = [
    "Présente ton tarif avec la valeur livrée, pas uniquement avec le temps passé.",
    "Teste une légère hausse sur tes prochaines propositions commerciales.",
    "Crée une offre plus premium si tes clientes recherchent plus d’accompagnement.",
  ];

  return (
    <div className="rounded-3xl bg-slate-900 text-white p-6 space-y-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-300">Analyse détaillée</p>
          <h3 className="text-2xl font-semibold mt-1">Ton potentiel de revenus</h3>
        </div>
        <span className="rounded-full bg-emerald-400 px-3 py-1 text-sm font-medium text-slate-950">Débloqué</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <DarkCard label="Position prudente" value={`${formatEuro(results.prudentRate)} / jour`} />
        <DarkCard label="Objectif central" value={`${formatEuro(results.tjm)} / jour`} />
        <DarkCard label="Position premium" value={`${formatEuro(results.premiumRate)} / jour`} />
      </div>

      <div className="rounded-2xl bg-white/5 p-4">
        <p className="text-sm text-slate-300">Potentiel annuel estimé</p>
        <p className="text-3xl font-bold mt-1">
          {results.annualGap > 0 ? formatEuro(results.annualGap) : formatEuro(0)} / an
        </p>
        <p className="text-sm text-slate-300 mt-2 leading-7">
          {results.annualGap > 0
            ? `Si tu passes progressivement de ${formatEuro(currentRate)} à ${formatEuro(results.tjm)} par jour, cet écart peut représenter ce montant sur une année.`
            : `Ton tarif actuel est déjà au niveau ou au-dessus de l’objectif calculé.`}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="font-semibold mb-3">Pistes d’amélioration</p>
          <ul className="space-y-2 text-sm text-slate-300 list-disc pl-5">
            {advice.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-emerald-400 text-slate-950 p-4">
          <p className="font-semibold mb-2">Exemple de formulation</p>
          <p className="text-sm leading-6">
            Pour mieux refléter la valeur de mon accompagnement et le niveau de résultat attendu, mon tarif évolue à <strong>{formatEuro(results.tjm)}</strong> par jour.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, helper, suffix, value, onChange, step = "1" }) {
  return (
    <label className="block rounded-2xl border border-slate-200 bg-white p-4">
      <span className="block text-sm font-semibold text-slate-800">{label}</span>
      <span className="block text-xs text-slate-500 mt-1 leading-5">{helper}</span>
      <div className="mt-3 flex items-center gap-3">
        <input
          type="number"
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-slate-300"
        />
        <span className="shrink-0 text-sm text-slate-500">{suffix}</span>
      </div>
    </label>
  );
}

function ResultCard({ label, helper, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-sm font-medium text-slate-700">{label}</p>
      <p className="text-xs text-slate-500 mt-1 leading-5">{helper}</p>
      <p className="text-2xl font-bold mt-3">{value}</p>
    </div>
  );
}

function DarkCard({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/5 p-4">
      <p className="text-sm text-slate-300">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}

function FeatureMini({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center mb-3">{icon}</div>
      <p className="font-semibold">{title}</p>
      <p className="text-sm text-slate-600 mt-1">{text}</p>
    </div>
  );
}

function Badge({ text }) {
  return <span className="rounded-full bg-white border border-slate-200 px-3 py-2 text-sm text-slate-700">{text}</span>;
}

function formatEuro(value) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}
