"use client";

import { useMemo, useState } from "react";
import { BadgeEuro, BarChart3, ShieldCheck, Info, Sparkles } from "lucide-react";

const JOB_DATABASE = [
  { id: "frontend-developer", category: "Tech & Data", label: "Développeur Frontend", freelanceRates: { beginner: 300, intermediate: 450, expert: 650 }, salaryGrossAnnual: { beginner: 35000, intermediate: 50000, expert: 70000 }, confidence: "high", description: "Développe des interfaces web interactives", notes: "Marché très structuré avec forte demande" },
  { id: "backend-developer", category: "Tech & Data", label: "Développeur Backend", freelanceRates: { beginner: 350, intermediate: 500, expert: 700 }, salaryGrossAnnual: { beginner: 38000, intermediate: 55000, expert: 75000 }, confidence: "high", description: "Construit les API et la logique serveur", notes: "Tarifs stables et bien documentés" },
  { id: "fullstack-developer", category: "Tech & Data", label: "Développeur Fullstack", freelanceRates: { beginner: 400, intermediate: 550, expert: 750 }, salaryGrossAnnual: { beginner: 40000, intermediate: 60000, expert: 80000 }, confidence: "high", description: "Intervient sur tout le cycle web", notes: "Très demandé" },
  { id: "mobile-developer", category: "Tech & Data", label: "Développeur Mobile", freelanceRates: { beginner: 350, intermediate: 550, expert: 750 }, salaryGrossAnnual: { beginner: 38000, intermediate: 60000, expert: 80000 }, confidence: "high", description: "Développe des applications iOS/Android", notes: "Forte demande mobile" },
  { id: "data-analyst", category: "Tech & Data", label: "Data Analyst", freelanceRates: { beginner: 350, intermediate: 500, expert: 700 }, salaryGrossAnnual: { beginner: 38000, intermediate: 55000, expert: 75000 }, confidence: "high", description: "Analyse les données business", notes: "Marché structuré" },
  { id: "data-scientist", category: "Tech & Data", label: "Data Scientist", freelanceRates: { beginner: 400, intermediate: 600, expert: 850 }, salaryGrossAnnual: { beginner: 42000, intermediate: 65000, expert: 90000 }, confidence: "high", description: "Crée des modèles prédictifs", notes: "Tarifs élevés" },
  { id: "devops-engineer", category: "Tech & Data", label: "DevOps Engineer", freelanceRates: { beginner: 450, intermediate: 650, expert: 900 }, salaryGrossAnnual: { beginner: 45000, intermediate: 70000, expert: 95000 }, confidence: "high", description: "Automatise les déploiements", notes: "Très recherché" },
  { id: "cybersecurity-consultant", category: "Tech & Data", label: "Consultant Cybersécurité", freelanceRates: { beginner: 500, intermediate: 750, expert: 1000 }, salaryGrossAnnual: { beginner: 50000, intermediate: 75000, expert: 110000 }, confidence: "high", description: "Protège les systèmes informatiques", notes: "Forte tension sur le marché" },
  { id: "ai-engineer", category: "Tech & Data", label: "Ingénieur IA", freelanceRates: { beginner: 500, intermediate: 800, expert: 1200 }, salaryGrossAnnual: { beginner: 55000, intermediate: 85000, expert: 120000 }, confidence: "high", description: "Développe des solutions basées sur l’IA", notes: "Marché en forte croissance" },
  { id: "nocode-developer", category: "Tech & Data", label: "Développeur No-code", freelanceRates: { beginner: 250, intermediate: 450, expert: 700 }, salaryGrossAnnual: { beginner: 32000, intermediate: 50000, expert: 75000 }, confidence: "low", description: "Crée des apps sans coder", notes: "Métier émergent" },
  { id: "automation-specialist", category: "Tech & Data", label: "Spécialiste Automatisation", freelanceRates: { beginner: 300, intermediate: 550, expert: 900 }, salaryGrossAnnual: { beginner: 35000, intermediate: 60000, expert: 95000 }, confidence: "low", description: "Automatise les workflows", notes: "Nouveau marché" },
  { id: "ui-designer", category: "Design & Création", label: "UI Designer", freelanceRates: { beginner: 250, intermediate: 400, expert: 600 }, salaryGrossAnnual: { beginner: 30000, intermediate: 45000, expert: 65000 }, confidence: "medium", description: "Conçoit les interfaces", notes: "Dépend du portfolio" },
  { id: "ux-designer", category: "Design & Création", label: "UX Designer", freelanceRates: { beginner: 300, intermediate: 450, expert: 650 }, salaryGrossAnnual: { beginner: 35000, intermediate: 50000, expert: 70000 }, confidence: "medium", description: "Optimise l’expérience utilisateur", notes: "Variabilité selon projet" },
  { id: "graphic-designer", category: "Design & Création", label: "Graphiste", freelanceRates: { beginner: 200, intermediate: 350, expert: 500 }, salaryGrossAnnual: { beginner: 28000, intermediate: 40000, expert: 55000 }, confidence: "medium", description: "Crée des visuels", notes: "Marché concurrentiel" },
  { id: "brand-designer", category: "Design & Création", label: "Brand Designer", freelanceRates: { beginner: 300, intermediate: 500, expert: 800 }, salaryGrossAnnual: { beginner: 32000, intermediate: 55000, expert: 80000 }, confidence: "medium", description: "Construit des identités visuelles", notes: "Dépend des clients" },
  { id: "motion-designer", category: "Design & Création", label: "Motion Designer", freelanceRates: { beginner: 300, intermediate: 450, expert: 650 }, salaryGrossAnnual: { beginner: 32000, intermediate: 48000, expert: 70000 }, confidence: "medium", description: "Crée des animations", notes: "Demande croissante" },
  { id: "seo-consultant", category: "Marketing & Communication", label: "Consultant SEO", freelanceRates: { beginner: 300, intermediate: 500, expert: 800 }, salaryGrossAnnual: { beginner: 35000, intermediate: 55000, expert: 80000 }, confidence: "medium", description: "Optimise le référencement", notes: "Résultats variables" },
  { id: "sea-specialist", category: "Marketing & Communication", label: "Spécialiste SEA", freelanceRates: { beginner: 300, intermediate: 500, expert: 800 }, salaryGrossAnnual: { beginner: 35000, intermediate: 55000, expert: 80000 }, confidence: "medium", description: "Gère les campagnes ads", notes: "Dépend du ROI" },
  { id: "social-media-manager", category: "Marketing & Communication", label: "Social Media Manager", freelanceRates: { beginner: 200, intermediate: 350, expert: 500 }, salaryGrossAnnual: { beginner: 28000, intermediate: 40000, expert: 55000 }, confidence: "medium", description: "Gère les réseaux sociaux", notes: "Variabilité forte" },
  { id: "content-writer", category: "Marketing & Communication", label: "Rédacteur Web", freelanceRates: { beginner: 180, intermediate: 300, expert: 500 }, salaryGrossAnnual: { beginner: 26000, intermediate: 38000, expert: 55000 }, confidence: "medium", description: "Rédige du contenu", notes: "Très concurrentiel" },
  { id: "growth-marketer", category: "Marketing & Communication", label: "Growth Marketer", freelanceRates: { beginner: 350, intermediate: 600, expert: 900 }, salaryGrossAnnual: { beginner: 40000, intermediate: 65000, expert: 90000 }, confidence: "medium", description: "Optimise la croissance", notes: "Métier hybride" },
  { id: "business-consultant", category: "Business & Conseil", label: "Consultant Business", freelanceRates: { beginner: 400, intermediate: 700, expert: 1000 }, salaryGrossAnnual: { beginner: 45000, intermediate: 75000, expert: 110000 }, confidence: "high", description: "Conseil stratégique", notes: "Dépend du réseau" },
  { id: "product-manager", category: "Business & Conseil", label: "Product Manager", freelanceRates: { beginner: 400, intermediate: 600, expert: 850 }, salaryGrossAnnual: { beginner: 42000, intermediate: 65000, expert: 90000 }, confidence: "high", description: "Gère des produits", notes: "Demande forte" },
  { id: "scrum-master", category: "Business & Conseil", label: "Scrum Master", freelanceRates: { beginner: 350, intermediate: 550, expert: 800 }, salaryGrossAnnual: { beginner: 40000, intermediate: 60000, expert: 85000 }, confidence: "high", description: "Facilite les équipes agiles", notes: "Standardisé" },
  { id: "notion-consultant", category: "Business & Conseil", label: "Consultant Notion", freelanceRates: { beginner: 250, intermediate: 500, expert: 900 }, salaryGrossAnnual: { beginner: 30000, intermediate: 60000, expert: 100000 }, confidence: "low", description: "Optimise Notion", notes: "Métier émergent" },
  { id: "virtual-assistant", category: "Admin & Support", label: "Assistant Virtuel", freelanceRates: { beginner: 150, intermediate: 250, expert: 400 }, salaryGrossAnnual: { beginner: 24000, intermediate: 32000, expert: 45000 }, confidence: "medium", description: "Support administratif", notes: "Dépend du pays" },
  { id: "office-manager", category: "Admin & Support", label: "Office Manager", freelanceRates: { beginner: 200, intermediate: 300, expert: 450 }, salaryGrossAnnual: { beginner: 28000, intermediate: 38000, expert: 50000 }, confidence: "medium", description: "Gère les opérations internes", notes: "Stable" },
  { id: "legal-assistant", category: "Admin & Support", label: "Assistant Juridique", freelanceRates: { beginner: 200, intermediate: 300, expert: 450 }, salaryGrossAnnual: { beginner: 30000, intermediate: 40000, expert: 55000 }, confidence: "medium", description: "Assiste sur les dossiers juridiques", notes: "Niche spécifique" },
  { id: "customer-support-specialist", category: "Admin & Support", label: "Support Client", freelanceRates: { beginner: 150, intermediate: 250, expert: 350 }, salaryGrossAnnual: { beginner: 25000, intermediate: 35000, expert: 45000 }, confidence: "medium", description: "Gère les demandes clients", notes: "Externalisé" },
  { id: "business-coach", category: "Formation & Coaching", label: "Coach Business", freelanceRates: { beginner: 300, intermediate: 600, expert: 1200 }, salaryGrossAnnual: { beginner: 35000, intermediate: 70000, expert: 120000 }, confidence: "low", description: "Accompagne entrepreneurs", notes: "Dépend notoriété" },
  { id: "career-coach", category: "Formation & Coaching", label: "Coach de Carrière", freelanceRates: { beginner: 250, intermediate: 450, expert: 800 }, salaryGrossAnnual: { beginner: 30000, intermediate: 50000, expert: 80000 }, confidence: "low", description: "Accompagne carrière", notes: "Variable" },
  { id: "linkedin-coach", category: "Formation & Coaching", label: "Coach LinkedIn", freelanceRates: { beginner: 250, intermediate: 500, expert: 900 }, salaryGrossAnnual: { beginner: 30000, intermediate: 60000, expert: 100000 }, confidence: "low", description: "Optimise profils LinkedIn", notes: "Nouveau métier" },
  { id: "digital-trainer", category: "Formation & Coaching", label: "Formateur Digital", freelanceRates: { beginner: 300, intermediate: 500, expert: 800 }, salaryGrossAnnual: { beginner: 35000, intermediate: 55000, expert: 80000 }, confidence: "medium", description: "Forme aux outils numériques", notes: "Demande croissante" },
  { id: "video-editor", category: "Audiovisuel & Contenu", label: "Monteur Vidéo", freelanceRates: { beginner: 200, intermediate: 350, expert: 550 }, salaryGrossAnnual: { beginner: 28000, intermediate: 40000, expert: 60000 }, confidence: "medium", description: "Monte des vidéos", notes: "Variable selon projet" },
  { id: "videographer", category: "Audiovisuel & Contenu", label: "Vidéaste", freelanceRates: { beginner: 300, intermediate: 500, expert: 800 }, salaryGrossAnnual: { beginner: 32000, intermediate: 50000, expert: 75000 }, confidence: "medium", description: "Filme et produit", notes: "Dépend matériel" },
  { id: "podcast-producer", category: "Audiovisuel & Contenu", label: "Producteur de Podcast", freelanceRates: { beginner: 250, intermediate: 450, expert: 700 }, salaryGrossAnnual: { beginner: 30000, intermediate: 45000, expert: 65000 }, confidence: "low", description: "Produit des podcasts", notes: "Marché émergent" },
  { id: "thumbnail-designer", category: "Audiovisuel & Contenu", label: "Thumbnail Designer", freelanceRates: { beginner: 150, intermediate: 300, expert: 500 }, salaryGrossAnnual: { beginner: 25000, intermediate: 35000, expert: 50000 }, confidence: "low", description: "Crée miniatures YouTube", notes: "Niche récente" },
  { id: "recruiter", category: "RH & Recrutement", label: "Recruteur Freelance", freelanceRates: { beginner: 300, intermediate: 500, expert: 800 }, salaryGrossAnnual: { beginner: 35000, intermediate: 55000, expert: 80000 }, confidence: "medium", description: "Recrute des talents", notes: "Mix TJM + commission" },
  { id: "hr-consultant", category: "RH & Recrutement", label: "Consultant RH", freelanceRates: { beginner: 350, intermediate: 550, expert: 900 }, salaryGrossAnnual: { beginner: 40000, intermediate: 60000, expert: 90000 }, confidence: "medium", description: "Conseil RH", notes: "Stable" },
  { id: "talent-sourcer", category: "RH & Recrutement", label: "Talent Sourcer", freelanceRates: { beginner: 250, intermediate: 400, expert: 650 }, salaryGrossAnnual: { beginner: 32000, intermediate: 50000, expert: 70000 }, confidence: "medium", description: "Identifie des candidats", notes: "Souvent externalisé" },
  { id: "hrbp-freelance", category: "RH & Recrutement", label: "HR Business Partner Freelance", freelanceRates: { beginner: 400, intermediate: 650, expert: 950 }, salaryGrossAnnual: { beginner: 45000, intermediate: 70000, expert: 100000 }, confidence: "medium", description: "Accompagne stratégie RH", notes: "Position senior" }
];

