/* ------------------------------------------------------------------
   Asystent Zakątka — kreator doboru specjalisty (mock, bez AI)
   Zadaje 6–8 pytań kafelkowych, potem liczy TOP 3 dopasowania
   do realnych specjalistów z data.js.
-------------------------------------------------------------------*/

const TAG_LABELS = {
  depression: 'obniżony nastrój / depresja',
  anxiety: 'zaburzenia lękowe',
  panic: 'napady paniki',
  stress: 'stres i napięcie',
  sleep: 'problemy ze snem',
  trauma: 'trauma',
  addiction: 'uzależnienia',
  sexology: 'sfera seksualna',
  adhd: 'ADHD',
  asd: 'spektrum autyzmu',
  neurology: 'objawy neurologiczne',
  grief: 'żałoba',
  chronic_illness: 'choroba przewlekła',
  eating: 'zaburzenia odżywiania',
  ocd: 'zaburzenia obsesyjno-kompulsyjne',
  selfharm: 'samookaleczenia',
  relationships: 'trudności w relacjach',
  self_worth: 'niska samoocena',
  crisis: 'kryzys',
  diagnosis: 'diagnoza',
  psychotherapy: 'psychoterapia',
  social_skills: 'umiejętności społeczne',
  lgbt: 'wsparcie osób LGBTQ+',
  physio_child: 'fizjoterapia dziecięca',
  mood: 'wahania nastroju',
  personality: 'zaburzenia osobowości',
};

/* Definicja przepływu pytań. Każde pytanie ma id, typ (single/multi),
   opcje z efektami na scoring oraz opcjonalny warunek wyświetlenia. */
