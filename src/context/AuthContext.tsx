'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import {
  registerUser,
  loginUser,
  logoutUser,
  signInWithGoogle,
  resetPassword,
  getUserProfile,
  onAuthChange,
  UserRole,
  UserProfile,
  GoogleAuthResult,
} from '@/lib/firebase/auth';

export interface AuthState {
  user: FirebaseUser | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  // Auth actions
  register: (
    email: string,
    password: string,
    displayName: string,
    role: UserRole,
    additionalData?: { serviceCategory?: string }
  ) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: (role?: UserRole, additionalData?: { serviceCategory?: string }) => Promise<GoogleAuthResult>;
  logout: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    loading: true,
    error: null,
  });

  // Fetch user profile from Firestore
  const fetchProfile = useCallback(async (uid: string) => {
    try {
      const profile = await getUserProfile(uid);
      setState((prev) => ({ ...prev, profile, loading: false }));
    } catch (err) {
      console.error('Error fetching profile:', err);
      setState((prev) => ({ ...prev, loading: false }));
    }
  }, []);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        setState((prev) => ({ ...prev, user: firebaseUser, loading: true }));
        await fetchProfile(firebaseUser.uid);
      } else {
        setState({
          user: null,
          profile: null,
          loading: false,
          error: null,
        });
      }
    });

    return () => unsubscribe();
  }, [fetchProfile]);

  // Register new user
  const register = useCallback(
    async (
      email: string,
      password: string,
      displayName: string,
      role: UserRole,
      additionalData?: { serviceCategory?: string }
    ) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        await registerUser(email, password, displayName, role, additionalData);
        // Auth state listener will handle updating state
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Registration failed';
        setState((prev) => ({ ...prev, loading: false, error: message }));
        throw err;
      }
    },
    []
  );

  // Login with email/password
  const login = useCallback(async (email: string, password: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      await loginUser(email, password);
      // Auth state listener will handle updating state
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed';
      setState((prev) => ({ ...prev, loading: false, error: message }));
      throw err;
    }
  }, []);

  // Login with Google
  const loginWithGoogle = useCallback(async (role?: UserRole, additionalData?: { serviceCategory?: string }): Promise<GoogleAuthResult> => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const result = await signInWithGoogle(role, additionalData);
      // Auth state listener will handle updating state
      return result;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Google sign-in failed';
      setState((prev) => ({ ...prev, loading: false, error: message }));
      throw err;
    }
  }, []);

  // Logout
  const logout = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      await logoutUser();
      // Auth state listener will handle updating state
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Logout failed';
      setState((prev) => ({ ...prev, loading: false, error: message }));
      throw err;
    }
  }, []);

  // Send password reset email
  const sendPasswordReset = useCallback(async (email: string) => {
    setState((prev) => ({ ...prev, error: null }));
    try {
      await resetPassword(email);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Password reset failed';
      setState((prev) => ({ ...prev, error: message }));
      throw err;
    }
  }, []);

  // Refresh user profile
  const refreshProfile = useCallback(async () => {
    if (state.user) {
      await fetchProfile(state.user.uid);
    }
  }, [state.user, fetchProfile]);

  // Clear error
  const clearError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  // Memoize context value
  const value = useMemo<AuthContextType>(
    () => ({
      ...state,
      register,
      login,
      loginWithGoogle,
      logout,
      sendPasswordReset,
      refreshProfile,
      clearError,
    }),
    [
      state,
      register,
      login,
      loginWithGoogle,
      logout,
      sendPasswordReset,
      refreshProfile,
      clearError,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuthContext(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
}
