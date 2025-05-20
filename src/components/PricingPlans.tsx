
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface PricingPlanProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  credits: number;
  recommended?: boolean;
  tier: 'starter' | 'professional' | 'enterprise';
}

const PricingPlan: React.FC<PricingPlanProps> = ({ 
  name, 
  price, 
  description, 
  features, 
  recommended, 
  credits,
  tier 
}) => {
  const { user, isAuthenticated, checkoutSubscription } = useAuth();
  
  const isCurrentPlan = user?.subscription?.tier === tier;
  
  const handleSubscribe = () => {
    if (!isAuthenticated) {
      // This logic will be handled by the modal state in the parent
      return;
    }
    
    checkoutSubscription(tier);
  };

  return (
    <Card className={`border ${recommended ? 'border-primary shadow-lg' : 'border-gray-200'} 
      relative transition-all hover:shadow-md`}>
      
      {recommended && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white 
          px-4 py-1 rounded-full text-sm font-medium">
          Recommended
        </div>
      )}
      
      {isCurrentPlan && (
        <div className="absolute top-0 right-0 m-4 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
          Current Plan
        </div>
      )}
      
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{name}</CardTitle>
        <div className="mt-4 mb-2">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-gray-500 ml-2">/month</span>
        </div>
        <CardDescription className="text-center max-w-[16rem] mx-auto text-gray-500">
          {description}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="border-t border-gray-200 pt-6 space-y-4">
          <div className="text-center mb-6">
            <span className="text-3xl font-bold gradient-text">{credits}</span>
            <span className="text-gray-500 ml-2">credits</span>
          </div>
          
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleSubscribe}
          disabled={isCurrentPlan}
          className={`w-full ${recommended ? 'gradient-bg hover:opacity-90' : ''} 
            ${isCurrentPlan ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
          variant={recommended ? 'default' : 'outline'}
        >
          {isCurrentPlan ? 'Current Plan' : 'Subscribe'}
        </Button>
      </CardFooter>
    </Card>
  );
};

const PricingPlans = () => {
  const { isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);
  
  const pricingPlans: PricingPlanProps[] = [
    {
      name: "Starter",
      price: "$5",
      description: "Perfect for individuals and small projects",
      features: [
        "50 credits per month",
        "Basic features",
        "Community support",
        "Email support",
        "24/7 customer service"
      ],
      credits: 50,
      tier: 'starter'
    },
    {
      name: "Professional",
      price: "$15",
      description: "Best for growing businesses and teams",
      features: [
        "150 credits per month",
        "All features included",
        "Priority support",
        "Monthly credit reports",
        "24/7 customer service",
        "Advanced analytics"
      ],
      credits: 150,
      recommended: true,
      tier: 'professional'
    },
    {
      name: "Enterprise",
      price: "$25",
      description: "For businesses and power users",
      features: [
        "300 credits per month",
        "All features included",
        "Premium support",
        "Monthly credit reports",
        "24/7 customer service",
        "Advanced analytics",
        "Dedicated account manager"
      ],
      credits: 300,
      tier: 'enterprise'
    }
  ];
  
  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600">
            Choose the plan that works best for you and your needs.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <PricingPlan key={index} {...plan} />
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-500 max-w-xl mx-auto">
            All plans include access to our platform. 
            Upgrade or downgrade at any time. Need a custom plan?
            <button className="ml-1 text-primary hover:text-secondary focus:outline-none underline">
              Contact us
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
