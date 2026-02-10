# Wedding Bazaar - Implementation Plan

## 📋 Project Overview
Wedding Bazaar is a comprehensive wedding planning platform that connects couples with service providers (venues, photographers, caterers, decorators, etc.) with an admin dashboard for platform management.

---

## 🔥 Technology Stack

### Frontend Framework
- **Next.js 14** - React framework with App Router
- **NextUI v2** - Modern UI component library
- **Tailwind CSS** - Utility-first CSS (required by NextUI)
- **Framer Motion** - Animations (included with NextUI)
- **React Icons** - Icon library

### Enhanced UI Libraries
- **React Big Calendar** - Professional calendar views (month, week, day, agenda)
- **React DatePicker** - Beautiful date/time selection
- **React Select** - Advanced multi-select dropdowns
- **Embla Carousel** - Smooth, modern carousels
- **React Dropzone** - Drag & drop file uploads
- **React Hot Toast** - Beautiful toast notifications
- **Recharts** - Dashboard charts and analytics

### Backend & Database (Firebase Free Tier - Spark Plan)
- **Firebase Authentication** - User authentication (Email/Password, Google)
- **Firebase Firestore** - NoSQL database
- **Firebase Storage** - Image/file uploads (5GB free)

### Free Tier Limits to Consider:
| Service | Free Limit |
|---------|------------|
| Firestore Reads | 50,000/day |
| Firestore Writes | 20,000/day |
| Firestore Deletes | 20,000/day |
| Storage | 5 GB |
| Storage Downloads | 1 GB/day |
| Authentication | Unlimited users |
| Hosting | 10 GB/month |

### Email Services (Free Alternatives)
- **EmailJS** - 200 emails/month free (for contact forms)
- **Resend** - 3,000 emails/month free (alternative)
- Or manual email via user's email client (mailto links)

### Payment Gateway
- **PayMongo** - Philippine payment gateway (Sandbox for testing)
  - Credit/Debit Cards
  - GCash, GrabPay, Maya
  - Bank Transfer
  - Refund processing for cancellations
  - Webhook support for payment status updates

### Mapping & Location Services (Free)
- **Leaflet.js + OpenStreetMap** - Free interactive maps
- **OpenRouteService API** - Free distance/routing calculations (2,000 requests/day)
- **Nominatim** - Free geocoding (address to coordinates)

### Deployment
- **Vercel** - Free tier for Next.js deployment
- Or **Firebase Hosting** - 10GB/month free

---

## 👥 User Roles & Permissions

### 1. Admin
- Full platform access
- Manage all users (couples & service providers)
- Approve/reject service provider registrations
- Manage categories and services
- View basic analytics
- Handle disputes and reviews
- Manage featured listings

### 2. Couple (Client)
- Browse service providers
- Save favorites
- Send inquiries to vendors
- Manage wedding checklist
- Budget planning tools
- Leave reviews and ratings
- Manage wedding details

### 3. Service Provider (Vendor)
- Create and manage business profile
- **Offer MULTIPLE service types** (e.g., Photography + Coordination + Videography)
- List multiple services under different categories
- Set different pricing per service type
- Manage availability calendar (visual calendar with bookings)
- Receive and respond to inquiries per service
- View portfolio/gallery organized by service type
- Respond to reviews
- Mark dates as booked/unavailable

### 4. Wedding Coordinator/Planner
- Create and manage coordinator profile
- **Manage multiple couples/clients simultaneously**
- Access vendor directory to recommend to clients
- Build preferred vendor network
- Track client wedding timelines and budgets
- Coordinate bookings with vendors on behalf of clients
- Services offered: Full planning, Partial planning, Day-of coordination
- Pricing: Fixed fee or percentage of wedding budget
- Portfolio of completed weddings
- Certifications and credentials display
- Client testimonials and ratings

---

## 📁 Database Structure (Firestore)

```
/users
  /{odId}
    - email: string
    - displayName: string
    - role: "admin" | "couple" | "provider"
    - photoURL: string
    - phone: string
    - createdAt: timestamp
    - updatedAt: timestamp
    - emailVerified: boolean
    - status: "active" | "suspended" | "pending"

/couples
  /{odId}
    - odId: string (reference to users)
    - coupleId: string (unique readable ID, e.g., "WB-CPL-2024-0001")
    - partnerName1: string
    - partnerName2: string
    - weddingDate: timestamp
    - weddingVenue: object { name, address, city, province, coordinates: { lat, lng } }
    - budget: number
    - guestCount: number (validated: 1-2000)
    - 
    - # Intelligent Planning Data
    - weddingStyle: string (from quiz)
    - priorityCategories: array of strings
    - quizAnswers: object (stored quiz responses)
    - planningProgress: number (0-100%)
    - aiRecommendations: array (generated vendor suggestions)
    - 
    - # Budget Allocation (intelligent)
    - budgetBreakdown: object { venue: %, catering: %, photography: %, etc. }
    - suggestedBudget: object (AI-suggested per category based on total)
    - 
    - createdAt: timestamp

/providers
  /{providerId}
    - odId: string (reference to users)
    - businessName: string
    - tagline: string (short description)
    - bio: string (detailed about section)
    - serviceTypes: array ["photography", "coordination", "videography", etc.]
    - primaryCategory: string (main service type for display)
    - location: object { city, province, fullAddress }
    - phone: string
    - email: string
    - website: string
    - socialLinks: object { facebook, instagram, tiktok, youtube }
    - yearsInBusiness: number
    - teamSize: number
    - rating: number (computed average)
    - reviewCount: number
    - isVerified: boolean
    - isFeatured: boolean
    - status: "pending" | "approved" | "rejected" | "suspended"
    - coverImage: string (main banner image)
    - profileImage: string (logo/avatar)
    - galleryImages: array (limit 15 images, organized by service)
    - 
    - # Booking Settings
    - maxBookingsPerDay: number (default: 1)
    - advanceBookingDays: number (minimum days in advance, default: 7)
    - 
    - # Distance-Based Pricing
    - baseLocation: object { address, city, province, coordinates: { lat, lng } }
    - pricePerKm: number (additional charge per km from base)
    - freeDistanceKm: number (free coverage radius, e.g., 20km)
    - maxDistanceKm: number (maximum service area, e.g., 200km)
    - 
    - # ID Tag
    - vendorId: string (unique readable ID, e.g., "WB-PHO-2024-0001")
    - verificationBadge: "none" | "verified" | "premium" | "top_rated"
    - 
    - createdAt: timestamp
    - updatedAt: timestamp

/providerServices
  /{serviceId}
    - providerId: string
    - categorySlug: string (photography, coordination, etc.)
    - categoryName: string
    - title: string (e.g., "Full Day Wedding Photography")
    - description: string
    - priceType: "starting" | "fixed" | "range" | "upon-request"
    - priceMin: number
    - priceMax: number (optional, for range)
    - priceCurrency: string (default: "PHP")
    - inclusions: array of strings
    - duration: string (e.g., "8 hours", "Full Day")
    - images: array (3-5 images specific to this service)
    - isActive: boolean
    - order: number (display order)
    - createdAt: timestamp

/providerAvailability
  /{availabilityId}
    - providerId: string
    - date: timestamp
    - status: "available" | "booked" | "blocked"
    - bookingId: string (if booked)
    - bookedSlots: number (current bookings for this date)
    - notes: string
    - createdAt: timestamp

/bookings
  /{bookingId}
    - coupleId: string
    - coupleName: string
    - coupleEmail: string
    - couplePhone: string
    - providerId: string
    - providerName: string
    - serviceId: string
    - serviceName: string
    - packageId: string (optional)
    - packageName: string (optional)
    - eventDate: timestamp
    - eventVenue: object { name, address, coordinates: { lat, lng } }
    - guestCount: number
    - 
    - # Distance-Based Pricing
    - providerBaseLocation: object { address, coordinates: { lat, lng } }
    - distanceKm: number (calculated distance)
    - basePricePhp: number
    - distanceFeePhp: number (pricePerKm * distanceKm)
    - totalPricePhp: number
    - 
    - # Payment Info (PayMongo)
    - paymentStatus: "pending" | "paid" | "partially_paid" | "refunded" | "cancelled"
    - paymentMethod: string (gcash, card, maya, etc.)
    - paymentId: string (PayMongo payment ID)
    - amountPaid: number
    - downPayment: number
    - remainingBalance: number
    - paymentHistory: array [{ amount, date, method, referenceId }]
    - 
    - # Refund Info
    - refundStatus: "none" | "requested" | "processing" | "completed" | "denied"
    - refundAmount: number
    - refundReason: string
    - refundDate: timestamp
    - refundReferenceId: string
    - 
    - # Booking Status
    - status: "pending" | "confirmed" | "completed" | "cancelled" | "no_show"
    - confirmedAt: timestamp
    - cancelledAt: timestamp
    - cancellationReason: string
    - cancelledBy: "couple" | "provider" | "admin"
    - 
    - specialRequests: string
    - notes: string
    - createdAt: timestamp
    - updatedAt: timestamp

/categories
  /{categoryId}
    - name: string
    - slug: string
    - icon: string
    - description: string
    - image: string (optional cover image)
    - isActive: boolean
    - order: number
    - createdAt: timestamp
    - updatedAt: timestamp

/subcategories
  /{subcategoryId}
    - categoryId: string (reference to parent category)
    - categorySlug: string (denormalized for queries)
    - name: string
    - slug: string
    - description: string (optional)
    - icon: string (optional)
    - isActive: boolean
    - order: number
    - createdAt: timestamp

---

## ⚙️ Dynamic Configuration System (No Hardcoded Data)

> **IMPORTANT:** All configurable data is stored in Firestore, allowing admins to modify settings without code changes.

### Platform Settings Collection

```
/settings
  /platform
    - siteName: string (e.g., "Wedding Bazaar")
    - siteTagline: string
    - siteDescription: string (for SEO)
    - logoUrl: string
    - faviconUrl: string
    - contactEmail: string
    - contactPhone: string
    - address: object { street, city, province, country, zip }
    - socialLinks: object { facebook, instagram, tiktok, youtube, twitter }
    - supportEmail: string
    - updatedAt: timestamp
    - updatedBy: string (admin UID)
  
  /validation
    - guestCountMin: number (default: 1)
    - guestCountMax: number (default: 2000)
    - budgetMin: number (default: 10000)
    - budgetMax: number (default: 100000000)
    - maxImagesPerProvider: number (default: 15)
    - maxImageSizeMb: number (default: 2)
    - minBioLength: number (default: 50)
    - maxBioLength: number (default: 2000)
    - minAdvanceBookingDays: number (default: 1)
    - maxAdvanceBookingDays: number (default: 730)
    - updatedAt: timestamp
  
  /payment
    - currency: string (default: "PHP")
    - currencySymbol: string (default: "₱")
    - paymentMethods: array [
        { id: "gcash", name: "GCash", icon: "📱", isActive: true },
        { id: "grab_pay", name: "GrabPay", icon: "🟢", isActive: true },
        { id: "paymaya", name: "Maya", icon: "💜", isActive: true },
        { id: "card", name: "Credit/Debit Card", icon: "💳", isActive: true },
      ]
    - platformFeePercent: number (e.g., 5)
    - minDownPaymentPercent: number (default: 30)
    - updatedAt: timestamp
  
  /refundPolicy
    - policies: array [
        { daysBeforeEvent: 30, refundPercent: 100, label: "30+ days: Full refund" },
        { daysBeforeEvent: 14, refundPercent: 75, label: "14-29 days: 75% refund" },
        { daysBeforeEvent: 7, refundPercent: 50, label: "7-13 days: 50% refund" },
        { daysBeforeEvent: 3, refundPercent: 25, label: "3-6 days: 25% refund" },
        { daysBeforeEvent: 0, refundPercent: 0, label: "Less than 3 days: No refund" },
      ]
    - refundProcessingDays: number (default: 5)
    - updatedAt: timestamp
  
  /budgetAllocation
    - defaultAllocation: object {
        venue: 35,
        catering: 20,
        photographyVideography: 12,
        flowersDecorations: 8,
        entertainment: 7,
        attire: 6,
        invitations: 3,
        transportation: 3,
        favors: 2,
        miscellaneous: 4,
      }
    - styleAdjustments: object {
        intimate: { venue: 25, catering: 25, photographyVideography: 18, flowersDecorations: 12 },
        grand: { venue: 40, catering: 18, entertainment: 10 },
        destination: { venue: 30, transportation: 15, miscellaneous: 10 },
        rustic: { venue: 25, flowersDecorations: 15, favors: 5 },
        beach: { venue: 30, flowersDecorations: 12, attire: 8 },
        modern: { venue: 35, photographyVideography: 15, entertainment: 10 },
      }
    - updatedAt: timestamp
  
  /distancePricing
    - defaultFreeDistanceKm: number (default: 20)
    - defaultPricePerKm: number (default: 50)
    - defaultMaxDistanceKm: number (default: 200)
    - updatedAt: timestamp

/weddingStyles
  /{styleId}
    - name: string (e.g., "Classic/Traditional")
    - slug: string (e.g., "classic")
    - description: string
    - image: string (example image URL)
    - budgetAdjustments: object (category percentages)
    - isActive: boolean
    - order: number
    - createdAt: timestamp

/quizQuestions
  /{questionId}
    - question: string
    - description: string (optional helper text)
    - type: "single" | "multiple" | "scale" | "text"
    - options: array [{ value, label, icon?, weight? }]
    - category: string (style, budget, timeline, priority)
    - isRequired: boolean
    - order: number
    - isActive: boolean
    - createdAt: timestamp

/quickReplyTemplates
  /{templateId}
    - name: string (e.g., "Thank You")
    - subject: string (optional email subject)
    - message: string (template with {placeholders})
    - category: "inquiry" | "booking" | "followup" | "confirmation"
    - placeholders: array (e.g., ["coupleName", "eventDate", "serviceName"])
    - isDefault: boolean (show for all providers)
    - providerId: string (null for system templates)
    - order: number
    - isActive: boolean
    - createdAt: timestamp

/landingContent
  /hero
    - title: string (e.g., "Find Your Perfect Wedding Vendors")
    - subtitle: string
    - backgroundImage: string (URL)
    - ctaButtonText: string
    - ctaButtonLink: string
    - secondaryButtonText: string
    - secondaryButtonLink: string
    - updatedAt: timestamp
  
  /stats
    - items: array [
        { value: "500+", label: "Verified Vendors", icon: "🏪" },
        { value: "2,000+", label: "Happy Couples", icon: "💑" },
        { value: "50+", label: "Categories", icon: "📂" },
        { value: "4.9", label: "Average Rating", icon: "⭐" },
      ]
    - updatedAt: timestamp
  
  /howItWorks
    - title: string
    - subtitle: string
    - steps: array [
        { step: 1, title: "Browse Vendors", description: "...", icon: "🔍" },
        { step: 2, title: "Compare & Shortlist", description: "...", icon: "📋" },
        { step: 3, title: "Book Securely", description: "...", icon: "✅" },
      ]
    - updatedAt: timestamp
  
  /cta
    - title: string
    - subtitle: string
    - buttonText: string
    - buttonLink: string
    - backgroundImage: string
    - updatedAt: timestamp

/testimonials
  /{testimonialId}
    - coupleName: string
    - weddingDate: string (e.g., "December 2025")
    - location: string (e.g., "Manila, Philippines")
    - quote: string
    - rating: number (1-5)
    - photoUrl: string
    - vendorsUsed: array of strings
    - isFeatured: boolean
    - isActive: boolean
    - order: number
    - createdAt: timestamp

/faqs
  /{faqId}
    - question: string
    - answer: string (supports markdown)
    - category: "general" | "booking" | "payment" | "vendors" | "couples"
    - isActive: boolean
    - order: number
    - createdAt: timestamp

/idPrefixes
  /config
    - couple: string (default: "CPL")
    - provider: string (default: "VND")
    - booking: string (default: "BKG")
    - transaction: string (default: "TXN")
    - inquiry: string (default: "INQ")
    - platformPrefix: string (default: "WB")
    - updatedAt: timestamp
```

### Hooks for Dynamic Settings

```typescript
// File: src/hooks/useSettings.ts

import useSWR from 'swr';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

// Platform settings
export function usePlatformSettings() {
  return useSWR('settings/platform', async () => {
    const docRef = doc(db, 'settings', 'platform');
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  }, {
    revalidateOnFocus: false,
    dedupingInterval: 300000, // Cache for 5 minutes
  });
}

// Validation limits
export function useValidationLimits() {
  return useSWR('settings/validation', async () => {
    const docRef = doc(db, 'settings', 'validation');
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : {
      // Fallback defaults
      guestCountMin: 1,
      guestCountMax: 2000,
      budgetMin: 10000,
      budgetMax: 100000000,
    };
  }, { revalidateOnFocus: false });
}

// Refund policies
export function useRefundPolicies() {
  return useSWR('settings/refundPolicy', async () => {
    const docRef = doc(db, 'settings', 'refundPolicy');
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data().policies : [];
  }, { revalidateOnFocus: false });
}

// Payment methods
export function usePaymentMethods() {
  return useSWR('settings/payment', async () => {
    const docRef = doc(db, 'settings', 'payment');
    const docSnap = await getDoc(docRef);
    const data = docSnap.exists() ? docSnap.data() : null;
    return data?.paymentMethods?.filter((m: any) => m.isActive) || [];
  }, { revalidateOnFocus: false });
}

// Budget allocation
export function useBudgetAllocation() {
  return useSWR('settings/budgetAllocation', async () => {
    const docRef = doc(db, 'settings', 'budgetAllocation');
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  }, { revalidateOnFocus: false });
}

