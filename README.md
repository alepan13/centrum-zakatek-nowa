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

Nie wymaga instalacji zależności i **nie pobiera niczego z obcych serwerów** —
ani fontu, ani biblioteki 3D, ani analityki. Wszystko leży w repo.

> [!note] Font jest hostowany lokalnie i to jest decyzja, nie optymalizacja
> Strona obiecuje „przeglądasz anonimowo" i ochronę danych, więc IP odwiedzającego
> nie może trafiać do Google przy samym otwarciu. W repo są cztery podzbiory
> zmiennego Montserrata 400–700 (latin i latin-ext, prosty i kursywa) — polskie
> znaki diakrytyczne siedzą w latin-ext. Zmiana zestawu wag = ponowne pobranie
> plików z `fonts.gstatic.com` i podmiana `@font-face` w `index.html`.

> [!note] Scena 3D jest tylko na szerokich ekranach
> Poniżej 761 px (oraz przy włączonym `saveData`) chmura punktów w ogóle się nie
> pobiera: lądowała pod akapitami i była nieczytelna. To nie jest awaria — hero
> działa tam bez niej.

## Chmura punktów w hero

Nie ma tu three.js ani modelu glTF. Scena to jedna chmura bez świateł, tekstur
i cieni, więc renderuje ją **własny WebGL w `index.html`** (~2 kB) zamiast
biblioteki ważącej 145 kB gzip.

Geometria mieszka w `assets/brain-points.bin` — 39 714 punktów jako `int16`,
233 kB. Plik powstaje z `tools/brain-source.glb` (nie jest serwowany) przez:

```bash
node tools/bake-brain.mjs
```

Skrypt robi offline całą przeróbkę, którą wcześniej wykonywała przeglądarka przy
każdym otwarciu strony: obcięcie dolnej części, ściśnięcie ku osi, wyśrodkowanie
i normalizację promienia do 1,0. Ziarno losowania jest stałe, więc plik jest
odtwarzalny i jego diff coś znaczy.

> [!important] Rozwianie liczy shader, nie procesor
> Pozycja bazowa i docelowa jadą na GPU raz, a każda klatka przewijania zmienia
> jedną liczbę (`uMix`). Wcześniej ta sama animacja przepisywała ~120 tys.
> floatów i wysyłała 480 kB bufora **w każdej klatce**.

## Pliki

| Plik | Rola |
|------|------|
| `index.html` | **całość warstwy prezentacji** — struktura, style (inline `<style>`), logika UI i renderer WebGL (inline `<script>`) |
| `data.js` | baza 27 realnych specjalistów, cennik i dostępność (z centrumzakatek.pl) |
| `assistant.js` | definicja przepływu pytań + silnik scoringu → TOP 3 |
| `assets/brand/` | logo, favicon i `og-image.jpg` (1200×630) — źródło prawdy identyfikacji |
| `assets/fonts/` | Montserrat 400–700 (zmienny, latin + latin-ext, prosty + kursywa) |
| `assets/team/` | portrety specjalistów (WebP) |
| `assets/brain-points.bin` | chmura punktów hero (39 714 × int16) — wypiekana, nie edytowana ręcznie |
| `tools/` | `bake-brain.mjs` + `brain-source.glb` — nie trafiają na produkcję |

> [!note] Prototyp jest jednoplikowy z rozmysłem
> Style i logika renderowania mieszkają **w `index.html`**, nie w osobnych
> plikach. Wcześniejsze `styles.css`, `app.js` i `enhance.js` opisywały starszą,
> nieaktualną wersję strony (ciepły papier + Fraunces zamiast bieli i szałwii),
> nie były już przez nic ładowane i zostały usunięte — są w historii gita,
> gdyby kiedyś były potrzebne.

## Identyfikacja wizualna

Paleta marki: **ciepły papier + szałwiowa zieleń + czerń**. Tokeny w `:root`
(`index.html`): `--accent:#557253`, `--ink:#1a1f1b`, `--bg:#f7f5ef`,
`--card:#fffefb`. Typografia: **Montserrat** we wszystkich rolach —
`--display`, `--body` i `--label` wskazują na ten sam krój, bo marka ma
jeden; role zostają, bo niosą intencję.

**Zasada rozmieszczenia koloru:** szałwia pracuje tam, gdzie coś się robi
albo zaznacza — przycisk, podkreślenie, zaznaczenie tekstu, kafel ikony
kategorii. Nie niesie tła sekcji, numerów sekcji ani poświat; sekcje
różnicuje krok jasności (`--panel-step`), atmosferę robi jedna neutralna
winieta (`--vignette`). Akcent ma być rzadki i przez to mocny — tło jest
najgorszym miejscem na jego wydanie.

