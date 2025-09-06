import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Play, Square, Clock, Navigation } from "lucide-react";

const GeofencingSystem = () => {
  const [tripStatus, setTripStatus] = useState<'at_depot' | 'in_transit' | 'returning'>('at_depot');
  const [currentLocation, setCurrentLocation] = useState("Main Depot");
  const [tripStartTime, setTripStartTime] = useState<Date | null>(null);
  const [isInGeofence, setIsInGeofence] = useState(true);

  // Simulate geofencing detection
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate bus movement and geofencing
      if (tripStatus === 'at_depot') {
        // Simulate leaving depot
        if (Math.random() > 0.7) {
          setTripStatus('in_transit');
          setTripStartTime(new Date());
          setCurrentLocation("Route 12 - Ludhiana Road");
          setIsInGeofence(false);
        }
      } else if (tripStatus === 'in_transit') {
        // Simulate route progression
        const locations = [
          "Route 12 - Ludhiana Road",
          "Bus Stop - City Center",
          "Route 12 - Mall Road",
          "Bus Stop - Railway Station",
          "Route 12 - GT Road",
          "Returning to Depot"
        ];
        const currentIndex = locations.indexOf(currentLocation);
        if (currentIndex < locations.length - 1) {
          setCurrentLocation(locations[currentIndex + 1]);
        }
        
        // Simulate returning to depot
        if (currentLocation === "Returning to Depot" && Math.random() > 0.8) {
          setTripStatus('at_depot');
          setCurrentLocation("Main Depot");
          setIsInGeofence(true);
          setTripStartTime(null);
        }
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [tripStatus, currentLocation]);

  const getTripDuration = () => {
    if (!tripStartTime) return "00:00:00";
    const duration = new Date().getTime() - tripStartTime.getTime();
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((duration % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-primary" />
            Automated Trip Management
          </CardTitle>
          <CardDescription>
            Geofencing-based automatic trip start/stop system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Current Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-3 h-3 rounded-full ${
                  tripStatus === 'at_depot' ? 'bg-gray-500' : 
                  tripStatus === 'in_transit' ? 'bg-green-500 animate-pulse' : 'bg-blue-500'
                }`}></div>
                <span className="text-sm font-medium">Trip Status</span>
              </div>
              <Badge variant={tripStatus === 'in_transit' ? 'default' : 'secondary'}>
                {tripStatus === 'at_depot' ? 'At Depot' : 
                 tripStatus === 'in_transit' ? 'In Transit' : 'Returning'}
              </Badge>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-3 h-3 text-muted-foreground" />
                <span className="text-sm font-medium">Current Location</span>
              </div>
              <p className="text-sm text-muted-foreground">{currentLocation}</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-sm font-medium">Trip Duration</span>
              </div>
              <p className="text-sm font-mono">{getTripDuration()}</p>
            </Card>
          </div>

          {/* Geofence Visualization */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Geofence Monitor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border overflow-hidden">
                {/* Depot Geofence */}
                <div className="absolute top-1/2 left-20 transform -translate-y-1/2">
                  <div className={`w-16 h-16 rounded-full border-4 border-dashed ${
                    isInGeofence ? 'border-green-500 bg-green-100' : 'border-gray-300 bg-gray-100'
                  } flex items-center justify-center`}>
                    <div className="text-xs text-center font-medium">
                      Main<br/>Depot
                    </div>
                  </div>
                </div>

                {/* Route Path */}
                <svg className="absolute inset-0 w-full h-full">
                  <path 
                    d="M 100 128 Q 200 100 300 128 Q 400 156 480 128" 
                    stroke="#3B82F6" 
                    strokeWidth="3" 
                    fill="none"
                    strokeDasharray="8,4"
                  />
                </svg>

                {/* Bus Position */}
                <div className={`absolute transition-all duration-1000 ${
                  tripStatus === 'at_depot' ? 'top-1/2 left-20' :
                  tripStatus === 'in_transit' ? 'top-1/2 left-1/2' : 'top-1/2 left-20'
                } transform -translate-x-1/2 -translate-y-1/2`}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs ${
                    tripStatus === 'in_transit' ? 'bg-green-500 animate-pulse' : 'bg-blue-500'
                  }`}>
                    🚌
                  </div>
                </div>

                {/* Status Display */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      tripStatus === 'in_transit' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'
                    }`}></div>
                    <span className="text-sm font-medium">
                      {tripStatus === 'at_depot' ? 'Geofence: Inside Depot' :
                       tripStatus === 'in_transit' ? 'Geofence: On Route' : 'Geofence: Returning'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trip History */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Trip Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { time: "14:30:15", action: "Trip Started", location: "Main Depot", status: "auto" },
                  { time: "14:35:22", action: "Left Geofence", location: "Depot Exit", status: "auto" },
                  { time: "15:45:33", action: "Returned to Depot", location: "Main Depot", status: "auto" },
                  { time: "15:46:01", action: "Trip Ended", location: "Main Depot", status: "auto" }
                ].map((log, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        {log.action.includes('Started') ? 
                          <Play className="w-4 h-4 text-green-500" /> :
                          <Square className="w-4 h-4 text-red-500" />
                        }
                      </div>
                      <div>
                        <p className="font-medium text-sm">{log.action}</p>
                        <p className="text-xs text-muted-foreground">{log.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-mono">{log.time}</p>
                      <Badge variant="outline" className="text-xs">
                        Auto
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Info */}
          <div className="bg-blue-50 rounded-lg p-3">
            <h5 className="font-medium text-blue-800 mb-2">Geofencing Features:</h5>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Automatic trip start when leaving depot geofence</li>
              <li>• Automatic trip stop when entering depot geofence</li>
              <li>• Real-time location tracking and logging</li>
              <li>• No manual start/stop buttons required</li>
              <li>• Trip data automatically sent to all portals</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeofencingSystem;