/* ============================================================
   BOX FIT GYM — JavaScript principal
   ============================================================ */

'use strict';

/* ---------- Navbar scroll ---------- */
const navbar   = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu  = document.getElementById('nav-menu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ---------- Menu mobile ---------- */
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* Fermer en cliquant en dehors */
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navMenu.classList.contains('open')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

/* ---------- Lien actif ---------- */
const page = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === page || (page === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

/* ---------- Scroll reveal ---------- */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-l, .reveal-r').forEach(el => {
  revealObserver.observe(el);
});

/* ---------- Compteurs animés ---------- */
function animateCounter(el, target, suffix = '', duration = 1800) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + suffix;
    }
  }, 16);
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.done) {
      entry.target.dataset.done = '1';
      const target = parseInt(entry.target.dataset.counter, 10);
      const suffix = entry.target.dataset.suffix || '';
      animateCounter(entry.target, target, suffix);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));

/* ---------- Onglets sports (sports.html) ---------- */
const tabs     = document.querySelectorAll('.sport-tab');
const sections = document.querySelectorAll('.sport-section[data-cat]');

if (tabs.length) {
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.tab;
      sections.forEach(s => {
        if (cat === 'all') {
          s.style.display = '';
          s.style.animation = 'fadeInUp 0.4s ease both';
        } else {
          s.style.display = s.dataset.cat === cat ? '' : 'none';
          if (s.dataset.cat === cat) s.style.animation = 'fadeInUp 0.4s ease both';
        }
      });
    });
  });
}

/* ---------- Scroll vers ancre "hero-scroll" ---------- */
const heroScrollBtn = document.querySelector('.hero-scroll');
if (heroScrollBtn) {
  heroScrollBtn.addEventListener('click', () => {
    const target = document.querySelector('.sport-sante-banner') || document.querySelector('main > section:nth-child(2)');
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
}

/* ---------- Formulaire contact ---------- */
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', e => {
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#ff4d4d';
        field.addEventListener('input', () => { field.style.borderColor = ''; }, { once: true });
        valid = false;
      }
    });
    if (!valid) {
      e.preventDefault();
      form.querySelectorAll('[required]')[0]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  /* Message de succès si redirection avec paramètre */
  if (window.location.search.includes('success=1')) {
    const success = document.querySelector('.form-success');
    if (success) {
      success.style.display = 'block';
      form.style.display = 'none';
    }
  }
}
