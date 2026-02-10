// User Types
export type UserRole = 'couple' | 'provider' | 'coordinator' | 'admin';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  customId: string;
  photoURL?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface CoupleProfile extends User {
  role: 'couple';
  partnerName?: string;
  weddingDate?: Date;
  weddingVenue?: string;
  estimatedGuests?: number;
  totalBudget?: number;
  weddingStyle?: string;
  quizResults?: QuizResult;
  preferences?: CouplePreferences;
}

export interface ProviderProfile extends User {
  role: 'provider';
  businessName: string;
  description?: string;
  location: LocationData;
  serviceCategories: string[]; // Array of category IDs
  isApproved: boolean;
  isPremium: boolean;
  isFeatured: boolean;
  rating: number;
  reviewCount: number;
  completedBookings: number;
  responseRate?: number;
  responseTime?: string; // e.g., "within 1 hour"
  teamMembers?: TeamMember[];
  socialLinks?: SocialLinks;
  galleryImages?: GalleryImage[];
  yearsInBusiness?: number;
  licenses?: string[];
  awards?: string[];
}

export interface CoordinatorProfile extends User {
  role: 'coordinator';
  businessName: string;
  description?: string;
  location: LocationData;
  isApproved: boolean;
  isPremium: boolean;
  rating: number;
  reviewCount: number;
  activeClients: number; // Number of couples currently working with
  completedWeddings: number;
  specializations?: string[]; // e.g., "Destination", "Luxury", "Budget-friendly"
  servicesOffered?: string[]; // e.g., "Full planning", "Day-of coordination", "Partial planning"
  priceRange?: {
    min: number;
    max: number;
    unit: 'fixed' | 'percentage'; // Fixed fee or % of wedding budget
  };
  teamMembers?: TeamMember[];
  socialLinks?: SocialLinks;
  galleryImages?: GalleryImage[];
  yearsExperience?: number;
  certifications?: string[]; // e.g., "WPI Certified", "ABC Certified"
  vendorNetwork?: string[]; // Preferred vendor IDs they work with
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoURL?: string;
  bio?: string;
}

export interface SocialLinks {
  website?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
}

export interface GalleryImage {
  id: string;
  publicId: string;
  url: string;
  caption?: string;
  category?: string;
  order: number;
}

// Location Types
export interface LocationData {
  address: string;
  city: string;
  province: string;
  region: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  serviceRadius?: number; // in kilometers
}

