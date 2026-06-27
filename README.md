# Centrum Zakątek — nowa strona (prototyp)

Statyczny prototyp nowej strony Centrum Zakątek z anonimowym, kafelkowym
asystentem doboru specjalisty (mock, bez backendu AI).

## Uruchomienie lokalne

W katalogu `centrum-zakatek-nowa/`:

```bash
python3 -m http.server 8000
```

Następnie otwórz: http://localhost:8000

(Nie wymaga instalacji żadnych zależności. Działa też offline — fonty i ikony
ładują się z CDN, ale strona działa również bez nich, z fontami systemowymi.)

## Pliki

| Plik | Rola |
|------|------|
| `index.html` | struktura strony (hero, asystent, zespół, cennik, kontakt) |
| `styles.css` | styl (paleta szałwiowa, responsywność, dark-ready) |
| `data.js` | baza 27 realnych specjalistów + cennik (z centrumzakatek.pl) |
| `assistant.js` | przepływ 6–8 pytań + silnik scoringu → TOP 3 |
| `app.js` | renderowanie UI: kreator, katalog, cennik, filtry |

## Asystent — jak działa

1. 6–8 pytań kafelkowych (gałąź dla dzieci ma dodatkowe pytanie o wiek).
2. Każda odpowiedź dodaje wagi do tagów specjalistów.
3. Na końcu: **TOP 3** realnych specjalistów z uzasadnieniem, ceną i CTA.
4. Wykrycie myśli samobójczych → natychmiast ekran z numerami pomocy
   (112, 116 123, 116 111, 800 70 2222) — z pominięciem rezerwacji.

To wersja mock (reguły w JS). Docelowo rozmowę prowadzi model AI (Claude)
z tym samym protokołem kryzysowym; zob. propozycja wariantu hybrydowego.
