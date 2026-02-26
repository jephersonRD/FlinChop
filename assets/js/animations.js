// ============================================================
// FLINCHOP - ANIMACIONES GSAP + TYPING + 3D TILT
// ============================================================

document.addEventListener('DOMContentLoaded', function () {

  // ===== EFECTO TYPING: Videos / Fotos =====
  const typingEl = document.querySelector('.hero-typing');
  const cursorEl = document.querySelector('.hero-cursor');

  if (typingEl) {
    const words = ['Videos', 'Fotos'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
      const current = words[wordIndex];

      if (isDeleting) {
        typingEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typingEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 60 : 120;

      if (!isDeleting && charIndex === current.length) {
        speed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        speed = 400;
      }

      setTimeout(type, speed);
    }

    // Cursor parpadeante CSS
    if (cursorEl) {
      setInterval(() => {
        cursorEl.style.opacity = cursorEl.style.opacity === '0' ? '1' : '0';
      }, 500);
    }

    setTimeout(type, 800);
  }

  // ===== GSAP + SCROLL TRIGGER =====
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP no cargado, usando animaciones CSS');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ── Animar títulos de secciones ──
  gsap.utils.toArray('.section-title, .section-label, .section-subtitle, .section-description').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });

  // ── Feature Cards con stagger ──
  gsap.fromTo('.feature-card',
    { opacity: 0, y: 60, scale: 0.93 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 0.75,
      ease: 'back.out(1.4)',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.features-grid',
        start: 'top 82%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // ── Benefit items ──
  gsap.fromTo('.benefit-item',
    { opacity: 0, x: -50 },
    {
      opacity: 1, x: 0,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.12,
      scrollTrigger: {
        trigger: '.benefits-list',
        start: 'top 82%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // ── Roadmap phases ──
  gsap.fromTo('.roadmap-phase',
    { opacity: 0, y: 50 },
    {
      opacity: 1, y: 0,
      duration: 0.7,
      ease: 'power2.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: '.roadmap-timeline',
        start: 'top 82%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // ── Comparison cards ──
  gsap.fromTo('.comparison-card',
    { opacity: 0, scale: 0.85, y: 40 },
    {
      opacity: 1, scale: 1, y: 0,
      duration: 0.8,
      ease: 'back.out(1.6)',
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.comparison-grid',
        start: 'top 82%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // ── Testimonial cards ──
  gsap.fromTo('.testimonial-card',
    { opacity: 0, y: 50, rotationY: 10 },
    {
      opacity: 1, y: 0, rotationY: 0,
      duration: 0.85,
      ease: 'power3.out',
      stagger: 0.18,
      scrollTrigger: {
        trigger: '.testimonials-grid',
        start: 'top 82%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // ── Requirement cards ──
  gsap.fromTo('.requirement-card',
    { opacity: 0, y: 50, scale: 0.92 },
    {
      opacity: 1, y: 0, scale: 1,
      duration: 0.8,
      ease: 'back.out(1.3)',
      stagger: 0.25,
      scrollTrigger: {
        trigger: '.requirements-grid',
        start: 'top 82%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // ── About section ──
  gsap.fromTo('.about-text',
    { opacity: 0, x: -60 },
    {
      opacity: 1, x: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-inner',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  gsap.fromTo('.about-visual',
    { opacity: 0, x: 60 },
    {
      opacity: 1, x: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.about-inner',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // ── CTA box ──
  gsap.fromTo('.cta-box',
    { opacity: 0, scale: 0.9, y: 40 },
    {
      opacity: 1, scale: 1, y: 0,
      duration: 1,
      ease: 'back.out(1.2)',
      scrollTrigger: {
        trigger: '.cta-box',
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // ── Logo hero flotante ──
  const heroLogo = document.querySelector('.hero-logo');
  if (heroLogo) {
    gsap.to(heroLogo, {
      y: -18,
      duration: 2.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
  }

  // ── Orbs del hero ──
  gsap.utils.toArray('.hero-orb').forEach((orb, i) => {
    gsap.to(orb, {
      x: i % 2 === 0 ? 30 : -30,
      y: i % 2 === 0 ? -20 : 20,
      duration: 4 + i,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1
    });
  });

  // ===== EFECTO 3D TILT EN TARJETAS (como ModerLauncher) =====
  const tiltCards = document.querySelectorAll(
    '.feature-card, .comparison-card, .testimonial-card, .requirement-card, .about-card-main'
  );

  tiltCards.forEach(card => {
    card.style.transformStyle = 'preserve-3d';
    card.style.willChange = 'transform';
    card.style.transition = 'box-shadow 0.3s ease';

    // Efecto shine
    const shine = document.createElement('div');
    shine.style.cssText = `
      position:absolute; inset:0; border-radius:inherit; pointer-events:none;
      background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, transparent 60%);
      opacity:0; transition: opacity 0.3s ease; z-index:2;
    `;
    card.style.position = 'relative';
    card.appendChild(shine);

    card.addEventListener('mouseenter', () => {
      shine.style.opacity = '1';
    });

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      const rotX = ((y - cy) / cy) * -10;
      const rotY = ((x - cx) / cx) * 10;

      gsap.to(card, {
        rotationX: rotX,
        rotationY: rotY,
        scale: 1.04,
        transformPerspective: 900,
        duration: 0.25,
        ease: 'power2.out',
        overwrite: 'auto'
      });

      // Mover shine según el mouse
      const shineX = (x / rect.width) * 100;
      const shineY = (y / rect.height) * 100;
      shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.12), transparent 60%)`;
    });

    card.addEventListener('mouseleave', () => {
      shine.style.opacity = '0';
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out',
        overwrite: 'auto'
      });
    });
  });

  // ===== CONTADORES ANIMADOS =====
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.fromTo({ val: 0 },
          { val: target },
          {
            val: target,
            duration: 2,
            ease: 'power1.out',
            onUpdate: function () {
              el.textContent = Math.ceil(this.targets()[0].val) + suffix;
            }
          }
        );
      }
    });
  });

  console.log('%c✨ FlinChop Animations v2 - GSAP Ready', 'color:#00e5c7; font-weight:bold;');

});
