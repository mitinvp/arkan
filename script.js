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

  // 2. Таби номерів у кожному корпусі
  document.querySelectorAll('.room-tabs').forEach(block => {
    const buttons = Array.from(block.querySelectorAll('.room-tab'));
    const panels = Array.from(block.querySelectorAll('.room-tab-panel'));

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const roomId = btn.getAttribute('data-room');

        buttons.forEach(b => b.classList.toggle('active', b === btn));
        panels.forEach(p => p.classList.toggle('active', p.getAttribute('data-room') === roomId));
      });
    });
  });

  // 3. Галерея-карусель
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

  // 4. Лайтбокс (повноекранний перегляд фото галереї)
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const triggers = Array.from(document.querySelectorAll('.lightbox-trigger'));

  if (lightboxModal && triggers.length) {
    let lbIndex = 0;

    function openLightbox(i) {
      lbIndex = i;
      const img = triggers[lbIndex];
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || '';
      lightboxCaption.textContent = img.alt || '';
      lightboxModal.classList.add('open');
      lightboxModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightboxModal.classList.remove('open');
      lightboxModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    function showLightbox(delta) {
      lbIndex = (lbIndex + delta + triggers.length) % triggers.length;
      const img = triggers[lbIndex];
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || '';
      lightboxCaption.textContent = img.alt || '';
    }

    triggers.forEach((img, i) => {
      img.addEventListener('click', () => openLightbox(i));
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', () => showLightbox(-1));
    if (lightboxNext) lightboxNext.addEventListener('click', () => showLightbox(1));

    // закриття по кліку на темний фон (але не по кліку на саме зображення/кнопки)
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });

    // керування клавіатурою, лише коли лайтбокс відкритий
    document.addEventListener('keydown', (e) => {
      if (!lightboxModal.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showLightbox(-1);
      if (e.key === 'ArrowRight') showLightbox(1);
    });
  }

  // 5. Кнопка «Нагору»
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 600);
    });

    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 6. Активні посилання в навігації при прокручуванні
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