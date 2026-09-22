// ============================================================
// RPG PLUS — site behavior
// ============================================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---- Mobile nav toggle ---- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close the mobile menu whenever a link is picked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---- Nav background solidifies on scroll ---- */
const nav = document.getElementById('siteNav');
if (nav) {
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 12);
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---- Scroll reveal for sections/cards ---- */
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  if (prefersReducedMotion) {
    revealEls.forEach(el => el.classList.add('in-view'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(el => io.observe(el));
  }
}

/* ---- Hero HUD: level counter tick-up ---- */
const levelNumEl = document.getElementById('levelNum');
if (levelNumEl) {
  const target = 47;
  if (prefersReducedMotion) {
    levelNumEl.textContent = String(target);
  } else {
    const duration = 1200;
    const start = performance.now();
    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = Math.round(eased * target) || 1;
      levelNumEl.textContent = String(value);
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
}

/* ---- FAQ accordion ---- */
document.querySelectorAll('.faq-item__q').forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const answer = item.querySelector('.faq-item__a');
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    // Close any other open item for a cleaner single-focus accordion
    document.querySelectorAll('.faq-item__q[aria-expanded="true"]').forEach((openBtn) => {
      if (openBtn !== btn) {
        openBtn.setAttribute('aria-expanded', 'false');
        openBtn.closest('.faq-item').querySelector('.faq-item__a').style.maxHeight = null;
      }
    });

    btn.setAttribute('aria-expanded', String(!isOpen));
    answer.style.maxHeight = isOpen ? null : `${answer.scrollHeight}px`;
  });
});