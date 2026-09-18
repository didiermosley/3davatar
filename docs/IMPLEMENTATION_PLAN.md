# Avatar Creator – Implementation Plan

## Stack
- Next.js 16 (App Router, TypeScript, Tailwind v4)
- Three.js via @react-three/fiber + @react-three/drei
- zustand for avatar state

## Architecture
```
src/
  lib/avatar/
    types.ts      AvatarConfig, Gender, option ids
    options.ts    catalogs: colors, hair styles, facial hair, outfits, shoes, accessories
    defaults.ts   per-gender defaults + validation when gender changes
    share.ts      encode/decode config <-> URL hash
    store.ts      zustand store: set, setGender, randomize, reset, load
  components/avatar/
    AvatarCanvas.tsx   R3F canvas, lights, controls, shadows
    Avatar.tsx         composes body parts from config
    parts/             Body, Head, Hair, FacialHair, Outfit, Shoes, Accessory
  components/ui/
    Creator.tsx        page shell (canvas + side panel)
    Panel.tsx          sections + collapsible groups
    OptionGrid.tsx     button grid for style choices
    ColorPicker.tsx    swatch presets + native color input
    Toolbar.tsx        randomize / reset / share / download PNG
```

## Avatar model
Procedural low-poly character built from primitives (spheres, capsules, rounded boxes,
partial spheres for hair caps). Origin at feet, ~2.4 units tall. Every part reads
`AvatarConfig` and re-renders on change; no asset downloads.

Gender drives body proportions (shoulder/hip width) and which option sets are available.

## Features
| Scope  | Feature |
|--------|---------|
| Men    | mustache, beard, haircut, t-shirt, pants |
| Women  | hair style, t-shirt, pants, dress, skirt |
| Both   | skin color, hair color, shoe style + color |
| Extra  | eye color, expression, accessories (glasses, sunglasses, cap, beanie, hat), background color, randomize, reset, share link, PNG export, auto-rotate |

## Phases
1. Scaffold Next.js, install three / fiber / drei / zustand
2. Domain layer: types, option catalogs, defaults, store, share codec
3. 3D: canvas + body + head + face
4. 3D: hair, facial hair, outfits, shoes, accessories
5. UI: panel, option grids, color pickers, toolbar
6. Polish: URL sync, PNG export, lint + build green
