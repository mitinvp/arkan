// Mobile nav toggle
const burger = document.getElementById('burger');
const mainNav = document.getElementById('mainNav');

burger.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mainNav.classList.remove('open'));
});
