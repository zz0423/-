# Doudou Reference Composition Rules

Use this when the user says a generated image has a good prop, scale, composition, or atmosphere but the Doudou body, feet, logo, or proportions are wrong.

## Two-Reference Separation

Always split references into two roles:

- **Structure source**: the original Doudou asset from `assets/source/`. This controls all locked IP features: body, pose, proportions, eyes, handle, logo/text, side tag, ankles, feet, and contact shadow.
- **Style/prop reference**: a generated or user-provided image used only for external props, prop size, prop angle, color treatment, scene mood, and lighting.

Never let a style/prop reference override the structure source.

## Required Method

1. Select the exact Doudou source image as the base layer.
2. Lock the entire Doudou character, especially logo/text, side tag, body outline, ankles, feet, and contact shadow.
3. Inspect the style/prop reference only for prop height relative to Doudou body, prop width, distance from Doudou, vertical alignment, material/color/detail level, and background mood.
4. Add or generate only those props around the locked source image.
5. Do not import, copy, or imitate the incorrect Doudou body, feet, logo, or proportions from the style reference.

## Couplets Image 4 Reference

For the current Spring Festival couplet direction, use:

`assets/style-references/couplets-image4-prop-reference.png`

Use it only for:

- Large floor-standing couplet scale.
- Red/gold hanging scroll style.
- Pair placement on both sides of Doudou.
- Warm Spring Festival atmosphere.

Do not use it for:

- Doudou feet or ankles.
- Body shape or proportions.
- Logo/text appearance.
- Side tag placement.
- Eye shape or handle geometry.

## Image 4 + Correct Feet Recipe

When the user asks for "Image 4 + correct feet":

1. Use `assets/source/飞书文档 - 图片 (83).png` or the user-selected source asset as the Doudou base.
2. Keep the entire Doudou character unchanged from the source asset.
3. Match Image 4's couplet prop scale: each couplet should be roughly 65%-75% of the visible Doudou body height, floor-standing, vertical, red with gold details.
4. Place couplets beside Doudou, not touching the front logo/text, side tag, ankles, feet, or body silhouette.
5. Add festive background or lighting only outside locked IP regions.
6. If a generative tool cannot preserve Doudou, output a compositing/edit spec instead of generating a final character.

## Prompt Requirement

Include this sentence whenever using a generated reference:

`Use the generated reference only for prop scale, prop styling, and atmosphere. Do not use it as the character reference. The Doudou character must come from the selected source image unchanged, especially logo/text, proportions, ankles, and feet.`
