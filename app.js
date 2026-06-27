/* ===================== App: render + interakcje ===================== */

/* ---------- Polska typografia (port pl() z car-rfq) ----------
   Idempotentny: regexy używają zwykłej spacji, nie \s, więc NBSP nie jest
   ponownie dopasowywany. Twarda spacja = U+00A0.
   1. Długie myślniki (—/–) -> zwykły dywiz "-".
   2. Myślnik klauzulowy " - słowo" klei się do następnego słowa.
   3. Pierwsze słowo zdania klei się z kolejnym.
   4. Sieroty: a/i/o/u/w/z + spacja -> twarda spacja. */
const NBSP = String.fromCharCode(160);
function pl(text){
  if(!text) return text;
  return text
    .replace(/[—–]/g, '-')
    .replace(/ +- +(?=\S)/g, ' -' + NBSP)
    .replace(/([.!?] +\p{Lu}\S*) +(?=\S)/gu, (_m, head) => head + NBSP)
    .replace(/(?<![\p{L}\p{N}])([aiouwzAIOUWZ]) +/gu, (_m, w) => w + NBSP);
}
/* Przejście po tekstach DOM i zastosowanie pl() (pomija pola formularzy). */
function typoPass(root){
  const SKIP = {SCRIPT:1,STYLE:1,NOSCRIPT:1,INPUT:1,TEXTAREA:1};
  const walker = document.createTreeWalker(root || document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(n){
      if(SKIP[n.parentNode.nodeName]) return NodeFilter.FILTER_REJECT;
      if(!/[A-Za-zĄąĆćĘęŁłŃńÓóŚśŹźŻż]/.test(n.nodeValue)) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const nodes = [];
  let nd; while((nd = walker.nextNode())) nodes.push(nd);
  nodes.forEach(n => { const v = pl(n.nodeValue); if(v !== n.nodeValue) n.nodeValue = v; });
}

/* Format najbliższego terminu na podstawie liczby dni (mock kalendarza). */
function formatSlot(days){
  const d = new Date();
  d.setDate(d.getDate() + days);
  const date = new Intl.DateTimeFormat('pl-PL', { weekday:'short', day:'numeric', month:'long' }).format(d);
  const rel = days <= 0 ? 'dziś' : days === 1 ? 'jutro' : 'za ' + days + ' dni';
  return { date, rel };
}

document.addEventListener('DOMContentLoaded', () => {
  renderValues();
  renderSteps();
  renderSpecialists('all');
  renderPricing();
  renderFaq();
  bindFilters();
  bindHeroAssistant();
  buildModal();
  bindAssistantModal();
  Assistant.start();
  typoPass(document.body);
});

/* ---------- Nakładka asystenta (dobór specjalisty) ---------- */
function openAssistant(){
  const m = document.getElementById('assistantModal');
  if(!m) return;
  m.classList.add('open');
  m.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  const sc = m.querySelector('.amodal-scroll');
  if(sc) sc.scrollTop = 0;
}
function closeAssistant(){
  const m = document.getElementById('assistantModal');
  if(!m) return;
  m.classList.remove('open');
  m.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
/* generyczne „Dobierz specjalistę" - start od początku przepływu */
function dobor(e){
  if(e && e.preventDefault) e.preventDefault();
  Assistant.start();
  openAssistant();
}
function bindAssistantModal(){
  const m = document.getElementById('assistantModal');
  if(!m) return;
  m.querySelectorAll('[data-close]').forEach(el => el.onclick = closeAssistant);
  // klik w link „Umów wizytę / kontakt" w wynikach zamyka nakładkę i przewija
  m.addEventListener('click', e => {
    if(e.target.closest('a[href="#umow"]')) closeAssistant();
  });
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape' && m.classList.contains('open')) closeAssistant();
  });
}

/* ---------- Asystent (silnik UI) ---------- */
const Assistant = (() => {
  const answers = {};
  let stepIdx = 0;
  let visibleFlow = [];

  const body = () => document.getElementById('assistantBody');
  const prog = () => document.getElementById('assistantProgress');
  const progLabel = () => document.getElementById('assistantProgressLabel');

  function buildVisibleFlow(){ visibleFlow = FLOW.filter(f => !f.show || f.show(answers)); }

  function start(){
    stepIdx = 0;
    for(const k in answers) delete answers[k];
    buildVisibleFlow();
    render();
  }

  function renderProgress(){
    const total = visibleFlow.length;
    prog().innerHTML = visibleFlow.map((_, i) => `<div class="dot ${i <= stepIdx ? 'on' : ''}"></div>`).join('');
    progLabel().textContent = `Pytanie ${Math.min(stepIdx + 1, total)} z ${total} · anonimowo, bez zapisu danych`;
  }

  function render(){
    buildVisibleFlow();
    if(stepIdx >= visibleFlow.length) return renderResults();
    const step = visibleFlow[stepIdx];
    renderProgress();
    const isMulti = step.type === 'multi';
    const current = answers[step.id] || (isMulti ? [] : null);
    const tiles = step.options.map(o => {
      const sel = isMulti ? current.includes(o.k) : current === o.k;
      return `<button class="tile ${sel ? 'sel' : ''} ${o.crisis ? 'crisis' : ''}" data-k="${o.k}">
        <i class="ti ${o.icon}" aria-hidden="true"></i><span>${o.l}</span></button>`;
    }).join('');
    body().className = 'assistant-body fade';
    body().innerHTML = `
      <div class="q-title">${step.q}</div>
      ${isMulti ? `<div class="q-hint">Zaznacz wszystko, co pasuje, a potem kliknij „Dalej".</div>` : ''}
      <div class="tile-grid">${tiles}</div>
      <div class="assistant-actions">
        <button class="link-btn" id="aBack"><i class="ti ti-arrow-left"></i> Wstecz</button>
        <div style="display:flex;gap:10px">
          ${step.optional ? `<button class="btn btn-ghost btn-sm" id="aSkip">Pomiń</button>` : ''}
          ${isMulti ? `<button class="btn btn-primary btn-sm" id="aNext">Dalej <i class="ti ti-arrow-right"></i></button>` : ''}
        </div>
      </div>`;
    body().querySelectorAll('.tile').forEach(t => t.onclick = () => onPick(step, t.dataset.k));
    const back = document.getElementById('aBack'); if(back) back.onclick = goBack;
    const next = document.getElementById('aNext'); if(next) next.onclick = goNext;
    const skip = document.getElementById('aSkip'); if(skip) skip.onclick = () => { answers[step.id] = []; goNext(); };
    typoPass(body());
  }

  function onPick(step, k){
    const opt = step.options.find(o => o.k === k);
    if(opt && opt.crisis){ answers[step.id] = k; return renderCrisis(); }
    if(step.type === 'multi'){
      const arr = answers[step.id] || [];
      const i = arr.indexOf(k);
      if(i >= 0) arr.splice(i, 1); else arr.push(k);
      answers[step.id] = arr;
      render();
    } else { answers[step.id] = k; goNext(); }
  }

  function goNext(){ buildVisibleFlow(); stepIdx++; render(); }
  function goBack(){ if(stepIdx === 0) return; stepIdx--; render(); }

  function renderProgressDone(label){
    prog().innerHTML = visibleFlow.map(() => `<div class="dot on"></div>`).join('');
    progLabel().textContent = label || 'Gotowe · Twoja rekomendacja poniżej';
  }

  function renderResults(){
    renderProgressDone();
    const rec = recommend(answers);
    const top = rec.top;
    const note = rec.note;
    const match = [94, 79, 66];
    const cards = top.map((entry, i) => {
      const { lead, why } = reasonFor(i, entry, answers);
      const s = entry.s;
      const slot = formatSlot(entry.availDays);
      const fast = entry.availDays <= 7;
      return `
      <div class="result-card ${i === 0 ? 'top' : ''} fade">
        <div class="rc-head">
          <div class="rc-id">
            <img class="rc-photo" src="${s.photo}" alt="${s.name}" loading="lazy">
            <div>
              <div class="rc-name">${s.name}</div>
              <div class="rc-role">${s.role}</div>
            </div>
          </div>
          <span class="rc-lead">${lead}</span>
        </div>
        <p class="rc-why">${why}</p>
        <div class="rc-foot">
          <div class="match">
            <div class="lbl"><span>Dopasowanie</span><span>${match[i]}%</span></div>
            <div class="bar"><span style="width:${match[i]}%"></span></div>
          </div>
          <span class="rc-price">${s.priceFrom} zł · ${s.priceLabel}</span>
        </div>
        <div class="rc-avail ${fast ? 'fast' : ''}">
          <i class="ti ti-calendar-check"></i> Najbliższy wolny termin: <b>${slot.rel}</b> · ${slot.date}
        </div>
        <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap">
          <a class="btn ${i === 0 ? 'btn-primary' : 'btn-ghost'} btn-sm" href="#umow"><i class="ti ti-calendar-plus"></i> Umów wizytę</a>
          <button class="btn btn-ghost btn-sm" data-open="${s.id}"><i class="ti ti-user"></i> Poznaj specjalistę</button>
        </div>
      </div>`;
    }).join('');

    let swapBanner = '';
    if(note){
      const bp = note.bestProfile, rc = note.recommended;
      swapBanner = `
        <div class="swap-note">
          <i class="ti ti-clock-bolt"></i>
          <span><b>${bp.s.name}</b> najlepiej pasuje profilem, ale najbliższy termin ma dopiero <b>${formatSlot(bp.availDays).rel}</b>.
          Skoro zależy Ci na czasie, na pierwszym miejscu wskazujemy <b>${rc.s.name}</b> - wolny termin już <b>${formatSlot(rc.availDays).rel}</b>, przy bardzo zbliżonym profilu pomocy.</span>
        </div>`;
    }

    body().className = 'assistant-body fade';
    body().innerHTML = `
      <div class="zai-recommends">
        <span class="zai-avatar sm"><img src="assets/brand/favicon.svg" alt=""></span>
        <div>
          <div class="zai-rec-name">Nasza propozycja</div>
          <div class="zai-rec-sub">Twoje TOP 3 - od czego najlepiej zacząć</div>
        </div>
      </div>
      <div class="q-hint">Na podstawie Twoich odpowiedzi i dostępności terminów. To sugestia, nie diagnoza.</div>
      ${swapBanner}
      ${cards}
      <div class="disclaimer">
        <i class="ti ti-info-circle"></i>
        <span>Dostępność terminów jest w tej wersji zasymulowana (docelowo łączymy się z kalendarzem rejestracji). Ostateczny dobór terminu i specjalisty potwierdzi rejestracja: <b>575&nbsp;805&nbsp;505</b>.</span>
      </div>
      <div class="assistant-actions">
        <button class="link-btn" id="aRestart"><i class="ti ti-refresh"></i> Zacznij od nowa</button>
      </div>`;
    document.getElementById('aRestart').onclick = start;
    body().querySelectorAll('[data-open]').forEach(b => b.onclick = () => openModal(b.dataset.open));
    typoPass(body());
  }

  function renderCrisis(){
    renderProgressDone('Ważne - pomoc jest dostępna teraz');
    body().className = 'assistant-body fade';
    body().innerHTML = `
      <div class="crisis-box">
        <h3><i class="ti ti-heart-handshake"></i> Nie jesteś sam/sama. Pomoc jest teraz dostępna.</h3>
        <p>To, co czujesz, jest ważne. Zanim umówisz wizytę, skontaktuj się natychmiast z bezpłatną, całodobową pomocą:</p>
        <div class="crisis-line"><b>112</b> - numer alarmowy (bezpośrednie zagrożenie życia)</div>
        <div class="crisis-line"><b>116 123</b> - Telefon zaufania dla osób dorosłych w kryzysie (24/7)</div>
        <div class="crisis-line"><b>116 111</b> - Telefon zaufania dla dzieci i młodzieży</div>
        <div class="crisis-line"><b>800 70 2222</b> - Centrum Wsparcia dla osób w kryzysie psychicznym (24/7)</div>
      </div>
      <div class="assistant-actions">
        <button class="link-btn" id="aRestart"><i class="ti ti-arrow-left"></i> Wróć do kreatora</button>
        <a class="btn btn-primary btn-sm" href="#umow"><i class="ti ti-phone"></i> Skontaktuj się z nami</a>
      </div>`;
    document.getElementById('aRestart').onclick = start;
    typoPass(body());
  }

  function quickStart(concernKey, who = 'adults'){
    start();
    answers.who = who;
    answers.concerns = concernKey ? [concernKey] : [];
    buildVisibleFlow();
    stepIdx = visibleFlow.findIndex(f => f.id === (who === 'children' ? 'age' : 'concerns'));
    if(stepIdx < 0) stepIdx = 0;
    render();
    openAssistant();
  }

  return { start, quickStart };
})();

/* ---------- Katalog specjalistów (grupowany, ze zdjęciami) ---------- */
const FILTERS = [
  { k:'all', l:'Wszyscy' },
  { k:'psychiatra', l:'Psychiatrzy' },
  { k:'neurolog', l:'Neurolog' },
  { k:'psycholog', l:'Psycholodzy i terapeuci' },
  { k:'dzieci', l:'Dla dzieci' },
];

function initials(name){ return name.split(' ').slice(0,2).map(w => w[0]).join(''); }

function docCard(s){
  const slot = formatSlot(s.availDays);
  const price = s.priceFrom ? `od ${s.priceFrom} zł` : s.priceLabel;
  return `
  <button class="doc" data-open="${s.id}">
    <div class="doc-photo"><img src="${s.photo}" alt="${s.name}" loading="lazy"></div>
    <div class="doc-body">
      <div class="dn">${s.name}</div>
      <div class="dr">${s.role}</div>
      <div class="doc-meta">
        <span><i class="ti ti-tag"></i> ${price}</span>
        <span><i class="ti ti-calendar-check"></i> ${slot.rel}</span>
      </div>
      <div class="db">${s.motto ? '„' + s.motto.replace(/[.]$/,'') + '"' : s.blurb}</div>
      <div class="badges">
        ${s.treats.includes('children') ? '<span class="tagb">dzieci/młodzież</span>' : ''}
        ${s.treats.includes('adults') ? '<span class="tagb">dorośli</span>' : ''}
        ${s.english ? '<span class="tagb en">po angielsku</span>' : ''}
        ${s.dog ? '<span class="tagb dog">z psem terapeutą</span>' : ''}
      </div>
      <span class="dlink">Poznaj specjalistę <i class="ti ti-arrow-right"></i></span>
    </div>
  </button>`;
}

function renderSpecialists(filterKey){
  const wrap = document.getElementById('teamGroups');
  const groups = (filterKey === 'all')
    ? GROUPS
    : (filterKey === 'dzieci'
        ? [{ key:'__kids', title:'Specjaliści przyjmujący dzieci i młodzież', sub:'', icon:'ti-mood-kid' }]
        : GROUPS.filter(g => g.key === filterKey));

  wrap.innerHTML = groups.map(g => {
    let list;
    if(g.key === '__kids') list = SPECIALISTS.filter(s => s.treats.includes('children'));
    else list = SPECIALISTS.filter(s => s.group === g.key);
    if(!list.length) return '';
    return `
      <div class="team-group">
        <div class="group-head">
          <span class="group-ic"><i class="ti ${g.icon}"></i></span>
          <div>
            <h3 class="group-title">${g.title}</h3>
            ${g.sub ? `<p class="group-sub">${g.sub}</p>` : ''}
          </div>
          <span class="group-count">${list.length}</span>
        </div>
        <div class="team-grid">${list.map(docCard).join('')}</div>
      </div>`;
  }).join('');

  wrap.querySelectorAll('.doc').forEach(b => b.onclick = () => openModal(b.dataset.open));
  typoPass(wrap);
}

function bindFilters(){
  const bar = document.getElementById('teamFilters');
  bar.innerHTML = FILTERS.map((f, i) => `<button class="filter ${i === 0 ? 'on' : ''}" data-k="${f.k}">${f.l}</button>`).join('');
  bar.querySelectorAll('.filter').forEach(b => b.onclick = () => {
    bar.querySelectorAll('.filter').forEach(x => x.classList.remove('on'));
    b.classList.add('on');
    renderSpecialists(b.dataset.k);
  });
}

/* ---------- Modal specjalisty ---------- */
function buildModal(){
  const root = document.createElement('div');
  root.id = 'modalRoot';
  root.innerHTML = `<div class="modal-backdrop"></div><div class="modal-card" role="dialog" aria-modal="true"></div>`;
  document.body.appendChild(root);
  root.querySelector('.modal-backdrop').onclick = closeModal;
  document.addEventListener('keydown', e => { if(e.key === 'Escape') closeModal(); });
}

function openModal(id){
  const s = SPECIALISTS.find(x => x.id === id);
  if(!s) return;
  const card = document.querySelector('#modalRoot .modal-card');
  card.innerHTML = `
    <button class="modal-close" aria-label="Zamknij"><i class="ti ti-x"></i></button>
    <div class="modal-top">
      <div class="modal-photo"><img src="${s.photo}" alt="${s.name}"></div>
      <div class="modal-id">
        <div class="modal-name">${s.name}</div>
        <div class="modal-role">${s.role}</div>
        <div class="badges" style="margin-top:10px">
          ${s.treats.includes('children') ? '<span class="tagb">dzieci/młodzież</span>' : ''}
          ${s.treats.includes('adults') ? '<span class="tagb">dorośli</span>' : ''}
          ${s.english ? '<span class="tagb en">po angielsku</span>' : ''}
          ${s.dog ? '<span class="tagb dog">z psem terapeutą</span>' : ''}
        </div>
      </div>
    </div>
    ${s.motto ? `<blockquote class="modal-motto">„${s.motto.replace(/[.]$/,'')}"</blockquote>` : ''}
    <p class="modal-desc">${s.desc}</p>
    <div class="modal-foot">
      ${s.priceFrom ? `<span class="modal-price"><i class="ti ti-tag"></i> od ${s.priceFrom} zł · ${s.priceLabel}</span>` : `<span class="modal-price"><i class="ti ti-paw"></i> ${s.priceLabel}</span>`}
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <a class="btn btn-ghost btn-sm" href="${s.url}" target="_blank" rel="noopener"><i class="ti ti-external-link"></i> Profil na stronie</a>
        <a class="btn btn-primary btn-sm" href="#umow"><i class="ti ti-calendar-plus"></i> Umów wizytę</a>
      </div>
    </div>`;
  card.querySelector('.modal-close').onclick = closeModal;
  card.querySelectorAll('a[href="#umow"]').forEach(a => a.addEventListener('click', closeModal));
  typoPass(card);
  document.getElementById('modalRoot').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  const r = document.getElementById('modalRoot');
  if(r) r.classList.remove('open');
  document.body.style.overflow = '';
}

/* ---------- Wartości / proces / FAQ / cennik ---------- */
function renderValues(){
  document.getElementById('valuesGrid').innerHTML = VALUES.map(([ic, t, d]) => `
    <div class="value">
      <span class="value-ic"><i class="ti ${ic}"></i></span>
      <h4>${t}</h4><p>${d}</p>
    </div>`).join('');
}

function renderSteps(){
  document.getElementById('stepsGrid').innerHTML = STEPS.map(([ic, t, d], i) => `
    <div class="step">
      <span class="step-num">${i + 1}</span>
      <span class="step-ic"><i class="ti ${ic}"></i></span>
      <h4>${t}</h4><p>${d}</p>
    </div>`).join('');
}

function renderPricing(){
  document.getElementById('priceGrid').innerHTML = PRICING.map(g => `
    <div class="price-card">
      <h4><i class="ti ${g.icon}"></i> ${g.group}</h4>
      ${g.items.map(([n, p]) => `<div class="price-row"><span>${n}</span><span class="tnum">${p}</span></div>`).join('')}
    </div>`).join('');
}

function renderFaq(){
  document.getElementById('faqList').innerHTML = FAQ.map(([q, a]) => `
    <details class="faq-item">
      <summary>${q}<i class="ti ti-chevron-down"></i></summary>
      <div class="faq-a">${a}</div>
    </details>`).join('');
}

/* skrót dla kafelków problemów / hero */
function quick(concern){ Assistant.quickStart(concern); }
function quickChild(){ Assistant.quickStart(null, 'children'); }
function startHeroAssistant(){
  const text = (document.getElementById('heroSymptom')?.value || '').toLowerCase();
  const pairs = [
    [/dziec|nastolat|młodzie|mlodzie|syn|córk|cork/, null, 'children'],
    [/lęk|lek|panik|niepok|napię/, 'anxiety', 'adults'],
    [/sen|bezsen|zasyp/, 'sleep', 'adults'],
    [/uzależ|uzalezn|alkohol|hazard|substanc/, 'addiction', 'adults'],
    [/głow|glow|zawrot|drętw|dretw|neurolog/, 'neuro', 'adults'],
    [/relac|para|partner|związek|zwiazek/, 'relationships', 'adults'],
    [/smut|depres|nastr|energia|przygnęb/, 'depression', 'adults'],
  ];
  const hit = pairs.find(([rx]) => rx.test(text));
  Assistant.quickStart(hit ? hit[1] : null, hit ? hit[2] : 'adults');
}

function bindHeroAssistant(){
  const input = document.getElementById('heroSymptom');
  const count = document.getElementById('heroSymptomCount');
  if(!input || !count) return;
  const update = () => { count.textContent = `${input.value.length}/300`; };
  input.addEventListener('input', update);
  update();
}
