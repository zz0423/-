---
name: doudou-ip-skin-designer
description: Design skins, co-branded variants, and poster-ready applications for the Doudou cartoon IP. Use when Codex needs to transform Doudou reference assets into seasonal costumes, collaboration concepts, campaign key visuals, social posters, ecommerce graphics, stickers, or image-generation prompts while preserving the character's identity and brand constraints.
---

# Doudou IP Skin Designer

## Overview

Use this skill to create new visual directions and final generated images for the Doudou cartoon IP from the bundled source images in `assets/source/`. Favor controlled local edits, production-ready edit prompts, direct image generation with `gpt-image-2`, and poster application guidance over generic brainstorming. Always follow the creative-space rules in `references/skin-change-scale.md` and the source-preservation rules in `references/source-preservation.md`.

## Workflow

1. Identify the task type and activity level: daily activity, S-level or below, S+ activity, special award/trophy peripheral, collaboration skin, poster application, or mixed campaign concept.
2. Select one exact source asset before writing final direction. Run `scripts/build_asset_index.py` when the asset list may be stale.
3. Read `references/brand-guidelines.md` for the non-negotiable Doudou identity rules.
4. Read `references/skin-change-scale.md` and choose the allowed creative-space percentage before designing.
5. Read `references/source-preservation.md` before any image generation or editing. If any prior attempt changed proportions, front body outline, side thickness, rounded corners, feet, ankles, logo/text, side tag, eye centers, eye spacing, eye height, eye protrusion, or handle, stop text-only generation and switch to source-image editing/mask guidance.
6. Read `references/reference-composition.md` when the user wants to combine a good generated prop/style reference with the correct Doudou body, feet, logo, or proportions.
7. Read `references/skin-styles.md` for task-specific guidance and prompt patterns.
8. For final image generation, apply the premium 3D render and color preset from `references/brand-guidelines.md`: source-like vivid fluorescent coral-red / magenta-red body, peach-orange gradient only on the upper-left/front-left area, deep burgundy feet, matte frosted soft PVC material, subtle subsurface scattering, glossy expressive eyes, woven fabric side tag, studio global illumination, and high material contrast.
9. Produce the requested artifact:
   - For image editing: write a clear edit prompt that names the chosen source asset, locked areas, editable mask areas, skin elements, background, lighting, composition, and output ratio.
   - For final image generation: use `gpt-image-2` with the selected source asset(s) as image reference/edit input. Default to 1:1 ratio, white or transparent background, and 4 independent generated images by running 4 separate one-image generations. Each image must use a different action/pose and a different eye-based expression while preserving the same locked identity. Do not ask one generation to create a collage, grid, four-panel layout, contact sheet, or multiple candidates inside a single image. Do not use text-only generation for final Doudou skins.
   - For image generation concepts: use text-only generation only for rough concept exploration. Do not present it as a final Doudou skin unless an image-reference/edit workflow preserves the source structure. After one failed attempt involving anatomy, logo/text, mouth, hands, or proportion drift, do not retry text-only generation.
   - For poster use: include layout, headline zone, product or partner logo zone, CTA or QR zone, safe margins, and export sizes.
   - For concept exploration: provide 3-6 distinct directions with palette, costume/accessory changes, scene, and use case.
10. Run the quality checklist before finalizing.

## Asset Handling

Source assets live in `assets/source/` and are the visual truth for Doudou. Do not invent a different character body, face, silhouette, or temperament unless the user explicitly asks for a radical redesign.

When multiple assets fit, choose the one with the closest pose and expression to the requested use. If the requested output is a poster, prefer a source image with enough clean silhouette and empty surrounding area for composition.

For image generation or editing, use the selected source image as an actual image reference/edit input whenever tools allow it. Do not rely on text-only reconstruction for Doudou unless the user explicitly accepts a loose concept sketch. If the tool cannot preserve the exact source image structure, produce a prompt/spec instead of pretending the result is a final skin.

Use `references/asset-index.md` for dimensions and filenames. If new files are added, refresh it with:

```bash
python3 scripts/build_asset_index.py
```

## Identity Lock

Preserve:

- Doudou as a cute cartoon character, not a realistic human or animal.
- The original facial proportions, eye style, exact eye centers, eye spacing, eye height, eye protrusion depth, head/body relationship, and friendly tone from the source image.
- The exact IP proportions, pose, front body outline, side thickness, rounded shopping-bag silhouette, handle position, feet position, side-tag placement, soft material, and overall volume from the selected source image.
- Doudou's no-hands and no-mouth identity. Doudou has eyes, a shopping-bag body, handle, feet, and side tag, but no arms, hands, fingers, mouth, lips, teeth, or tongue.
- The premium 3D commercial material/color system: source-like vivid fluorescent coral-red / magenta-red body, peach-orange gradient only on the upper-left/front-left area, deep burgundy feet, matte frosted soft PVC material with subtle SSS on edges, glossy dimensional eyes, source-like rainbow handle colors, and realistic woven fabric side tag.
- The Douyin Mall front watermark/logo/text exactly as it appears in the source image. Do not redraw, translate, stylize, blur, replace, or alter it.
- The recognizable silhouette and core color relationships unless a campaign concept explicitly requires a limited recolor.
- Clean, polished commercial illustration quality suitable for brand and campaign use.

