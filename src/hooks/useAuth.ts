'use client';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/AuthContext';
import type { UserRole } from '@/lib/firebase/auth';

/**
 * Custom hook for authentication with navigation helpers
 */
export function useAuth() {
  const router = useRouter();
  const auth = useAuthContext();

  // Computed properties
  const isAuthenticated = useMemo(
    () => !!auth.user && !auth.loading,
    [auth.user, auth.loading]
  );

  const isCouple = useMemo(
    () => auth.profile?.role === 'couple',
    [auth.profile?.role]
  );

  const isProvider = useMemo(
    () => auth.profile?.role === 'provider',
    [auth.profile?.role]
  );

  const isAdmin = useMemo(
    () => auth.profile?.role === 'admin',
    [auth.profile?.role]
  );

  const isApprovedProvider = useMemo(
    () => isProvider && auth.profile?.isApproved === true,
    [isProvider, auth.profile?.isApproved]
  );

  const isPremiumProvider = useMemo(
    () => isProvider && auth.profile?.isPremium === true,
    [isProvider, auth.profile?.isPremium]
  );

  // Get dashboard route based on user role
  const getDashboardRoute = useCallback((): string => {
    if (!auth.profile) return '/';
    
    switch (auth.profile.role) {
      case 'couple':
        return '/couple/dashboard';
      case 'provider':
        return '/provider/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/';
    }
  }, [auth.profile]);

  // Navigate to dashboard
  const goToDashboard = useCallback(() => {
    router.push(getDashboardRoute());
  }, [router, getDashboardRoute]);

  // Login with redirect
  const loginWithRedirect = useCallback(
    async (email: string, password: string, redirectTo?: string) => {
      await auth.login(email, password);
      router.push(redirectTo || getDashboardRoute());
    },
    [auth, router, getDashboardRoute]
  );

  // Register with redirect
  const registerWithRedirect = useCallback(
    async (
      email: string,
      password: string,
      displayName: string,
      role: UserRole,
      redirectTo?: string
    ) => {
      await auth.register(email, password, displayName, role);
      // Determine default redirect based on role
      const defaultRedirect = role === 'provider' 
        ? '/provider/onboarding'
        : '/couple/dashboard';
      router.push(redirectTo || defaultRedirect);
    },
    [auth, router]
  );

  // Google login with redirect
  const googleLoginWithRedirect = useCallback(
    async (role?: UserRole, redirectTo?: string) => {
      await auth.loginWithGoogle(role);
      router.push(redirectTo || getDashboardRoute());
    },
    [auth, router, getDashboardRoute]
  );

  // Logout with redirect
  const logoutWithRedirect = useCallback(
    async (redirectTo: string = '/') => {
      await auth.logout();
      router.push(redirectTo);
    },
    [auth, router]
  );

  // Check if user has required role
  const hasRole = useCallback(
    (roles: UserRole | UserRole[]): boolean => {
      if (!auth.profile) return false;
      const roleArray = Array.isArray(roles) ? roles : [roles];
      return roleArray.includes(auth.profile.role);
    },
    [auth.profile]
  );

  // Require authentication - redirect if not authenticated
  const requireAuth = useCallback(
    (redirectTo: string = '/login') => {
      if (!auth.loading && !auth.user) {
        router.push(redirectTo);
        return false;
      }
      return true;
    },
    [auth.loading, auth.user, router]
  );

  // Require specific role - redirect if unauthorized
  const requireRole = useCallback(
    (roles: UserRole | UserRole[], redirectTo: string = '/') => {
      if (auth.loading) return true; // Still loading
      if (!auth.profile || !hasRole(roles)) {
        router.push(redirectTo);
        return false;
      }
      return true;
    },
    [auth.loading, auth.profile, hasRole, router]
  );

  return {
    // State from context
    user: auth.user,
    profile: auth.profile,
    loading: auth.loading,
    error: auth.error,
    
    // Auth actions from context
    login: auth.login,
    register: auth.register,
    loginWithGoogle: auth.loginWithGoogle,
    logout: auth.logout,
    sendPasswordReset: auth.sendPasswordReset,
    refreshProfile: auth.refreshProfile,
    clearError: auth.clearError,
    
    // Computed properties
    isAuthenticated,
    isCouple,
    isProvider,
    isAdmin,
    isApprovedProvider,
    isPremiumProvider,
    
    // Navigation helpers
    getDashboardRoute,
    goToDashboard,
    loginWithRedirect,
    registerWithRedirect,
    googleLoginWithRedirect,
    logoutWithRedirect,
    
    // Authorization helpers
    hasRole,
    requireAuth,
    requireRole,
  };
}

export default useAuth;
