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

- Tres escenes guiades pel scroll, sense three.js: la primera pantalla (pila de factures en 3D CSS que
  l'auditor marca, s'ordena i rep el segell «Bajo control»), la factura (`InvoiceScene`) i el dial del
  mètode (`CycleScene`). La coreografia va en fitxers `*-phases.ts` de TypeScript pur, amb proves.
- La primera pantalla porta a l'HTML la pila desordenada (el que es veu en arribar), no l'estat final:
  és l'única excepció. Amb moviment reduït es pinta ordenada i segellada.
- Res de xips de xifres flotants ni del logotip girant: l'usuari els va trobar «molt d'IA» (23-10-2026).
- Progrés en refs i DOM tocat directament des del scroll (`useScrollProgress`); mai `setState` per
  fotograma. S'actualitza a l'esdeveniment, sense rAF: en un panell de navegador amagat el rAF no corre.
- Cada escena té l'estat final a l'HTML i respecta `prefers-reduced-motion`.
- Direcció visual i logotip: `docs/direccio-visual.md`. El logotip és redibuixat i provisional.

## Pàgines

- `/[lang]` portada, `/[lang]/empresa` (Compañía), `/[lang]/casos/mdm-intune-samsung` (el cas del seu
  blog), `/[lang]/aviso-legal`, `/[lang]/privacidad` i `/[lang]/cookies`. Les legals són en castellà en
  tots dos idiomes (`lang="es"`), com a la seva web.
- `public/images/` queda fora de la porta de la demo (`src/proxy.ts`): l'optimitzador d'imatges de Next
  les demana sense galetes. Només hi ha d'anar el que ja és públic.

## Pendent

- **El formulari no s'envia enlloc**: `/api/contact` valida i respon `delivered: false`. Cal decidir
  amb Gestgroup on han d'arribar les sol·licituds (correu o CRM) abans de publicar-lo de debò.
- Avís legal redactat per nosaltres i taules de galetes de la web vella: vegeu `docs/fonts.md`.
- `og:image` pròpia.

## Demo per a leads (`src/demo-kit`)

- **El web és una demo per a un lead**: un cop desplegat, només s'hi entra amb un enllaç personal, i
  qui no en porta veu la pàgina de bloqueig de Nertel (403). Els enllaços es fan amb
  `pnpm demo:link "Nom del lead" --days 15`, que llegeix el secret de `.env.local` (el mateix que a
  Vercel; no es puja mai ni s'imprimeix).
- El codi ve del kit comú de les demos (`../nertel-demo-kit`, skill `demo-leads`). **No s'edita
  aquí**: es canvia al kit i es torna a copiar.
- Vercel: `DEMO_SECRET` i `DEMO_SITE=gestgroup` (la porta), i `NEXT_PUBLIC_POSTHOG_KEY` i
  `NEXT_PUBLIC_POSTHOG_HOST` (el seguiment amb PostHog). Sense `DEMO_SECRET` el web és obert.
- `src/proxy.ts` fa dues coses: primer la porta i després la redirecció de l'arrel a l'idioma, que
  s'emporta les galetes de l'enllaç (`src/proxy.test.ts`). El formulari (`/api/contact`) també és
  darrere la porta.
- **Quan el web passi a ser el del client** es treu el kit: `src/proxy.ts` (s'hi queda només la
  redirecció), `DemoTracker` i `DemoBadge` del layout, `src/demo-kit`, `posthog-js`, l'script
  `demo:link` i les variables. I es revisa l'avís legal.

## Git

- Branca d'integració: `developer`. A `main` no s'hi puja a mà.
- Repositori públic a GitHub (`nertelai-art/gestgroup-web`, des del 23-10-2026); branca per defecte
  `developer`, fusions amb merge commit.
- Vercel (`gestgroup-web`, avatar amb la «G» des del 23-10-2026). Producció només des de `main` (ho
  vigila `ignoreCommand` de `vercel.json`) i només quan l'usuari ho diu.
  - **La branca de producció del projecte encara és `developer`**: s'ha de canviar a `main` a
    Settings → Environments → Production (l'API no ho permet). Mentrestant, els pushos a `developer`
    no construeixen res (els para `ignoreCommand`).
  - El primer desplegament des de la CLI, Vercel el va posar a producció tot sol
    (`gestgroup-web.vercel.app`, 23-10-2026), darrere la porta de la demo. Els següents, amb
    `vercel deploy` sense `--prod`, són previsualitzacions.
  - Des de la CLI: `pnpm --config.cache-dir=C:/Users/nerte/.pnpm-dlx dlx vercel@65.2.0 …`.
    `.vercelignore` deixa fora `.env*.local` i `_source/`. Les crides `vercel api`, des de PowerShell.
- El web no s'indexa (`noindex`) mentre no sigui al domini del client (`SITE_INDEXABLE=true` ho obre).
