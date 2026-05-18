// ── HAMBURGER ────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  const open = hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileNav.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ── HERO SLIDER ───────────────────────────────────────────
const slides   = document.querySelectorAll('.hero-slide');
const dots     = document.querySelectorAll('.hero-dot');
const slider   = document.querySelector('.hero');
const INTERVAL = 5500;
let current    = 0;
let timer      = null;
const reduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function goTo(index) {
  slides[current].classList.remove('active');
  slides[current].setAttribute('aria-hidden', 'true');
  dots[current].classList.remove('active');
  dots[current].setAttribute('aria-selected', 'false');
  current = (index + slides.length) % slides.length;
  slides[current].classList.add('active');
  slides[current].setAttribute('aria-hidden', 'false');
  dots[current].classList.add('active');
  dots[current].setAttribute('aria-selected', 'true');
}

function startTimer() {
  if (reduced) return;
  clearInterval(timer);
  timer = setInterval(() => goTo(current + 1), INTERVAL);
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => { goTo(i); startTimer(); });
});

slider.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') { goTo(current + 1); startTimer(); }
  if (e.key === 'ArrowLeft')  { goTo(current - 1); startTimer(); }
});

slider.addEventListener('mouseenter', () => clearInterval(timer));
slider.addEventListener('mouseleave', startTimer);

startTimer();

// ── ACTIVE NAV ON SCROLL ──────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .mobile-nav a[href^="#"]');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-10% 0px -70% 0px' });

sections.forEach(s => observer.observe(s));
