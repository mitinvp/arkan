document.addEventListener('DOMContentLoaded', () => {
  // 1. Мобільне меню (Burger Menu)
  const burger = document.getElementById('burger');
  const mainNav = document.getElementById('mainNav');
  const navLinks = mainNav ? mainNav.querySelectorAll('a') : [];

  if (burger && mainNav) {
    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      burger.classList.toggle('active');
      mainNav.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        mainNav.classList.remove('active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !burger.contains(e.target)) {
        burger.classList.remove('active');
        mainNav.classList.remove('active');
      }
    });
  }

  // 2. Галерея-карусель (Carousel Slider)
  const track = document.getElementById('carouselTrack');
  const slides = track ? Array.from(track.children) : [];
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsContainer = document.getElementById('carouselDots');

  if (track && slides.length > 0) {
    let currentIndex = 0;

    // Створення крапок навігації
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      if (dotsContainer) dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer ? Array.from(dotsContainer.children) : [];

    const updateCarousel = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    };

    const goToSlide = (index) => {
      currentIndex = index;
      updateCarousel();
    };

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel();
      });
    }
  }

  // 3. Лайтбокс (Lightbox Modal)
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const triggers = document.querySelectorAll('.lightbox-trigger');

  if (lightboxModal && lightboxImg) {
    let currentTriggerIndex = 0;
    const triggerImages = Array.from(triggers);

    const showLightbox = (index) => {
      currentTriggerIndex = index;
      lightboxImg.src = triggerImages[currentTriggerIndex].src;
      lightboxModal.classList.add('active');
      lightboxModal.setAttribute('aria-hidden', 'false');
    };

    const hideLightbox = () => {
      lightboxModal.classList.remove('active');
      lightboxModal.setAttribute('aria-hidden', 'true');
    };

    triggerImages.forEach((img, idx) => {
      img.addEventListener('click', () => showLightbox(idx));
    });

    if (lightboxClose) lightboxClose.addEventListener('click', hideLightbox);

    if (lightboxNext) {
      lightboxNext.addEventListener('click', () => {
        currentTriggerIndex = (currentTriggerIndex + 1) % triggerImages.length;
        lightboxImg.src = triggerImages[currentTriggerIndex].src;
      });
    }

    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', () => {
        currentTriggerIndex = (currentTriggerIndex - 1 + triggerImages.length) % triggerImages.length;
        lightboxImg.src = triggerImages[currentTriggerIndex].src;
      });
    }

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) hideLightbox();
    });
  }

  // 4. Кнопка «Нагору» (Back to top)
  const backToTopBtn = document.getElementById('backToTop');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});