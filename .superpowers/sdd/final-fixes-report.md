# Final fixes report

## RED / GREEN

| Item | RED evidence | GREEN evidence |
| --- | --- | --- |
| Current page state | `SiteHeader marks the current route in desktop and mobile navigation` failed because `SiteHeaderProps`, `aria-current`, active styling, and six page props were absent. | `currentPath` is passed by `/` and all five inner pages; desktop and mobile links set `aria-current="page"` and use `site-header-active`. |
| Header contrast | `opaque header surfaces retain 4.5:1 navigation contrast over stone` failed on `bg-night/70`. | Header is opaque `bg-night`; `.glass` is opaque `--jt-night-2`. Calculated contrasts: ink-2/night 8.80:1, gold/night 10.14:1, ink-2/night-2 8.24:1, gold/night-2 9.49:1. |
| Stone hover | `center visit link does not switch to low-contrast gold on stone hover` failed because of `hover:text-gold`. | The link keeps its stone-safe text token and adds an underline on hover. |
| Build plan | `redesign plan builds root mode explicitly and Pages mode by default` failed because it used `GITHUB_PAGES`. | Root build now uses `JINTAI_ROOT_PATH='1'`; default `npm run build` is documented as the Pages build. |
| Inquiry-note selector | The exact explanatory paragraph already existed, so this test-hardening assertion passed immediately. | `tests/homepage-structure.test.mjs` now targets `<p className="text-base leading-relaxed text-ink-3">{inquiry.note}</p>` rather than any `text-ink-3` occurrence. |

Initial RED command: `node --test tests/final-fixes.test.mjs` — 4 expected failures, 1 existing-correct selector assertion pass.

GREEN command: `node --test tests/final-fixes.test.mjs tests/homepage-structure.test.mjs` — 15 pass, 0 fail.

## Verification

- `JINTAI_ROOT_PATH=1; npm run build` — pass; root-path static export generated.
- `npm run build` — pass; default Pages export generated.
- `npm test` — 43 pass, 0 fail after the default build refreshed `out/`.
- `npm run test:content` — 3 pass, 0 fail.
- `npm run lint` — pass (Next emitted its existing multiple-lockfile workspace-root warning).
- `git diff --check` — pass.

## Browser evidence

Attempted to connect the required browser-control runtime to `http://127.0.0.1:4173/jintai-ai-site/`. The runtime returned `No browser is available`; therefore neither the desktop Header scrolled over stone nor the mobile menu opened over the stone Hero could be visually rechecked in this environment. No visual evidence is claimed.

## Self-review

- Changes are limited to the requested navigation state, opacity/contrast, stone-link hover, plan commands, and test specificity.
- The opaque Header and mobile menu use token-backed dark surfaces; the regression test evaluates actual foreground/surface color pairs.
- No credentials, content claims, or unrelated cleanup were introduced.

## Commit

`5e6e77f fix: harden portal navigation accessibility`
