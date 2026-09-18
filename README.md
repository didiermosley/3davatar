# 3D Avatar Creator

Chibi-style 3D avatar creator for men and women, with customizable hair, facial hair,
outfits, shoes, accessories, poses and colors. Built with Next.js, Three.js
(React Three Fiber) and zustand. Nothing is loaded from disk or the network: the whole
character is generated from primitives at runtime.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Features

- **Gender** man or woman, with different body proportions
- **Men** bald, buzz, short, quiff, side part and curly hair; chevron, handlebar and pencil
  mustaches; stubble, goatee and full beards
- **Women** short, curly, pixie, bob, long, ponytail and bun hair; skirts; sundress and gown;
  a pregnant option that reshapes the torso and switches dresses to an empire waist
- **Both** skin, hair and eye color; t-shirt, v-neck, tank, long sleeve, hoodie and camo
  uniform; pants, shorts and cargo pants; sneakers, boots, sandals, dress shoes and heels
- **Presets** casual, soldier (camo uniform, cargo pants, helmet, boots), formal and sporty
- **Poses** idle, walk and wave
- **Extras** expressions, glasses, sunglasses, cap, beanie, hat and helmet, background color
- **Camera** drag to orbit, scroll to zoom, optional auto-rotate
- **Export** shareable URL, full-body PNG, and a head-only profile picture as a square or
  circular PNG

See [docs/IMPLEMENTATION_PLAN.md](docs/IMPLEMENTATION_PLAN.md).
