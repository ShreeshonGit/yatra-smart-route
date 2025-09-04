import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Navigation, Clock, Route, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TrafficAlerts = () => {
  const { toast } = useToast();
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [currentAlert, setCurrentAlert] = useState(null);

  // Simulate real-time traffic alerts
  useEffect(() => {
    if (alertsEnabled) {
      const interval = setInterval(() => {
        // Simulate random traffic alert
        if (Math.random() > 0.7) {
          const alerts = [
            {
              id: Date.now(),
              type: "Heavy Traffic",
              location: "NH3 near Jalandhar Bypass",
              severity: "high",
              delay: "15-20 minutes",
              suggestion: "Take alternate route via Nakodar Road"
            },
            {
              id: Date.now(),
              type: "Road Construction",
              location: "GT Road Ludhiana",
              severity: "medium",
              delay: "5-10 minutes", 
              suggestion: "Slow down and follow traffic signals"
            },
            {
              id: Date.now(),
              type: "Accident Reported",
              location: "Amritsar-Jalandhar Highway",
              severity: "high",
              delay: "25-30 minutes",
              suggestion: "Reroute via Tarn Taran Road immediately"
            }
          ];
          
          const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
          setCurrentAlert(randomAlert);
          
          // Show toast notification with beep sound
          toast({
            title: "🚨 Traffic Alert!",
            description: `${randomAlert.type} at ${randomAlert.location}`,
            variant: "destructive"
          });
        }
      }, 10000); // Check every 10 seconds

      return () => clearInterval(interval);
    }
  }, [alertsEnabled, toast]);

  const recentAlerts = [
    {
      id: 1,
      type: "Heavy Traffic",
      location: "Doraha Chowk",
      time: "2:45 PM",
      status: "Active",
      severity: "high"
    },
    {
      id: 2,
      type: "Road Construction",
      location: "Jalandhar Cantt",
      time: "2:30 PM",
      status: "Resolved",
      severity: "medium"
    },
    {
      id: 3,
      type: "Weather Alert",
      location: "Amritsar Bypass",
      time: "2:15 PM",
      status: "Active",
      severity: "low"
    },
    {
      id: 4,
      type: "Accident",
      location: "GT Road Phagwara",
      time: "1:55 PM",
      status: "Cleared",
      severity: "high"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const handleDismissAlert = () => {
    setCurrentAlert(null);
  };

  return (
    <div className="space-y-6">
      {/* Active Alert Banner */}
      {currentAlert && (
        <Card className="border-destructive bg-destructive/5">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
              TRAFFIC ALERT - IMMEDIATE ACTION REQUIRED
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-destructive">{currentAlert.type}</h4>
                <p className="text-sm text-muted-foreground">{currentAlert.location}</p>
                <p className="text-sm"><strong>Expected Delay:</strong> {currentAlert.delay}</p>
              </div>
              <div>
                <h5 className="font-medium text-sm mb-1">Suggested Action:</h5>
                <p className="text-sm bg-warning/10 p-2 rounded border border-warning/30">
                  {currentAlert.suggestion}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" className="bg-warning hover:bg-warning/90">
                <Navigation className="w-4 h-4 mr-2" />
                View Alternate Route
              </Button>
              <Button size="sm" variant="outline" onClick={handleDismissAlert}>
                Dismiss Alert
              </Button>
              <Button size="sm" variant="outline">
                <Volume2 className="w-4 h-4 mr-2" />
                Play Audio Alert
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-primary" />
            Traffic Alert System
          </CardTitle>
          <CardDescription>
            Real-time traffic monitoring and route optimization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Alert Controls */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <h4 className="font-medium">Alert Notifications</h4>
              <p className="text-sm text-muted-foreground">
                Get real-time traffic updates with audio alerts
              </p>
            </div>
            <Button 
              variant={alertsEnabled ? "destructive" : "default"}
              onClick={() => setAlertsEnabled(!alertsEnabled)}
            >
              {alertsEnabled ? "Disable Alerts" : "Enable Alerts"}
            </Button>
          </div>

          {/* Traffic Status Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center">
                <Route className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-lg font-bold text-green-600">Normal</div>
              <div className="text-sm text-muted-foreground">Current Route</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 mx-auto mb-2 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-lg font-bold text-yellow-600">5 min</div>
              <div className="text-sm text-muted-foreground">Avg Delay</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                <Navigation className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-lg font-bold text-blue-600">2</div>
              <div className="text-sm text-muted-foreground">Alternate Routes</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Traffic Alerts</CardTitle>
          <CardDescription>Monitor recent traffic conditions and incidents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className={`w-4 h-4 ${
                    alert.severity === 'high' ? 'text-destructive' :
                    alert.severity === 'medium' ? 'text-warning' :
                    'text-muted-foreground'
                  }`} />
                  <div>
                    <p className="font-medium text-sm">{alert.type}</p>
                    <p className="text-xs text-muted-foreground">
                      {alert.location} • {alert.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getSeverityColor(alert.severity)}>
                    {alert.severity.toUpperCase()}
                  </Badge>
                  <Badge 
                    variant={alert.status === 'Active' ? 'destructive' : 'secondary'}
                    className="text-xs"
                  >
                    {alert.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Route Alternatives */}
      <Card>
        <CardHeader>
          <CardTitle>Suggested Route Alternatives</CardTitle>
          <CardDescription>Alternative routes to avoid traffic congestion</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-4 border rounded-lg border-green-200 bg-green-50">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-green-800">Recommended Route</h4>
                <Badge variant="secondary">Fastest</Badge>
              </div>
              <p className="text-sm text-green-700">
                Via NH3 → Doraha → Jalandhar → Kapurthala → Amritsar
              </p>
              <div className="flex gap-4 text-xs text-green-600 mt-2">
                <span>Distance: 145 km</span>
                <span>Est. Time: 3h 15m</span>
                <span>Traffic: Light</span>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Alternative Route 1</h4>
                <Badge variant="secondary">Moderate Traffic</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Via GT Road → Phagwara → Nakodar → Jalandhar → Amritsar
              </p>
              <div className="flex gap-4 text-xs text-muted-foreground mt-2">
                <span>Distance: 158 km</span>
                <span>Est. Time: 3h 45m</span>
                <span>Traffic: Moderate</span>
              </div>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">Alternative Route 2</h4>
                <Badge variant="destructive">Heavy Traffic</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Via Ludhiana Bypass → Khanna → Samrala → Jalandhar → Amritsar
              </p>
              <div className="flex gap-4 text-xs text-muted-foreground mt-2">
                <span>Distance: 162 km</span>
                <span>Est. Time: 4h 10m</span>
                <span>Traffic: Heavy</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrafficAlerts;