'use client';

import { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  Button,
  Input,
} from '@heroui/react';
import { FiHeart, FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiArrowRight, FiCheckCircle, FiX } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
import { UserRole } from '@/lib/firebase/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'login' | 'register';
}

export function AuthModal({ isOpen, onClose, defaultTab = 'login' }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form state
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerRole, setRegisterRole] = useState<UserRole>('couple');
  
  const [error, setError] = useState('');
  
  const { login, register, loginWithGoogle } = useAuth();

  // Sync defaultTab when modal opens
  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
    }
  }, [isOpen, defaultTab]);

  const resetForms = () => {
    setLoginEmail('');
    setLoginPassword('');
    setRegisterName('');
    setRegisterEmail('');
    setRegisterPassword('');
    setRegisterRole('couple');
    setError('');
    setShowPassword(false);
  };

  const handleClose = () => {
    resetForms();
    onClose();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(loginEmail, loginPassword);
      handleClose();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await register(registerEmail, registerPassword, registerName, registerRole);
      handleClose();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Registration failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setIsLoading(true);
    
    try {
      await loginWithGoogle(activeTab === 'register' ? registerRole : undefined);
      handleClose();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Google sign-in failed. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    'Access 500+ verified wedding vendors',
    'Save and compare your favorites',
    'Get exclusive deals and discounts',
    'Plan your perfect wedding day',
  ];

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      size="5xl"
      classNames={{
        base: "bg-transparent shadow-none",
        wrapper: "overflow-hidden items-center justify-center",
        closeButton: "hidden",
      }}
      placement="center"
      backdrop="blur"
      motionProps={{
        variants: {
          enter: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
          exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
        },
      }}
    >
      <ModalContent className="overflow-hidden my-auto">
        <div className="flex h-[85vh] max-h-[700px] overflow-hidden rounded-3xl">
          {/* Left Side - Decorative */}
          <div className="hidden lg:flex lg:w-[45%] relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-10 flex-col justify-between overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 border border-pink-500/30 rounded-full" />
              <div className="absolute top-20 right-20 w-48 h-48 border border-pink-500/20 rounded-full" />
              <div className="absolute bottom-20 left-20 w-40 h-40 border border-rose-500/20 rounded-full" />
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-gradient-to-br from-pink-500/10 to-transparent rounded-full blur-3xl" />
            </div>
            
            {/* Floating Hearts Animation */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-pink-500/20"
                  initial={{ 
                    x: Math.random() * 100 + '%', 
                    y: '110%',
                    rotate: Math.random() * 360,
                  }}
                  animate={{ 
                    y: '-10%',
                    rotate: Math.random() * 360 + 360,
                  }}
                  transition={{
                    duration: 15 + Math.random() * 10,
                    repeat: Infinity,
                    delay: i * 2,
                    ease: 'linear',
                  }}
                >
                  <FiHeart className="text-3xl" />
                </motion.div>
              ))}
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-xl shadow-pink-500/30">
                  <FiHeart className="text-white text-2xl" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Wedding Bazaar</h1>
                  <p className="text-pink-400 text-sm">Your Perfect Day Awaits</p>
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-white mb-4 leading-tight">
                Plan Your Dream<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">
                  Wedding Today
                </span>
              </h2>
              
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                Join thousands of couples who found their perfect wedding vendors through our platform.
              </p>
            </div>
            
            {/* Features List */}
            <div className="relative z-10 space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-pink-500/20 flex items-center justify-center flex-shrink-0">
                    <FiCheckCircle className="text-pink-400 text-sm" />
                  </div>
                  <span className="text-white/70 text-sm">{feature}</span>
                </motion.div>
              ))}
            </div>
            
            {/* Testimonial */}
            <div className="relative z-10 mt-8 p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <p className="text-white/80 text-sm italic mb-3">
                &ldquo;Found our amazing photographer and florist here. The platform made wedding planning so much easier!&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-white text-sm font-semibold">
                  MJ
                </div>
                <div>
                  <p className="text-white text-sm font-medium">Maria & Juan</p>
                  <p className="text-white/50 text-xs">Married in 2025</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Side - Form */}
          <div className="flex-1 bg-slate-950 p-8 lg:p-12 flex flex-col relative">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
            >
              <FiX className="text-xl" />
            </button>
            
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/30">
                <FiHeart className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Wedding Bazaar</h1>
                <p className="text-pink-400 text-xs">Your Perfect Day Awaits</p>
              </div>
            </div>
            
            {/* Tab Switcher */}
            <div className="flex gap-1 p-1.5 bg-slate-800/50 rounded-2xl mb-8">
              <button
                onClick={() => { setActiveTab('login'); setError(''); }}
                className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'login'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setActiveTab('register'); setError(''); }}
                className={`flex-1 py-3 px-6 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'register'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                Sign Up
              </button>
            </div>
            
            {/* Form Content */}
            <div className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {activeTab === 'login' ? (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">Welcome back!</h3>
                      <p className="text-white/50">Sign in to continue planning your perfect day.</p>
                    </div>
                    
                    <form onSubmit={handleLogin} className="space-y-5">
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-start gap-3"
                        >
                          <FiX className="text-lg flex-shrink-0 mt-0.5" />
                          <span>{error}</span>
                        </motion.div>
                      )}
                      
                      {/* Google Sign In - Top */}
                      <Button
                        type="button"
                        variant="bordered"
                        onPress={handleGoogleSignIn}
                        isLoading={isLoading}
                        className="w-full border-2 border-slate-700 text-white hover:bg-slate-800 py-6 rounded-xl font-medium"
                        startContent={!isLoading && <FcGoogle className="text-2xl" />}
                      >
                        Continue with Google
                      </Button>
                      
                      <div className="relative py-3">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-slate-700/50" />
                        </div>
                        <div className="relative flex justify-center">
                          <span className="px-4 bg-slate-950 text-white/40 text-sm">or continue with email</span>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-white/70 mb-2">Email Address</label>
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            value={loginEmail}
                            onValueChange={setLoginEmail}
                            startContent={<FiMail className="text-white/40 text-lg" />}
                            isRequired
                            classNames={{
                              input: "text-white placeholder:text-white/30 text-base",
                              inputWrapper: "bg-slate-800/50 border-2 border-slate-700 hover:border-pink-500/50 group-data-[focus=true]:border-pink-500 h-14 rounded-xl",
                            }}
                          />
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-white/70">Password</label>
                            <button type="button" className="text-sm text-pink-400 hover:text-pink-300 transition-colors">
                              Forgot password?
                            </button>
                          </div>
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={loginPassword}
                            onValueChange={setLoginPassword}
                            startContent={<FiLock className="text-white/40 text-lg" />}
                            endContent={
                              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-white/40 hover:text-white/70 p-1">
                                {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                              </button>
                            }
                            isRequired
                            classNames={{
                              input: "text-white placeholder:text-white/30 text-base",
                              inputWrapper: "bg-slate-800/50 border-2 border-slate-700 hover:border-pink-500/50 group-data-[focus=true]:border-pink-500 h-14 rounded-xl",
                            }}
                          />
                        </div>
                      </div>
                      
                      <Button
                        type="submit"
                        isLoading={isLoading}
                        className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-6 rounded-xl shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 transition-all text-base"
                        endContent={!isLoading && <FiArrowRight className="text-lg" />}
                      >
                        Sign In
                      </Button>
                    </form>
                    
                    <p className="text-center text-sm text-white/40 mt-6">
                      Don&apos;t have an account?{' '}
                      <button 
                        type="button"
                        onClick={() => setActiveTab('register')} 
                        className="text-pink-400 hover:text-pink-300 font-semibold transition-colors"
                      >
                        Create one free
                      </button>
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="register"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-white mb-2">Create your account</h3>
                      <p className="text-white/50">Join the community and start planning!</p>
                    </div>
                    
                    <form onSubmit={handleRegister} className="space-y-5">
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm flex items-start gap-3"
                        >
                          <FiX className="text-lg flex-shrink-0 mt-0.5" />
                          <span>{error}</span>
                        </motion.div>
                      )}
                      
                      {/* Role Selection - Cards */}
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-3">I am a:</label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setRegisterRole('couple')}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                              registerRole === 'couple'
                                ? 'border-pink-500 bg-pink-500/10 shadow-lg shadow-pink-500/20'
                                : 'border-slate-700 hover:border-slate-600 bg-slate-800/30'
                            }`}
                          >
                            <div className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center ${
                              registerRole === 'couple' ? 'bg-pink-500' : 'bg-slate-700'
                            }`}>
                              <FiHeart className={registerRole === 'couple' ? 'text-white' : 'text-white/60'} />
                            </div>
                            <p className={`font-semibold ${registerRole === 'couple' ? 'text-white' : 'text-white/70'}`}>
                              Couple
                            </p>
                            <p className="text-xs text-white/40 mt-1">Planning a wedding</p>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => setRegisterRole('provider')}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                              registerRole === 'provider'
                                ? 'border-pink-500 bg-pink-500/10 shadow-lg shadow-pink-500/20'
                                : 'border-slate-700 hover:border-slate-600 bg-slate-800/30'
                            }`}
                          >
                            <div className={`w-10 h-10 rounded-xl mb-3 flex items-center justify-center ${
                              registerRole === 'provider' ? 'bg-pink-500' : 'bg-slate-700'
                            }`}>
                              <FiUser className={registerRole === 'provider' ? 'text-white' : 'text-white/60'} />
                            </div>
                            <p className={`font-semibold ${registerRole === 'provider' ? 'text-white' : 'text-white/70'}`}>
                              Vendor
                            </p>
                            <p className="text-xs text-white/40 mt-1">Offering services</p>
                          </button>
                        </div>
                      </div>
                      
                      {/* Google Sign Up */}
                      <Button
                        type="button"
                        variant="bordered"
                        onPress={handleGoogleSignIn}
                        isLoading={isLoading}
                        className="w-full border-2 border-slate-700 text-white hover:bg-slate-800 py-6 rounded-xl font-medium"
                        startContent={!isLoading && <FcGoogle className="text-2xl" />}
                      >
                        Sign up with Google
                      </Button>
                      
                      <div className="relative py-3">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-slate-700/50" />
                        </div>
                        <div className="relative flex justify-center">
                          <span className="px-4 bg-slate-950 text-white/40 text-sm">or sign up with email</span>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-white/70 mb-2">Full Name</label>
                          <Input
                            type="text"
                            placeholder="John Doe"
                            value={registerName}
                            onValueChange={setRegisterName}
                            startContent={<FiUser className="text-white/40 text-lg" />}
                            isRequired
                            classNames={{
                              input: "text-white placeholder:text-white/30 text-base",
                              inputWrapper: "bg-slate-800/50 border-2 border-slate-700 hover:border-pink-500/50 group-data-[focus=true]:border-pink-500 h-14 rounded-xl",
                            }}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-white/70 mb-2">Email Address</label>
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            value={registerEmail}
                            onValueChange={setRegisterEmail}
                            startContent={<FiMail className="text-white/40 text-lg" />}
                            isRequired
                            classNames={{
                              input: "text-white placeholder:text-white/30 text-base",
                              inputWrapper: "bg-slate-800/50 border-2 border-slate-700 hover:border-pink-500/50 group-data-[focus=true]:border-pink-500 h-14 rounded-xl",
                            }}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-white/70 mb-2">Password</label>
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Min. 6 characters"
                            value={registerPassword}
                            onValueChange={setRegisterPassword}
                            startContent={<FiLock className="text-white/40 text-lg" />}
                            endContent={
                              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-white/40 hover:text-white/70 p-1">
                                {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                              </button>
                            }
                            isRequired
                            classNames={{
                              input: "text-white placeholder:text-white/30 text-base",
                              inputWrapper: "bg-slate-800/50 border-2 border-slate-700 hover:border-pink-500/50 group-data-[focus=true]:border-pink-500 h-14 rounded-xl",
                            }}
                          />
                        </div>
                      </div>
                      
                      <Button
                        type="submit"
                        isLoading={isLoading}
                        className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-6 rounded-xl shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 transition-all text-base"
                        endContent={!isLoading && <FiArrowRight className="text-lg" />}
                      >
                        Create Account
                      </Button>
                      
                      <p className="text-center text-xs text-white/40 leading-relaxed">
                        By signing up, you agree to our{' '}
                        <a href="/terms" className="text-pink-400 hover:text-pink-300 underline">Terms of Service</a>
                        {' '}and{' '}
                        <a href="/privacy" className="text-pink-400 hover:text-pink-300 underline">Privacy Policy</a>
                      </p>
                    </form>
                    
                    <p className="text-center text-sm text-white/40 mt-6">
                      Already have an account?{' '}
                      <button 
                        type="button"
                        onClick={() => setActiveTab('login')} 
                        className="text-pink-400 hover:text-pink-300 font-semibold transition-colors"
                      >
                        Sign in
                      </button>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
