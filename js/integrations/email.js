// EmailJS Integration - No Firebase required
// Service: service_qqm9hoc | Template: template_d8xd9xm

const EMAILJS_SERVICE_ID  = 'service_qqm9hoc';
const EMAILJS_TEMPLATE_ID = 'template_d8xd9xm';
const EMAILJS_PUBLIC_KEY  = 'AKwJUUtPziXsgD24f';

export function initContactForm() {
  const form      = document.getElementById('contact-form');
  const success   = document.getElementById('contact-success');
  const submitBtn = document.getElementById('contact-submit-btn');

  if (!form || !success) return;

  // Initialise EmailJS with the public key
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_PUBLIC_KEY);
  } else {
    console.warn('EmailJS SDK not loaded.');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (typeof emailjs === 'undefined') {
      alert('Email service is not available. Please try again later.');
      return;
    }

    const name        = document.getElementById('name').value.trim();
    const company     = document.getElementById('company')?.value.trim() || '';
    const email       = document.getElementById('email').value.trim();
    const countryCode = document.getElementById('country-code')?.value || '+91';
    const rawPhone    = document.getElementById('phone').value.trim();
    const phone       = rawPhone ? `${countryCode} ${rawPhone}` : 'Not provided';
    const message     = document.getElementById('message').value.trim();

    // Disable button while sending
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML   = '<span>Sending...</span>';
    submitBtn.disabled    = true;

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name:    name,
        company_name: company || 'Not provided',
        from_email:   email,
        phone:        phone,
        message:      company ? `[Company: ${company}]\n\n${message}` : message,
        to_email:     'info@gvtgroup.net',
        reply_to:     email,
      });

      form.classList.add('hidden');
      success.classList.remove('hidden');
    } catch (error) {
      const status = error?.status ?? 'unknown';
      const text   = error?.text   ?? JSON.stringify(error);
      console.error('EmailJS error — status:', status, '| text:', text);
      alert(`Email failed (${status}): ${text}\n\nPlease email us directly at info@gvtgroup.net`);

    } finally {
      submitBtn.innerHTML = originalContent;
      submitBtn.disabled  = false;
    }
  });
}
