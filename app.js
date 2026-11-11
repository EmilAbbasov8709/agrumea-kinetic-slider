// Agrumea Farm - Advanced Physical Motion & Interaction Engine
(function () {
  'use strict';

  // 1. Dynamic App Height
  function updateAppHeight() {
    document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
  }
  window.addEventListener('resize', updateAppHeight);
  window.addEventListener('orientationchange', updateAppHeight);
  updateAppHeight();

  // Product Database for detail flight & selection
  const PRODUCTS = [
    {
      id: 'smeraldo',
      name: 'Smeraldo',
      subtitle: 'Pistachio Pesto',
      desc: 'Crafted from hand-harvested Sicilian pistachios and cold-pressed extra virgin olive oil. Rich, savory, and intensely aromatic.',
      weight: '190g',
      origin: 'Bronte, Sicily',
      img: 'https://images.prismic.io/agrumea-site/ahvhgweQX7-eWdJF_Pesto-salato_result.webp?auto=format,compress&w=1080'
    },
    {
      id: 'marmellata_arancia',
      name: 'Arancia a Fette',
      subtitle: 'Sliced Orange Marmalade',
      desc: 'Thinly sliced sun-ripened Sicilian oranges slow-cooked with their fragrant peel to preserve the essential citrus oils.',
      weight: '240g',
      origin: 'Catania, Sicily',
      img: 'https://images.prismic.io/agrumea-site/ahvgwQeQX7-eWdIy_arancia_result.webp?auto=format,compress&w=1080'
    },
    {
      id: 'caponata',
      name: 'Caponata Siciliana',
      subtitle: 'Artisanal Eggplant Caponata',
      desc: 'The queen of Sicilian antipasti. Fried aubergines, crunchy celery, green Nocellara olives and capers in a delicate sweet-sour sauce.',
      weight: '280g',
      origin: 'Ragusa, Sicily',
      img: 'https://images.prismic.io/agrumea-site/ahvhTgeQX7-eWdI0_caponata_result.webp?auto=format,compress&w=1080'
    },
    {
      id: 'pestorosso',
      name: 'Pesto Rosso',
      subtitle: 'Iblean Red Pesto',
      desc: 'A vibrant blend of sun-drenched Pachino tomatoes, toasted Sicilian almonds, fresh basil, and aged Ragusano cheese.',
      weight: '190g',
      origin: 'Modica, Sicily',
      img: 'https://images.prismic.io/agrumea-site/ahvhfQeQX7-eWdI__pesto-rosso_result.webp?auto=format,compress&w=1080'
    },
    {
      id: 'fragole',
      name: 'Fragole e Goji',
      subtitle: 'Strawberry & Goji Jam',
      desc: 'Juicy local strawberries simmered with nutrient-dense goji berries. A bright, tart morning preserve with natural pectin.',
      weight: '220g',
      origin: 'Etna Slopes, Sicily',
      img: 'https://images.prismic.io/agrumea-site/ahvheAeQX7-eWdI6_fragole_result.webp?auto=format,compress&w=1080'
    },
    {
      id: 'crema_pistacchio',
      name: 'Crema di Pistacchio',
      subtitle: 'Sweet Pistachio Spread',
      desc: 'Velvety smooth pistachio cream with 45% pure roasted Sicilian pistachios. Irresistibly rich on brioche and pastries.',
      weight: '200g',
      origin: 'Bronte, Sicily',
      img: 'https://images.prismic.io/agrumea-site/ahvhfweQX7-eWdJB_pesto_result.webp?auto=format,compress&w=1080'
    },
    {
      id: 'gelsi',
      name: 'Gelsi Neri',
      subtitle: 'Black Mulberry Jam',
      desc: 'Traditional Mediterranean black mulberries harvested at peak sweetness. Dark, velvety, and deeply aromatic.',
      weight: '230g',
      origin: 'Siracusa, Sicily',
      img: 'https://images.prismic.io/agrumea-site/ahvhegeQX7-eWdI8_gelsi_result.webp?auto=format,compress&w=1080'
    },
    {
      id: 'cipolla',
      name: 'Cipolle in Agrodolce',
      subtitle: 'Sweet & Sour Onions',
      desc: 'Sweet Giarratana onions delicately caramelized with organic grape must and Sicilian wine vinegar. Ideal with aged cheeses.',
      weight: '250g',
      origin: 'Giarratana, Sicily',
      img: 'https://images.prismic.io/agrumea-site/ahvhdQeQX7-eWdI3_cipolla_result.webp?auto=format,compress&w=1080'
    },
    {
      id: 'mennullata',
      name: 'Mennullata',
      subtitle: 'Pure Almond Spread',
      desc: 'Made exclusively from prized Pizzuta d’Avola almonds. Lightly roasted, naturally sweet with zero added palm oil.',
      weight: '200g',
      origin: 'Noto, Sicily',
      img: 'https://images.prismic.io/agrumea-site/ahvhfAeQX7-eWdI-_mandorla_result.webp?auto=format,compress&w=1080'
    },
    {
      id: 'pera_cannella',
      name: 'Pera e Cannella',
      subtitle: 'Pear & Cinnamon Jam',
      desc: 'Coscia pears from Mount Etna perfumed with warm Ceylon cinnamon sticks. The essence of Sicilian autumn.',
      weight: '220g',
      origin: 'Etna Valley, Sicily',
      img: 'https://images.prismic.io/agrumea-site/ahvhgQeQX7-eWdJD_pera_result.webp?auto=format,compress&w=1080'
    }
  ];

  document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.jar-slider');
    const header = document.querySelector('.site-header');
    const appHeader = document.querySelector('.site-app-header');
    const menuToggle = document.querySelector('.site-menu-toggle');
    const fullPageNav = document.querySelector('.site-full-page-nav');
    const navOverlay = document.querySelector('.site-nav-overlay');
    const prompt = document.querySelector('.jar-slider__prompt');
    const cursor = document.querySelector('.cursor-label');
    const cursorPill = document.querySelector('.cursor-label__pill');
    const cursorText = document.querySelector('.cursor-label__text');
    const langItems = document.querySelectorAll('.site-lang-switcher__item');
    const modal = document.getElementById('product-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const modalSubtitle = document.getElementById('modal-subtitle');
    const modalDesc = document.getElementById('modal-desc');
    const modalWeight = document.getElementById('modal-weight');
    const modalOrigin = document.getElementById('modal-origin');
    const modalClose = document.getElementById('modal-close');

    // 2. Entrance Animation
    if (appHeader) appHeader.classList.add('is-ready');
    if (prompt) prompt.classList.add('is-ready');

    setTimeout(() => {
      if (header) header.classList.remove('is-initial');
      if (slider) {
        slider.setAttribute('data-jar-slider-ready', 'true');
        slider.style.setProperty('--jar-shape-intro-opacity', '1');
        slider.style.setProperty('--jar-shape-intro-y', '0px');
        slider.style.setProperty('--jar-badge-intro-opacity', '1');
        slider.style.setProperty('--jar-badge-intro-y', '0px');
        slider.style.setProperty('--jar-badge-intro-rotation', '0deg');
      }
    }, 150);

    // 3. Navigation Toggle
    let isNavOpen = false;
    function openNav() {
      isNavOpen = true;
      if (header) header.classList.add('is-nav-open');
      if (fullPageNav) {
        fullPageNav.classList.remove('is-closing');
        fullPageNav.classList.add('is-open');
        fullPageNav.setAttribute('aria-hidden', 'false');
      }
      if (navOverlay) navOverlay.classList.add('is-open');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'true');
    }

    function closeNav() {
      if (!isNavOpen) return;
      isNavOpen = false;
      if (header) header.classList.remove('is-nav-open');
      if (fullPageNav) fullPageNav.classList.add('is-closing');
      if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
      setTimeout(() => {
        if (!isNavOpen && fullPageNav) {
          fullPageNav.classList.remove('is-open', 'is-closing');
          fullPageNav.setAttribute('aria-hidden', 'true');
        }
        if (!isNavOpen && navOverlay) {
          navOverlay.classList.remove('is-open');
        }
      }, 950);
    }

    if (menuToggle) {
      menuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        isNavOpen ? closeNav() : openNav();
      });
    }

    if (navOverlay) {
      navOverlay.addEventListener('click', (e) => {
        if (e.target === navOverlay) closeNav();
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (isNavOpen) closeNav();
        if (isModalOpen) closeModal();
      }
    });

    // 4. Product Modal Selection ("Flight" Interaction)
    let isModalOpen = false;
    function openProductModal(index) {
      const prod = PRODUCTS[index % PRODUCTS.length];
      if (!prod || !modal) return;
      isModalOpen = true;

      // Splay background
      if (slider) slider.classList.add('is-flying-out');

      modalImg.src = prod.img;
      modalImg.alt = prod.name;
      modalTitle.textContent = prod.name;
      modalSubtitle.textContent = prod.subtitle;
      modalDesc.textContent = prod.desc;
      modalWeight.textContent = prod.weight;
      modalOrigin.textContent = prod.origin;

      modal.classList.add('is-active');
      if (cursorPill) cursorPill.classList.remove('is-visible');
    }

    function closeModal() {
      if (!isModalOpen || !modal) return;
      isModalOpen = false;
      modal.classList.remove('is-active');
      if (slider) slider.classList.remove('is-flying-out');
    }

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('product-modal__backdrop')) {
          closeModal();
        }
      });
    }

    // Language switcher
    langItems.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        langItems.forEach((b) => {
          b.classList.remove('is-active', 'router-link-active', 'router-link-exact-active');
          b.removeAttribute('aria-current');
        });
        btn.classList.add('is-active', 'router-link-active', 'router-link-exact-active');
        btn.setAttribute('aria-current', 'true');
      });
    });

    // 5. Floating Cursor Engine
    let pointerX = -200, pointerY = -200;
    let curX = -200, curY = -200;
    const isPointerFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    if (isPointerFine) {
      window.addEventListener('pointermove', (e) => {
        pointerX = e.clientX;
        pointerY = e.clientY;
      });

      function updateCursor() {
        curX += (pointerX - curX) * 0.24;
        curY += (pointerY - curY) * 0.24;
        if (cursor) {
          cursor.style.transform = `translate3d(${curX}px, ${curY}px, 0)`;
        }
        requestAnimationFrame(updateCursor);
      }
      requestAnimationFrame(updateCursor);
    } else {
      if (cursor) cursor.style.display = 'none';
    }

    // 6. Natural Multi-Directional & Depth of Field Physics
    if (!slider) return;

    const wrap = slider.querySelector('[data-jar-slider-wrap]');
    const items = Array.from(slider.querySelectorAll('[data-jar-slider-item]'));
    if (!wrap || !items.length) return;

    // Organic height stagger constants
    const Bt = [-0.053, 0.043, -0.024, 0.057, -0.048, 0.029, -0.038, 0.053, -0.03, 0.04];
    const maxBaseAngle = 14;

    function makeSpring() {
      return { value: 0, velocity: 0 };
    }

    function updateSpring(spring, target, stiffness, damping, dt) {
      spring.velocity += ((target - spring.value) * stiffness - spring.velocity * damping) * dt;
      spring.value += spring.velocity * dt;
      if (Math.abs(spring.velocity) < 0.001 && Math.abs(target - spring.value) < 0.001) {
        spring.value = target;
        spring.velocity = 0;
      }
    }

    const D = items.length;
    const jarStates = items.map(() => ({
      lean: makeSpring(),
      lift: makeSpring(),
      pullX: makeSpring(),
      pullY: makeSpring()
    }));

    let itemW = 200, itemH = 320, spacing = 280, period = D * spacing;
    let buffer = itemW * 3;
    let scrollX = 0, targetScrollX = 0;
    let circleRotation = 0;
    let isDragging = false;
    let startX = 0, lastX = 0, velocity = 0, lastTime = 0;
    let hasMoved = false;

    const trackAngleDeg = 10;
    const trackAngleRad = (trackAngleDeg * Math.PI) / 180;
    const cosAngle = Math.cos(trackAngleRad);
    const sinAngle = Math.sin(trackAngleRad);

    function resizeSlider() {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const isMobile = W <= 480;
      const isTablet = !isMobile && W <= 1024;

      const Z = W / (isMobile || isTablet ? 3 : 4);
      spacing = Z * (isMobile ? 1.15 : isTablet ? 1.265 : 0.92);
      itemW = Z * (isMobile ? 0.73 : isTablet ? 0.7875 : 0.5358) * 1.15;
      itemH = itemW * (1013 / 630);

      const maxH = H * 0.72;
      if (itemH > maxH) {
        itemH = maxH;
        itemW = itemH / (1013 / 630);
      }

      period = D * spacing;
      buffer = itemW * 3;
      const marqueeH = Math.min(itemH * 1.35, H * 0.95);

      slider.style.setProperty('--jar-item-w', `${itemW}px`);
      slider.style.setProperty('--jar-item-h', `${itemH}px`);
      slider.style.setProperty('--jar-marquee-h', `${marqueeH}px`);
    }

    window.addEventListener('resize', resizeSlider);
    resizeSlider();

    // Mouse Parallax
    window.addEventListener('pointermove', (e) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const normX = (e.clientX - centerX) / centerX;
      const normY = (e.clientY - centerY) / centerY;
      slider.style.setProperty('--jar-parallax-x', normX.toFixed(3));
      slider.style.setProperty('--jar-parallax-y', normY.toFixed(3));
    });

    // Pointer Dragging
    wrap.addEventListener('pointerdown', (e) => {
      if (isModalOpen) return;
      isDragging = true;
      hasMoved = false;
      startX = e.clientX;
      lastX = e.clientX;
      velocity = 0;
      lastTime = performance.now();
      try { wrap.setPointerCapture(e.pointerId); } catch (_) {}
    });

    window.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      if (Math.abs(e.clientX - startX) > 6) hasMoved = true;
      const now = performance.now();
      const dt = Math.max(1, now - lastTime);
      velocity = velocity * 0.7 + (dx / dt) * 0.3;
      lastX = e.clientX;
      lastTime = now;
      targetScrollX += dx * 1.45;
    });

    function endDrag(e) {
      if (!isDragging) return;
      isDragging = false;
      try { wrap.releasePointerCapture(e.pointerId); } catch (_) {}
      const fling = Math.max(-4.5, Math.min(4.5, velocity));
      targetScrollX += fling * 170;
      velocity = 0;
    }

    wrap.addEventListener('pointerup', endDrag);
    wrap.addEventListener('pointercancel', endDrag);

    // Mouse Wheel
    window.addEventListener('wheel', (e) => {
      if (isModalOpen) return;
      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      targetScrollX -= delta * 1.15;
    }, { passive: true });

    // Item Interaction & Selection
    items.forEach((item, index) => {
      const prod = PRODUCTS[index % PRODUCTS.length];

      item.addEventListener('pointerenter', () => {
        if (!isPointerFine || isModalOpen) return;
        if (cursorText) cursorText.textContent = prod.name.toUpperCase();
        if (cursorPill) cursorPill.classList.add('is-visible');
      });

      item.addEventListener('pointerleave', () => {
        if (cursorPill && !isDragging) cursorPill.classList.remove('is-visible');
      });

      item.addEventListener('click', (e) => {
        e.preventDefault();
        if (hasMoved) return;
        openProductModal(index);
      });
    });

    wrap.addEventListener('pointerleave', () => {
      if (cursorPill && !isDragging) cursorPill.classList.remove('is-visible');
    });

    // 7. Physics Motion Frame Loop
    let lastFrameTime = performance.now();
    function loop(now) {
      const deltaMs = Math.min(32, now - lastFrameTime);
      const dtSeconds = deltaMs / 1000;
      lastFrameTime = now;

      const winW = window.innerWidth;
      const winH = window.innerHeight;
      const marqueeCenter = { x: winW / 2, y: winH * 0.55 };

      // Slow organic crawl when idle
      if (!isDragging && !isModalOpen) {
        targetScrollX -= 0.65 * (deltaMs / 16.67);
      }

      // Smooth lerp for scroll
      const prevScroll = scrollX;
      scrollX += (targetScrollX - scrollX) * 0.088;
      const currentVelocity = (scrollX - prevScroll) / (deltaMs / 16.67);

      // Rotating emblem
      circleRotation = (circleRotation + 0.12 * (deltaMs / 16.67)) % 360;
      slider.style.setProperty('--jar-circle-rotation', `${circleRotation.toFixed(2)}deg`);

      // Velocity leaning momentum
      const velocityLean = Math.max(-12, Math.min(12, currentVelocity * 0.55));

      for (let i = 0; i < D; i++) {
        const item = items[i];
        const state = jarStates[i];

        // Horizontal position on tilted marquee track
        let trackX = (i * spacing + itemW / 2 + scrollX + buffer) % period;
        if (trackX < 0) trackX += period;
        const relX = trackX - buffer - itemW / 2;

        // Height variation & sinusoidal vertical wave
        const staggeredY = Bt[i % Bt.length] * itemH;
        const waveX = i * spacing + scrollX;
        const baseSineRotation = Math.sin((waveX / (3 * spacing)) * Math.PI * 2) * maxBaseAngle;

        // EXACT PHYSICAL SCREEN GEOMETRY
        // The marquee track runs from left: 0 (screen left: 0px) to screen right (winW: 1440px).
        // Center of the screen is at winW / 2 (720px).
        const jarScreenX = relX + itemW / 2;
        const distFromCenterPx = Math.abs(jarScreenX - winW / 2);
        const normDist = distFromCenterPx / (winW * 0.44);

        // DEPTH OF FIELD (BLUR, SCALE & BRIGHTNESS FORMULA)
        // Center of screen (normDist < 0.22) => EXACTLY 0px blur (crystal clear, glowing hero focus)
        // Moving to left or right => progressive realistic camera blur up to 7.5px, scale down, dimming
        let blurAmount = 0;
        if (normDist > 0.20) {
          blurAmount = Math.min(8, Math.pow((normDist - 0.20) / 0.80, 1.8) * 8.0);
        }

        const centerDepthScale = 1.25 - Math.min(1, normDist) * 0.45;
        const brightness = 1.15 - Math.min(1, normDist) * 0.40;
        const totalScale = (centerDepthScale + state.lift.value);

        // Screen coordinates for pointer magnetic attraction
        const screenJarX = marqueeCenter.x + (relX - winW / 2) * cosAngle - staggeredY * sinAngle;
        const screenJarY = marqueeCenter.y + (relX - winW / 2) * sinAngle + staggeredY * cosAngle;

        // Magnetic Attraction Math
        const dx = pointerX - screenJarX;
        const dy = pointerY - screenJarY;
        const localX = dx * cosAngle + dy * sinAngle;
        const localY = -dx * sinAngle + dy * cosAngle;

        const magneticRadius = itemW * 1.5;
        const distSq = localX * localX + localY * localY;
        const gaussian = Math.exp(-distSq / (magneticRadius * magneticRadius));
        const dirX = Math.tanh(localX / magneticRadius);
        const dirY = Math.tanh(localY / (itemH * 0.8));

        const hoverActive = isPointerFine && !isModalOpen && !isDragging;
        const targetLean = hoverActive ? dirX * 14 * gaussian : 0;
        const targetLift = hoverActive ? 0.18 * gaussian : 0;
        const targetPullX = hoverActive ? dirX * 24 * gaussian : 0;
        const targetPullY = hoverActive ? dirY * 24 * gaussian : 0;

        updateSpring(state.lean, targetLean, 80, 8.5, dtSeconds);
        updateSpring(state.lift, targetLift, 80, 8.5, dtSeconds);
        updateSpring(state.pullX, targetPullX, 80, 8.5, dtSeconds);
        updateSpring(state.pullY, targetPullY, 80, 8.5, dtSeconds);

        // Final Transform & Style
        const finalX = relX + state.pullX.value;
        const finalY = staggeredY + state.pullY.value;
        const finalAngle = baseSineRotation + state.lean.value - velocityLean;

        // When user hovers an item, remove blur instantly so hovered jar is 100% sharp
        const effectiveBlur = gaussian > 0.35 ? 0 : blurAmount;

        item.style.transform = `translate3d(${finalX.toFixed(1)}px, ${finalY.toFixed(1)}px, 0) rotate(${finalAngle.toFixed(2)}deg) scale(${totalScale.toFixed(3)})`;
        item.style.filter = `blur(${effectiveBlur.toFixed(2)}px) brightness(${brightness.toFixed(2)})`;
        item.style.opacity = '1';
        item.style.zIndex = Math.round((1 - Math.min(1, normDist)) * 20 + gaussian * 10);
      }

      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  });
})();
