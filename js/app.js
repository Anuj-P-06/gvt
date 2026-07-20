import { initAllCountUps } from './hooks/counter.js'
import { initWhatsAppFloat } from './components/layout/whatsapp.js'
import { initHeroCarousel } from './components/home/hero-carousel.js'
import { initTestimonials } from './components/home/testimonials.js'
import { initProductsListing } from './pages/products-listing.js'
import { initIndustriesListing } from './pages/industries-listing.js'
import { initContactForm } from './integrations/email.js'
import { initWhatsAppTracking } from './integrations/whatsapp.js'

const menuBtn = document.getElementById('mobile-menu-btn');
const drawer = document.getElementById('mobile-nav-drawer');
const overlay = document.getElementById('mobile-nav-overlay');

function openMenu() {
  menuBtn?.classList.add('is-open');
  drawer?.classList.add('is-open');
  overlay?.classList.add('is-open');
  menuBtn?.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  menuBtn?.classList.remove('is-open');
  drawer?.classList.remove('is-open');
  overlay?.classList.remove('is-open');
  menuBtn?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

menuBtn?.addEventListener('click', () => {
  menuBtn.classList.contains('is-open') ? closeMenu() : openMenu();
});

overlay?.addEventListener('click', closeMenu);

drawer?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMenu();
});

function setFooterYear() {
  document.querySelectorAll('[data-current-year]').forEach((el) => {
    el.textContent = String(new Date().getFullYear())
  })
}

document.addEventListener('DOMContentLoaded', () => {
  setFooterYear()
  initAllCountUps()
  initWhatsAppFloat()
  initWhatsAppTracking()
  
  const carousel = document.querySelector('[data-hero-carousel]')
  if (carousel) initHeroCarousel(carousel)
  
  const testimonials = document.querySelector('[data-testimonials]')
  if (testimonials) initTestimonials(testimonials)
  
  initProductsListing()
  initIndustriesListing()
  initContactForm()
})
