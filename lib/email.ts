import nodemailer from 'nodemailer';

const NOTIFICATION_EMAIL = 'csrteam@idesignac.com';

interface ContactFormData {
  name: string;
  email?: string;
  phone?: string;
  service?: string;
  message: string;
  source?: string;
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendContactNotification(data: ContactFormData): Promise<boolean> {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.warn('SMTP credentials not configured - skipping email notification');
    return false;
  }

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #1e3a5f; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">New Lead from Wood's Plumbing Website</h1>
      </div>
      
      <div style="padding: 20px; background-color: #f9f9f9;">
        <h2 style="color: #1e3a5f; border-bottom: 2px solid #c87533; padding-bottom: 10px;">Contact Details</h2>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; font-weight: bold; color: #333;">Name:</td>
            <td style="padding: 10px 0; color: #555;">${data.name}</td>
          </tr>
          ${data.phone ? `
          <tr>
            <td style="padding: 10px 0; font-weight: bold; color: #333;">Phone:</td>
            <td style="padding: 10px 0; color: #555;"><a href="tel:${data.phone}" style="color: #c87533;">${data.phone}</a></td>
          </tr>
          ` : ''}
          ${data.email ? `
          <tr>
            <td style="padding: 10px 0; font-weight: bold; color: #333;">Email:</td>
            <td style="padding: 10px 0; color: #555;"><a href="mailto:${data.email}" style="color: #c87533;">${data.email}</a></td>
          </tr>
          ` : ''}
          ${data.service ? `
          <tr>
            <td style="padding: 10px 0; font-weight: bold; color: #333;">Service Interest:</td>
            <td style="padding: 10px 0; color: #555;">${data.service}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding: 10px 0; font-weight: bold; color: #333;">Source:</td>
            <td style="padding: 10px 0; color: #555;">${data.source || 'Website Contact Form'}</td>
          </tr>
        </table>
        
        <h3 style="color: #1e3a5f; margin-top: 20px;">Message:</h3>
        <div style="background-color: white; padding: 15px; border-left: 4px solid #c87533; margin: 10px 0;">
          ${data.message.replace(/\n/g, '<br>')}
        </div>
      </div>
      
      <div style="background-color: #1e3a5f; padding: 15px; text-align: center;">
        <p style="color: #ccc; margin: 0; font-size: 12px;">
          This is an automated notification from woodsplumbing.com
        </p>
      </div>
    </div>
  `;

  const mailOptions = {
    from: `"Wood's Plumbing Website" <${process.env.SMTP_USER}>`,
    to: NOTIFICATION_EMAIL,
    subject: `New Lead: ${data.name} - ${data.service || 'General Inquiry'}`,
    html: emailHtml,
    replyTo: data.email || undefined,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Contact notification email sent successfully');
    return true;
  } catch (error) {
    console.error('Failed to send contact notification email:', error);
    return false;
  }
}
