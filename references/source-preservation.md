# Doudou Source Preservation Rules

Use these rules whenever creating or editing a Doudou skin. They are stricter than style guidance.

## Absolute Locks

Preserve these exactly from the selected source image:

- Douyin Mall front watermark/logo/text, including Chinese characters, English letters, registered mark, color, orientation, placement, and readability.
- Doudou's body proportion, shopping-bag silhouette, front outline, side thickness, rounded corner shape, pose, perspective, and volume.
- Eye size, eye placement, eye spacing, eye height, eye protrusion depth, pupil style, expression, and face position.
- Top handle location, arc shape, visible color order, thickness, and relation to the body.
- Feet scale, foot position, stance, and contact/shadow logic.
- Black side fabric tag location, size, angle, and music-note symbol readability.
- No-hands and no-mouth anatomy: Doudou must not gain arms, hands, fingers, palms, mouth, lips, teeth, tongue, smile lines, or holding/speaking/eating gestures.
- Material and color identity: matte frosted soft PVC/silicone body, vivid fluorescent coral-red / magenta-red dominant body color, peach-orange gradient only on the upper-left/front-left body area, darker side shading, deep burgundy feet, glossy eyes, source-like rainbow handle colors, and woven side fabric label.

If any absolute lock changes, the output is invalid.

If a generated attempt changes an absolute lock, do not try to fix it with a stronger text prompt. Switch to an edit workflow that keeps the original locked pixels/regions intact.

## Required Editing Method

Prefer image editing or inpainting over text-only image generation.

Use this edit hierarchy:

1. Use the source image as the base layer/reference.
2. Lock the front logo/watermark, eyes, eye spacing, eye attachment points, handle, feet, side tag, front body outline, side body thickness, rounded corners, pose, and no-hands/no-mouth anatomy.
3. Edit only local additive areas: props, small accessories, edge trim, removable stickers, light material overlays, background, and lighting.
4. Keep all added elements visually secondary to the original Doudou asset.
5. If a model cannot preserve the logo/text exactly, keep that region from the source image unchanged or composite it back from the original.
6. If a model cannot preserve feet/ankles exactly, keep the entire lower-body region from the source image unchanged. If the task needs a close prop, place it in front of or between the feet only when the original foot shape, scale, and contact logic remain intact.

When a generated reference has better props but wrong body/feet, use that reference only for prop scale and style. The original source image remains the only structure reference for Doudou.

## Body Silhouette Lock

Doudou's body is a fixed shopping-bag form, not a deformable torso. Preserve the selected source body's:

- Front outline and rounded trapezoid/bag silhouette.
- Top opening line and upper rim relationship to the rainbow handle.
- Side thickness and soft side volume.
- Bottom curve and rounded lower corners.
- Logo/watermark plane orientation and curvature.
- Overall squash/stretch amount from the source pose.

Do not let accessories reshape the body. Clothing, backpacks, straps, props, or furniture may sit on top of or behind the source silhouette, but they must not make the bag body wider, slimmer, taller, pinched, concave, swollen, folded, twisted, or human-torso-like.

For final image prompts, prefer language like: `preserve the original body silhouette as a locked base mesh; add accessories as separate surface/behind-body attachments only`.

## Color And Material Lock

Use `飞书文档 - 图片 (57).png` and the standard 3/4 source images as the color/material truth.

Correct Doudou color/material:

- Body dominant color is vivid fluorescent coral red / magenta red, bright and saturated.
- Orange exists as a soft peach-orange gradient on the upper-left/front-left body only, not across the whole body.
- Side and lower-body shading can deepen to red, but should not become brown or dull.
- Feet are deep burgundy/dark wine red, visibly darker than the body.
- Ankle connectors are also dark red/burgundy and very short.
- Body material is satin-matte frosted soft PVC/silicone with fine micro-texture and soft diffused highlights.
- Eyes are glossy white/black with strong dimensional reflections and shaped black pupil cutouts.
- Rainbow handle keeps the source color relationship: orange/red outer arc, mint-green/cyan inner arc, and blue rear arc.
- Side tag is black woven fabric with ribs/stitching and a raised white music-note symbol.

Incorrect color/material:

- Overall orange body, tomato-orange body, muted red, brown-red, purple-red, hot pink, pastel pink, fully recolored body, metallic body, glassy body, clay-like body, or cheap glossy hard plastic.
- Feet too bright, same color as the body, orange, pink, or missing dark burgundy contrast.
- Handle recolored into a single color or losing the orange/green/blue relationship.
- White logo/text becoming gray, colored, embossed incorrectly, hidden, or blended into the body.

