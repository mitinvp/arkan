// Mobile nav toggle
const burger = document.getElementById('burger');
const mainNav = document.getElementById('mainNav');

burger.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mainNav.classList.remove('open'));
});

// Gallery carousel
const track = document.getElementById('carouselTrack');
const dotsWrap = document.getElementById('carouselDots');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');

if (track) {
  const slides = Array.from(track.children);
  let index = 0;
  let isSyncing = false;
  let syncTimer = null;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Перейти до фото ${i + 1}`);
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });
  const dots = Array.from(dotsWrap.children);

  function setActiveDot() {
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
  }

  function clearSyncGuard() {
    isSyncing = false;
    if (syncTimer) window.clearTimeout(syncTimer);
  }

  function goTo(i) {
    index = (i + slides.length) % slides.length;
    isSyncing = true;
    track.scrollTo({ left: track.clientWidth * index, behavior: 'smooth' });
    setActiveDot();
    // fallback in case 'scrollend' isn't supported or never fires
    if (syncTimer) window.clearTimeout(syncTimer);
    syncTimer = window.setTimeout(clearSyncGuard, 900);
  }

  if ('onscrollend' in window) {
    track.addEventListener('scrollend', clearSyncGuard);
  }

  prevBtn.addEventListener('click', () => goTo(index - 1));
  nextBtn.addEventListener('click', () => goTo(index + 1));

  // keep dots in sync if the user scrolls/swipes the track directly
  track.addEventListener('scroll', () => {
    if (isSyncing) return;
    const newIndex = Math.round(track.scrollLeft / track.clientWidth);
    if (newIndex !== index && newIndex >= 0 && newIndex < slides.length) {
      index = newIndex;
      setActiveDot();
    }
  }, { passive: true });

  // keyboard support when carousel is focused/hovered
  const carousel = document.getElementById('galleryCarousel');
  carousel.setAttribute('tabindex', '0');
  carousel.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goTo(index - 1);
    if (e.key === 'ArrowRight') goTo(index + 1);
  });
}

// Back to top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 600);
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Highlight active nav link on scroll
const navLinks = Array.from(document.querySelectorAll('.main-nav a'));
const sections = navLinks
  .map(link => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

function updateActiveNav() {
  let current = sections[0];
  for (const sec of sections) {
    if (window.scrollY >= sec.offsetTop - 160) current = sec;
  }
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current.id}`);
  });
}

let navTicking = false;
window.addEventListener('scroll', () => {
  if (navTicking) return;
  navTicking = true;
  requestAnimationFrame(() => {
    updateActiveNav();
    navTicking = false;
  });
});

// Recalculate once all images have finished loading, since late-loading
// images shift section offsets and would otherwise throw off the highlight.
window.addEventListener('load', updateActiveNav);
updateActiveNav();
