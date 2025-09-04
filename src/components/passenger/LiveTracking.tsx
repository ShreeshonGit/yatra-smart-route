import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Navigation, Hospital, Plus } from "lucide-react";
import { Loader } from "@googlemaps/js-api-loader";

const LiveTracking = () => {
  const [busLocation, setBusLocation] = useState({ lat: 30.7333, lng: 76.7794 }); // Chandigarh
  const [isTracking, setIsTracking] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const busMarkerRef = useRef<google.maps.Marker | null>(null);
  const [apiKey, setApiKey] = useState("");

  // Initialize Google Maps
  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current || !apiKey) return;

      try {
        const loader = new Loader({
          apiKey: apiKey,
          version: "weekly",
          libraries: ["places"]
        });

        const google = await loader.load();
        
        const map = new google.maps.Map(mapRef.current, {
          center: busLocation,
          zoom: 14,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });

        mapInstanceRef.current = map;

        // Add bus marker
        const busMarker = new google.maps.Marker({
          position: busLocation,
          map: map,
          title: "Bus Location",
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#3B82F6",
            fillOpacity: 1,
            strokeColor: "#1E40AF",
            strokeWeight: 2,
          },
        });

        busMarkerRef.current = busMarker;

        // Add route polyline
        const routePath = [
          { lat: 30.9000, lng: 75.8573 }, // Ludhiana
          { lat: 30.7333, lng: 76.7794 }, // Current position
          { lat: 31.6340, lng: 74.8723 }  // Amritsar
        ];

        new google.maps.Polyline({
          path: routePath,
          geodesic: true,
          strokeColor: "#FF6B35",
          strokeOpacity: 1.0,
          strokeWeight: 4,
          map: map,
        });

        // Add nearby facilities
        const facilities = [
          { lat: 30.7350, lng: 76.7800, title: "City Hospital", type: "hospital" },
          { lat: 30.7320, lng: 76.7780, title: "Metro Pharmacy", type: "pharmacy" },
        ];

        facilities.forEach(facility => {
          new google.maps.Marker({
            position: { lat: facility.lat, lng: facility.lng },
            map: map,
            title: facility.title,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 6,
              fillColor: facility.type === "hospital" ? "#EF4444" : "#10B981",
              fillOpacity: 1,
              strokeColor: "#FFFFFF",
              strokeWeight: 2,
            },
          });
        });

      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    if (apiKey) {
      initMap();
    }
  }, [apiKey, busLocation]);

  // Simulate bus movement
  useEffect(() => {
    if (isTracking) {
      const interval = setInterval(() => {
        setBusLocation(prev => {
          const newLocation = {
            lat: prev.lat + (Math.random() - 0.5) * 0.001,
            lng: prev.lng + (Math.random() - 0.5) * 0.001
          };

          // Update bus marker position
          if (busMarkerRef.current) {
            busMarkerRef.current.setPosition(newLocation);
          }

          return newLocation;
        });
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

      {/* Google Maps Integration */}
      <Card>
        <CardHeader>
          <CardTitle>Live Map View</CardTitle>
          <CardDescription>
            Google Maps integration showing bus location and nearby facilities
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!apiKey ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Enter your Google Maps API key to view live tracking:</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Google Maps API Key"
                  className="flex-1 px-3 py-2 border rounded-md text-sm"
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <Button size="sm">Load Map</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Get your API key from <a href="https://console.cloud.google.com/google/maps-apis" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Cloud Console</a>
              </p>
            </div>
          ) : (
            <div 
              ref={mapRef} 
              className="w-full h-96 rounded-lg border"
              style={{ minHeight: '400px' }}
            />
          )}
          
          {apiKey && (
            <div className="text-xs text-muted-foreground text-center">
              Live Location: {busLocation.lat.toFixed(4)}, {busLocation.lng.toFixed(4)}
            </div>
          )}
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