// Quiz questions
export function useQuizQuestions() {
  return useSWR('quiz-questions', async () => {
    const q = query(
      collection(db, 'quizQuestions'),
      where('isActive', '==', true),
      orderBy('order', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }, { revalidateOnFocus: false });
}

// Wedding styles
export function useWeddingStyles() {
  return useSWR('wedding-styles', async () => {
    const q = query(
      collection(db, 'weddingStyles'),
      where('isActive', '==', true),
      orderBy('order', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }, { revalidateOnFocus: false });
}

// Landing page content
export function useLandingContent(section: string) {
  return useSWR(`landing/${section}`, async () => {
    const docRef = doc(db, 'landingContent', section);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  }, { revalidateOnFocus: false });
}

// Testimonials
export function useTestimonials(featured?: boolean) {
  return useSWR(`testimonials-${featured}`, async () => {
    let q = query(
      collection(db, 'testimonials'),
      where('isActive', '==', true),
      orderBy('order', 'asc')
    );
    if (featured) {
      q = query(q, where('isFeatured', '==', true));
    }
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }, { revalidateOnFocus: false });
}

// FAQs
export function useFAQs(category?: string) {
  return useSWR(`faqs-${category}`, async () => {
    let q = query(
      collection(db, 'faqs'),
      where('isActive', '==', true),
      orderBy('order', 'asc')
    );
    if (category) {
      q = query(q, where('category', '==', category));
    }
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }, { revalidateOnFocus: false });
}

// Quick reply templates
export function useQuickReplyTemplates(providerId?: string) {
  return useSWR(`templates-${providerId}`, async () => {
    // Get system templates + provider-specific templates
    const systemQ = query(
      collection(db, 'quickReplyTemplates'),
      where('isActive', '==', true),
      where('isDefault', '==', true),
      orderBy('order', 'asc')
    );
    const systemSnap = await getDocs(systemQ);
    const systemTemplates = systemSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    if (providerId) {
      const providerQ = query(
        collection(db, 'quickReplyTemplates'),
        where('isActive', '==', true),
        where('providerId', '==', providerId),
        orderBy('order', 'asc')
      );
      const providerSnap = await getDocs(providerQ);
      const providerTemplates = providerSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return [...systemTemplates, ...providerTemplates];
    }
    
    return systemTemplates;
  }, { revalidateOnFocus: false });
}
```

---

## 🌐 URL & Path Management for Hosting

### Environment-Based URLs

```typescript
// File: src/lib/config/urls.ts

// Base URL - automatically works for local and production
export function getBaseUrl(): string {
  // Server-side
  if (typeof window === 'undefined') {
    return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  }
  // Client-side
  return window.location.origin;
}

// API URL
export function getApiUrl(path: string): string {
  return `${getBaseUrl()}/api${path.startsWith('/') ? path : `/${path}`}`;
}

// Storage URL (Firebase Storage or CDN)
export function getStorageUrl(path: string): string {
  if (path.startsWith('http')) {
    return path; // Already absolute URL
  }
  // For Firebase Storage, construct full URL
  const bucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(path)}?alt=media`;
}

// Public assets (from /public folder)
export function getAssetUrl(path: string): string {
  return `${getBaseUrl()}${path.startsWith('/') ? path : `/${path}`}`;
}

// Vendor profile URL
export function getVendorUrl(vendorId: string): string {
  return `${getBaseUrl()}/vendors/${vendorId}`;
}

// Booking URL
export function getBookingUrl(bookingId: string): string {
  return `${getBaseUrl()}/bookings/${bookingId}`;
}

// Generate shareable link
export function getShareableLink(type: 'vendor' | 'booking', id: string): string {
  const baseUrl = getBaseUrl();
  switch (type) {
    case 'vendor':
      return `${baseUrl}/v/${id}`; // Short URL
    case 'booking':
      return `${baseUrl}/b/${id}`;
    default:
      return baseUrl;
  }
}
```

### Next.js Configuration for Hosting

```javascript
// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Output for different deployment targets
  output: 'standalone', // For Docker/self-hosting
  // output: 'export', // For static hosting (uncomment if needed)
  
  // Image optimization domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/v0/b/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Google OAuth avatars
      },
      {
        protocol: 'https',
        hostname: '*.tile.openstreetmap.org', // Map tiles
      },
    ],
    // Disable image optimization for Firebase Storage
    unoptimized: process.env.NODE_ENV === 'development',
  },
  
  // Environment variables validation
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  
  // Trailing slash consistency
  trailingSlash: false,
  
  // Headers for security
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: process.env.NEXT_PUBLIC_APP_URL || '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,PUT,DELETE,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ];
  },
  
  // Rewrites for short URLs
  async rewrites() {
    return [
      { source: '/v/:id', destination: '/vendors/:id' },
      { source: '/b/:id', destination: '/bookings/:id' },
    ];
  },
};

module.exports = nextConfig;
```

### Dynamic Image Component

```tsx
// File: src/components/ui/DynamicImage.tsx

import Image from 'next/image';
import { getStorageUrl } from '@/lib/config/urls';

interface DynamicImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
}

export function DynamicImage({ 
  src, 
  alt, 
  width, 
  height, 
  fill, 
  className,
  priority 
}: DynamicImageProps) {
  // Handle different image sources
  const imageSrc = src.startsWith('http') 
    ? src 
    : getStorageUrl(src);
  
  // Fallback for broken images
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/images/placeholder.jpg';
  };

  if (fill) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        fill
        className={className}
        priority={priority}
        onError={handleError}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width || 400}
      height={height || 300}
      className={className}
      priority={priority}
      onError={handleError}
    />
  );
}
```

### Seed Script for Initial Settings

```typescript
// File: src/lib/seed/seedSettings.ts

import { doc, setDoc, collection, writeBatch } from 'firebase/firestore';
import { db } from '../firebase/config';

export async function seedInitialSettings() {
  const batch = writeBatch(db);
  
  // Platform Settings
  batch.set(doc(db, 'settings', 'platform'), {
    siteName: 'Wedding Bazaar',
    siteTagline: 'Find Your Perfect Wedding Vendors',
    siteDescription: 'Connect with verified wedding vendors for your special day',
    logoUrl: '',
    faviconUrl: '',
    contactEmail: 'hello@weddingbazaar.ph',
    contactPhone: '+63 912 345 6789',
    address: {
      street: '',
      city: 'Manila',
      province: 'Metro Manila',
      country: 'Philippines',
      zip: '1000',
    },
    socialLinks: {
      facebook: '',
      instagram: '',
      tiktok: '',
      youtube: '',
      twitter: '',
    },
    supportEmail: 'support@weddingbazaar.ph',
    updatedAt: new Date(),
  });
  
  // Validation Settings
  batch.set(doc(db, 'settings', 'validation'), {
    guestCountMin: 1,
    guestCountMax: 2000,
    budgetMin: 10000,
    budgetMax: 100000000,
    maxImagesPerProvider: 15,
    maxImageSizeMb: 2,
    minBioLength: 50,
    maxBioLength: 2000,
    minAdvanceBookingDays: 1,
    maxAdvanceBookingDays: 730,
    updatedAt: new Date(),
  });
  
  // Payment Settings
  batch.set(doc(db, 'settings', 'payment'), {
    currency: 'PHP',
    currencySymbol: '₱',
    paymentMethods: [
      { id: 'gcash', name: 'GCash', icon: '📱', isActive: true, order: 1 },
      { id: 'grab_pay', name: 'GrabPay', icon: '🟢', isActive: true, order: 2 },
      { id: 'paymaya', name: 'Maya', icon: '💜', isActive: true, order: 3 },
      { id: 'card', name: 'Credit/Debit Card', icon: '💳', isActive: true, order: 4 },
    ],
    platformFeePercent: 5,
    minDownPaymentPercent: 30,
    updatedAt: new Date(),
  });
  
  // Refund Policy
  batch.set(doc(db, 'settings', 'refundPolicy'), {
    policies: [
      { daysBeforeEvent: 30, refundPercent: 100, label: '30+ days before event: Full refund' },
      { daysBeforeEvent: 14, refundPercent: 75, label: '14-29 days before event: 75% refund' },
      { daysBeforeEvent: 7, refundPercent: 50, label: '7-13 days before event: 50% refund' },
      { daysBeforeEvent: 3, refundPercent: 25, label: '3-6 days before event: 25% refund' },
      { daysBeforeEvent: 0, refundPercent: 0, label: 'Less than 3 days: No refund' },
    ],
    refundProcessingDays: 5,
    updatedAt: new Date(),
  });
  
  // Budget Allocation Defaults
  batch.set(doc(db, 'settings', 'budgetAllocation'), {
    defaultAllocation: {
      venue: 35,
      catering: 20,
      photographyVideography: 12,
      flowersDecorations: 8,
      entertainment: 7,
      attire: 6,
      invitations: 3,
      transportation: 3,
      favors: 2,
      miscellaneous: 4,
    },
    styleAdjustments: {
      intimate: { venue: 25, catering: 25, photographyVideography: 18, flowersDecorations: 12 },
      grand: { venue: 40, catering: 18, entertainment: 10 },
      destination: { venue: 30, transportation: 15, miscellaneous: 10 },
      rustic: { venue: 25, flowersDecorations: 15, favors: 5 },
      beach: { venue: 30, flowersDecorations: 12, attire: 8 },
      modern: { venue: 35, photographyVideography: 15, entertainment: 10 },
    },
    updatedAt: new Date(),
  });
  
  // Distance Pricing Defaults
  batch.set(doc(db, 'settings', 'distancePricing'), {
    defaultFreeDistanceKm: 20,
    defaultPricePerKm: 50,
    defaultMaxDistanceKm: 200,
    updatedAt: new Date(),
  });
  
  // ID Prefixes
  batch.set(doc(db, 'settings', 'idPrefixes'), {
    platformPrefix: 'WB',
    couple: 'CPL',
    provider: 'VND',
    booking: 'BKG',
    transaction: 'TXN',
    inquiry: 'INQ',
    updatedAt: new Date(),
  });
  
  // Landing Page - Hero
  batch.set(doc(db, 'landingContent', 'hero'), {
    title: 'Find Your Perfect Wedding Vendors',
    subtitle: 'Connect with the best photographers, venues, caterers, and more for your special day',
    backgroundImage: '',
    ctaButtonText: 'Browse Vendors',
    ctaButtonLink: '/vendors',
    secondaryButtonText: 'List Your Business',
    secondaryButtonLink: '/register?role=provider',
    updatedAt: new Date(),
  });
  
  // Landing Page - Stats
  batch.set(doc(db, 'landingContent', 'stats'), {
    items: [
      { value: '500+', label: 'Verified Vendors', icon: '🏪', order: 1 },
      { value: '2,000+', label: 'Happy Couples', icon: '💑', order: 2 },
      { value: '50+', label: 'Categories', icon: '📂', order: 3 },
      { value: '4.9', label: 'Average Rating', icon: '⭐', order: 4 },
    ],
    updatedAt: new Date(),
  });
  
  // Landing Page - How It Works
  batch.set(doc(db, 'landingContent', 'howItWorks'), {
    title: 'How It Works',
    subtitle: 'Plan your dream wedding in 3 simple steps',
    steps: [
      { step: 1, title: 'Browse Vendors', description: 'Explore our curated list of verified wedding vendors by category, location, and budget.', icon: '🔍' },
      { step: 2, title: 'Compare & Shortlist', description: 'Use our comparison tools to evaluate vendors side by side and save your favorites.', icon: '📋' },
      { step: 3, title: 'Book Securely', description: 'Send inquiries, negotiate, and book with secure payment protection.', icon: '✅' },
    ],
    updatedAt: new Date(),
  });
  
  // Landing Page - CTA
  batch.set(doc(db, 'landingContent', 'cta'), {
    title: 'Ready to Start Planning?',
    subtitle: 'Join thousands of happy couples who found their perfect vendors',
    buttonText: 'Get Started Free',
    buttonLink: '/register',
    backgroundImage: '',
    updatedAt: new Date(),
  });
  
  await batch.commit();
  console.log('✅ Initial settings seeded successfully!');
}

// Seed sample testimonials
export async function seedSampleTestimonials() {
  const batch = writeBatch(db);
  
  const testimonials = [
    {
      coupleName: 'Maria & Jose',
      weddingDate: 'December 2025',
      location: 'Manila, Philippines',
      quote: 'Wedding Bazaar made finding our vendors so easy! The comparison tool helped us make confident decisions.',
      rating: 5,
      photoUrl: '',
      vendorsUsed: ['Photography', 'Catering', 'Venue'],
      isFeatured: true,
      isActive: true,
      order: 1,
    },
    {
      coupleName: 'Anna & Paolo',
      weddingDate: 'October 2025',
      location: 'Cebu City, Philippines',
      quote: 'The budget planner and smart recommendations saved us so much time and money!',
      rating: 5,
      photoUrl: '',
      vendorsUsed: ['Photography', 'Flowers'],
      isFeatured: true,
      isActive: true,
      order: 2,
    },
    {
      coupleName: 'Sarah & Mark',
      weddingDate: 'February 2026',
      location: 'Tagaytay, Philippines',
      quote: 'Booking through the platform was seamless. The payment protection gave us peace of mind.',
      rating: 5,
      photoUrl: '',
      vendorsUsed: ['Venue', 'Coordination'],
      isFeatured: true,
      isActive: true,
      order: 3,
    },
  ];
  
  testimonials.forEach((t, i) => {
    const ref = doc(collection(db, 'testimonials'));
    batch.set(ref, { ...t, createdAt: new Date() });
  });
  
  await batch.commit();
  console.log('✅ Sample testimonials seeded!');
}

// Seed sample FAQs
export async function seedSampleFAQs() {
  const batch = writeBatch(db);
  
  const faqs = [
    { question: 'How do I register as a vendor?', answer: 'Click "List Your Business" and complete the registration form...', category: 'vendors', order: 1 },
    { question: 'Is there a fee to list my business?', answer: 'Basic listing is free! Premium features are available...', category: 'vendors', order: 2 },
    { question: 'How does payment work?', answer: 'We use PayMongo for secure payments. Supported methods include...', category: 'payment', order: 1 },
    { question: 'What is the refund policy?', answer: 'Refunds depend on how far in advance you cancel...', category: 'payment', order: 2 },
    { question: 'How do I find vendors in my area?', answer: 'Use the location filter to find vendors near your venue...', category: 'general', order: 1 },
  ];
  
  faqs.forEach((faq) => {
    const ref = doc(collection(db, 'faqs'));
    batch.set(ref, { ...faq, isActive: true, createdAt: new Date() });
  });
  
  await batch.commit();
  console.log('✅ Sample FAQs seeded!');
}

// Seed quiz questions
export async function seedQuizQuestions() {
  const batch = writeBatch(db);
  
  const questions = [
    {
      question: "What's your wedding style?",
      type: 'single',
      category: 'style',
      options: [
        { value: 'classic', label: 'Classic/Traditional', icon: '👑' },
        { value: 'modern', label: 'Modern/Minimalist', icon: '✨' },
        { value: 'rustic', label: 'Rustic/Bohemian', icon: '🌾' },
        { value: 'glamorous', label: 'Glamorous/Luxurious', icon: '💎' },
        { value: 'beach', label: 'Beach/Tropical', icon: '🏝️' },
        { value: 'garden', label: 'Garden/Romantic', icon: '🌸' },
      ],
      isRequired: true,
      order: 1,
      isActive: true,
    },
    {
      question: "What's your estimated budget?",
      type: 'single',
      category: 'budget',
      options: [
        { value: 'under200k', label: 'Under ₱200,000', icon: '💰' },
        { value: '200k-500k', label: '₱200,000 - ₱500,000', icon: '💰💰' },
        { value: '500k-1m', label: '₱500,000 - ₱1,000,000', icon: '💰💰💰' },
        { value: '1m-2m', label: '₱1,000,000 - ₱2,000,000', icon: '💎' },
        { value: 'over2m', label: '₱2,000,000+', icon: '💎💎' },
      ],
      isRequired: true,
      order: 2,
      isActive: true,
    },
    {
      question: 'Expected number of guests?',
      type: 'single',
      category: 'size',
      options: [
        { value: 'intimate', label: 'Intimate (1-50)', icon: '👥' },
        { value: 'small', label: 'Small (51-100)', icon: '👥👥' },
        { value: 'medium', label: 'Medium (101-200)', icon: '👥👥👥' },
        { value: 'large', label: 'Large (201-300)', icon: '🎉' },
        { value: 'grand', label: 'Grand (300+)', icon: '🎊' },
      ],
      isRequired: true,
      order: 3,
      isActive: true,
    },
    {
      question: 'When is your wedding?',
      type: 'single',
      category: 'timeline',
      options: [
        { value: '3months', label: 'Within 3 months', icon: '⚡' },
        { value: '3-6months', label: '3-6 months', icon: '📅' },
        { value: '6-12months', label: '6-12 months', icon: '📆' },
        { value: '1-2years', label: '1-2 years', icon: '🗓️' },
        { value: 'notsure', label: 'Not sure yet', icon: '🤔' },
      ],
      isRequired: true,
      order: 4,
      isActive: true,
    },
    {
      question: 'Which services are your priority?',
      type: 'multiple',
      category: 'priority',
      options: [
        { value: 'venue', label: 'Venue', icon: '🏰' },
        { value: 'photography', label: 'Photography', icon: '📷' },
        { value: 'catering', label: 'Catering', icon: '🍽️' },
        { value: 'decorations', label: 'Decorations', icon: '💐' },
        { value: 'entertainment', label: 'Entertainment', icon: '🎵' },
        { value: 'attire', label: 'Attire', icon: '👰' },
      ],
      isRequired: true,
      order: 5,
      isActive: true,
    },
  ];
  
  questions.forEach((q) => {
    const ref = doc(collection(db, 'quizQuestions'));
    batch.set(ref, { ...q, createdAt: new Date() });
  });
  
  await batch.commit();
  console.log('✅ Quiz questions seeded!');
}

// Seed quick reply templates
export async function seedQuickReplyTemplates() {
  const batch = writeBatch(db);
  
  const templates = [
    {
      name: 'Thank You for Inquiry',
      subject: 'Thank you for your inquiry!',
      message: 'Hi {coupleName}!\n\nThank you for reaching out! We would love to be part of your special day on {eventDate}.\n\nWe will review your requirements and get back to you within 24 hours.\n\nBest regards,\n{businessName}',
      category: 'inquiry',
      placeholders: ['coupleName', 'eventDate', 'businessName'],
      isDefault: true,
      providerId: null,
      order: 1,
      isActive: true,
    },
    {
      name: 'Request More Details',
      subject: 'Quick question about your wedding',
      message: 'Hi {coupleName}!\n\nThank you for your interest in our services. To provide you with an accurate quote for your wedding on {eventDate}, could you please share:\n\n1. Your venue location\n2. Number of guests\n3. Any specific requirements\n\nLooking forward to hearing from you!\n\n{businessName}',
      category: 'inquiry',
      placeholders: ['coupleName', 'eventDate', 'businessName'],
      isDefault: true,
      providerId: null,
      order: 2,
      isActive: true,
    },
    {
      name: 'Availability Confirmed',
      subject: 'Great news - We are available!',
      message: 'Hi {coupleName}!\n\nGreat news! We are available on {eventDate} for your wedding.\n\nI\'d love to discuss {serviceName} options with you. Would you like to schedule a call or meeting?\n\nLooking forward to working with you!\n\n{businessName}',
      category: 'inquiry',
      placeholders: ['coupleName', 'eventDate', 'serviceName', 'businessName'],
      isDefault: true,
      providerId: null,
      order: 3,
      isActive: true,
    },
    {
      name: 'Booking Confirmed',
      subject: 'Booking Confirmation - {eventDate}',
      message: 'Hi {coupleName}!\n\nYour booking has been confirmed!\n\nBooking Details:\n- Date: {eventDate}\n- Service: {serviceName}\n- Booking ID: {bookingId}\n\nWe can\'t wait to be part of your special day!\n\n{businessName}',
      category: 'booking',
      placeholders: ['coupleName', 'eventDate', 'serviceName', 'bookingId', 'businessName'],
      isDefault: true,
      providerId: null,
      order: 4,
      isActive: true,
    },
  ];
  
  templates.forEach((t) => {
    const ref = doc(collection(db, 'quickReplyTemplates'));
    batch.set(ref, { ...t, createdAt: new Date() });
  });
  
  await batch.commit();
  console.log('✅ Quick reply templates seeded!');
}

// Seed wedding styles
export async function seedWeddingStyles() {
  const batch = writeBatch(db);
  
  const styles = [
    { name: 'Classic/Traditional', slug: 'classic', description: 'Timeless elegance with traditional elements', image: '', order: 1 },
    { name: 'Modern/Minimalist', slug: 'modern', description: 'Clean lines and contemporary aesthetics', image: '', order: 2 },
    { name: 'Rustic/Bohemian', slug: 'rustic', description: 'Natural elements and relaxed vibes', image: '', order: 3 },
    { name: 'Glamorous/Luxurious', slug: 'glamorous', description: 'Opulent details and grandeur', image: '', order: 4 },
    { name: 'Beach/Tropical', slug: 'beach', description: 'Coastal charm and island vibes', image: '', order: 5 },
    { name: 'Garden/Romantic', slug: 'garden', description: 'Floral beauty and outdoor romance', image: '', order: 6 },
    { name: 'Vintage/Retro', slug: 'vintage', description: 'Nostalgic charm from past eras', image: '', order: 7 },
    { name: 'Industrial/Urban', slug: 'industrial', description: 'City chic with raw elements', image: '', order: 8 },
  ];
  
  styles.forEach((s) => {
    const ref = doc(collection(db, 'weddingStyles'));
    batch.set(ref, { ...s, isActive: true, createdAt: new Date() });
  });
  
  await batch.commit();
  console.log('✅ Wedding styles seeded!');
}

// Master seed function
export async function seedAllSettings() {
  await seedInitialSettings();
  await seedSampleTestimonials();
  await seedSampleFAQs();
  await seedQuizQuestions();
  await seedQuickReplyTemplates();
  await seedWeddingStyles();
  console.log('🎉 All settings and content seeded successfully!');
}
```
    - updatedAt: timestamp

---

## 📂 Wedding Categories & Subcategories (Database Seed Data)

> **Note:** These categories will be stored in Firestore and can be managed via Admin Dashboard.
> Run the seed script once to populate initial data, then manage through the admin panel.

```typescript
// File: src/lib/seed/categories.ts
// This data will be seeded to Firestore on first setup

export const WEDDING_CATEGORIES = [
  {
    name: "Photography & Videography",
    slug: "photography-videography",
    icon: "📷",
    description: "Capture every precious moment of your special day",
    subcategories: [
      { name: "Wedding Photography", slug: "wedding-photography" },
      { name: "Prenuptial/Engagement Shoot", slug: "prenup-shoot" },
      { name: "Wedding Videography", slug: "wedding-videography" },
      { name: "Same Day Edit (SDE)", slug: "same-day-edit" },
      { name: "Drone/Aerial Coverage", slug: "drone-coverage" },
      { name: "Photo Booth", slug: "photo-booth" },
      { name: "360 Photo/Video Booth", slug: "360-booth" },
      { name: "Instant Print Services", slug: "instant-print" },
    ]
  },
  {
    name: "Venue & Location",
    slug: "venue",
    icon: "🏰",
    description: "Find the perfect setting for your ceremony and reception",
    subcategories: [
      { name: "Church/Chapel", slug: "church-chapel" },
      { name: "Hotel Ballroom", slug: "hotel-ballroom" },
      { name: "Beach Resort", slug: "beach-resort" },
      { name: "Garden/Outdoor Venue", slug: "garden-outdoor" },
      { name: "Restaurant", slug: "restaurant-venue" },
      { name: "Country Club", slug: "country-club" },
      { name: "Destination Wedding Venue", slug: "destination-venue" },
      { name: "Intimate/Private Estate", slug: "private-estate" },
      { name: "Rooftop Venue", slug: "rooftop-venue" },
      { name: "Barn/Rustic Venue", slug: "barn-rustic" },
    ]
  },
  {
    name: "Catering & Food",
    slug: "catering",
    icon: "🍽️",
    description: "Delight your guests with exceptional cuisine",
    subcategories: [
      { name: "Full Catering Service", slug: "full-catering" },
      { name: "Buffet Style", slug: "buffet-catering" },
      { name: "Plated/Set Menu", slug: "plated-menu" },
      { name: "Food Stations", slug: "food-stations" },
      { name: "Cocktail/Finger Food", slug: "cocktail-food" },
      { name: "Dessert Catering", slug: "dessert-catering" },
      { name: "Halal Catering", slug: "halal-catering" },
      { name: "Vegetarian/Vegan Catering", slug: "vegetarian-catering" },
      { name: "Mobile Bar/Bartending", slug: "mobile-bar" },
      { name: "Coffee & Tea Service", slug: "coffee-tea" },
    ]
  },
  {
    name: "Wedding Cake & Desserts",
    slug: "cake-desserts",
    icon: "🎂",
    description: "Sweet creations for your celebration",
    subcategories: [
      { name: "Wedding Cake", slug: "wedding-cake" },
      { name: "Cupcake Tower", slug: "cupcake-tower" },
      { name: "Dessert Table", slug: "dessert-table" },
      { name: "Candy Buffet", slug: "candy-buffet" },
      { name: "Chocolate Fountain", slug: "chocolate-fountain" },
      { name: "Ice Cream Cart", slug: "ice-cream-cart" },
      { name: "Donut Wall", slug: "donut-wall" },
      { name: "Macarons & Pastries", slug: "macarons-pastries" },
    ]
  },
  {
    name: "Wedding Planning & Coordination",
    slug: "planning-coordination",
    icon: "📋",
    description: "Expert guidance for a stress-free wedding",
    subcategories: [
      { name: "Full Wedding Planning", slug: "full-planning" },
      { name: "Partial Planning", slug: "partial-planning" },
      { name: "Day-of Coordination", slug: "day-of-coordination" },
      { name: "Month-of Coordination", slug: "month-of-coordination" },
      { name: "Destination Wedding Planning", slug: "destination-planning" },
      { name: "Elopement Planning", slug: "elopement-planning" },
      { name: "Virtual Wedding Planning", slug: "virtual-planning" },
    ]
  },
  {
    name: "Flowers & Decorations",
    slug: "flowers-decorations",
    icon: "💐",
    description: "Transform your venue into a magical wonderland",
    subcategories: [
      { name: "Bridal Bouquet", slug: "bridal-bouquet" },
      { name: "Ceremony Flowers", slug: "ceremony-flowers" },
      { name: "Reception Centerpieces", slug: "centerpieces" },
      { name: "Flower Walls/Backdrops", slug: "flower-walls" },
      { name: "Church Decorations", slug: "church-decorations" },
      { name: "Car Decorations", slug: "car-decorations" },
      { name: "Aisle Decorations", slug: "aisle-decorations" },
      { name: "Balloon Decorations", slug: "balloon-decorations" },
      { name: "Lighting Design", slug: "lighting-design" },
      { name: "Draping & Fabric", slug: "draping-fabric" },
    ]
  },
  {
    name: "Bridal Attire & Accessories",
    slug: "bridal-attire",
    icon: "👰",
    description: "Look stunning on your special day",
    subcategories: [
      { name: "Wedding Gown (Rental)", slug: "gown-rental" },
      { name: "Wedding Gown (Purchase)", slug: "gown-purchase" },
      { name: "Custom/Bespoke Gown", slug: "custom-gown" },
      { name: "Bridal Veil", slug: "bridal-veil" },
      { name: "Bridal Accessories", slug: "bridal-accessories" },
      { name: "Bridal Shoes", slug: "bridal-shoes" },
      { name: "Bridal Jewelry", slug: "bridal-jewelry" },
      { name: "Bridal Robe & Getting Ready", slug: "bridal-robe" },
    ]
  },
  {
    name: "Groom Attire",
    slug: "groom-attire",
    icon: "🤵",
    description: "Dapper looks for the groom",
    subcategories: [
      { name: "Suit/Tuxedo Rental", slug: "suit-rental" },
      { name: "Suit/Tuxedo Purchase", slug: "suit-purchase" },
      { name: "Custom/Bespoke Suit", slug: "custom-suit" },
      { name: "Barong Tagalog", slug: "barong-tagalog" },
      { name: "Groom Accessories", slug: "groom-accessories" },
      { name: "Groom Shoes", slug: "groom-shoes" },
    ]
  },
  {
    name: "Hair & Makeup",
    slug: "hair-makeup",
    icon: "💄",
    description: "Professional beauty services for your wedding",
    subcategories: [
      { name: "Bridal Hair & Makeup", slug: "bridal-hmua" },
      { name: "Groom Grooming", slug: "groom-grooming" },
      { name: "Entourage Hair & Makeup", slug: "entourage-hmua" },
      { name: "Airbrush Makeup", slug: "airbrush-makeup" },
      { name: "Traditional Makeup", slug: "traditional-makeup" },
      { name: "Hair Extensions", slug: "hair-extensions" },
      { name: "On-site Touch-up", slug: "onsite-touchup" },
    ]
  },
  {
    name: "Entertainment & Music",
    slug: "entertainment",
    icon: "🎵",
    description: "Keep your guests entertained all night",
    subcategories: [
      { name: "Live Band", slug: "live-band" },
      { name: "DJ Services", slug: "dj-services" },
      { name: "String Quartet/Orchestra", slug: "string-quartet" },
      { name: "Acoustic Singer", slug: "acoustic-singer" },
      { name: "Wedding Singer", slug: "wedding-singer" },
      { name: "LED/Dancing Robots", slug: "led-robots" },
      { name: "Fireworks/Pyrotechnics", slug: "fireworks" },
      { name: "Sparkler Send-off", slug: "sparkler-sendoff" },
      { name: "Photo/Video Montage", slug: "video-montage" },
      { name: "Host/Emcee", slug: "host-emcee" },
    ]
  },
  {
    name: "Invitations & Stationery",
    slug: "invitations",
    icon: "💌",
    description: "Beautiful paper goods for your wedding",
    subcategories: [
      { name: "Wedding Invitations", slug: "wedding-invitations" },
      { name: "Save the Dates", slug: "save-the-dates" },
      { name: "RSVP Cards", slug: "rsvp-cards" },
      { name: "Program/Misalette", slug: "program-misalette" },
      { name: "Menu Cards", slug: "menu-cards" },
      { name: "Place Cards/Escort Cards", slug: "place-cards" },
      { name: "Thank You Cards", slug: "thank-you-cards" },
      { name: "Calligraphy Services", slug: "calligraphy" },
      { name: "Digital Invitations", slug: "digital-invitations" },
    ]
  },
  {
    name: "Wedding Favors & Gifts",
    slug: "favors-gifts",
    icon: "🎁",
    description: "Memorable tokens for your guests",
    subcategories: [
      { name: "Personalized Favors", slug: "personalized-favors" },
      { name: "Edible Favors", slug: "edible-favors" },
      { name: "Souvenir Items", slug: "souvenir-items" },
      { name: "Gift Boxes/Packaging", slug: "gift-packaging" },
      { name: "Bridal Party Gifts", slug: "bridal-party-gifts" },
      { name: "Parents/Family Gifts", slug: "family-gifts" },
    ]
  },
  {
    name: "Jewelry & Rings",
    slug: "jewelry-rings",
    icon: "💍",
    description: "Symbols of your eternal love",
    subcategories: [
      { name: "Engagement Rings", slug: "engagement-rings" },
      { name: "Wedding Bands", slug: "wedding-bands" },
      { name: "Custom Ring Design", slug: "custom-rings" },
      { name: "Bridal Jewelry Sets", slug: "bridal-jewelry-sets" },
      { name: "Ring Boxes/Bearer", slug: "ring-boxes" },
    ]
  },
  {
    name: "Transportation",
    slug: "transportation",
    icon: "🚗",
    description: "Arrive and depart in style",
    subcategories: [
      { name: "Bridal Car", slug: "bridal-car" },
      { name: "Entourage Vehicles", slug: "entourage-vehicles" },
      { name: "Vintage/Classic Cars", slug: "vintage-cars" },
      { name: "Luxury Cars", slug: "luxury-cars" },
      { name: "Horse & Carriage", slug: "horse-carriage" },
      { name: "Party Bus", slug: "party-bus" },
      { name: "Shuttle Service", slug: "shuttle-service" },
      { name: "Valet Parking", slug: "valet-parking" },
    ]
  },
  {
    name: "Officiant & Ceremony",
    slug: "officiant",
    icon: "⛪",
    description: "Preside over your sacred ceremony",
    subcategories: [
      { name: "Catholic Priest", slug: "catholic-priest" },
      { name: "Christian Pastor", slug: "christian-pastor" },
      { name: "Civil Officiant/Judge", slug: "civil-officiant" },
      { name: "Non-denominational Officiant", slug: "non-denominational" },
      { name: "Wedding Celebrant", slug: "wedding-celebrant" },
      { name: "Ceremony Musicians", slug: "ceremony-musicians" },
      { name: "Choir", slug: "ceremony-choir" },
    ]
  },
  {
    name: "Rentals & Equipment",
    slug: "rentals",
    icon: "🪑",
    description: "Everything you need for your event",
    subcategories: [
      { name: "Tables & Chairs", slug: "tables-chairs" },
      { name: "Linens & Tableware", slug: "linens-tableware" },
      { name: "Tents & Canopies", slug: "tents-canopies" },
      { name: "Lighting Equipment", slug: "lighting-equipment" },
      { name: "Sound System", slug: "sound-system" },
      { name: "Stage/Platform", slug: "stage-platform" },
      { name: "Dance Floor", slug: "dance-floor" },
      { name: "Furniture Rentals", slug: "furniture-rentals" },
      { name: "Decor Props", slug: "decor-props" },
    ]
  },
  {
    name: "Honeymoon & Travel",
    slug: "honeymoon",
    icon: "✈️",
    description: "Plan your romantic getaway",
    subcategories: [
      { name: "Honeymoon Packages", slug: "honeymoon-packages" },
      { name: "Travel Agency", slug: "travel-agency" },
      { name: "Resort Bookings", slug: "resort-bookings" },
      { name: "Cruise Packages", slug: "cruise-packages" },
      { name: "Adventure Honeymoon", slug: "adventure-honeymoon" },
    ]
  },
  {
    name: "Health & Wellness",
    slug: "health-wellness",
    icon: "💆",
    description: "Look and feel your best",
    subcategories: [
      { name: "Bridal Spa & Massage", slug: "bridal-spa" },
      { name: "Pre-wedding Fitness", slug: "prewedding-fitness" },
      { name: "Skincare Treatments", slug: "skincare-treatments" },
      { name: "Dental Services", slug: "dental-services" },
      { name: "Nutritionist/Diet", slug: "nutritionist" },
    ]
  },
  {
    name: "Other Services",
    slug: "other-services",
    icon: "✨",
    description: "Additional wedding services",
    subcategories: [
      { name: "Wedding Insurance", slug: "wedding-insurance" },
      { name: "Security Services", slug: "security-services" },
      { name: "Childcare/Kids Entertainment", slug: "childcare" },
      { name: "Pet Services", slug: "pet-services" },
      { name: "Live Streaming", slug: "live-streaming" },
      { name: "Wedding Website", slug: "wedding-website" },
      { name: "Guest Accommodation", slug: "guest-accommodation" },
      { name: "Translation/Interpreter", slug: "translation" },
    ]
  }
];
```

---

## 🗄️ Category Management System

### Database Seed Script

```typescript
// File: src/lib/seed/seedCategories.ts

import { collection, doc, setDoc, writeBatch } from 'firebase/firestore';
import { db } from '../firebase/config';
import { WEDDING_CATEGORIES } from './categories';

export async function seedCategories() {
  const batch = writeBatch(db);
  
  for (let i = 0; i < WEDDING_CATEGORIES.length; i++) {
    const category = WEDDING_CATEGORIES[i];
    
    // Create category document
    const categoryRef = doc(collection(db, 'categories'));
    batch.set(categoryRef, {
      name: category.name,
      slug: category.slug,
      icon: category.icon,
      description: category.description,
      image: '',
      isActive: true,
      order: i + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    // Create subcategory documents
    for (let j = 0; j < category.subcategories.length; j++) {
      const sub = category.subcategories[j];
      const subRef = doc(collection(db, 'subcategories'));
      batch.set(subRef, {
        categoryId: categoryRef.id,
        categorySlug: category.slug,
        name: sub.name,
        slug: sub.slug,
        description: '',
        icon: '',
        isActive: true,
        order: j + 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  }
  
  await batch.commit();
  console.log('✅ Categories seeded successfully!');
}
```

### Admin Category Management Page

```typescript
// File: src/app/admin/categories/page.tsx

// Features:
// - List all categories with drag-to-reorder
// - Add new category (name, slug, icon, description, image)
// - Edit existing category
// - Toggle active/inactive
// - Delete category (with confirmation)
// - Manage subcategories for each category

interface CategoryManagementFeatures {
  // Category CRUD
  listCategories: {
    display: "table" | "grid";
    columns: ["icon", "name", "subcategories count", "status", "order", "actions"];
    sortable: true;  // Drag to reorder
    filterable: true; // Filter by status
  };
  
  addCategory: {
    fields: ["name", "slug (auto-generate)", "icon (emoji picker)", 
             "description", "image upload", "order"];
    validation: ["name required", "slug unique"];
  };
  
  editCategory: {
    inline: true;  // Click to edit
    modal: true;   // Or open modal
  };
  
  // Subcategory CRUD (nested under each category)
  subcategoryManagement: {
    expandable: true;  // Expand category row to see subcategories
    addSubcategory: ["name", "slug", "description", "icon"];
    editSubcategory: true;
    deleteSubcategory: true;
    reorderSubcategories: true;
  };
}
```

### Category Hooks for Dynamic Loading

```typescript
// File: src/hooks/useCategories.ts

import useSWR from 'swr';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

// Fetch all active categories
export function useCategories() {
  return useSWR('categories', async () => {
    const q = query(
      collection(db, 'categories'),
      where('isActive', '==', true),
      orderBy('order', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }, {
    revalidateOnFocus: false,
    dedupingInterval: 60000, // Cache for 1 minute
  });
}

// Fetch subcategories for a category
export function useSubcategories(categorySlug?: string) {
  return useSWR(
    categorySlug ? `subcategories-${categorySlug}` : null,
    async () => {
      const q = query(
        collection(db, 'subcategories'),
        where('categorySlug', '==', categorySlug),
        where('isActive', '==', true),
        orderBy('order', 'asc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }, {
      revalidateOnFocus: false,
    }
  );
}

// Fetch all categories with their subcategories (for registration)
export function useCategoriesWithSubs() {
  return useSWR('categories-with-subs', async () => {
    // Fetch categories
    const catQuery = query(
      collection(db, 'categories'),
      where('isActive', '==', true),
      orderBy('order', 'asc')
    );
    const catSnapshot = await getDocs(catQuery);
    const categories = catSnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data(),
      subcategories: [] 
    }));
    
    // Fetch all subcategories
    const subQuery = query(
      collection(db, 'subcategories'),
      where('isActive', '==', true),
      orderBy('order', 'asc')
    );
    const subSnapshot = await getDocs(subQuery);
    const subcategories = subSnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    }));
    
    // Group subcategories under their categories
    for (const sub of subcategories) {
      const category = categories.find(c => c.id === sub.categoryId);
      if (category) {
        category.subcategories.push(sub);
      }
    }
    
    return categories;
  }, {
    revalidateOnFocus: false,
    dedupingInterval: 300000, // Cache for 5 minutes
  });
}
```

### Provider Registration with Dynamic Categories

```tsx
// File: src/components/auth/ProviderRegisterForm.tsx

import { useCategoriesWithSubs } from '@/hooks/useCategories';

export function ProviderRegisterForm() {
  const { data: categories, isLoading } = useCategoriesWithSubs();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  
  // Filter subcategories based on selected categories
  const availableSubcategories = useMemo(() => {
    if (!categories) return [];
    return categories
      .filter(cat => selectedCategories.includes(cat.id))
      .flatMap(cat => cat.subcategories);
  }, [categories, selectedCategories]);
  
  return (
    <form>
      {/* Category Multi-Select */}
      <div>
        <label>What services do you offer?</label>
        {isLoading ? (
          <Skeleton className="h-12 w-full" />
        ) : (
          <CheckboxGroup
            value={selectedCategories}
            onChange={setSelectedCategories}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {categories?.map(cat => (
                <Checkbox key={cat.id} value={cat.id}>
                  <span className="mr-2">{cat.icon}</span>
                  {cat.name}
                </Checkbox>
              ))}
            </div>
          </CheckboxGroup>
        )}
      </div>
      
      {/* Subcategory Multi-Select (shows when categories selected) */}
      {selectedCategories.length > 0 && (
        <div>
          <label>Select specific services</label>
          <CheckboxGroup
            value={selectedSubcategories}
            onChange={setSelectedSubcategories}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {availableSubcategories.map(sub => (
                <Checkbox key={sub.id} value={sub.id}>
                  {sub.name}
                </Checkbox>
              ))}
            </div>
          </CheckboxGroup>
        </div>
      )}
    </form>
  );
}
```

### Admin Seed Page (One-time Setup)

```tsx
// File: src/app/admin/seed/page.tsx (Protected - Admin Only)

'use client';
import { useState } from 'react';
import { Button, Card } from '@nextui-org/react';
import { seedCategories } from '@/lib/seed/seedCategories';

export default function SeedPage() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  
  const handleSeed = async () => {
    if (!confirm('This will seed all categories. Continue?')) return;
    
    setLoading(true);
    try {
      await seedCategories();
      setDone(true);
    } catch (error) {
      console.error('Seed failed:', error);
      alert('Failed to seed categories');
    }
    setLoading(false);
  };
  
  return (
    <div className="p-8">
      <Card className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Database Seed</h1>
        <p className="text-gray-600 mb-4">
          Click below to seed initial categories and subcategories.
          Only run this once during initial setup.
        </p>
        
        {done ? (
          <div className="text-green-600 font-medium">
            ✅ Categories seeded successfully!
          </div>
        ) : (
          <Button
            color="primary"
            onClick={handleSeed}
            isLoading={loading}
          >
            Seed Categories
          </Button>
        )}
      </Card>
    </div>
  );
}
```

---

## 🗓️ Realtime Booking System

### Booking Flow & Double-Booking Prevention

```typescript
// File: src/lib/booking/bookingService.ts

interface BookingService {
  // Check availability before booking
  checkAvailability: {
    input: { providerId: string; date: Date; serviceId?: string };
    output: {
      isAvailable: boolean;
      currentBookings: number;
      maxBookings: number;
      remainingSlots: number;
      blockedReason?: string;
    };
  };

  // Atomic booking creation with Firestore transaction
  createBooking: {
    // Uses Firestore transaction to prevent race conditions
    // 1. Read current bookings for date
    // 2. Verify slots available
    // 3. Create booking + update availability atomically
    // 4. If conflict, transaction fails and retries
  };
}

// Realtime availability check
export async function checkProviderAvailability(
  providerId: string, 
  date: Date
): Promise<AvailabilityResult> {
  const provider = await getDoc(doc(db, 'providers', providerId));
  const maxBookings = provider.data()?.maxBookingsPerDay || 1;
  
  // Get all bookings for this date
  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));
  
  const bookingsQuery = query(
    collection(db, 'bookings'),
    where('providerId', '==', providerId),
    where('eventDate', '>=', startOfDay),
    where('eventDate', '<=', endOfDay),
    where('status', 'in', ['pending', 'confirmed'])
  );
  
  const bookingsSnap = await getDocs(bookingsQuery);
  const currentBookings = bookingsSnap.size;
  
  // Check if date is manually blocked
  const availabilityQuery = query(
    collection(db, 'providerAvailability'),
    where('providerId', '==', providerId),
    where('date', '==', startOfDay)
  );
  const availSnap = await getDocs(availabilityQuery);
  const isBlocked = availSnap.docs.some(d => d.data().status === 'blocked');
  
  return {
    isAvailable: !isBlocked && currentBookings < maxBookings,
    currentBookings,
    maxBookings,
    remainingSlots: Math.max(0, maxBookings - currentBookings),
    blockedReason: isBlocked ? 'Date blocked by vendor' : undefined,
  };
}

// Atomic booking with transaction (prevents double booking)
export async function createBookingAtomic(
  bookingData: BookingInput
): Promise<{ success: boolean; bookingId?: string; error?: string }> {
  try {
    const result = await runTransaction(db, async (transaction) => {
      // 1. Re-check availability within transaction
      const availability = await checkProviderAvailability(
        bookingData.providerId, 
        bookingData.eventDate
      );
      
      if (!availability.isAvailable) {
        throw new Error('Date no longer available');
      }
      
      // 2. Create booking document
      const bookingRef = doc(collection(db, 'bookings'));
      const bookingId = generateBookingId(); // WB-BKG-2024-0001 format
      
      transaction.set(bookingRef, {
        ...bookingData,
        bookingId,
        status: 'pending',
        paymentStatus: 'pending',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      
      // 3. Update availability document
      const availRef = doc(collection(db, 'providerAvailability'));
      transaction.set(availRef, {
        providerId: bookingData.providerId,
        date: bookingData.eventDate,
        status: availability.remainingSlots === 1 ? 'booked' : 'available',
        bookedSlots: availability.currentBookings + 1,
        bookingId: bookingRef.id,
        createdAt: serverTimestamp(),
      }, { merge: true });
      
      return { bookingId, docId: bookingRef.id };
    });
    
    return { success: true, bookingId: result.bookingId };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
```

### Provider Capacity Settings
```tsx
// File: src/components/provider/CapacitySettings.tsx

export function CapacitySettings() {
  const [maxBookings, setMaxBookings] = useState(1);
  const [advanceBookingDays, setAdvanceBookingDays] = useState(7);
  
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Booking Settings</h3>
      
      <div className="space-y-6">
        {/* Max bookings per day */}
        <div>
          <label className="text-sm font-medium">
            Maximum Events Per Day
          </label>
          <p className="text-xs text-gray-500 mb-2">
            How many events can you handle on the same day?
          </p>
          <Slider
            value={maxBookings}
            onChange={setMaxBookings}
            minValue={1}
            maxValue={10}
            step={1}
            showSteps
            marks={[
              { value: 1, label: '1' },
              { value: 5, label: '5' },
              { value: 10, label: '10' },
            ]}
          />
          <Chip className="mt-2">{maxBookings} event(s) max per day</Chip>
        </div>
        
        {/* Advance booking requirement */}
        <div>
          <label className="text-sm font-medium">
            Minimum Advance Booking
          </label>
          <Select
            value={advanceBookingDays}
            onChange={(e) => setAdvanceBookingDays(Number(e.target.value))}
          >
            <SelectItem value={1}>1 day in advance</SelectItem>
            <SelectItem value={3}>3 days in advance</SelectItem>
            <SelectItem value={7}>1 week in advance</SelectItem>
            <SelectItem value={14}>2 weeks in advance</SelectItem>
            <SelectItem value={30}>1 month in advance</SelectItem>
            <SelectItem value={90}>3 months in advance</SelectItem>
          </Select>
        </div>
      </div>
    </Card>
  );
}
```

### Realtime Calendar with Booking Status
```tsx
// File: src/components/provider/BookingCalendar.tsx

export function BookingCalendar({ providerId }: { providerId: string }) {
  const { data: bookings } = useBookings(providerId);
  const { data: provider } = useProvider(providerId);
  
  const getDateStatus = (date: Date) => {
    const dayBookings = bookings?.filter(b => 
      isSameDay(new Date(b.eventDate), date)
    ) || [];
    
    const maxBookings = provider?.maxBookingsPerDay || 1;
    const confirmedCount = dayBookings.filter(b => 
      ['pending', 'confirmed'].includes(b.status)
    ).length;
    
    if (confirmedCount >= maxBookings) return 'fully-booked';
    if (confirmedCount > 0) return 'partially-booked';
    return 'available';
  };
  
  return (
    <Calendar
      events={bookings?.map(b => ({
        title: `${b.coupleName} - ${b.serviceName}`,
        start: new Date(b.eventDate),
        end: new Date(b.eventDate),
        status: b.status,
        paymentStatus: b.paymentStatus,
      }))}
      dayPropGetter={(date) => {
        const status = getDateStatus(date);
        return {
          className: cn(
            status === 'fully-booked' && 'bg-red-100 text-red-800',
            status === 'partially-booked' && 'bg-yellow-100 text-yellow-800',
            status === 'available' && 'bg-green-50'
          ),
        };
      }}
    />
  );
}
```

---

## 🗺️ Distance-Based Pricing System

### Mapping Integration (Leaflet + OpenRouteService)

```typescript
// File: src/lib/mapping/distanceService.ts

import L from 'leaflet';

// OpenRouteService API (Free: 2,000 requests/day)
const ORS_API_KEY = process.env.NEXT_PUBLIC_ORS_API_KEY;
const ORS_BASE_URL = 'https://api.openrouteservice.org';

interface Coordinates {
  lat: number;
  lng: number;
}

interface DistanceResult {
  distanceKm: number;
  durationMinutes: number;
  route?: GeoJSON.Feature;
}

// Calculate distance between provider base and event venue
export async function calculateDistance(
  origin: Coordinates,
  destination: Coordinates
): Promise<DistanceResult> {
  const response = await fetch(
    `${ORS_BASE_URL}/v2/directions/driving-car?api_key=${ORS_API_KEY}&start=${origin.lng},${origin.lat}&end=${destination.lng},${destination.lat}`
  );
  
  const data = await response.json();
  
  if (data.features && data.features.length > 0) {
    const segment = data.features[0].properties.segments[0];
    return {
      distanceKm: segment.distance / 1000, // meters to km
      durationMinutes: segment.duration / 60, // seconds to minutes
      route: data.features[0],
    };
  }
  
  // Fallback: Haversine formula (straight line distance)
  return {
    distanceKm: haversineDistance(origin, destination),
    durationMinutes: 0,
  };
}

// Haversine formula for straight-line distance
function haversineDistance(coord1: Coordinates, coord2: Coordinates): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLon = toRad(coord2.lng - coord1.lng);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(coord1.lat)) * Math.cos(toRad(coord2.lat)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Geocode address to coordinates (Nominatim - free)
export async function geocodeAddress(address: string): Promise<Coordinates | null> {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&countrycodes=ph`
  );
  
  const data = await response.json();
  if (data.length > 0) {
    return {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
    };
  }
  return null;
}

// Calculate total price with distance
export function calculatePriceWithDistance(
  basePrice: number,
  distanceKm: number,
  pricePerKm: number,
  freeDistanceKm: number
): PriceBreakdown {
  const chargeableDistance = Math.max(0, distanceKm - freeDistanceKm);
  const distanceFee = chargeableDistance * pricePerKm;
  
  return {
    basePrice,
    distanceKm: Math.round(distanceKm * 10) / 10,
    freeDistanceKm,
    chargeableDistanceKm: Math.round(chargeableDistance * 10) / 10,
    pricePerKm,
    distanceFee: Math.round(distanceFee),
    totalPrice: Math.round(basePrice + distanceFee),
  };
}
```

### Interactive Map for Venue Selection
```tsx
// File: src/components/booking/VenueLocationPicker.tsx

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

export function VenueLocationPicker({ 
  value, 
  onChange 
}: {
  value: Coordinates | null;
  onChange: (coords: Coordinates, address: string) => void;
}) {
  const [address, setAddress] = useState('');
  
  // Click handler for map
  function LocationMarker() {
    useMapEvents({
      click: async (e) => {
        const coords = { lat: e.latlng.lat, lng: e.latlng.lng };
        // Reverse geocode to get address
        const addr = await reverseGeocode(coords);
        setAddress(addr);
        onChange(coords, addr);
      },
    });
    return value ? <Marker position={[value.lat, value.lng]} /> : null;
  }
  
  return (
    <div className="space-y-4">
      {/* Address Search */}
      <Input
        label="Venue Address"
        placeholder="Search or click on map..."
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        endContent={
          <Button size="sm" onClick={() => searchAddress(address)}>
            Search
          </Button>
        }
      />
      
      {/* Interactive Map */}
      <div className="h-[300px] rounded-lg overflow-hidden">
        <MapContainer
          center={[14.5995, 120.9842]} // Manila default
          zoom={10}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker />
        </MapContainer>
      </div>
      
      {/* Distance Preview (if provider selected) */}
      {value && providerLocation && (
        <DistancePreview
          origin={providerLocation}
          destination={value}
        />
      )}
    </div>
  );
}
```

### Provider Distance Settings
```tsx
// File: src/components/provider/DistancePricing.tsx

export function DistancePricingSettings() {
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">📍 Distance-Based Pricing</h3>
      
      <div className="space-y-6">
        {/* Base Location */}
        <div>
          <label className="text-sm font-medium">Your Base Location</label>
          <p className="text-xs text-gray-500 mb-2">
            Where you typically start from for events
          </p>
          <VenueLocationPicker
            value={baseLocation}
            onChange={(coords, addr) => setBaseLocation({ coords, address: addr })}
          />
        </div>
        
        {/* Pricing per KM */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="number"
            label="Free Coverage Radius"
            placeholder="20"
            endContent="km"
            description="No extra charge within this distance"
          />
          <Input
            type="number"
            label="Price per KM"
            placeholder="50"
            startContent="₱"
            description="Charge for each km beyond free radius"
          />
          <Input
            type="number"
            label="Maximum Service Area"
            placeholder="200"
            endContent="km"
            description="Won't accept bookings beyond this"
          />
        </div>
        
        {/* Example Calculation */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm font-medium mb-2">Example Pricing:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 0-20 km: No extra charge</li>
            <li>• 50 km venue: +₱1,500 (30km × ₱50)</li>
            <li>• 100 km venue: +₱4,000 (80km × ₱50)</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
```

---

## 💳 PayMongo Payment Integration

### Payment Configuration

```typescript
// File: src/lib/payment/paymongo.ts

const PAYMONGO_SECRET_KEY = process.env.PAYMONGO_SECRET_KEY!;
const PAYMONGO_PUBLIC_KEY = process.env.NEXT_PUBLIC_PAYMONGO_PUBLIC_KEY!;
const PAYMONGO_BASE_URL = 'https://api.paymongo.com/v1';

// Create payment intent for booking
export async function createPaymentIntent(
  amount: number, // in centavos
  description: string,
  metadata: Record<string, any>
) {
  const response = await fetch(`${PAYMONGO_BASE_URL}/payment_intents`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(PAYMONGO_SECRET_KEY + ':').toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        attributes: {
          amount,
          payment_method_allowed: ['card', 'gcash', 'grab_pay', 'paymaya'],
          payment_method_options: {
            card: { request_three_d_secure: 'any' },
          },
          currency: 'PHP',
          description,
          metadata,
        },
      },
    }),
  });
  
  return response.json();
}

// Create refund for cancelled booking
export async function createRefund(
  paymentId: string,
  amount: number, // in centavos
  reason: string
) {
  const response = await fetch(`${PAYMONGO_BASE_URL}/refunds`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(PAYMONGO_SECRET_KEY + ':').toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        attributes: {
          amount,
          payment_id: paymentId,
          reason,
        },
      },
    }),
  });
  
  return response.json();
}

