import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { UserPlus, Lock, Mail, User } from 'lucide-react';

export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Input validation
    if (!email.trim() || !password.trim() || !username.trim()) {
      setError('Please fill in all fields');
      return;
    }

    // Username validation
    if (username.length < 3) {
      setError('Username must be at least 3 characters long');
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setError('Username can only contain letters, numbers, and underscores');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Password validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await signUp(email, password, username);
      navigate('/');
    } catch (err) {
      if (err instanceof Error) {
        // Handle specific error messages
        if (err.message.includes('email already registered')) {
          setError('This email is already registered. Please use a different email or sign in.');
        } else if (err.message.includes('username already exists')) {
          setError('This username is already taken. Please choose a different username.');
        } else if (err.message.includes('rate limit')) {
          setError('Too many registration attempts. Please try again later.');
        } else if (err.message.includes('weak password')) {
          setError('Please use a stronger password with a mix of letters, numbers, and symbols.');
        } else {
          setError(err.message);
        }
      } else {
        setError('An error occurred during registration. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-slate-800/50 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-slate-700 transform transition-all duration-300 hover:scale-[1.02]">
          <div className="text-center relative">
            <div className="absolute -top-20 left-1/2 -translate-x-1/2">
              <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center transform rotate-45 transition-transform duration-300 hover:rotate-[225deg]">
                <UserPlus className="h-12 w-12 text-white transform -rotate-45 transition-transform duration-300 hover:rotate-[-225deg]" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mt-12 mb-2">Create Account</h2>
            <p className="text-gray-400 mb-8">Join TECHMAZE and start your coding journey</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500 text-red-500 rounded-xl p-4 text-sm animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-300 ${focusedInput === 'username' ? 'text-cyan-400' : 'text-gray-400'}`}>
                  <User className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusedInput('username')}
                  onBlur={() => setFocusedInput(null)}
                  className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                  placeholder="Username"
                  minLength={3}
                  pattern="^[a-zA-Z0-9_]+$"
                  title="Username can only contain letters, numbers, and underscores"
                />
              </div>

              <div className="relative">
                <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-300 ${focusedInput === 'email' ? 'text-cyan-400' : 'text-gray-400'}`}>
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedInput('email')}
                  onBlur={() => setFocusedInput(null)}
                  className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                  placeholder="Email address"
                />
              </div>

              <div className="relative">
                <div className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-300 ${focusedInput === 'password' ? 'text-cyan-400' : 'text-gray-400'}`}>
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedInput('password')}
                  onBlur={() => setFocusedInput(null)}
                  className="w-full bg-slate-900/50 border border-slate-700 text-white rounded-xl px-10 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                  placeholder="Password"
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl py-3 font-semibold transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create account'
              )}
            </button>

            <div className="text-center text-sm">
              <span className="text-gray-400">Already have an account? </span>
              <Link to="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300">
                Sign in here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}