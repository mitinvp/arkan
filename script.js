document.addEventListener('DOMContentLoaded', () => {
  // 1. Мобільне меню
  const burger = document.getElementById('burger');
  const mainNav = document.getElementById('mainNav');

  if (burger && mainNav) {
    burger.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mainNav.classList.remove('open'));
    });
  }

  // 2. Галерея-карусель
  const track = document.getElementById('carouselTrack');
  const dotsWrap = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');

  if (track && dotsWrap) {
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
      if (syncTimer) window.clearTimeout(syncTimer);
      syncTimer = window.setTimeout(clearSyncGuard, 900);
    }

    if ('onscrollend' in window) {
      track.addEventListener('scrollend', clearSyncGuard);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(index - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(index + 1));

    track.addEventListener('scroll', () => {
      if (isSyncing) return;
      const newIndex = Math.round(track.scrollLeft / track.clientWidth);
      if (newIndex !== index && newIndex >= 0 && newIndex < slides.length) {
        index = newIndex;
        setActiveDot();
      }
    }, { passive: true });

    const carousel = document.getElementById('galleryCarousel');
    if (carousel) {
      carousel.setAttribute('tabindex', '0');
      carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') goTo(index - 1);
        if (e.key === 'ArrowRight') goTo(index + 1);
      });
    }
  }

  // 3. Кнопка «Нагору»
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 600);
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 4. Активні посилання в навігації при прокручуванні
  const navLinks = Array.from(document.querySelectorAll('.main-nav a'));
  const sections = navLinks
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  function updateActiveNav() {
    let current = sections[0];
    for (const sec of sections) {
      if (window.scrollY >= sec.offsetTop - 160) {
        current = sec;
      }
    }
    if (current) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current.id}`);
      });
    }
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

  window.addEventListener('load', updateActiveNav);
  updateActiveNav();
});