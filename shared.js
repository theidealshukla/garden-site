/* =========================================================
   shared.js — runs on every page
   ========================================================= */

// ── 1. Lucide Icons ──────────────────────────────────────
if (typeof lucide !== 'undefined') lucide.createIcons();

// ── 2. Lenis Smooth Scroll ───────────────────────────────
const lenis = new Lenis({
  duration: 1.2,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// ── 3. GSAP + ScrollTrigger ──────────────────────────────
gsap.registerPlugin(ScrollTrigger);
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// ── 4. Navbar scroll state toggle ────────────────────────
// On the homepage: glass on hero → minimal solid after hero
// On other pages: always solid from the start
const navbar    = document.getElementById('navbar');
const navInner  = document.getElementById('nav-inner');
const navLogo   = document.getElementById('nav-logo');
const navLinks  = document.querySelectorAll('#nav-links .nav-link');
const navCta    = document.getElementById('nav-cta');
const menuBtn   = document.getElementById('menu-btn');
const heroEl    = document.getElementById('hero');

function setNavSolid() {
  if (!navInner) return;
  navInner.classList.remove('bg-dark/30', 'backdrop-blur-xl', 'border-white/10', 'shadow-[0_8px_32px_rgba(0,0,0,0.12)]');
  navInner.classList.add('bg-cream/95', 'backdrop-blur-md', 'border-dark/8', 'shadow-sm');
  if (navLogo) {
    navLogo.classList.remove('text-white');
    navLogo.classList.add('text-dark');
  }
  navLinks.forEach(link => {
    link.classList.remove('text-white/90');
    link.classList.add('text-dark/80');
  });
  if (menuBtn) {
    menuBtn.classList.remove('text-white');
    menuBtn.classList.add('text-dark');
  }
  if (navbar) navbar.setAttribute('data-state', 'solid');
}

function setNavGlass() {
  if (!navInner) return;
  navInner.classList.remove('bg-cream/95', 'backdrop-blur-md', 'border-dark/8', 'shadow-sm');
  navInner.classList.add('bg-dark/30', 'backdrop-blur-xl', 'border-white/10', 'shadow-[0_8px_32px_rgba(0,0,0,0.12)]');
  if (navLogo) {
    navLogo.classList.remove('text-dark');
    navLogo.classList.add('text-white');
  }
  navLinks.forEach(link => {
    link.classList.remove('text-dark/80');
    link.classList.add('text-white/90');
  });
  if (menuBtn) {
    menuBtn.classList.remove('text-dark');
    menuBtn.classList.add('text-white');
  }
  if (navbar) navbar.setAttribute('data-state', 'hero');
}

if (heroEl && navbar) {
  // Homepage — toggle based on scroll past hero
  ScrollTrigger.create({
    trigger: heroEl,
    start: 'bottom 80px',
    onEnter: () => setNavSolid(),
    onLeaveBack: () => setNavGlass(),
  });
} else if (navbar) {
  // Non-homepage — always solid
  setNavSolid();
}

// ── 5. Mobile menu toggle ────────────────────────────────
const mobileMenu = document.getElementById('mobile-menu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    const icon = menuBtn.querySelector('[data-lucide]');
    if (icon) {
      icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
      lucide.createIcons();
    }
    if (isOpen) {
      gsap.from(mobileMenu, { y: -12, opacity: 0, duration: 0.28, ease: 'power2.out' });
    }
  });
  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      const icon = menuBtn.querySelector('[data-lucide]');
      if (icon) { icon.setAttribute('data-lucide', 'menu'); lucide.createIcons(); }
    });
  });
}

// ── 6. Universal reveal-up ───────────────────────────────
gsap.utils.toArray('.reveal-up').forEach(el => {
  gsap.fromTo(el,
    { y: 48, autoAlpha: 0 },
    {
      y: 0, autoAlpha: 1, duration: 0.85, ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' }
    }
  );
});

// ── 7. Staggered children ────────────────────────────────
gsap.utils.toArray('.reveal-stagger').forEach(parent => {
  gsap.from(parent.children, {
    y: 40, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
    scrollTrigger: { trigger: parent, start: 'top 85%' }
  });
});