Kolory tekstu drugoplanowego (`--soft`, `--muted`) i linii kryzysowej
(`--clay`) są dobrane pod próg WCAG AA 4,5:1 na `--bg`. Ciepły papier jest
ciemniejszy od dawnej bieli, więc sam akcent też musiał zejść o krok
(`#5b795a` dawał na nim 4,45:1, a bywa tekstem — ceny, role, motto).
Przy zmianie któregokolwiek sprawdź kontrast, zanim trafi na produkcję.

## Ruch — reguły, nie widzimisię

Warstwa ruchu jest prowadzona według `apple-design`. Cztery zasady, które
trzeba znać, zanim się tu cokolwiek ruszy:

1. **Sprzężenie zwrotne należy do wciśnięcia, nie do puszczenia.** Każdy
   element klikalny ma `:active` ze skalą — na dotyku to jedyna informacja,
   że kliknięcie doszło.
2. **Wejścia to `transition`, nie `@keyframes`.** Transition interpoluje od
   wartości, która jest w tej chwili na ekranie, więc scena złapana w pół
   drogi kontynuuje zamiast przeskakiwać. Animacja o stałym czasie tego nie
   umie i dlatego nie ma jej już w wejściach sekcji.
3. **Sprężyny opisujemy tłumieniem i czasem odpowiedzi**, nie parą liczb:
   `t = ω₀²`, `f = 2ζω₀`, `ω₀ = 2π/response`. Domyślnie `ζ = 1,0` (bez
   odbicia). Odbicie tylko wtedy, gdy poprzedził je gest niosący pęd — w
   smudze portretów bierze się ono z prędkości kursora, nie z konfiguracji.
4. **Nic nie oscyluje bez końca w okolicy 0,2 Hz.** Ikony specjalizacji
   kołyszą się dwa cykle i siadają; mózg przestaje się obracać, gdy jest już
   rozwiany. Wyjątki: kropki statusu (2,2 s = 0,45 Hz), kursor w dymku
   i pierścień przy awatarze asystenta — jedyny element, którego zadaniem
   jest przyciągać wzrok.

> [!note] Dlaczego rozwijanie zespołu nie animuje wysokości
> Rozwinięcie to kilka tysięcy pikseli. Animowanie wysokości przeliczałoby
> układ całej siatki 27 kart w każdej klatce. Ruch niosą `transform`
> i `opacity` — jedyne rzeczy, które kompozytor rysuje za darmo.

## Motywy

Strona ma tryb jasny i ciemny (`prefers-color-scheme`). **Cała zmiana idzie
przez tokeny** — ani jeden selektor komponentu nie jest zdublowany. Blok ciemny
stoi na końcu arkusza, bo media query nie podnosi specyficzności: gdyby stał
wyżej, nadpisania komponentów przegrywałyby kolejnością.

Akcent na ciemnym musi być jaśniejszy — szałwia `#557253` na ciemnym tle daje
2,6:1, więc tam pracuje `#93b28f`. Noc jest **ciepłym brązem palonej kawy**
(`--bg:#1d1711`, karta `#272018`), a nie zielenią-czernią: skoro dzień stoi na
ciepłym papierze, ta sama kartka wieczorem nie może ostygnąć. Ziemia siedzi
w powierzchniach, nie w akcencie — szałwia zostaje szałwią w obu motywach.
Głębiej w brąz da się pójść, ale każdy krok rozjaśnia ekran czytany wieczorem
i podnosi wymagania wobec `--muted` (od ok. `#251b12` trzeba go rozjaśnić,
inaczej na karcie spada poniżej 4,5:1).

Logo ma osobny plik (`logo-mark-dark.webp`). Oba warianty są w kodzie i
przełącza je CSS po `data-theme` — `<picture>` odpadł, bo umie czytać tylko
media query, więc ignorował ręczny wybór motywu. Filtr `invert()` przekręcał
barwę na fioletową i nie wchodzi w grę.

> [!warning] Paleta alarmowa nie podlega motywom
> Tokeny `--alert-*` opisują ekran kryzysowy i mają **własny** wariant ciemny,
> a nie odziedziczony po reszcie. Ten ekran ma wyglądać inaczej niż cała strona
> i to jest jego zadanie. Przy zmianie motywu sprawdź kontrast numerów pomocy
> osobno — dziś jest 10,6:1 w ciemnym i 9,4:1 w jasnym.

## Rejestr — zasady przeniesione z vehi.market

