import { categories as staticCategories, products as staticProducts } from '../../data/products.js';
import { db } from '../integrations/firebase.js';

export async function initProductsListing() {
  const filterHost = document.querySelector('[data-category-filters]');
  const gridHost = document.querySelector('[data-products-grid]');
  const emptyState = document.querySelector('[data-products-empty]');
  
  if (!filterHost || !gridHost) return;

  // Render initial static data as fallback
  let activeCat = new URLSearchParams(window.location.search).get('cat') || 'all';
  let products = [...staticProducts];
  let categories = [...staticCategories];

  function renderProductCard(p) {
    return `
      <div data-category="${p.category}" class="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-light bg-white transition-all hover:border-ind-orange hover:shadow-lg">
        <div class="aspect-[4/3] w-full overflow-hidden bg-off-white">
          <img src="${p.image}" alt="${p.name}" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        </div>
        <div class="flex flex-1 flex-col p-6">
          <div class="mb-4">
            <span class="inline-block rounded-full bg-off-white px-3 py-1 text-xs font-semibold text-ind-orange">${p.category}</span>
          </div>
          <h3 class="font-display text-xl font-bold text-ind-black">${p.name}</h3>
          ${p.bullets ? `<ul class="mt-3 space-y-1.5">${p.bullets.map(b => `<li class="flex items-start gap-2 text-sm text-grey-dark"><span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ind-orange"></span><span>${b}</span></li>`).join('')}</ul>` : ''}
          <div class="mt-auto pt-6">
            <a href="contact.html" class="inline-flex items-center gap-2 text-sm font-semibold text-ind-orange transition-colors hover:text-ind-orange-hover">
              Enquire Now
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="transition-transform group-hover:translate-x-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  function renderGrid() {
    gridHost.innerHTML = products.map(p => renderProductCard(p)).join('');
  }

  function renderFilters() {
    const allBtn = `
      <button type="button" data-cat="all" class="rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
        activeCat === 'all'
          ? 'bg-ind-orange text-white'
          : 'border border-border-light bg-white text-grey-dark hover:border-ind-orange'
      }">All Products</button>`;

    const catBtns = categories.map(cat => `
      <button type="button" data-cat="${cat.slug || cat}" class="rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
        activeCat === (cat.slug || cat)
          ? 'bg-ind-orange text-white'
          : 'border border-border-light bg-white text-grey-dark hover:border-ind-orange'
      }">${cat.name || cat.slug || cat}</button>`
    ).join('');

    filterHost.innerHTML = allBtn + catBtns;
  }

  function applyFilter(cat) {
    activeCat = cat;
    const url = cat === 'all' ? 'products.html' : `products.html?cat=${cat}`;
    window.history.replaceState({}, '', url);

    let visible = 0;
    gridHost.querySelectorAll('[data-category]').forEach(card => {
      const show = cat === 'all' || card.dataset.category === cat;
      card.classList.toggle('hidden', !show);
      if (show) visible++;
    });

    if (emptyState) emptyState.classList.toggle('hidden', visible > 0);
    renderFilters();
  }

  // Initial render (Static data)
  renderGrid();
  renderFilters();
  applyFilter(activeCat);

  // Fetch from Firebase and update
  if (db) {
    try {
      const snapshot = await db.collection('products').orderBy('sortOrder', 'asc').get();
      if (!snapshot.empty) {
        products = [];
        snapshot.forEach(doc => {
          products.push({ id: doc.id, ...doc.data() });
        });
        
        // Extract unique categories from products if a separate categories collection isn't fully managed
        const uniqueCats = [...new Set(products.map(p => p.category))];
        categories = uniqueCats.map(slug => ({ slug, name: slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' ') }));
        
        renderGrid();
        renderFilters();
        applyFilter(activeCat);
      }
    } catch (e) {
      console.warn("Failed to fetch from Firebase, using static data.", e);
    }
  }

  filterHost.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-cat]');
    if (!btn) return;
    applyFilter(btn.dataset.cat);
  });
}
