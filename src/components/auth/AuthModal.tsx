'use client';

import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Divider,
  Tabs,
  Tab,
  RadioGroup,
  Radio,
} from '@heroui/react';
import { FiHeart, FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
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

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      size="lg"
      classNames={{
        base: "bg-slate-900 border border-slate-700/50",
        header: "border-b border-slate-700/50",
        body: "py-6",
        footer: "border-t border-slate-700/50",
        closeButton: "hover:bg-white/10 active:bg-white/20 text-white/60 hover:text-white",
      }}
      backdrop="blur"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-lg shadow-pink-500/30">
              <FiHeart className="text-white text-lg" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Wedding Bazaar</h2>
              <p className="text-sm text-white/50">Your Perfect Day Awaits</p>
            </div>
          </div>
        </ModalHeader>
        
        <ModalBody>
          <Tabs
            selectedKey={activeTab}
            onSelectionChange={(key) => {
              setActiveTab(key as 'login' | 'register');
              setError('');
            }}
            classNames={{
              tabList: "bg-slate-800/50 p-1 rounded-full",
              cursor: "bg-pink-500",
              tab: "text-white/60 data-[selected=true]:text-white px-6 py-2",
              tabContent: "group-data-[selected=true]:text-white",
            }}
            fullWidth
          >
            <Tab key="login" title="Sign In">
              <form onSubmit={handleLogin} className="space-y-4 pt-4">
                {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                    {error}
                  </div>
                )}
                
                <Input
                  type="email"
                  label="Email"
                  placeholder="you@example.com"
                  value={loginEmail}
                  onValueChange={setLoginEmail}
                  startContent={<FiMail className="text-white/40" />}
                  isRequired
                  classNames={{
                    input: "text-white placeholder:text-white/30",
                    label: "text-white/70",
                    inputWrapper: "bg-slate-800/50 border-slate-700/50 hover:border-pink-500/50 group-data-[focus=true]:border-pink-500",
                  }}
                />
                
                <Input
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  placeholder="••••••••"
                  value={loginPassword}
                  onValueChange={setLoginPassword}
                  startContent={<FiLock className="text-white/40" />}
                  endContent={
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-white/40 hover:text-white/70">
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  }
                  isRequired
                  classNames={{
                    input: "text-white placeholder:text-white/30",
                    label: "text-white/70",
                    inputWrapper: "bg-slate-800/50 border-slate-700/50 hover:border-pink-500/50 group-data-[focus=true]:border-pink-500",
                  }}
                />
                
                <div className="flex justify-end">
                  <button type="button" className="text-sm text-pink-400 hover:text-pink-300 transition-colors">
                    Forgot password?
                  </button>
                </div>
                
                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all"
                >
                  Sign In
                </Button>
                
                <div className="relative py-2">
                  <Divider className="bg-slate-700/50" />
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 bg-slate-900 text-white/40 text-sm">
                    or
                  </span>
                </div>
                
                <Button
                  type="button"
                  variant="bordered"
                  onPress={handleGoogleSignIn}
                  isLoading={isLoading}
                  className="w-full border-slate-700/50 text-white hover:bg-slate-800/50 py-3 rounded-xl"
                  startContent={<FcGoogle className="text-xl" />}
                >
                  Continue with Google
                </Button>
              </form>
            </Tab>
            
            <Tab key="register" title="Sign Up">
              <form onSubmit={handleRegister} className="space-y-4 pt-4">
                {error && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                    {error}
                  </div>
                )}
                
                <Input
                  type="text"
                  label="Full Name"
                  placeholder="John Doe"
                  value={registerName}
                  onValueChange={setRegisterName}
                  startContent={<FiUser className="text-white/40" />}
                  isRequired
                  classNames={{
                    input: "text-white placeholder:text-white/30",
                    label: "text-white/70",
                    inputWrapper: "bg-slate-800/50 border-slate-700/50 hover:border-pink-500/50 group-data-[focus=true]:border-pink-500",
                  }}
                />
                
                <Input
                  type="email"
                  label="Email"
                  placeholder="you@example.com"
                  value={registerEmail}
                  onValueChange={setRegisterEmail}
                  startContent={<FiMail className="text-white/40" />}
                  isRequired
                  classNames={{
                    input: "text-white placeholder:text-white/30",
                    label: "text-white/70",
                    inputWrapper: "bg-slate-800/50 border-slate-700/50 hover:border-pink-500/50 group-data-[focus=true]:border-pink-500",
                  }}
                />
                
                <Input
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  placeholder="Min. 6 characters"
                  value={registerPassword}
                  onValueChange={setRegisterPassword}
                  startContent={<FiLock className="text-white/40" />}
                  endContent={
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-white/40 hover:text-white/70">
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  }
                  isRequired
                  classNames={{
                    input: "text-white placeholder:text-white/30",
                    label: "text-white/70",
                    inputWrapper: "bg-slate-800/50 border-slate-700/50 hover:border-pink-500/50 group-data-[focus=true]:border-pink-500",
                  }}
                />
                
                <div className="space-y-2">
                  <p className="text-sm text-white/70">I am a:</p>
                  <RadioGroup
                    value={registerRole}
                    onValueChange={(value) => setRegisterRole(value as UserRole)}
                    orientation="horizontal"
                    classNames={{
                      wrapper: "gap-4",
                    }}
                  >
                    <Radio 
                      value="couple"
                      classNames={{
                        base: "border-slate-700/50 data-[selected=true]:border-pink-500 bg-slate-800/50 rounded-xl px-4 py-3",
                        label: "text-white/70 data-[selected=true]:text-white",
                        control: "bg-pink-500",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <FiHeart className="text-pink-400" />
                        <span>Couple</span>
                      </div>
                    </Radio>
                    <Radio 
                      value="provider"
                      classNames={{
                        base: "border-slate-700/50 data-[selected=true]:border-pink-500 bg-slate-800/50 rounded-xl px-4 py-3",
                        label: "text-white/70 data-[selected=true]:text-white",
                        control: "bg-pink-500",
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <FiUser className="text-pink-400" />
                        <span>Vendor</span>
                      </div>
                    </Radio>
                  </RadioGroup>
                </div>
                
                <Button
                  type="submit"
                  isLoading={isLoading}
                  className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold py-3 rounded-xl shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all"
                >
                  Create Account
                </Button>
                
                <div className="relative py-2">
                  <Divider className="bg-slate-700/50" />
                  <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 bg-slate-900 text-white/40 text-sm">
                    or
                  </span>
                </div>
                
                <Button
                  type="button"
                  variant="bordered"
                  onPress={handleGoogleSignIn}
                  isLoading={isLoading}
                  className="w-full border-slate-700/50 text-white hover:bg-slate-800/50 py-3 rounded-xl"
                  startContent={<FcGoogle className="text-xl" />}
                >
                  Continue with Google
                </Button>
                
                <p className="text-center text-xs text-white/40">
                  By signing up, you agree to our{' '}
                  <a href="/terms" className="text-pink-400 hover:text-pink-300">Terms of Service</a>
                  {' '}and{' '}
                  <a href="/privacy" className="text-pink-400 hover:text-pink-300">Privacy Policy</a>
                </p>
              </form>
            </Tab>
          </Tabs>
        </ModalBody>
        
        <ModalFooter className="justify-center">
          <p className="text-sm text-white/40">
            {activeTab === 'login' ? (
              <>
                Don&apos;t have an account?{' '}
                <button 
                  type="button"
                  onClick={() => setActiveTab('register')} 
                  className="text-pink-400 hover:text-pink-300 font-medium"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button 
                  type="button"
                  onClick={() => setActiveTab('login')} 
                  className="text-pink-400 hover:text-pink-300 font-medium"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
