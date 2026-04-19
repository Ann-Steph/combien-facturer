import Link from "next/link";

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
  coaching: { beginner: 220, intermediate: 420, expert: 700 },
  dev: { beginner: 300, intermediate: 520, expert: 800 },
  marketing: { beginner: 220, intermediate: 380, expert: 620 },
  admin: { beginner: 140, intermediate: 220, expert: 320 },
};

const CLIENT_MULTIPLIERS = {
  "small-business": 1,
  startup: 1.1,
  premium: 1.25,
};

export default async function PremiumPage({ searchParams }) {
  const params = await searchParams;

  const serviceType = safeValue(params?.serviceType, Object.keys(SERVICE_LABELS), "design");
  const experienceLevel = safeValue(params?.experienceLevel, Object.keys(EXPERIENCE_LABELS), "intermediate");
  const clientType = safeValue(params?.clientType, Object.keys(CLIENT_LABELS), "small-business");

  const monthlyIncome = parsePositiveNumber(params?.monthlyIncome, 3000);
  const chargeRate = parsePositiveNumber(params?.chargeRate, 30);
  const workingDays = parsePositiveNumber(params?.workingDays, 18);
  const hoursPerDay = parsePositiveNumber(params?.hoursPerDay, 7);
  const currentRate = parsePositiveNumber(params?.currentRate, 250);

  const chargesAmount = monthlyIncome * (chargeRate / 100);
  const totalToGenerate = monthlyIncome + chargesAmount;
  const targetTjm = workingDays > 0 ? totalToGenerate / workingDays : 0;
  const hourlyRate = hoursPerDay > 0 ? targetTjm / hoursPerDay : 0;

  const marketMedian = MARKET_BASE_RATES[serviceType][experienceLevel] * CLIENT_MULTIPLIERS[clientType];
  const recommendedLow = Math.round(marketMedian * 0.9);
  const recommendedMid = Math.round(Math.max(targetTjm, marketMedian));
  const recommendedHigh = Math.round(recommendedMid * 1.2);

  const gapVsCurrent = recommendedMid - currentRate;
  const annualGap = gapVsCurrent * workingDays * 12;

  const positioning = getPositioning(currentRate, recommendedLow, recommendedHigh);
  const analysis = getAnalysis({
    currentRate,
    recommendedLow,
    recommendedMid,
    recommendedHigh,
    annualGap,
    targetTjm,
    marketMedian,
  });

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Analyse détaillée</p>
            <h1 className="text-xl font-bold">Combien facturer ?</h1>
          </div>
          <Link
            href="/"
            className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15"
          >
            Retour au calculateur
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div>
            <div className="inline-flex items-center rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">
              Analyse premium personnalisée
            </div>
            <h2 className="mt-5 text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
              Voici ta <span className="text-emerald-300">fourchette de prix recommandée</span>
            </h2>
            <p className="mt-5 text-lg text-slate-300 leading-8 max-w-3xl">
              Cette analyse combine ton objectif de revenu, tes charges, ton rythme de travail, le type de service que tu proposes, ton niveau d’expérience et le type de clientèle visé.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <ProfileCard label="Service" value={SERVICE_LABELS[serviceType]} />
              <ProfileCard label="Expérience" value={EXPERIENCE_LABELS[experienceLevel]} />
              <ProfileCard label="Clientèle" value={CLIENT_LABELS[clientType]} />
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20">
            <p className="text-sm text-slate-400">Synthèse</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <StatCard label="Tarif actuel" value={`${formatEuro(currentRate)} / jour`} />
              <StatCard label="Tarif recommandé" value={`${formatEuro(recommendedMid)} / jour`} />
              <StatCard label="Repère marché" value={`${formatEuro(marketMedian)} / jour`} />
              <StatCard label="Tarif horaire cible" value={`${formatEuro(hourlyRate)} / h`} />
            </div>
            <div className="mt-5 rounded-2xl bg-amber-400/10 border border-amber-300/15 p-4">
              <p className="text-sm text-amber-200">Diagnostic</p>
              <p className="mt-1 text-lg font-semibold text-white">{positioning.title}</p>
              <p className="mt-2 text-sm text-slate-300 leading-6">{positioning.description}</p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-3">
          <PriceCard
            title="Position prudente"
            price={`${formatEuro(recommendedLow)} / jour`}
            description="Un niveau raisonnable pour commencer à réajuster ton tarif sans créer trop de friction."
          />
          <PriceCard
            title="Position recommandée"
            price={`${formatEuro(recommendedMid)} / jour`}
            description="Le point d’équilibre entre ton objectif financier et le marché ciblé."
            highlight
          />
          <PriceCard
            title="Position premium"
            price={`${formatEuro(recommendedHigh)} / jour`}
            description="Un positionnement plus élevé si ton offre est mieux cadrée, plus stratégique ou plus différenciante."
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">Lecture détaillée des résultats</p>
            <h3 className="mt-2 text-2xl font-semibold">Ce que tes chiffres racontent</h3>
            <div className="mt-5 space-y-4 text-slate-300 leading-7">
              <p>
                Pour atteindre <strong className="text-white">{formatEuro(monthlyIncome)}</strong> par mois avec environ <strong className="text-white">{chargeRate}%</strong> de charges, tu dois générer environ <strong className="text-white">{formatEuro(totalToGenerate)}</strong> par mois.
              </p>
              <p>
                Avec <strong className="text-white">{workingDays} jours facturables</strong> par mois, ton tarif cible minimum ressort à <strong className="text-white">{formatEuro(targetTjm)} / jour</strong>.
              </p>
              <p>
                En tenant compte du <strong className="text-white">type de service</strong>, de ton <strong className="text-white">niveau d’expérience</strong> et de la <strong className="text-white">clientèle visée</strong>, le repère marché estimé ressort à <strong className="text-white">{formatEuro(marketMedian)} / jour</strong>.
              </p>
              <p>
                La recommandation centrale est donc fixée à <strong className="text-white">{formatEuro(recommendedMid)} / jour</strong>, car elle protège à la fois ta rentabilité et la cohérence de ton positionnement.
              </p>
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-emerald-400 to-cyan-400 p-[1px]">
            <div className="rounded-[27px] bg-slate-950 p-6 h-full">
              <p className="text-sm text-slate-400">Potentiel d’évolution</p>
              <h3 className="mt-2 text-2xl font-semibold">Ton manque à gagner estimé</h3>
              <p className="mt-4 text-5xl font-bold text-white">
                {annualGap > 0 ? `${formatEuro(annualGap)} / an` : `${formatEuro(0)} / an`}
              </p>
              <p className="mt-4 text-slate-300 leading-7">
                {annualGap > 0
                  ? `Si tu passes progressivement de ${formatEuro(currentRate)} à ${formatEuro(recommendedMid)} par jour, cet écart peut représenter ce montant sur une année complète.`
                  : `Ton tarif actuel est déjà au niveau ou au-dessus de la recommandation calculée. Tu peux plutôt travailler ton offre, ton marketing et ton positionnement.`}
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <MiniMetric label="Objectif mensuel" value={formatEuro(monthlyIncome)} />
                <MiniMetric label="Total à générer" value={formatEuro(totalToGenerate)} />
                <MiniMetric label="Jours facturables" value={`${workingDays} jours`} />
                <MiniMetric label="Tarif horaire cible" value={`${formatEuro(hourlyRate)} / h`} />
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-slate-400">Recommandations</p>
            <h3 className="mt-2 text-2xl font-semibold">Comment utiliser ce tarif</h3>
            <ul className="mt-5 space-y-3 text-slate-300 leading-7 list-disc pl-5">
              {analysis.recommendations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-[28px] bg-white text-slate-900 p-6">
            <p className="text-sm text-slate-500">Exemple de formulation client</p>
            <h3 className="mt-2 text-2xl font-semibold">Script prêt à adapter</h3>
            <p className="mt-5 text-slate-700 leading-7">
              Pour mieux refléter la valeur de mon accompagnement, la qualité de suivi et le niveau de résultat attendu, mon tarif évolue désormais à <strong>{formatEuro(recommendedMid)} par jour</strong>. Cette évolution me permet de garantir un accompagnement plus solide, plus structuré et plus impactant.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

function ProfileCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-bold text-white">{value}</p>
    </div>
  );
}

