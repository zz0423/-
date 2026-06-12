# Doudou Skin Styles

## Default Generation Settings

For final generated images, use `gpt-image-2` with the selected source image(s) as image reference/edit input. Default output is 4 independent images produced by 4 separate one-image generations, 1:1 ratio, white or transparent background, and distinct action/expression variation across all outputs. Use 3/4 view by default for front-facing skin concepts, and use front, side, back-revealing, or pose variation only when the closest source assets support it.

Default background: use white or transparent. Use white when the tool cannot guarantee transparency; use transparent when requested or supported. Avoid black backgrounds unless the user explicitly asks for black studio renders.

Default render quality: highly refined 3D commercial IP render, seamless material transitions, matte frosted soft PVC/silicone body with source-like vivid fluorescent coral-red / magenta-red dominant color, soft peach-orange gradient only on the upper-left/front-left body area, darker red side shading, deep burgundy feet, subtle SSS on rounded edges, glossy dimensional eyes with shaped black pupil cutouts, realistic woven black side tag, soft studio global illumination, crisp silhouette, soft contact shadows, and high material contrast.

Always include the no-hands/no-mouth lock in final prompts: Doudou has no hands and no mouth; do not add arms, hands, fingers, a mouth, lips, teeth, tongue, smile lines, speech marks, or literal hand-holding gestures. If a user asks Doudou to hold, drink, eat, talk, or bite something, convert that request into close integrated prop use: body-supported, foot-supported, strap-mounted, clip-mounted, furniture-supported, seat/lap placement, or a prop angled near the face without creating a mouth.

For sports, jumping, running, kicking, or fast-action prompts, add a sports-foot lock: Doudou must keep exactly two short deep-burgundy rounded capsule feet with extremely short dark-red connectors, close to the lower body. Motion must come from body tilt, airborne spacing, prop position, motion streaks, and shadow, not from long legs or stretched feet. Negative terms must include: long legs, knees, calves, shoes, sneakers, toes, thin feet, stretched feet, dangling legs, detached feet, extra feet, noodle legs, human stride anatomy.

## Four-Image Variation Rule

Every default final request should produce 4 candidate images as separate standalone outputs. Run four one-image generations instead of asking one generation to create four candidates. The four images must differ meaningfully while preserving Doudou's locked identity.

Vary:

- Action/pose: standing, stepping, leaning, sitting, reclining, jumping, running, turning, or presenting the prop, depending on the request.
- Eye-based expression: curious, excited/star-eyed, focused/half-lidded, surprised, relaxed, determined, or nervous through eyes only.
- Prop integration: body-supported, foot-supported, strap/clip-mounted, furniture-supported, face-adjacent, or foreground-nested.
- View if useful: front, 3/4, side-leaning, or back-revealing, using the closest source asset.

Do not vary:

- Eye centers, eye spacing, eye height, or eye protrusion.
- Body outline, side thickness, rounded corners, logo plane, handle, side tag, feet structure, or material identity.
- Presence of hands, arms, mouth, human facial features, human legs, or human torso anatomy.
- Sports/action foot structure: the two short capsule feet and very short connectors must stay source-faithful; vary only foot angle and placement, not anatomy.

Do not output:

- A collage, grid, contact sheet, four-panel image, side-by-side candidates, A/B/C/D labels, numeric labels, captions, or extra text.

Default scenario priority:

1. Major promotion and ecommerce campaign nodes.
2. Recruitment and workplace scenes.
3. Brand collaboration scenes.

## Major Promotion Skins

Use major promotion skins when the user asks for ecommerce campaigns, shopping festivals, launch promotions, category days, member days, anniversary sales, or big-event commercial visuals.

Common directions:

- 618 or mid-year sale: clean promotional props, ribbon, gift boxes, price-tag-shaped decor without readable price text, energetic red/yellow accents.
- 11.11 or 12.12: shopping cart or podium props, gift stacks, confetti, limited-time visual cues, strong ecommerce atmosphere.
- New Year sale or anniversary sale: red/gold celebration cues, badges, lucky knots, fireworks-inspired background shapes, polished commercial lighting.
- Category day or product launch: product pedestal, packaging props, category icons, clean brand space.

Major promotion prompt structure:

