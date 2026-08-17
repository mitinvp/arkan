document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.main-nav a');

  if (burger && mainNav) {
    burger.addEventListener('click', (e) => {
      e.stopPropagation();
      burger.classList.toggle('active');
      mainNav.classList.toggle('active');
    });

    // Закриваємо меню при натисканні на будь-яке посилання
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        burger.classList.remove('active');
        mainNav.classList.remove('active');
      });
    });

    // Закриваємо меню при кліку за його межами
    document.addEventListener('click', (e) => {
      if (!mainNav.contains(e.target) && !burger.contains(e.target)) {
        burger.classList.remove('active');
        mainNav.classList.remove('active');
      }
    });
  }

  // Логіка кнопки "Нагору"
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