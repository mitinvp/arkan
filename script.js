// Mobile navigation menu toggle
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

// Carousel slider for gallery
const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');

if (track && prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
  });
}

// ===== LIGHTBOX GALLERY FUNCTIONALITY =====
const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentImgIndex = 0;
const imagesList = Array.from(lightboxTriggers).map(img => ({
  src: img.src,
  alt: img.alt || 'Фото комплексу Аркан'
}));

function openLightbox(index) {
  currentImgIndex = index;
  lightboxImg.src = imagesList[currentImgIndex].src;
  lightboxCaption.textContent = imagesList[currentImgIndex].alt;
  lightboxModal.classList.add('active');
  lightboxModal.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  lightboxModal.classList.remove('active');
  lightboxModal.setAttribute('aria-hidden', 'true');
}

lightboxTriggers.forEach((trigger, index) => {
  trigger.addEventListener('click', () => openLightbox(index));
});

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

if (lightboxPrev) {
  lightboxPrev.addEventListener('click', () => {
    currentImgIndex = (currentImgIndex - 1 + imagesList.length) % imagesList.length;
    openLightbox(currentImgIndex);
  });
}

if (lightboxNext) {
  lightboxNext.addEventListener('click', () => {
    currentImgIndex = (currentImgIndex + 1) % imagesList.length;
    openLightbox(currentImgIndex);
  });
}

// Close lightbox on backdrop click or ESC key
if (lightboxModal) {
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) closeLightbox();
  });
}

document.addEventListener('keydown', (e) => {
  if (!lightboxModal.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft' && lightboxPrev) lightboxPrev.click();
  if (e.key === 'ArrowRight' && lightboxNext) lightboxNext.click();
});

// Back to top button visibility
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.style.display = 'block';
    } else {
      backToTop.style.display = 'none';
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Highlight active navigation menu link on scroll
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

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);