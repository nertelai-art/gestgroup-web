# Gestgroup — web

Proposta de web nova per a [Gestgroup](https://www.gestgroup.es/), consultoria IT de Girona, feta per
Nertel. Next.js 16, Tailwind 4, castellà i català.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

- `pnpm check`: typecheck, lint i proves (també és el hook de pre-push).
- `pnpm demo:link "Nom del lead" --days 15`: enllaç personal per a la demo.

Context, contingut i decisions: [`CLAUDE.md`](CLAUDE.md), [`docs/fonts.md`](docs/fonts.md) i
[`docs/direccio-visual.md`](docs/direccio-visual.md).

**Demo privada.** Mentre sigui una demo, porta el kit de Nertel (enllaç personal i seguiment de la
visita amb PostHog). Si passa a ser la web del client, es treu el kit i **cal revisar l'avís legal i la
política de galetes**, que ara no contemplen aquest seguiment.
