# Passar el web a gestgroup.es

Gestgroup ha triat l'**opció A**: el web es queda a Vercel (projecte `gestgroup-web`, pla Pro) i ells
només canvien els DNS del seu domini. El formulari s'envia amb **Resend**, des d'un domini que ja tenim
verificat (`nertel.ai`), així que a ells només els cal dir-nos a quina adreça el volen rebre.
Consultat el 12-11-2026 des de fora (DNS i pàgines), sense entrar a cap panell seu.

## Què els cal fer a ells

1. **Canviar 2 registres DNS** del domini (a SW Hosting, ells o Blaupixel), amb els valors que doni
   Vercel el dia del canvi.
2. **Dir-nos a quina adreça** volen rebre les sol·licituds del formulari.

Res més: el correu no es toca i els textos legals són els seus.

## Com ho tenen ara

- **Domini i DNS**: SW Hosting (`dns3.swhosting.com`, `dns4.swhosting.com`).
- **Web vella**: PHP sobre una plantilla Bootstrap + jQuery (2017), feta i mantinguda per **Blaupixel**
  (Girona), al servidor de SW Hosting `81.25.125.149` (`CE2021041312002.dnssw.net`). `www` és un CNAME
  de l'arrel. Només en castellà. El bàner de galetes també és de Blaupixel (`bpx-rgpd`).
- **Analítica**: només a `contactar.php` hi ha Google Analytics, amb un identificador `UA-` (Universal
  Analytics). Google va apagar Universal Analytics el juliol del 2023: ja no recull res. La seva política
  de galetes en parla per això. El web nou no fa servir cap analítica ni cap galeta.
- **Correu**: Microsoft 365 (MX `gestgroup-es.mail.protection.outlook.com`, `autodiscover` a Outlook).
  Hi ha un segon MX cap al servidor de SW Hosting.
  - SPF: `v=spf1 a mx include:spf.ipzmarketing.com include:protection.outlook.com -all`
  - DMARC: `p=quarantine`. No ens afecta: el formulari no envia en nom de gestgroup.es.
- **Formulari vell** (`contactar.php`): nom, email, telèfon, web i missatge, amb un camp parany
  («atrapalo»). L'envia el mateix servidor PHP.
- **Textos legals**: una sola «Nota legal» amb la política de privacitat i la de galetes. No tenen avís
  legal a part. El web nou en porta còpia literal (`src/data/legal.ts`) i tampoc no en té.

## El dia del canvi

Per ordre. Res d'això toca el correu.

1. **Vercel → Settings → Domains**: afegir `www.gestgroup.es` (principal) i `gestgroup.es` (redirigeix a
   `www`). Vercel diu quins registres cal posar.
2. **DNS a SW Hosting** (ells o Blaupixel), amb els valors que doni Vercel:
   - `gestgroup.es` → registre **A** cap a Vercel (substitueix `81.25.125.149`).
   - `www` → **CNAME** cap a Vercel (ara apunta a l'arrel).
   - **No es toquen** els MX, l'`autodiscover`, l'SPF, el DMARC ni el `ms=`. L'SPF continua bé: `a` passa
     a ser Vercel, que no envia correu, i el servidor vell queda autoritzat per `mx`.
3. **Variables a Vercel (Production)**:
   - `NEXT_PUBLIC_SITE_URL=https://www.gestgroup.es` (metadades, sitemap, dades estructurades i l'origen
     de l'enllaç «Web feta per Nertel», que en surt sol).
   - `SITE_INDEXABLE=true` (obre la indexació).
   - `RESEND_API_KEY` (una clau nova, només d'enviament, al compte de Resend de Nertel),
     `MAIL_FROM` (p. ex. `Web Gestgroup <web@nertel.ai>`) i `MAIL_TO` (l'adreça que ens donin).
     El formulari es pot activar abans del canvi de domini: no en depèn.
4. **Desplegar** `main` a producció (`vercel deploy --prod`; si `next/font` peta, `--force`).
5. **Comprovar**:
   - `https://gestgroup.es` porta a `https://www.gestgroup.es/es`, amb certificat.
   - Les adreces velles redirigeixen (`src/data/redirects.ts`): `/gestcost.php`, `/quienes-somos.php`,
     `/nota-legal.php`, l'article del blog…
   - `robots.txt` i el sitemap ja no diuen `noindex`, i porten `www.gestgroup.es`.
   - Enviar el formulari de debò i veure que arriba a la bústia, i que «Responder» contesta a qui l'ha
     omplert.
   - Que encara els arriba el correu (que no s'hagi tocat cap MX).
6. **Google Search Console**: donar d'alta `gestgroup.es` (verificació per DNS) i enviar el sitemap.

## Si algun dia volen

- **Que el formulari surti des de gestgroup.es** en lloc de nertel.ai: verificar el domini a Resend (3
  registres DNS nous a SW Hosting) i canviar `MAIL_FROM`. Amb el seu DMARC en `quarantine`, sense
  verificar-lo no es pot.
- **Estadístiques**: Vercel Web Analytics no posa galetes i no cal bàner. Google Analytics 4 sí que en
  posa, i caldria un bàner de consentiment i refer la política de galetes.

## Encara no fet

- `og:image` pròpia.