const EXPERIENCE_LABELS = { beginner: "Débutante", intermediate: "Confirmée", expert: "Experte" };
const CLIENT_LABELS = { "small-business": "Indépendants / petites entreprises", startup: "Startups / entreprises en croissance", premium: "Marques premium / grands comptes" };
const CLIENT_MULTIPLIERS = { "small-business": 1, startup: 1.1, premium: 1.25 };
const CATEGORIES = [...new Set(JOB_DATABASE.map((job) => job.category))];

export default function PricingApp() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Outil pour freelances</p>
            <h1 className="text-xl font-bold">Combien facturer ?</h1>
          </div>
          <a href="#calculateur" className="rounded-2xl bg-slate-900 text-white px-4 py-2 font-medium hover:opacity-90">Calculer mon tarif</a>
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
              Estime ton tarif journalier à partir de ton objectif de revenu, de tes charges, de ton métier, de ton niveau d’expérience et du type de clients que tu veux attirer.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <FeatureMini icon={<BadgeEuro size={18} />} title="Tarif recommandé" text="Un chiffre clair pour fixer ou ajuster tes prix." />
              <FeatureMini icon={<BarChart3 size={18} />} title="Comparaison marché" text="Un repère indicatif selon ton métier et ton niveau." />
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
            <p>Cette estimation combine tes données, des repères métiers indicatifs et un équivalent salarié converti. Elle donne un point de départ utile, mais ne remplace pas une étude de marché personnalisée.</p>
          </div>
        </section>
        <SeoSection />
      </main>
    </div>
  );
}

