import { industries } from '../../data/industries.js';

export function initIndustriesListing() {
  const gridHost = document.getElementById('industries-grid');
  if (!gridHost) return;

  gridHost.innerHTML = industries.map((ind) => `
    <div class="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border-light bg-white transition-all hover:border-ind-orange hover:shadow-lg">
      <div class="aspect-[4/3] w-full overflow-hidden bg-off-white">
        <img src="${ind.image}" alt="${ind.name}" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
      </div>
      <div class="flex flex-1 flex-col p-6 lg:p-8">
        <h3 class="font-display text-2xl font-bold text-ind-black">${ind.name}</h3>
        <p class="mt-4 flex-1 text-sm leading-relaxed text-grey-dark">${ind.description}</p>
        <div class="mt-6 border-t border-border-light pt-6">
          <h4 class="mb-3 text-xs font-semibold text-ind-black">Key Equipment</h4>
          <ul class="space-y-2 text-sm text-grey-dark">
            ${ind.products.map(p => `
              <li class="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="mt-0.5 shrink-0 text-ind-orange"><path d="M20 6 9 17l-5-5"/></svg>
                <span>${p}</span>
              </li>
            `).join('')}
          </ul>
        </div>
      </div>
    </div>
  `).join('');
}
