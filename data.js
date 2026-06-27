/* ------------------------------------------------------------------
   Centrum Zakątek — baza specjalistów i usług
   Zdjęcia, opisy i motta zaciągnięte z profili na centrumzakatek.pl
   (assets/team/<slug>.jpeg). Tagi uproszczone na potrzeby kreatora.
   group: psychiatra | neurolog | psycholog | dzieci | walter
-------------------------------------------------------------------*/

const SPECIALISTS = [
  {
    id:'pysklo', name:'Marek Pyskło', role:'Lekarz psychiatra', group:'psychiatra',
    photo:'assets/team/marek-pysklo.webp', treats:['adults'], gender:'m', english:true, dog:false,
    url:'https://centrumzakatek.pl/marek-pysklo', priceFrom:380, priceLabel:'wizyta diagnostyczna 40 min',
    tags:['depression','adhd','psychotic','cognitive','dementia','addiction','anxiety','sleep','personality'],
    blurb:'Psychiatra: podejście systemowe, holistyczne i poznawczo-behawioralne. Konsultacje także po angielsku.',
    motto:null,
    desc:`Marek Pyskło ukończył Akademię Medyczną w Bydgoszczy, a staże specjalizacyjne odbył w Bydgoszczy oraz Lublinie. Doświadczenie zdobywał w ramach pracy szpitalnej i poradnianej między innymi w Świeciu, Brodnicy jak i w ramach pracy na Bermudach. Najbliższe w terapii jest mu podejście systemowe, holistyczne oraz poznawczo-behawioralne i udziela pomocy osobom cierpiącym z powodu zaburzeń lękowych, nastroju, psychotycznych, otępiennych oraz uzależnieniach. Udziela konsultacji również w języku angielskim.`
  },
  {
    id:'sadowski', name:'Sławomir Sadowski', role:'Lekarz psychiatra', group:'psychiatra',
    photo:'assets/team/slawomir-sadowski.webp', treats:['adults'], gender:'m', english:false, dog:false,
    url:'https://centrumzakatek.pl/slawomir-sadowski', priceFrom:380, priceLabel:'wizyta diagnostyczna 40 min',
    tags:['depression','anxiety','addiction','psychotic','dementia','cognitive','sleep'],
    blurb:'Psychiatra: zaburzenia afektywne, lękowe, uzależnienia, zaburzenia psychotyczne i otępienne.',
    motto:null,
    desc:`Jestem absolwentem kierunku lekarskiego Collegium Medicum UMK w Bydgoszczy, a szkolenie specjalizacyjne w zakresie psychiatrii ukończyłem w Klinice Psychiatrii Szpitala Uniwersyteckiego nr 1 im. dra A. Jurasza w Bydgoszczy. W trakcie swojej drogi zawodowej uzyskałem szerokie doświadczenie pracując z pacjentami w Poradni i Oddziale Psychogeriatrycznym w Domu Sue Ryder w Bydgoszczy, Poradniach Zdrowia Psychicznego w Radziejowie i Lipnie, Poradniach Leczenia Uzależnień w Toruniu i Radziejowie. W latach 2019-2022 kierowałem również Oddziałem Psychiatrycznym Szpitala w Lipnie. W Centrum Zakątek opiekuję się pacjentami z zaburzeniami afektywnymi, lękowymi, związanymi z uzależnieniem, psychotycznymi, zespołami otępiennymi i zaburzeniami funkcji poznawczych.`
  },
  {
    id:'kosowski', name:'Grzegorz Kosowski', role:'Lekarz psychiatra', group:'psychiatra',
    photo:'assets/team/grzegorz-kosowski.webp', treats:['adults','children'], gender:'m', english:false, dog:false,
    url:'https://centrumzakatek.pl/grzegorz-kosowski', priceFrom:380, priceLabel:'wizyta diagnostyczna 40 min',
    tags:['depression','psychotic','cognitive','addiction','anxiety','sleep','personality'],
    blurb:'Psychiatra (specjalizacja 2021): depresja, psychozy, uzależnienia, zaburzenia snu i funkcji poznawczych.',
    motto:`Centrum Zakątek to spełnienie zawodowych marzeń, by stworzyć miejsce wyznaczające standardy w opiece nad zdrowiem psychicznym.`,
    desc:`Ludzka psychika zawsze wzbudzała we mnie duże uczucie zaciekawienia, sprawiała, że bardzo chciałem zgłębić mechanizmy stojące za tym jak odczuwamy różne emocje i dlaczego podejmujemy takie a nie inne decyzje. Studia ukończyłem na Collegium Medicum w Bydgoszczy (UMK) w 2014 roku, a ponad rok później rozpocząłem szkolenie specjalizacyjne w Klinice Psychiatrii Szpitala Uniwersyteckiego nr 1 im. A. Jurasza w Bydgoszczy. Odbyłem staże na różnych oddziałach, pracowałem w Poradni Zdrowia Psychicznego współpracując zarówno z dorosłymi, jak i dziećmi, udzielałem się również w Zespole Leczenia Środowiskowego. W 2021 roku ukończyłem szkolenie specjalizacyjne oraz zdałem Państwowy Egzamin Specjalizacyjny. Centrum Zakątek jest zwieńczeniem tej kilkunastoletniej drogi i spełnieniem zawodowych marzeń.`
  },
  {
    id:'muliarchuk', name:'Oksana Muliarchuk', role:'Lekarz psychiatra · Psychoterapeuta', group:'psychiatra',
    photo:'assets/team/oksana-muliarchuk.webp', treats:['adults'], gender:'k', english:false, dog:false,
    url:'https://centrumzakatek.pl/oksana-muliarchuk', priceFrom:380, priceLabel:'wizyta diagnostyczna 40 min',
    tags:['depression','anxiety','stress','addiction','psychotherapy'],
    blurb:'Psychiatra i psychoterapeutka: leczenie połączone z podejściem psychodynamicznym (praca obrazem).',
    motto:`Każdy człowiek ma potencjał, żeby poradzić sobie w życiu.`,
    desc:`Jestem lekarzem psychiatrą i psychoterapeutą pochodzącym z Ukrainy. W 2020 roku ukończyłam Narodowy Uniwersytet Medyczny w Winnicy, po czym podjęłam szkolenie specjalizacyjne z psychiatrii, które zakończyłam w styczniu 2022 roku. By rozwinąć swoje zdolności, podjęłam również szkolenie z terapii uzależnień oraz psychoterapii w nurcie katatymno-imaginatywnym. W pracy z pacjentami wykorzystuję podejście psychodynamiczne; metody psychoterapii katatymno-imaginatywnej bywają określane jako „psychoanaliza z pomocą obrazów". Wykorzystując wyobraźnię w stanie zrelaksowania, możemy dotrzeć do głębokich zakątków podświadomości, co pozwala na poznanie i akceptację siebie oraz zmianę niekorzystnych wzorców. Bardzo ważnym elementem mojej pracy jest kliniczne doświadczenie w psychiatrii, co pomaga w psychoedukacji i całościowym spojrzeniu na problemy psychiczne.`
  },
  {
    id:'legowicz', name:'Beata Łęgowicz', role:'Psychiatra dzieci i młodzieży', group:'psychiatra',
    photo:'assets/team/beata-legowicz.webp', treats:['children'], gender:'k', english:false, dog:false,
    url:'https://centrumzakatek.pl/beata-legowicz', priceFrom:450, priceLabel:'wizyta diagnostyczna 60 min',
    tags:['anxiety','asd','adhd','depression','children'],
    blurb:'Psychiatra dzieci i młodzieży: zaburzenia lękowe, całościowe zaburzenia rozwoju i ADHD.',
    motto:`Bardzo ważny jest dla mnie kontakt z młodym pacjentem - często jest podstawą trafnej diagnozy.`,
    desc:`Jestem lekarzem psychiatrą dzieci i młodzieży. Ukończyłam Wydział Lekarski Collegium Medicum w Bydgoszczy (UMK), a następnie szkolenie specjalizacyjne w Szpitalu Uniwersyteckim nr 1 im. dra A. Jurasza w Bydgoszczy, pracując na Oddziale Psychiatrycznym Stacjonarnym oraz Dziennym dla Dzieci i Młodzieży, Oddziale dla Dorosłych oraz Oddziale Zaburzeń Lękowych i Afektywnych. Prowadzę diagnostykę oraz farmakoterapię zaburzeń i chorób psychicznych u dzieci i młodzieży. Zakresem moich zainteresowań są przede wszystkim zaburzenia lękowe, całościowe zaburzenia rozwoju oraz zespoły nadpobudliwości psychoruchowej (ADHD). Do każdego pacjenta podchodzę indywidualnie, mając na uwadze jego dobro i bezpieczeństwo terapii.`
  },

  {
    id:'mietek', name:'Anna Miętek-Baranowska', role:'Lekarz neurolog', group:'neurolog',
    photo:'assets/team/anna-mietek-baranowska.webp', treats:['adults'], gender:'k', english:false, dog:false,
    url:'https://centrumzakatek.pl/anna-mietek-baranowska', priceFrom:250, priceLabel:'wizyta neurologiczna 30 min',
    tags:['neurology'],
    blurb:'Neurolog: bóle i zawroty głowy, zaburzenia równowagi, zespoły bólowe kręgosłupa, choroby otępienne.',
    motto:null,
    desc:`Anna Miętek-Baranowska jest absolwentką Warszawskiego Uniwersytetu Medycznego, gdzie w 2011 roku ukończyła kierunek lekarski. Szkolenie specjalizacyjne w dziedzinie neurologii odbywała w Oddziale Neurologii i Leczenia Udarów Mózgu Wojewódzkiego Szpitala Zespolonego w Toruniu, gdzie do dziś pracuje. Zajmuje się diagnostyką oraz leczeniem chorób i zaburzeń ośrodkowego i obwodowego układu nerwowego, w tym nawracającego bólu głowy, zawrotów głowy, zaburzeń równowagi, zespołów bólowych kręgosłupa, zespołów pozapiramidowych (np. choroby Parkinsona) oraz otępiennych. W swojej pracy stawia przede wszystkim na profesjonalizm oraz indywidualne i życzliwe podejście do każdego pacjenta.`
  },

  {
    id:'kosowska', name:'Marta Kosowska', role:'Psycholog · Seksuolog · Psychoterapeuta CBT', group:'psycholog',
    photo:'assets/team/marta-kosowska.webp', treats:['adults','children','couples'], gender:'k', english:false, dog:false,
    url:'https://centrumzakatek.pl/marta-kosowska', priceFrom:200, priceLabel:'konsultacja psychologiczna',
    tags:['sexology','depression','anxiety','personality','lgbt','psychotherapy','diagnosis'],
    blurb:'Psycholożka, seksuolożka i certyfikowana psychoterapeutka CBT; terapia schematu, ACT, mindfulness.',
    motto:null,
    desc:`Jestem psycholożką, seksuolożką oraz certyfikowaną psychoterapeutką poznawczo-behawioralną (certyfikat nr 2501 PTTPB). W pracy terapeutycznej szczególnie istotna jest dla mnie relacja, którą wspólnie zbudujemy, oraz elastyczne podejście do problemów. Lubię działać nieschematycznie i używać technik różnych nurtów, by jak najdokładniej dopasować je do konkretnej osoby. Czerpię inspiracje m.in. z terapii poznawczo-behawioralnej i jej „trzeciej fali" - terapii schematu, terapii opartej na akceptacji i zaangażowaniu oraz uważności. Nieustannie poszerzam wiedzę i pracuję pod stałą superwizją u akredytowanego psychoterapeuty PTS. Z wykształcenia jestem także diagnostką laboratoryjną, co pomaga mi zagłębić się w kliniczne aspekty problemów.`
  },
  {
    id:'klobukowska', name:'Amelia Kłobukowska', role:'Psycholog · Seksuolog kliniczny', group:'psycholog',
    photo:'assets/team/amelia-klobukowska.webp', treats:['adults','couples'], gender:'k', english:false, dog:false,
    url:'https://centrumzakatek.pl/amelia-klobukowska', priceFrom:200, priceLabel:'konsultacja psychologiczna',
    tags:['depression','anxiety','panic','self_worth','relationships','crisis','stress','sexology','lgbt','adhd','asd','diagnosis'],
    blurb:'Psycholożka kliniczna i seksuolożka: depresja, lęk i napady paniki, kryzysy życiowe, edukacja seksualna.',
    motto:null,
    desc:`Ukończyłam psychologię na Uniwersytecie Mikołaja Kopernika w Toruniu ze specjalnością psycholog kliniczny, a także seksuologię praktyczną na Uniwersytecie SWPS w Poznaniu. Jestem w trakcie czteroletniego szkolenia psychoterapeutycznego w nurcie poznawczo-behawioralnym. Doświadczenie zdobywałam w Ośrodku Interwencji Kryzysowej, udzielając wsparcia ofiarom przemocy oraz osobom w kryzysach życiowych. Pracuję z osobami dorosłymi, oferując pomoc psychologiczną i seksuologiczną. Wspieram osoby w kryzysach, cierpiące na depresję oraz zaburzenia lękowe, doświadczające trudności w regulowaniu emocji i obniżonego poczucia własnej wartości. Prowadzę wsparcie dla osób z ADHD i spektrum autyzmu, pracuję z parami, a także wspieram osoby LGBTQ+ w obszarach tożsamości, seksualności i relacji. Zajmuję się również diagnostyką psychologiczną osób dorosłych.`
  },
  {
    id:'kasinska', name:'Katarzyna Kasińska', role:'Psycholog kliniczny · Seksuologia', group:'psycholog',
    photo:'assets/team/katarzyna-kasinska.webp', treats:['adults'], gender:'k', english:false, dog:false,
    url:'https://centrumzakatek.pl/katarzyna-kasinska', priceFrom:200, priceLabel:'konsultacja psychologiczna',
    tags:['sexology','depression','anxiety','lgbt','trauma'],
    blurb:'Psycholożka kliniczna z przygotowaniem z seksuologii: zaburzenia nastroju, lęk, trauma z dzieciństwa.',
    motto:`Nasze życie jest sumą doświadczeń zapakowanych w duży plecak, który towarzyszy nam codziennie.`,
    desc:`Jestem psychologiem. Ukończyłam Uniwersytet Kazimierza Wielkiego w Bydgoszczy ze specjalnością psycholog kliniczny. Dodatkowo poszerzam kompetencje w zakresie seksuologii klinicznej na Uniwersytecie SWPS w Sopocie. Doświadczenie zdobywałam w Szpitalu Uniwersyteckim w Bydgoszczy w Klinice Psychiatrii oraz w Szpitalu Psychiatrycznym w Toruniu. Pracuję indywidualnie z osobami dorosłymi. Towarzyszę i pomagam przejść przez różnego rodzaju trudności życiowe, cierpienie i choroby. W swojej pracy wykorzystuję metody uznawane za skuteczne, a przede wszystkim dopasowane do danej osoby.`
  },
  {
    id:'tokarska', name:'Alicja Tokarska', role:'Psycholog · Psychoonkolog · Psychoterapeuta', group:'psycholog',
    photo:'assets/team/alicja-tokarska.webp', treats:['adults','children'], gender:'k', english:false, dog:false,
    url:'https://centrumzakatek.pl/alicja-tokarska', priceFrom:200, priceLabel:'konsultacja psychologiczna',
    tags:['crisis','chronic_illness','grief','mood','anxiety','ocd','psychotherapy'],
    blurb:'Psycholożka i psychoonkolożka: kryzysy życiowe, choroby przewlekłe i nowotworowe, zaburzenia OCD.',
    motto:`Człowiek nie jest, a staje się.`,
    desc:`Jestem psychologiem, psychoonkologiem i psychoterapeutą w trakcie szkolenia. Zgodnie z zasadą „Człowiek nie jest, a staje się" wychodzę z założenia, że w każdym momencie życia mamy możliwość wpływania na swoje samopoczucie i sprawiania, by nasza codzienność była lżejsza. W praktyce łączę podejście oparte na dowodach naukowych z indywidualnym podejściem do każdego pacjenta. Moim celem jest wspieranie osób w budowaniu dobrostanu psychicznego, wzmacnianiu odporności emocjonalnej i znajdowaniu skutecznych sposobów radzenia sobie z wyzwaniami. Specjalizuję się w pracy z osobami doświadczającymi trudności emocjonalnych, kryzysów życiowych oraz chorób przewlekłych, w tym nowotworowych.`
  },
  {
    id:'ciak', name:'Magdalena Ciak-Sabatowska', role:'Psycholog · Psychoterapeuta integracyjny', group:'psycholog',
    photo:'assets/team/magdalena-ciak.webp', treats:['adults'], gender:'k', english:true, dog:false,
    url:'https://centrumzakatek.pl/magdalena-ciak', priceFrom:200, priceLabel:'konsultacja psychologiczna',
    tags:['anxiety','depression','crisis','trauma','psychotherapy','stress'],
    blurb:'Psycholożka i psychoterapeutka integracyjna: zaburzenia lękowe i depresyjne, kryzysy po stresie, praca z traumą.',
    motto:`Towarzyszenie klientom w drodze zdrowienia uważam za wielki przywilej.`,
    desc:`Jestem psychologiem i psychoterapeutą integracyjnym w trakcie szkolenia. Psychologię ukończyłam na Uniwersytecie Kazimierza Wielkiego w Bydgoszczy. Mam dwuletnie doświadczenie kliniczne zdobyte w Centrum Zdrowia Psychicznego Wojewódzkiego Szpitala dla Nerwowo i Psychicznie Chorych w Świeciu. Pracuję z osobami dorosłymi. Oprócz podejścia integracyjnego i psychodynamicznego, szczególnie interesuję się podejściem neurobiologicznym, psychosomatyką oraz terapią traumy. W terapii mocno koncentruję się na zasobach i mocnych stronach pacjenta. Pracuję z szerokim spektrum zaburzeń emocjonalnych, lękowych, depresyjnych, adaptacyjnych, postresowych oraz kryzysami życiowymi, relacyjnymi i egzystencjalnymi. Najważniejsza jest dla mnie relacja i poczucie bezpieczeństwa w kontakcie. Pracuję również w języku angielskim.`
  },
  {
    id:'grzegorska', name:'Karolina Grzegórska', role:'Psycholog', group:'psycholog',
    photo:'assets/team/karolina-grzegorska.webp', treats:['adults','children','couples'], gender:'k', english:false, dog:false,
    url:'https://centrumzakatek.pl/karolina-grzegorska', priceFrom:200, priceLabel:'konsultacja psychologiczna',
    tags:['depression','anxiety','self_worth','relationships','asd','diagnosis','psychotherapy'],
    blurb:'Psycholożka: obniżony nastrój i depresja, trudności w relacjach, niska samoocena; CBT, ACT, mindfulness.',
    motto:`Kierunek moich działań wyznacza niepowtarzalność każdej osoby, która trafia do mojego gabinetu.`,
    desc:`Ukończyłam studia psychologiczne na Uniwersytecie Kazimierza Wielkiego w Bydgoszczy. Posiadam uprawnienia pedagogiczne oraz diagnostyczne. W pracy terapeutycznej łączę kilka podejść w zależności od Twoich potrzeb i rodzaju trudności - m.in. elementy terapii poznawczo-behawioralnej, terapii akceptacji i zaangażowania, mindfulness oraz terapii skoncentrowanej na rozwiązaniach. Staram się towarzyszyć młodzieży w lepszym rozumieniu tego, kim się stają i dokąd zmierzają. Uczę się elastyczności, uważności i otwartości od każdej osoby, która trafia do mojego gabinetu. Prywatnie uwielbiam piesze wędrówki, praktykuję medytację mindfulness, a od niedawna interesuję się jazdą konną.`
  },
  {
    id:'gontarska', name:'Ewa Gontarska', role:'Psycholog · Diagnoza neuropsychologiczna', group:'psycholog',
    photo:'assets/team/ewa-gontarska.webp', treats:['adults','children'], gender:'k', english:false, dog:false,
    url:'https://centrumzakatek.pl/ewa-gontarska', priceFrom:200, priceLabel:'konsultacja psychologiczna',
    tags:['crisis','diagnosis','depression','anxiety'],
    blurb:'Psycholożka: wsparcie w kryzysie emocjonalnym, diagnoza psychologiczna i neuropsychologiczna.',
    motto:null,
    desc:`Jestem psychologiem od 2017 roku. Doświadczenie zdobywałam m.in. jako psycholog świadczący specjalistyczne usługi opiekuńcze, pracując w środowiskowym domu samopomocy, świetlicy środowiskowej dla dzieci i młodzieży oraz na oddziale psychiatrycznym. W pracy skupiam się na indywidualnych potrzebach osoby, która się do mnie zgłasza. Wykonuję diagnostykę psychologiczną i neuropsychologiczną, udzielam wsparcia oraz poradnictwa osobom w kryzysie emocjonalnym, koncentruję się na poszukiwaniu rozwiązań. Stale poszerzam swoją wiedzę, biorąc udział w szkoleniach i warsztatach.`
  },
  {
    id:'zelazna', name:'Izabela Żelazna', role:'Psycholog · Diagnoza ADHD/ASD', group:'psycholog',
    photo:'assets/team/izabela-zelazna.webp', treats:['adults'], gender:'k', english:false, dog:false,
    url:'https://centrumzakatek.pl/izabela-zelazna', priceFrom:200, priceLabel:'konsultacja / diagnoza',
    tags:['adhd','asd','diagnosis','anxiety'],
    blurb:'Psycholożka specjalizująca się w diagnozie ADHD i spektrum autyzmu u dorosłych.',
    motto:`Każdy człowiek to unikalna opowieść, która kryje za sobą odmienne wyzwania i emocje.`,
    desc:`Ukończyłam psychologię na Uniwersytecie Mikołaja Kopernika w Toruniu. Doświadczenie zdobywałam w Ośrodku Interwencji Kryzysowej oraz w Zakładzie Karnym, gdzie zajmowałam się profilaktyką uzależnień i wsparciem osób z trudnościami adaptacyjnymi. Moja praca opiera się na budowaniu bezpiecznej przestrzeni, w której pacjenci mogą otwarcie mówić o swoich problemach. Wykorzystuję techniki z różnych nurtów - dla mnie ważne jest dopasowanie metod do potrzeb klienta. Aktualnie jestem uczestniczką szkolenia psychoterapeutycznego w szkole „Dialog" w nurcie integracyjno-systemowym. Ukończyłam I stopień Terapii Skoncentrowanej na Rozwiązaniach. Zajmuję się również psychoedukacją oraz diagnozą osób dorosłych z ADHD i ASD.`
  },
  {
    id:'jagoda', name:'Jagoda Gręźlikowska', role:'Psycholog · Terapeuta TSR · Trener TUS', group:'psycholog',
    photo:'assets/team/jagoda-grezlikowska.webp', treats:['adults','children'], gender:'k', english:false, dog:false,
    url:'https://centrumzakatek.pl/jagoda-grezlikowska', priceFrom:200, priceLabel:'konsultacja psychologiczna',
    tags:['anxiety','mood','stress','self_worth','crisis','social_skills'],
    blurb:'Psycholożka, terapeutka TSR i trenerka TUS: lęk, nastrój, regulacja emocji, kryzys; biofeedback.',
    motto:`Moje podstawowe wartości to pasja, wiedza i wsparcie.`,
    desc:`Jestem psychologiem, nauczycielem akademickim, terapeutką I stopnia w nurcie TSR, trenerką TUS, członkinią Polskiego Towarzystwa Psychologicznego, pracującą z biofeedbackiem i osobami w różnym wieku. Moja filozofia opiera się na holistycznym podejściu do pacjenta, który w moich oczach jest przede wszystkim człowiekiem. W codziennej pracy łączę wiedzę z całego przekroju psychologii - m.in. pozytywnej, osobowości, społecznej oraz techniki nurtów SE, TSR, ACT i CBT. Stawiam na samorozwój, merytorykę oraz etykę, regularnie uczestniczę w konferencjach i szkoleniach, pracuję pod superwizją. Nie zapominam o budowaniu dobrych, bezpiecznych i wspierających relacji. Prywatnie jestem miłośniczką zwierząt, aktywności fizycznej i dobrego jedzenia.`
  },
  {
    id:'iwona', name:'Iwona Jasieniecka', role:'Psycholog kliniczny (dzieci 10+ i dorośli)', group:'psycholog',
    photo:'assets/team/iwona-jasieniecka.webp', treats:['adults','children'], gender:'k', english:false, dog:false,
    url:'https://centrumzakatek.pl/iwona-jasieniecka', priceFrom:200, priceLabel:'konsultacja psychologiczna',
    tags:['anxiety','stress','self_worth','depression','crisis','trauma','children'],
    blurb:'Psycholożka kliniczna: regulacja emocji, lęk, kryzys, praca z traumą u dzieci od 10 roku życia.',
    motto:`Świadomość może być jednym z najcenniejszych drogowskazów.`,
    desc:`Ukończyłam pięcioletnie studia psychologiczne o specjalności klinicznej na Akademii Pedagogiki Specjalnej w Warszawie, a następnie studia podyplomowe z psychologii klinicznej oraz diagnozy psychologicznej w postępowaniu sądowym. W gabinecie pracuję z dziećmi i młodzieżą od 10 roku życia. Wspieram dzieci oraz ich rodziców w procesie rozwoju, opierając się na aktualnej wiedzy psychologicznej i indywidualnym potencjale każdej osoby. Stawiam przede wszystkim na relację, wierząc, że uważność i empatyczne słuchanie pozwalają osiągnąć najwięcej. Doświadczenie zbudowałam pracując z pacjentami dorosłymi i dziećmi m.in. w szpitalu, poradni, ośrodku rehabilitacji oraz na oddziale neurochirurgii. Prywatnie jestem miłośniczką podróży i molem książkowym; trenuję taniec współczesny, rysuję i fotografuję.`
  },
  {
    id:'nedzak', name:'Marcel Nędzak', role:'Psycholog · Uzależnienia · Interwencja kryzysowa', group:'psycholog',
    photo:'assets/team/marcel-nedzak.webp', treats:['adults','children','couples'], gender:'m', english:false, dog:false,
    url:'https://centrumzakatek.pl/marcel-nedzak', priceFrom:200, priceLabel:'konsultacja psychologiczna',
    tags:['addiction','relationships','anxiety','depression','stress','crisis','grief'],
    blurb:'Psycholog wspierający osoby z uzależnieniami i ich bliskich; kryzysy, żałoba, trudności w relacjach.',
    motto:null,
    desc:`Ukończyłem psychologię na Uniwersytecie Mikołaja Kopernika w Toruniu ze specjalnością psycholog społeczny, a następnie studia podyplomowe z psychologii uzależnień na Uniwersytecie WSB Merito w Toruniu. Doświadczenie zdobywałem w Ośrodku Interwencji Kryzysowej w Toruniu, gdzie prowadziłem konsultacje, dyżury interwencyjne oraz interwencje krótko- i długoterminowe dla dzieci, młodzieży, dorosłych i rodzin. Pracowałem zarówno z osobami w nagłym kryzysie, jak i z trudnościami narastającymi latami, w tym z uzależnieniami i współuzależnieniem. Na co dzień wspieram osoby mierzące się z uzależnieniami od substancji i behawioralnymi oraz bliskich osób uzależnionych. W wolnym czasie uwielbiam literaturę fantastyczną, a gdy wena pozwoli - oddaję się pisaniu poezji.`
  },
  {
    id:'malinowski', name:'Mariusz Malinowski', role:'Specjalista psychoterapii uzależnień', group:'psycholog',
    photo:'assets/team/mariusz-malinowski-2.webp', treats:['adults'], gender:'m', english:false, dog:false,
    url:'https://centrumzakatek.pl/mariusz-malinowski-2', priceFrom:200, priceLabel:'sesja psychoterapii',
    tags:['addiction','psychotherapy'],
    blurb:'Psychoterapeuta uzależnień: substancje psychoaktywne, hazard, zapobieganie nawrotom, wsparcie rodzin.',
    motto:`Na pierwszym miejscu stawiam relację z pacjentem, poufność oraz wspólne odnalezienie rozwiązania.`,
    desc:`Jestem specjalistą psychoterapii uzależnień. Moje doświadczenie zawodowe rozpoczęło się w 1991 roku w Wojewódzkim Ośrodku Lecznictwa Psychiatrycznego w Toruniu, a w 1993 roku w Całodobowym Oddziale Odwykowym w Toruniu (Czerniewice). Certyfikat Specjalisty Psychoterapii Uzależnień uzyskałem w Krajowym Centrum Przeciwdziałania Uzależnieniom. Ukończyłem Studium Pomocy Psychologicznej, Studium Terapii Uzależnień oraz Studium Przeciwdziałania Przemocy w Rodzinie w Instytucie Psychologii Zdrowia w Warszawie. Pracuję indywidualnie i grupowo, ambulatoryjnie oraz stacjonarnie. Na pierwszym miejscu stawiam relację z pacjentem, poufność i dyskrecję oraz wspólne odnalezienie rozwiązania problemu. Ważne jest dla mnie zachowanie wolności decyzji pacjenta i sensu dokonywanej zmiany.`
  },
  {
    id:'kalinowska', name:'Angelika Kalinowska', role:'Psycholog · Pedagog-terapeuta · Terapia uzależnień', group:'psycholog',
    photo:'assets/team/angelika-kalinowska.webp', treats:['adults','children'], gender:'k', english:false, dog:true,
    url:'https://centrumzakatek.pl/angelika-kalinowska', priceFrom:200, priceLabel:'konsultacja psychologiczna',
    tags:['depression','eating','anxiety','trauma','addiction','children','social_skills'],
    blurb:'Psycholożka i terapeutka (pracuje z psem terapeutą Walterem): depresja, trauma, uzależnienia, socjoterapia.',
    motto:null,
    desc:`Absolwentka Uniwersytetu Mikołaja Kopernika na kierunku pedagogika specjalna oraz resocjalizacja z profilaktyką społeczną, a także psychologii klinicznej w Wyższej Szkole Biznesu National Louis University. Ukończyła studia podyplomowe z terapii uzależnień, terapii zajęciowej, organizacji i zarządzania pomocą społeczną, edukacji przedszkolnej i wczesnoszkolnej oraz diagnozy i terapii pedagogicznej. Od 8 lat pracuje z dziećmi, młodzieżą, dorosłymi i seniorami borykającymi się z różnorakimi problemami społecznymi - w zakresie terapii pedagogicznej z elementami socjoterapii i resocjalizacji, profilaktyki społecznej oraz poradnictwa. W Zakątku tworzy zespół dogoterapeutyczny ze swoim psem terapeutą Walterem.`
  },
  {
    id:'wernerowicz', name:'Maja Wernerowicz', role:'Psycholog kliniczny · Psychoterapeuta CBT (dzieci)', group:'psycholog',
    photo:'assets/team/maja-wernerowicz.webp', treats:['children'], gender:'k', english:false, dog:false,
    url:'https://centrumzakatek.pl/maja-wernerowicz', priceFrom:200, priceLabel:'konsultacja psychologiczna',
    tags:['anxiety','mood','stress','self_worth','adhd','selfharm','eating','children','psychotherapy'],
    blurb:'Psycholożka kliniczna, psychoterapeutka CBT dzieci i młodzieży: lęk, samookaleczenia, zaburzenia odżywiania.',
    motto:`Bardzo zależy mi, aby w gabinecie stworzyć przyjazną i ciepłą atmosferę.`,
    desc:`Jestem dyplomowanym psychologiem o specjalności klinicznej. Wiedzę zdobywałam na Uniwersytecie SWPS w Warszawie. Ukończyłam studia podyplomowe „Przygotowanie pedagogiczne dla psychologów" oraz półroczne szkolenie z terapii poznawczo-behawioralnej dzieci i młodzieży, a obecnie jestem w trakcie dwuletniego szkolenia z psychoterapii CBT dzieci i młodzieży z elementami III fali. W swojej pracy na pierwszym miejscu stawiam relację z pacjentem; zależy mi na przyjaznej i ciepłej atmosferze. Staram się uważnie słuchać, podążać za potrzebami pacjenta i pracować w odpowiednim dla niego tempie. Lubię wspomagać się ciekawymi narzędziami i pomocami dydaktycznymi, które uatrakcyjniają spotkania.`
  },
  {
    id:'gajewska', name:'Alicja Gajewska', role:'Psycholog zdrowia (dzieci i młodzież)', group:'psycholog',
    photo:'assets/team/alicja-gajewska.webp', treats:['children'], gender:'k', english:false, dog:false,
    url:'https://centrumzakatek.pl/alicja-gajewska', priceFrom:200, priceLabel:'konsultacja psychologiczna',
    tags:['anxiety','mood','self_worth','children'],
    blurb:'Psycholożka zdrowia dla dzieci i młodzieży: lęk, nastrój, wsparcie przy rozstaniu rodziców; bajkoterapia.',
    motto:`Wierzę, że relacja i dobra zabawa potrafią być początkiem realnej zmiany.`,
    desc:`Z wykształcenia jestem psycholożką - z pasji, serca i codziennych wyborów także. Ukończyłam studia magisterskie na kierunku psychologia o specjalności psychologia zdrowia na Uniwersytecie WSB Merito w Toruniu. Od lat towarzyszę dzieciom i młodzieży w ich emocjonalnych podróżach. Doświadczenie zdobywałam w przedszkolach, żłobkach oraz placówkach terapeutycznych. Ukończyłam kilkanaście szkoleń, m.in. z terapii lęku, Treningu Umiejętności Społecznych, interwencji kryzysowej, biblioterapii, pracy z dzieckiem w sytuacji rozwodu czy diagnozy zaburzeń neurorozwojowych. Każde dziecko traktuję indywidualnie - nie przez pryzmat diagnozy, ale jako młodego człowieka, który ma prawo czuć, myśleć i rozwijać się po swojemu. Lubię wykorzystywać elementy bajkoterapii, mindfulness i gry terapeutyczne.`
  },

  {
    id:'duda', name:'Sławomir Duda', role:'Kognitywista · Trener umiejętności społecznych (TUS)', group:'dzieci',
    photo:'assets/team/slawomir-duda.webp', treats:['adults','children'], gender:'m', english:false, dog:false,
    url:'https://centrumzakatek.pl/slawomir-duda', priceFrom:180, priceLabel:'zajęcia TUS',
    tags:['social_skills','asd','adhd','stress'],
    blurb:'Trener TUS i kognitywista: fobia społeczna, lęk społeczny, wyrażanie emocji; praca metodą gier (RPG) i CBT.',
    motto:`Łączenie technik poznawczo-behawioralnych z grami RPG to skuteczny sposób na rozwijanie umiejętności społecznych.`,
    desc:`Jestem kognitywistą, trenerem umiejętności społecznych (TUS) oraz posiadam certyfikat Terapeutycznego Mistrza Gry. Od ponad dziesięciu lat prowadzę gry fabularne, tworząc fantastyczne światy i opowieści. Ukończyłem kurs Trenera Umiejętności Społecznych I i II stopnia oraz kurs Therapeutic Game Master akredytowany przez Amerykańskie Towarzystwo Psychologiczne (APA). Wierzę, że połączenie technik poznawczo-behawioralnych z interaktywnymi elementami gier RPG to skuteczny sposób rozwijania komunikacji, współpracy, rozwiązywania konfliktów oraz pewności siebie. Pracuję z dziećmi od 12 roku życia oraz osobami dorosłymi, w tym ze spektrum autyzmu i ADHD, wspierając w radzeniu sobie z fobią i lękiem społecznym, wyrażaniu emocji oraz budowaniu zdrowych relacji.`
  },
  {
    id:'milek', name:'Patrycja Miłek', role:'Trener umiejętności społecznych', group:'dzieci',
    photo:'assets/team/patrycja-milek.webp', treats:['adults','children'], gender:'k', english:false, dog:false,
    url:'https://centrumzakatek.pl/patrycja-milek', priceFrom:180, priceLabel:'zajęcia TUS',
    tags:['social_skills'],
    blurb:'Trenerka TUS: komunikacja, asertywność, budowanie relacji; wsparcie psychoedukacyjne i kreatywne.',
    motto:`Najważniejsze jest tworzenie bezpiecznej przestrzeni opartej na zrozumieniu i wzajemnym szacunku.`,
    desc:`Jestem trenerem umiejętności społecznych pracującym z dziećmi i dorosłymi. Prowadzę zajęcia TUS skupiające się na efektywnej komunikacji, asertywności oraz budowaniu relacji. W pracy kieruję się empatią, otwartością i zaangażowaniem; najważniejsze jest dla mnie tworzenie bezpiecznej przestrzeni opartej na zrozumieniu i szacunku. Jestem studentką V roku psychologii i to z nią wiążę swoją przyszłość. Interesują mnie relacje międzyludzkie, a w pracy magisterskiej zgłębiam funkcjonowanie dorosłych dzieci rodziców rozwiedzionych. Psychologię łączę z zamiłowaniem do literatury, muzyki i sztuki, dlatego często sięgam po elementy kreatywnych aktywności, by wspierać wyrażanie emocji.`
  },
  {
    id:'golebiewska', name:'Ewa Gołębiewska', role:'Pedagog specjalny · Terapia spektrum autyzmu', group:'dzieci',
    photo:'assets/team/ewa-golebiewska.webp', treats:['children'], gender:'k', english:false, dog:false,
    url:'https://centrumzakatek.pl/ewa-golebiewska', priceFrom:180, priceLabel:'zajęcia terapeutyczne',
    tags:['social_skills','asd','children'],
    blurb:'Pedagożka specjalna: trening umiejętności społecznych, diagnoza i terapia spektrum autyzmu, wsparcie edukacyjne.',
    motto:`Moim celem jest wspieranie dzieci w odnalezieniu się w grupie i budowaniu akceptacji siebie.`,
    desc:`Jestem absolwentką pedagogiki wczesnoszkolnej oraz pedagogiki specjalnej UMK w Toruniu, certyfikowanym trenerem umiejętności społecznych oraz trenerem kompetencji kluczowych. Ukończyłam I stopień terapii skoncentrowanej na rozwiązaniach oraz studia podyplomowe z terapii dzieci i młodzieży oraz diagnozy, edukacji i terapii osób ze spektrum autyzmu. Na co dzień pracuję z dziećmi w wieku przedszkolnym i młodzieżą jako pedagog specjalny. Podejmuję działania wspierające, edukacyjne i terapeutyczne dla dzieci o specjalnych potrzebach rozwojowych - od diagnozy potrzeb, przez zajęcia rewalidacyjne i terapeutyczne, po treningi umiejętności społecznych. Kluczowa jest dla mnie współpraca z rodzicami i innymi specjalistami.`
  },
  {
    id:'zawadzki', name:'Patryk Zawadzki', role:'Psycholog · Diagnoza dzieci · TUS', group:'dzieci',
    photo:'assets/team/patryk-zawadzki.webp', treats:['children'], gender:'m', english:false, dog:false,
    url:'https://centrumzakatek.pl/patryk-zawadzki', priceFrom:200, priceLabel:'diagnoza psychologiczna',
    tags:['diagnosis','social_skills','asd','children'],
    blurb:'Psycholog: diagnoza psychologiczna dzieci, trening umiejętności społecznych, wsparcie spektrum autyzmu.',
    motto:`Diagnozę traktuję jako proces, który ma pomóc lepiej zrozumieć trudności i wskazać kierunki wsparcia.`,
    desc:`Ukończyłem psychologię na Uniwersytecie Mikołaja Kopernika w Toruniu. Rozwijam zainteresowania szczególnie w obszarze diagnozy psychologicznej oraz funkcjonowania poznawczego i emocjonalnego. Na co dzień zajmuję się diagnozą psychologiczną dzieci, udzielam wsparcia oraz prowadzę Treningi Umiejętności Społecznych (TUS). Mam doświadczenie w pracy z dziećmi w spektrum autyzmu i dostosowuję sposób pracy do potrzeb i możliwości dziecka. Diagnozę traktuję jako proces, który ma pomóc uporządkować doświadczenia i wskazać kierunki dalszego wsparcia. Zależy mi na tworzeniu atmosfery bezpieczeństwa, w której zarówno dzieci, jak i rodzice mają poczucie bycia wysłuchanymi.`
  },
  {
    id:'blazejczyk', name:'Natalia Błażejczyk', role:'Fizjoterapeuta dziecięcy', group:'dzieci',
    photo:'assets/team/natalia-blazejczyk.webp', treats:['children'], gender:'k', english:false, dog:false,
    url:'https://centrumzakatek.pl/natalia-blazejczyk', priceFrom:200, priceLabel:'konsultacja diagnostyczna 60 min',
    tags:['physio_child','children'],
    blurb:'Fizjoterapeutka dziecięca: zaburzenia napięcia mięśniowego, wady postawy, choroby nerwowo-mięśniowe.',
    motto:`Praca z małymi pacjentami to moja największa pasja.`,
    desc:`Jestem mgr fizjoterapii, ukończyłam także studia podyplomowe z przygotowania pedagogicznego. Od początku swojej drogi zawodowej pracuję z najmłodszymi pacjentami. Doświadczenie zdobywałam w Centrum Terapii Wyspa w Gdańsku oraz Nordclinic w Gdyni, a obecnie pracuję w Hospicjum Nadzieja w Toruniu. Pracowałam również jako wykładowca na AWFiS w Gdańsku. Praca z małymi pacjentami to moja największa pasja, dlatego nieustannie poszerzam wiedzę na licznych szkoleniach w kraju i za granicą (m.in. Cuevas Medek Exercises, terapia skolioz funkcjonalnych).`
  },

  {
    id:'walter', name:'Walter', role:'Pies terapeuta · Golden Retriever', group:'walter',
    photo:'assets/team/walter.webp', treats:['adults','children'], gender:'m', english:false, dog:true,
    url:'https://centrumzakatek.pl/walter', priceFrom:0, priceLabel:'dogoterapia w ramach sesji',
    tags:['dog'],
    blurb:'Pies terapeutyczny, najlepszy przyjaciel Angeliki Kalinowskiej; wspiera sesje indywidualne i grupowe.',
    motto:`Nie mogę się już doczekać, kiedy będę mógł Cię bliżej poznać!`,
    desc:`Mam na imię Walter, mam 3 lata i jestem już dorosłym Golden Retrieverem z nabytymi zdolnościami! Jestem psem terapeutycznym i najlepszym przyjacielem mojej Angeliki Kalinowskiej, z którą tworzę zespół dogoterapeutyczny w Zakątku. Ukończyłem cały cykl szkoleń - od przedszkola dla szczeniąt, przez posłuszeństwo, po specjalistyczne szkolenie dla psów terapeutycznych. Regularnie współpracuję z zoopsychologiem i uczestniczę w zajęciach doskonalących organizowanych przez Polską Akademię Zooterapii. Prywatnie kocham piłki i spacery z moją Panią po leśnych zakątkach. Jestem w pełni zaszczepiony i pod regularną kontrolą weterynarza.`
  }
];

