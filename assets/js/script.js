// ============================================================
// FLINCHOP LANDING PAGE - JAVASCRIPT
// ============================================================

(function() {
  'use strict';

  // ===== NAVBAR SCROLL EFFECT (Optimizado con requestAnimationFrame) =====
  const navbar = document.getElementById('navbar');
  let lastScrollY = window.scrollY;
  let ticking = false;

  function handleNavbarScroll() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 100) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
    
    lastScrollY = currentScrollY;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(handleNavbarScroll);
      ticking = true;
    }
  }, { passive: true });

  // ===== MOBILE HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navMenu.classList.toggle('mobile-open');
      
      const isOpen = navMenu.classList.contains('mobile-open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Cerrar menú al hacer clic en un link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMenu.classList.remove('mobile-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ===== SMOOTH SCROLL (Optimizado para bajo rendimiento) =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const offsetTop = target.offsetTop - 80;
        // Detectar si el dispositivo soporta smooth scroll eficientemente
        const supportsSmooth = 'scrollBehavior' in document.documentElement.style;
        const isLowEnd = navigator.hardwareConcurrency <= 2 || navigator.deviceMemory <= 2;
        
        window.scrollTo({
          top: offsetTop,
          behavior: (supportsSmooth && !isLowEnd) ? 'smooth' : 'auto'
        });
      }
    });
  });

  // ===== SCROLL REVEAL ANIMATIONS =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

  // ===== FAQ ACCORDION ANIMATIONS (Optimizado) =====
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    item.addEventListener('toggle', function() {
      if (this.open) {
        const isLowEnd = navigator.hardwareConcurrency <= 2 || navigator.deviceMemory <= 2;
        setTimeout(() => {
          this.scrollIntoView({ behavior: isLowEnd ? 'auto' : 'smooth', block: 'nearest' });
        }, 100);
      }
    });
  });

  // ===== LAZY LOADING DE IMÁGENES =====
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // ===== DETECCIÓN DE DISPOSITIVO =====
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(navigator.userAgent);
  
  if (isMobile) {
    document.body.classList.add('is-mobile');
  }
  if (isTablet) {
    document.body.classList.add('is-tablet');
  }

  // ===== MANEJO DE ERRORES DE IMÁGENES =====
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      if (!this.classList.contains('error-handled')) {
        this.classList.add('error-handled');
        console.warn('Error cargando imagen:', this.src);
        this.style.opacity = '0';
      }
    });
  });

  // ===== SISTEMA DE NOTIFICACIONES =====
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      padding: 16px 24px;
      background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#667eea'};
      color: white;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      z-index: 10000;
      font-size: 14px;
      font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  // Exponer funciones globalmente
  window.FlinChop = {
    showNotification
  };

  // ===== PERFORMANCE MONITORING =====
  if ('performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Página cargada en ${pageLoadTime}ms`);
      }, 0);
    });
  }

  // ===== BOTÓN DE SCROLL TO TOP (Optimizado) =====
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="18 15 12 9 6 15"/></svg>';
  scrollTopBtn.className = 'scroll-to-top social-btn';
  scrollTopBtn.setAttribute('aria-label', 'Volver arriba');
  scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
  `;
  
  document.body.appendChild(scrollTopBtn);
  
  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 500) {
          scrollTopBtn.style.opacity = '1';
          scrollTopBtn.style.visibility = 'visible';
        } else {
          scrollTopBtn.style.opacity = '0';
          scrollTopBtn.style.visibility = 'hidden';
        }
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });
  
  scrollTopBtn.addEventListener('click', () => {
    const isLowEnd = navigator.hardwareConcurrency <= 2 || navigator.deviceMemory <= 2;
    window.scrollTo({ top: 0, behavior: isLowEnd ? 'auto' : 'smooth' });
  });

  // ===== ANIMACIÓN DE TESTIMONIOS DESACTIVADA - Ahora usa GSAP =====
  // Las animaciones ahora son manejadas por GSAP en animations.js

  // ===== ANIMACIÓN 3D DESACTIVADA - Ahora usa GSAP =====
  // Las animaciones 3D ahora son manejadas por GSAP en animations.js

  // ===== ANIMACIÓN DE REQUISITOS DESACTIVADA - Ahora usa GSAP =====
  // Las animaciones ahora son manejadas por GSAP en animations.js

  // ===== ANIMACIÓN DE TESTIMONIOS CON DELAY =====
  const testimonialCardsNew = document.querySelectorAll('.testimonial-card');
  
  if (testimonialCardsNew.length > 0) {
    const testimonialObserverNew = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          testimonialObserverNew.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    testimonialCardsNew.forEach(card => {
      testimonialObserverNew.observe(card);
    });
  }

  // ===== EFECTO DE BRILLO EN BADGES (Desactivado en bajo rendimiento) =====
  const badges = document.querySelectorAll('.badge-success');
  
  if (!isLowEnd && !isMobile) {
    badges.forEach(badge => {
      let angle = 0;
      setInterval(() => {
        angle += 2;
        const gradient = `linear-gradient(${angle}deg, rgba(0, 229, 199, 0.3), rgba(0, 229, 199, 0.1))`;
        badge.style.backgroundImage = gradient;
      }, 50);
    });
  }

  // ===== CONTADOR ANIMADO PARA ESTADÍSTICAS =====
  function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current);
    }, 16);
  }

  // ===== ANIMACIÓN DE ENTRADA PARA FAQ =====
  const faqItemsNew = document.querySelectorAll('.faq-item');
  
  if (faqItemsNew.length > 0) {
    const faqObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
          faqObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    faqItemsNew.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-30px)';
      item.style.transition = `all 0.5s ease-out ${index * 0.05}s`;
      faqObserver.observe(item);
    });
  }

  // ===== EFECTO DE PARTÍCULAS EN HOVER PARA TARJETAS =====
  function createParticle(x, y, color) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: 4px;
      height: 4px;
      background: ${color};
      border-radius: 50%;
      pointer-events: none;
      left: ${x}px;
      top: ${y}px;
      animation: particle-float 1s ease-out forwards;
      z-index: 100;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 1000);
  }

  // Agregar animación CSS para partículas
  if (!document.getElementById('particle-animation')) {
    const style = document.createElement('style');
    style.id = 'particle-animation';
    style.textContent = `
      @keyframes particle-float {
        0% {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
        100% {
          transform: translateY(-50px) scale(0);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ===== PARALLAX DESACTIVADO - Ahora usa GSAP ScrollTrigger =====
  // El parallax ahora es manejado por GSAP en animations.js

  // ===== EFECTO DE TYPING EN TÍTULOS =====
  function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    type();
  }

  // ===== ANIMACIÓN DE FLECHA DE COMPARACIÓN (Optimizado) =====
  const comparisonArrow = document.querySelector('.comparison-arrow svg');
  
  if (comparisonArrow && !isLowEnd) {
    comparisonArrow.style.transition = 'transform 0.3s ease';
    setInterval(() => {
      comparisonArrow.style.transform = 'translateX(10px)';
      setTimeout(() => {
        comparisonArrow.style.transform = 'translateX(0)';
      }, 300);
    }, 2000);
  }

  // ===== CURSOR GLOW DESACTIVADO =====
  // Removido para mejorar rendimiento

  // ===== ANIMACIÓN DE ENTRADA PARA IMÁGENES DE COMPARACIÓN =====
  const comparisonImages = document.querySelectorAll('.comparison-image img');
  
  if (comparisonImages.length > 0) {
    const imageObserverComp = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'scale(1)';
          imageObserverComp.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    comparisonImages.forEach(img => {
      img.style.opacity = '0';
      img.style.transform = 'scale(0.9)';
      img.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
      imageObserverComp.observe(img);
    });
  }

  // ===== EFECTO TYPING PARA TÍTULO HERO =====
  const heroTypingElement = document.querySelector('.hero-typing');
  
  if (heroTypingElement) {
    const words = ['Videos', 'Fotos'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    
    function typeEffect() {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        heroTypingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 75;
      } else {
        heroTypingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
      }
      
      if (!isDeleting && charIndex === currentWord.length) {
        // Pausa al final de la palabra
        typingSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 500;
      }
      
      setTimeout(typeEffect, typingSpeed);
    }
    
    // Iniciar el efecto después de un pequeño delay
    setTimeout(typeEffect, 500);
  }

  // ===== CONSOLE MESSAGE =====
  console.log('%c🎬 FlinChop Landing Page', 'font-size: 20px; font-weight: bold; color: #667eea;');
  console.log('%cEdita. Crea. Domina.', 'font-size: 14px; color: #764ba2;');
  console.log('%c📱 Dispositivo: ' + (isMobile ? 'Móvil' : isTablet ? 'Tablet' : 'Desktop'), 'color: #667eea;');
  console.log('%c✨ Animaciones mejoradas activadas', 'font-size: 12px; color: #00e5c7;');

})();
