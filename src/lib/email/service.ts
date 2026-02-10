import { transporter, emailTemplates } from './config';

const fromEmail = process.env.GMAIL_USER || 'noreply@weddingbazaar.com';
const fromName = 'Wedding Bazaar';

export interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

// Send a generic email
export const sendEmail = async ({ to, subject, html, text }: SendEmailParams): Promise<boolean> => {
  try {
    await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ''), // Strip HTML for text version
    });
    console.log(`Email sent successfully to ${to}`);
    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
};

// Send welcome email
export const sendWelcomeEmail = async (
  to: string,
  name: string,
  role: string
): Promise<boolean> => {
  const template = emailTemplates.welcome(name, role);
  return sendEmail({
    to,
    subject: template.subject,
    html: template.html,
  });
};

// Send password reset email
export const sendPasswordResetEmail = async (
  to: string,
  name: string,
  resetLink: string
): Promise<boolean> => {
  const template = emailTemplates.passwordReset(name, resetLink);
  return sendEmail({
    to,
    subject: template.subject,
    html: template.html,
  });
};

// Send new inquiry notification to vendor
export const sendInquiryNotification = async (
  to: string,
  vendorName: string,
  coupleName: string,
  serviceName: string,
  message: string
): Promise<boolean> => {
  const template = emailTemplates.newInquiry(vendorName, coupleName, serviceName, message);
  return sendEmail({
    to,
    subject: template.subject,
    html: template.html,
  });
};

// Send account approved notification
export const sendApprovalEmail = async (
  to: string,
  name: string,
  role: string
): Promise<boolean> => {
  const template = emailTemplates.accountApproved(name, role);
  return sendEmail({
    to,
    subject: template.subject,
    html: template.html,
  });
};
