"use client";

import { useMemo, useState } from "react";
import { Check, Lock, Sparkles, ArrowRight, BadgeEuro, BarChart3, ShieldCheck, Info } from "lucide-react";
import Link from "next/link";

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
              <FeatureMini icon={<BarChart3 size={18} />} title="Écart identifié" text="Sais si tu es sous-payée." />
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
  const [serviceType, setServiceType] = useState("design");
  const [experienceLevel, setExperienceLevel] = useState("intermediate");
  const [clientType, setClientType] = useState("small-business");
  const [monthlyIncome, setMonthlyIncome] = useState(3000);
  const [chargeRate, setChargeRate] = useState(30);
  const [workingDays, setWorkingDays] = useState(18);
  const [hoursPerDay, setHoursPerDay] = useState(7);
  const [currentRate, setCurrentRate] = useState(250);

  const marketBaseRates = {
    design: { beginner: 220, intermediate: 350, expert: 550 },
    copywriting: { beginner: 180, intermediate: 320, expert: 500 },
    coaching: { beginner: 200, intermediate: 400, expert: 700 },
    dev: { beginner: 300, intermediate: 500, expert: 800 },
    marketing: { beginner: 220, intermediate: 380, expert: 620 },
    admin: { beginner: 140, intermediate: 220, expert: 320 },
  };

  const clientMultipliers = {
    "small-business": 1,
    startup: 1.1,
    premium: 1.25,
  };

  const results = useMemo(() => {
    const chargesAmount = monthlyIncome * (chargeRate / 100);
    const totalToGenerate = monthlyIncome + chargesAmount;
    const targetTjm = workingDays > 0 ? totalToGenerate / workingDays : 0;
    const hourlyRate = hoursPerDay > 0 ? targetTjm / hoursPerDay : 0;

    const marketMedian = marketBaseRates[serviceType][experienceLevel] * clientMultipliers[clientType];
    const recommendedLow = Math.round(marketMedian * 0.9);
    const recommendedMid = Math.round(Math.max(targetTjm, marketMedian));
    const recommendedHigh = Math.round(recommendedMid * 1.2);

    const gap = recommendedMid - currentRate;
    const annualGap = gap * workingDays * 12;

    let positioning = "Ton tarif actuel semble cohérent avec ton objectif.";
    if (currentRate < recommendedLow) positioning = "Tu es probablement sous-payée au regard de ton objectif et du marché visé.";
    if (currentRate > recommendedHigh) positioning = "Tu es déjà positionnée au-dessus de la fourchette recommandée.";

    return {
      chargesAmount,
      totalToGenerate,
      targetTjm,
      hourlyRate,
      marketMedian,
      recommendedLow,
      recommendedMid,
      recommendedHigh,
      gap,
      annualGap,
      positioning,
      serviceType,
      experienceLevel,
      clientType,
    };
  }, [monthlyIncome, chargeRate, workingDays, hoursPerDay, currentRate, serviceType, experienceLevel, clientType]);

  const premiumUrl = `/premium?serviceType=${serviceType}&experienceLevel=${experienceLevel}&clientType=${clientType}&monthlyIncome=${monthlyIncome}&chargeRate=${chargeRate}&workingDays=${workingDays}&hoursPerDay=${hoursPerDay}&currentRate=${currentRate}`;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-slate-500">Calculateur gratuit</p>
        <h3 className="text-2xl font-bold mt-1">Estime ton tarif freelance</h3>
        <p className="text-sm text-slate-600 mt-2 leading-6">
          Remplis les champs ci-dessous. Chaque donnée sert à calculer un tarif cohérent avec ton objectif et ton positionnement.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField
          label="Type de service"
          helper="Le métier ou service principal que tu vends."
          value={serviceType}
          onChange={setServiceType}
          options={[
            ["design", "Design / graphisme"],
            ["copywriting", "Rédaction / copywriting"],
            ["coaching", "Coaching / conseil"],
            ["dev", "Développement"],
            ["marketing", "Marketing / social media"],
            ["admin", "Support administratif"],
          ]}
        />
        <SelectField
          label="Niveau d'expérience"
          helper="Ton niveau actuel sur ce type de service."
          value={experienceLevel}
          onChange={setExperienceLevel}
          options={[
            ["beginner", "Débutante"],
            ["intermediate", "Confirmée"],
            ["expert", "Experte"],
          ]}
        />
        <SelectField
          label="Type de clientèle"
          helper="Le type de clientes que tu vises le plus souvent."
          value={clientType}
          onChange={setClientType}
          options={[
            ["small-business", "Indépendants / petites entreprises"],
            ["startup", "Startups / entreprises en croissance"],
            ["premium", "Marques premium / grands comptes"],
          ]}
        />
        <Field
          label="Revenu mensuel souhaité"
          helper="Le revenu net ou cible que tu veux atteindre chaque mois grâce à ton activité."
          suffix="€ / mois"
          value={monthlyIncome}
          onChange={setMonthlyIncome}
          step="100"
        />
        <Field
          label="Charges estimées"
          helper="Le pourcentage de charges à prévoir : cotisations, outils, impôts, frais divers."
          suffix="%"
          value={chargeRate}
          onChange={setChargeRate}
          step="1"
        />
        <Field
          label="Jours facturables par mois"
          helper="Le nombre de jours où tu peux réellement facturer des clientes, pas seulement travailler."
          suffix="jours"
          value={workingDays}
          onChange={setWorkingDays}
          step="1"
        />
        <Field
          label="Heures facturables par jour"
          helper="Le nombre d’heures que tu peux vendre chaque jour quand tu travailles pour une cliente."
          suffix="h / jour"
          value={hoursPerDay}
          onChange={setHoursPerDay}
          step="0.5"
        />
        <Field
          label="Tarif actuel"
          helper="Ton tarif journalier moyen actuel, si tu en as déjà un."
          suffix="€ / jour"
          value={currentRate}
          onChange={setCurrentRate}
          step="10"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <ResultCard
          label="Tarif cible minimum"
          helper="Le tarif journalier minimum à viser pour atteindre ton objectif de revenu."
          value={`${formatEuro(results.targetTjm)} / jour`}
        />
        <ResultCard
          label="Repère marché estimé"
          helper="Une estimation de marché selon le service, l'expérience et la clientèle choisis."
          value={`${formatEuro(results.marketMedian)} / jour`}
        />
        <ResultCard
          label="Tarif recommandé"
          helper="Le tarif central recommandé en combinant ton objectif et le positionnement choisi."
          value={`${formatEuro(results.recommendedMid)} / jour`}
        />
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-medium text-amber-900">Diagnostic rapide</p>
        <p className="mt-1 text-lg font-semibold text-amber-950">{results.positioning}</p>
        <p className="mt-2 text-sm text-amber-800 leading-6">
          {results.gap > 0
            ? `Pour te rapprocher de la fourchette recommandée, tu pourrais viser environ ${formatEuro(results.gap)} de plus par jour que ton tarif actuel.`
            : `Ton tarif actuel se situe déjà dans une zone cohérente ou supérieure à la recommandation.`}
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 p-5 bg-slate-100">
        <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 border border-slate-200">
          <Lock size={14} /> Analyse complète
        </div>
        <h4 className="text-xl font-semibold mt-3">Ouvre une analyse détaillée sur une nouvelle page</h4>
        <p className="text-slate-600 mt-2 leading-7">
          Découvre une lecture détaillée de tes résultats, une fourchette de positionnement plus visuelle et des conseils adaptés à ton profil.
        </p>
        <Link
          href={premiumUrl}
          className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-white font-medium hover:opacity-90"
        >
          <Sparkles size={16} /> Ouvrir l’analyse détaillée
        </Link>
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

function SelectField({ label, helper, value, onChange, options }) {
  return (
    <label className="block rounded-2xl border border-slate-200 bg-white p-4">
      <span className="block text-sm font-semibold text-slate-800">{label}</span>
      <span className="block text-xs text-slate-500 mt-1 leading-5">{helper}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-3 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-slate-300"
      >
        {options.map(([val, text]) => (
          <option key={val} value={val}>{text}</option>
        ))}
      </select>
    </label>
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
