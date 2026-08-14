# Images

Every picture the site draws, what shape it has to be, and what will be cut
off it. Written for whoever is making the file, not for whoever is wiring it
up — the wiring is one line in
[`src/content/projects.js`](../src/content/projects.js).

The shapes themselves are declared in `PROJECT_FIGURES` in that file rather
than in any stylesheet, so the brief and the layout can't disagree. If a
number here and a number there ever differ, that file is right and this doc
is stale.

## The two project figures

A project carries **two different pictures**, not one picture at two sizes.
Reusing one for both is the mistake this section exists to prevent.

| | `image` (banner) | `cover` |
|---|---|---|
| Drawn by | home row, register card, register panel | project page |
| File | `public/projects/<id>.png` | `public/projects/covers/<id>.png` |
| Source size | 1600 × 900 | 1600 × 1000 |
| Ratio | 16 / 9 | 8 / 5 |
| Cropped? | **yes, two ways** | no |
| What it is | a thumbnail that has to read at 314px wide | the project's own drawing at page width |

`cover` is the easy one: it is drawn at its own ratio, uncropped, at roughly
600px wide. Compose it however the drawing wants. None exists yet — every
project carries an empty `cover` and the page draws an empty plate until one
is dropped in.

## `image`: the two crops

The banner is `object-fit: cover` in every view, so it is never squashed —
it is **cut**. Three views, two shapes:

```
 source 1600 × 900                     what each view keeps
 ┌───────────────────────────────┐
 │        ┌─────────────┐        │     closed card   16/9   all of it
 │  bleed │  safe area  │ bleed  │     home row      16/10  ~94% of the height
 │        │             │        │     open panel    ~4/3   ~55–75% of the width
 │        └─────────────┘        │
 └───────────────────────────────┘
   22%          55%         22%
```

- **Closed register card** — 16/9, about 314 × 177. The source's own shape,
  so nothing is lost. This is the crop most people compose for, and it is
  the one that misleads.
- **Home row card** — 16/10, so a sliver off the top and bottom.
- **Open register panel** — the plate becomes the panel's left column, 34%
  of the row wide by the panel's full height. That lands near 4/3, and
  `cover` scales to the height, so **only the middle column of the width
  survives**: about 75% at four across, and less the taller the panel runs.

### The rule

Compose at 1600 × 900 and keep everything that carries the drawing — the
subject, any label, the thing meant to be recognisable at thumbnail size —
inside the **central 55% of the width (pixels 360–1240), at full height**.

Treat the outer 22% on each side as bleed. It fills the closed card and is
gone the moment the panel opens, so it may carry texture, a continuing grid,
a fading line — never a subject, never text.

Nothing may be anchored to the left or right edge, and nothing may rely on
being centred vertically only.

### What sits on top

Two things are drawn over the plate at every size, by `ProjectPlate`, and
must not be painted into the file:

- **The status chip**, top-left, inset 10px, and proportionally larger on
  the open panel.
- **Four registration brackets**, one per corner, at the same 10px inset.

Keep the corners quiet. A busy corner reads as a collision with the chip
rather than as part of the drawing.

### Ink

The plate is a pool of `--color-blueprint-deep` under a 16px millimetre
grid, and the image sits over that grid. A banner with large flat light
areas hides the grid and breaks the plate's whole reason for existing; one
that is transparent in places lets the grid through, which is the intent.
PNG with alpha is the format for that reason.

Both approved families and the palette rules in
[CLAUDE.md](../CLAUDE.md#design-tokens) apply to anything drawn inside a
banner: Monza is fill only, Anzac carries data and eyebrows, and White Ink
is body text.

## Alt text

`imageAlt` and `coverAlt` are the project's own to write, in pt-PT, and
should describe what the drawing shows rather than name the project again —
the title is already beside it. A banner that is pure texture takes an empty
string, which is what the empty default means.

## Everything else

| File | What it is | Notes |
|---|---|---|
| `public/monogram.svg` | the mark on an empty plate | multicolour, so it is used as a `mask-image` and re-inked; never drawn directly |
| `public/favicon.svg` | browser tab | |
| `public/patterns/azulejo.svg` | the tile | 160px intrinsic, exactly 2× the 80px major grid cell — changing that breaks the grid alignment. Strokes must stay **white**; see CLAUDE.md's Patterns section |
| `public/patterns/grain.svg` | paper grain | `feTurbulence`; `baseFrequency` is the coarseness knob |
| `src/assets/images/` | anything a component `import`s | hashed by the bundler, unlike `public/` |

Files in `public/` are referenced by path and never imported, which is why a
new project banner needs no code change at all.
