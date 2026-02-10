'use client';

import { useState, useEffect } from 'react';
import {
  Modal,
  ModalContent,
  Button,
  Input,
  Select,
  SelectItem,
} from '@heroui/react';
import { FiHeart, FiMail, FiLock, FiUser, FiEye, FiEyeOff, FiArrowRight, FiCheckCircle, FiX, FiGrid, FiClipboard } from 'react-icons/fi';
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
  const [vendorCategory, setVendorCategory] = useState('');
  
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
    setVendorCategory('');
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
      const additionalData = (registerRole === 'provider' || registerRole === 'coordinator') && vendorCategory
        ? { serviceCategory: vendorCategory }
        : undefined;
      await register(registerEmail, registerPassword, registerName, registerRole, additionalData);
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
      const additionalData = (registerRole === 'provider' || registerRole === 'coordinator') && vendorCategory
        ? { serviceCategory: vendorCategory }
        : undefined;
      await loginWithGoogle(activeTab === 'register' ? registerRole : undefined, additionalData);
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

  const vendorCategories = [
    { key: 'venues', label: 'Venues' },
    { key: 'photography', label: 'Photography' },
    { key: 'videography', label: 'Videography' },
    { key: 'catering', label: 'Catering' },
    { key: 'florists', label: 'Florists' },
    { key: 'music-entertainment', label: 'Music & DJ' },
    { key: 'bridal-wear', label: 'Bridal Wear' },
    { key: 'jewelry', label: 'Jewelry' },
    { key: 'makeup-hair', label: 'Makeup & Hair' },
    { key: 'invitations', label: 'Invitations' },
    { key: 'transportation', label: 'Transportation' },
    { key: 'favors-gifts', label: 'Favors & Gifts' },
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
        <div className="flex h-auto max-h-[90vh] overflow-hidden rounded-3xl">
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
          <div className="flex-1 bg-slate-950 p-6 lg:p-8 flex flex-col relative overflow-y-auto">
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
            <div className="flex gap-1 p-1 bg-slate-800/50 rounded-xl mb-4">
              <button
                onClick={() => { setActiveTab('login'); setError(''); }}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'login'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => { setActiveTab('register'); setError(''); }}
                className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  activeTab === 'register'
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-500/30'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                Sign Up
              </button>
            </div>
            
            {/* Form Content */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                {activeTab === 'login' ? (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white mb-1">Welcome back!</h3>
                      <p className="text-white/50 text-sm">Sign in to continue planning your perfect day.</p>
                    </div>
                    
                    <form onSubmit={handleLogin} className="space-y-3">
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
                      
                      <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-slate-700/50" />
                        </div>
                        <div className="relative flex justify-center">
                          <span className="px-4 bg-slate-950 text-white/40 text-sm">or continue with email</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-white/70 mb-1">Email Address</label>
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            value={loginEmail}
                            onValueChange={setLoginEmail}
                            startContent={<FiMail className="text-white/50 text-lg" />}
                            isRequired
                            classNames={{
                              input: "text-white placeholder:text-white/40 pl-2",
                              inputWrapper: "bg-slate-600 border border-slate-500 hover:border-slate-400 group-data-[focus=true]:border-pink-500 shadow-none h-11 rounded-xl px-4",
                            }}
                          />
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <label className="block text-xs font-medium text-white/70">Password</label>
                            <button type="button" className="text-xs text-pink-400 hover:text-pink-300 transition-colors">
                              Forgot password?
                            </button>
                          </div>
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="••••••••"
                            value={loginPassword}
                            onValueChange={setLoginPassword}
                            startContent={<FiLock className="text-white/50 text-lg" />}
                            endContent={
                              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-white/50 hover:text-white/70 p-1">
                                {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                              </button>
                            }
                            isRequired
                            classNames={{
                              input: "text-white placeholder:text-white/40 pl-2",
                              inputWrapper: "bg-slate-600 border border-slate-500 hover:border-slate-400 group-data-[focus=true]:border-pink-500 shadow-none h-11 rounded-xl px-4",
                            }}
                          />
                        </div>
                      </div>
                      
                      <Button
                        type="submit"
                        isLoading={isLoading}
                        className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-5 rounded-xl shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 transition-all"
                        endContent={!isLoading && <FiArrowRight className="text-lg" />}
                      >
                        Sign In
                      </Button>
                    </form>
                    
                    <p className="text-center text-sm text-white/40 mt-4">
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
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-white mb-1">Create your account</h3>
                      <p className="text-white/50 text-sm">Join the community and start planning!</p>
                    </div>
                    
                    <form onSubmit={handleRegister} className="space-y-3">
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
                        <label className="block text-sm font-medium text-white/70 mb-2">I am a:</label>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            type="button"
                            onClick={() => setRegisterRole('couple')}
                            className={`p-3 rounded-xl border-2 transition-all duration-300 text-left ${
                              registerRole === 'couple'
                                ? 'border-pink-500 bg-pink-500/10 shadow-lg shadow-pink-500/20'
                                : 'border-slate-700 hover:border-slate-600 bg-slate-800/30'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg mb-2 flex items-center justify-center ${
                              registerRole === 'couple' ? 'bg-pink-500' : 'bg-slate-700'
                            }`}>
                              <FiHeart className={registerRole === 'couple' ? 'text-white text-sm' : 'text-white/60 text-sm'} />
                            </div>
                            <p className={`font-semibold text-sm ${registerRole === 'couple' ? 'text-white' : 'text-white/70'}`}>
                              Couple
                            </p>
                            <p className="text-xs text-white/40">Planning a wedding</p>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => setRegisterRole('provider')}
                            className={`p-3 rounded-xl border-2 transition-all duration-300 text-left ${
                              registerRole === 'provider'
                                ? 'border-pink-500 bg-pink-500/10 shadow-lg shadow-pink-500/20'
                                : 'border-slate-700 hover:border-slate-600 bg-slate-800/30'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg mb-2 flex items-center justify-center ${
                              registerRole === 'provider' ? 'bg-pink-500' : 'bg-slate-700'
                            }`}>
                              <FiUser className={registerRole === 'provider' ? 'text-white text-sm' : 'text-white/60 text-sm'} />
                            </div>
                            <p className={`font-semibold text-sm ${registerRole === 'provider' ? 'text-white' : 'text-white/70'}`}>
                              Vendor
                            </p>
                            <p className="text-xs text-white/40">Offering services</p>
                          </button>
                          
                          <button
                            type="button"
                            onClick={() => setRegisterRole('coordinator')}
                            className={`p-3 rounded-xl border-2 transition-all duration-300 text-left ${
                              registerRole === 'coordinator'
                                ? 'border-pink-500 bg-pink-500/10 shadow-lg shadow-pink-500/20'
                                : 'border-slate-700 hover:border-slate-600 bg-slate-800/30'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-lg mb-2 flex items-center justify-center ${
                              registerRole === 'coordinator' ? 'bg-pink-500' : 'bg-slate-700'
                            }`}>
                              <FiClipboard className={registerRole === 'coordinator' ? 'text-white text-sm' : 'text-white/60 text-sm'} />
                            </div>
                            <p className={`font-semibold text-sm ${registerRole === 'coordinator' ? 'text-white' : 'text-white/70'}`}>
                              Coordinator
                            </p>
                            <p className="text-xs text-white/40">Planning weddings</p>
                          </button>
                        </div>
                      </div>
                      
                      {/* Google Sign Up */}
                      <Button
                        type="button"
                        variant="bordered"
                        onPress={handleGoogleSignIn}
                        isLoading={isLoading}
                        className="w-full border-2 border-slate-700 text-white hover:bg-slate-800 py-5 rounded-xl font-medium"
                        startContent={!isLoading && <FcGoogle className="text-xl" />}
                      >
                        Sign up with Google
                      </Button>
                      
                      <div className="relative py-2">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-slate-700/50" />
                        </div>
                        <div className="relative flex justify-center">
                          <span className="px-4 bg-slate-950 text-white/40 text-sm">or sign up with email</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-white/70 mb-1">Full Name</label>
                          <Input
                            type="text"
                            placeholder="John Doe"
                            value={registerName}
                            onValueChange={setRegisterName}
                            startContent={<FiUser className="text-white/50 text-lg" />}
                            isRequired
                            classNames={{
                              input: "text-white placeholder:text-white/40 pl-2",
                              inputWrapper: "bg-slate-600 border border-slate-500 hover:border-slate-400 group-data-[focus=true]:border-pink-500 shadow-none h-11 rounded-xl px-4",
                            }}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium text-white/70 mb-1">Email Address</label>
                          <Input
                            type="email"
                            placeholder="you@example.com"
                            value={registerEmail}
                            onValueChange={setRegisterEmail}
                            startContent={<FiMail className="text-white/50 text-lg" />}
                            isRequired
                            classNames={{
                              input: "text-white placeholder:text-white/40 pl-2",
                              inputWrapper: "bg-slate-600 border border-slate-500 hover:border-slate-400 group-data-[focus=true]:border-pink-500 shadow-none h-11 rounded-xl px-4",
                            }}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs font-medium text-white/70 mb-1">Password</label>
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Min. 6 characters"
                            value={registerPassword}
                            onValueChange={setRegisterPassword}
                            startContent={<FiLock className="text-white/50 text-lg" />}
                            endContent={
                              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-white/50 hover:text-white/70 p-1">
                                {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
                              </button>
                            }
                            isRequired
                            classNames={{
                              input: "text-white placeholder:text-white/40 pl-2",
                              inputWrapper: "bg-slate-600 border border-slate-500 hover:border-slate-400 group-data-[focus=true]:border-pink-500 shadow-none h-11 rounded-xl px-4",
                            }}
                          />
                        </div>

                        {/* Vendor Category - only shown when provider is selected */}
                        {registerRole === 'provider' && (
                          <div>
                            <label className="block text-xs font-medium text-white/70 mb-1">Service Category</label>
                            <Select
                              placeholder="Select your category"
                              selectedKeys={vendorCategory ? [vendorCategory] : []}
                              onSelectionChange={(keys) => setVendorCategory(Array.from(keys)[0] as string)}
                              startContent={<FiGrid className="text-white/50 text-lg" />}
                              classNames={{
                                trigger: "bg-slate-600 border border-slate-500 hover:border-slate-400 data-[focus=true]:border-pink-500 shadow-none h-11 rounded-xl px-4",
                                value: "text-white pl-2",
                                popoverContent: "bg-slate-700 border border-slate-600",
                              }}
                            >
                              {vendorCategories.map((category) => (
                                <SelectItem key={category.key} className="text-white hover:bg-slate-700">
                                  {category.label}
                                </SelectItem>
                              ))}
                            </Select>
                          </div>
                        )}
                      </div>
                      
                      <Button
                        type="submit"
                        isLoading={isLoading}
                        className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-5 rounded-xl shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 transition-all"
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
                    
                    <p className="text-center text-sm text-white/40 mt-3">
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
