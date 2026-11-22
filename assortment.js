const toolsPanel = document.querySelector('.catalog-tools');
const filters = [...toolsPanel.querySelectorAll('[data-filter]')];
const count = document.querySelector('#catalog-count');
const more = document.querySelector('#catalog-more');
const cards = [...document.querySelectorAll('.catalog-grid [data-category]')];
const pageSize = 24;
let category = 'all';
let limit = pageSize;

const entries = cards.map((card) => ({
  card,
  categories: card.dataset.category.split(' '),
}));

function renderCatalog() {
  let matches = 0;
  for (const {card, categories} of entries) {
    const match = category === 'all' || categories.includes(category);
    if (match) matches += 1;
    card.hidden = !match || matches > limit;
  }
  count.textContent = matches
    ? `Показано ${Math.min(limit, matches)} из ${matches}`
    : 'В этой категории нет товаров.';
  more.hidden = matches <= limit;
}

for (const button of filters) {
  button.addEventListener('click', () => {
    category = button.dataset.filter;
    for (const filter of filters) {
      filter.setAttribute('aria-pressed', String(filter === button));
    }
    limit = pageSize;
    renderCatalog();
  });
}

more.addEventListener('click', () => {
  const shown = cards.filter((card) => !card.hidden);
  limit += pageSize;
  renderCatalog();
  cards.filter((card) => !card.hidden)[shown.length]?.querySelector('h2').focus();
});

toolsPanel.hidden = false;
renderCatalog();
