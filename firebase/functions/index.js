const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

admin.initializeApp();

// Ensure SENDGRID_API_KEY is set in Firebase config
// firebase functions:config:set sendgrid.key="YOUR_API_KEY"
if (functions.config().sendgrid && functions.config().sendgrid.key) {
  sgMail.setApiKey(functions.config().sendgrid.key);
}

exports.sendEnquiryEmail = functions.firestore
  .document('enquiries/{enquiryId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    
    // Notification to admin
    const adminMsg = {
      to: 'exports@gvtgroup.net',
      from: 'noreply@gvtengineering.in',
      subject: `New Enquiry from ${data.name}`,
      text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\nMessage: ${data.message}\nSource: ${data.source}`,
      html: `
        <h3>New Enquiry Received</h3>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
        <p><strong>Source:</strong> ${data.source}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
      `,
    };

    // Auto-reply to customer
    const customerMsg = {
      to: data.email,
      from: 'exports@gvtgroup.net',
      subject: 'We have received your enquiry - GVT Engineering',
      text: `Hello ${data.name},\n\nThank you for reaching out to GVT Engineering. We have received your enquiry and our team will get back to you within 24 hours.\n\nBest Regards,\nGVT Engineering Team`,
      html: `
        <p>Hello ${data.name},</p>
        <p>Thank you for reaching out to GVT Engineering. We have received your enquiry regarding your project and our engineering team will review it and get back to you within 24 hours.</p>
        <p>If you need immediate assistance, please reply to this email or call us at +91-9999775755

+4420-3289-6007.</p>
        <br>
        <p>Best Regards,</p>
        <p><strong>GVT Engineering Team</strong></p>
      `,
    };

    try {
      if (functions.config().sendgrid && functions.config().sendgrid.key) {
        await sgMail.send(adminMsg);
        if (data.email) {
          await sgMail.send(customerMsg);
        }
        console.log('Emails sent successfully for enquiry:', context.params.enquiryId);
      } else {
        console.log('SendGrid not configured. Skipping emails for enquiry:', context.params.enquiryId);
      }
      
      // Update status
      return admin.firestore().collection('enquiries').doc(context.params.enquiryId).update({
        status: 'email_sent'
      });
    } catch (error) {
      console.error('Error sending emails:', error);
      if (error.response) {
        console.error(error.response.body);
      }
      return null;
    }
  });