/* ------------------------------------------------------------------
   MOCK dostępności terminów (liczba dni do najbliższego wolnego terminu).
   Docelowo zastąpione integracją z kalendarzem rejestracji.
-------------------------------------------------------------------*/
const AVAILABILITY = {
  pysklo:13, sadowski:4, kosowski:22, muliarchuk:8, legowicz:26,
  mietek:16,
  kosowska:11, klobukowska:3, kasinska:9, tokarska:6, ciak:5, grzegorska:7,
  gontarska:12, zelazna:18, jagoda:4, iwona:8, nedzak:3, malinowski:10,
  kalinowska:14, wernerowicz:9, gajewska:6,
  duda:7, milek:5, golebiewska:9, zawadzki:15, blazejczyk:12,
  walter:0
};
SPECIALISTS.forEach(s => { s.availDays = (AVAILABILITY[s.id] != null) ? AVAILABILITY[s.id] : 10; });

/* Grupy do wyświetlania katalogu (kolejność sekcji) */
const GROUPS = [
  { key:'psychiatra', title:'Lekarze psychiatrzy', sub:'Diagnoza i leczenie, w tym farmakoterapia', icon:'ti-stethoscope' },
  { key:'neurolog',   title:'Neurolog', sub:'Bóle i zawroty głowy, układ nerwowy', icon:'ti-brain' },
  { key:'psycholog',  title:'Psycholodzy, psychoterapeuci i seksuolodzy', sub:'Rozmowa, psychoterapia, diagnoza i wsparcie', icon:'ti-message-circle-heart' },
  { key:'dzieci',     title:'Specjaliści dziecięcy i trening umiejętności społecznych', sub:'Diagnoza, TUS, pedagogika i fizjoterapia', icon:'ti-mood-kid' },
  { key:'walter',     title:'Nasz psi terapeuta', sub:'Dogoterapia, która rozluźnia i daje poczucie bezpieczeństwa', icon:'ti-dog' },
];

