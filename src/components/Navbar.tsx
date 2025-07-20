import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Cpu,
  LogIn,
  UserPlus,
  Settings,
  Compass,
  BookOpen,
  User,
  LogOut,
  Menu,
  X,
  Code2,
  Zap
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function Navbar() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const isAdminAuthenticated = localStorage.getItem('isAdminAuthenticated') === 'true';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleAdminSignOut = () => {
    localStorage.removeItem('isAdminAuthenticated');
    window.location.href = '/';
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const NavLink = ({
    to,
    children,
    icon: Icon,
    onClick
  }: {
    to?: string;
    children: React.ReactNode;
    icon: React.ComponentType<{ className?: string }>;
    onClick?: () => void;
  }) => {
    const isActive = to ? isActiveRoute(to) : false;
    
    const content = (
      <div className={`relative group flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
        isActive 
          ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 shadow-lg shadow-cyan-500/25' 
          : 'text-gray-300 hover:text-white hover:bg-slate-700/50'
      }`}>
        <Icon className={`h-4 w-4 transition-transform duration-300 ${
          isActive ? 'scale-110' : 'group-hover:scale-110'
        }`} />
        <span className="font-medium">{children}</span>
        {isActive && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full"></div>
        )}
      </div>
    );

    if (onClick) {
      return (
        <button onClick={onClick} className="w-full text-left">
          {content}
        </button>
      );
    }

    return to ? <Link to={to}>{content}</Link> : content;
  };

  return (
    <nav className="bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-50 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 shadow-lg shadow-cyan-500/25">
                <Cpu className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 text-transparent bg-clip-text transition-all duration-300 group-hover:scale-105">
                TECHMAZE
              </span>
              <span className="text-xs text-gray-400 -mt-1">Code • Learn • Master</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink to="/explore" icon={Compass}>
              Explore
            </NavLink>
            <NavLink to="/enhancement" icon={Zap}>
              Enhancement
            </NavLink>

            {/* Divider */}
            <div className="w-px h-6 bg-slate-600 mx-4"></div>

            {isAdminAuthenticated ? (
              <div className="flex items-center space-x-2">
                <NavLink to="/admin" icon={Settings}>
                  Admin Panel
                </NavLink>
                <NavLink 
                  icon={LogOut}
                  onClick={handleAdminSignOut}
                >
                  Admin Logout
                </NavLink>
              </div>
            ) : user ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 px-3 py-2 bg-slate-800/50 rounded-xl border border-slate-700/50">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-300">Welcome back!</span>
                </div>
                <NavLink to="/admin-login" icon={Settings}>
                  Admin
                </NavLink>
                <NavLink 
                  icon={LogOut}
                  onClick={signOut}
                >
                  Sign Out
                </NavLink>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <NavLink to="/login" icon={LogIn}>
                  Login
                </NavLink>
                <Link
                  to="/register"
                  className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Register</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-800/50 border border-slate-700/50 text-gray-300 hover:text-white transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-700/50">
            <div className="space-y-2">
              <NavLink to="/explore" icon={Compass}>
                Explore Languages
              </NavLink>
              <NavLink to="/enhancement" icon={Zap}>
                Enhancement
              </NavLink>

              <div className="border-t border-slate-700/50 my-4"></div>

              {isAdminAuthenticated ? (
                <>
                  <NavLink to="/admin" icon={Settings}>
                    Admin Panel
                  </NavLink>
                  <NavLink 
                    icon={LogOut}
                    onClick={handleAdminSignOut}
                  >
                    Admin Logout
                  </NavLink>
                </>
              ) : user ? (
                <>
                  <div className="flex items-center space-x-3 px-4 py-3 bg-slate-800/30 rounded-xl border border-slate-700/50">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="text-white font-medium">Welcome back!</div>
                      <div className="text-xs text-gray-400">Ready to code?</div>
                    </div>
                  </div>
                  <NavLink to="/admin-login" icon={Settings}>
                    Admin Login
                  </NavLink>
                  <NavLink 
                    icon={LogOut}
                    onClick={signOut}
                  >
                    Sign Out
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/login" icon={LogIn}>
                    Login
                  </NavLink>
                  <Link
                    to="/register"
                    className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-300 mx-4"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span>Create Account</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}