import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';

export type UserRole = 'couple' | 'provider' | 'coordinator' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  // Couple-specific
  weddingDate?: Date;
  partnerName?: string;
  // Provider-specific
  businessName?: string;
  isApproved?: boolean;
  isPremium?: boolean;
}

// Generate unique ID with prefix
const generateUniqueId = (prefix: string): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}${random}`;
};

// Get role prefix for ID generation
const getRolePrefix = (role: UserRole): string => {
  switch (role) {
    case 'couple': return 'CPL';
    case 'provider': return 'VND';
    case 'coordinator': return 'CRD';
    case 'admin': return 'ADM';
    default: return 'USR';
  }
};

// Register new user
export const registerUser = async (
  email: string,
  password: string,
  displayName: string,
  role: UserRole,
  additionalData?: { serviceCategory?: string }
): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Update display name
  await updateProfile(user, { displayName });

  // Generate custom ID based on role
  const customId = generateUniqueId(getRolePrefix(role));

  // Create user document in Firestore
  const userDoc: Partial<UserProfile> & { serviceCategory?: string } = {
    uid: user.uid,
    email: email,
    displayName: displayName,
    role: role,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Add role-specific fields
  if (role === 'provider' || role === 'coordinator') {
    userDoc.isApproved = false;
    userDoc.isPremium = false;
    if (additionalData?.serviceCategory) {
      userDoc.serviceCategory = additionalData.serviceCategory;
    }
  }

  await setDoc(doc(db, 'users', user.uid), {
    ...userDoc,
    customId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return user;
};

// Sign in with email/password
export const loginUser = async (email: string, password: string): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// Sign in with Google - returns user data for pre-fill
export interface GoogleAuthResult {
  user: User;
  isNewUser: boolean;
  prefillData?: {
    displayName: string;
    email: string;
    photoURL?: string;
  };
}

export const signInWithGoogle = async (role?: UserRole, additionalData?: { serviceCategory?: string }): Promise<GoogleAuthResult> => {
  const provider = new GoogleAuthProvider();
  // Request additional scopes for user info
  provider.addScope('profile');
  provider.addScope('email');
  
  const userCredential = await signInWithPopup(auth, provider);
  const user = userCredential.user;

  // Check if user exists in Firestore
  const userDocRef = doc(db, 'users', user.uid);
  const userDocSnap = await getDoc(userDocRef);

  const isNewUser = !userDocSnap.exists();

  if (isNewUser && role) {
    // New user - create profile
    const customId = generateUniqueId(getRolePrefix(role));

    const userDoc: Partial<UserProfile> & { serviceCategory?: string } = {
      uid: user.uid,
      email: user.email || '',
      displayName: user.displayName || 'User',
      photoURL: user.photoURL || undefined,
      role: role,
      isActive: true,
    };

    if (role === 'provider' || role === 'coordinator') {
      userDoc.isApproved = false;
      userDoc.isPremium = false;
      if (additionalData?.serviceCategory) {
        userDoc.serviceCategory = additionalData.serviceCategory;
      }
    }

    await setDoc(userDocRef, {
      ...userDoc,
      customId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  return {
    user,
    isNewUser,
    prefillData: {
      displayName: user.displayName || '',
      email: user.email || '',
      photoURL: user.photoURL || undefined,
    },
  };
};

// Sign out
export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};

// Send password reset email
export const resetPassword = async (email: string): Promise<void> => {
  await sendPasswordResetEmail(auth, email);
};

// Get user profile from Firestore
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const userDocRef = doc(db, 'users', uid);
  const userDocSnap = await getDoc(userDocRef);
  
  if (userDocSnap.exists()) {
    return userDocSnap.data() as UserProfile;
  }
  return null;
};

// Auth state observer
export const onAuthChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