// Webhook handler for payment status updates
export async function handlePayMongoWebhook(event: PayMongoEvent) {
  const { type, data } = event;
  
  switch (type) {
    case 'payment.paid':
      await updateBookingPaymentStatus(
        data.attributes.metadata.bookingId,
        'paid',
        data.id
      );
      break;
      
    case 'payment.failed':
      await updateBookingPaymentStatus(
        data.attributes.metadata.bookingId,
        'failed',
        data.id
      );
      break;
      
    case 'refund.succeeded':
      await updateBookingRefundStatus(
        data.attributes.metadata.bookingId,
        'completed',
        data.id
      );
      break;
  }
}
```

### Refund System
```typescript
// File: src/lib/payment/refundService.ts

interface RefundPolicy {
  daysBeforeEvent: number;
  refundPercentage: number;
}

// Configurable refund policy
const REFUND_POLICIES: RefundPolicy[] = [
  { daysBeforeEvent: 30, refundPercentage: 100 }, // 30+ days: full refund
  { daysBeforeEvent: 14, refundPercentage: 75 },  // 14-29 days: 75%
  { daysBeforeEvent: 7, refundPercentage: 50 },   // 7-13 days: 50%
  { daysBeforeEvent: 3, refundPercentage: 25 },   // 3-6 days: 25%
  { daysBeforeEvent: 0, refundPercentage: 0 },    // <3 days: no refund
];

export function calculateRefundAmount(
  booking: Booking,
  cancellationDate: Date = new Date()
): RefundCalculation {
  const eventDate = new Date(booking.eventDate);
  const daysUntilEvent = Math.floor(
    (eventDate.getTime() - cancellationDate.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  // Find applicable refund policy
  const policy = REFUND_POLICIES.find(p => daysUntilEvent >= p.daysBeforeEvent);
  const refundPercentage = policy?.refundPercentage || 0;
  
  const amountPaid = booking.amountPaid;
  const refundAmount = Math.round(amountPaid * (refundPercentage / 100));
  
  return {
    daysUntilEvent,
    refundPercentage,
    amountPaid,
    refundAmount,
    nonRefundable: amountPaid - refundAmount,
    policyApplied: `${refundPercentage}% refund (${daysUntilEvent} days before event)`,
  };
}

export async function processCancellationWithRefund(
  bookingId: string,
  reason: string,
  cancelledBy: 'couple' | 'provider' | 'admin'
) {
  const booking = await getBooking(bookingId);
  
  if (booking.paymentStatus !== 'paid') {
    // No payment made, just cancel
    return cancelBookingWithoutRefund(bookingId, reason, cancelledBy);
  }
  
  const refund = calculateRefundAmount(booking);
  
  if (refund.refundAmount > 0) {
    // Process refund via PayMongo
    const refundResult = await createRefund(
      booking.paymentId,
      refund.refundAmount * 100, // Convert to centavos
      reason
    );
    
    // Update booking with refund info
    await updateDoc(doc(db, 'bookings', bookingId), {
      status: 'cancelled',
      refundStatus: 'processing',
      refundAmount: refund.refundAmount,
      refundReason: reason,
      cancellationReason: reason,
      cancelledBy,
      cancelledAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    return { success: true, refund: refundResult };
  }
  
  return cancelBookingWithoutRefund(bookingId, reason, cancelledBy);
}
```

### Payment UI Components
```tsx
// File: src/components/payment/PaymentModal.tsx

export function PaymentModal({ booking, onSuccess }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>('gcash');
  const [loading, setLoading] = useState(false);
  
  const paymentMethods = [
    { id: 'gcash', name: 'GCash', icon: '📱' },
    { id: 'grab_pay', name: 'GrabPay', icon: '🟢' },
    { id: 'paymaya', name: 'Maya', icon: '💜' },
    { id: 'card', name: 'Credit/Debit Card', icon: '💳' },
  ];
  
  return (
    <Modal isOpen onClose={onClose}>
      <ModalContent>
        <ModalHeader>Complete Payment</ModalHeader>
        <ModalBody>
          {/* Price Breakdown */}
          <Card className="bg-gray-50 p-4 mb-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Service Fee</span>
                <span>₱{booking.basePricePhp.toLocaleString()}</span>
              </div>
              {booking.distanceFeePhp > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Distance Fee ({booking.distanceKm} km)</span>
                  <span>₱{booking.distanceFeePhp.toLocaleString()}</span>
                </div>
              )}
              <Divider />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-primary">
                  ₱{booking.totalPricePhp.toLocaleString()}
                </span>
              </div>
            </div>
          </Card>
          
          {/* Payment Methods */}
          <RadioGroup
            label="Select Payment Method"
            value={paymentMethod}
            onValueChange={setPaymentMethod}
          >
            {paymentMethods.map(method => (
              <Radio key={method.id} value={method.id}>
                <span className="mr-2">{method.icon}</span>
                {method.name}
              </Radio>
            ))}
          </RadioGroup>
          
          {/* Refund Policy Notice */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
            <p className="font-medium text-blue-800">Cancellation Policy:</p>
            <ul className="text-blue-700 text-xs mt-1 space-y-1">
              <li>• 30+ days before: Full refund</li>
              <li>• 14-29 days: 75% refund</li>
              <li>• 7-13 days: 50% refund</li>
              <li>• 3-6 days: 25% refund</li>
              <li>• Less than 3 days: No refund</li>
            </ul>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handlePayment} isLoading={loading}>
            Pay ₱{booking.totalPricePhp.toLocaleString()}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
```

---

## 🔐 Forgot Password System

### Firebase Password Reset Flow

```typescript
// File: src/lib/firebase/auth.ts

import { sendPasswordResetEmail, confirmPasswordReset } from 'firebase/auth';

export async function sendPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    await sendPasswordResetEmail(auth, email, {
      url: `${window.location.origin}/login`, // Redirect after reset
      handleCodeInApp: false,
    });
    return { success: true };
  } catch (error: any) {
    return { 
      success: false, 
      error: getAuthErrorMessage(error.code) 
    };
  }
}

function getAuthErrorMessage(code: string): string {
  switch (code) {
    case 'auth/user-not-found':
      return 'No account found with this email address.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    default:
      return 'An error occurred. Please try again.';
  }
}
```

### Forgot Password Page
```tsx
// File: src/app/(auth)/forgot-password/page.tsx

'use client';
import { useState } from 'react';
import { Card, Input, Button, Link } from '@nextui-org/react';
import { sendPasswordReset } from '@/lib/firebase/auth';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await sendPasswordReset(email);
    
    if (result.success) {
      setSent(true);
    } else {
      setError(result.error || 'Failed to send reset email');
    }
    
    setLoading(false);
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="text-6xl mb-4">📧</div>
          <h1 className="text-2xl font-bold mb-2">Check Your Email</h1>
          <p className="text-gray-600 mb-6">
            We've sent a password reset link to <strong>{email}</strong>
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Didn't receive the email? Check your spam folder or{' '}
            <button 
              className="text-primary underline"
              onClick={() => setSent(false)}
            >
              try again
            </button>
          </p>
          <Link href="/login">
            <Button color="primary" variant="flat" fullWidth>
              Return to Login
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center mb-2">Forgot Password?</h1>
        <p className="text-gray-600 text-center mb-6">
          Enter your email and we'll send you a reset link
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            label="Email Address"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isRequired
            isInvalid={!!error}
            errorMessage={error}
          />
          
          <Button
            type="submit"
            color="primary"
            fullWidth
            isLoading={loading}
          >
            Send Reset Link
          </Button>
        </form>
        
        <p className="text-center mt-6 text-sm">
          Remember your password?{' '}
          <Link href="/login" className="text-primary">
            Back to Login
          </Link>
        </p>
      </Card>
    </div>
  );
}
```

---

## 📋 Form Validation & Limits

### Validation Schema with Zod

```typescript
// File: src/lib/validation/schemas.ts

import { z } from 'zod';

// Guest count limits
const GUEST_COUNT_MIN = 1;
const GUEST_COUNT_MAX = 2000;

// Budget limits
const BUDGET_MIN = 10000;
const BUDGET_MAX = 100000000; // 100M PHP

// Couple Registration/Profile
export const coupleProfileSchema = z.object({
  partnerName1: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name too long'),
  partnerName2: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name too long'),
  weddingDate: z.date()
    .min(new Date(), 'Wedding date must be in the future'),
  guestCount: z.number()
    .min(GUEST_COUNT_MIN, `Minimum ${GUEST_COUNT_MIN} guest`)
    .max(GUEST_COUNT_MAX, `Maximum ${GUEST_COUNT_MAX} guests`),
  budget: z.number()
    .min(BUDGET_MIN, `Minimum budget is ₱${BUDGET_MIN.toLocaleString()}`)
    .max(BUDGET_MAX, `Maximum budget is ₱${BUDGET_MAX.toLocaleString()}`),
  weddingVenue: z.object({
    name: z.string().min(1, 'Venue name required'),
    address: z.string().min(5, 'Address required'),
    city: z.string().min(1, 'City required'),
    province: z.string().min(1, 'Province required'),
    coordinates: z.object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
    }).optional(),
  }),
});