`Run 4 separate one-image generations with gpt-image-2 using [source filename(s)] as image reference/edit input. Each output is a standalone 1:1 image with white or transparent background. Do not create a collage, grid, four-panel layout, contact sheet, labels, captions, or A/B/C/D marks. Theme: [promotion node]. Give each one-image prompt a different action/pose and a different eye-based expression while preserving Doudou's exact shopping-bag body, source-like vivid fluorescent coral-red / magenta-red dominant body color, soft peach-orange gradient only on the upper-left/front-left body area, darker red side shading, matte frosted soft PVC material, subtle SSS on rounded edges, glossy dimensional eyes with shaped black pupil cutouts, rainbow handle, two deep burgundy rounded feet with very short dark-red connectors, woven black side fabric tag, Douyin Mall watermark/logo/text, proportions, and source-view structure. Doudou has no hands and no mouth; do not add arms, hands, fingers, mouth, lips, teeth, tongue, smile lines, speech marks, or literal hand-holding gestures. Add [promotion accessories/props] as close integrated props: body-supported, foot-supported, strap-mounted, clip-mounted, furniture-supported, or angled near the face without creating a mouth. Keep the logo/text clear and unchanged. Highly refined 3D commercial IP render, soft studio global illumination, crisp silhouette, soft contact shadows, high material contrast, campaign-ready. Negative: hands, arms, fingers, mouth, lips, teeth, tongue, human eyebrows, hand-holding pose, mouth drinking/eating pose, changed logo, unreadable logo, deformed body, orange overall body, dull red, brown-red, hot pink, missing burgundy feet, long legs, knees, thin feet, changed feet, changed handle, changed side tag, cheap plastic, flat illustration, different character.`

## Recruitment Skins

Use recruitment skins when the user asks for campus hiring, social hiring, onboarding, offer celebration, internal culture, interviewer, workplace, job fair, or team event visuals.

Common directions:

- Campus hiring: graduation cap as a wearable accessory, offer letter as a floor or background prop, clean campus/career fair cues.
- Social hiring: office badge clipped to a safe non-logo area, laptop or resume props leaning against Doudou or resting on a chair/desk surface, simple workplace set.
- Onboarding: welcome gift box, name-badge motif, team-color ribbons, cheerful office background.
- Offer celebration: confetti, envelope prop, podium, celebration lighting without adding hands or a mouth.

Recruitment prompt structure:

`Run 4 separate one-image generations with gpt-image-2 using [source filename(s)] as image reference/edit input. Each output is a standalone 1:1 image with white or transparent background. Do not create a collage, grid, four-panel layout, contact sheet, labels, captions, or A/B/C/D marks. Theme: [recruitment scenario]. Give each one-image prompt a different action/pose and a different eye-based expression while preserving Doudou's exact IP structure, source-like vivid fluorescent coral-red / magenta-red dominant body color, soft peach-orange gradient only on the upper-left/front-left body area, darker red side shading, matte frosted soft PVC material, subtle SSS on rounded edges, glossy dimensional eyes with shaped black pupil cutouts, rainbow handle, two deep burgundy rounded feet with very short dark-red connectors, woven black side fabric tag, Douyin Mall watermark/logo/text, proportions, and source-view structure. Doudou has no hands and no mouth; do not add arms, hands, fingers, mouth, lips, teeth, tongue, smile lines, speech marks, or literal hand-holding gestures. Add [recruitment props/accessories] as close integrated props: leaning against Doudou, clipped to the side, between the feet, on a chair/seat area, or in the immediate foreground without covering locked regions. Highly refined 3D commercial IP render, soft studio global illumination, crisp silhouette, soft contact shadows, friendly professional tone. Negative: hands, mouth, speaking, hand-holding, human eyebrows, changed logo, unreadable text, changed body, orange overall body, dull red, brown-red, hot pink, missing burgundy feet, long legs, knees, thin feet, changed feet, changed handle, cheap plastic, flat illustration, different mascot.`

## Seasonal Skins

Use seasonal skins when the user asks for holiday, festival, solar term, weather, or calendar-based looks.

Default seasonal skins are daily or S-level-and-below activity skins. Keep them within 20%-60% creative space unless the user explicitly says S+.

Common directions:

- Spring Festival: keep Doudou's base body recognizable; use red and gold accents, lucky knots, lanterns, cloud motifs, gift box props, warm festive lighting. For ordinary Spring Festival work, prefer 40%-60% rather than 80%.
- Lantern Festival: round lantern props, soft night glow, rice ball motifs, red/gold/pink palette.
- Mid-Autumn Festival: mooncake box, jade rabbit-adjacent motifs without copying a known character, moon glow, osmanthus, deep blue and warm gold.
- Children's Day: toy props, candy colors, playful stickers, simple stage background.
- Summer: sun hat, float ring, iced drink or coconut integrated near Doudou as a foot-supported, chair-supported, foreground, or face-adjacent prop without adding a mouth, beach or pool palette, bright clean light.
- Winter: scarf, earmuffs, snow props, wool texture, cool blue with warm accent.

Spring Festival couplet prop:

- Doudou has no hands; do not create a holding pose.
- Put couplets beside Doudou as floor-standing props or background props.
- For the approved Image 4-style couplet scale, set each scroll to about 65%-75% of Doudou's visible body height, red with gold trim, and placed on both sides.
- Keep the source Doudou feet/ankles and contact shadow unchanged.
- Keep couplets clear of the front Douyin Mall logo/text and side tag.

Seasonal prompt structure:

