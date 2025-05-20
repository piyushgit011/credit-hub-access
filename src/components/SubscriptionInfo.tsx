
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';

const SubscriptionInfo = () => {
  const { user, refreshSubscription, checkoutSubscription } = useAuth();
  
  if (!user) return null;

  const getMaxCredits = () => {
    switch (user.subscription?.tier) {
      case 'basic':
        return 100;
      case 'premium':
        return 500;
      default:
        return 10; // free tier
    }
  };

  const maxCredits = getMaxCredits();
  const usedPercentage = (user.credits / maxCredits) * 100;
  
  // Format the subscription end date
  const formatExpiryDate = () => {
    if (!user.subscription?.expiresAt) return 'N/A';
    return new Date(user.subscription.expiresAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">Subscription Details</CardTitle>
            <CardDescription>Manage your subscription and credits</CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => refreshSubscription()}
          >
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Plan Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500 mb-1">Current Plan</p>
            <p className="text-lg font-semibold capitalize gradient-text">
              {user.subscription?.tier || 'Free'}
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500 mb-1">Status</p>
            <p className="text-lg font-semibold">
              {user.subscription?.active ? (
                <span className="text-green-600">Active</span>
              ) : (
                <span className="text-gray-600">Inactive</span>
              )}
            </p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500 mb-1">Next Billing</p>
            <p className="text-lg font-semibold">{formatExpiryDate()}</p>
          </div>
        </div>
        
        {/* Credits Info */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Credits</h3>
            <span className="text-sm text-gray-500">
              {user.credits} / {maxCredits} credits available
            </span>
          </div>
          <Progress value={usedPercentage} className="h-2" />
        </div>
        
        {/* Upgrade Section */}
        {user.subscription?.tier !== 'premium' && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Upgrade Your Plan</h3>
            <p className="text-sm text-gray-600 mb-4">
              Get more credits and features by upgrading your subscription.
            </p>
            <div className="flex gap-3">
              {user.subscription?.tier !== 'basic' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => checkoutSubscription('basic')}
                >
                  Upgrade to Basic
                </Button>
              )}
              <Button
                className="gradient-bg hover:opacity-90"
                size="sm"
                onClick={() => checkoutSubscription('premium')}
              >
                Upgrade to Premium
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SubscriptionInfo;
