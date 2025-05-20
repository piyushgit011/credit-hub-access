
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SubscriptionInfo from '@/components/SubscriptionInfo';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  
  // Redirect to home if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, loading, navigate]);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (!isAuthenticated || !user) {
    return null; // This shouldn't render as the useEffect will redirect
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Current Credits */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Current Credits</CardTitle>
                <CardDescription>Your available credits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end">
                  <span className="text-4xl font-bold gradient-text">{user.credits}</span>
                  <span className="text-gray-500 ml-2 mb-1">credits</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Usage This Month */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Usage This Month</CardTitle>
                <CardDescription>Credits used this billing cycle</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-end">
                  <span className="text-4xl font-bold">0</span>
                  <span className="text-gray-500 ml-2 mb-1">credits</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Account Status */}
            <Card className="border border-gray-200 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Account Status</CardTitle>
                <CardDescription>Your current status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  <span className="font-medium">Active</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Logged in as {user.email}
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Subscription Info */}
          <div className="mb-8">
            <SubscriptionInfo />
          </div>
          
          {/* Usage History */}
          <Card className="border border-gray-200 shadow-sm mb-8">
            <CardHeader>
              <CardTitle className="text-xl">Usage History</CardTitle>
              <CardDescription>Recent credit usage activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <p>No usage history available yet.</p>
                <p className="text-sm mt-2">Your credit usage will appear here when you start using the platform.</p>
                <Button variant="outline" className="mt-4">
                  View Sample Project
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