function PricingCalculator() {
  const [category, setCategory] = useState("Tech & Data");
  const [jobId, setJobId] = useState("frontend-developer");
  const [experienceLevel, setExperienceLevel] = useState("intermediate");
  const [clientType, setClientType] = useState("small-business");
  const [monthlyIncome, setMonthlyIncome] = useState(3000);
  const [chargeRate, setChargeRate] = useState(30);
  const [workingDays, setWorkingDays] = useState(18);
  const [hoursPerDay, setHoursPerDay] = useState(7);
  const [currentRate, setCurrentRate] = useState(250);

  const availableJobs = JOB_DATABASE.filter((job) => job.category === category);
  const selectedJob = JOB_DATABASE.find((job) => job.id === jobId) || availableJobs[0] || JOB_DATABASE[0];

  const results = useMemo(() => {
    const chargesAmount = monthlyIncome * (chargeRate / 100);
    const totalToGenerate = monthlyIncome + chargesAmount;
    const targetTjm = workingDays > 0 ? totalToGenerate / workingDays : 0;
    const hourlyRate = hoursPerDay > 0 ? targetTjm / hoursPerDay : 0;
    const marketMedian = selectedJob.freelanceRates[experienceLevel] * CLIENT_MULTIPLIERS[clientType];
    const salaryEquivalentDaily = convertSalaryToDailyRate(selectedJob.salaryGrossAnnual[experienceLevel]);
    const recommendedLow = Math.round(marketMedian * 0.9);
    const recommendedMid = Math.round(Math.max(targetTjm, marketMedian, salaryEquivalentDaily));
    const recommendedHigh = Math.round(recommendedMid * 1.2);
    const gap = recommendedMid - currentRate;
    const annualGap = gap * workingDays * 12;
    let positioning = "Ton tarif actuel semble cohérent avec ton objectif.";
    if (currentRate < recommendedLow) positioning = "Tu es probablement sous-positionnée au regard de ton objectif et du marché visé.";
    if (currentRate > recommendedHigh) positioning = "Tu es déjà positionnée au-dessus de la fourchette recommandée.";
    return { chargesAmount, totalToGenerate, targetTjm, hourlyRate, marketMedian, salaryEquivalentDaily, recommendedLow, recommendedMid, recommendedHigh, gap, annualGap, positioning };
  }, [monthlyIncome, chargeRate, workingDays, hoursPerDay, currentRate, selectedJob, experienceLevel, clientType]);

  const recommendations = getRecommendations({ currentRate, recommendedMid: results.recommendedMid, targetTjm: results.targetTjm, marketMedian: results.marketMedian, annualGap: results.annualGap });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-slate-500">Calculateur gratuit</p>
        <h3 className="text-2xl font-bold mt-1">Estime ton tarif freelance</h3>
        <p className="text-sm text-slate-600 mt-2 leading-6">Renseigne ta situation. L’outil calcule ton tarif minimum, le compare à un repère freelance et à un équivalent salarié converti, puis propose un tarif recommandé.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <SelectField label="Catégorie métier" helper="La grande famille professionnelle correspondant à ton activité." value={category} onChange={(value) => { setCategory(value); const firstJob = JOB_DATABASE.find((job) => job.category === value); if (firstJob) setJobId(firstJob.id); }} options={CATEGORIES.map((item) => [item, item])} />
        <SelectField label="Métier précis" helper="Le métier ou service le plus proche de ce que tu proposes." value={jobId} onChange={setJobId} options={availableJobs.map((job) => [job.id, job.label])} />
        <SelectField label="Niveau d'expérience" helper="Ton niveau actuel sur ce type de service." value={experienceLevel} onChange={setExperienceLevel} options={Object.entries(EXPERIENCE_LABELS)} />
        <SelectField label="Type de clientèle" helper="Le type de clientes que tu vises le plus souvent." value={clientType} onChange={setClientType} options={Object.entries(CLIENT_LABELS)} />
        <Field label="Revenu mensuel souhaité" helper="Le revenu net ou cible que tu veux atteindre chaque mois grâce à ton activité." suffix="€ / mois" value={monthlyIncome} onChange={setMonthlyIncome} step="100" />
        <Field label="Charges estimées" helper="Le pourcentage de charges à prévoir : cotisations, outils, impôts, logiciels, frais divers." suffix="%" value={chargeRate} onChange={setChargeRate} step="1" />
        <Field label="Jours facturables par mois" helper="Le nombre de jours où tu peux réellement facturer des clientes, pas seulement travailler." suffix="jours" value={workingDays} onChange={setWorkingDays} step="1" />
        <Field label="Heures facturables par jour" helper="Le nombre d’heures que tu peux vendre chaque jour quand tu travailles pour une cliente." suffix="h / jour" value={hoursPerDay} onChange={setHoursPerDay} step="0.5" />
        <Field label="Tarif actuel" helper="Ton tarif journalier moyen actuel, si tu en as déjà un." suffix="€ / jour" value={currentRate} onChange={setCurrentRate} step="10" />
      </div>

      <AdBlock label="Espace publicitaire" />

      <div className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
        <p className="text-sm font-medium text-emerald-800">Résultat principal</p>
        <p className="mt-1 text-4xl font-bold text-emerald-950">{formatEuro(results.recommendedMid)} / jour</p>
        <p className="mt-2 text-sm text-emerald-800 leading-6">C’est le tarif journalier recommandé pour rester cohérente avec ton objectif, ton métier et ton positionnement marché.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <ResultCard label="Minimum rentable" helper="Le tarif à viser pour couvrir ton revenu souhaité et tes charges." value={`${formatEuro(results.targetTjm)} / jour`} />
        <ResultCard label="Repère freelance" helper="Une estimation indicative basée sur le métier, ton niveau et la clientèle visée." value={`${formatEuro(results.marketMedian)} / jour`} />
        <ResultCard label="Équivalent salarié" helper="Un repère converti depuis le salaire brut annuel indicatif du métier." value={`${formatEuro(results.salaryEquivalentDaily)} / jour`} highlight />
      </div>

      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm font-medium text-amber-900">Diagnostic rapide</p>
        <p className="mt-1 text-lg font-semibold text-amber-950">{results.positioning}</p>
        <p className="mt-2 text-sm text-amber-800 leading-6">{results.gap > 0 ? `Ton tarif actuel semble inférieur à la recommandation. Tu pourrais viser environ ${formatEuro(results.gap)} de plus par jour, en augmentant progressivement.` : `Ton tarif actuel est déjà cohérent ou supérieur à la recommandation. Tu peux maintenant travailler la valeur perçue, ton offre et ton argumentaire commercial.`}</p>
      </div>

      <FullAnalysis results={results} selectedJob={selectedJob} monthlyIncome={monthlyIncome} chargeRate={chargeRate} workingDays={workingDays} currentRate={currentRate} experienceLevel={experienceLevel} clientType={clientType} recommendations={recommendations} />
    </div>
  );
}

