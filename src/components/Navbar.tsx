
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import AuthModal from './AuthModal';

const Navbar = () => {
  const { isAuthenticated, user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <nav className="bg-white border-b border-gray-100 py-4 w-full fixed top-0 z-50">
      <div className="container px-4 mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full gradient-bg"></div>
          <span className="text-xl font-bold gradient-text">CreditFlow</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
            Home
          </Link>
          <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
            Pricing
          </a>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard">
                <Button variant="outline" className="rounded-full">
                  Dashboard
                </Button>
              </Link>
              <Button 
                variant="ghost" 
                onClick={() => signOut()}
                className="text-gray-600 hover:text-gray-900"
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => handleAuthClick('signin')}
                className="text-gray-600 hover:text-gray-900"
              >
                Sign In
              </Button>
              <Button 
                onClick={() => handleAuthClick('signup')}
                className="gradient-bg hover:opacity-90 transition-opacity"
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-2 px-4 absolute w-full border-b border-gray-200">
          <div className="flex flex-col space-y-3">
            <Link to="/" 
              className="text-gray-600 hover:text-gray-900 py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <a href="#features" 
              className="text-gray-600 hover:text-gray-900 py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a href="#pricing" 
              className="text-gray-600 hover:text-gray-900 py-2 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" 
                  className="text-primary-600 hover:text-primary-800 py-2 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    signOut();
                    setIsMenuOpen(false);
                  }}
                  className="justify-start px-0 text-gray-600"
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={() => {
                    handleAuthClick('signin');
                    setIsMenuOpen(false);
                  }}
                  className="justify-start px-0 text-gray-600"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={() => {
                    handleAuthClick('signup');
                    setIsMenuOpen(false);
                  }}
                  className="gradient-bg hover:opacity-90 transition-opacity w-full"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </nav>
  );
};

export default Navbar;