`Run 4 separate one-image generations with gpt-image-2 using [source filename(s)] as image reference/edit input. Each output is a standalone 1:1 image with white or transparent background. Do not create a collage, grid, four-panel layout, contact sheet, labels, captions, or A/B/C/D marks. Theme: [season/holiday]. Give each one-image prompt a different action/pose and a different eye-based expression while preserving the same locked Doudou identity. Creative-space target: [20/40/60]%. This is a daily/S-level-or-below skin, so keep the redesign within 20%-60% visual change. Preserve Doudou's exact face, proportions, pose, shopping-bag silhouette, glossy dimensional eyes, rainbow handle, very short ankles, deep burgundy rounded feet, Douyin Mall watermark/logo/text, woven sound-note side label, source-like vivid fluorescent coral-red / magenta-red dominant body color, soft peach-orange gradient only on the upper-left/front-left body area, darker red side shading, matte frosted soft PVC body material, and cute cartoon identity. Do not regenerate or alter the logo/text. Do not regenerate the lower body; keep original ankles, feet, spacing, and contact shadow unchanged. Add [costume/accessories] only outside locked areas and without exceeding the change budget. Use [palette]. Highly refined 3D commercial IP render, soft studio global illumination, polished, clean edges. Negative: changed face, mouth, hands, changed proportions, deformed body, orange overall body, dull red, brown-red, hot pink, missing burgundy feet, long legs, knees, thin feet, missing ankles, changed feet, hidden eyes, removed logo, altered logo text, unreadable logo, hidden side label, cheap plastic, flat illustration, 100% redesign, different character, realistic human, cluttered props, unreadable silhouette.`

## Collaboration Skins

Use collaboration skins when the user asks for a brand/category crossover, product launch, city/venue partnership, game/event tie-in, or limited-edition merchandise concept.

For ordinary collaborations, stay within 20%-60%. Use 60%-80% only for S+ collaboration campaigns. Never use 100% unless the task is a special award/trophy peripheral.

Map the partner/category into secondary visual cues:

- Beverage: cup, straw, flavor colors, ice cubes, packaging sleeve, splash shapes. Integrate cups through body contact, foot support, chair/seat placement, side clips, or face-adjacent straw angles; never add hands or a mouth.
- Tech: soft device props, pixel/light details, interface motifs, not hard sci-fi clutter.
- Fashion: jacket, bag charm, limited badge, fabric pattern, runway/poster setting.
- Travel/city: suitcase, passport sticker, skyline silhouette, landmark-inspired pattern.
- Game/event: badge, ticket, stage lighting, collectible card framing, simple power-up props.
- Food/snack: packaging prop, ingredient color accents, tiny garnish motifs.

Collaboration rules:

- Doudou remains the main subject.
- Partner codes become accessories, props, background, or palette accents.
- Keep logos out of generated art unless the user supplies a logo and asks for a poster mockup.
- Avoid copying the visual identity of existing brands too closely unless user-provided assets authorize it.
- Preserve Doudou's exact Douyin Mall watermark/logo/text and sound-note side label visibility.

Collaboration prompt structure:

`Run 4 separate one-image generations with gpt-image-2 using [source filename(s)] as image reference/edit input for a [partner/category] collaboration. Each output is a standalone 1:1 image with white or transparent background. Do not create a collage, grid, four-panel layout, contact sheet, labels, captions, or A/B/C/D marks. Give each one-image prompt a different action/pose and a different eye-based expression while preserving the same locked Doudou identity. Creative-space target: [20/40/60/80]%. Preserve Doudou's original face, exact proportions, pose, shopping-bag silhouette, eyes, handle, feet, Douyin Mall watermark/logo/text, sound-note side label, and cute cartoon character identity. Do not regenerate or alter the logo/text. Add [partner-inspired accessory/prop system] while keeping partner cues secondary and staying within the change budget. Use [palette] and [material/finish]. Premium limited-edition IP campaign visual, clean commercial illustration. Negative: brand takeover, changed character, changed proportions, deformed body, copied famous mascot, hidden face, removed logo, altered logo text, unreadable logo, hidden side label, unauthorized 100% redesign, clutter.`

## Poster Applications

Use poster guidance when the output must work as a key visual, social post, ecommerce banner, launch poster, or event graphic.

Recommended formats:

- 1:1 social feed: Doudou centered or slightly off-center, product/partner at lower third, short headline at top.
- 3:4 campaign poster: Doudou as hero, headline at top, campaign details and CTA at bottom.
- 9:16 story: Doudou in middle 50%, title in top safe zone, CTA/QR in bottom safe zone.
- 16:9 banner: Doudou on one side, headline and offer on the other, background motif repeated lightly.

Poster layout checklist:

- Reserve 10% safe margin on all edges.
- Keep face away from title and logo areas.
- Do not place small text over busy background details.
- Leave a clean CTA or QR area when the user asks for conversion-oriented output.
- For final image generation, avoid embedding lots of readable text; recommend adding typography in design software when precision matters.

Poster prompt structure:

`Design a poster-ready Doudou campaign visual using [source filename]. Preserve Doudou's identity. Theme: [theme]. Composition: [format], Doudou placed [position], clean headline space [location], logo/product space [location], CTA/QR safe area [location]. Add [background motifs/props]. Polished brand campaign illustration, high readability, clean negative space, [ratio]. Negative: text artifacts, crowded layout, face covered, off-brand character.`