// Provider Registration
export const providerProfileSchema = z.object({
  businessName: z.string()
    .min(2, 'Business name must be at least 2 characters')
    .max(150, 'Business name too long'),
  tagline: z.string()
    .max(200, 'Tagline too long')
    .optional(),
  bio: z.string()
    .min(50, 'Bio must be at least 50 characters')
    .max(2000, 'Bio too long (max 2000 characters)'),
  phone: z.string()
    .regex(/^(\+63|0)?[0-9]{10}$/, 'Invalid Philippine phone number'),
  email: z.string().email('Invalid email address'),
  serviceTypes: z.array(z.string())
    .min(1, 'Select at least one service type')
    .max(10, 'Maximum 10 service types'),
  yearsInBusiness: z.number()
    .min(0, 'Years must be positive')
    .max(100, 'Invalid years'),
  teamSize: z.number()
    .min(1, 'At least 1 team member')
    .max(500, 'Maximum 500 team members'),
  maxBookingsPerDay: z.number()
    .min(1, 'At least 1 booking per day')
    .max(20, 'Maximum 20 bookings per day'),
  pricePerKm: z.number()
    .min(0, 'Price cannot be negative')
    .max(500, 'Maximum ₱500 per km'),
  freeDistanceKm: z.number()
    .min(0, 'Distance cannot be negative')
    .max(100, 'Maximum 100km free'),
});

// Booking/Inquiry
export const bookingSchema = z.object({
  eventDate: z.date()
    .min(new Date(), 'Event date must be in the future'),
  guestCount: z.number()
    .min(GUEST_COUNT_MIN, `Minimum ${GUEST_COUNT_MIN} guest`)
    .max(GUEST_COUNT_MAX, `Maximum ${GUEST_COUNT_MAX} guests`),
  specialRequests: z.string()
    .max(1000, 'Special requests too long')
    .optional(),
  venueAddress: z.string()
    .min(5, 'Venue address required'),
});

// Review
export const reviewSchema = z.object({
  rating: z.number()
    .min(1, 'Please select a rating')
    .max(5, 'Maximum 5 stars'),
  title: z.string()
    .min(5, 'Title must be at least 5 characters')
    .max(100, 'Title too long'),
  content: z.string()
    .min(20, 'Review must be at least 20 characters')
    .max(2000, 'Review too long'),
});
```

### Form Component with Validation
```tsx
// File: src/components/forms/CoupleProfileForm.tsx

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { coupleProfileSchema } from '@/lib/validation/schemas';

export function CoupleProfileForm() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    watch 
  } = useForm({
    resolver: zodResolver(coupleProfileSchema),
    defaultValues: {
      guestCount: 100,
      budget: 500000,
    },
  });

  const guestCount = watch('guestCount');

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Guest Count with Visual Limits */}
      <div>
        <Input
          type="number"
          label="Guest Count"
          {...register('guestCount', { valueAsNumber: true })}
          isInvalid={!!errors.guestCount}
          errorMessage={errors.guestCount?.message}
          description={`Expected guests (1-2,000)`}
        />
        
        {/* Visual indicator */}
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div 
              className={cn(
                "h-2 rounded-full transition-all",
                guestCount <= 50 && "bg-blue-500 w-[10%]",
                guestCount <= 100 && guestCount > 50 && "bg-green-500 w-[25%]",
                guestCount <= 200 && guestCount > 100 && "bg-yellow-500 w-[50%]",
                guestCount <= 500 && guestCount > 200 && "bg-orange-500 w-[75%]",
                guestCount > 500 && "bg-red-500 w-full"
              )}
            />
          </div>
          <Chip size="sm" variant="flat">
            {guestCount <= 50 && "Intimate"}
            {guestCount <= 100 && guestCount > 50 && "Small"}
            {guestCount <= 200 && guestCount > 100 && "Medium"}
            {guestCount <= 500 && guestCount > 200 && "Large"}
            {guestCount > 500 && "Grand"}
          </Chip>
        </div>
      </div>
      
      {/* Budget with Suggestions */}
      <div className="mt-4">
        <Input
          type="number"
          label="Budget"
          startContent="₱"
          {...register('budget', { valueAsNumber: true })}
          isInvalid={!!errors.budget}
          errorMessage={errors.budget?.message}
        />
        
        {/* Quick budget buttons */}
        <div className="flex flex-wrap gap-2 mt-2">
          {[200000, 500000, 1000000, 2000000].map(amount => (
            <Chip 
              key={amount}
              as="button"
              variant="bordered"
              onClick={() => setValue('budget', amount)}
            >
              ₱{(amount/1000)}K
            </Chip>
          ))}
        </div>
      </div>
    </form>
  );
}
```

---

## 📊 Admin Heatmaps & Analytics

### Heatmap Visualization

```typescript
// File: src/lib/analytics/heatmapData.ts

interface HeatmapData {
  // Geographic heatmap - where are the most bookings
  locationHeatmap: {
    coordinates: { lat: number; lng: number };
    intensity: number; // Number of bookings
    region: string;
  }[];
  
  // Time-based heatmap - when do bookings happen
  timeHeatmap: {
    dayOfWeek: number; // 0-6
    hour: number; // 0-23
    count: number;
  }[];
  
  // Category popularity heatmap
  categoryHeatmap: {
    categorySlug: string;
    categoryName: string;
    bookings: number;
    inquiries: number;
    revenue: number;
  }[];
  
  // Price range heatmap
  priceHeatmap: {
    priceRange: string;
    bookings: number;
    percentage: number;
  }[];
}

// Fetch analytics data for admin dashboard
export async function getAdminHeatmapData(
  dateRange: { start: Date; end: Date }
): Promise<HeatmapData> {
  // Query bookings within date range
  const bookingsQuery = query(
    collection(db, 'bookings'),
    where('createdAt', '>=', dateRange.start),
    where('createdAt', '<=', dateRange.end)
  );
  
  const bookings = await getDocs(bookingsQuery);
  
  // Process for location heatmap
  const locationMap = new Map();
  bookings.forEach(doc => {
    const data = doc.data();
    const key = `${data.eventVenue.coordinates.lat.toFixed(2)},${data.eventVenue.coordinates.lng.toFixed(2)}`;
    locationMap.set(key, (locationMap.get(key) || 0) + 1);
  });
  
  // ... process other heatmap data
  
  return heatmapData;
}
```

### Heatmap Components
```tsx
// File: src/components/admin/analytics/LocationHeatmap.tsx

import { MapContainer, TileLayer } from 'react-leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer-v3';

export function LocationHeatmap({ data }: { data: LocationHeatmapData[] }) {
  const points = data.map(d => ({
    lat: d.coordinates.lat,
    lng: d.coordinates.lng,
    intensity: d.intensity,
  }));

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">📍 Booking Locations</h3>
      <div className="h-[400px] rounded-lg overflow-hidden">
        <MapContainer
          center={[12.8797, 121.774]} // Philippines center
          zoom={6}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <HeatmapLayer
            points={points}
            longitudeExtractor={(p) => p.lng}
            latitudeExtractor={(p) => p.lat}
            intensityExtractor={(p) => p.intensity}
            radius={25}
            blur={15}
            max={10}
          />
        </MapContainer>
      </div>
      
      {/* Top Regions */}
      <div className="mt-4">
        <h4 className="font-medium mb-2">Top Regions</h4>
        <div className="space-y-2">
          {data.slice(0, 5).map((region, i) => (
            <div key={i} className="flex items-center gap-2">
              <Badge color={i === 0 ? 'success' : 'default'}>{i + 1}</Badge>
              <span>{region.region}</span>
              <Chip size="sm">{region.intensity} bookings</Chip>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
```

```tsx
// File: src/components/admin/analytics/TimeHeatmap.tsx

import { ResponsiveHeatMap } from '@nivo/heatmap';

export function TimeHeatmap({ data }: { data: TimeHeatmapData[] }) {
  // Transform data for heatmap
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const hours = Array.from({ length: 24 }, (_, i) => 
    i < 12 ? `${i}AM` : `${i-12}PM`
  );
  
  const chartData = days.map((day, dayIndex) => ({
    id: day,
    data: hours.map((hour, hourIndex) => {
      const point = data.find(d => 
        d.dayOfWeek === dayIndex && d.hour === hourIndex
      );
      return { x: hour, y: point?.count || 0 };
    }),
  }));

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">🕐 Peak Booking Times</h3>
      <div className="h-[300px]">
        <ResponsiveHeatMap
          data={chartData}
          margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
          colors={{
            type: 'sequential',
            scheme: 'oranges',
          }}
          axisBottom={{
            tickSize: 5,
            tickRotation: -45,
          }}
          labelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
          tooltip={({ cell }) => (
            <div className="bg-white shadow-lg p-2 rounded">
              <strong>{cell.serieId} {cell.data.x}</strong>
              <br />
              {cell.data.y} bookings
            </div>
          )}
        />
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p>💡 Peak booking times: Saturday-Sunday, 2PM-6PM</p>
      </div>
    </Card>
  );
}
```

### Admin Analytics Dashboard Page
```tsx
// File: src/app/admin/analytics/page.tsx

export default function AdminAnalyticsPage() {
  const [dateRange, setDateRange] = useState({
    start: subDays(new Date(), 30),
    end: new Date(),
  });
  
  const { data, isLoading } = useAdminAnalytics(dateRange);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">📊 Platform Analytics</h1>
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatsCard title="Total Bookings" value={data?.totalBookings} />
        <StatsCard title="Total Revenue" value={`₱${data?.totalRevenue}`} />
        <StatsCard title="Active Providers" value={data?.activeProviders} />
        <StatsCard title="Conversion Rate" value={`${data?.conversionRate}%`} />
      </div>
      
      {/* Heatmaps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LocationHeatmap data={data?.locationHeatmap} />
        <TimeHeatmap data={data?.timeHeatmap} />
      </div>
      
      {/* Category Performance */}
      <CategoryHeatmap data={data?.categoryHeatmap} />
      
      {/* Revenue by Region */}
      <RevenueByRegionChart data={data?.revenueByRegion} />
    </div>
  );
}
```

---

## 🏷️ ID Tag System

### ID Generation & Display

```typescript
// File: src/lib/utils/idGenerator.ts

// ID Format: WB-[TYPE]-[YEAR]-[SEQUENCE]
// Examples:
// - Couple: WB-CPL-2024-0001
// - Provider/Vendor: WB-VND-2024-0001
// - Booking: WB-BKG-2024-0001
// - Transaction: WB-TXN-2024-0001

const ID_PREFIXES = {
  couple: 'CPL',
  provider: 'VND',
  booking: 'BKG',
  transaction: 'TXN',
  inquiry: 'INQ',
};

export async function generateId(type: keyof typeof ID_PREFIXES): Promise<string> {
  const prefix = ID_PREFIXES[type];
  const year = new Date().getFullYear();
  
  // Get current sequence from counter collection
  const counterRef = doc(db, 'counters', `${type}-${year}`);
  
  const newSequence = await runTransaction(db, async (transaction) => {
    const counterDoc = await transaction.get(counterRef);
    const currentSeq = counterDoc.exists() ? counterDoc.data().value : 0;
    const newSeq = currentSeq + 1;
    transaction.set(counterRef, { value: newSeq }, { merge: true });
    return newSeq;
  });
  
  return `WB-${prefix}-${year}-${String(newSequence).padStart(4, '0')}`;
}
```

### ID Tag Components
```tsx
// File: src/components/ui/IdTag.tsx

interface IdTagProps {
  id: string;
  type: 'couple' | 'provider' | 'booking' | 'transaction';
  size?: 'sm' | 'md' | 'lg';
  showCopy?: boolean;
  verified?: boolean;
  badge?: 'verified' | 'premium' | 'top_rated' | 'new';
}

const TYPE_COLORS = {
  couple: 'bg-pink-100 text-pink-800 border-pink-200',
  provider: 'bg-blue-100 text-blue-800 border-blue-200',
  booking: 'bg-green-100 text-green-800 border-green-200',
  transaction: 'bg-purple-100 text-purple-800 border-purple-200',
};

const BADGE_ICONS = {
  verified: { icon: '✓', color: 'bg-blue-500', label: 'Verified' },
  premium: { icon: '⭐', color: 'bg-gold-500', label: 'Premium' },
  top_rated: { icon: '🏆', color: 'bg-yellow-500', label: 'Top Rated' },
  new: { icon: '🆕', color: 'bg-green-500', label: 'New' },
};

export function IdTag({ 
  id, 
  type, 
  size = 'md', 
  showCopy = true,
  badge 
}: IdTagProps) {
  const [copied, setCopied] = useState(false);
  
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2',
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="inline-flex items-center gap-2">
      <div 
        className={cn(
          "inline-flex items-center gap-2 rounded-lg border font-mono",
          TYPE_COLORS[type],
          sizeClasses[size]
        )}
      >
        {/* Type Icon */}
        <span className="opacity-60">
          {type === 'couple' && '💑'}
          {type === 'provider' && '🏪'}
          {type === 'booking' && '📅'}
          {type === 'transaction' && '💳'}
        </span>
        
        {/* ID Text */}
        <span className="font-semibold tracking-wider">{id}</span>
        
        {/* Copy Button */}
        {showCopy && (
          <button 
            onClick={handleCopy}
            className="ml-1 opacity-60 hover:opacity-100 transition"
          >
            {copied ? '✓' : '📋'}
          </button>
        )}
      </div>
      
      {/* Verification Badge */}
      {badge && (
        <Tooltip content={BADGE_ICONS[badge].label}>
          <div 
            className={cn(
              "w-6 h-6 rounded-full flex items-center justify-center text-white text-xs",
              BADGE_ICONS[badge].color
            )}
          >
            {BADGE_ICONS[badge].icon}
          </div>
        </Tooltip>
      )}
    </div>
  );
}
```

### ID Card Component (For Profiles)
```tsx
// File: src/components/ui/IdCard.tsx

export function VendorIdCard({ provider }: { provider: Provider }) {
  return (
    <div className="relative bg-gradient-to-br from-navy-500 to-navy-700 text-white rounded-2xl p-6 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-gold-500" />
        <div className="absolute -left-10 -bottom-10 w-32 h-32 rounded-full bg-gold-500" />
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-gold-300 text-sm">Wedding Bazaar</p>
            <p className="text-xs text-gray-300">Service Provider</p>
          </div>
          {provider.verificationBadge !== 'none' && (
            <div className="bg-gold-500 text-navy-800 px-3 py-1 rounded-full text-xs font-bold">
              ✓ {provider.verificationBadge.toUpperCase()}
            </div>
          )}
        </div>
        
        {/* Provider Info */}
        <div className="flex items-center gap-4 mb-4">
          <Avatar
            src={provider.profileImage}
            alt={provider.businessName}
            size="lg"
            className="ring-2 ring-gold-500"
          />
          <div>
            <h3 className="font-bold text-xl">{provider.businessName}</h3>
            <p className="text-gray-300 text-sm">{provider.primaryCategory}</p>
          </div>
        </div>
        
        {/* ID Number */}
        <div className="bg-white/10 backdrop-blur rounded-lg p-3 mb-4">
          <p className="text-xs text-gray-300 mb-1">Vendor ID</p>
          <p className="font-mono text-lg font-bold tracking-widest">
            {provider.vendorId}
          </p>
        </div>
        
        {/* Footer Stats */}
        <div className="flex justify-between text-sm">
          <div>
            <p className="text-gray-300">Rating</p>
            <p className="font-bold">⭐ {provider.rating}</p>
          </div>
          <div>
            <p className="text-gray-300">Since</p>
            <p className="font-bold">{provider.yearsInBusiness} years</p>
          </div>
          <div>
            <p className="text-gray-300">Bookings</p>
            <p className="font-bold">{provider.totalBookings}</p>
          </div>
        </div>
      </div>
      
      {/* QR Code (Optional) */}
      <div className="absolute bottom-4 right-4">
        <QRCode 
          value={`https://weddingbazaar.ph/vendor/${provider.id}`}
          size={60}
          bgColor="transparent"
          fgColor="white"
        />
      </div>
    </div>
  );
}
```

---

## 🧠 Intelligent Wedding Planning (AI-Powered)

### Smart Budget Allocation

```typescript
// File: src/lib/planning/budgetAllocator.ts

// Industry-standard budget allocation percentages
const DEFAULT_ALLOCATION = {
  venue: 35,
  catering: 20,
  photographyVideography: 12,
  flowersDecorations: 8,
  entertainment: 7,
  attire: 6,
  invitations: 3,
  transportation: 3,
  favors: 2,
  miscellaneous: 4,
};

// Adjust based on wedding style
const STYLE_ADJUSTMENTS: Record<string, Partial<typeof DEFAULT_ALLOCATION>> = {
  'intimate': {
    venue: 25,
    catering: 25,
    photographyVideography: 18,
    flowersDecorations: 12,
  },
  'grand': {
    venue: 40,
    catering: 18,
    entertainment: 10,
  },
  'destination': {
    venue: 30,
    transportation: 15,
    miscellaneous: 10,
  },
  'rustic': {
    venue: 25,
    flowersDecorations: 15,
    favors: 5,
  },
};

export function calculateSmartBudgetAllocation(
  totalBudget: number,
  guestCount: number,
  weddingStyle: string,
  priorityCategories: string[]
): BudgetAllocation {
  let allocation = { ...DEFAULT_ALLOCATION };
  
  // Apply style adjustments
  if (STYLE_ADJUSTMENTS[weddingStyle]) {
    allocation = { ...allocation, ...STYLE_ADJUSTMENTS[weddingStyle] };
  }
  
  // Boost priority categories (+5% each, reduce from miscellaneous)
  priorityCategories.forEach(category => {
    if (allocation[category]) {
      allocation[category] += 5;
      allocation.miscellaneous -= 5;
    }
  });
  
  // Calculate actual amounts
  const amounts: Record<string, number> = {};
  Object.entries(allocation).forEach(([key, percentage]) => {
    amounts[key] = Math.round((totalBudget * percentage) / 100);
  });
  
  // Calculate per-guest catering cost
  const perGuestCatering = Math.round(amounts.catering / guestCount);
  
  return {
    percentages: allocation,
    amounts,
    perGuestCatering,
    totalBudget,
    recommendations: generateBudgetRecommendations(amounts, guestCount),
  };
}

function generateBudgetRecommendations(
  amounts: Record<string, number>,
  guestCount: number
): string[] {
  const recommendations: string[] = [];
  
  if (amounts.catering / guestCount < 500) {
    recommendations.push(
      '💡 Your per-guest catering budget is tight. Consider buffet-style service to maximize value.'
    );
  }
  
  if (amounts.photographyVideography < 50000) {
    recommendations.push(
      '📷 For photography, prioritize coverage hours over extras like drone shots.'
    );
  }
  
  return recommendations;
}
```

### Smart Vendor Recommendations

```typescript
// File: src/lib/planning/vendorRecommender.ts

interface RecommendationInput {
  coupleProfile: CoupleProfile;
  currentBookings: string[]; // Already booked vendor IDs
  viewedVendors: string[];
  favoriteVendors: string[];
}

export async function generateSmartRecommendations(
  input: RecommendationInput
): Promise<RecommendedVendor[]> {
  const { coupleProfile, currentBookings, viewedVendors, favoriteVendors } = input;
  
  // 1. Determine unfilled categories
  const bookedCategories = await getBookedCategories(currentBookings);
  const neededCategories = ESSENTIAL_CATEGORIES.filter(
    c => !bookedCategories.includes(c)
  );
  
  // 2. For each needed category, find best matches
  const recommendations: RecommendedVendor[] = [];
  
  for (const category of neededCategories) {
    const vendors = await queryVendors({
      category,
      location: coupleProfile.weddingVenue.city,
      priceRange: calculateCategoryBudget(coupleProfile.budget, category),
      availableOn: coupleProfile.weddingDate,
    });
    
    // Calculate match scores
    const scoredVendors = vendors.map(vendor => ({
      ...vendor,
      matchScore: calculateMatchScore(vendor, coupleProfile),
      matchReasons: getMatchReasons(vendor, coupleProfile),
    }));
    
    // Sort by match score and take top 3
    const topVendors = scoredVendors
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);
    
    recommendations.push(...topVendors.map(v => ({
      ...v,
      category,
      priority: getPriority(category, neededCategories.indexOf(category)),
    })));
  }
  
  return recommendations;
}

