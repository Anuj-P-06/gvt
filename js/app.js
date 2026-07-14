import { initAllCountUps } from './hooks/counter.js'
import { initWhatsAppFloat } from './components/layout/whatsapp.js'
import { initHeroCarousel } from './components/home/hero-carousel.js'
import { initTestimonials } from './components/home/testimonials.js'
import { initProductsListing } from './pages/products-listing.js'
import { initIndustriesListing } from './pages/industries-listing.js'
import { initContactForm } from './integrations/email.js'
import { initWhatsAppTracking } from './integrations/whatsapp.js'

const menuBtn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');
const iconOpen = document.getElementById('icon-open');
const iconClose = document.getElementById('icon-close');

menuBtn?.addEventListener('click', () => {
  menu.classList.toggle('hidden');
  iconOpen.classList.toggle('hidden');
  iconClose.classList.toggle('hidden');
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
