/**
 * Wypieka chmurę punktów hero z `tools/brain-source.glb` do `assets/brain-points.bin`.
 *
 * Po co: strona i tak nie używała modelu jako modelu. GLTFLoader parsował
 * 1,45 MB siatki z normalnymi i indeksami tylko po to, żeby kod wziął z niej
 * sam atrybut POSITION i zbudował z niego własną chmurę punktów. Cała ta
 * przeróbka — obcięcie dolnej części, kompresja ku osi, wyśrodkowanie
 * i normalizacja skali — jest deterministyczna, więc robimy ją raz, tutaj,
 * a nie przy każdym otwarciu strony u każdego odwiedzającego.
 *
 * Format wyjściowy (little-endian):
 *   0   4B  magic 'ZKBP'
 *   4   2B  wersja (uint16)
 *   6   4B  liczba punktów (uint32)
 *   10  4B  skala (float32) — pomnóż int16 przez to, żeby dostać jednostki sceny
 *   14  2B  dopełnienie
 *   16  ..  count * 3 * int16
 *
 * Promień chmury jest znormalizowany do 1,0, a środek do (0,0,0), więc runtime
 * nie musi już liczyć bounding sphere.
 *
 * Użycie:  node tools/bake-brain.mjs [liczba-punktów]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'tools', 'brain-source.glb');
const OUT = path.join(ROOT, 'assets', 'brain-points.bin');

const TARGET = Number(process.argv[2] || 20000);

/* Ziarno na stałe — asset ma być odtwarzalny. Bez tego każde przebudowanie
   dawałoby inną chmurę i diff pliku binarnego nic by nie znaczył. */
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function readPositions(file) {
  const b = fs.readFileSync(file);
  if (b.readUInt32LE(0) !== 0x46546c67) throw new Error('to nie jest plik glTF binary');
  const jsonLen = b.readUInt32LE(12);
  const json = JSON.parse(b.slice(20, 20 + jsonLen).toString('utf8'));
  const binOff = 20 + jsonLen;
  const binLen = b.readUInt32LE(binOff);
  const bin = b.slice(binOff + 8, binOff + 8 + binLen);

  const acc = json.accessors[json.meshes[0].primitives[0].attributes.POSITION];
  if (acc.componentType !== 5126 || acc.type !== 'VEC3') throw new Error('POSITION nie jest float VEC3');
  const bv = json.bufferViews[acc.bufferView];
  const base = (bv.byteOffset || 0) + (acc.byteOffset || 0);
  const stride = bv.byteStride || 12;

  const out = new Float32Array(acc.count * 3);
  for (let i = 0; i < acc.count; i++) {
    const o = base + i * stride;
    out[i * 3] = bin.readFloatLE(o);
    out[i * 3 + 1] = bin.readFloatLE(o + 4);
    out[i * 3 + 2] = bin.readFloatLE(o + 8);
  }
  return out;
}

/* Ta sama przeróbka, którą wcześniej robił runtime: dolna część mózgu jest
   ściągana ku osi i spłaszczana, żeby pień nie dominował sylwetki. */
function sculpt(src, rnd) {
  let minY = Infinity, maxY = -Infinity, minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
  for (let i = 0; i < src.length; i += 3) {
    if (src[i] < minX) minX = src[i]; if (src[i] > maxX) maxX = src[i];
    if (src[i + 1] < minY) minY = src[i + 1]; if (src[i + 1] > maxY) maxY = src[i + 1];
    if (src[i + 2] < minZ) minZ = src[i + 2]; if (src[i + 2] > maxZ) maxZ = src[i + 2];
  }
  const cut = minY + (maxY - minY) * 0.27;
  const cx = (minX + maxX) / 2, cz = (minZ + maxZ) / 2, sB = 0.5;
  const out = [];
  for (let i = 0; i < src.length; i += 3) {
    const x = src[i], y = src[i + 1], z = src[i + 2];
    if (y >= cut) out.push(x, y, z);
    else if (rnd() < sB * sB) out.push(cx + (x - cx) * sB, cut - (cut - y) * 0.55, cz + (z - cz) * sB);
  }
  return out;
}

