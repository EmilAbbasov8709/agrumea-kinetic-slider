# 🍊 Agrumea Farm — Kinetic Slider & Interactive Landing Page

An artisanal, high-end editorial landing page recreation inspired by **Agrumea Farm** (Sicily, Italy). Built with pure vanilla web technologies focusing on **design engineering, micro-interactions, and physical motion**.

![Agrumea Farm Preview](https://images.prismic.io/agrumea-site/aiF5XQeQX7-eWvFc_foto_result.webp?auto=format,compress&rect=0,216,1920,1008&w=1200&h=630)

---

## ✨ Features & Motion Engineering

* **🥫 Kinetic Multi-Directional Jar Slider:**
  * 10-degree tilted marquee track with infinite seamless modulo wrapping.
  * Organic staggered baseline heights (`Bt` array) and sinusoidal tilting wave dynamics.
  * Momentum & inertial fling physics on drag, touch, and scroll wheel.
* **🎯 Optical Depth of Field (Bokeh):**
  * The center stage jar is in **crystal clear focus (0px blur, 115% brightness, 1.25x scale)**.
  * Jars moving toward the left or right edges progressively dissolve into realistic camera lens blur (up to 8px) and dim into the background.
* **🧲 Gaussian Magnetic Attraction:**
  * Moving your cursor near any jar creates a magnetic field (`Math.exp(-d² / r²)`).
  * Jars dynamically lean towards the cursor (`tanh(dx)`), lift towards the screen, and pull magnetically.
* **✈️ Selection & Flight Interaction:**
  * Clicking any jar triggers "Flight Mode" — the background slider smoothly scales down and dims (`.is-flying-out`), while a luxury artisanal showcase modal opens with origin, tasting notes, and specifications.
* **📱 Full-Page Navigation Curtain:**
  * Editorial slide-down menu with rotating diamond toggle and rolling character text animations.
* **🖱️ Floating Custom Cursor:**
  * Tracks cursor position and dynamically expands to display the active product name on hover.

---

## 🛠️ Tech Stack

* **HTML5:** Semantic, accessible markup.
* **CSS3:** Custom properties, cubic-bezier easing curves, and responsive clamps (`clamp()`, `100dvh`).
* **Vanilla JavaScript:** 60/120 FPS requestAnimationFrame loop, spring simulation engine, zero framework bloat.
* **Typography:** IvyMode (Serif) & IvyStyle Sans (Adobe Typekit).

---

## 🚀 Getting Started

No build step or dependencies required.

### 1. Clone the repository
```bash
git clone https://github.com/EmilAbbasov8709/agrumea-kinetic-slider.git
cd agrumea-kinetic-slider
```

### 2. Run locally
You can open `index.html` directly in any modern browser, or run a local server:

```bash
# Using Python
python -m http.server 3000

# Or using Node / npx
npx serve .
```

Open [http://localhost:3000](http://localhost:3000) to view the experience.

---

## 📜 License
MIT License. Inspired by [Agrumea Farm](https://www.agrumeafarm.it/en).
