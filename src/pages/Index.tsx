import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Users, Shield, Truck, Building2, Phone } from "lucide-react";
import saralYatraLogo from "/lovable-uploads/840dd5e2-0b9e-4979-a974-de75ae35b815.png";

const Index = () => {
  const navigate = useNavigate();

  const portals = [
    {
      title: "Passenger Portal",
      description: "Book tickets, track buses, and manage your journey",
      icon: Users,
      path: "/passenger-login",
      color: "primary"
    },
    {
      title: "Conductor Portal", 
      description: "Manage tickets, seat allocation, and passenger safety",
      icon: Shield,
      path: "/employee-login?role=conductor",
      color: "secondary"
    },
    {
      title: "Driver Portal",
      description: "Navigation, traffic alerts, and route management",
      icon: Truck,
      path: "/employee-login?role=driver", 
      color: "accent"
    },
    {
      title: "Government Portal",
      description: "Fleet monitoring, analytics, and oversight",
      icon: Building2,
      path: "/employee-login?role=government",
      color: "info"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src={saralYatraLogo} 
              alt="Saral Yatra Logo" 
              className="w-16 h-16 object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold text-white">Saral Yatra</h1>
              <p className="text-white/80 text-sm">Aapka Apna Yatra Saathi</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-white">
            <Phone className="w-4 h-4" />
            <span className="text-sm">Helpline: XXXXXXXXXX</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Choose Your Portal
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Access your dedicated portal for a seamless transportation experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {portals.map((portal) => {
            const IconComponent = portal.icon;
            return (
              <Card 
                key={portal.title}
                className="bg-white/95 backdrop-blur-sm border-0 shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105 cursor-pointer"
                onClick={() => navigate(portal.path)}
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto rounded-full bg-${portal.color} flex items-center justify-center mb-4`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-accent">
                    {portal.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {portal.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                    size="lg"
                  >
                    Access Portal
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">System Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h4 className="text-lg font-semibold text-white mb-2">Real-time Tracking</h4>
              <p className="text-white/80 text-sm">Live bus location with nearby hospitals and pharmacies</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h4 className="text-lg font-semibold text-white mb-2">Smart Booking</h4>
              <p className="text-white/80 text-sm">2x2 seat layout with reserved seats for special categories</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h4 className="text-lg font-semibold text-white mb-2">Emergency Support</h4>
              <p className="text-white/80 text-sm">24/7 helpline and emergency reporting system</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/10 backdrop-blur-sm border-t border-white/20 py-6">
        <div className="container mx-auto px-4 text-center text-white/80">
          <p>&copy; 2024 Saral Yatra. All rights reserved. | Aapka Apna Yatra Saathi</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;