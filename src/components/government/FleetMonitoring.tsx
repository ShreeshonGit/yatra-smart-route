import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Map, Bus, MapPin, Clock } from "lucide-react";
import { Loader } from "@googlemaps/js-api-loader";

const FleetMonitoring = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [apiKey, setApiKey] = useState("");
  
  const fleetData = [
    { id: "PB-10-AB-1234", route: "Ludhiana → Amritsar", status: "On Route", passengers: 32, delay: 0, lat: 30.7333, lng: 76.7794 },
    { id: "PB-11-CD-2235", route: "Jalandhar → Bathinda", status: "Delayed", passengers: 28, delay: 15, lat: 31.3260, lng: 75.5762 },
    { id: "PB-12-EF-3236", route: "Patiala → Mohali", status: "On Time", passengers: 24, delay: 0, lat: 30.3398, lng: 76.3869 }
  ];

  // Initialize Google Maps for fleet monitoring
  useEffect(() => {
    const initFleetMap = async () => {
      if (!mapRef.current || !apiKey) return;

      try {
        const loader = new Loader({
          apiKey: apiKey,
          version: "weekly",
          libraries: ["places"]
        });

        const google = await loader.load();
        
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 30.7333, lng: 76.7794 }, // Punjab center
          zoom: 8,
          mapTypeControl: true,
          streetViewControl: false,
          fullscreenControl: true,
        });

        // Add markers for each bus in the fleet
        fleetData.forEach((bus, index) => {
          const busMarker = new google.maps.Marker({
            position: { lat: bus.lat, lng: bus.lng },
            map: map,
            title: `${bus.id} - ${bus.route}`,
            icon: {
              path: "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z",
              scale: 1,
              fillColor: bus.status === "On Time" || bus.status === "On Route" ? "#10B981" : "#EF4444",
              fillOpacity: 1,
              strokeColor: "#FFFFFF",
              strokeWeight: 2,
            },
            label: {
              text: (index + 1).toString(),
              color: "white",
              fontWeight: "bold",
              fontSize: "12px"
            }
          });

          // Add info window
          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div style="padding: 8px;">
                <strong>${bus.id}</strong><br>
                Route: ${bus.route}<br>
                Status: ${bus.status}<br>
                Passengers: ${bus.passengers}<br>
                ${bus.delay > 0 ? `Delay: ${bus.delay} mins` : 'On Schedule'}
              </div>
            `
          });

          busMarker.addListener("click", () => {
            infoWindow.open(map, busMarker);
          });
        });

        // Add sample hospitals and pharmacies
        const facilities = [
          { lat: 30.7350, lng: 76.7800, title: "Government Hospital", type: "hospital" },
          { lat: 31.3280, lng: 75.5780, title: "Civil Hospital Jalandhar", type: "hospital" },
          { lat: 30.3420, lng: 76.3890, title: "Max Hospital Mohali", type: "hospital" },
          { lat: 30.7320, lng: 76.7780, title: "Apollo Pharmacy", type: "pharmacy" },
          { lat: 31.3240, lng: 75.5740, title: "MedPlus Pharmacy", type: "pharmacy" },
        ];

        facilities.forEach(facility => {
          new google.maps.Marker({
            position: { lat: facility.lat, lng: facility.lng },
            map: map,
            title: facility.title,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 5,
              fillColor: facility.type === "hospital" ? "#EF4444" : "#10B981",
              fillOpacity: 0.8,
              strokeColor: "#FFFFFF",
              strokeWeight: 1,
            },
          });
        });

      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    if (apiKey) {
      initFleetMap();
    }
  }, [apiKey]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="w-5 h-5 text-primary" />
            Fleet Monitoring Dashboard
          </CardTitle>
          <CardDescription>Real-time monitoring of all buses in the fleet</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!apiKey ? (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Enter your Google Maps API key to view fleet monitoring:</p>
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Buses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {fleetData.map((bus) => (
              <div key={bus.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Bus className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">{bus.id}</p>
                    <p className="text-sm text-muted-foreground">{bus.route}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm">{bus.passengers} passengers</span>
                  <Badge variant={bus.status === "On Time" || bus.status === "On Route" ? "secondary" : "destructive"}>
                    {bus.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FleetMonitoring;