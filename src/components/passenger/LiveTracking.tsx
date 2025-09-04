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

      {/* Google Maps Simulation */}
      <Card>
        <CardHeader>
          <CardTitle>Live Map View</CardTitle>
          <CardDescription>
            Google Maps integration showing bus location and nearby facilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative h-64 bg-muted rounded-lg overflow-hidden">
            {/* Map placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 opacity-20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-sm text-muted-foreground">Google Maps View</p>
                <p className="text-xs text-muted-foreground">
                  Lat: {busLocation.lat.toFixed(4)}, Lng: {busLocation.lng.toFixed(4)}
                </p>
              </div>
            </div>
            
            {/* Animated bus marker */}
            {isTracking && (
              <div 
                className="absolute w-4 h-4 bg-primary rounded-full animate-pulse"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="absolute inset-0 bg-primary rounded-full animate-ping"></div>
              </div>
            )}
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