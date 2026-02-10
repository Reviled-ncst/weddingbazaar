import nodemailer from 'nodemailer';

// Gmail SMTP Configuration
// To use Gmail SMTP:
// 1. Enable 2-Factor Authentication on your Google account
// 2. Go to https://myaccount.google.com/apppasswords
// 3. Generate an App Password for "Mail"
// 4. Add these to your .env.local:
//    GMAIL_USER=your-email@gmail.com
//    GMAIL_APP_PASSWORD=your-16-character-app-password

const gmailUser = process.env.GMAIL_USER;
const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

// Create reusable transporter
export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailUser,
    pass: gmailAppPassword,
  },
});

// Verify transporter configuration
export const verifyEmailConfig = async (): Promise<boolean> => {
  try {
    await transporter.verify();
    console.log('Email server is ready to send messages');
    return true;
  } catch (error) {
    console.error('Email configuration error:', error);
    return false;
  }
};

// Email templates
export const emailTemplates = {
  // Welcome email for new users
  welcome: (name: string, role: string) => ({
    subject: 'Welcome to Wedding Bazaar! 💍',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ec4899, #f43f5e); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          .header h1 { color: white; margin: 0; font-size: 28px; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; }
          .button { display: inline-block; background: linear-gradient(135deg, #ec4899, #f43f5e); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; }
          .footer { text-align: center; padding: 20px; color: #64748b; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>💍 Wedding Bazaar</h1>
          </div>
          <div class="content">
            <h2>Welcome, ${name}!</h2>
            <p>Thank you for joining Wedding Bazaar as a <strong>${role}</strong>.</p>
            ${role === 'couple' ? `
              <p>You're now ready to discover amazing wedding vendors and start planning your perfect day!</p>
              <p>Here's what you can do:</p>
              <ul>
                <li>Browse 500+ verified wedding vendors</li>
                <li>Save your favorites and compare options</li>
                <li>Get exclusive deals and discounts</li>
                <li>Use our planning tools to stay organized</li>
              </ul>
            ` : role === 'provider' || role === 'vendor' ? `
              <p>Your vendor account is pending approval. Our team will review your profile within 24-48 hours.</p>
              <p>In the meantime, you can:</p>
              <ul>
                <li>Complete your business profile</li>
                <li>Upload photos to your gallery</li>
                <li>Set up your services and pricing</li>
              </ul>
            ` : `
              <p>Welcome to our platform! We're excited to have you as a wedding coordinator.</p>
              <p>Your account is pending approval. Complete your profile to get started.</p>
            `}
            <p style="text-align: center; margin-top: 30px;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://wedding-bazaar.vercel.app'}" class="button">
                Get Started
              </a>
            </p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Wedding Bazaar. All rights reserved.</p>
            <p>Making wedding dreams come true, one vendor at a time.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  // Password reset email
  passwordReset: (name: string, resetLink: string) => ({
    subject: 'Reset Your Password - Wedding Bazaar',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ec4899, #f43f5e); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          .header h1 { color: white; margin: 0; font-size: 28px; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; }
          .button { display: inline-block; background: linear-gradient(135deg, #ec4899, #f43f5e); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; }
          .footer { text-align: center; padding: 20px; color: #64748b; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>💍 Wedding Bazaar</h1>
          </div>
          <div class="content">
            <h2>Password Reset Request</h2>
            <p>Hi ${name},</p>
            <p>We received a request to reset your password. Click the button below to create a new password:</p>
            <p style="text-align: center; margin: 30px 0;">
              <a href="${resetLink}" class="button">Reset Password</a>
            </p>
            <p style="color: #64748b; font-size: 14px;">
              This link will expire in 1 hour. If you didn't request this, you can safely ignore this email.
            </p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Wedding Bazaar. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  // Inquiry notification for vendors
  newInquiry: (vendorName: string, coupleName: string, serviceName: string, message: string) => ({
    subject: `New Inquiry from ${coupleName} - Wedding Bazaar`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #ec4899, #f43f5e); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          .header h1 { color: white; margin: 0; font-size: 28px; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; }
          .message-box { background: white; border-left: 4px solid #ec4899; padding: 15px; margin: 20px 0; border-radius: 4px; }
          .button { display: inline-block; background: linear-gradient(135deg, #ec4899, #f43f5e); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; }
          .footer { text-align: center; padding: 20px; color: #64748b; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📩 New Inquiry</h1>
          </div>
          <div class="content">
            <h2>Hi ${vendorName},</h2>
            <p>You have received a new inquiry from <strong>${coupleName}</strong> for your <strong>${serviceName}</strong> service.</p>
            <div class="message-box">
              <p><strong>Message:</strong></p>
              <p>${message}</p>
            </div>
            <p style="text-align: center; margin-top: 30px;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/provider/inquiries" class="button">
                View & Respond
              </a>
            </p>
            <p style="color: #64748b; font-size: 14px; margin-top: 20px;">
              Tip: Quick responses lead to better conversions! Try to respond within 24 hours.
            </p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Wedding Bazaar. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),

  // Account approved notification
  accountApproved: (name: string, role: string) => ({
    subject: '🎉 Your Account Has Been Approved! - Wedding Bazaar',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10b981, #059669); padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
          .header h1 { color: white; margin: 0; font-size: 28px; }
          .content { background: #f8fafc; padding: 30px; border-radius: 0 0 12px 12px; }
          .button { display: inline-block; background: linear-gradient(135deg, #ec4899, #f43f5e); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; }
          .footer { text-align: center; padding: 20px; color: #64748b; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Congratulations!</h1>
          </div>
          <div class="content">
            <h2>Great news, ${name}!</h2>
            <p>Your ${role} account has been approved. You can now:</p>
            <ul>
              <li>Receive inquiries from couples</li>
              <li>Showcase your services to thousands of visitors</li>
              <li>Manage bookings and availability</li>
              <li>Build your reputation with reviews</li>
            </ul>
            <p style="text-align: center; margin-top: 30px;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/provider/dashboard" class="button">
                Go to Dashboard
              </a>
            </p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Wedding Bazaar. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  }),
};
