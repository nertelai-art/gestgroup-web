# Direcció visual

Cinc decisions, cadascuna amb d'on ve:

0. **Dos temes.** Fosc (el de sempre) i clar (fons #f4f6fb, targetes blanques, tinta #141a2e), a
   petició de l'usuari (23-10-2026): el fosc sol se li feia massa fosc. Mateixos accents en tots dos.
1. **Color dominant (tema fosc): blau nit (#0a0e1c).** És el blau marí del peu de la web actual (#192032),
   enfosquit. Una consultoria que parla de suport 24/7 i de tecnologia; i el degradat del logotip
   llueix sobre fosc. Franges clares (#f3f5fa) per als logos de clients, els serveis i la filosofia,
   que passen a fosc si el sistema està en mode fosc.
2. **Accent: el degradat de l'anell del logotip**, mostrejat del PNG: cian #00bded → cel #3593cb →
   indi #4d46c0 → violeta #9c25b6 → magenta #b00080. Botó principal, xifres i el titular destacat.
   «Gest» és el cel i «group» el magenta, com al logotip.
3. **Titulars: Montserrat 800. Text: Mulish.** Són les dues lletres de la seva web actual (Montserrat i
   Muli). El nom del logotip, en Ubuntu 500, la lletra oberta més propera a la del seu logo.
4. **Motiu gràfic: el paper de factura.** La primera pantalla és una pila de factures de paper (les
   àrees que revisen) que l'auditor marca amb magenta; números de factura en monoespaiada del sistema,
   com un tiquet. El degradat de l'anell del logotip omple el dial del mètode, un segment per fase.
   Res de logotips que giren ni de xips de xifres flotants: l'usuari els va descartar (23-10-2026).
5. **Imatges.** L'argument es fa sobretot amb la factura, el cicle i la flota de 800 mòbils (cas real),
   dibuixats. A «Qué hacemos» l'usuari va demanar fotos (23-10-2026): són tres fotos de banc d'imatges
   **de la seva web actual** (slider-6, help-desk-3, slider-4), retallades i sense l'enfosquiment que hi
   tenien. Provisionals: el millor seria fotos pròpies de Gestgroup. No es van poder generar (Hugging
   Face sense crèdit i Gemini sense facturació).

Les webs veïnes d'aquesta carpeta són de fons crema o blanc amb serif o grotesques (Ferrés, Casamoner,
càmping) o Poppins (Nertel): aquesta no en repeteix ni el fons ni la lletra.

## El logotip

`GMark` (`src/components/layout/Logo.tsx`) i `src/app/icon.svg` són l'anell redibuixat a partir del PNG
de 59 px de la seva web: tres peces (arc de dalt, arc de baix i falca magenta), resseguides sobre una
quadrícula dels píxels i comprovades superposades a l'original. **Provisional** fins que Gestgroup ens
en passi el vectorial.