const FLOW = [
  {
    id: 'who', q: 'Kogo dotyczy konsultacja?', type: 'single',
    options: [
      { k: 'adults', l: 'Mnie (osoba dorosła)', icon: 'ti-user' },
      { k: 'children', l: 'Dziecka lub nastolatka', icon: 'ti-mood-kid' },
      { k: 'couples', l: 'Naszej relacji / pary', icon: 'ti-heart' },
    ]
  },
  {
    id: 'age', q: 'Ile lat ma dziecko?', type: 'single',
    show: a => a.who === 'children',
    options: [
      { k: 'small', l: '0–6 lat', icon: 'ti-baby-carriage' },
      { k: 'mid', l: '7–12 lat', icon: 'ti-mood-smile' },
      { k: 'teen', l: '13–18 lat', icon: 'ti-mood-boy' },
    ]
  },
  {
    id: 'concerns', q: 'Co najbardziej doskwiera? (możesz wybrać kilka)', type: 'multi',
    options: [
      { k: 'depression', l: 'Smutek, brak energii, depresja', icon: 'ti-cloud-rain', tags: ['depression','mood'] },
      { k: 'anxiety', l: 'Lęk, napięcie, napady paniki', icon: 'ti-activity-heartbeat', tags: ['anxiety','panic'] },
      { k: 'sleep', l: 'Problemy ze snem', icon: 'ti-moon', tags: ['sleep'] },
      { k: 'stress', l: 'Stres, wypalenie', icon: 'ti-battery-2', tags: ['stress'] },
      { k: 'trauma', l: 'Trudne przeżycia, trauma', icon: 'ti-cloud-storm', tags: ['trauma'] },
      { k: 'addiction', l: 'Uzależnienie (swoje lub bliskiej osoby)', icon: 'ti-bottle', tags: ['addiction'] },
      { k: 'sexology', l: 'Sfera seksualna', icon: 'ti-user-question', tags: ['sexology'] },
      { k: 'neuro', l: 'Bóle/zawroty głowy, drętwienia', icon: 'ti-bolt', tags: ['neurology'] },
      { k: 'neurodev', l: 'ADHD lub spektrum autyzmu', icon: 'ti-puzzle', tags: ['adhd','asd'] },
      { k: 'grief', l: 'Żałoba, choroba przewlekła', icon: 'ti-ribbon-health', tags: ['grief','chronic_illness'] },
      { k: 'eating', l: 'Zaburzenia odżywiania', icon: 'ti-bowl', tags: ['eating'] },
      { k: 'relationships', l: 'Relacje, samoocena', icon: 'ti-users', tags: ['relationships','self_worth'] },
    ]
  },
  {
    id: 'duration', q: 'Od jak dawna to trwa?', type: 'single',
    options: [
      { k: 'short', l: 'Od niedawna (do ~2 tygodni)', icon: 'ti-clock' },
      { k: 'months', l: 'Od kilku tygodni / miesięcy', icon: 'ti-calendar' },
      { k: 'long', l: 'Długo lub nawraca', icon: 'ti-history' },
      { k: 'idk', l: 'Trudno powiedzieć', icon: 'ti-help' },
    ]
  },
  {
    id: 'meds', q: 'Jak myślisz o leczeniu farmakologicznym?', type: 'single',
    show: a => a.who !== 'children',
    options: [
      { k: 'yes', l: 'Rozważam leki, chcę ocenę lekarza', icon: 'ti-pill', weightPsychiatry: 3 },
      { k: 'open', l: 'Jestem otwarty/a, niech specjalista doradzi', icon: 'ti-scale', weightPsychiatry: 1 },
      { k: 'talk', l: 'Wolę zacząć od rozmowy / terapii', icon: 'ti-messages', weightTalk: 3 },
    ]
  },
  {
    id: 'goal', q: 'Czego najbardziej teraz potrzebujesz?', type: 'single',
    options: [
      { k: 'assess', l: 'Oceny i ustalenia, co dalej', icon: 'ti-clipboard-check', tags: [] },
      { k: 'therapy', l: 'Regularnej psychoterapii', icon: 'ti-armchair', tags: ['psychotherapy'] },
      { k: 'diag', l: 'Diagnozy (np. ADHD/ASD, osobowość)', icon: 'ti-report-search', tags: ['diagnosis'] },
      { k: 'support', l: 'Doraźnego wsparcia w kryzysie', icon: 'ti-lifebuoy', tags: ['crisis'] },
    ]
  },
  {
    id: 'urgency', q: 'Jak szybko chcesz się umówić?', type: 'single',
    options: [
      { k: 'asap', l: 'Jak najszybciej', icon: 'ti-clock-hour-3' },
      { k: 'soon', l: 'W ciągu około 2 tygodni', icon: 'ti-calendar' },
      { k: 'flexible', l: 'Termin nie jest pilny', icon: 'ti-calendar-month' },
    ]
  },
  {
    id: 'safety', q: 'Czy pojawiają się myśli o samookaleczeniu lub odebraniu sobie życia?', type: 'single',
    options: [
      { k: 'no', l: 'Nie', icon: 'ti-check' },
      { k: 'yes', l: 'Tak, miewam takie myśli', icon: 'ti-urgent', crisis: true },
    ]
  },
  {
    id: 'prefs', q: 'Preferencje (opcjonalnie, możesz pominąć)', type: 'multi', optional: true,
    options: [
      { k: 'female', l: 'Specjalistka (kobieta)', icon: 'ti-gender-female', pref: 'female' },
      { k: 'male', l: 'Specjalista (mężczyzna)', icon: 'ti-gender-male', pref: 'male' },
      { k: 'english', l: 'Konsultacja po angielsku', icon: 'ti-language', pref: 'english' },
      { k: 'dog', l: 'Z psem terapeutą (Walter)', icon: 'ti-dog', pref: 'dog' },
    ]
  },
];

