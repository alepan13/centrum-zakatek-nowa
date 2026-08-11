# Centrum Zakątek — nowa strona (prototyp)

Statyczny, jednoplikowy prototyp nowej strony Centrum Zakątek z anonimowym,
kafelkowym asystentem doboru specjalisty (mock, bez backendu AI).

Klinika: psychiatria, psychoterapia, psychologia, neurologia i seksuologia
dla dzieci i dorosłych, Toruń.

## Uruchomienie lokalne

Z katalogu projektu:

```bash
python3 -m http.server 8000
```

Następnie otwórz: http://localhost:8000

Nie wymaga instalacji zależności. Font (Montserrat) i three.js ładują się z CDN
— bez sieci strona nadal działa, z fontem systemowym i bez sceny 3D.

## Pliki

| Plik | Rola |
|------|------|
| `index.html` | **całość warstwy prezentacji** — struktura, style (inline `<style>`), logika UI i scena 3D (inline `<script>`) |
| `data.js` | baza 27 realnych specjalistów, cennik i dostępność (z centrumzakatek.pl) |
| `assistant.js` | definicja przepływu pytań + silnik scoringu → TOP 3 |
| `assets/brand/` | logo i favicon — źródło prawdy identyfikacji |
| `assets/team/` | portrety specjalistów (WebP) |
| `assets/brain.glb` | model 3D mózgu, tło hero |

> [!note] Prototyp jest jednoplikowy z rozmysłem
> Style i logika renderowania mieszkają **w `index.html`**, nie w osobnych
> plikach. Wcześniejsze `styles.css`, `app.js` i `enhance.js` opisywały starszą,
> nieaktualną wersję strony (ciepły papier + Fraunces zamiast bieli i szałwii),
> nie były już przez nic ładowane i zostały usunięte — są w historii gita,
> gdyby kiedyś były potrzebne.

## Identyfikacja wizualna

Paleta marki: **biel + szałwiowa zieleń + czerń**. Tokeny w `:root`
(`index.html`): `--accent:#5b795a`, `--sage:#85997e`, `--cream:#1c211d`,
`--bg:#fbfcfa`. Typografia: **Montserrat** we wszystkich rolach.

## Asystent — jak działa

1. 6–8 pytań kafelkowych (gałąź dla dzieci ma dodatkowe pytanie o wiek).
2. Każda odpowiedź dodaje wagi do tagów specjalistów.
3. Na końcu: **TOP 3** realnych specjalistów z uzasadnieniem, ceną i CTA.
4. Wykrycie myśli samobójczych → natychmiast ekran z numerami pomocy
   (112, 116 123, 116 111, 800 70 2222) — z pominięciem rezerwacji.

To wersja mock (reguły w JS). Docelowo rozmowę prowadzi model AI (Claude)
z tym samym protokołem kryzysowym; zob. propozycja wariantu hybrydowego.

## Status

Prototyp. Nie jest wdrożony — `centrumzakatek.pl` nadal serwuje starą stronę.
`sitemap.xml` zawiera jeden URL i wymaga rozbudowy po wdrożeniu architektury
podstron.
