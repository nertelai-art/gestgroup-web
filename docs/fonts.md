# D'on surt el contingut

Tot el que el web diu de Gestgroup surt d'aquestes fonts, consultades el 23-10-2026. El que no hi és,
o no quadra, és a «Pendent de confirmar».

Còpia de totes les pàgines (HTML) i de les imatges a `_source/pages` i `_source/img` (no es puja).
Pàgines: portada, quienes-somos, gestcost, gestinnova, gesthelp, blog, el cas MDM, la secció
«Comunicaciones» del blog, contactar i nota-legal. No tenen `sitemap.xml`.

## gestgroup.es (la web actual)

- **Portada** (`/`): «consultoría informática que piensa en el ahorro», anàlisi gratuïta de factures,
  33% / +30% d'estalvi, suport 24/7 els 365 dies, CIO as a Service, LeanIT, +25 anys, logos de clients.
- **Compañía** (`/quienes-somos.php`): filosofia, LeanIT / Innovation / Help, Gestgroup neix de la
  divisió Gestcost (optimització de factures de telefonia), cita d'Albert Giró (CEO), «des del 2010».
- **Gestor Global** (`/gestcost.php`): les sis partides que analitzen (comunicacions, maquinari,
  programari, llicències, BBDD, gestió de personal), Anàlisi / LeanIT / KaizenIT / Assessorament,
  «500+ empreses», clients a tot l'Estat i amb oficines arreu del món, 30% d'estalvi al mes.
- **Mentoría** (`/gestinnova.php`): R+D+i, desenvolupament de programari, analítica de dades,
  automatització, optimització energètica.
- **Soporte** (`/gesthelp.php`): helpdesk externalitzat, tècnics de camp, SLA, serveis gestionats amb
  monitoratge, **sense permanència**.
- **Blog** (`/es/blog/instalacion-de-800-mdm-microsoft-intune-en-dispositivos-samsung-3`, 16-05-2025):
  el cas real de 800 MDM amb Microsoft Intune, Portal d'Empresa i Samsung Knox; −95% d'incidències,
  compliment total de les polítiques de ciberseguretat.
- **Contacte**: Carrer del Mestre Francesc Civil, 8, baixos, 17005 Girona · 931 156 344 ·
  gestgroup@gestgroup.es (el correu surt al final del cas MDM).
- **Compañía** (`/quienes-somos.php`): també la foto de l'Albert (`img/ceo-gestgroup.jpg`, real, a
  `public/images/albert-giro.webp`), el seu LinkedIn, la història Gestcost → Gestgroup → visió de futur,
  els pilars LeanIT / Innovation / Help i la cita de Larry Ellison.
- **Nota legal** (`/nota-legal.php`): GESTGROUP IT SERVICES S.L., NIF B56762339, C/ Manuel Cazurro
  Ruiz, 3 - 3º 2ª, 17003 Girona, albert.giro@gestgroup.es. La política de privacitat i la de galetes del
  web nou en són còpia literal (`src/data/legal.ts`).
- La resta de fotos de la seva web són de banc d'imatges: no les fem servir.
- Logotip (`/assets/images/logo.png`, `/fav-icon/icon.png`) i logos de clients
  (`/assets/images/logos/*.png`), descarregats a `_source/` (no es puja).

## Fora de la seva web

- LinkedIn (https://es.linkedin.com/company/gestgroup): fundada el 2010, 11–50 empleats, Albert Giró i
  Bartra com a CEO, lema «IT bajo control. Costes claros.» (el fem servir al peu).
- eInforma / Empresite: GESTGROUP IT SERVICES SL, constituïda el 4-12-2023, CNAE 6190 (telecomunicacions),
  domicili social a C/ Manuel Cazurro i Ruiz 3 (Girona), que no és l'adreça comercial.
- Google Maps: categoria «Soporte y servicios informáticos», a Parc Central (coworking). Sense horari
  ni ressenyes visibles. Cap xarxa social pròpia trobada.

## Què és exemple i no dada

- **La factura de l'escena** (`src/data/invoice.ts`) és un exemple il·lustratiu amb xifres rodones,
  i al web hi diu. L'única xifra de Gestgroup és el 30% d'estalvi mitjà.

## Pendent de confirmar amb Gestgroup

- **Avís legal**: la seva web no en té. El del web nou el redacta Nertel amb les seves dades; l'han de
  revisar (i hi falten les dades del Registre Mercantil).
- **Política de galetes**: és la de la seva web, i les taules descriuen les galetes de la web vella
  (`rgpdModel`, `PHPSESSID`, Google Analytics), que el web nou no fa servir. Mentre sigui demo, les
  úniques galetes són les del kit (enllaç personal i PostHog). Cal refer les taules quan es publiqui.

- **Nombre de clients**: la portada diu «+100», «Compañía» i «Gestor Global» diuen «+500». No el posem.
- **Estalvi**: «33%» a la portada, «+30%» i «30%» a la resta. Fem servir 30%.
- **Anys**: «+25 anys d'experiència» (de l'equip) conviu amb «des del 2010» (Gestcost) i amb una
  societat del 2023. El web diu «+25 anys en IT» i «des del 2010» per a Gestcost, com ells.
- **Facturació** («1M€ l'últim any» / «+1M Facturació 2021»): no la posem.
- Logotip en vectorial (el nostre és redibuixat, provisional), fotos reals de l'equip i de l'oficina,
  i si tenen certificacions de fabricants (Microsoft, etc.).
- Raó social i CIF per a l'avís legal; on han d'arribar les sol·licituds del formulari.
