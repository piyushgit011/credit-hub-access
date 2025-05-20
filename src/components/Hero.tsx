
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';

const Hero = () => {
  const { isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/5"></div>
        <div className="absolute top-1/2 -left-24 w-64 h-64 rounded-full bg-secondary/5"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 animate-fadeIn">
            Unlock Your Potential with <span className="gradient-text">CreditFlow</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 animate-slideUp">
            The subscription-based platform that gives you credits to power your projects.
            Start for free, upgrade for more, and only pay for what you need.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slideUp" style={{ animationDelay: '100ms' }}>
            {isAuthenticated ? (
              <Button 
                size="lg" 
                className="gradient-bg hover:opacity-90 transition-opacity"
                asChild
              >
                <a href="#pricing">View Plans</a>
              </Button>
            ) : (
              <>
                <Button 
                  size="lg" 
                  className="gradient-bg hover:opacity-90 transition-opacity"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  Get Started
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  asChild
                >
                  <a href="#pricing">View Pricing</a>
                </Button>
              </>
            )}
          </div>
          
          <div className="mt-12 animate-slideUp" style={{ animationDelay: '200ms' }}>
            <div className="p-4 bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg inline-flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium text-gray-600">1,500+ users already using CreditFlow</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="signup"
      />
    </section>
  );
};

export default Hero;
