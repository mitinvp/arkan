document.addEventListener('DOMContentLoaded', () => {
  // 1. Мобільне випадаюче меню
  const burger = document.querySelector('.burger');
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.main-nav a');

  if (burger && mainNav) {
    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      burger.classList.toggle('active');
      mainNav.classList.toggle('active');
    });

    // Закриття при клиці на пункт меню
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        mainNav.classList.remove('active');
      });
    });

    // Закриття при клиці поза меню
    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !burger.contains(e.target)) {
        burger.classList.remove('active');
        mainNav.classList.remove('active');
      }
    });
  }

  // 2. Кнопка "Нагору"
  const backToTopBtn = document.querySelector('.back-to-top');

  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
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