function calculateMatchScore(
  vendor: Provider,
  couple: CoupleProfile
): number {
  let score = 0;
  
  // Budget match (30%)
  const budgetForCategory = calculateCategoryBudget(couple.budget, vendor.primaryCategory);
  const vendorAvgPrice = (vendor.priceMin + vendor.priceMax) / 2;
  const budgetDiff = Math.abs(budgetForCategory - vendorAvgPrice) / budgetForCategory;
  score += Math.max(0, 30 - (budgetDiff * 30));
  
  // Location match (20%)
  const distance = calculateDistance(
    vendor.baseLocation.coordinates,
    couple.weddingVenue.coordinates
  );
  score += Math.max(0, 20 - (distance * 0.2)); // -0.2 points per km
  
  // Rating (20%)
  score += (vendor.rating / 5) * 20;
  
  // Style match (15%)
  if (vendor.styles?.includes(couple.weddingStyle)) {
    score += 15;
  }
  
  // Availability confirmed (15%)
  score += vendor.isAvailableOnDate ? 15 : 0;
  
  return Math.round(score);
}
```

### Intelligent Planning Dashboard
```tsx
// File: src/components/couple/IntelligentPlanning.tsx

export function IntelligentPlanningDashboard() {
  const { data: coupleProfile } = useCoupleProfile();
  const { data: recommendations } = useSmartRecommendations();
  const { data: budgetAllocation } = useSmartBudgetAllocation();
  const { data: timeline } = useWeddingTimeline();

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="p-6 bg-gradient-to-r from-primary-50 to-pink-50">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Your Wedding Planning</h2>
            <p className="text-gray-600">
              {daysUntilWedding} days until the big day! 🎉
            </p>
          </div>
          <CircularProgress
            value={coupleProfile?.planningProgress || 0}
            size="lg"
            showValueLabel
            classNames={{
              value: "text-2xl font-bold",
            }}
          />
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MiniStat 
            icon="📋" 
            label="Tasks Done" 
            value={`${completedTasks}/${totalTasks}`} 
          />
          <MiniStat 
            icon="💰" 
            label="Budget Spent" 
            value={`${budgetSpentPercent}%`} 
          />
          <MiniStat 
            icon="🏪" 
            label="Vendors Booked" 
            value={`${bookedVendors}/${neededVendors}`} 
          />
          <MiniStat 
            icon="📅" 
            label="Days Left" 
            value={daysUntilWedding} 
          />
        </div>
      </Card>

      {/* Smart Budget Allocation */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">💡 Smart Budget Allocation</h3>
          <Chip color="primary" variant="flat">AI Suggested</Chip>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="h-[300px]">
            <PieChart data={budgetAllocation?.percentages} />
          </div>
          
          {/* Allocation List */}
          <div className="space-y-3">
            {Object.entries(budgetAllocation?.amounts || {}).map(([category, amount]) => (
              <div key={category} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span>{getCategoryIcon(category)}</span>
                  <span className="capitalize">{formatCategoryName(category)}</span>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₱{amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">
                    {budgetAllocation?.percentages[category]}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recommendations */}
        {budgetAllocation?.recommendations?.length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Recommendations</h4>
            <ul className="space-y-1 text-sm text-blue-700">
              {budgetAllocation.recommendations.map((rec, i) => (
                <li key={i}>{rec}</li>
              ))}
            </ul>
          </div>
        )}
      </Card>

      {/* Smart Vendor Recommendations */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">🎯 Recommended for You</h3>
          <Button size="sm" variant="light">View All</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations?.slice(0, 3).map(vendor => (
            <VendorRecommendationCard
              key={vendor.id}
              vendor={vendor}
              matchScore={vendor.matchScore}
              matchReasons={vendor.matchReasons}
            />
          ))}
        </div>
        
        {/* Unfilled Categories Alert */}
        <div className="mt-4 flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="font-medium text-yellow-800">
              You still need vendors for:
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {neededCategories.map(cat => (
                <Chip key={cat} size="sm" variant="bordered">
                  {getCategoryIcon(cat)} {cat}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Timeline/Checklist */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">📅 Your Timeline</h3>
        
        <div className="space-y-4">
          {timeline?.map((phase, index) => (
            <TimelinePhase
              key={phase.id}
              phase={phase}
              isActive={isPhaseActive(phase)}
              isCompleted={isPhaseCompleted(phase)}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}
```

---

## 🎯 Decision Support System

### For Couples - Smart Vendor Finder

A comprehensive system to help couples easily find and compare the right vendors:

#### 1. Smart Search & Filters (Responsive Grid)
```typescript
interface VendorFilters {
  // Basic Filters
  categories: string[];           // Multi-select categories
  subcategories: string[];        // Specific services
  location: {
    city: string;
    province: string;
    radius: number;              // km radius for nearby
  };
  
  // Budget Filters
  priceRange: {
    min: number;
    max: number;
  };
  priceType: "budget" | "mid-range" | "premium" | "luxury";
  
  // Availability
  weddingDate: Date;             // Check if available
  isAvailableOnly: boolean;      // Only show available vendors
  
  // Quality Filters
  minimumRating: number;         // 1-5 stars
  hasReviews: boolean;
  isVerified: boolean;
  isFeatured: boolean;
  
  // Sorting
  sortBy: "rating" | "price-low" | "price-high" | "reviews" | "newest";
}
```

#### 2. Wedding Style Quiz (Couple Onboarding)
```typescript
interface WeddingStyleQuiz {
  questions: [
    {
      question: "What's your wedding style?",
      options: ["Classic/Traditional", "Modern/Minimalist", "Rustic/Bohemian", 
                "Glamorous/Luxurious", "Beach/Tropical", "Garden/Romantic"]
    },
    {
      question: "What's your estimated budget?",
      options: ["Under ₱200,000", "₱200,000 - ₱500,000", "₱500,000 - ₱1,000,000",
                "₱1,000,000 - ₱2,000,000", "₱2,000,000+"]
    },
    {
      question: "Expected number of guests?",
      options: ["Intimate (1-50)", "Small (51-100)", "Medium (101-200)",
                "Large (201-300)", "Grand (300+)"]
    },
    {
      question: "When is your wedding?",
      options: ["Within 3 months", "3-6 months", "6-12 months", "1-2 years", "Not sure yet"]
    },
    {
      question: "Which services are your priority?",
      options: ["Venue", "Photography", "Catering", "Decorations", "Entertainment", "Attire"]
    }
  ]
}

// Results generate personalized vendor recommendations
```

#### 3. Comparison Tool
```typescript
interface VendorComparison {
  maxCompare: 4;  // Compare up to 4 vendors side-by-side
  compareFields: [
    "businessName",
    "rating",
    "reviewCount",
    "priceRange",
    "servicesOffered",
    "packageOptions",
    "availability",
    "location",
    "yearsInBusiness",
    "responseTime"
  ];
}
```

#### 4. Vendor Match Score
```typescript
// Algorithm to calculate match percentage
interface MatchScore {
  budgetMatch: number;      // 0-100 based on budget alignment
  styleMatch: number;       // 0-100 based on wedding style
  availabilityMatch: number; // 0-100 based on date availability
  locationMatch: number;    // 0-100 based on proximity
  ratingScore: number;      // 0-100 based on reviews
  
  overallMatch: number;     // Weighted average
}

// Display: "92% Match" badge on vendor cards
```

#### 5. Recently Viewed & Smart Recommendations
```typescript
interface Recommendations {
  recentlyViewed: Provider[];        // Last 10 viewed
  basedOnFavorites: Provider[];      // Similar to saved vendors
  popularInCategory: Provider[];     // Top in same category
  newlyJoined: Provider[];           // New quality vendors
  availableOnDate: Provider[];       // Available for wedding date
}
```

---

### For Service Providers - Team & Business Dashboard

#### 1. Team Management
```typescript
interface ProviderTeam {
  // Team Members (for larger businesses)
  members: [
    {
      id: string;
      name: string;
      role: "owner" | "manager" | "staff" | "photographer" | "coordinator";
      email: string;
      phone: string;
      photo: string;
      specializations: string[];     // e.g., ["bridal makeup", "airbrush"]
      isActive: boolean;
    }
  ];
  
  // Team Capacity
  maxEventsPerDay: number;
  teamSize: number;
}
```

#### 2. Service Provider Dashboard Analytics
```typescript
interface ProviderAnalytics {
  // Overview Stats (Cards)
  totalViews: number;               // Profile views
  totalInquiries: number;           // All time
  inquiriesThisMonth: number;
  responseRate: number;             // % of inquiries responded
  averageResponseTime: string;      // e.g., "2 hours"
  conversionRate: number;           // Inquiries to bookings
  
  // Review Analytics
  averageRating: number;
  totalReviews: number;
  ratingBreakdown: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  
  // Popular Services
  topServices: [
    { serviceName: string; inquiries: number; }
  ];
  
  // Monthly Trends (Chart)
  monthlyInquiries: [
    { month: string; count: number; }
  ];
}
```

#### 3. Inquiry Management System
```typescript
interface InquiryManagement {
  // Inquiry Stages
  stages: ["new", "viewed", "responded", "negotiating", "booked", "declined", "expired"];
  
  // Quick Actions
  actions: [
    "Mark as Read",
    "Send Quick Reply",
    "Request More Details",
    "Send Quote",
    "Schedule Call",
    "Mark as Booked",
    "Archive"
  ];
  
  // Templates
  quickReplies: [
    {
      name: "Thank You",
      message: "Thank you for your inquiry! We'd love to be part of your special day..."
    },
    {
      name: "Request Details",
      message: "Thank you for reaching out! To provide you with an accurate quote..."
    },
    {
      name: "Availability Confirmed",
      message: "Great news! We are available on your wedding date..."
    }
  ];
}
```

#### 4. Booking Calendar & Availability
```typescript
interface AvailabilitySystem {
  // Calendar Views
  views: ["month", "week", "agenda"];
  
  // Day Status
  dayStatus: {
    available: { color: "green"; label: "Available" };
    booked: { color: "red"; label: "Booked" };
    blocked: { color: "gray"; label: "Blocked" };
    tentative: { color: "yellow"; label: "Tentative" };
  };
  
  // Booking Info on Calendar
  bookingDetails: {
    coupleName: string;
    eventDate: Date;
    venue: string;
    serviceBooked: string;
    package: string;
    notes: string;
  };
  
  // Quick Actions
  calendarActions: [
    "Block Date",
    "Unblock Date",
    "Add Event Notes",
    "View Booking Details"
  ];
}
```

#### 5. Performance Insights
```typescript
interface PerformanceInsights {
  // Benchmarks (compare with similar providers)
  benchmarks: {
    yourRating: number;
    categoryAverage: number;
    yourResponseTime: string;
    categoryAverage: string;
    yourPricing: string;      // "Below Average" | "Average" | "Above Average"
  };
  
  // Improvement Tips
  tips: [
    { 
      area: "Response Time",
      current: "24 hours",
      suggested: "Under 2 hours",
      impact: "Faster responses increase bookings by 40%"
    },
    {
      area: "Portfolio",
      current: "5 images",
      suggested: "10-15 images",
      impact: "More images increase inquiry rates by 25%"
    }
  ];
}
```

---

## 📱 Responsive Design System

### Breakpoints (Tailwind CSS)
```typescript
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet
  lg: '1024px',  // Small laptop
  xl: '1280px',  // Desktop
  '2xl': '1536px' // Large desktop
};
```

### Layout Components

#### 1. Responsive Grid System
```tsx
// Vendor Grid - Responsive columns
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
  {vendors.map(vendor => <VendorCard key={vendor.id} />)}
</div>

// Dashboard Stats - Responsive
<div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
  <StatsCard />
</div>

// Filters - Stack on mobile, row on desktop
<div className="flex flex-col md:flex-row gap-3">
  <CategoryFilter />
  <LocationFilter />
  <PriceFilter />
</div>
```

#### 2. Mobile Navigation
```tsx
// Bottom Navigation (Mobile Only)
<nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t z-50">
  <div className="flex justify-around py-2">
    <NavItem icon={<HomeIcon />} label="Home" />
    <NavItem icon={<SearchIcon />} label="Search" />
    <NavItem icon={<HeartIcon />} label="Favorites" />
    <NavItem icon={<UserIcon />} label="Profile" />
  </div>
</nav>

// Sidebar (Desktop Only)
<aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-white border-r">
  <Sidebar />
</aside>
```

#### 3. Responsive Tables
```tsx
// Card view on mobile, table on desktop
<div className="hidden md:block">
  <DataTable data={inquiries} columns={columns} />
</div>
<div className="md:hidden space-y-3">
  {inquiries.map(inquiry => (
    <InquiryCard key={inquiry.id} data={inquiry} />
  ))}
</div>
```

#### 4. Touch-Friendly UI
```typescript
const touchFriendlyStyles = {
  // Minimum touch target size
  buttonMinHeight: "44px",
  buttonMinWidth: "44px",
  
  // Spacing for touch
  listItemPadding: "12px 16px",
  
  // Swipe gestures
  swipeActions: ["Delete", "Archive", "Mark Read"],
  
  // Pull to refresh
  pullToRefresh: true,
};
```

#### 5. Responsive Vendor Card
```tsx
<div className="group relative bg-white rounded-xl shadow-sm 
                hover:shadow-lg transition-all duration-300
                overflow-hidden">
  {/* Image - Aspect ratio maintained */}
  <div className="relative aspect-[4/3] sm:aspect-[3/2]">
    <ImageCarousel images={vendor.images} />
    <button className="absolute top-2 right-2 p-2 bg-white/80 rounded-full">
      <HeartIcon />
    </button>
    {vendor.isFeatured && (
      <Badge className="absolute top-2 left-2">Featured</Badge>
    )}
  </div>
  
  {/* Content - Responsive padding */}
  <div className="p-3 sm:p-4">
    {/* Category badges - Wrap on mobile */}
    <div className="flex flex-wrap gap-1 mb-2">
      {vendor.serviceTypes.slice(0, 3).map(type => (
        <Chip size="sm" key={type}>{type}</Chip>
      ))}
      {vendor.serviceTypes.length > 3 && (
        <Chip size="sm">+{vendor.serviceTypes.length - 3}</Chip>
      )}
    </div>
    
    <h3 className="font-semibold text-base sm:text-lg line-clamp-1">
      {vendor.businessName}
    </h3>
    
    <p className="text-sm text-gray-500 flex items-center gap-1">
      <MapPinIcon className="w-4 h-4" />
      {vendor.location.city}
    </p>
    
    {/* Rating & Price - Stack on small mobile */}
    <div className="flex flex-col xs:flex-row xs:items-center 
                    xs:justify-between gap-1 mt-2">
      <div className="flex items-center gap-1">
        <StarIcon className="w-4 h-4 text-yellow-500" />
        <span className="font-medium">{vendor.rating}</span>
        <span className="text-gray-400 text-sm">({vendor.reviewCount})</span>
      </div>
      <span className="text-primary font-semibold text-sm sm:text-base">
        From ₱{vendor.priceMin.toLocaleString()}
      </span>
    </div>
    
    {/* Match Score */}
    {matchScore && (
      <div className="mt-2 pt-2 border-t">
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-gray-100 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full"
              style={{ width: `${matchScore}%` }}
            />
          </div>
          <span className="text-sm font-medium text-primary">
            {matchScore}% Match
          </span>
        </div>
      </div>
    )}
  </div>
</div>
```

---

/packages
  /{packageId}
    - providerId: string
    - serviceId: string (links to providerServices)
    - name: string (e.g., "Silver Package", "Gold Package")
    - description: string
    - price: number
    - inclusions: array of strings
    - isPopular: boolean (highlight as recommended)
    - isActive: boolean
    - order: number
    - createdAt: timestamp

/reviews
  /{reviewId}
    - odId: string
    - odName: string
    - providerId: string
    - rating: number (1-5)
    - title: string
    - content: string
    - createdAt: timestamp

/favorites
  /{odId}
    - odId: string
    - providerId: string
    - createdAt: timestamp

/inquiries
  /{inquiryId}
    - odId: string
    - odEmail: string
    - odName: string
    - providerId: string
    - subject: string
    - message: string
    - eventDate: timestamp
    - guestCount: number
    - budget: number
    - status: "new" | "responded" | "closed"
    - createdAt: timestamp

/checklist
  /{checklistId}
    - odId: string
    - title: string
    - dueDate: timestamp
    - isCompleted: boolean
    - category: string
    - createdAt: timestamp

/budgetItems
  /{budgetItemId}
    - odId: string
    - category: string
    - description: string
    - estimatedCost: number
    - actualCost: number
    - isPaid: boolean
    - createdAt: timestamp
```

---

## 📂 Project File Structure (Next.js App Router)

```
wedding-bazaar/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── forgot-password/
│   │   │       └── page.tsx
│   │   ├── (main)/
│   │   │   ├── layout.tsx              # Public layout
│   │   │   ├── page.tsx                # Landing page
│   │   │   ├── vendors/
│   │   │   │   ├── page.tsx            # Browse vendors
│   │   │   │   ├── compare/
│   │   │   │   │   └── page.tsx        # Comparison tool
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx        # Vendor detail
│   │   │   ├── quiz/
│   │   │   │   └── page.tsx            # Wedding style quiz
│   │   │   └── categories/
│   │   │       └── [slug]/
│   │   │           └── page.tsx        # Category vendors
│   │   ├── couple/
│   │   │   ├── layout.tsx              # Dashboard layout
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── planning/
│   │   │   │   └── page.tsx            # Intelligent wedding planning
│   │   │   ├── discover/
│   │   │   │   └── page.tsx            # Smart vendor finder
│   │   │   ├── recommendations/
│   │   │   │   └── page.tsx            # AI recommendations
│   │   │   ├── favorites/
│   │   │   │   └── page.tsx
│   │   │   ├── compare/
│   │   │   │   └── page.tsx            # Compare saved vendors
│   │   │   ├── bookings/
│   │   │   │   ├── page.tsx            # My bookings list
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx        # Booking details
│   │   │   ├── inquiries/
│   │   │   │   └── page.tsx
│   │   │   ├── checklist/
│   │   │   │   └── page.tsx
│   │   │   ├── budget/
│   │   │   │   └── page.tsx
│   │   │   └── settings/
│   │   │       └── page.tsx
│   │   ├── provider/
│   │   │   ├── layout.tsx              # Dashboard layout
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── profile/
│   │   │   │   └── page.tsx
│   │   │   ├── team/
│   │   │   │   └── page.tsx            # Team management
│   │   │   ├── services/
│   │   │   │   └── page.tsx
│   │   │   ├── packages/
│   │   │   │   └── page.tsx            # Package management
│   │   │   ├── calendar/
│   │   │   │   └── page.tsx            # Availability calendar
│   │   │   ├── bookings/
│   │   │   │   ├── page.tsx            # Booking management
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx        # Booking details
│   │   │   ├── distance-pricing/
│   │   │   │   └── page.tsx            # Distance-based pricing setup
│   │   │   ├── inquiries/
│   │   │   │   └── page.tsx
│   │   │   ├── analytics/
│   │   │   │   └── page.tsx            # Performance analytics
│   │   │   ├── reviews/
│   │   │   │   └── page.tsx
│   │   │   └── settings/
│   │   │       └── page.tsx
│   │   ├── admin/
│   │   │   ├── layout.tsx              # Dashboard layout
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── users/
│   │   │   │   └── page.tsx
│   │   │   ├── providers/
│   │   │   │   └── page.tsx
│   │   │   ├── bookings/
│   │   │   │   ├── page.tsx            # All bookings overview
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx        # Booking details
│   │   │   ├── analytics/
│   │   │   │   └── page.tsx            # Heatmaps & analytics
│   │   │   ├── categories/
│   │   │   │   ├── page.tsx            # Category listing & management
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx        # Add new category
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx        # Edit category & subcategories
│   │   │   ├── seed/
│   │   │   │   └── page.tsx            # Database seeding (one-time)
│   │   │   ├── reviews/
│   │   │   │   └── page.tsx
│   │   │   ├── settings/               # Platform Settings (Dynamic Config)
│   │   │   │   ├── page.tsx            # Settings overview/dashboard
│   │   │   │   ├── platform/
│   │   │   │   │   └── page.tsx        # Site name, logo, contact info
│   │   │   │   ├── validation/
│   │   │   │   │   └── page.tsx        # Guest/budget/image limits
│   │   │   │   ├── payment/
│   │   │   │   │   └── page.tsx        # Payment methods, fees, currency
│   │   │   │   ├── refund/
│   │   │   │   │   └── page.tsx        # Refund policy tiers
│   │   │   │   ├── budget/
│   │   │   │   │   └── page.tsx        # Default budget allocations
│   │   │   │   ├── distance/
│   │   │   │   │   └── page.tsx        # Distance pricing defaults
│   │   │   │   └── id-prefixes/
│   │   │   │       └── page.tsx        # Configure ID prefixes
│   │   │   ├── content/                # Landing Page Content (CMS)
│   │   │   │   ├── page.tsx            # Content overview
│   │   │   │   ├── hero/
│   │   │   │   │   └── page.tsx        # Edit hero section
│   │   │   │   ├── stats/
│   │   │   │   │   └── page.tsx        # Edit statistics
│   │   │   │   ├── how-it-works/
│   │   │   │   │   └── page.tsx        # Edit how it works steps
│   │   │   │   ├── cta/
│   │   │   │   │   └── page.tsx        # Edit call-to-action
│   │   │   │   ├── testimonials/
│   │   │   │   │   └── page.tsx        # CRUD testimonials
│   │   │   │   └── faqs/
│   │   │   │       └── page.tsx        # CRUD FAQs by category
│   │   │   ├── wedding-styles/
│   │   │   │   └── page.tsx            # CRUD wedding style options
│   │   │   ├── quiz/
│   │   │   │   └── page.tsx            # CRUD quiz questions
│   │   │   └── quick-replies/
│   │   │       └── page.tsx            # CRUD quick reply templates
│   │   ├── api/
│   │   │   ├── contact/
│   │   │   │   └── route.ts            # Contact form API
│   │   │   ├── payments/
│   │   │   │   ├── create-intent/
│   │   │   │   │   └── route.ts        # Create PayMongo payment intent
│   │   │   │   ├── refund/
│   │   │   │   │   └── route.ts        # Process refunds
│   │   │   │   └── webhook/
│   │   │   │       └── route.ts        # PayMongo webhook handler
│   │   │   └── geocode/
│   │   │       └── route.ts            # Geocoding proxy (rate limiting)
│   │   ├── layout.tsx                  # Root layout
│   │   ├── providers.tsx               # NextUI + Auth providers
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                         # Reusable UI components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ThemeSwitcher.tsx
│   │   │   ├── Logo.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   ├── Calendar/
│   │   │   │   ├── AvailabilityCalendar.tsx    # Full calendar view
│   │   │   │   ├── DatePickerInput.tsx         # Styled date picker
│   │   │   │   ├── DateRangePicker.tsx         # Date range selection
│   │   │   │   └── MiniCalendar.tsx            # Compact calendar widget
│   │   │   ├── Gallery/
│   │   │   │   ├── ImageGallery.tsx            # Lightbox gallery
│   │   │   │   ├── ImageUploader.tsx           # Drag & drop upload
│   │   │   │   ├── ImageCarousel.tsx           # Embla carousel
│   │   │   │   └── ImageGrid.tsx               # Masonry/grid layout
│   │   │   ├── Forms/
│   │   │   │   ├── MultiSelect.tsx             # Multi-select dropdown
│   │   │   │   ├── PriceInput.tsx              # Currency input
│   │   │   │   ├── RichTextEditor.tsx          # Description editor
│   │   │   │   └── FileUpload.tsx              # Dropzone wrapper
│   │   │   └── Charts/
│   │   │       ├── StatsChart.tsx              # Line/bar charts
│   │   │       ├── PieChart.tsx                # Category breakdown
│   │   │       └── ProgressBar.tsx             # Budget progress
│   │   ├── mapping/                        # Location & Maps
│   │   │   ├── VenueLocationPicker.tsx         # Interactive map picker
│   │   │   ├── DistancePreview.tsx             # Distance calculation display
│   │   │   ├── RouteMap.tsx                    # Show route on map
│   │   │   └── LocationSearchInput.tsx         # Address autocomplete
│   │   ├── payment/                        # Payment Components
│   │   │   ├── PaymentModal.tsx                # Payment method selection
│   │   │   ├── PriceBreakdown.tsx              # Base + distance fee display
│   │   │   ├── RefundCalculator.tsx            # Show refund amount
│   │   │   ├── PaymentHistory.tsx              # Transaction list
│   │   │   └── RefundPolicyInfo.tsx            # Cancellation policy display
│   │   ├── id-tags/                        # ID Tag Components
│   │   │   ├── IdTag.tsx                       # Inline ID badge
│   │   │   ├── VendorIdCard.tsx                # Full ID card design
│   │   │   ├── CoupleIdCard.tsx                # Couple ID card
│   │   │   ├── BookingIdTag.tsx                # Booking reference tag
│   │   │   └── VerificationBadge.tsx           # Verified/Premium badges
│   │   ├── booking/                        # Booking Components
│   │   │   ├── BookingForm.tsx                 # Complete booking form
│   │   │   ├── BookingCard.tsx                 # Booking summary card
│   │   │   ├── BookingCalendar.tsx             # Realtime availability
│   │   │   ├── BookingTimeline.tsx             # Status timeline
│   │   │   ├── CancellationModal.tsx           # Cancel with refund preview
│   │   │   └── CapacityIndicator.tsx           # Slots remaining display
│   │   ├── planning/                       # Intelligent Planning
│   │   │   ├── IntelligentPlanning.tsx         # Main planning dashboard
│   │   │   ├── SmartBudgetAllocation.tsx       # AI budget breakdown
│   │   │   ├── VendorRecommendationCard.tsx    # AI vendor suggestions
│   │   │   ├── PlanningProgress.tsx            # Overall progress tracker
│   │   │   └── TimelinePhase.tsx               # Wedding timeline phases
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   ├── ForgotPasswordForm.tsx
│   │   │   └── AuthGuard.tsx
│   │   ├── landing/
│   │   │   ├── Hero.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── FeaturedVendors.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── Stats.tsx
│   │   │   ├── CTA.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── vendor/
│   │   │   ├── VendorCard.tsx
│   │   │   ├── VendorGrid.tsx
│   │   │   ├── VendorFilters.tsx
│   │   │   ├── VendorDetail.tsx
│   │   │   ├── VendorServices.tsx              # Multi-service display
│   │   │   ├── VendorPackages.tsx              # Package comparison
│   │   │   ├── VendorGallery.tsx               # Portfolio gallery
│   │   │   ├── VendorReviews.tsx               # Reviews section
│   │   │   └── VendorAvailability.tsx          # Availability calendar
│   │   ├── decision-support/                   # Decision Support System
│   │   │   ├── SmartSearch.tsx                 # Advanced search with filters
│   │   │   ├── WeddingStyleQuiz.tsx            # Onboarding quiz
│   │   │   ├── VendorComparison.tsx            # Side-by-side comparison
│   │   │   ├── MatchScoreBadge.tsx             # Match percentage display
│   │   │   ├── RecommendationCard.tsx          # Smart recommendations
│   │   │   ├── FilterPanel.tsx                 # Responsive filter panel
│   │   │   ├── QuickFilters.tsx                # Common filter shortcuts
│   │   │   └── RecentlyViewed.tsx              # Recently viewed vendors
│   │   ├── provider/
│   │   │   ├── ServiceManager.tsx              # CRUD for services
│   │   │   ├── PackageManager.tsx              # CRUD for packages
│   │   │   ├── AvailabilityManager.tsx         # Calendar management
│   │   │   ├── GalleryManager.tsx              # Image management
│   │   │   ├── InquiryCard.tsx                 # Inquiry display
│   │   │   ├── TeamManager.tsx                 # Team members CRUD
│   │   │   ├── AnalyticsDashboard.tsx          # Performance insights
│   │   │   ├── InquiryPipeline.tsx             # Kanban-style inquiry tracking
│   │   │   ├── QuickReplyTemplates.tsx         # Message templates
│   │   │   └── PerformanceTips.tsx             # Improvement suggestions
│   │   ├── mobile/                             # Mobile-specific components
│   │   │   ├── BottomNavigation.tsx            # Mobile bottom nav
│   │   │   ├── MobileFilters.tsx               # Slide-up filter sheet
│   │   │   ├── SwipeableCard.tsx               # Swipe actions
│   │   │   └── PullToRefresh.tsx               # Pull to refresh wrapper
│   │   └── dashboard/
│   │       ├── Sidebar.tsx
│   │       ├── DashboardHeader.tsx
│   │       ├── StatsCard.tsx
│   │       ├── DataTable.tsx
│   │       ├── ResponsiveDataView.tsx          # Table on desktop, cards on mobile
│   │       ├── RecentActivity.tsx
│   │       └── QuickActions.tsx
│   │   ├── admin/                          # Admin-specific components
│   │   │   ├── CategoryForm.tsx                # Add/Edit category form
│   │   │   ├── CategoryList.tsx                # Category table with actions
│   │   │   ├── SubcategoryManager.tsx          # CRUD for subcategories
│   │   │   ├── CategoryOrderManager.tsx        # Drag & drop reordering
│   │   │   ├── SeedButton.tsx                  # Database seeding component
│   │   │   ├── IconPicker.tsx                  # Category icon selection
│   │   │   ├── settings/                       # Settings Management
│   │   │   │   ├── PlatformSettingsForm.tsx    # Site info editor
│   │   │   │   ├── ValidationLimitsForm.tsx    # Limits editor
│   │   │   │   ├── PaymentSettingsForm.tsx     # Payment config editor
│   │   │   │   ├── RefundPolicyForm.tsx        # Refund tiers editor
│   │   │   │   ├── BudgetAllocationForm.tsx    # Budget defaults editor
│   │   │   │   ├── DistancePricingForm.tsx     # Distance pricing editor
│   │   │   │   └── IdPrefixForm.tsx            # ID prefix config
│   │   │   ├── content/                        # Content Management
│   │   │   │   ├── HeroEditor.tsx              # Landing hero editor
│   │   │   │   ├── StatsEditor.tsx             # Statistics editor
│   │   │   │   ├── HowItWorksEditor.tsx        # Steps editor
│   │   │   │   ├── CTAEditor.tsx               # CTA section editor
│   │   │   │   ├── TestimonialsManager.tsx     # CRUD testimonials
│   │   │   │   ├── FAQsManager.tsx             # CRUD FAQs
│   │   │   │   ├── WeddingStylesManager.tsx    # CRUD wedding styles
│   │   │   │   ├── QuizQuestionsManager.tsx    # CRUD quiz questions
│   │   │   │   └── QuickRepliesManager.tsx     # CRUD reply templates
│   │   │   ├── analytics/                      # Admin Analytics
│   │   │   │   ├── LocationHeatmap.tsx         # Booking location heatmap
│   │   │   │   ├── TimeHeatmap.tsx             # Peak booking times
│   │   │   │   ├── CategoryHeatmap.tsx         # Category performance
│   │   │   │   ├── RevenueByRegionChart.tsx    # Regional revenue
│   │   │   │   └── AnalyticsSummary.tsx        # Stats overview cards
│   │   │   └── bookings/                       # Admin Booking Management
│   │   │       ├── BookingsTable.tsx           # All bookings table
│   │   │       ├── BookingDetailView.tsx       # Full booking details
│   │   │       └── RefundApproval.tsx          # Process refund requests
│   ├── lib/
│   │   ├── firebase/
│   │   │   ├── config.ts               # Firebase config
│   │   │   ├── auth.ts                 # Auth utilities
│   │   │   ├── firestore.ts            # Firestore utilities
│   │   │   ├── storage.ts              # Storage utilities
│   │   │   ├── seedCategories.ts       # Category seeding script
│   │   │   └── seedSettings.ts         # Settings & content seeding
│   │   ├── settings/                   # Dynamic Settings Management
│   │   │   ├── settingsService.ts      # CRUD for settings
│   │   │   ├── contentService.ts       # CRUD for landing content
│   │   │   └── urlUtils.ts             # URL/path utilities for hosting
│   │   ├── booking/                    # Booking System
│   │   │   ├── bookingService.ts       # Create/manage bookings
│   │   │   ├── availabilityCheck.ts    # Realtime availability
│   │   │   └── idGenerator.ts          # Generate unique IDs
│   │   ├── payment/                    # Payment Processing
│   │   │   ├── paymongo.ts             # PayMongo API client
│   │   │   ├── refundService.ts        # Refund calculations
│   │   │   └── refundPolicy.ts         # Policy configuration
│   │   ├── mapping/                    # Location Services
│   │   │   ├── distanceService.ts      # Distance calculations
│   │   │   ├── geocoding.ts            # Address to coordinates
│   │   │   └── pricingCalculator.ts    # Distance-based pricing
│   │   ├── planning/                   # Intelligent Planning
│   │   │   ├── budgetAllocator.ts      # Smart budget distribution
│   │   │   ├── vendorRecommender.ts    # AI recommendations
│   │   │   └── timelineGenerator.ts    # Wedding timeline
│   │   ├── validation/                 # Form Validation
│   │   │   ├── schemas.ts              # Zod validation schemas
│   │   │   └── limits.ts               # Guest count, budget limits
│   │   ├── analytics/                  # Analytics & Heatmaps
│   │   │   ├── heatmapData.ts          # Generate heatmap data
│   │   │   └── adminStats.ts           # Admin dashboard stats
│   │   ├── matching/                   # Decision support algorithms
│   │   │   ├── matchScore.ts           # Vendor match calculation
│   │   │   ├── recommendations.ts       # Recommendation engine
│   │   │   └── quizResults.ts          # Quiz result processing
│   │   └── utils.ts                    # Helper functions
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useFirestore.ts
│   │   ├── useStorage.ts
│   │   ├── useCategories.ts            # Fetch categories from Firestore
│   │   ├── useSubcategories.ts         # Fetch subcategories by category
│   │   ├── useBookings.ts              # Manage bookings
│   │   ├── useAvailability.ts          # Check provider availability
│   │   ├── useDistance.ts              # Calculate distance & pricing
│   │   ├── useSmartBudget.ts           # Intelligent budget allocation
│   │   ├── useAdminAnalytics.ts        # Admin heatmap data
│   │   ├── useMatchScore.ts            # Match score calculation
│   │   ├── useRecommendations.ts       # Get recommendations
│   │   ├── useComparison.ts            # Comparison tool state
│   │   ├── useResponsive.ts            # Screen size detection
│   │   ├── usePlatformSettings.ts      # Site name, logo, contact info
│   │   ├── useValidationLimits.ts      # Guest/budget/image limits
│   │   ├── usePaymentMethods.ts        # Available payment methods
│   │   ├── useRefundPolicies.ts        # Refund policy tiers
│   │   ├── useBudgetAllocation.ts      # Default budget percentages
│   │   ├── useWeddingStyles.ts         # Wedding style options
│   │   ├── useQuizQuestions.ts         # Quiz questions for couples
│   │   ├── useLandingContent.ts        # Hero, stats, how it works
│   │   ├── useTestimonials.ts          # Customer testimonials
│   │   ├── useFAQs.ts                  # FAQ by category
│   │   └── useQuickReplyTemplates.ts   # Vendor quick replies
│   ├── types/
│   │   └── index.ts                    # TypeScript types
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   └── ComparisonContext.tsx       # Comparison state
│   └── constants/
│       └── index.ts                    # App constants (no static categories - from DB)
├── public/
│   ├── images/
│   │   ├── hero-bg.jpg
│   │   └── ...
│   └── icons/
├── .env.local                          # Firebase config (NOT committed)
├── .env.example                        # Example env file
├── next.config.js
├── tailwind.config.ts
├── package.json
└── tsconfig.json
```

---

## 🚀 Implementation Phases

### Phase 1: Project Setup & Landing Page (Week 1)
**Goal: Foundation and beautiful responsive landing page with dynamic content**

#### Tasks:
- [ ] Initialize Next.js project with TypeScript
- [ ] Install and configure NextUI v2
- [ ] Configure Tailwind CSS with custom theme
- [ ] Set up project structure
- [ ] Create Firebase project (free tier)
- [ ] Configure Firebase in Next.js (.env.local)
- [ ] **Seed categories & subcategories to Firestore**
- [ ] **Seed initial settings & content to Firestore:**
  - [ ] Platform settings (site name, logo, contact info)
  - [ ] Validation limits (guest count, budget, images)
  - [ ] Payment settings (methods, fees)
  - [ ] Refund policy tiers
  - [ ] Default budget allocations
  - [ ] Distance pricing defaults
  - [ ] ID prefixes
  - [ ] Wedding styles
  - [ ] Quiz questions
  - [ ] Sample testimonials
  - [ ] Sample FAQs
  - [ ] Landing page content (hero, stats, how it works, CTA)
- [ ] Build landing page components (with dynamic content from DB):
  - [ ] Responsive Navbar with NextUI (mobile hamburger menu)
  - [ ] Hero section with animations (content from DB)
  - [ ] Services/Categories section (categories from DB)
  - [ ] Featured Vendors section (carousel on mobile)
  - [ ] How It Works section (steps from DB)
  - [ ] Testimonials carousel (testimonials from DB)
  - [ ] Stats counter section (stats from DB)
  - [ ] CTA section (content from DB)
  - [ ] FAQs section (FAQs from DB)
  - [ ] Contact section with EmailJS
  - [ ] Footer (responsive columns)
  - [ ] Mobile bottom navigation
- [ ] Implement dark/light theme toggle
- [ ] Full mobile responsiveness testing

#### Deliverables:
- Fully styled responsive landing page
- Project structure ready
- Firebase connected with categories seeded
- **All initial settings & content seeded to database**
- **Landing page fetching dynamic content from Firestore**

---

### Phase 2: Authentication System (Week 2)
**Goal: Complete auth flow with role selection**

#### Tasks:
- [ ] Create AuthContext for state management
- [ ] Login page with NextUI components
- [ ] Register page with role selection (Couple/Provider)
- [ ] Forgot password page
- [ ] Email/Password authentication
- [ ] Google OAuth authentication
- [ ] Email verification flow
- [ ] Protected route middleware
- [ ] User profile creation in Firestore
- [ ] Auth state persistence
- [ ] Logout functionality
- [ ] Role-based redirects after login

#### Deliverables:
- Working authentication system
- Role-based user creation
- Protected routes

---

### Phase 3: Couple Dashboard (Week 3-4)
**Goal: Complete couple experience with enhanced UI**

#### Tasks:
- [ ] Dashboard layout with NextUI sidebar
- [ ] Dashboard home with overview:
  - [ ] Wedding countdown widget
  - [ ] Budget summary chart
  - [ ] Checklist progress
  - [ ] Recent favorites
  - [ ] Upcoming tasks
- [ ] Browse vendors page:
  - [ ] Vendor cards with NextUI (image carousel)
  - [ ] Multi-select category filters
  - [ ] Service type filters
  - [ ] Location/price filters
  - [ ] Search functionality
  - [ ] Pagination (limit 12 per page)
- [ ] Vendor detail page:
  - [ ] Hero with image gallery (lightbox)
  - [ ] **Multi-service tabs** (Photography, Coordination, etc.)
  - [ ] Package comparison cards
  - [ ] **Availability calendar view**
  - [ ] Reviews section
  - [ ] Inquiry modal with date picker
- [ ] Favorites system (add/remove with animation)
- [ ] My inquiries list with status badges
- [ ] **Wedding Checklist:**
  - [ ] Categorized tasks
  - [ ] Due date with calendar picker
  - [ ] Progress tracking
  - [ ] Drag & drop reorder
- [ ] **Budget Planner:**
  - [ ] Category-based budgeting
  - [ ] Visual progress bars
  - [ ] Pie chart breakdown
  - [ ] Estimated vs actual tracking
  - [ ] Payment status
- [ ] Wedding details settings (date picker, venue)
- [ ] Account settings

#### Deliverables:
- Complete couple dashboard with polished UI
- Enhanced vendor discovery
- Visual planning tools

---

### Phase 4: Service Provider Dashboard (Week 5-6)
**Goal: Complete vendor management with multi-service support**

#### Tasks:
- [ ] Provider registration flow (pending approval)
- [ ] Provider dashboard layout
- [ ] Dashboard home with stats (inquiries, views, reviews)
- [ ] Business profile management:
  - [ ] Basic info editing (business name, tagline, bio)
  - [ ] Cover image & profile photo upload
  - [ ] Gallery management (drag & drop, reorder, delete)
  - [ ] Location and contact info
  - [ ] Social media links
- [ ] **Multi-Service Management:**
  - [ ] Add multiple service types (photography, coordination, etc.)
  - [ ] Each service with own pricing, description, images
  - [ ] Enable/disable specific services
  - [ ] Reorder services display
- [ ] **Package Management:**
  - [ ] Create packages per service type
  - [ ] Package comparison display
  - [ ] Mark popular/recommended packages
- [ ] **Availability Calendar:**
  - [ ] Visual calendar (month/week view)
  - [ ] Mark dates as available/booked/blocked
  - [ ] View booking details on calendar
  - [ ] Quick date blocking
- [ ] Inquiry management:
  - [ ] View inquiries list with filters
  - [ ] Mark as read/responded/closed
  - [ ] Reply via mailto link
  - [ ] Inquiry details modal
- [ ] Review management (view & respond)
- [ ] Settings page

#### Deliverables:
- Complete provider dashboard
- Multi-service management
- Visual availability calendar
- Inquiry workflow

---

### Phase 5: Admin Dashboard (Week 7-8)
**Goal: Platform management with dynamic settings & CMS**

#### Tasks:
- [ ] Admin dashboard layout
- [ ] Overview dashboard with stats
- [ ] User management:
  - [ ] List all users with pagination
  - [ ] Filter by role
  - [ ] View user details
  - [ ] Suspend/activate users
- [ ] Provider management:
  - [ ] Pending approvals list
  - [ ] Approve/reject providers
  - [ ] Feature/unfeature providers
  - [ ] View provider details
- [ ] Category management (CRUD)
- [ ] Review moderation (delete inappropriate)
- [ ] Inquiry overview
- [ ] **Settings Management (Dynamic Config):**
  - [ ] Platform settings (site name, logo, contact)
  - [ ] Validation limits (guest count, budget, images)
  - [ ] Payment settings (methods, fees, currency)
  - [ ] Refund policy tiers editor
  - [ ] Default budget allocation editor
  - [ ] Distance pricing defaults
  - [ ] ID prefix configuration
- [ ] **Content Management (CMS):**
  - [ ] Hero section editor
  - [ ] Statistics editor (couples helped, vendors, etc.)
  - [ ] How It Works steps editor
  - [ ] CTA section editor
  - [ ] Testimonials CRUD
  - [ ] FAQs CRUD (by category)
  - [ ] Wedding styles CRUD
  - [ ] Quiz questions CRUD
  - [ ] Quick reply templates CRUD

#### Deliverables:
- Complete admin control panel
- User & provider management
- Content moderation
- **Dynamic settings panel (no hardcoded data)**
- **Landing page CMS**

---

### Phase 6: Reviews & Public Pages (Week 9)
**Goal: Trust building features**

#### Tasks:
- [ ] Review submission form (couples only)
- [ ] Star rating component
- [ ] Review display on vendor pages
- [ ] Vendor response to reviews
- [ ] Public vendor listing pages (SEO)
- [ ] Category browse pages
- [ ] Search functionality
- [ ] SEO optimization (meta tags, OG images)
- [ ] Sitemap generation

#### Deliverables:
- Review system
- SEO-optimized public pages

---

### Phase 7: Polish & Optimization (Week 10)
**Goal: Production ready**

#### Tasks:
- [ ] Performance optimization
- [ ] Image optimization with Next.js Image
- [ ] Lazy loading implementation
- [ ] Error boundaries and fallbacks
- [ ] Loading states with NextUI skeletons
- [ ] Form validations with react-hook-form
- [ ] Toast notifications
- [ ] Mobile responsiveness polish
- [ ] Accessibility improvements (a11y)
- [ ] Firebase security rules finalization

#### Deliverables:
- Optimized application
- Polished UI/UX

---

### Phase 8: Testing & Deployment (Week 11)
**Goal: Live application**

#### Tasks:
- [ ] Manual testing all user flows
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Fix bugs and issues
- [ ] Environment setup (production Firebase)
- [ ] Deploy to Vercel
- [ ] Configure custom domain (optional)
- [ ] Final security rules review
- [ ] Create user documentation

#### Deliverables:
- Live deployed application
- Documentation

---

## 🎨 Design System (NextUI + Tailwind)

### Color Palette
```typescript
// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdf8e8',
          100: '#f9efc5',
          200: '#f3df8a',
          300: '#ecc94b',
          400: '#e5b824',
          500: '#D4AF37', // Primary gold
          600: '#b8941f',
          700: '#8f6f17',
          800: '#6b4f14',
          900: '#4a3410',
        },
        navy: {
          50: '#e8e8ec',
          100: '#b9b9c5',
          200: '#8a8a9e',
          300: '#5b5b77',
          400: '#3d3d5c',
          500: '#1a1a2e', // Primary navy
          600: '#151528',
          700: '#101020',
          800: '#0b0b18',
          900: '#060610',
        },
      },
    },
  },
};
```

### Typography
```typescript
// Google Fonts in layout.tsx
import { Playfair_Display, Poppins } from 'next/font/google';

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
});

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
});
```

### NextUI Theme Configuration
```typescript
// tailwind.config.ts
import { nextui } from "@nextui-org/react";

export default {
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              50: '#fdf8e8',
              100: '#f9efc5',
              200: '#f3df8a',
              300: '#ecc94b',
              400: '#e5b824',
              500: '#D4AF37',
              600: '#b8941f',
              700: '#8f6f17',
              800: '#6b4f14',
              900: '#4a3410',
              DEFAULT: '#D4AF37',
              foreground: '#000000',
            },
            secondary: {
              DEFAULT: '#1a1a2e',
              foreground: '#ffffff',
            },
          },
        },
        dark: {
          colors: {
            primary: {
              50: '#fdf8e8',
              100: '#f9efc5',
              200: '#f3df8a',
              300: '#ecc94b',
              400: '#e5b824',
              500: '#D4AF37',
              600: '#b8941f',
              700: '#8f6f17',
              800: '#6b4f14',
              900: '#4a3410',
              DEFAULT: '#D4AF37',
              foreground: '#000000',
            },
          },
        },
      },
    }),
  ],
};
```

---

## 🔐 Firebase Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper functions
    function isAuthenticated() {
      return request.auth != null;
    }
    
    function isAdmin() {
      return isAuthenticated() && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    function isOwner(odId) {
      return isAuthenticated() && request.auth.uid == odId;
    }
    
    function isProvider() {
      return isAuthenticated() && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'provider';
    }
    
    // Users collection
    match /users/{odId} {
      allow read: if isAuthenticated();
      allow create: if isAuthenticated() && request.auth.uid == odId;
      allow update: if isOwner(odId) || isAdmin();
      allow delete: if isAdmin();
    }
    
    // Couples collection
    match /couples/{coupleId} {
      allow read: if isAuthenticated() && 
        (resource.data.odId == request.auth.uid || isAdmin());
      allow create: if isAuthenticated();
      allow update: if isAuthenticated() && 
        (resource.data.odId == request.auth.uid || isAdmin());
      allow delete: if isAdmin();
    }
    
    // Providers collection - public read for browsing
    match /providers/{providerId} {
      allow read: if true;
      allow create: if isAuthenticated();
      allow update: if isAuthenticated() && 
        (resource.data.odId == request.auth.uid || isAdmin());
      allow delete: if isAdmin();
    }
    
    // Categories - public read, admin only write
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if isAdmin();
    }
    
    // Services - public read
    match /services/{serviceId} {
      allow read: if true;
      allow create: if isProvider();
      allow update, delete: if isAuthenticated() && 
        get(/databases/$(database)/documents/providers/$(resource.data.providerId)).data.odId == request.auth.uid;
    }
    
    // Reviews - public read
    match /reviews/{reviewId} {
      allow read: if true;
      allow create: if isAuthenticated();
      allow update: if isOwner(resource.data.odId) || isAdmin();
      allow delete: if isAdmin();
    }
    
    // Favorites - owner only
    match /favorites/{favoriteId} {
      allow read, write: if isAuthenticated() && 
        (resource.data.odId == request.auth.uid || request.auth.uid == request.resource.data.odId);
    }
    
    // Inquiries - participants and admin
    match /inquiries/{inquiryId} {
      allow read: if isAuthenticated() && 
        (resource.data.odId == request.auth.uid || 
         get(/databases/$(database)/documents/providers/$(resource.data.providerId)).data.odId == request.auth.uid ||
         isAdmin());
      allow create: if isAuthenticated();
      allow update: if isAuthenticated();
      allow delete: if isAdmin();
    }
    
    // Checklist - owner only
    match /checklist/{checklistId} {
      allow read, write: if isAuthenticated() && 
        (resource.data.odId == request.auth.uid || request.auth.uid == request.resource.data.odId);
    }
    
    // Budget items - owner only
    match /budgetItems/{budgetItemId} {
      allow read, write: if isAuthenticated() && 
        (resource.data.odId == request.auth.uid || request.auth.uid == request.resource.data.odId);
    }
    
    // Bookings - couple, provider, and admin
    match /bookings/{bookingId} {
      allow read: if isAuthenticated() && 
        (resource.data.coupleId == request.auth.uid || 
         get(/databases/$(database)/documents/providers/$(resource.data.providerId)).data.odId == request.auth.uid ||
         isAdmin());
      allow create: if isAuthenticated();
      allow update: if isAuthenticated() && 
        (resource.data.coupleId == request.auth.uid || 
         get(/databases/$(database)/documents/providers/$(resource.data.providerId)).data.odId == request.auth.uid ||
         isAdmin());
      allow delete: if isAdmin();
    }
    
    // Counters (for ID generation) - authenticated users can increment
    match /counters/{counterId} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated();
    }
  }
}
```

---

## 📧 Email Strategy (Free Tier)

### EmailJS Integration (Recommended)
- **200 emails/month free** - sufficient for contact forms
- Client-side, no server needed
- Easy setup

```typescript
// Example usage
import emailjs from '@emailjs/browser';

emailjs.send(
  'service_id',
  'template_id',
  {
    to_email: vendor.email,
    from_name: couple.name,
    message: inquiryMessage,
  },
  'public_key'
);
```

### Mailto Links for Direct Contact
```typescript
// For vendor contact
const mailtoLink = `mailto:${vendor.email}?subject=Wedding Inquiry&body=Hi, I'm interested in your services...`;
```

---

## ⚠️ Free Tier Optimizations

### Reduce Firestore Reads:
1. **Pagination** - Load 12 items per page max
2. **Caching** - Use SWR with stale-while-revalidate
3. **Denormalization** - Store computed data (rating avg, review count) on provider doc
4. **Index queries** - Create proper Firestore indexes

### Reduce Storage Usage:
1. **Image Compression** - Compress to < 500KB before upload
2. **Image Limits** - Max 10 images per provider
3. **Size Limits** - Max 2MB per image, reject larger
4. **Use external URLs** - Allow linking to existing images

### Code-Level Optimizations:
```typescript
// Use pagination
const vendorsQuery = query(
  collection(db, 'providers'),
  where('status', '==', 'approved'),
  orderBy('rating', 'desc'),
  limit(12)
);

// Use SWR for caching
const { data, error, isLoading } = useSWR(
  'providers',
  fetcher,
  { revalidateOnFocus: false }
);
```

---

## ✅ Features Included (Free Tier Compatible)

| Feature | Status | Notes |
|---------|--------|-------|
| **Authentication** | | |
| Email/Password Auth | ✅ | Unlimited |
| Google OAuth | ✅ | Unlimited |
| Forgot Password | ✅ | Firebase built-in |
| User Roles (3 types) | ✅ | Admin, Couple, Provider |
| | | |
| **Booking System** | | |
| Realtime Booking | ✅ | Firestore transactions prevent double-booking |
| Capacity per Day | ✅ | Configurable max bookings per vendor |
| Distance-Based Pricing | ✅ | OpenRouteService API (free 2K/day) |
| Interactive Maps | ✅ | Leaflet + OpenStreetMap (free) |
| | | |
| **Payment (PayMongo)** | | |
| Credit/Debit Cards | ✅ | Via PayMongo Sandbox |
| GCash, GrabPay, Maya | ✅ | E-wallet payments |
| Refund System | ✅ | Automatic calculation based on policy |
| Payment History | ✅ | Track all transactions |
| | | |
| **Service Providers** | | |
| Multi-Service Providers | ✅ | Photography, Coordination, etc. per vendor |
| Package Management | ✅ | Multiple packages per service |
| Team Management | ✅ | Add team members & specializations |
| Availability Calendar | ✅ | Visual booking calendar (month/week) |
| Performance Analytics | ✅ | Views, inquiries, conversion rates |
| Quick Reply Templates | ✅ | Pre-written response messages |
| Inquiry Pipeline | ✅ | Track inquiry stages |
| Vendor ID Tags | ✅ | Beautiful ID cards with QR codes |
| | | |
| **Couple Features** | | |
| Smart Vendor Finder | ✅ | Advanced filters & search |
| Wedding Style Quiz | ✅ | Personalized recommendations |
| Intelligent Planning | ✅ | AI-powered budget & vendor suggestions |
| Vendor Comparison | ✅ | Compare up to 4 vendors |
| Match Score | ✅ | % match based on preferences |
| Smart Recommendations | ✅ | Based on favorites & quiz |
| Couple ID Tags | ✅ | Unique IDs for tracking |
| Favorites | ✅ | Save vendors with animation |
| Wedding Checklist | ✅ | Categorized tasks with calendar |
| Budget Planner | ✅ | Charts, progress bars, categories |
| Venue Map Selection | ✅ | Interactive map for location |
| | | |
| **Form Validation** | | |
| Guest Count Limits | ✅ | 1-2,000 guests validated |
| Budget Limits | ✅ | ₱10K-100M validated |
| Phone Format | ✅ | Philippine format validation |
| Schema Validation | ✅ | Zod + react-hook-form |
| | | |
| **Admin Features** | | |
| Admin Dashboard | ✅ | Full control |
| Location Heatmaps | ✅ | Booking concentration maps |
| Time Heatmaps | ✅ | Peak booking times |
| Category Analytics | ✅ | Performance by category |
| Provider Approval | ✅ | Review & approve vendors |
| Category Management | ✅ | 19 pre-seeded categories |
| User Management | ✅ | Suspend/activate users |
| Booking Overview | ✅ | All platform bookings |
| | | |
| **Vendor Discovery** | | |
| 19 Categories | ✅ | All wedding services covered |
| 100+ Subcategories | ✅ | Specific service types |
| Multi-Select Filters | ✅ | Category, location, price, rating |
| Date Availability Filter | ✅ | Only show available vendors |
| Distance Filter | ✅ | Based on venue location |
| | | |
| **Communication** | | |
| Inquiry System | ✅ | Form-based with date picker |
| Review & Ratings | ✅ | 5-star system with responses |
| Contact Form | ✅ | Via EmailJS |
| | | |
| **UI/UX** | | |
| Responsive Design | ✅ | Mobile-first, all breakpoints |
| Mobile Bottom Nav | ✅ | Easy thumb navigation |
| Swipe Actions | ✅ | Mobile gestures |
| Image Gallery | ✅ | Lightbox, carousel, drag & drop |
| Dark/Light Theme | ✅ | NextUI built-in |
| Visual Charts | ✅ | Budget breakdown, analytics |
| Professional Calendar | ✅ | React Big Calendar |

---

## ❌ Features NOT Included (Require Paid Tier)

| Feature | Reason | Alternative |
|---------|--------|-------------|
| Real-time Chat | Too many reads | Use email/inquiries |
| Push Notifications | Needs Cloud Functions | Email notifications |
| Automated Emails | Needs Cloud Functions | EmailJS (200/month) |
| SMS Notifications | Paid service | None |
| AI Chatbot | Needs paid AI API | Manual recommendations |
| Advanced Analytics | Paid services | Basic heatmaps included |
| Background Jobs | Needs Cloud Functions | Manual admin actions |
| Full-text Search | Needs Algolia/paid | Basic field queries |

---

## 📦 Key Dependencies

```json
{
  "dependencies": {
    "next": "^14.1.0",
    "@nextui-org/react": "^2.2.9",
    "framer-motion": "^11.0.3",
    "firebase": "^10.8.0",
    "react-hook-form": "^7.50.0",
    "@hookform/resolvers": "^3.3.4",
    "zod": "^3.22.4",
    "react-icons": "^5.0.1",
    "@emailjs/browser": "^4.3.1",
    "swr": "^2.2.4",
    "next-themes": "^0.2.1",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.1",
    
    "// Enhanced UI Libraries": "",
    "react-big-calendar": "^1.8.0",
    "date-fns": "^3.3.1",
    "react-datepicker": "^6.1.0",
    "react-select": "^5.8.0",
    "embla-carousel-react": "^8.0.0",
    "react-dropzone": "^14.2.3",
    "react-hot-toast": "^2.4.1",
    "recharts": "^2.12.0",
    "react-image-lightbox": "^5.1.4",
    "browser-image-compression": "^2.0.2",
    
    "// Mapping & Location": "",
    "leaflet": "^1.9.4",
    "react-leaflet": "^4.2.1",
    "react-leaflet-heatmap-layer-v3": "^1.0.0",
    
    "// Heatmaps & Analytics": "",
    "@nivo/heatmap": "^0.84.0",
    "@nivo/geo": "^0.84.0",
    
    "// QR Codes for ID Tags": "",
    "qrcode.react": "^3.1.0"
  },
  "devDependencies": {
    "typescript": "^5.3.3",
    "tailwindcss": "^3.4.1",
    "autoprefixer": "^10.4.17",
    "postcss": "^8.4.35",
    "@types/react": "^18.2.55",
    "@types/node": "^20.11.16",
    "@types/react-big-calendar": "^1.8.0",
    "@types/react-datepicker": "^6.0.0",
    "@types/leaflet": "^1.9.8",
    "eslint": "^8.56.0",
    "eslint-config-next": "^14.1.0"
  }
}
```

---

## 🚀 Getting Started Commands

```bash
# Create Next.js project with TypeScript and Tailwind
npx create-next-app@latest wedding-bazaar --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Navigate to project
cd wedding-bazaar

# Install NextUI
npm install @nextui-org/react framer-motion

# Install Firebase
npm install firebase

# Install additional dependencies
npm install react-hook-form react-icons swr @emailjs/browser next-themes clsx tailwind-merge

# Run development server
npm run dev
```

---

## 🔧 Environment Variables

```env
# .env.local (DO NOT COMMIT)

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# PayMongo Configuration (Sandbox)
NEXT_PUBLIC_PAYMONGO_PUBLIC_KEY=pk_test_xxxxx
PAYMONGO_SECRET_KEY=sk_test_xxxxx
PAYMONGO_WEBHOOK_SECRET=whsec_xxxxx

# Mapping Services (Free)
NEXT_PUBLIC_ORS_API_KEY=your_openrouteservice_key

# App URLs (IMPORTANT for hosting)
# Development: http://localhost:3000
# Production: https://yourdomain.com or https://your-app.vercel.app
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Wedding Bazaar
```

### Environment-Specific Configuration

```
# .env.development (for local development)
NEXT_PUBLIC_APP_URL=http://localhost:3000

# .env.production (for production hosting)
NEXT_PUBLIC_APP_URL=https://weddingbazaar.com

# Vercel automatically sets VERCEL_URL
# The app will use process.env.VERCEL_URL if NEXT_PUBLIC_APP_URL is not set
```

---

## ✅ Next Steps

1. **Review this plan** - Let me know any changes needed
2. **Create Firebase project** - Go to console.firebase.google.com
3. **Enable Authentication** - Email/Password + Google
4. **Create Firestore database** - Start in test mode initially
5. **Get Firebase config** - Copy to .env.local
6. **Optionally set up EmailJS** - For contact forms
7. **I'll start Phase 1** - Create the Next.js project and landing page

---

## ❓ Questions Before Starting

1. ✅ Firebase free tier - confirmed
2. ✅ Next.js + NextUI - confirmed
3. Do you have a Firebase project created already?
4. Any specific color preferences beyond gold/navy?
5. Do you have a logo, or should I create a text-based one?
6. What location/region will this platform serve?
7. Should I proceed with creating the Next.js project?

**Let me know when you're ready to proceed!**
