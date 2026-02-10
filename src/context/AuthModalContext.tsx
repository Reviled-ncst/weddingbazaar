'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { AuthModal } from '@/components/auth/AuthModal';

interface AuthModalContextType {
  openLogin: () => void;
  openRegister: () => void;
  closeModal: () => void;
  isOpen: boolean;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultTab, setDefaultTab] = useState<'login' | 'register'>('login');

  const openLogin = useCallback(() => {
    setDefaultTab('login');
    setIsOpen(true);
  }, []);

  const openRegister = useCallback(() => {
    setDefaultTab('register');
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <AuthModalContext.Provider value={{ openLogin, openRegister, closeModal, isOpen }}>
      {children}
      <AuthModal isOpen={isOpen} onClose={closeModal} defaultTab={defaultTab} />
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (context === undefined) {
    throw new Error('useAuthModal must be used within an AuthModalProvider');
  }
  return context;
}
