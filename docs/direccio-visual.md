# Direcció visual

Cinc decisions, cadascuna amb d'on ve:

1. **Color dominant: blau nit (#0a0e1c).** És el blau marí del peu de la web actual (#192032),
   enfosquit. Una consultoria que parla de suport 24/7 i de tecnologia; i el degradat del logotip
   llueix sobre fosc. Franges clares (#f3f5fa) per als logos de clients, els serveis i la filosofia,
   que passen a fosc si el sistema està en mode fosc.
2. **Accent: el degradat de l'anell del logotip**, mostrejat del PNG: cian #00bded → cel #3593cb →
   indi #4d46c0 → violeta #9c25b6 → magenta #b00080. Botó principal, xifres i el titular destacat.
   «Gest» és el cel i «group» el magenta, com al logotip.
3. **Titulars: Montserrat 800. Text: Mulish.** Són les dues lletres de la seva web actual (Montserrat i
   Muli). El nom del logotip, en Ubuntu 500, la lletra oberta més propera a la del seu logo.
4. **Motiu gràfic: l'anell en «G».** Gira i creix a la primera pantalla, fa de segell «−30%» a la
   factura i es dibuixa amb el scroll al cicle Kaizen (un cicle de millora contínua és, literalment, un
   anell). Quadrícula fina de full de càlcul al fons de la portada: el seu ofici és mirar números.
5. **Imatges: cap foto de banc d'imatges.** Les de la web actual són genèriques. L'argument es fa amb la
   factura, el cicle i la flota de 800 mòbils (cas real), dibuixats.

Les webs veïnes d'aquesta carpeta són de fons crema o blanc amb serif o grotesques (Ferrés, Casamoner,
càmping) o Poppins (Nertel): aquesta no en repeteix ni el fons ni la lletra.

## El logotip

`GMark` (`src/components/layout/Logo.tsx`) i `src/app/icon.svg` són l'anell redibuixat a partir del PNG
de 59 px de la seva web: tres peces (arc de dalt, arc de baix i falca magenta), resseguides sobre una
quadrícula dels píxels i comprovades superposades a l'original. **Provisional** fins que Gestgroup ens
en passi el vectorial.
