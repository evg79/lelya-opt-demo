const carousel = document.querySelector('.hero-carousel');
const photos = Array.from(carousel.querySelectorAll('.carousel-photo'));
const controls = carousel.querySelector('.carousel-controls');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let active = 0;
let timer;

function showPhoto(step) {
  photos[active].classList.remove('is-active');
  photos[active].setAttribute('aria-hidden', 'true');
  active = (active + step + photos.length) % photos.length;
  photos[active].classList.add('is-active');
  photos[active].removeAttribute('aria-hidden');
}

function updateTimer() {
  clearInterval(timer);
  if (!reducedMotion.matches && !document.hidden) {
    timer = setInterval(() => showPhoto(1), 3000);
  }
}

for (const button of controls.querySelectorAll('[data-step]')) {
  button.addEventListener('click', () => {
    showPhoto(Number(button.dataset.step));
    updateTimer();
  });
}
document.addEventListener('visibilitychange', updateTimer);
reducedMotion.addEventListener('change', updateTimer);

controls.hidden = false;
updateTimer();