If generation causes color/material drift, reject the result or add a stronger color lock before retrying.

## Backpacks And Back-Mounted Props

Backpacks, wings, capes, tanks, quivers, rolled mats, and other back-mounted props are high-risk because they can deform the body.

Correct behavior:

- The backpack sits behind Doudou or slightly peeks from the side/back in 3/4 view.
- Keep the front shopping-bag outline unchanged. The visible front body should remain the same rounded shape as the source.
- Use short, soft straps or side clips that attach to safe side/back areas and do not wrap across the front logo.
- If straps are visible on the front, make them thin decorative overlays on top of the locked body surface, not structural shoulders or arms.
- The backpack may create a separate silhouette behind Doudou, but Doudou's red body silhouette remains readable and unchanged.

Forbidden behavior:

- Expanding, shrinking, pinching, bending, or narrowing Doudou's red body to fit a backpack.
- Adding shoulders, arms, a neck, torso, waist, or human backpack-wearing anatomy.
- Pulling the side tag, handle, eyes, or feet out of place because of straps.
- Covering or warping the Douyin Mall logo/text.

## Hat Placement Rules

Use only these two hat-wearing modes for Doudou unless the user provides a different approved reference.

### Mode A: Top-Brim Hat

Reference: `assets/source/飞书文档 - 图片 (78).png`.

Correct behavior:

- The hat sits across the top front like a shallow brimmed hat, with a broad brim crossing above the eyes.
- The brim may cover the top body edge/opening and partially cover the lower/front part of the rainbow handle.
- The brim can overlap the upper edge of the white eyes slightly, but the eye centers, spacing, protrusion, and pupil readability must remain locked.
- The hat follows Doudou's top perspective and wraps around the head/body top as a separate accessory.
- The hat must not push the eyes downward, move the handle, or reshape the red body.

Forbidden behavior:

- A tiny human hat floating above the handle.
- A hat perched only on the rainbow handle without touching/relating to the top body edge.
- A hat that exposes all top edges when the requested style is top-brim.
- A hat that hides the eyes, side tag, feet, or Douyin Mall logo/text.
- A hat that creates a human head, hair, ears, neck, or shoulders.

### Mode B: Side-Worn Hat

Reference: `assets/style-references/hat-side-placement-reference.png`.

Correct behavior:

- The hat or soft cap piece attaches to one upper side of Doudou, usually near the right/top side from the viewer's perspective.
- It sits like a side clip/tilted soft hat, overlapping the side-top body/handle area but not the front logo.
- It may partially overlap the rainbow handle from the side, but must not move, recolor, or replace the handle.
- It reads as a decorative side-worn accessory, not a full human hat on a head.
- It must preserve the body silhouette, eyes, side tag, and feet.

Forbidden behavior:

- Centering the side hat as a normal human cap.
- Moving the eyes or handle to fit the side hat.
- Covering the side tag or front logo.
- Turning the side hat into hair, ears, wings, hands, or a face feature.

When the user simply says "wearing a hat", choose Mode A for brimmed hats, bucket hats, caps, berets, and formal hats; choose Mode B for small decorative hats, soft cloud-like caps, side clips, seasonal side ornaments, or tilted accessory hats.

## No-Hands Prop Integration

Doudou can appear to use props without gaining hands. Prefer integrated prop placement when it makes the image clearer:

- Megaphone: attach or float it against the upper side/front edge with a small strap or bracket, angled toward the viewer or near the face, but do not add a hand or cover the logo.
- Coconut or drink: place the coconut against Doudou's lower front, between the rounded feet, on a chair/lap area, or on a tiny support surface. A straw may angle toward the face, but it must not enter a mouth or create a mouth.
- Signs, bouquets, packages, phones, and tools: lean them against Doudou's body, clip them to the side, tuck them between the feet, or support them with furniture/podiums.
- Large props: overlap only non-locked blank body areas, furniture, or foreground space. Keep eyes, handle, side tag, feet, and Douyin Mall logo/text visible.

This is not a hand-holding pose. It is body-supported, foot-supported, strap-mounted, furniture-supported, or scene-supported prop placement.

### Positive Prop Scale And Side-Mount Reference

Use `assets/style-references/prop-scale-side-mounted-fire-extinguisher-reference.png` when the request involves fire extinguishers, megaphones, bottles, tools, campaign signs, or any medium-to-large prop that should feel actively used.

