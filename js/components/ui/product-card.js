import { icon } from '../../utilities.js'

export function renderProductCard(product) {
    <div class="group overflow-hidden rounded-2xl border border-border-light bg-white transition-shadow duration-300 hover:shadow-lg" data-category="${product.category}">
      <div class="relative h-52 overflow-hidden">
        <img src="${product.image}" alt="${product.name}" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        <div class="absolute inset-0 bg-gradient-to-t from-ind-black/60 to-transparent"></div>
      </div>
      <div class="p-6">
        <h3 class="font-display text-lg font-bold text-ind-black">${product.name}</h3>
        <a href="contact.html" class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ind-orange transition-colors hover:text-ind-orange-hover">
          Enquire Now
          ${icon('ArrowUpRight', 14, 'cta-arrow-icon')}
        </a>
      </div>
    </div>
  `
}
