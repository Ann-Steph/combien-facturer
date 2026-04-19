"use client";

import { useMemo, useState } from "react";
import { Check, Lock, Sparkles, ArrowRight, BadgeEuro, BarChart3, ShieldCheck } from "lucide-react";

export default function PricingApp() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Micro-SaaS freelance</p>
            <h1 className="text-xl font-bold">Combien facturer ?</h1>
          </div>
          <button className="rounded-2xl bg-slate-900 text-white px-4 py-2 font-medium hover:opacity-90">
            Débloquer l'analyse premium
          </button>
        </div>
      </header>

      <main>
        <section className="max-w-6xl mx-auto px-6 pt-12 pb-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600 mb-5">
              <Sparkles size={14} /> Calcule ton TJM idéal en 30 secondes
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-tight">
              L’outil simple pour savoir <span className="text-slate-500">combien facturer</span> en freelance.
            </h2>
            <p className="mt-5 text-lg text-slate-600 max-w-2xl leading-8">
              Obtiens gratuitement ton TJM idéal, puis débloque une analyse premium avec fourchette de prix, manque à gagner annuel et conseils concrets pour augmenter tes tarifs.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Badge text="Version gratuite" />
              <Badge text="Analyse premium à 9€/mois" />
              <Badge text="Pensé pour freelances débutantes" />
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <FeatureMini icon={<BadgeEuro size={18} />} title="Tarif réaliste" text="Basé sur ton objectif de revenu." />
              <FeatureMini icon={<BarChart3 size={18} />} title="Projection annuelle" text="Vois combien tu perds ou gagnes." />
              <FeatureMini icon={<ShieldCheck size={18} />} title="Conseils concrets" text="Passe du calcul à l'action." />
            </div>
          </div>

          <div className="bg-white rounded-[28px] shadow-sm border border-slate-200 p-4 lg:p-6">
            <PricingCalculator />
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <InfoCard
              title="Pour qui ?"
              items={[
                "Freelances débutantes",
                "Consultantes et coachs",
                "Créatrices de services",
              ]}
            />
            <InfoCard
              title="Ce que l’outil gratuit donne"
              items={[
                "TJM idéal",
                "Tarif horaire",
                "Diagnostic immédiat",
              ]}
            />
            <InfoCard
              title="Ce que la version premium ajoute"
              items={[
                "Positionnement prudent / standard / premium",
                "Manque à gagner annuel",
                "Script d’augmentation de tarif",
              ]}
            />
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 py-10">
          <div className="rounded-[32px] bg-slate-900 text-white p-8 lg:p-10 grid gap-8 lg:grid-cols-2 items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-300 mb-3">Monétisation recommandée</p>
              <h3 className="text-3xl font-bold">Une offre simple à vendre dès la V1</h3>
              <p className="mt-4 text-slate-300 leading-8">
                Commence par une formule à 9€/mois ou 19€ en paiement unique pour l'analyse complète. C’est assez accessible pour convertir vite, sans te compliquer avec plusieurs plans au départ.
              </p>
              <ul className="mt-6 space-y-3 text-slate-200">
                <li className="flex gap-3"><Check size={18} className="mt-1 shrink-0" />Calcul gratuit pour attirer du trafic</li>
                <li className="flex gap-3"><Check size={18} className="mt-1 shrink-0" />Paywall premium pour débloquer la vraie valeur</li>
                <li className="flex gap-3"><Check size={18} className="mt-1 shrink-0" />Stripe ensuite pour encaisser automatiquement</li>
              </ul>
            </div>
            <div className="bg-white/5 rounded-[28px] p-6 border border-white/10">
              <p className="text-sm text-slate-300">Exemple d’offre</p>
              <div className="mt-3 flex items-end gap-2">
                <span className="text-5xl font-bold">9€</span>
                <span className="text-slate-300 pb-2">/ mois</span>
              </div>
              <p className="mt-3 text-slate-300">Ou 19€ en achat unique pour débloquer l’analyse complète.</p>
              <button className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-emerald-400 px-5 py-3 text-slate-950 font-semibold hover:opacity-90">
                Choisir cette offre <ArrowRight size={16} />
              </button>
              <p className="mt-4 text-xs text-slate-400">Bouton prêt pour être branché à Stripe dans la prochaine étape.</p>
            </div>
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
  const [premiumUnlocked, setPremiumUnlocked] = useState(false);

  const results = useMemo(() => {
    const chargesAmount = monthlyIncome * (chargeRate / 100);
    const targetRevenue = monthlyIncome + chargesAmount;
    const tjm = workingDays > 0 ? targetRevenue / workingDays : 0;
    const hourlyRate = hoursPerDay > 0 ? tjm / hoursPerDay : 0;
    const gap = tjm - currentRate;
    const annualGap = gap * workingDays * 12;
    const prudentRate = tjm * 0.9;
    const standardRate = tjm;
    const premiumRate = tjm * 1.2;

    let positioning = "Tu sembles correctement positionnée.";
    if (currentRate < tjm * 0.9) positioning = "Tu es probablement sous-payée.";
    if (currentRate > tjm * 1.15) positioning = "Tu es déjà sur un positionnement premium.";

    return {
      chargesAmount,
      targetRevenue,
      tjm,
      hourlyRate,
      gap,
      annualGap,
      prudentRate,
      standardRate,
      premiumRate,
      positioning,
    };
  }, [monthlyIncome, chargeRate, workingDays, hoursPerDay, currentRate]);

  return (
    <div>
      <div className="mb-5">
        <p className="text-sm font-medium text-slate-500">Calculateur gratuit</p>
        <h3 className="text-2xl font-bold mt-1">Estime ton tarif idéal</h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Revenu mensuel souhaité (€)" value={monthlyIncome} onChange={setMonthlyIncome} step="100" />
        <Field label="Charges estimées (%)" value={chargeRate} onChange={setChargeRate} step="1" />
        <Field label="Jours travaillés / mois" value={workingDays} onChange={setWorkingDays} step="1" />
        <Field label="Heures facturables / jour" value={hoursPerDay} onChange={setHoursPerDay} step="0.5" />
        <Field label="Ton TJM actuel (€)" value={currentRate} onChange={setCurrentRate} step="10" />
      </div>

      <div className="grid gap-4 sm:grid-cols-3 mt-5">
        <ResultCard label="TJM idéal" value={`${formatEuro(results.tjm)} / jour`} />
        <ResultCard label="Tarif horaire" value={`${formatEuro(results.hourlyRate)} / h`} />
        <ResultCard label="Objectif total" value={`${formatEuro(results.targetRevenue)} / mois`} />
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 mt-5">
        <p className="text-sm font-medium text-amber-900">Diagnostic gratuit</p>
        <p className="mt-1 text-lg font-semibold text-amber-950">{results.positioning}</p>
        <p className="mt-2 text-sm text-amber-800">
          {results.gap > 0
            ? `Tu pourrais viser environ ${formatEuro(results.gap)} de plus par jour.`
            : `Ton tarif actuel dépasse déjà ton besoin minimum de ${formatEuro(results.tjm)}.`}
        </p>
      </div>

      {!premiumUnlocked ? (
        <div className="rounded-3xl border border-slate-200 p-5 bg-slate-100 mt-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-600 border border-slate-200">
            <Lock size={14} /> Analyse premium verrouillée
          </div>
          <h4 className="text-xl font-semibold mt-3">Débloque ton analyse complète</h4>
          <p className="text-slate-600 mt-2 leading-7">
            Découvre ta fourchette de prix idéale, ton manque à gagner annuel et 3 conseils concrets pour augmenter tes tarifs sans te sentir mal à l’aise.
          </p>
          <button
            onClick={() => setPremiumUnlocked(true)}
            className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-white font-medium hover:opacity-90"
          >
            <Sparkles size={16} /> Simuler l'achat premium
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
    "Présente toujours ton tarif avec le résultat livré, pas avec le temps passé.",
    "Propose 3 offres pour rendre ton nouveau prix plus facile à accepter.",
    "Annonce une hausse avec une date claire et un bénéfice client concret.",
  ];

  return (
    <div className="rounded-3xl bg-slate-900 text-white p-6 space-y-5 mt-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-300">Analyse premium activée</p>
          <h3 className="text-2xl font-semibold mt-1">Voici ton potentiel de revenus</h3>
        </div>
        <span className="rounded-full bg-emerald-400 px-3 py-1 text-sm font-medium text-slate-950">Accès premium</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <DarkCard label="Position prudente" value={`${formatEuro(results.prudentRate)} / jour`} />
        <DarkCard label="Position standard" value={`${formatEuro(results.standardRate)} / jour`} />
        <DarkCard label="Position premium" value={`${formatEuro(results.premiumRate)} / jour`} />
      </div>

      <div className="rounded-2xl bg-white/5 p-4">
        <p className="text-sm text-slate-300">Manque à gagner estimé</p>
        <p className="text-3xl font-bold mt-1">{results.annualGap > 0 ? formatEuro(results.annualGap) : formatEuro(0)} / an</p>
        <p className="text-sm text-slate-300 mt-2 leading-7">
          {results.annualGap > 0
            ? `En restant à ${formatEuro(currentRate)} / jour, tu laisses potentiellement cette somme sur la table sur 12 mois.`
            : `Ton tarif actuel dépasse déjà ton objectif minimum. Tu peux tester un meilleur positionnement marketing.`}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="font-semibold mb-3">Conseils recommandés</p>
          <ul className="space-y-2 text-sm text-slate-300 list-disc pl-5">
            {advice.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-emerald-400 text-slate-950 p-4">
          <p className="font-semibold mb-2">Script pour annoncer ton nouveau tarif</p>
          <p className="text-sm leading-6">
            À partir du mois prochain, mes tarifs évolueront pour refléter davantage la valeur stratégique de mon accompagnement. Mon nouveau TJM sera de <strong>{formatEuro(results.standardRate)}</strong>. Cette évolution me permet de garantir un niveau de qualité, de disponibilité et de résultats plus élevé.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, step = "1" }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-slate-700 mb-2">{label}</span>
      <input
        type="number"
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-slate-300"
      />
    </label>
  );
}

function ResultCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
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

function InfoCard({ title, items }) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-lg font-semibold">{title}</p>
      <ul className="mt-4 space-y-3 text-slate-600">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <Check size={18} className="mt-1 shrink-0 text-slate-400" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
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