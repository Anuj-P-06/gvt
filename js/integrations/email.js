import { db } from './firebase.js';

export function initContactForm() {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('contact-success');
  const submitBtn = document.getElementById('contact-submit-btn');
  
  if (!form || !success) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      message: document.getElementById('message').value,
      source: "contact_form",
      status: "new",
      createdAt: typeof firebase !== 'undefined' ? firebase.firestore.FieldValue.serverTimestamp() : new Date()
    };
    
    // Disable button to prevent double submit
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span>';
    submitBtn.disabled = true;
    
    try {
      if (db) {
        // Save to Firestore (which will trigger cloud function for email)
        await db.collection('enquiries').add(formData);
      } else {
        console.warn("Firebase not initialized. Skipping database write.");
        // Simulate network delay for demo
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      form.classList.add('hidden');
      success.classList.remove('hidden');
    } catch (error) {
      console.error("Error submitting form: ", error);
      alert("There was an error submitting your form. Please try again.");
    } finally {
      submitBtn.innerHTML = originalContent;
      submitBtn.disabled = false;
    }
  });
}