Change:

- Clothing, accessories, props, small surface patterns, scene, lighting, seasonal details, recruitment cues, partner cues, and poster layout.
- Prop placement may be close and integrated: body-supported, foot-supported, strap-mounted, clip-mounted, furniture-supported, or nestled on the seat/lap area, as long as no hands or mouth are added and locked identity regions stay readable.
- Backpacks and body-mounted accessories can be added only as separate behind-body attachments or surface overlays. They must not alter Doudou's red body outline, side thickness, top rim, bottom curve, rounded corners, or logo plane.
- Hats must use one of two approved Doudou placement modes: top-brim mode across the top-front rim with the brim covering the top edge and partially covering the lower/front rainbow handle, or side-worn mode attached to the upper side/top side near the handle. Do not use generic floating human hat placement.
- Medium and large props should follow the positive side-mounted scale reference when relevant: attach close to the front-side edge with real body contact, usually 45%-60% of visible body height, fixed by a short strap/clip/bracket on safe blank areas, never floating far away or covering the logo/eyes/feet/side tag.
- For sports, jumping, running, kicking, or other dynamic actions, preserve Doudou's feet as exactly two short deep-burgundy rounded capsule feet with extremely short dark-red connectors. Express motion through body tilt, prop position, motion streaks, and shadows, not through long legs, knees, shoes, stretched feet, detached feet, or extra feet.
- Eye expression can vary only through pupil direction, eyelid/eye-cover shape, star reflections, and glossy reflection details. Do not move the eye centers, resize the eyes, change eye spacing, flatten protruding eyes, or reposition eyes for accessories.
- Color accents when they serve the theme and still leave Doudou recognizable.
- Theme colors may appear only as accessories, local accents, trims, props, or tiny safe-area overlays. Do not recolor the whole Doudou body or erase the source-like coral-red/magenta-red body identity.
- Creative changes only within the allowed percentage from `references/skin-change-scale.md`.
- Only areas outside the locked face, body structure, logo/watermark, side tag, handle, and feet unless the user explicitly supplies an approved mask.

Avoid:

- Overloading the character with too many props.
- Hiding the face, eyes, or main silhouette.
- Any deformation of Doudou's body proportion, pose, handle geometry, feet scale, side-tag location, or shopping-bag form.
- Any body reshaping caused by backpacks, straps, clothing, capes, furniture, or props, including widening, slimming, pinching, bending, folding, adding shoulders, or changing the side thickness.
- Any incorrect hat placement, including a floating hat, a hat perched only on the handle, a hat that ignores the top rim, or a hat that creates a human head/neck/shoulders.
- Any color/material drift from the source Doudou identity, including orange overall body, dull red, brown-red, purple-red, hot pink, pastel pink, metallic/glassy/clay body, missing peach-orange upper-left gradient, missing deep burgundy feet, or wrong rainbow handle colors.
- Any movement, resizing, flattening, replacement, or re-spacing of the eyes. Glasses and eye accessories must fit over the original eye positions as overlays.
- Adding arms, hands, fingers, a mouth, lips, teeth, tongue, facial smile lines, speech expression marks, or any literal hand-holding gesture. Props can touch or overlap safe blank body/furniture/foreground areas, point near the face, or sit between the feet, but must be supported by body contact, feet, straps, clips, furniture, or scene composition.
- Any change to the Douyin Mall watermark/logo/text, including hallucinated text, unreadable characters, extra letters, changed orientation, changed color, or regenerated typography.
- Using partner elements so strongly that Doudou becomes a mascot for a different brand.
- Adding text into generated character art unless the user requests a final poster image with typography.

## Output Patterns

Default final image-generation settings:

- Model: `gpt-image-2`.
- Output: 4 independent images per request unless the user asks for a different count. Generate them as 4 separate one-image calls/prompts, not as one multi-image collage prompt.
- Ratio: 1:1.
- Background: white or transparent. Use white by default when the tool cannot guarantee transparency; use transparent when requested or supported.
- Variation: each of the 4 images must have a distinct action/pose and a distinct eye-based expression. Vary posture, foot placement, prop angle, pupil direction, eyelid/eye-cover shape, star/reflection details, and view when useful. Do not vary by changing the locked body, eyes, feet, handle, side tag, or logo.
- View: prefer 3/4 view for front-facing skin concepts, but the 4 outputs may include front, 3/4, side-leaning, or back-revealing views when the requested theme benefits from view variation and the closest source asset supports it.
- Priority: preserve Doudou identity first, then apply the requested skin, prop, campaign, recruitment, or collaboration theme.

