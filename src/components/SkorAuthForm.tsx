import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { auth } from '@/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

interface FormData {
  email: string;
  password: string;
  fullName: string;
}

const SkorAuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    fullName: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      try {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
        console.log('Login successful');
        navigate('/dashboard');
      } catch (error) {
        console.error('Login failed:', error);
        alert('Failed to sign in. Please check your credentials.');
      }
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        if (userCredential.user) {
          await updateProfile(userCredential.user, { displayName: formData.fullName });
          console.log('Signup successful');
          navigate('/profile-setup');
        }
      } catch (error) {
        console.error('Signup failed:', error);
        alert('Failed to create an account. Please try again.');
      }
    }
  };

  const handleGoogleLogin = () => {
    console.log('Google login attempted');
  };

  const switchMode = () => {
    setIsLogin(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#141110] via-[#2a1f1a] to-back flex">
      {/* Left Side */}
      <div className="flex-1 flex flex-col justify-center items-start px-16 relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-accent rounded-full opacity-5 blur-3xl"></div>
          <div className="absolute bottom-1/3 left-1/2 w-48 h-48 bg-accent rounded-full opacity-5 blur-3xl"></div>
        </div>
        <div className="relative z-10 mb-8">
          <img src="\assets\logo.png" alt="Skor AI Logo" className=" h-28 mb-4" />
        </div>
        <div className="relative z-10">
          
          <h2 className="text-2xl font-semibold text-white mb-4 font-chakra">Next-Generation Gaming Intelligence</h2>
          <p className="text-gray-400 text-lg max-w-md font-chakra">Unlock your potential with AI-powered gaming insights</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? 'login' : 'signup'}
            initial={{ opacity: 0, x: isLogin ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isLogin ? 50 : -50 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="w-[600px] max-w-md relative overflow-hidden min-h-[600px]"
          >
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 shadow-2xl p-8">
              <div className="flex mb-8 bg-white/5 rounded-lg p-1">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                    isLogin ? 'bg-accent text-white shadow-lg' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                    !isLogin ? 'bg-accent text-white shadow-lg' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              <h3 className="text-2xl font-semibold text-white mb-6 text-center">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-2">
                    <label className="text-white text-sm font-medium">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EE5946]"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-white text-sm font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EE5946]"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-white text-sm font-medium">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#EE5946]"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 h-5 w-5 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="w-full bg-accent hover:bg-accent/80 text-white py-3 rounded-lg font-semibold">
                  {isLogin ? 'Sign In' : 'Create Account'}
                </button>
              </form>

              <button
                onClick={handleGoogleLogin}
                className="w-full mt-6 bg-white/10 hover:bg-white/20 border border-white/20 text-white py-3 rounded-lg font-semibold flex items-center justify-center space-x-3"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="mt-6 text-center">
                <p className="text-gray-400">
                  {isLogin ? "Don't have an account?" : 'Already have an account?'}
                  <button onClick={switchMode} className="ml-2 text-[#EE5946] hover:text-[#ff6b54] font-semibold">
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SkorAuthForm;