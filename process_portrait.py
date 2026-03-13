"""
Portrait processor for RJA Portfolio.
- Crops to upper half/two-thirds (head + torso + laptop)
- Removes the brown studio background
- Replaces with the portfolio's sage-to-green gradient
- Applies subtle green-tinted color grade to match brand palette
- Exports as robert-portrait.webp at the correct 3:4 aspect ratio
"""

from PIL import Image, ImageDraw, ImageFilter, ImageEnhance, ImageChops
from rembg import remove
import numpy as np
import io

INPUT  = "public/images/HAP02305.webp"
OUTPUT = "public/images/robert-portrait.webp"

# ── 1. Load original ──────────────────────────────────────────────
print("Loading image...")
img = Image.open(INPUT).convert("RGBA")
w, h = img.size
print(f"  Original size: {w}×{h}")

# ── 2. Crop to upper body (head + torso + laptop, 3:4 ratio) ──────
# Keep the top ~68% of height — cuts off feet/pedestal, keeps laptop
crop_h = int(h * 0.68)
# Center horizontally with slight right nudge (subject is slightly left)
crop_w = int(crop_h * (3 / 4))
left   = max(0, (w - crop_w) // 2 - 20)   # slight left shift to recenter
right  = left + crop_w
top    = 0
bottom = crop_h

cropped = img.crop((left, top, right, bottom))
cw, ch  = cropped.size
print(f"  Cropped to:   {cw}×{ch}")

# ── 3. Remove background ─────────────────────────────────────────
print("Removing background (this takes ~15–30 seconds)...")
buf = io.BytesIO()
cropped.save(buf, format="PNG")
buf.seek(0)
result_bytes = remove(buf.read())
subject = Image.open(io.BytesIO(result_bytes)).convert("RGBA")
print("  Background removed.")

# ── 4. Build gradient background matching portfolio palette ───────
#   Top:    #C8DCC8  (cooler, darker green-sage — sky/mood feel)
#   Middle: #E4F0E0  (green-light — portfolio accent)
#   Bottom: #F2F5EE  (surface — exact portfolio background color)
bg = Image.new("RGBA", subject.size)
draw = ImageDraw.Draw(bg)

top_color    = (200, 220, 200, 255)   # deep sage at top
mid_color    = (228, 240, 224, 255)   # green-light midpoint
bottom_color = (242, 245, 238, 255)   # exact surface color at base

sw, sh = subject.size
for y in range(sh):
    t = y / sh
    if t < 0.5:
        # top → mid
        r2 = t * 2
        r = int(top_color[0] + (mid_color[0] - top_color[0]) * r2)
        g = int(top_color[1] + (mid_color[1] - top_color[1]) * r2)
        b = int(top_color[2] + (mid_color[2] - top_color[2]) * r2)
    else:
        # mid → bottom
        r2 = (t - 0.5) * 2
        r = int(mid_color[0] + (bottom_color[0] - mid_color[0]) * r2)
        g = int(mid_color[1] + (bottom_color[1] - mid_color[1]) * r2)
        b = int(mid_color[2] + (bottom_color[2] - mid_color[2]) * r2)
    draw.line([(0, y), (sw, y)], fill=(r, g, b, 255))

# ── 5. Composite subject onto gradient ───────────────────────────
bg.paste(subject, (0, 0), subject)

# ── 6. Color grade — harmonize skintones with green palette ───────
# Convert to RGB for processing
final = bg.convert("RGB")

# Slight color adjustment: cool highlights, warm shadows (cinematic)
arr = np.array(final, dtype=np.float32)

# Separate channels
R, G, B = arr[:,:,0], arr[:,:,1], arr[:,:,2]

# Lift shadows very slightly toward green-tinted grey
shadow_mask = np.clip(1.0 - arr.mean(axis=2) / 255.0, 0, 1)[:, :, np.newaxis]
arr[:,:,1] = np.clip(arr[:,:,1] + shadow_mask[:,:,0] * 4, 0, 255)  # +green in shadows

# Very subtle desaturation of warm brown tones (background edges, skin)
luma = (arr[:,:,0]*0.299 + arr[:,:,1]*0.587 + arr[:,:,2]*0.114)
warm_mask = np.clip((arr[:,:,0] - arr[:,:,2]) / 128.0, 0, 1)
arr[:,:,0] = np.clip(arr[:,:,0] - warm_mask * 6, 0, 255)   # cool down reds slightly

final = Image.fromarray(arr.astype(np.uint8), "RGB")

# Slight contrast + saturation boost
final = ImageEnhance.Contrast(final).enhance(1.08)
final = ImageEnhance.Color(final).enhance(1.05)
final = ImageEnhance.Sharpness(final).enhance(1.1)

# ── 7. Resize to 900×1200 (3:4, retina-ready) ────────────────────
final = final.resize((900, 1200), Image.LANCZOS)
print(f"  Final size:   {final.size[0]}×{final.size[1]}")

# ── 8. Save ───────────────────────────────────────────────────────
final.save(OUTPUT, "webp", quality=90, method=6)
print(f"\nSaved -> {OUTPUT}")
print("Done! Replace the placeholder in OpeningStatement.tsx by uncommenting")
print("the <Image> tag and pointing it to /images/robert-portrait.webp")