For a seasonal skin, include:

- Theme and emotional keyword.
- Costume/accessory changes.
- Palette with 3-5 colors.
- Background or prop system.
- Image prompt and negative prompt.
- Suggested poster or social application if useful.

For a collaboration skin, include:

- Partner/category reading, such as beverage, tech, travel, game, fashion, city culture, or festival venue.
- Which partner cues become costume, props, packaging, or background.
- How to keep partner cues secondary to Doudou.
- Lockup or logo placement guidance for poster applications.

For campaign priorities, rank concepts in this order unless the user specifies otherwise:

1. Major promotion and ecommerce campaign nodes, such as 618, 11.11, 12.12, New Year sale, anniversary sale, member day, category day, launch day, and limited-time offers.
2. Recruitment scenarios, such as campus hiring, social hiring, onboarding, interviewer, offer celebration, team culture, and workplace event visuals.
3. Brand collaboration scenarios, such as beverage, food, fashion, tech, game, travel, city culture, venue, or product-launch collaborations.

For a poster application, include:

- Format and ratio, such as 1:1 social, 3:4 key visual, 9:16 story, or 16:9 banner.
- Visual hierarchy: Doudou, campaign message, product/partner, CTA.
- Composition grid, safe areas, and export notes.
- Optional image-generation prompt for the background or full visual.

## Quality Checklist

Before finalizing, verify:

- There are 4 output images unless the user asked for a different count.
- The 4 outputs are separate standalone images/files, not a collage, grid, contact sheet, four-panel image, or image with A/B/C/D labels.
- All 4 images use white or transparent backgrounds.
- The 4 images differ in action/pose and eye-based expression without changing the locked identity.
- Doudou remains immediately recognizable from the source asset.
- The output overlays closely with the source asset in pose, proportions, front body outline, side thickness, rounded corners, silhouette, eye centers, eye spacing, eye height, eye protrusion, handle, feet, and side tag.
- Backpacks, straps, capes, clothing, and body-mounted props appear as separate attachments/overlays and do not change the red body base mesh or logo plane.
- Hats follow an approved mode: top-brim hats cover the top body edge and partly cover the lower/front handle without moving eyes/handle; side-worn hats attach to the upper side/top side without covering logo, side tag, eyes, or feet.
- No hands, arms, fingers, mouth, lips, teeth, tongue, or literal hand-holding gestures have been added.
- Feet and ankles match the selected source image exactly: two short dark-red leg/ankle connectors plus two smooth rounded red feet, with the same scale, spacing, pose, and contact-shadow logic.
- For sports/jumping/running outputs, the two feet remain close to the lower body, no farther than about one foot-height below the bag body, with no knee-like bends or human stride anatomy.
- For seated or reclining scenes, feet remain two smooth rounded red forms in the foreground or on the seat cushion, with very short dark-red connectors and no knees, long legs, human soles, or thin feet.
- Eyes remain expressive but mouth-free: vary emotion through eyelid shape, pupil direction, black pupil cutout shape, star pupils, eye scale, eye tilt, and glossy reflections, never through a mouth.
- Eye placement remains locked: no change to eye centers, spacing, height, protrusion depth, or attachment points. Glasses/goggles/lenses are transparent overlays aligned to the original eyes.
- Render quality matches the source samples: premium 3D, smooth commercial IP finish, matte soft PVC body, glossy eyes, woven side label, studio-grade global illumination, soft shadows, and high material contrast.
- Color/material matches the provided standard IP image: vivid fluorescent coral-red / magenta-red dominant body, peach-orange gradient only on the upper-left/front-left area, darker side shading, deep burgundy feet, source-like rainbow handle, satin-matte soft PVC finish, and unchanged white logo/text.
- The Douyin Mall watermark/logo/text is unchanged and clearly readable; if it is changed, the result fails.
- The skin concept has one clear theme, not several competing themes.
- Accessories do not cover the face or distort the silhouette.
- Poster layouts leave readable space for headline, logo, and CTA.
- The prompt names the exact source asset when generating or editing images.
- The selected creative-space percentage is stated and follows the user's activity level.
- Daily activity or S-level-and-below requests stay within 20%-60% creative space.
- S+ requests stay within 60%-80% creative space.
- 100% redesign is rejected unless the user asks for a special award/trophy peripheral.
- The output is specific enough for another image model or designer to execute without guessing.

## References

- `references/brand-guidelines.md`: Doudou identity rules, allowed edits, and constraints.
- `references/skin-change-scale.md`: Required creative-space levels and hard limits.
- `references/source-preservation.md`: Exact logo, watermark, proportion, and local-edit rules.
- `references/reference-composition.md`: How to use generated references for props only while preserving the source Doudou body.
- `references/skin-styles.md`: Seasonal, collaboration, and poster application patterns.
- `references/asset-index.md`: Source asset inventory generated from `assets/source/`.
