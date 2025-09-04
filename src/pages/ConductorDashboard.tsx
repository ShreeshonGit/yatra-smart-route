import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import { LogOut, QrCode, Users, AlertTriangle, Ticket, Shield } from "lucide-react";
=======
import { LogOut, QrCode, Users, AlertTriangle, Ticket, Shield, Map } from "lucide-react";
>>>>>>> 1764fde (changed Conductor page)
import saralYatraLogo from "/lovable-uploads/840dd5e2-0b9e-4979-a974-de75ae35b815.png";
import QRScanner from "@/components/conductor/QRScanner";
import OfflineBooking from "@/components/conductor/OfflineBooking";
import SeatManagement from "@/components/conductor/SeatManagement";
import EmergencyReporting from "@/components/conductor/EmergencyReporting";

const ConductorDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("scanner");

  const handleLogout = () => {
    navigate("/");
  };

  const tabs = [
    { 
      id: "scanner", 
      label: "QR Scanner", 
      icon: QrCode,
      component: <QRScanner />
    },
    { 
      id: "offline", 
      label: "Offline Booking", 
      icon: Ticket,
      component: <OfflineBooking />
    },
    { 
      id: "seats", 
      label: "Seat Management", 
      icon: Users,
      component: <SeatManagement />
    },
    { 
<<<<<<< HEAD
=======
      id: "map", 
      label: "Route Map", 
      icon: Map,
      component: (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Current Location</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-normal text-green-600">LIVE</span>
                </div>
              </CardTitle>
              <CardDescription>Monitor bus location and route progress in real-time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Live Tracking Status */}
                <div className="absolute top-4 left-4 z-10 bg-white border border-red-200 rounded-lg shadow-lg p-3 max-w-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-800">Bus Live Location</p>
                      <p className="text-xs text-green-600">Live tracking active</p>
                    </div>
                  </div>
                </div>

                {/* Map Container */}
                <div 
                  id="google-map" 
                  className="w-full h-96 bg-gray-100 rounded-lg border border-gray-300 relative overflow-hidden"
                  style={{ minHeight: '500px' }}
                >
                  {/* Map Placeholder with Enhanced Design */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
                    {/* Simulated Map Elements */}
                    <div className="absolute inset-0 opacity-20">
                      {/* Simulated Roads */}
                      <div className="absolute top-1/4 left-0 w-full h-1 bg-gray-400 transform -rotate-12"></div>
                      <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-400 transform rotate-6"></div>
                      <div className="absolute top-3/4 left-0 w-full h-1 bg-gray-400 transform -rotate-6"></div>
                      <div className="absolute top-0 left-1/4 w-1 h-full bg-gray-400 transform rotate-12"></div>
                      <div className="absolute top-0 left-1/2 w-1 h-full bg-gray-400 transform -rotate-6"></div>
                      <div className="absolute top-0 left-3/4 w-1 h-full bg-gray-400 transform rotate-6"></div>
                    </div>

                    {/* Central Bus Marker */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <div className="w-8 h-8 bg-red-500 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white"></div>
                      </div>
                    </div>

                    {/* Bus Stops */}
                    <div className="absolute top-1/3 left-1/4 w-4 h-4 bg-blue-500 rounded border border-white shadow"></div>
                    <div className="absolute top-2/3 left-1/3 w-4 h-4 bg-blue-500 rounded border border-white shadow"></div>
                    <div className="absolute top-1/2 left-2/3 w-4 h-4 bg-blue-500 rounded border border-white shadow"></div>
                    <div className="absolute top-3/4 left-3/4 w-4 h-4 bg-blue-500 rounded border border-white shadow"></div>

                    {/* Points of Interest */}
                    <div className="absolute top-1/6 left-1/6 w-3 h-3 bg-green-500 rounded-full border border-white shadow"></div>
                    <div className="absolute top-1/5 right-1/4 w-3 h-3 bg-orange-500 rounded-full border border-white shadow"></div>
                    <div className="absolute bottom-1/4 left-1/5 w-3 h-3 bg-pink-500 rounded-full border border-white shadow"></div>

                    {/* Zoom Controls */}
                    <div className="absolute top-4 right-4 bg-white rounded shadow-lg">
                      <button className="block w-8 h-8 border-b border-gray-200 flex items-center justify-center hover:bg-gray-50">
                        <span className="text-lg font-bold">+</span>
                      </button>
                      <button className="block w-8 h-8 flex items-center justify-center hover:bg-gray-50">
                        <span className="text-lg font-bold">−</span>
                      </button>
                    </div>

                    {/* Map Attribution */}
                    <div className="absolute bottom-2 left-2 text-xs text-gray-500 bg-white/80 px-2 py-1 rounded">
                      Map data ©2025
                    </div>
                  </div>

                  {/* Overlay Content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg max-w-md">
                      <Map className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                      <h3 className="text-xl font-bold text-gray-800 mb-2">Live Bus Tracking</h3>
                      <p className="text-gray-600 mb-4">
                        Real-time location tracking with bus stops, routes, and points of interest
                      </p>
                      <div className="space-y-2 text-sm text-gray-500">
                        <p>• Live bus location marker (red)</p>
                        <p>• Bus stops along route (blue)</p>
                        <p>• Points of interest (colored markers)</p>
                        <p>• Real-time tracking status</p>
                      </div>
                      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs text-blue-700">
                          <strong>To enable full functionality:</strong><br />
                          Add your Google Maps API key and implement the map component
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Route Information */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm font-medium">Current Location</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Ashok Marg, Park Rd</p>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span className="text-sm font-medium">Next Stop</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Lucknow Zoo (2.3 km)</p>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium">ETA</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">8 minutes</p>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    },
    { 
>>>>>>> 1764fde (changed Conductor page)
      id: "emergency", 
      label: "Emergency", 
      icon: AlertTriangle,
      component: <EmergencyReporting />
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
              <p className="text-muted-foreground text-xs">Conductor Portal</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span className="text-sm">Employee ID: COND001</span>
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
          <h2 className="text-2xl font-bold text-accent mb-2">Conductor Dashboard</h2>
          <p className="text-muted-foreground">Manage tickets, seat allocation, and passenger safety</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
<<<<<<< HEAD
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
=======
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
>>>>>>> 1764fde (changed Conductor page)
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

export default ConductorDashboard;