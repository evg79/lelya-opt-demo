const carousel = document.querySelector('.hero-carousel');
const photos = Array.from(carousel.querySelectorAll('.carousel-photo'));
const controls = carousel.querySelector('.carousel-controls');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
let active = 0;
let timer;
let swipeStart;

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

carousel.addEventListener('touchstart', (event) => {
  swipeStart = event.touches.length === 1 && !event.target.closest('button') ? event.touches[0] : null;
}, { passive: true });
carousel.addEventListener('touchend', (event) => {
  if (!swipeStart) return;
  const touch = event.changedTouches[0];
  const x = touch.clientX - swipeStart.clientX;
  const y = touch.clientY - swipeStart.clientY;
  swipeStart = null;
  if (Math.abs(x) >= 45 && Math.abs(x) > Math.abs(y) * 1.4) {
    showPhoto(x < 0 ? 1 : -1);
    updateTimer();
  }
}, { passive: true });
carousel.addEventListener('touchcancel', () => { swipeStart = null; }, { passive: true });

controls.hidden = false;
updateTimer();
