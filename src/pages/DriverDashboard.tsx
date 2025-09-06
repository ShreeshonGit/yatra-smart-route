import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { LogOut, Route, AlertTriangle, MapPin, Shield, Camera, Navigation } from "lucide-react";
import saralYatraLogo from "/lovable-uploads/840dd5e2-0b9e-4979-a974-de75ae35b815.png";
import RouteNavigation from "@/components/driver/RouteNavigation";
import TrafficAlerts from "@/components/driver/TrafficAlerts";
import DivertedRoute from "@/components/driver/DivertedRoute";
import GPSLogbook from "@/components/driver/GPSLogbook";
import FaceLogin from "@/components/driver/FaceLogin";
import GeofencingSystem from "@/components/driver/GeofencingSystem";

const DriverDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("face-login");

  const handleLogout = () => {
    navigate("/");
  };

  const tabs = [
    { 
      id: "face-login", 
      label: "Face Login", 
      icon: Camera,
      component: <FaceLogin onLoginSuccess={() => setActiveTab("geofencing")} />
    },
    { 
      id: "geofencing", 
      label: "Trip Management", 
      icon: Navigation,
      component: <GeofencingSystem />
    },
    { 
      id: "navigation", 
      label: "Route Navigation", 
      icon: Route,
      component: <RouteNavigation />
    },
    { 
      id: "alerts", 
      label: "Traffic Alerts", 
      icon: AlertTriangle,
      component: <TrafficAlerts />
    },
    { 
      id: "diverted", 
      label: "Diverted Route", 
      icon: MapPin,
      component: <DivertedRoute />
    },
    { 
      id: "logbook", 
      label: "GPS Logbook", 
      icon: MapPin,
      component: <GPSLogbook />
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img 
              src={saralYatraLogo} 
              alt="Saral Yatra Logo" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-accent">Saral Yatra</h1>
              <p className="text-muted-foreground text-xs">Driver Portal</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span className="text-sm">Driver ID: DRV001</span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLogout}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-accent mb-2">Driver Dashboard</h2>
          <p className="text-muted-foreground">Automated biometric login, geofencing, and route management</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-6">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <TabsTrigger 
                  key={tab.id} 
                  value={tab.id}
                  className="flex items-center gap-2 text-xs lg:text-sm"
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="space-y-6">
              {tab.component}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
};

export default DriverDashboard;