// Category Types
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon: string;
  image?: string;
  order: number;
  isActive: boolean;
  subcategoryCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subcategory {
  id: string;
  categoryId: string;
  name: string;
  slug: string;
  description?: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Service & Package Types
export interface Service {
  id: string;
  providerId: string;
  categoryId: string;
  subcategoryId?: string;
  name: string;
  description: string;
  basePrice: number;
  priceType: 'fixed' | 'starting_at' | 'hourly' | 'per_person';
  currency: string;
  inclusions: string[];
  exclusions?: string[];
  images?: GalleryImage[];
  isActive: boolean;
  distancePricing?: DistancePricing;
  createdAt: Date;
  updatedAt: Date;
}

export interface Package {
  id: string;
  providerId: string;
  serviceId: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  inclusions: string[];
  highlights?: string[];
  isPopular?: boolean;
  maxGuests?: number;
  duration?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Distance Pricing
export interface DistancePricing {
  enabled: boolean;
  baseLocation: LocationData;
  freeDistanceKm: number;
  pricePerKm: number;
  maxDistance?: number;
  minimumFee?: number;
}

// Booking Types
export type BookingStatus = 
  | 'pending'
  | 'confirmed'
  | 'deposit_paid'
  | 'fully_paid'
  | 'completed'
  | 'cancelled'
  | 'refund_pending'
  | 'refunded';

export interface Booking {
  id: string;
  bookingId: string; // Custom ID like BKG-XXXXX
  coupleId: string;
  providerId: string;
  serviceId: string;
  packageId?: string;
  eventDate: Date;
  eventLocation: LocationData;
  status: BookingStatus;
  basePrice: number;
  distanceFee: number;
  totalAmount: number;
  depositAmount: number;
  depositPaid: boolean;
  depositPaidAt?: Date;
  fullyPaidAt?: Date;
  guestCount?: number;
  specialRequests?: string;
  cancellationReason?: string;
  cancelledAt?: Date;
  refundAmount?: number;
  refundProcessedAt?: Date;
  paymentHistory: PaymentRecord[];
  timeline: BookingTimelineEvent[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentRecord {
  id: string;
  type: 'deposit' | 'balance' | 'refund';
  amount: number;
  method: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymongoId?: string;
  processedAt: Date;
}

export interface BookingTimelineEvent {
  status: BookingStatus;
  timestamp: Date;
  note?: string;
  updatedBy?: string;
}

// Availability Types
export interface ProviderAvailability {
  providerId: string;
  date: string; // YYYY-MM-DD format
  serviceId?: string;
  maxBookings: number;
  currentBookings: number;
  isBlocked: boolean;
  blockReason?: string;
}

// Review Types
export interface Review {
  id: string;
  bookingId: string;
  coupleId: string;
  coupleName: string;
  couplePhoto?: string;
  providerId: string;
  rating: number;
  title?: string;
  content: string;
  images?: GalleryImage[];
  eventDate: Date;
  vendorResponse?: {
    content: string;
    respondedAt: Date;
  };
  isVerified: boolean;
  helpfulCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// Inquiry Types
export interface Inquiry {
  id: string;
  inquiryId: string; // Custom ID like INQ-XXXXX
  coupleId: string;
  coupleName: string;
  coupleEmail: string;
  couplePhone?: string;
  providerId: string;
  serviceId?: string;
  eventDate?: Date;
  eventLocation?: string;
  guestCount?: number;
  budget?: number;
  message: string;
  status: 'new' | 'read' | 'replied' | 'converted' | 'archived';
  messages: InquiryMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface InquiryMessage {
  id: string;
  senderId: string;
  senderRole: UserRole;
  content: string;
  isRead: boolean;
  createdAt: Date;
}

// Quiz & Preferences Types
export interface QuizResult {
  weddingStyle: string;
  budgetRange: string;
  priorityCategories: string[];
  colorPalette?: string[];
  venueType?: string;
  guestSize?: string;
  completedAt: Date;
}

export interface CouplePreferences {
  preferredLocations?: string[];
  priceRange?: {
    min: number;
    max: number;
  };
  favoriteVendors?: string[];
  recentlyViewed?: string[];
  comparisonList?: string[];
}

// Settings Types (Dynamic Config)
export interface PlatformSettings {
  siteName: string;
  siteDescription: string;
  logoUrl?: string;
  faviconUrl?: string;
  contactEmail: string;
  contactPhone?: string;
  address?: string;
  socialLinks?: SocialLinks;
  currency: string;
  timezone: string;
}

export interface ValidationLimits {
  guestCount: { min: number; max: number };
  budget: { min: number; max: number };
  imageUpload: { maxSize: number; maxCount: number };
  descriptionLength: { min: number; max: number };
  reviewLength: { min: number; max: number };
}

export interface RefundPolicy {
  tier: string;
  daysBeforeEvent: number;
  refundPercentage: number;
  description: string;
}

export interface BudgetAllocation {
  categoryId: string;
  categoryName: string;
  defaultPercentage: number;
  order: number;
}

// Landing Page Content Types
export interface HeroContent {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage?: string;
  statistics?: {
    label: string;
    value: string;
  }[];
}

export interface Testimonial {
  id: string;
  coupleName: string;
  weddingDate: string;
  content: string;
  rating: number;
  photoUrl?: string;
  vendorName?: string;
  location?: string;
  isActive: boolean;
  order: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'couples' | 'vendors' | 'payments' | 'booking';
  order: number;
  isActive: boolean;
}

export interface WeddingStyle {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  colorPalette: string[];
  characteristics: string[];
  suggestedVendors?: string[];
  isActive: boolean;
  order: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}
