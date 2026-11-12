# Passar el web a gestgroup.es

Gestgroup ha triat l'**opció A**: el web es queda a Vercel (projecte `gestgroup-web`, pla Pro) i ells
només canvien els DNS del seu domini. Aquí hi ha com ho tenen ara, què els cal demanar i què es fa el dia
del canvi. Consultat el 12-11-2026 des de fora (DNS i pàgines), sense entrar a cap panell seu.

## Com ho tenen ara

- **Domini i DNS**: SW Hosting (`dns3.swhosting.com`, `dns4.swhosting.com`).
- **Web vella**: PHP sobre una plantilla Bootstrap + jQuery (2017), feta i mantinguda per **Blaupixel**
  (Girona), al servidor de SW Hosting `81.25.125.149` (`CE2021041312002.dnssw.net`). `www` és un CNAME
  de l'arrel. Només en castellà. El bàner de galetes també és de Blaupixel (`bpx-rgpd`).
- **Correu**: Microsoft 365 (MX `gestgroup-es.mail.protection.outlook.com`, `autodiscover` a Outlook).
  Hi ha un segon MX cap al servidor de SW Hosting.
  - SPF: `v=spf1 a mx include:spf.ipzmarketing.com include:protection.outlook.com -all`
  - DMARC: `p=quarantine`. Un correu mal autenticat que digui ser de gestgroup.es va a correu brossa.
- **Formulari vell** (`contactar.php`): nom, email, telèfon, web i missatge, amb un camp parany
  («atrapalo»). L'envia el mateix servidor PHP; no sabem a quina adreça.

## Què els hem de demanar

1. **Accés als DNS** de SW Hosting, o que Blaupixel hi faci els canvis que li passem.
2. **Formulari**: com l'envia ara la web vella (quin servidor SMTP i quina bústia) i **a quina adreça**
   volen rebre les sol·licituds. Necessitem una bústia de gestgroup.es per enviar: servidor, port,
   usuari i contrasenya. Dues possibilitats:
   - **Bústia del seu allotjament (SW Hosting)**: és el que s'assembla més al que tenen. L'SPF ja
     l'autoritza (`mx`). Si algun dia donen de baixa l'allotjament de SW Hosting, el formulari deixa
     d'enviar.
   - **Bústia de Microsoft 365**: cal que l'administrador hi activi l'enviament SMTP autenticat.
     Microsoft està retirant l'accés amb usuari i contrasenya per SMTP; si ja no el permet, caldria
     una aplicació registrada (OAuth), que és més feina. Cal comprovar-ho amb ells.
3. **Revisió de l'avís legal** (el va redactar Nertel) i de la **política de galetes**, que és la de la web
   vella i descriu galetes que el web nou no posa (no en posa cap).
4. **Canvis que vulguin tenir fets** abans d'estrenar-lo.

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
   - `CONTACT_SMTP_HOST`, `CONTACT_SMTP_PORT`, `CONTACT_SMTP_USER`, `CONTACT_SMTP_PASS`,
     `CONTACT_MAIL_FROM`, `CONTACT_MAIL_TO` (vegeu `.env.example`).
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

## Encara no fet

- Política de galetes i avís legal definitius (depenen de la revisió de Gestgroup).
- `og:image` pròpia.