function PriceCard({ title, price, description, highlight = false }) {
  return (
    <div
      className={`rounded-[28px] border p-6 ${
        highlight
          ? "border-emerald-300/40 bg-emerald-400/10"
          : "border-white/10 bg-white/5"
      }`}
    >
      <p className="text-sm text-slate-400">{title}</p>
      <p className="mt-2 text-4xl font-bold text-white">{price}</p>
      <p className="mt-4 text-slate-300 leading-7">{description}</p>
    </div>
  );
}

function MiniMetric({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-1 font-semibold text-white">{value}</p>
    </div>
  );
}

function getPositioning(currentRate, recommendedLow, recommendedHigh) {
  if (currentRate < recommendedLow) {
    return {
      title: "Tu es probablement sous-positionnée.",
      description:
        "Ton tarif actuel semble inférieur à la zone cohérente pour ton objectif et ton profil. Une hausse progressive paraît justifiée.",
    };
  }

  if (currentRate > recommendedHigh) {
    return {
      title: "Tu es déjà sur un positionnement élevé.",
      description:
        "Ton tarif actuel dépasse la fourchette recommandée. Il peut rester cohérent si ton offre est très différenciante ou très stratégique.",
    };
  }

  return {
    title: "Ton tarif est dans une zone cohérente.",
    description:
      "Tu te situes déjà dans une fourchette crédible. Tu peux maintenant travailler l’offre, le cadrage et la valeur perçue.",
  };
}

function getAnalysis({ currentRate, recommendedMid, annualGap, targetTjm, marketMedian }) {
  const recommendations = [];

  if (currentRate < recommendedMid) {
    recommendations.push(
      `Teste d’abord une hausse progressive vers ${formatEuro(recommendedMid)} / jour, plutôt qu’un saut trop brutal.`
    );
  } else {
    recommendations.push(
      "Travaille davantage la structure de ton offre et les bénéfices clients pour justifier ton positionnement actuel."
    );
  }

  if (targetTjm > marketMedian) {
    recommendations.push(
      "Ton objectif financier est supérieur au repère marché estimé : cela demande souvent une offre plus premium, mieux cadrée ou plus spécialisée."
    );
  } else {
    recommendations.push(
      "Ton objectif reste compatible avec le repère marché estimé, ce qui rend ton positionnement plus facile à défendre commercialement."
    );
  }

  if (annualGap > 0) {
    recommendations.push(
      `L’écart estimé représente jusqu’à ${formatEuro(annualGap)} par an : cela justifie de revoir sérieusement ton tarif actuel.`
    );
  } else {
    recommendations.push(
      "Le manque à gagner n’apparaît pas significatif : concentre-toi plutôt sur la stabilité commerciale et la montée en gamme."
    );
  }

  return { recommendations };
}

function parsePositiveNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function safeValue(value, allowed, fallback) {
  return allowed.includes(value) ? value : fallback;
}

function formatEuro(value) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);
}
