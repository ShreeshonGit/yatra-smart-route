import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { LogOut, QrCode, Users, AlertTriangle, Ticket, Shield } from "lucide-react";
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
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
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