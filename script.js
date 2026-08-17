document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. КНОПКА «НАГОРУ» (BACK TO TOP)
     ========================================================================== */
  const backToTopBtn = document.getElementById('backToTop');

  if (backToTopBtn) {
    // Відстежуємо прокрутку сторінки
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    // Плавний скролл нагору при кліку
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================================
     2. МОБІЛЬНЕ МЕНЮ (BURGER MENU)
     ========================================================================== */
  const burger = document.getElementById('burger');
  const mainNav = document.getElementById('mainNav');

  if (burger && mainNav) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      mainNav.classList.toggle('active');
    });

    // Закриваємо меню при кліку на будь-яке посилання
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        mainNav.classList.remove('active');
      });
    });
  }

  /* ==========================================================================
     3. КАРУСЕЛЬ ГАЛЕРЕЇ (CAROUSEL SLIDER)
     ========================================================================== */
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsContainer = document.getElementById('carouselDots');

  if (track) {
    const slides = Array.from(track.children);
    let currentIndex = 0;

    // Створення крапок навігації
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('carousel-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
      });
    }

    const updateDots = (index) => {
      if (!dotsContainer) return;
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    };

    const goToSlide = (index) => {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentIndex = index;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      updateDots(currentIndex);
    };

    if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
  }

  /* ==========================================================================
     4. ГАЛЕРЕЯ / МОДАЛЬНЕ ВІКНО (LIGHTBOX)
     ========================================================================== */
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const triggers = document.querySelectorAll('.lightbox-trigger');

  if (lightboxModal && triggers.length > 0) {
    let currentImgIndex = 0;
    const imagesList = Array.from(triggers);

    const openLightbox = (index) => {
      currentImgIndex = index;
      const imgEl = imagesList[currentImgIndex];
      lightboxImg.src = imgEl.src;
      lightboxImg.alt = imgEl.alt || '';
      if (lightboxCaption) lightboxCaption.textContent = imgEl.alt || '';
      
      lightboxModal.classList.add('active');
      lightboxModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden'; // Заборонити прокрутку фону
    };

    const closeLightbox = () => {
      lightboxModal.classList.remove('active');
      lightboxModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    triggers.forEach((img, index) => {
      img.addEventListener('click', () => openLightbox(index));
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', () => {
        let newIndex = currentImgIndex - 1;
        if (newIndex < 0) newIndex = imagesList.length - 1;
        openLightbox(newIndex);
      });
    }

    if (lightboxNext) {
      lightboxNext.addEventListener('click', () => {
        let newIndex = currentImgIndex + 1;
        if (newIndex >= imagesList.length) newIndex = 0;
        openLightbox(newIndex);
      });
    }

    // Закриття при кліку на темний фон
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });

    // Закриття клавішею Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
      }
    });
  }
});