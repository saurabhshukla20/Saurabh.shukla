// ============================================
// NAVBAR — scroll behavior
// ============================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ============================================
// MOBILE NAV — hamburger toggle
// ============================================
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  // Animate hamburger to X
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity   = '';
    spans[2].style.transform = '';
  }
});

// Close nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity   = '';
    });
  });
});

// ============================================
// PUBLICATION TABS
// ============================================
document.querySelectorAll('.pub-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    // Update active tab
    document.querySelectorAll('.pub-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Show corresponding list
    const target = tab.getAttribute('data-tab');
    document.querySelectorAll('.pub-list').forEach(list => {
      if (list.id === `tab-${target}`) {
        list.classList.remove('hidden');
      } else {
        list.classList.add('hidden');
      }
    });
  });
});

// ============================================
// SCROLL REVEAL
// ============================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// Apply reveal to key elements
const revealSelectors = [
  '.stat-card',
  '.expertise-item',
  '.timeline-item',
  '.pillar',
  '.pub-item',
  '.event-card',
  '.achieve-card',
  '.contact-card',
  '.section-header',
  '.about-text',
  '.cert-card',
  '.rrr-banner',
];

revealSelectors.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.05}s`;
    revealObserver.observe(el);
  });
});

// ============================================
// SMOOTH ACTIVE NAV HIGHLIGHT
// ============================================
const sections = document.querySelectorAll('section[id], header[id]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      document.querySelectorAll('.nav-links a').forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === `#${id}`) {
          a.style.color = 'var(--gold-lt)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

// ============================================
// COUNTER ANIMATION for stats
// ============================================
function animateCounter(el, target, suffix = '') {
  const duration = 1800;
  const start    = performance.now();
  const isInt    = Number.isInteger(target);

  function step(ts) {
    const elapsed  = ts - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    const value    = eased * target;

    el.textContent = (isInt ? Math.round(value) : value.toFixed(1)) + suffix;

    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numEl  = entry.target.querySelector('.stat-num');
      const raw    = numEl.textContent;
      const suffix = raw.replace(/[\d.]/g, '');
      const num    = parseFloat(raw);

      if (!isNaN(num)) animateCounter(numEl, num, suffix);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => statObserver.observe(card));
