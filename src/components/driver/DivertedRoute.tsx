import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Route, MapPin, Clock, Navigation, AlertCircle, CheckCircle } from "lucide-react";

const DivertedRoute = () => {
  const [isDiverted, setIsDiverted] = useState(true);
  const [showDiversionDetails, setShowDiversionDetails] = useState(false);

  const diversionInfo = {
    reason: "Heavy traffic congestion on NH3",
    originalRoute: "Ludhiana → Doraha → Jalandhar → Amritsar",
    divertedRoute: "Ludhiana → Khanna → Samrala → Jalandhar → Amritsar", 
    additionalDistance: "17 km",
    additionalTime: "25 minutes",
    fuelImpact: "₹85 extra",
    startedAt: "3:15 PM",
    expectedCompletion: "6:45 PM"
  };

  const routeSteps = [
    { step: 1, location: "Ludhiana Central", status: "completed", time: "2:30 PM" },
    { step: 2, location: "Khanna Junction", status: "completed", time: "3:15 PM" },
    { step: 3, location: "Samrala Chowk", status: "current", time: "3:45 PM" },
    { step: 4, location: "Jalandhar Bypass", status: "upcoming", time: "4:30 PM" },
    { step: 5, location: "Kapurthala", status: "upcoming", time: "5:15 PM" },
    { step: 6, location: "Amritsar", status: "upcoming", time: "6:45 PM" }
  ];

  return (
    <div className="space-y-6">
      {/* Diversion Status Alert */}
      {isDiverted && (
        <Card className="border-warning bg-warning/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-warning">
              <AlertCircle className="w-5 h-5 animate-pulse" />
              ROUTE DIVERSION ACTIVE
            </CardTitle>
            <CardDescription>
              Bus has been diverted from original route due to traffic conditions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-warning mb-2">Diversion Details</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Reason:</span> {diversionInfo.reason}</p>
                  <p><span className="text-muted-foreground">Started:</span> {diversionInfo.startedAt}</p>
                  <p><span className="text-muted-foreground">Extra Distance:</span> {diversionInfo.additionalDistance}</p>
                  <p><span className="text-muted-foreground">Extra Time:</span> {diversionInfo.additionalTime}</p>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-warning mb-2">Impact Assessment</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="text-muted-foreground">Fuel Cost:</span> {diversionInfo.fuelImpact}</p>
                  <p><span className="text-muted-foreground">New ETA:</span> {diversionInfo.expectedCompletion}</p>
                  <p><span className="text-muted-foreground">Passengers Notified:</span> Yes</p>
                  <p><span className="text-muted-foreground">Status:</span> <Badge variant="destructive">Active Diversion</Badge></p>
                </div>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setShowDiversionDetails(!showDiversionDetails)}
            >
              {showDiversionDetails ? "Hide" : "Show"} Detailed Route Map
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Route className="w-5 h-5 text-primary" />
            Diverted Route Navigation
          </CardTitle>
          <CardDescription>
            Visual representation of the current diverted route
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Route Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg bg-muted/50">
              <h4 className="font-medium mb-2 text-muted-foreground">Original Route</h4>
              <p className="text-sm text-muted-foreground">{diversionInfo.originalRoute}</p>
              <div className="flex gap-4 text-xs text-muted-foreground mt-2">
                <span>Distance: 145 km</span>
                <span>Time: 3h 15m</span>
              </div>
            </div>
            <div className="p-4 border rounded-lg bg-primary/5 border-primary/30">
              <h4 className="font-medium mb-2 text-primary">Current Diverted Route</h4>
              <p className="text-sm">{diversionInfo.divertedRoute}</p>
              <div className="flex gap-4 text-xs text-muted-foreground mt-2">
                <span>Distance: 162 km (+{diversionInfo.additionalDistance})</span>
                <span>Time: 3h 40m (+{diversionInfo.additionalTime})</span>
              </div>
            </div>
          </div>

          {/* Detailed Map View */}
          {showDiversionDetails && (
            <div className="relative h-96 bg-muted rounded-lg overflow-hidden border">
              {/* Map placeholder with route visualization */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100"></div>
              
              {/* Route lines */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
                {/* Original route (dashed) */}
                <path 
                  d="M 50 250 Q 200 150 350 50" 
                  stroke="#9CA3AF" 
                  strokeWidth="3" 
                  strokeDasharray="10,5" 
                  fill="none"
                  opacity="0.6"
                />
                {/* Diverted route (solid) */}
                <path 
                  d="M 50 250 Q 150 200 Q 250 180 Q 300 100 350 50" 
                  stroke="#EF4444" 
                  strokeWidth="4" 
                  fill="none"
                />
                
                {/* Route markers */}
                <circle cx="50" cy="250" r="8" fill="#10B981" />
                <circle cx="150" cy="200" r="6" fill="#F59E0B" />
                <circle cx="250" cy="180" r="6" fill="#3B82F6" />
                <circle cx="350" cy="50" r="8" fill="#EF4444" />
              </svg>
              
              {/* Location labels */}
              <div className="absolute bottom-4 left-4 bg-white/90 p-2 rounded shadow text-xs">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Ludhiana (Start)</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>Amritsar (Destination)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-px bg-gray-400" style={{borderStyle: 'dashed'}}></div>
                  <span>Original Route</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-px bg-red-500"></div>
                  <span>Diverted Route</span>
                </div>
              </div>
              
              {/* Current location */}
              <div className="absolute" style={{left: '250px', top: '180px'}}>
                <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                <div className="absolute -bottom-6 -left-8 bg-blue-500 text-white px-2 py-1 rounded text-xs">
                  Current
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Route Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Diverted Route Progress</CardTitle>
          <CardDescription>Step-by-step progress through the alternative route</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {routeSteps.map((step) => (
              <div key={step.step} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                    step.status === 'completed' ? 'bg-green-100 text-green-800' :
                    step.status === 'current' ? 'bg-blue-100 text-blue-800' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    {step.status === 'completed' ? <CheckCircle className="w-4 h-4" /> :
                     step.status === 'current' ? <MapPin className="w-4 h-4" /> :
                     step.step}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{step.location}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {step.time}
                    </p>
                  </div>
                </div>
                
                <div className="ml-auto">
                  <Badge 
                    variant={
                      step.status === 'completed' ? 'secondary' :
                      step.status === 'current' ? 'default' :
                      'outline'
                    }
                    className="text-xs"
                  >
                    {step.status === 'completed' ? 'Passed' :
                     step.status === 'current' ? 'Current' :
                     'Upcoming'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Passenger Communication */}
      <Card>
        <CardHeader>
          <CardTitle>Passenger Communication</CardTitle>
          <CardDescription>Automatic notifications sent to affected passengers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-800">SMS Notification Sent</span>
              </div>
              <p className="text-sm text-blue-700">
                "Your bus PB-10-AB-1234 has been diverted due to traffic. New ETA: 6:45 PM. Track live location in app."
              </p>
            </div>
            
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-800">App Push Notification</span>
              </div>
              <p className="text-sm text-green-700">
                All passengers have been notified via mobile app with updated live tracking.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="text-center p-3 border rounded-lg">
                <div className="text-lg font-bold text-blue-600">32</div>
                <div className="text-xs text-muted-foreground">Passengers Notified</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-lg font-bold text-green-600">28</div>
                <div className="text-xs text-muted-foreground">SMS Delivered</div>
              </div>
              <div className="text-center p-3 border rounded-lg">
                <div className="text-lg font-bold text-purple-600">25</div>
                <div className="text-xs text-muted-foreground">App Notifications</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DivertedRoute;