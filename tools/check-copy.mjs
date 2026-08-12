#!/usr/bin/env node
/**
 * Straż kopii — port zasad z vehi.market (`scripts/check-copy-rules.js`
 * + `.agents/product-marketing-context.md`, sekcja „Rejestr: kolokwializmy
 * i skróty myślowe").
 *
 * Zasada nadrzędna stamtąd, obowiązująca w KAŻDYM rejestrze:
 *   „Zero kolokwializmów i zero skrótów myślowych. Ciepło budujemy drugą
 *    osobą, krótkim zdaniem i konkretem. Nigdy potocznością."
 *
 * Powód jest tu jeszcze mocniejszy niż w motoryzacji: to strona kliniki
 * zdrowia psychicznego. Ktoś czyta ją w gorszym dniu, pierwszy raz, i decyduje,
 * czy powierzyć obcym ludziom coś trudnego. Rejestr kumpelski w tym miejscu
 * nie brzmi ciepło, tylko lekko.
 *
 * Strażnik łapie WYŁĄCZNIE listę słów. Druga klasa błędu — skróty myślowe
 * („napiszemy, gdy będzie termin" nie mówi kto, kiedy ani jakim kanałem) —
 * nie da się złapać wyszukiwaniem i zostaje na czytającym.
 *
 * Użycie:  node tools/check-copy.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const FILES = ['index.html', 'data.js', 'assistant.js'];

/* Klasa 1 — kolokwializmy. Lista przeniesiona z vehi i przycięta do tego,
   co ma sens w kontekście kliniki, plus pozycje własne (patrz komentarze). */
const KOLOKWIALIZMY = [
  [/\bCze[śs][ćc][.,!]/, 'Cześć' , 'Dzień dobry'],
  [/\bbez presji\b/i, 'bez presji', 'usunąć albo „w dowolnym momencie"'],
  [/\bza darmo\b|\bgratis\b|\bdarmow[yaeąi]/i, 'za darmo / darmowy', 'bezpłatnie, 0 zł'],
  [/\bdamy zna[ćc]\b|\bdaj zna[ćc]\b/i, 'damy znać', 'poinformujemy Cię'],
  [/\bwpadnie\b|\bwpadn[ąa]\b/i, 'wpadnie', 'pojawi się'],
  [/\bzajrzyj\b/i, 'zajrzyj', 'wróć na tę stronę'],
  [/\bna spokojnie\b/i, 'na spokojnie', 'spokojnie, bez pośpiechu'],
  [/\bprzegapi/i, 'przegapić', 'pominąć'],
  [/\bpod r[ęe]k[ąa]\b/i, 'pod ręką', 'dostępny / w zasięgu'],
  [/\bco[śs] posz[łl]o nie tak\b/i, 'coś poszło nie tak', 'operacja się nie powiodła'],
  [/\bmagiczn/i, 'magiczny', 'konkret'],
  /* własne, spoza listy vehi — wychwycone przy audycie tej strony */
  [/\bpo prostu\b/i, 'po prostu', 'usunąć — nic nie wnosi'],
  [/\bna teraz\b/i, 'na teraz', 'nazwać kryterium wprost'],
];

/* Formy wykluczające część odbiorców. Klinika przyjmuje wszystkich —
   męska forma osobowa w zwrocie do czytelnika jest błędem rejestru. */
const RODZAJ = [
  [/\bdecydujesz sam\b(?!\/)/i, 'decydujesz sam', 'decyzja należy do Ciebie'],
  [/\bjeste[śs] pewien\b(?!\/)/i, 'jesteś pewien', 'masz pewność'],
  [/\bgotowy\b(?!\/)(?=[^<]{0,40}\bjeste[śs])/i, 'gotowy', 'forma neutralna'],
];

/* Typografia: vehi trzyma dywiz „-" i normalizuje —/– w runtime.
   Ta reguła jest w PRODUCT.md wprost: „myślnik »-«". */
const PAUZY = /[—–]/;

function stripComments(src, ext) {
  let s = src.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ' '));
  s = s.replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, ' '));
  if (ext !== '.html') s = s.replace(/(^|[^:])\/\/[^\n]*/g, (m, p) => p + ' '.repeat(m.length - p.length));
  return s;
}

let hits = 0;
const report = [];

for (const rel of FILES) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) continue;
  const ext = path.extname(rel);
  const lines = stripComments(fs.readFileSync(abs, 'utf8'), ext).split('\n');

  lines.forEach((line, i) => {
    const at = `${rel}:${i + 1}`;
    for (const [re, was, use] of [...KOLOKWIALIZMY, ...RODZAJ]) {
      const m = line.match(re);
      if (m) { hits++; report.push({ at, klasa: 'rejestr', znalezione: m[0].trim(), zamiast: use, kontekst: line.trim().slice(0, 92) }); }
    }
    if (PAUZY.test(line) && !/LONG_DASH|półpauz|pauza|myślnik/i.test(line)) {
      hits++; report.push({ at, klasa: 'typografia', znalezione: line.match(PAUZY)[0], zamiast: 'dywiz "-" (vehi: PRODUCT.md)', kontekst: line.trim().slice(0, 92) });
    }
  });
}

if (!report.length) {
  console.log('Straż kopii: czysto.');
} else {
  const byClass = {};
  for (const r of report) (byClass[r.klasa] ||= []).push(r);
  for (const [klasa, rows] of Object.entries(byClass)) {
    console.log(`\n=== ${klasa.toUpperCase()} (${rows.length}) ===`);
    for (const r of rows) {
      console.log(`  ${r.at}`);
      console.log(`    znalezione : ${r.znalezione}`);
      console.log(`    zamiast    : ${r.zamiast}`);
      console.log(`    kontekst   : ${r.kontekst}`);
    }
  }
  console.log(`\nRazem: ${hits}`);
}
process.exit(hits ? 1 : 0);