Correct behavior:

- The prop is attached close to Doudou's front-side edge with clear contact, usually on the viewer-left/front-left side for 3/4 front views.
- The prop height is around 45%-60% of the visible red body height; the top may reach around the lower eye/body-top area and the bottom may sit above or near the foot area.
- The prop adds a readable silhouette beside Doudou while leaving the main red shopping-bag outline, central logo/text, eyes, handle, side tag, and two feet intact.
- A small strap, clip, bracket, belt, or harness fixes the prop to a safe blank side/front area. It must look like a separate accessory overlay.
- Hoses, nozzles, megaphone cones, straws, or handles may angle forward or toward the face/action direction to imply use, without entering a mouth or being held by hands.

Incorrect behavior:

- Tiny charm-sized props, oversized props larger than Doudou's body, props floating with no contact, or props placed far off to the side.
- Props centered over the Douyin Mall logo/text, covering eyes, hiding the side tag, blocking both feet, or replacing the side label.
- Straps that become arms, hands, shoulders, a torso harness, or human anatomy.
- Prop pressure that deforms the red body silhouette, side thickness, rounded corners, top rim, bottom curve, or logo plane.

## Seated And Reclining Feet

When Doudou sits, reclines, or leans on a sofa/chair:

- Keep the same rounded red foot design and soft material.
- Show feet as two short rounded forms in the foreground or on the seat cushion, often slightly tilted outward.
- Keep any leg/ankle connectors very short, dark red, and partially hidden by the body or seat.
- Do not lengthen the legs, add knees, add human-like soles, or make the feet thin.
- Props may be nestled between the feet or in front of them only if the two-foot structure stays readable.

## Foot Structure Reference

Use the source samples as the foot truth, especially the standing, walking, jumping, and seated/reclining examples in `assets/source/`.

Correct foot structure:

- Two independent rounded red capsule-like feet, each soft and chunky.
- Very short dark-red cylindrical or wedge-like ankle connectors, mostly hidden by the body.
- Feet may tilt, lift, swing, or point outward depending on the pose, but they stay short, plump, smooth, and toy-like.
- The front oval/sole-like inset may appear on lifted feet as a darker red oval, following the foot perspective.
- In sitting/reclining poses, feet come forward onto the cushion/foreground and may frame or lightly support a prop.

### Sports, Jumping, And Running Feet

Sports actions are high-risk because image models tend to invent long legs, shoes, knees, or stretched feet. For basketball, running, jumping, skating, kicking, or any athletic action, use these stricter rules:

- Keep exactly two rounded deep-burgundy capsule feet. Each foot should remain a short plump bean/oval form, not a stretched limb.
- Keep ankle connectors extremely short and dark red, no longer than about 10%-15% of the visible body height, and mostly hidden under the bag body.
- Show motion through body tilt, airborne spacing, ball/prop position, motion streaks, and soft floating/contact shadows. Do not show motion by stretching the feet or connectors.
- A lifted foot may rotate so its darker oval sole/inset is visible, but the overall foot volume stays chunky and rounded.
- A tucked foot may be partly hidden behind the body, but both feet must remain readable as two separate Doudou feet.
- For jumping poses, keep the feet close to the lower body, within about one foot-height from the bottom edge of the bag body. They should never detach far away like human legs.
- For running poses, use a source-like walking foot arrangement: one rounded foot forward, one rounded foot back, both connected by very short dark connectors. No stride should create knee-like bends.
- For basketball or ball sports, the ball may be near a foot or body edge, but it must not push, melt, split, elongate, or replace the feet.

Incorrect foot structure:

- Long legs, knees, calves, human feet, toes, shoes replacing the foot shape, thin sticks, sharp ankles, stretched connectors, asymmetrical scale drift, melted feet, or feet fused into the body.
- Props covering the feet so the two-foot structure becomes unreadable.
- In sports poses: exaggerated kicking legs, sneaker-like feet, pointed toes, dangling legs, noodle legs, detached feet, extra feet, or feet scaled much larger/smaller than the source.

If a generated image distorts feet, discard it or switch to an edit workflow that preserves the lower-body pixels from the closest correct source sample.

## Eye Expression Reference

Use the source samples as the expression truth. Doudou has no mouth, so expression comes from eyes and eye-adjacent elements:

- Keep the white eyeballs large, rounded, and protruding from the upper front of the body.
- Keep the two eyeballs anchored to the exact source-image positions. Do not move them upward, downward, inward, outward, farther apart, closer together, or rotate them independently from the source pose.
- Preserve the original eye-to-body attachment points and protrusion depth. Eyes sit on top/front of the shopping-bag body as two attached rounded discs/balls, not floating lenses or flat printed graphics.
- Preserve the relative height relationship between eyes, body top edge, and rainbow handle. Do not let hats, glasses, books, furniture, or props push the eyes down or apart.
- Keep black pupils glossy, dimensional, and shape-cut with a characteristic notch/cutout, not simple flat black circles.
- Allow eyelid/eye-cover shapes in Doudou red/orange for sleepy, focused, annoyed, or relaxed expressions.
- Allow star pupils or star reflections for excitement.
- Allow pupils to look up, sideways, inward, or partly hidden by props such as a magnifier.
- Do not add a mouth, cheeks, human eyebrows, nose, teeth, tongue, or speech lines.

## Eyewear And Eye-Adjacent Props

Glasses, goggles, magnifiers, masks, telescopes, and eye-adjacent props are high-risk because they can distort the IP face. Treat them as overlays, never as a reason to regenerate the face.

Correct eyewear behavior:

- Place the glasses frame in front of the existing eyes as a thin overlay following the source eye positions.
- Each lens should align around the existing eyeball without changing the eyeball's center, scale, spacing, protrusion, or pupil placement.
- Use a lightweight bridge that crosses between the existing eyes without pulling the eyes together.
- Lens reflections are allowed, but lenses must remain transparent enough to see the original Doudou eyes and pupils.
- If seated or reading, rotate the book or pupils to imply attention; do not move the eyes to fit the glasses.

Forbidden eyewear behavior:

- Moving eyes to fit symmetrical glasses.
- Replacing Doudou's protruding eyes with flat human eyeglass lenses.
- Making the eyes smaller, closer together, farther apart, lower on the face, or hidden behind opaque lenses.
- Adding a human nose bridge, human eyebrows, eyelids unrelated to Doudou source samples, or a mouth.

## Failure Fallback

When a generated preview changes feet, ankles, body proportions, body silhouette, logo/text, eye placement, handle, or side tag:

1. Stop generating from text.
2. Select the closest source asset as the base.
3. Define locked regions: full body silhouette, front outline, side thickness, rounded corners, eyes, handle, front logo/text, side tag, legs/ankles, feet, and contact shadow.
4. Define editable regions only outside the character or on tiny non-logo body areas.
5. Output an edit spec or use an image-editing tool with a mask. Do not call a text-only image generator again for the same final asset.

For the "holding/using couplets" case, Doudou has no hands. Use this composition:

- Keep Doudou completely unchanged.
- Place one or two red couplet scrolls standing on the floor beside Doudou, outside the body silhouette.
- If matching the approved Image 4 reference, make the couplets large: around 65%-75% of the visible Doudou body height, but still not touching locked regions.
- Do not attach the scrolls to feet, ankles, logo area, eyes, handle, or side tag.
- Do not imply Doudou is holding the scrolls.

## Forbidden Generation Behavior

Do not:

- Generate Doudou from text alone for final output.
- Recreate the Douyin Mall text/logo with model-generated typography.
- Change the character into a similar mascot with different proportions.
- Stretch, squash, slim, widen, rotate, or reshape the body beyond the source pose.
- Let backpacks, clothing, straps, props, or furniture deform the body outline, side thickness, top rim, lower corners, or logo plane.
- Move, resize, re-space, flatten, detach, or replace the eyes; move the handle, feet, side tag, or logo area.
- Use a generic human hat placement that floats above Doudou or ignores the two approved Doudou hat modes.
- Flatten the 3D material into a flat illustration or make the body look glossy hard plastic, metal, glass, clay, or cheap toy plastic instead of matte frosted soft PVC.
- Drift from the source color system: orange overall body, dull red, brown-red, purple-red, hot pink, pastel pink, missing peach-orange upper-left gradient, missing deep burgundy feet, or wrong rainbow handle colors.
- Cover the logo/watermark with clothes, stickers, props, reflections, shadows, or decorative patterns.
- Add hands, arms, fingers, a mouth, lips, teeth, tongue, smile line, or a literal hand-holding pose. Do not show drinking, eating, talking, or biting with a mouth; imply use through body-supported props, foot-supported props, straps, furniture, angle, and composition.

## Mask Guidance

Recommended editable mask areas:

- Background outside the character silhouette.
- Small areas around the top handle for charms.
- Hat placement areas: top-front brim region above/over the eyes and top rim for Mode A; upper side/top side around the handle/body edge for Mode B.
- Bag edges for thin trim that does not overlap the logo.
- Tiny removable stickers on blank body areas away from the front logo.
- Props integrated near the body: side/front attachments, straps, brackets, lap/seat props, and foreground props between or in front of the feet when foot structure remains intact.
- Lighting and shadow enhancements that do not distort structure.

Recommended locked mask areas:

- Entire front logo/watermark/text region plus padding.
- Eyes and pupils.
- Eye centers, eye spacing, eye-body attachment points, protrusion depth, and the area between the two eyes.
- Body outline and rounded corners.
- Front body outline, side thickness, top rim, bottom curve, and logo plane.
- Top handle shape.
- Feet and leg connection.
- Full lower-body foot/ankle region, including the two dark-red connectors, two red feet, spacing, and contact shadow.
- Side tag and music-note symbol.
- The blank face/body areas where a mouth, arms, or hands might be hallucinated.
- Eye pupils and eyelid regions when the task does not explicitly request an expression change.
- Lower-body foot/ankle structure from the closest pose reference, especially for sitting, reclining, or jumping.

## Prompt Requirement

Every edit prompt must include:

`Use the selected Doudou source image as the base image, not as loose inspiration. Preserve the exact Douyin Mall front watermark/logo/text and do not regenerate it. Preserve the exact IP proportions, pose, shopping-bag silhouette, eyes, handle, feet, and side tag placement. Only add local skin elements outside locked areas.`

For any backpack, clothing, strap, cape, or back-mounted prop prompt, include:

`Lock Doudou's red shopping-bag body as the base mesh: same front outline, side thickness, rounded corners, top rim, bottom curve, logo plane, pose, and volume as the selected source. Add the backpack or straps as separate behind-body or surface-overlay accessories only. Do not widen, slim, pinch, bend, fold, or reshape Doudou's body to fit the accessory.`

For any hat prompt, include:

`Use one of the approved Doudou hat placement modes. Mode A top-brim: a shallow brimmed hat sits across the top front, broad brim covering the top body edge/opening and partly covering the lower/front rainbow handle while preserving eye centers, spacing, protrusion, and visibility. Mode B side-worn: a small soft hat/clip attaches to the upper side/top side near the handle, partly overlapping the side/top area without covering the front logo, side tag, eyes, or feet. Do not use a floating human hat, do not move the eyes or handle, and do not create a human head/neck/shoulders.`

For any face, glasses, goggles, or eye-adjacent prop prompt, include:

`Lock Doudou's eyes exactly from the source image: same eyeball centers, spacing, size, height, protrusion depth, attachment points, pupil style, and relationship to the body top and rainbow handle. Glasses or eye-adjacent props must be transparent overlays in front of the existing eyes, not a reason to move, resize, flatten, replace, or hide the eyes.`

Also include:

`Doudou has no hands and no mouth. Do not add arms, hands, fingers, palms, a mouth, lips, teeth, tongue, smile lines, speech marks, or literal hand-holding gestures. Integrate requested props through body contact, foot support, straps, clips, furniture support, lap/seat placement, or scene composition. Props may point near the face or rest between the feet, but must not create a mouth, hand, or human-like action.`

And include:

`Render Doudou as a premium 3D commercial IP character: matte frosted soft PVC body with source-like vivid fluorescent coral-red / magenta-red dominant color, soft peach-orange gradient only on the upper-left/front-left body area, darker red side shading, deep burgundy feet, subtle SSS on rounded edges, glossy dimensional eyes with shaped black pupil cutouts, woven black fabric side tag with textile ribs and stitching, soft studio global illumination, crisp silhouette, and soft contact shadows.`

Also include:

`Lock Doudou's source color identity: vivid fluorescent coral-red / magenta-red dominant body, soft peach-orange gradient only on the upper-left/front-left area, darker red side shading, deep burgundy feet and short ankle connectors, source-like orange/red + mint-green/cyan + blue rainbow handle, white Douyin Mall logo/text unchanged. Avoid orange overall body, dull red, brown-red, hot pink, pastel pink, metallic/glassy/clay material, or feet that match the body color.`

For final outputs, add:

`If the logo/text or character proportions cannot be preserved exactly, stop and return an edit spec instead of generating a final image.`

For failed foot/ankle preservation, add:

`Do not regenerate the lower body. Keep the original lower-body pixels from the selected Doudou source image unchanged, including ankles, feet, spacing, and contact shadow. Add the requested prop outside this locked region.`
