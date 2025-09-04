import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { LogOut, Phone, MessageSquare, Map, Calendar, CreditCard, Ticket } from "lucide-react";
import saralYatraLogo from "/lovable-uploads/840dd5e2-0b9e-4979-a974-de75ae35b815.png";
import TicketBooking from "@/components/passenger/TicketBooking";
import LiveTracking from "@/components/passenger/LiveTracking";
import SchedulesRoutes from "@/components/passenger/SchedulesRoutes";
import AIAssistant from "@/components/passenger/AIAssistant";
import PaymentPage from "@/components/passenger/PaymentPage";

const PassengerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("booking");
  const [bookingData, setBookingData] = useState(null);

  const handleLogout = () => {
    navigate("/");
  };

  const tabs = [
    { 
      id: "booking", 
      label: "Ticket Booking", 
      icon: Ticket,
      component: <TicketBooking onBookingComplete={setBookingData} />
    },
    { 
      id: "tracking", 
      label: "Live Tracking", 
      icon: Map,
      component: <LiveTracking />
    },
    { 
      id: "schedules", 
      label: "Schedules & Routes", 
      icon: Calendar,
      component: <SchedulesRoutes />
    },
    { 
      id: "assistant", 
      label: "AI Assistant", 
      icon: MessageSquare,
      component: <AIAssistant />
    },
    { 
      id: "payment", 
      label: "Payment", 
      icon: CreditCard,
      component: <PaymentPage bookingData={bookingData} />
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
              <p className="text-muted-foreground text-xs">Passenger Portal</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span className="text-sm">Helpline: XXXXXXXXXX</span>
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
          <h2 className="text-2xl font-bold text-accent mb-2">Welcome to Your Dashboard</h2>
          <p className="text-muted-foreground">Manage your travel bookings and track your journey</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
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

export default PassengerDashboard;