const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation menu');
}));

const profileCard = document.querySelector('.id-card');
profileCard.addEventListener('click', () => {
  const flipped = profileCard.classList.toggle('flipped');
  profileCard.setAttribute('aria-pressed', String(flipped));
});

document.querySelector('#year').textContent = new Date().getFullYear();
const clock = document.querySelector('#local-time');
const timezone = 'Asia/Kolkata';
const updateClock = () => {
  clock.textContent = new Intl.DateTimeFormat('en-IN', {hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:true, timeZone:timezone}).format(new Date());
};
updateClock();
setInterval(updateClock, 1000);

// Reveal content as it enters the viewport, without hiding anything for users
// whose browser does not support IntersectionObserver.
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.documentElement.classList.add('js-motion');
  const revealItems = document.querySelectorAll('.section-heading, .identity-grid, .about-grid, .stack-intro, .stack-row, .work-intro, .project-row, .cap-grid, .contact-panel');
  revealItems.forEach((item, index) => {
    item.dataset.reveal = '';
    item.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  });
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.12});
  revealItems.forEach((item) => revealObserver.observe(item));
}

// Keep the section currently in view highlighted in the navigation.
const sectionLinks = [...document.querySelectorAll('.nav a[href^="#"]')];
const observedSections = sectionLinks.map((link) => document.querySelector(link.getAttribute('href'))).filter(Boolean);
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        sectionLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    });
  }, {rootMargin: '-30% 0px -60% 0px'});
  observedSections.forEach((section) => sectionObserver.observe(section));
}

// Give the portrait a restrained pointer response on larger screens.
const heroVisual = document.querySelector('.hero-visual');
const portrait = document.querySelector('.hero-portrait');
if (window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  heroVisual.addEventListener('pointermove', (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    portrait.style.transform = `scale(1.035) translate(${x * -9}px, ${y * -9}px)`;
  });
  heroVisual.addEventListener('pointerleave', () => { portrait.style.transform = ''; });
}
