// Site behavior. The script runs after the page markup has loaded.
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

initializeMobileNavigation();
initializeNavigationScrollState();
initializeScrollReveals();
initializeLevelCounter();
initializeFaqAccordion();

function initializeMobileNavigation() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    const isOpen = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initializeNavigationScrollState() {
  const navigation = document.getElementById('siteNav');
  if (!navigation) return;

  const updateScrollState = () => {
    navigation.classList.toggle('is-scrolled', window.scrollY > 12);
  };

  document.addEventListener('scroll', updateScrollState, { passive: true });
  updateScrollState();
}

function initializeScrollReveals() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  if (prefersReducedMotion) {
    elements.forEach((element) => element.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach((element) => observer.observe(element));
}

function initializeLevelCounter() {
  const levelNumber = document.getElementById('levelNum');
  if (!levelNumber) return;

  const targetLevel = 47;
  if (prefersReducedMotion) {
    levelNumber.textContent = String(targetLevel);
    return;
  }

  const durationMs = 1200;
  const startTime = performance.now();

  function updateLevel(now) {
    const progress = Math.min((now - startTime) / durationMs, 1);
    const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cubic.
    levelNumber.textContent = String(Math.round(easedProgress * targetLevel) || 1);
    if (progress < 1) requestAnimationFrame(updateLevel);
  }

  requestAnimationFrame(updateLevel);
}

function initializeFaqAccordion() {
  document.querySelectorAll('.faq-item__q').forEach((button) => {
    button.addEventListener('click', () => {
      const isOpen = button.getAttribute('aria-expanded') === 'true';

      // Keep at most one answer open at a time.
      document.querySelectorAll('.faq-item__q[aria-expanded="true"]').forEach((openButton) => {
        if (openButton !== button) setFaqExpanded(openButton, false);
      });

      setFaqExpanded(button, !isOpen);
    });
  });
}

function setFaqExpanded(button, expanded) {
  const answer = button.closest('.faq-item').querySelector('.faq-item__a');
  button.setAttribute('aria-expanded', String(expanded));
  answer.style.maxHeight = expanded ? `${answer.scrollHeight}px` : null;
}
