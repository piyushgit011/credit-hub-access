
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const features = [
  {
    title: "Credit-Based System",
    description: "Pay only for what you use with our flexible credit system. Choose a subscription plan that fits your needs.",
    icon: (
      <div className="rounded-full p-2 gradient-bg w-10 h-10 flex items-center justify-center">
        <Check className="h-5 w-5 text-white" />
      </div>
    )
  },
  {
    title: "Secure Authentication",
    description: "Industry-standard authentication ensures your account and credits are always protected.",
    icon: (
      <div className="rounded-full p-2 gradient-bg w-10 h-10 flex items-center justify-center">
        <Check className="h-5 w-5 text-white" />
      </div>
    )
  },
  {
    title: "Subscription Management",
    description: "Easily manage your subscription and credit usage through an intuitive dashboard.",
    icon: (
      <div className="rounded-full p-2 gradient-bg w-10 h-10 flex items-center justify-center">
        <Check className="h-5 w-5 text-white" />
      </div>
    )
  },
  {
    title: "Credit Monitoring",
    description: "Track your credit usage in real-time and get notified when you're running low.",
    icon: (
      <div className="rounded-full p-2 gradient-bg w-10 h-10 flex items-center justify-center">
        <Check className="h-5 w-5 text-white" />
      </div>
    )
  },
  {
    title: "Automatic Renewal",
    description: "Credits are automatically renewed with your subscription, ensuring uninterrupted service.",
    icon: (
      <div className="rounded-full p-2 gradient-bg w-10 h-10 flex items-center justify-center">
        <Check className="h-5 w-5 text-white" />
      </div>
    )
  },
  {
    title: "Usage Reports",
    description: "Detailed reports showing how and when you used your credits to optimize your subscription.",
    icon: (
      <div className="rounded-full p-2 gradient-bg w-10 h-10 flex items-center justify-center">
        <Check className="h-5 w-5 text-white" />
      </div>
    )
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need in One Place
          </h2>
          <p className="text-xl text-gray-600">
            Our platform offers a comprehensive suite of features designed to make your experience seamless.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-4">
                  {feature.icon}
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
