/* ==========================================================================
   Firman Hanafi — Portfolio Interactions
   Scroll reveals, theme toggle, typing effect, mobile menu
   ========================================================================== */

(function () {
  'use strict';

  // ---------- Scroll Reveal (Intersection Observer) ----------
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  revealElements.forEach((el) => revealObserver.observe(el));

  // ---------- Navbar scroll effect ----------
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  function handleNavScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ---------- Active nav link highlighting ----------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  function updateActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });

  // ---------- Mobile Hamburger Menu ----------
  const hamburger = document.getElementById('navHamburger');
  const navLinksContainer = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinksContainer.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinksContainer.classList.remove('open');
    });
  });

  // ---------- Dark / Light Theme Toggle ----------
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Load stored preference
  const storedTheme = localStorage.getItem('theme');
  if (storedTheme) {
    html.setAttribute('data-theme', storedTheme);
    themeToggle.textContent = storedTheme === 'light' ? '☀️' : '🌙';
  }

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeToggle.textContent = next === 'light' ? '☀️' : '🌙';
  });

  // ---------- Hero Typing Effect ----------
  const phrases = [
    'scaling systems, exploring trails',
    'designing payment architectures',
    'building event-driven platforms',
    'automating with n8n & LLMs',
    'writing clean, resilient code',
  ];

  const typedTextEl = document.querySelector('.typed-text');
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeDelay = 80;

  function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeDelay = 40;
    } else {
      typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeDelay = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeDelay = 2200; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeDelay = 500; // Pause before next phrase
    }

    setTimeout(typeEffect, typeDelay);
  }

  // Start typing after a small delay
  setTimeout(typeEffect, 1200);

  // ---------- Hero Floating Particles ----------
  const particlesContainer = document.getElementById('heroParticles');
  const particleCount = 25;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.width = Math.random() * 3 + 1 + 'px';
    particle.style.height = particle.style.width;
    particle.style.animationDuration = Math.random() * 8 + 6 + 's';
    particle.style.animationDelay = Math.random() * 8 + 's';
    particle.style.opacity = Math.random() * 0.4 + 0.1;
    particlesContainer.appendChild(particle);
  }

  // ---------- Project Tabs ----------
  const projectTabs = document.querySelectorAll('.project-tab');
  const projectPanels = document.querySelectorAll('.project-panel');

  projectTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');

      // Update active tab
      projectTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      // Switch panel
      projectPanels.forEach((panel) => panel.classList.remove('active'));
      const activePanel = document.getElementById('panel-' + targetTab);
      if (activePanel) {
        activePanel.classList.add('active');

        // Re-observe reveal elements in newly active panel
        activePanel.querySelectorAll('.reveal:not(.revealed)').forEach((el) => {
          revealObserver.observe(el);
        });
      }
    });
  });

  // ---------- Smooth scroll for anchor links ----------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