Źródło: `vehi-market/PRODUCT.md` (sekcja „Brand Commitments") oraz
`.agents/product-marketing-context.md` (sekcja „Rejestr: kolokwializmy
i skróty myślowe"). Egzekwuje je tutaj:

```bash
node tools/check-copy.mjs
```

**Zasada twarda, bez wyjątków, w każdym miejscu tekstu:** zero kolokwializmów
i zero skrótów myślowych. Ciepło budujemy drugą osobą, krótkim zdaniem
i konkretem — nigdy potocznością.

Powód jest tu mocniejszy niż w motoryzacji, z której zasada pochodzi. To strona
kliniki zdrowia psychicznego: ktoś czyta ją w gorszym dniu, pierwszy raz,
i decyduje, czy powierzyć obcym ludziom coś trudnego. Rejestr kumpelski w tym
miejscu nie brzmi ciepło, tylko lekko.

**Test vehi:** czy powiedziałbym tego zdania klientowi, którego widzę pierwszy
raz? Jeśli brzmi jak SMS do kolegi — do zmiany.

| Zamiast | Piszemy |
|---|---|
| Cześć | Dzień dobry |
| bez presji | usunąć albo „w dowolnym momencie" |
| za darmo, gratis | bezpłatnie, 0 zł |
| damy znać | poinformujemy Cię |
| po prostu zadzwoń | zadzwoń |
| polecamy na teraz | nazwać kryterium wprost |
| decydujesz sam | decyzja należy do Ciebie |

Ostatni wiersz to dodatek własny: klinika przyjmuje wszystkich, więc męska forma
osobowa w zwrocie do czytelnika jest błędem rejestru, nie stylistyki.

**Druga klasa błędu — skróty myślowe — nie da się złapać wyszukiwaniem.**
Zdanie prawdziwe dla autora, ale wymagające od czytelnika dopowiedzenia
brakującego ogniwa („napiszemy, gdy będzie termin" — kto, kiedy, jakim
kanałem?). Test: przeczytaj jako ktoś, kto wszedł tu pierwszy raz w życiu.

### Typografia — `pl()` to port 1:1 z `vehi-market/src/lib/typo.ts`

Siedem reguł, wszystkie z tamtego pliku, plus dwa rozszerzenia opisane niżej:

1. Długie myślniki (em/en) → zwykły **dywiz „-"**. Bez wyjątków, także w zakresach.
2. Myślnik klauzulowy wiąże się z **poprzednim** słowem, żeby został na końcu
   wiersza i nigdy go nie zaczynał (PWN za Wolańskim, „Edycja tekstów", s. 536).
3. Pierwsze słowo nowego zdania kleimy z kolejnym.
4. Sieroty — wyrazy funkcyjne kleimy z następnym słowem.
5. Liczba + jednostka („380 zł", „40 min") — nie rozdzielamy.
6. Separator tysięcy i numery telefonu („575 805 505") — nie łamiemy.
7. Skróty („ok.", „m.in.", „ul.") — kleimy z następnym słowem.

**Dwa rozszerzenia względem vehi**, oba wymuszone pomiarem na tej stronie:

- vehi wiąże wyłącznie **jednoliterowce** (a, i, o, u, w, z) — to minimum PWN.
  Pomiar pokazał, że wiersze kończą tu głównie **dwu- i trzyliterowe przyimki**
  („dla", „bez", „lub", „od", „po"), więc lista jest szersza. Zamknięta
  i ograniczona do wyrazów funkcyjnych: wiązanie wszystkiego krótkiego psuje
  chorągiewkę zamiast ją poprawiać.
- **„się" wiążemy wstecz**, do czasownika, który stoi przed nim.
- Osobny wariant reguły 2 dla tekstu przeciętego znacznikiem
  (`<b>Bez skierowania</b> - dalej` trafia do `pl()` jako dwa węzły, więc słowa
  przed myślnikiem po prostu nie ma w tym samym łańcuchu).

> [!note] Wdowy to zadanie łamacza, nie twardej spacji
> Pojedyncze słowo w ostatnim wierszu akapitu obsługuje `text-wrap: pretty`
> na prozie i `text-wrap: balance` na nagłówkach — dokładnie jak w vehi.
> Twardą spacją się tego nie robi; w wąskich kolumnach kart rozpycha kolumnę.

## Typografia polska

Funkcja `pl()` w `index.html` przepuszcza wszystkie węzły tekstowe przez
zestaw reguł: myślnik zdaniowy to **półpauza** z twardą spacją przed nią
(nie zaczyna wiersza), zakresy liczbowe łączy półpauza bez spacji
(`190–200 zł`), a jednoliterowe wyrazy i inicjały zdań dostają twardą
spację. W źródle pisz zwykłe dywizy — `pl()` zamieni je sama.

> [!warning] `text-wrap: balance` kontra twarda spacja
> Twarda spacja przed półpauzą skleja `słowo –` w jeden nierozdzielny token.
> `balance` potrafi wtedy wypchnąć go w krótki wiersz na środku nagłówka.
> Tam, gdzie to widać (`.h1-beat`), stoi `text-wrap: pretty`.

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