/* ---------- Scoring ---------- */
function recommend(answers) {
  const a = answers;
  const pop = a.who === 'couples' ? 'couples' : a.who; // 'adults' | 'children' | 'couples'

  const selectedTags = [];
  (a.concerns || []).forEach(k => {
    const opt = FLOW.find(f => f.id === 'concerns').options.find(o => o.k === k);
    if (opt) selectedTags.push(...opt.tags);
  });
  const goalOpt = FLOW.find(f => f.id === 'goal').options.find(o => o.k === a.goal);
  const goalTags = goalOpt ? goalOpt.tags : [];

  const prefs = a.prefs || [];
  const wantFemale = prefs.includes('female');
  const wantMale = prefs.includes('male');
  const wantEnglish = prefs.includes('english');
  const wantDog = prefs.includes('dog');

  const medOpt = FLOW.find(f => f.id === 'meds').options.find(o => o.k === a.meds) || {};

  const scored = SPECIALISTS.map(s => {
    // pies terapeuta nie jest rekomendacją kreatora
    if (s.group === 'walter' || s.tags.includes('dog')) return null;
    // twardy filtr populacji
    if (pop === 'couples') {
      if (!s.treats.includes('couples')) return null;
    } else if (!s.treats.includes(pop)) {
      return null;
    }
    // dziecko 0-6 → tylko fizjoterapia / pedagog / diagnoza dziecięca
    if (pop === 'children' && a.age === 'small') {
      if (!(s.tags.includes('physio_child') || s.tags.includes('social_skills') || s.tags.includes('diagnosis') || s.role.includes('dzieci'))) {
        // i tak pozwól, ale bez bonusu — nic
      }
    }

    let score = 0;
    const matched = [];
    selectedTags.forEach(t => {
      if (s.tags.includes(t)) { score += 3; if (!matched.includes(t)) matched.push(t); }
    });
    goalTags.forEach(t => { if (s.tags.includes(t)) { score += 2; if (!matched.includes(t)) matched.push(t); } });

    const isPsychiatry = /Psychiatra/i.test(s.role) || /Neurolog/i.test(s.role);
    const isDoctor = /Psychiatra/i.test(s.role);

    // preferencja leczenia
    if (medOpt.weightPsychiatry && isDoctor) score += medOpt.weightPsychiatry;
    if (medOpt.weightTalk) {
      if (isDoctor) score -= 1;
      else score += 2;
    }

    // czas trwania — długo/nawraca premiuje psychoterapię
    if (a.duration === 'long' && s.tags.includes('psychotherapy')) score += 1;
    if (a.duration === 'short' && isDoctor) score += 1;

    // neurologia: jeśli wybrano objawy neuro, neurolog mocno w górę
    if (selectedTags.includes('neurology') && s.tags.includes('neurology')) score += 4;

    // preferencje miękkie
    if (wantFemale && s.gender === 'k') score += 1;
    if (wantMale && s.gender === 'm') score += 1;
    if (wantEnglish && s.english) score += 3;
    if (wantDog && s.dog) score += 3;

    return { s, score, matched, availDays: s.availDays };
  }).filter(Boolean);

  // 1) Ranking według dopasowania profilu (bez względu na dostępność)
  const profileRanked = scored.slice().sort((x, y) =>
    y.score - x.score || x.availDays - y.availDays || x.s.priceFrom - y.s.priceFrom);

  // 2) Ranking z uwzględnieniem dostępności (waga zależna od pilności)
  const urgency = a.urgency || 'flexible';
  const K = urgency === 'asap' ? 0.55 : urgency === 'soon' ? 0.22 : 0; // kara za każdy dzień oczekiwania
  scored.forEach(e => { e.combined = e.score - e.availDays * K; });
  const combinedRanked = scored.slice().sort((x, y) =>
    y.combined - x.combined || x.availDays - y.availDays);

  // weź top 3 z dodatnim wynikiem; uzupełnij, jeśli za mało
  let top = combinedRanked.filter(e => e.score > 0).slice(0, 3);
  if (top.length < 3) {
    top = top.concat(combinedRanked.filter(e => !top.includes(e)).slice(0, 3 - top.length));
  }
  top = top.slice(0, 3);

  // 3) Wykryj kompromis: najlepszy profilem ≠ rekomendowany przez wzgląd na czas
  const bestProfile = profileRanked[0];
  const recommended = top[0];
  let note = null;
  if (urgency !== 'flexible' && bestProfile && recommended &&
      bestProfile.s.id !== recommended.s.id &&
      (bestProfile.availDays - recommended.availDays) >= 7 &&
      bestProfile.score > 0) {
    note = { bestProfile, recommended };
    // zadbaj, by najlepszy profilem był widoczny w wynikach (jako druga karta)
    if (!top.includes(bestProfile)) {
      top = [recommended, bestProfile].concat(top.filter(e => e !== recommended)).slice(0, 3);
    }
  }

  return { top, note, urgency };
}

/* ---------- Generowanie uzasadnienia ---------- */
function reasonFor(rank, entry, answers) {
  const s = entry.s;
  const labels = entry.matched.map(t => TAG_LABELS[t]).filter(Boolean);
  let lead;
  if (rank === 0) lead = 'Polecamy na teraz';
  else if (rank === 1) lead = 'Mocna alternatywa';
  else lead = 'Warto rozważyć';

  let why;
  if (labels.length) {
    why = 'Dopasowanie do: ' + labels.slice(0, 4).join(', ') + '. ' + s.blurb;
  } else {
    why = s.blurb;
  }
  return { lead, why };
}