/* Cennik — wybrane pozycje (obowiązuje od 1.01.2026) */
const PRICING = [
  { group:'Psychiatra - dorośli', icon:'ti-stethoscope', items:[
    ['Wizyta diagnostyczna (40 min)','380 zł'],
    ['Wizyta kontrolna (20 min)','300 zł'],
    ['Zaświadczenie','80 zł'],
  ]},
  { group:'Psychiatra - dzieci i młodzież', icon:'ti-mood-kid', items:[
    ['Wizyta diagnostyczna (60 min)','450 zł'],
    ['Wizyta kontrolna (30 min)','350 zł'],
  ]},
  { group:'Neurolog', icon:'ti-brain', items:[
    ['Wizyta neurologiczna (30 min)','250 zł'],
    ['Wystawienie recepty','60 zł'],
  ]},
  { group:'Psycholog / psychoterapia', icon:'ti-message-circle-heart', items:[
    ['Konsultacja psychologiczna (50 min)','190-200 zł'],
    ['Wizyta wydłużona (80 min)','280-300 zł'],
    ['Psychoterapia indywidualna','200-220 zł'],
    ['Terapia par','200-300 zł'],
    ['Diagnoza psychologiczna z opinią','400 zł'],
  ]},
  { group:'Seksuolog', icon:'ti-shield-lock', items:[
    ['Konsultacja seksuologiczna','220 zł'],
  ]},
  { group:'Fizjoterapia dziecięca', icon:'ti-yoga', items:[
    ['Konsultacja diagnostyczna (60 min)','200 zł'],
    ['Sesja terapeutyczna (45 min)','180 zł'],
  ]},
];

