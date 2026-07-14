// WhatsApp Integration and Click Tracking
import { db } from './firebase.js';

export function trackWhatsAppClick(source) {
  if (db) {
    try {
      db.collection('whatsapp_clicks').add({
        source: source,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        url: window.location.href
      });
    } catch (e) {
      console.warn("Error tracking whatsapp click:", e);
    }
  }
}

export function initWhatsAppTracking() {
  // Add click listeners to all WhatsApp links
  document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', () => {
      // Determine source from closest section or id
      let source = "unknown";
      if (link.closest('#whatsapp-float-container')) source = "float_button";
      else if (link.closest('[data-hero-carousel]')) source = "hero_carousel";
      else if (link.closest('.py-20')) source = "contact_page";
      
      trackWhatsAppClick(source);
    });
  });
}
