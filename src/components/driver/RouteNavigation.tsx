import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Navigation, MapPin, Clock, Route, Fuel, Gauge } from "lucide-react";

const RouteNavigation = () => {
  const [currentRoute, setCurrentRoute] = useState("Ludhiana → Amritsar");
  const [navigationActive, setNavigationActive] = useState(true);

  const routeInfo = {
    origin: "Ludhiana Central Bus Stand",
    destination: "Amritsar Railway Station",
    totalDistance: "145 km",
    estimatedTime: "3h 15m",
    currentProgress: "45%",
    nextStop: "Jalandhar (12 km)",
    fuelRemaining: "78%",
    currentSpeed: "62 km/h"
  };

  const waypoints = [
    { name: "Ludhiana Central", time: "02:30 PM", status: "completed", distance: "0 km" },
    { name: "Doraha", time: "02:55 PM", status: "completed", distance: "25 km" },
    { name: "Jalandhar", time: "03:45 PM", status: "current", distance: "57 km" },
    { name: "Kapurthala", time: "04:20 PM", status: "upcoming", distance: "95 km" },
    { name: "Tarn Taran", time: "04:50 PM", status: "upcoming", distance: "125 km" },
    { name: "Amritsar", time: "05:45 PM", status: "upcoming", distance: "145 km" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-primary" />
            Route Navigation
          </CardTitle>
          <CardDescription>
            Real-time navigation and route guidance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Route Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-3 border rounded-lg">
              <Route className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-sm font-medium">{routeInfo.totalDistance}</div>
              <div className="text-xs text-muted-foreground">Total Distance</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <Clock className="w-6 h-6 mx-auto mb-2 text-secondary" />
              <div className="text-sm font-medium">{routeInfo.estimatedTime}</div>
              <div className="text-xs text-muted-foreground">Est. Time</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <Gauge className="w-6 h-6 mx-auto mb-2 text-accent" />
              <div className="text-sm font-medium">{routeInfo.currentSpeed}</div>
              <div className="text-xs text-muted-foreground">Current Speed</div>
            </div>
          </div>

          {/* Navigation Status */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <h4 className="font-medium">Navigation Status</h4>
              <p className="text-sm text-muted-foreground">
                Progress: {routeInfo.currentProgress} • Next: {routeInfo.nextStop}
              </p>
            </div>
            <Button 
              variant={navigationActive ? "destructive" : "default"}
              onClick={() => setNavigationActive(!navigationActive)}
            >
              {navigationActive ? "Stop Navigation" : "Start Navigation"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Google Maps View */}
      <Card>
        <CardHeader>
          <CardTitle>Live Navigation Map</CardTitle>
          <CardDescription>
            Google Maps integration with real-time location
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative h-80 bg-muted rounded-lg overflow-hidden">
            {/* Map placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-green-500 opacity-30"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <MapPin className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Google Maps Navigation</h3>
                <p className="text-sm opacity-90">Real-time route guidance</p>
                <p className="text-xs opacity-75 mt-1">Ludhiana → Amritsar via NH3</p>
              </div>
            </div>
            
            {/* Live location indicator */}
            {navigationActive && (
              <div className="absolute bottom-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm animate-pulse">
                📍 Live Location Active
              </div>
            )}

            {/* Navigation controls */}
            <div className="absolute top-4 right-4 space-y-2">
              <Button size="sm" variant="secondary">Zoom In</Button>
              <Button size="sm" variant="secondary">Center</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Route Waypoints */}
      <Card>
        <CardHeader>
          <CardTitle>Route Waypoints</CardTitle>
          <CardDescription>Progress through scheduled stops</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {waypoints.map((waypoint, index) => (
              <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className={`w-3 h-3 rounded-full ${
                  waypoint.status === 'completed' ? 'bg-green-500' :
                  waypoint.status === 'current' ? 'bg-primary animate-pulse' :
                  'bg-muted-foreground'
                }`}></div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h5 className="font-medium">{waypoint.name}</h5>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant={
                          waypoint.status === 'completed' ? 'secondary' :
                          waypoint.status === 'current' ? 'default' :
                          'outline'
                        }
                      >
                        {waypoint.status === 'completed' ? 'Passed' :
                         waypoint.status === 'current' ? 'Current' :
                         'Upcoming'}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {waypoint.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <Route className="w-3 h-3" />
                      {waypoint.distance}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Status */}
      <Card>
        <CardHeader>
          <CardTitle>Vehicle Status</CardTitle>
          <CardDescription>Monitor bus condition and fuel levels</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 border rounded-lg">
              <Fuel className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <div className="text-sm font-medium">{routeInfo.fuelRemaining}</div>
              <div className="text-xs text-muted-foreground">Fuel Level</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="w-6 h-6 mx-auto mb-2 bg-green-500 rounded-full"></div>
              <div className="text-sm font-medium">Normal</div>
              <div className="text-xs text-muted-foreground">Engine</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="w-6 h-6 mx-auto mb-2 bg-green-500 rounded-full"></div>
              <div className="text-sm font-medium">Good</div>
              <div className="text-xs text-muted-foreground">Brakes</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="w-6 h-6 mx-auto mb-2 bg-green-500 rounded-full"></div>
              <div className="text-sm font-medium">37°C</div>
              <div className="text-xs text-muted-foreground">AC Temperature</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RouteNavigation;