/* FAQ */
const FAQ = [
  ['Czy dobór specjalisty jest anonimowy?','Tak. Dobór nie prosi o imię, nazwisko ani dane kontaktowe, a Twoje odpowiedzi nie są nigdzie zapisywane. To narzędzie, które ma jedynie pomóc Ci wybrać właściwego specjalistę.'],
  ['Nie wiem, czy potrzebuję psychiatry, czy psychologa.','To bardzo częsta wątpliwość - i właśnie z tym pomaga nasz krótki dobór. W skrócie: psychiatra jest lekarzem i może włączyć leczenie farmakologiczne, a psycholog i psychoterapeuta pracują rozmową. Często obie formy pomocy się uzupełniają.'],
  ['Jak umówić wizytę?','Zadzwoń pod numer 575 805 505 lub napisz na rejestracja@centrumzakatek.pl. Pomożemy dobrać specjalistę i dogodny termin.'],
  ['Czy przyjmujecie dzieci?','Tak. Mamy psychiatrę dzieci i młodzieży, psychologów dziecięcych, pedagoga specjalnego, trenerów umiejętności społecznych oraz fizjoterapeutkę dziecięcą.'],
  ['Czy mogę przyjść z partnerem na terapię par?','Tak. Kilkoro naszych specjalistów prowadzi terapię par. Możesz też zacząć od konsultacji indywidualnej, a partner dołączy później.'],
];

