# Gestgroup — web

Proposta de web nova per a Gestgroup (gestgroup.es): consultoria IT de Girona que revisa les factures de
comunicacions, llicències, programari i maquinari de les empreses i n'optimitza el cost (CIO as a
Service, LeanIT + Kaizen), amb helpdesk 24/7 sense permanència i un departament d'innovació. Públic:
pimes i empreses sense departament d'IT propi. Acció principal: **demanar l'anàlisi gratuïta** (formulari
o trucada). Idiomes: castellà (per defecte, com la seva web) i català.

Les regles de casa (`~/.claude/CLAUDE.md`) valen aquí. Això és el que és propi d'aquest repositori.

## Ordres

- `pnpm dev` (Next amb `--webpack`: el Control d'aplicacions de Windows bloqueja el SWC natiu).
  Previsualització: `.claude/launch.json` (`gestgroup-dev`, `gestgroup-prod`).
- `pnpm build:local` per provar la build en local; `pnpm start` per mirar-la. Les animacions es jutgen
  amb la build de producció.
- `pnpm check` = typecheck + lint + tests. És el hook de pre-push (`.githooks/pre-push`, amb gitleaks).
- `pnpm logos` prepara els logos de clients de `_source/logos` a `public/clients` (fons blanc fora).
- **Node 24** (`engines`). `@types/node` va amb el 24.

## Contingut

- **Tot el que es diu del client és real** i surt de la seva web o de les fonts de `docs/fonts.md`.
  El que no quadra o falta és a «Pendent de confirmar» d'aquell fitxer; no s'inventa.
- La factura de l'escena és un **exemple il·lustratiu** (`src/data/invoice.ts`) i el web ho diu.
  Ha de baixar exactament el 30% (hi ha una prova).
- Textos a `src/i18n/dictionaries/`. El castellà és la referència de tipus: el català ha de tenir les
  mateixes claus i llistes (hi ha una prova). Dades a `src/data/`.

## Escenes

- Tres escenes guiades pel scroll, sense three.js: la primera pantalla (l'anell gira i creix), la
  factura (`InvoiceScene`) i el cicle Kaizen (`CycleScene`). La coreografia va en fitxers
  `*-phases.ts` de TypeScript pur, amb proves.
- Progrés en refs i DOM tocat directament des del scroll (`useScrollProgress`); mai `setState` per
  fotograma. S'actualitza a l'esdeveniment, sense rAF: en un panell de navegador amagat el rAF no corre.
- Cada escena té l'estat final a l'HTML i respecta `prefers-reduced-motion`.
- Direcció visual i logotip: `docs/direccio-visual.md`. El logotip és redibuixat i provisional.

## Pendent

- **El formulari no s'envia enlloc**: `/api/contact` valida i respon `delivered: false`. Cal decidir
  amb Gestgroup on han d'arribar les sol·licituds (correu o CRM) abans de publicar-lo de debò.
- Avís legal, privacitat i galetes: falta la raó social correcta (vegeu `docs/fonts.md`).
- `og:image` pròpia.
- **És una demo per a un lead**: abans d'ensenyar-la cal posar-hi el kit de demo (skill `demo-leads`).

## Git

- Branca d'integració: `developer`. A `main` no s'hi puja a mà.
- El web no s'indexa (`noindex`) mentre no sigui al domini del client (`SITE_INDEXABLE=true` ho obre).
