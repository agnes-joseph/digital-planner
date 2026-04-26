# Digital Planner — Project Context

A cross-platform productivity app for neurodivergent users (ADHD-focused). Combines project/task management, calendar time blocking, a Pomodoro timer, a 28-day cycle tracker, and lightweight insights. Designed to be calm, low-stimulation, and decluttered — a visual replacement for a bullet journal + to-do app.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 19 with TypeScript |
| Build tool | Vite 8 |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` plugin |
| Component library | shadcn (`base-lyra` style) |
| Headless primitives | `@base-ui/react` (not Radix UI) |
| Variant management | `class-variance-authority` (cva) |
| Class merging | `clsx` + `tailwind-merge` via `cn()` |
| Icons | Phosphor |
| Font | JetBrains Mono Variable (`@fontsource-variable/jetbrains-mono`) |
| Animations | `tw-animate-css` |

---

## Project Structure

```
src/
  components/
    ui/          # shadcn components — auto-generated, do not hand-edit
  lib/
    utils.ts     # cn() helper (clsx + tailwind-merge)
  App.tsx
  index.css      # Global styles + Tailwind entry point + shadcn CSS vars
  main.tsx
public/
  favicon.svg
  icons.svg
components.json  # shadcn config (style, aliases, icon library, registry)
vite.config.ts
```

---

## Tailwind v4

Tailwind is configured entirely in CSS — there is no `tailwind.config.js`.

- Entry: `@import "tailwindcss"` at the top of `src/index.css`
- Theme tokens are declared in an `@theme inline { }` block in `src/index.css`
- CSS variables (e.g. `--background`, `--primary`) are mapped to Tailwind utilities via `@theme inline`
- Dark mode uses the `.dark` class variant (not `prefers-color-scheme`)
- Custom dark variant: `@custom-variant dark (&:is(.dark *))`

---

## shadcn Component System

shadcn is configured via `components.json` with the `base-lyra` style.

**Key differences from default shadcn:**
- Primitives come from `@base-ui/react` instead of Radix UI
- Components live at `src/components/ui/`
- Path alias `@/components/ui` resolves to that directory

**Adding components:**
```bash
npx shadcn add <component-name>
```
Components are copied into `src/components/ui/` and are fully owned by the project — edit them freely after adding.

**Component conventions:**
- Variants defined with `cva()` from `class-variance-authority`
- All className merging goes through `cn()` from `@/lib/utils`
- Components accept a `className` prop for local overrides
- `data-slot` attributes used for targeted CSS selection within compound components

---

## Path Aliases

| Alias | Resolves to |
|---|---|
| `@/*` | `src/*` |
| `@/components` | `src/components` |
| `@/components/ui` | `src/components/ui` |
| `@/lib` | `src/lib` |
| `@/hooks` | `src/hooks` |

---

## Design System

Three style explorations live in the Figma file "Pomodoro Timer" on the "Design system exploration" page:
- **Style 1 — Calm Tide**: Warm sage greens, Inter, 6/10/14px radius
- **Style 2 — Retro Mono**: Sharper geometry (2/4/6px), JetBrains Mono, more visible borders
- **Style 3 — Dark Calm**: Near-black base (`#0D0E11`), low-contrast type, muted teal accent, futuristic/Tide-inspired

Token source: `/Users/agnesjoseph/1-Projects/2026/Code/# resources/design_system_tokens.txt`