/* Losowy podzbiór zachowuje rozkład gęstości oryginału — a ten był już
   równomierny, bo pochodzi z siatki. */
function decimate(flat, target, rnd) {
  const n = flat.length / 3;
  if (n <= target) return flat;
  const idx = new Uint32Array(n);
  for (let i = 0; i < n; i++) idx[i] = i;
  for (let i = n - 1; i > 0; i--) {           // Fisher-Yates
    const j = Math.floor(rnd() * (i + 1));
    const t = idx[i]; idx[i] = idx[j]; idx[j] = t;
  }
  const out = new Array(target * 3);
  for (let k = 0; k < target; k++) {
    const s = idx[k] * 3;
    out[k * 3] = flat[s]; out[k * 3 + 1] = flat[s + 1]; out[k * 3 + 2] = flat[s + 2];
  }
  return out;
}

/* Środek i promień liczone dokładnie tak, jak robi to THREE.computeBoundingSphere:
   środek bryły brzegowej (nie środek masy) i największy dystans od niego.
   Środek masy dałby mniejszy promień, a po znormalizowaniu do 1,0 chmura
   wyszłaby o kilka procent za duża względem wersji sprzed przebudowy. */
function normalize(flat) {
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity, minZ = Infinity, maxZ = -Infinity;
  for (let i = 0; i < flat.length; i += 3) {
    if (flat[i] < minX) minX = flat[i]; if (flat[i] > maxX) maxX = flat[i];
    if (flat[i + 1] < minY) minY = flat[i + 1]; if (flat[i + 1] > maxY) maxY = flat[i + 1];
    if (flat[i + 2] < minZ) minZ = flat[i + 2]; if (flat[i + 2] > maxZ) maxZ = flat[i + 2];
  }
  const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2, cz = (minZ + maxZ) / 2;
  let r = 0;
  for (let i = 0; i < flat.length; i += 3) {
    const dx = flat[i] - cx, dy = flat[i + 1] - cy, dz = flat[i + 2] - cz;
    const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
    if (d > r) r = d;
  }
  const out = new Float32Array(flat.length);
  for (let i = 0; i < flat.length; i += 3) {
    out[i] = (flat[i] - cx) / r;
    out[i + 1] = (flat[i + 1] - cy) / r;
    out[i + 2] = (flat[i + 2] - cz) / r;
  }
  return out;                                  // promień = 1, środek = origin
}

const rnd = mulberry32(0x5A4B41);              // „ZKA"
const raw = readPositions(SRC);
const sculpted = sculpt(raw, rnd);
const kept = decimate(sculpted, TARGET, rnd);
const norm = normalize(kept);
const count = norm.length / 3;

/* Promień to 1,0, więc ±1 z zapasem mieści się w int16 przy skali 1/32000.
   Krok kwantyzacji ≈ 3·10⁻⁵ jednostki sceny, przy rozmiarze punktu 0,0115 —
   czyli 370× drobniej niż sam punkt. Niewidoczne. */
const SCALE = 1 / 32000;
const data = new Int16Array(count * 3);
let clipped = 0;
for (let i = 0; i < norm.length; i++) {
  let v = Math.round(norm[i] / SCALE);
  if (v > 32767) { v = 32767; clipped++; }
  if (v < -32768) { v = -32768; clipped++; }
  data[i] = v;
}

const header = Buffer.alloc(16);
header.write('ZKBP', 0, 'ascii');
header.writeUInt16LE(1, 4);
header.writeUInt32LE(count, 6);
header.writeFloatLE(SCALE, 10);
fs.writeFileSync(OUT, Buffer.concat([header, Buffer.from(data.buffer)]));

const srcKB = (fs.statSync(SRC).size / 1024).toFixed(0);
const outKB = (fs.statSync(OUT).size / 1024).toFixed(0);
console.log(`wierzchołki w GLB   : ${raw.length / 3}`);
console.log(`po rzeźbieniu       : ${sculpted.length / 3}`);
console.log(`po decymacji        : ${count}`);
console.log(`przycięte przy kwant: ${clipped}`);
console.log(`${srcKB} kB  →  ${outKB} kB  (${(srcKB / outKB).toFixed(1)}× mniej)`);
