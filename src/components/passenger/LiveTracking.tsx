import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Navigation, Hospital, Plus } from "lucide-react";

const LiveTracking = () => {
  const [busLocation, setBusLocation] = useState({ lat: 30.7333, lng: 76.7794 }); // Chandigarh
  const [isTracking, setIsTracking] = useState(false);

  // Simulate bus movement
  useEffect(() => {
    if (isTracking) {
      const interval = setInterval(() => {
        setBusLocation(prev => ({
          lat: prev.lat + (Math.random() - 0.5) * 0.001,
          lng: prev.lng + (Math.random() - 0.5) * 0.001
        }));
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [isTracking]);

  const nearbyFacilities = [
    { name: "City Hospital", type: "Hospital", distance: "0.8 km", icon: Hospital },
    { name: "Metro Pharmacy", type: "Pharmacy", distance: "0.3 km", icon: Plus },
    { name: "Emergency Care Center", type: "Hospital", distance: "1.2 km", icon: Hospital },
    { name: "MedPlus", type: "Pharmacy", distance: "0.6 km", icon: Plus }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Live Bus Tracking
          </CardTitle>
          <CardDescription>
            Track your bus in real-time with nearby facilities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Bus Information</h4>
              <div className="space-y-1 text-sm">
                <p><span className="text-muted-foreground">Bus Number:</span> PB-10-AB-1234</p>
                <p><span className="text-muted-foreground">Route:</span> Ludhiana → Amritsar</p>
                <p><span className="text-muted-foreground">Driver:</span> Rajesh Kumar</p>
                <p><span className="text-muted-foreground">Next Stop:</span> Jalandhar (15 mins)</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Current Status</h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">On Time</Badge>
                  <span className="text-muted-foreground">Speed: 45 km/h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span>ETA: 3:45 PM</span>
                </div>
              </div>
            </div>
          </div>

          <Button 
            onClick={() => setIsTracking(!isTracking)}
            className={isTracking ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"}
          >
            {isTracking ? "Stop Tracking" : "Start Live Tracking"}
          </Button>
        </CardContent>
      </Card>

      {/* Map View */}
      <Card>
        <CardHeader>
          <CardTitle>Live Map View</CardTitle>
          <CardDescription>
            Real-time bus location with route and nearby facilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative h-96 bg-muted rounded-lg overflow-hidden border-2 border-dashed border-muted-foreground/20">
            {/* Map background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50"></div>
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d1d5db' fill-opacity='0.1'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20.5'/%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
            
            {/* Route line */}
            <svg className="absolute inset-0 w-full h-full">
              <path 
                d="M 50 200 Q 200 150 350 200" 
                stroke="#FF6B35" 
                strokeWidth="4" 
                fill="none"
                strokeDasharray="8,4"
              />
            </svg>
            
            {/* Bus marker */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className={`w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold ${isTracking ? 'animate-pulse' : ''}`}>
                  🚌
                </div>
                {isTracking && (
                  <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-30"></div>
                )}
              </div>
            </div>
            
            {/* Facility markers */}
            <div className="absolute top-16 left-20">
              <div className="w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">🏥</div>
            </div>
            <div className="absolute bottom-20 right-24">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">💊</div>
            </div>
            
            {/* Coordinates display */}
            <div className="absolute bottom-4 left-4 bg-white/90 px-2 py-1 rounded text-xs">
              Lat: {busLocation.lat.toFixed(4)}, Lng: {busLocation.lng.toFixed(4)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Nearby Facilities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-secondary" />
            Nearby Facilities
          </CardTitle>
          <CardDescription>
            Hospitals and pharmacies near current bus location
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nearbyFacilities.map((facility, index) => {
              const IconComponent = facility.icon;
              return (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className={`p-2 rounded-full ${facility.type === 'Hospital' ? 'bg-destructive/10' : 'bg-secondary/10'}`}>
                    <IconComponent className={`w-4 h-4 ${facility.type === 'Hospital' ? 'text-destructive' : 'text-secondary'}`} />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-sm">{facility.name}</h5>
                    <p className="text-xs text-muted-foreground">{facility.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium">{facility.distance}</p>
                    <Button size="sm" variant="outline" className="text-xs h-6 px-2 mt-1">
                      Directions
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LiveTracking;