import { NextRequest, NextResponse } from 'next/server';
import { 
  sendWelcomeEmail, 
  sendPasswordResetEmail, 
  sendInquiryNotification, 
  sendApprovalEmail 
} from '@/lib/email/service';

// Email types that can be sent via this API
type EmailType = 'welcome' | 'passwordReset' | 'inquiry' | 'approval';

interface EmailRequestBody {
  type: EmailType;
  to: string;
  data: {
    name?: string;
    role?: string;
    resetLink?: string;
    vendorName?: string;
    coupleName?: string;
    serviceName?: string;
    message?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: EmailRequestBody = await request.json();
    const { type, to, data } = body;

    // Validate required fields
    if (!type || !to) {
      return NextResponse.json(
        { error: 'Missing required fields: type and to are required' },
        { status: 400 }
      );
    }

    let success = false;

    switch (type) {
      case 'welcome':
        if (!data.name || !data.role) {
          return NextResponse.json(
            { error: 'Missing required data for welcome email: name and role' },
            { status: 400 }
          );
        }
        success = await sendWelcomeEmail(to, data.name, data.role);
        break;

      case 'passwordReset':
        if (!data.name || !data.resetLink) {
          return NextResponse.json(
            { error: 'Missing required data for password reset email: name and resetLink' },
            { status: 400 }
          );
        }
        success = await sendPasswordResetEmail(to, data.name, data.resetLink);
        break;

      case 'inquiry':
        if (!data.vendorName || !data.coupleName || !data.serviceName || !data.message) {
          return NextResponse.json(
            { error: 'Missing required data for inquiry email: vendorName, coupleName, serviceName, message' },
            { status: 400 }
          );
        }
        success = await sendInquiryNotification(to, data.vendorName, data.coupleName, data.serviceName, data.message);
        break;

      case 'approval':
        if (!data.name || !data.role) {
          return NextResponse.json(
            { error: 'Missing required data for approval email: name and role' },
            { status: 400 }
          );
        }
        success = await sendApprovalEmail(to, data.name, data.role);
        break;

      default:
        return NextResponse.json(
          { error: `Unknown email type: ${type}` },
          { status: 400 }
        );
    }

    if (success) {
      return NextResponse.json({ success: true, message: 'Email sent successfully' });
    } else {
      return NextResponse.json(
        { error: 'Failed to send email. Check server logs for details.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
