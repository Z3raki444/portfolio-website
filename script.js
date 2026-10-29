'use strict';
const filters = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('[data-category]');
filters.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;
    filters.forEach((filter) => {
      const active = filter === button;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    cards.forEach((card) => { card.hidden = !(selected === 'all' || card.dataset.category === selected); });
  });
});
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.mobile-nav');
function setMenu(open) {
  menu.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  document.body.classList.toggle('menu-open', open);
}
menuButton.addEventListener('click', () => setMenu(menu.hidden));
menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
window.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenu(false); });
window.addEventListener('resize', () => { if (window.innerWidth > 760) setMenu(false); });
document.getElementById('year').textContent = new Date().getFullYear();
