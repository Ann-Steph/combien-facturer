"use client";

import { useMemo, useState } from "react";
import { BadgeEuro, BarChart3, ShieldCheck, Info, Sparkles, CheckCircle2 } from "lucide-react";

const SERVICE_LABELS = {
  design: "Design / graphisme",
  copywriting: "Rédaction / copywriting",
  coaching: "Coaching / conseil",
  dev: "Développement",
  marketing: "Marketing / social media",
  admin: "Support administratif",
};

const EXPERIENCE_LABELS = {
  beginner: "Débutante",
  intermediate: "Confirmée",
  expert: "Experte",
};

const CLIENT_LABELS = {
  "small-business": "Indépendants / petites entreprises",
  startup: "Startups / entreprises en croissance",
  premium: "Marques premium / grands comptes",
};

const MARKET_BASE_RATES = {
  design: { beginner: 220, intermediate: 350, expert: 550 },
  copywriting: { beginner: 180, intermediate: 320, expert: 500 },
  coaching: { beginner: 200, intermediate: 400, expert: 700 },
  dev: { beginner: 300, intermediate: 500, expert: 800 },
  marketing: { beginner: 220, intermediate: 380, expert: 620 },
  admin: { beginner: 140, intermediate: 220, expert: 320 },
};

const CLIENT_MULTIPLIERS = {
  "small-business": 1,
  startup: 1.1,
  premium: 1.25,
};

export default function PricingApp() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Outil pour freelances</p>
            <h1 className="text-xl font-bold">Combien facturer ?</h1>
          </div>
          <a
            href="#calculateur"
            className="rounded-2xl bg-slate-900 text-white px-4 py-2 font-medium hover:opacity-90"
          >
            Calculer mon tarif
          </a>
        </div>
      </header>

      <AdBlock label="Espace publicitaire" className="max-w-6xl mx-auto px-6 pt-4" />

      <main>
        <section className="max-w-6xl mx-auto px-6 pt-8 pb-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600 mb-5">
              <Sparkles size={14} /> Trouve ton tarif idéal en 30 secondes
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              Calcule un <span className="text-slate-500">tarif freelance rentable</span>, clair et défendable.
            </h2>

            <p className="mt-5 text-lg text-slate-600 leading-8">
              Estime ton tarif journalier à partir de ton objectif de revenu, de tes charges, de ton niveau d’expérience et du type de clients que tu veux attirer. En quelques secondes, tu obtiens un prix recommandé et une analyse concrète pour mieux facturer.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <FeatureMini icon={<BadgeEuro size={18} />} title="Tarif recommandé" text="Un chiffre clair pour fixer ou ajuster tes prix." />
              <FeatureMini icon={<BarChart3 size={18} />} title="Comparaison marché" text="Un repère indicatif selon ton service et ton niveau." />
              <FeatureMini icon={<ShieldCheck size={18} />} title="Décision simple" text="Comprends si tu dois augmenter, maintenir ou repositionner ton tarif." />
            </div>
          </div>

          <div id="calculateur" className="bg-white rounded-[28px] shadow-sm border border-slate-200 p-6">
            <PricingCalculator />
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 pb-10">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600 leading-7 flex gap-3">
            <Info size={18} className="mt-1 shrink-0 text-slate-400" />
            <p>
              Cette estimation est calculée à partir des informations que tu saisis et de repères indicatifs intégrés dans l’outil. Elle donne un point de départ utile, mais ne remplace pas une analyse complète du marché, de ton expérience, de ton offre ou de ton positionnement commercial.
            </p>
          </div>
        </section>

        <SeoSection />
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

  const results = useMemo(() => {
    const chargesAmount = monthlyIncome * (chargeRate / 100);
    const totalToGenerate = monthlyIncome + chargesAmount;
    const targetTjm = workingDays > 0 ? totalToGenerate / workingDays : 0;
    const hourlyRate = hoursPerDay > 0 ? targetTjm / hoursPerDay : 0;

    const marketMedian = MARKET_BASE_RATES[serviceType][experienceLevel] * CLIENT_MULTIPLIERS[clientType];
    const recommendedLow = Math.round(marketMedian * 0.9);
    const recommendedMid = Math.round(Math.max(targetTjm, marketMedian));
    const recommendedHigh = Math.round(recommendedMid * 1.2);

    const gap = recommendedMid - currentRate;
    const annualGap = gap * workingDays * 12;

    let positioning = "Ton tarif actuel semble cohérent avec ton objectif.";
    if (currentRate < recommendedLow) positioning = "Tu es probablement sous-positionnée au regard de ton objectif et du marché visé.";
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
    };
  }, [monthlyIncome, chargeRate, workingDays, hoursPerDay, currentRate, serviceType, experienceLevel, clientType]);

  const recommendations = getRecommendations({
    currentRate,
    recommendedMid: results.recommendedMid,
    targetTjm: results.targetTjm,
    marketMedian: results.marketMedian,
    annualGap: results.annualGap,
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-slate-500">Calculateur gratuit</p>
        <h3 className="text-2xl font-bold mt-1">Estime ton tarif freelance</h3>
        <p className="text-sm text-slate-600 mt-2 leading-6">
          Renseigne ta situation actuelle. L’outil calcule ton tarif minimum, le compare à un repère marché indicatif, puis te propose un tarif recommandé facile à interpréter.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField
          label="Type de service"
          helper="Le métier ou service principal que tu vends."
          value={serviceType}
          onChange={setServiceType}
          options={Object.entries(SERVICE_LABELS)}
        />
        <SelectField
          label="Niveau d'expérience"
          helper="Ton niveau actuel sur ce type de service."
          value={experienceLevel}
          onChange={setExperienceLevel}
          options={Object.entries(EXPERIENCE_LABELS)}
        />
        <SelectField
          label="Type de clientèle"
          helper="Le type de clientes que tu vises le plus souvent."
          value={clientType}
          onChange={setClientType}
          options={Object.entries(CLIENT_LABELS)}
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
          helper="Le pourcentage de charges à prévoir : cotisations, outils, impôts, logiciels, frais divers."
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

      <AdBlock label="Espace publicitaire" />

      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
        <p className="text-sm font-medium text-emerald-800">Résultat principal</p>
        <p className="mt-1 text-4xl font-bold text-emerald-950">{formatEuro(results.recommendedMid)} / jour</p>
        <p className="mt-2 text-sm text-emerald-800 leading-6">
          C’est le tarif journalier recommandé pour rester cohérente avec ton objectif de revenu et ton positionnement marché.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <ResultCard
          label="Minimum rentable"
          helper="Le tarif à viser pour couvrir ton revenu souhaité et tes charges."
          value={`${formatEuro(results.targetTjm)} / jour`}
        />
        <ResultCard
          label="Repère marché"
          helper="Une estimation indicative selon ton service, ton expérience et ta clientèle."
          value={`${formatEuro(results.marketMedian)} / jour`}
        />
        <ResultCard
          label="Écart actuel"
          helper="La différence entre ton tarif actuel et le tarif recommandé."
          value={`${results.gap > 0 ? "+" : ""}${formatEuro(results.gap)} / jour`}
          highlight
        />
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-medium text-amber-900">Diagnostic rapide</p>
        <p className="mt-1 text-lg font-semibold text-amber-950">{results.positioning}</p>
        <p className="mt-2 text-sm text-amber-800 leading-6">
          {results.gap > 0
            ? `Concrètement, ton tarif actuel semble inférieur à la recommandation. Tu pourrais viser environ ${formatEuro(results.gap)} de plus par jour, en augmentant progressivement.`
            : `Ton tarif actuel est déjà cohérent ou supérieur à la recommandation. Tu peux maintenant travailler la valeur perçue, ton offre et ton argumentaire commercial.`}
        </p>
      </div>

      <FullAnalysis
        results={results}
        monthlyIncome={monthlyIncome}
        chargeRate={chargeRate}
        workingDays={workingDays}
        currentRate={currentRate}
        serviceType={serviceType}
        experienceLevel={experienceLevel}
        clientType={clientType}
        recommendations={recommendations}
      />
    </div>
  );
}