function FullAnalysis({ results, selectedJob, monthlyIncome, chargeRate, workingDays, currentRate, experienceLevel, clientType, recommendations }) {
  return (
    <div className="rounded-3xl bg-slate-900 text-white p-6 space-y-6">
      <div>
        <p className="text-sm text-slate-300">Analyse complète</p>
        <h3 className="text-2xl font-semibold mt-1">Ce que ton tarif peut changer</h3>
        <p className="text-sm text-slate-300 mt-2 leading-6">Cette analyse combine tes objectifs financiers, ton métier, ton niveau d’expérience, un repère freelance et un équivalent salarié converti.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <DarkCard label="Position prudente" value={`${formatEuro(results.recommendedLow)} / jour`} />
        <DarkCard label="Position centrale" value={`${formatEuro(results.recommendedMid)} / jour`} />
        <DarkCard label="Position premium" value={`${formatEuro(results.recommendedHigh)} / jour`} />
      </div>
      <div className="rounded-2xl bg-white/5 p-4">
        <p className="text-sm text-slate-300">Potentiel annuel estimé</p>
        <p className="text-3xl font-bold mt-1">{results.annualGap > 0 ? formatEuro(results.annualGap) : formatEuro(0)} / an</p>
        <p className="text-sm text-slate-300 mt-2 leading-7">{results.annualGap > 0 ? `Si tu passes progressivement de ${formatEuro(currentRate)} à ${formatEuro(results.recommendedMid)} par jour, cet écart peut représenter ce montant sur une année.` : `Ton tarif actuel est déjà au niveau ou au-dessus de l’objectif calculé. Tu peux plutôt travailler ton offre, ton marketing et ta valeur perçue.`}</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="font-semibold mb-3">Pourquoi ce tarif ?</p>
          <div className="space-y-3 text-sm text-slate-300 leading-7">
            <p>Pour atteindre {formatEuro(monthlyIncome)} par mois avec environ {chargeRate}% de charges, tu dois générer environ {formatEuro(results.totalToGenerate)} par mois.</p>
            <p>Avec {workingDays} jours facturables par mois, ton tarif cible minimum ressort à {formatEuro(results.targetTjm)} par jour.</p>
            <p>Pour {selectedJob.label.toLowerCase()}, niveau {EXPERIENCE_LABELS[experienceLevel].toLowerCase()}, auprès de {CLIENT_LABELS[clientType].toLowerCase()}, le repère freelance indicatif ressort à {formatEuro(results.marketMedian)} par jour.</p>
            <p>L’équivalent salarié converti donne un autre point de comparaison : environ {formatEuro(results.salaryEquivalentDaily)} par jour.</p>
          </div>
        </div>
        <div className="rounded-2xl bg-white/5 p-4">
          <p className="font-semibold mb-3">Actions recommandées</p>
          <ul className="space-y-2 text-sm text-slate-300 list-disc pl-5 leading-6">{recommendations.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>
      <div className="rounded-2xl bg-white/5 p-4">
        <p className="font-semibold mb-2">Fiabilité du repère</p>
        <p className="text-sm text-slate-300 leading-6">Niveau de confiance : <strong className="text-white">{confidenceLabel(selectedJob.confidence)}</strong>. {selectedJob.notes}</p>
      </div>
      <div className="rounded-2xl bg-emerald-400 text-slate-950 p-4">
        <p className="font-semibold mb-2">Exemple de formulation</p>
        <p className="text-sm leading-6">Pour mieux refléter la valeur de mon accompagnement et le niveau de résultat attendu, mon tarif évolue à <strong>{formatEuro(results.recommendedMid)}</strong> par jour.</p>
      </div>
    </div>
  );
}

function Field({ label, helper, suffix, value, onChange, step = "1" }) {
  return <label className="block rounded-2xl border border-slate-200 bg-white p-4"><span className="block text-sm font-semibold text-slate-800">{label}</span><span className="block text-xs text-slate-500 mt-1 leading-5">{helper}</span><div className="mt-3 flex items-center gap-3"><input type="number" step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-slate-300" /><span className="shrink-0 text-sm text-slate-500">{suffix}</span></div></label>;
}

function SelectField({ label, helper, value, onChange, options }) {
  return <label className="block rounded-2xl border border-slate-200 bg-white p-4"><span className="block text-sm font-semibold text-slate-800">{label}</span><span className="block text-xs text-slate-500 mt-1 leading-5">{helper}</span><select value={value} onChange={(e) => onChange(e.target.value)} className="mt-3 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-slate-300">{options.map(([val, text]) => <option key={val} value={val}>{text}</option>)}</select></label>;
}

function ResultCard({ label, helper, value, highlight = false }) {
  return <div className={`rounded-2xl border p-4 ${highlight ? "border-emerald-200 bg-emerald-50" : "border-slate-200 bg-white"}`}><p className="text-sm font-medium text-slate-700">{label}</p><p className="text-xs text-slate-500 mt-1 leading-5">{helper}</p><p className="text-2xl font-bold mt-3">{value}</p></div>;
}

function DarkCard({ label, value }) {
  return <div className="rounded-2xl bg-white/5 p-4"><p className="text-sm text-slate-300">{label}</p><p className="text-2xl font-bold mt-1">{value}</p></div>;
}

function FeatureMini({ icon, title, text }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-4"><div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center mb-3">{icon}</div><p className="font-semibold">{title}</p><p className="text-sm text-slate-600 mt-1">{text}</p></div>;
}

function AdBlock({ label, className = "" }) {
  return <div className={className}><div className="rounded-2xl border border-dashed border-slate-300 bg-white p-5 text-center text-sm text-slate-400">{label}</div></div>;
}

function SeoSection() {
  return <section className="max-w-5xl mx-auto px-6 pb-16"><div className="rounded-[28px] border border-slate-200 bg-white p-6 lg:p-8"><p className="text-sm font-medium text-slate-500">Guide freelance</p><h2 className="mt-2 text-3xl font-bold tracking-tight">Comment fixer son tarif freelance ?</h2><div className="mt-5 space-y-4 text-slate-700 leading-8"><p>Fixer son tarif freelance ne consiste pas seulement à choisir un prix au hasard. Un bon tarif doit couvrir ton objectif de revenu, tes charges, ton temps non facturable et la valeur que tu apportes à tes clients.</p><p>Pour calculer un tarif journalier cohérent, il faut partir du revenu mensuel souhaité, ajouter les charges professionnelles, puis diviser le montant total par le nombre de jours réellement facturables chaque mois.</p><p>Le tarif doit ensuite être comparé à ton marché : un développeur, une designer, une consultante marketing ou une coach ne facturent pas toujours de la même manière.</p><p>Ce simulateur de tarif freelance t’aide à estimer un TJM, à comparer ton tarif actuel et à identifier si tu peux augmenter tes prix progressivement.</p></div></div></section>;
}

function convertSalaryToDailyRate(grossAnnualSalary) {
  return Math.round((grossAnnualSalary * 1.65) / 216);
}

function confidenceLabel(confidence) {
  if (confidence === "high") return "élevé";
  if (confidence === "medium") return "moyen";
  return "faible";
}

function getRecommendations({ currentRate, recommendedMid, targetTjm, marketMedian, annualGap }) {
  const recommendations = [];
  if (currentRate < recommendedMid) recommendations.push(`Teste une hausse progressive vers ${formatEuro(recommendedMid)} / jour plutôt qu’un saut trop brutal.`);
  else recommendations.push("Ton tarif n’est pas forcément trop bas : travaille surtout la clarté de ton offre et la valeur perçue.");
  if (targetTjm > marketMedian) recommendations.push("Ton objectif financier est supérieur au repère freelance estimé : cela demande souvent une offre plus premium, plus spécialisée ou mieux cadrée.");
  else recommendations.push("Ton objectif reste compatible avec le repère freelance estimé, ce qui rend ton positionnement plus facile à défendre commercialement.");
  if (annualGap > 0) recommendations.push(`L’écart estimé peut représenter jusqu’à ${formatEuro(annualGap)} sur un an : cela justifie de revoir sérieusement ton tarif actuel.`);
  else recommendations.push("Le manque à gagner n’apparaît pas significatif : concentre-toi plutôt sur la stabilité commerciale, la qualité de tes leads et la montée en gamme.");
  return recommendations;
}

function formatEuro(value) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(Number.isFinite(value) ? value : 0);
}
