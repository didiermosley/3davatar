# Avatar Creator – Implementation Plan

## Stack
- Next.js 16 (App Router, TypeScript, Tailwind v4)
- Three.js via @react-three/fiber + @react-three/drei
- zustand for avatar state

## Architecture
```
src/
  lib/avatar/
    types.ts      AvatarConfig, Gender, Pose, option ids
    options.ts    catalogs: colors, hair, facial hair, tops, bottoms, shoes, accessories, poses
    defaults.ts   per-gender defaults + normalization when gender changes
    presets.ts    one-click outfits (casual, soldier, formal, sporty)
    share.ts      encode/decode config <-> URL hash
    export.ts     PNG download, square and circular crop
    store.ts      zustand store: set, setGender, applyPreset, randomize, reset, load
  components/avatar/
    dims.ts            shared proportions and per-pose limb rotations
    materials.tsx      skin, cloth, procedural camo texture, color darkening
    Lights.tsx         shared three-point rig used by both canvases
    AvatarCanvas.tsx   full-body scene, ground plane, contact shadow, orbit + scroll zoom
    ProfileCanvas.tsx  head-only scene for the profile picture
    Avatar.tsx         composes body, outfit and head
    HeadAssembly.tsx   head + hair + facial hair + accessory, shared by both canvases
    parts/             Body, Limbs, Shoe, Head, Hair, FacialHair, Outfit, Accessory
  components/ui/
    Creator.tsx        page shell: canvas, profile thumbnail, scrollable side panel
    Panel.tsx          sections for every option group
    OptionGrid.tsx     button grid, PresetPicker, ColorPicker, GenderToggle, Toggle
    Toolbar.tsx        randomize / reset / rotate / share / three PNG exports
```

## Avatar model
Chibi clay character built from primitives: oversized head, soft rounded-box torso,
capsule limbs, mitten hands. Origin at the feet, about 2.7 units tall. Every part reads
`AvatarConfig` and re-renders on change, so no assets are downloaded.

Gender drives body proportions and which option sets are offered. Poses are limb rotations
resolved from a table in `dims.ts`, so adding a pose does not touch the meshes.

## Features
| Scope  | Feature |
|--------|---------|
| Men    | mustache, beard, haircut, t-shirt, pants |
| Women  | hair style, t-shirt, pants, skirt, dress, pregnant option |
| Both   | skin color, hair color, shoe style and color |
| Extra  | eye color, expression, poses, accessories, uniform and cargo camo, outfit presets, background, randomize, reset, share link, full-body PNG, square and round profile PNG |

## Phases
1. Scaffold Next.js, install three / fiber / drei / zustand
2. Domain layer: types, catalogs, defaults, presets, store, share and export helpers
3. 3D: proportions, materials, lighting, body and head
4. 3D: hair, facial hair, outfits, shoes, accessories, poses
5. UI: panel, option grids, color pickers, toolbar, profile thumbnail
6. Polish: URL sync, PNG exports, lint and build green, screenshot review
