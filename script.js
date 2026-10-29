'use strict';

const filters = [...document.querySelectorAll('[data-filter]')];
const cards = [...document.querySelectorAll('.project-card[data-category]')];
const filterStatus = document.getElementById('filter-status');

// Keep all projects visible when JavaScript is disabled.
function filterProjects(category) {
  let visible = 0;
  filters.forEach(button => {
    const selected = button.dataset.filter === category;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  cards.forEach(card => {
    const match = category === 'all' || card.dataset.category === category;
    card.hidden = !match;
    if (match) visible++;
  });
  if (filterStatus) {
    const selected = filters.find(button => button.dataset.filter === category);
    const label = category === 'all' ? 'all' : selected?.textContent.trim().toLowerCase() || category;
    filterStatus.textContent = `Showing ${label} — ${visible} project${visible === 1 ? '' : 's'}`;
  }
}

filters.forEach(button => {
  button.addEventListener('click', () => filterProjects(button.dataset.filter));
});

// Make the mobile menu work with mouse, keyboard, touch, and back navigation.
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.mobile-nav');
function setMenu(open, returnFocus = false) {
  if (!menu || !menuButton) return;
  menu.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  document.body.classList.toggle('menu-open', open);
  if (returnFocus) menuButton.focus();
}
if (menu && menuButton) {
  menuButton.addEventListener('click', () => setMenu(menu.hidden));
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('click', event => {
    if (!menu.hidden && !menu.contains(event.target) && !menuButton.contains(event.target)) setMenu(false);
  });
  window.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) setMenu(false, true);
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) setMenu(false);
  });
  window.addEventListener('hashchange', () => setMenu(false));
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