function FullAnalysis({ results, monthlyIncome, chargeRate, workingDays, currentRate, serviceType, experienceLevel, clientType, recommendations }) {
  return (
    <div className="rounded-3xl bg-slate-900 text-white p-6 space-y-6">
      <div>
        <p className="text-sm text-slate-300">Analyse complète</p>
        <h3 className="text-2xl font-semibold mt-1">Ce que ton tarif peut changer</h3>
        <p className="text-sm text-slate-300 mt-2 leading-6">
          Cette analyse t’aide à comprendre ton prix, à repérer un éventuel manque à gagner et à ajuster ton positionnement sans fixer tes tarifs au hasard.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <DarkCard label="Position prudente" value={`${formatEuro(results.recommendedLow)} / jour`} />
        <DarkCard label="Position centrale" value={`${formatEuro(results.recommendedMid)} / jour`} />
        <DarkCard label="Position premium" value={`${formatEuro(results.recommendedHigh)} / jour`} />
      </div>

      <div className="rounded-2xl bg-white/5 p-4">
        <p className="text-sm text-slate-300">Potentiel annuel estimé</p>
        <p className="text-3xl font-bold mt-1">
          {results.annualGap > 0 ? formatEuro(results.annualGap) : formatEuro(0)} / an
        </p>
        <p className="text-sm text-slate-300 mt-2 leading-7">
          {results.annualGap > 0
            ? `Si tu passes progressivement de ${formatEuro(currentRate)} à ${formatEuro(results.recommendedMid)} par jour, cet écart peut représenter ce montant sur une année.`
            : `Ton tarif actuel est déjà au niveau ou au-dessus de l’objectif calculé. Tu peux plutôt travailler ton offre, ton marketing et ta valeur perçue.`}
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="font-semibold mb-3">Pourquoi ce tarif ?</p>
          <div className="space-y-3 text-sm text-slate-300 leading-7">
            <p>
              Pour atteindre {formatEuro(monthlyIncome)} par mois avec environ {chargeRate}% de charges, tu dois générer environ {formatEuro(results.totalToGenerate)} par mois.
            </p>
            <p>
              Avec {workingDays} jours facturables par mois, ton tarif cible minimum ressort à {formatEuro(results.targetTjm)} par jour.
            </p>
            <p>
              Pour {SERVICE_LABELS[serviceType].toLowerCase()}, niveau {EXPERIENCE_LABELS[experienceLevel].toLowerCase()}, auprès de {CLIENT_LABELS[clientType].toLowerCase()}, le repère marché indicatif ressort à {formatEuro(results.marketMedian)} par jour.
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-white/5 p-4">
          <p className="font-semibold mb-3">Actions recommandées</p>
          <ul className="space-y-2 text-sm text-slate-300 list-disc pl-5 leading-6">
            {recommendations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-2xl bg-emerald-400 text-slate-950 p-4">
        <p className="font-semibold mb-2">Exemple de formulation</p>
        <p className="text-sm leading-6">
          Pour mieux refléter la valeur de mon accompagnement et le niveau de résultat attendu, mon tarif évolue à <strong>{formatEuro(results.recommendedMid)}</strong> par jour.
        </p>
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

function ResultCard({ label, helper, value, highlight = false }) {
  return (
    <div className={`rounded-2xl border p-4 ${highlight ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-white"}`}>
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

function SeoSection() {
  return (
    <section className="max-w-5xl mx-auto px-6 pb-16">
      <div className="rounded-[28px] border border-slate-200 bg-white p-6 lg:p-8">
        <p className="text-sm font-medium text-slate-500">Guide freelance</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight">Comment fixer son tarif freelance ?</h2>
        <div className="mt-5 space-y-4 text-slate-700 leading-8">
          <p>
            Fixer son tarif freelance ne consiste pas seulement à choisir un prix au hasard. Un bon tarif doit couvrir ton objectif de revenu, tes charges, ton temps non facturable et la valeur que tu apportes à tes clients.
          </p>
          <p>
            Pour calculer un tarif journalier cohérent, il faut partir du revenu mensuel souhaité, ajouter les charges professionnelles, puis diviser le montant total par le nombre de jours réellement facturables chaque mois.
          </p>
          <p>
            Le tarif doit ensuite être comparé à ton marché : un graphiste freelance, un développeur, une consultante marketing ou une coach ne facturent pas toujours de la même manière. Le niveau d’expérience, la spécialisation et le type de clientèle influencent fortement le prix final.
          </p>
          <p>
            Ce simulateur de tarif freelance t’aide à estimer un TJM, à comparer ton tarif actuel et à identifier si tu peux augmenter tes prix progressivement.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <SeoCard title="TJM freelance" text="Estime ton tarif journalier moyen selon ton objectif de revenu." />
          <SeoCard title="Tarif par métier" text="Compare ton prix à un repère indicatif selon ton service." />
          <SeoCard title="Augmenter ses prix" text="Identifie ton potentiel de revenus et ajuste ton positionnement." />
        </div>
      </div>
    </section>
  );
}

function SeoCard({ title, text }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <p className="font-semibold text-slate-900">{title}</p>
      <p className="mt-2 text-sm text-slate-600 leading-6">{text}</p>
    </div>
  );
}

function AdBlock({ label, className = "" }) {
  return (
    <div className={className}>
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-center text-sm text-slate-400">
        {label}
      </div>
    </div>
  );
}

function getRecommendations({ currentRate, recommendedMid, targetTjm, marketMedian, annualGap }) {
  const recommendations = [];

  if (currentRate < recommendedMid) {
    recommendations.push(`Teste une hausse progressive vers ${formatEuro(recommendedMid)} / jour plutôt qu’un saut trop brutal.`);
  } else {
    recommendations.push("Ton tarif n’est pas forcément trop bas : travaille surtout la clarté de ton offre et la valeur perçue.");
  }

  if (targetTjm > marketMedian) {
    recommendations.push("Ton objectif financier est supérieur au repère marché estimé : cela demande souvent une offre plus premium, plus spécialisée ou mieux cadrée.");
  } else {
    recommendations.push("Ton objectif reste compatible avec le repère marché estimé, ce qui rend ton positionnement plus facile à défendre commercialement.");
  }

  if (annualGap > 0) {
    recommendations.push(`L’écart estimé peut représenter jusqu’à ${formatEuro(annualGap)} sur un an : cela justifie de revoir sérieusement ton tarif actuel.`);
  } else {
    recommendations.push("Le manque à gagner n’apparaît pas significatif : concentre-toi plutôt sur la stabilité commerciale, la qualité de tes leads et la montée en gamme.");
  }

  return recommendations;
}

function formatEuro(value) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}