/* Wartości / podejście */
const VALUES = [
  ['ti-shield-heart','Prywatność od pierwszego kliknięcia','Dobór specjalisty działa bez danych osobowych, a kontakt pojawia się dopiero wtedy, gdy pacjent sam zdecyduje.'],
  ['ti-route','Ścieżka zamiast chaosu','Objawy, wiek, cel wizyty i pilność zamieniamy w czytelną propozycję specjalistów oraz alternatywy.'],
  ['ti-certificate','Człowiek zatwierdza decyzję','Dobór skraca drogę, ale ostateczny termin, formę wizyty i szczegóły potwierdza rejestracja.'],
];

/* Proces pierwszej wizyty */
const STEPS = [
  ['ti-message-chatbot','Opisz objawy anonimowo','Krótki dobór pyta o najważniejsze sygnały, wiek, cel wizyty i pilność kontaktu.'],
  ['ti-users','Zobacz 3 propozycje','Dostajesz konkretne osoby z uzasadnieniem, ceną i orientacyjną dostępnością.'],
  ['ti-calendar-plus','Potwierdź termin','Rejestracja pomaga wybrać dogodny termin i odpowiada na pytania organizacyjne.'],
  ['ti-armchair','Zacznij opiekę','Pierwsza wizyta porządkuje sytuację i ustala dalsze kroki: konsultacje, terapia, diagnoza lub leczenie.'],
];
