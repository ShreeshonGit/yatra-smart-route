import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, MapPin, Clock, Route, Download, Calendar } from "lucide-react";

const GPSLogbook = () => {
  const todayLogs = [
    {
      time: "02:30 PM",
      location: "Ludhiana Central Bus Stand",
      event: "Journey Started",
      coordinates: "30.9010, 75.8573",
      speed: "0 km/h",
      fuel: "95%"
    },
    {
      time: "02:45 PM", 
      location: "Model Town Chowk",
      event: "Passenger Pickup",
      coordinates: "30.9045, 75.8625",
      speed: "25 km/h",
      fuel: "94%"
    },
    {
      time: "03:15 PM",
      location: "Khanna Junction",
      event: "Route Diversion",
      coordinates: "30.7059, 76.2222",
      speed: "45 km/h",
      fuel: "91%"
    },
    {
      time: "03:45 PM",
      location: "Samrala Chowk",
      event: "Current Location",
      coordinates: "30.8359, 76.1924",
      speed: "40 km/h", 
      fuel: "89%"
    }
  ];

  const weeklyStats = {
    totalDistance: "1,247 km",
    totalTime: "28h 45m",
    avgSpeed: "43.4 km/h",
    fuelConsumed: "184 L",
    routeCompletion: "98.5%",
    onTimePerformance: "94%"
  };

  const previousJourneys = [
    {
      date: "Dec 3, 2024",
      route: "Amritsar → Ludhiana",
      distance: "145 km",
      duration: "3h 15m",
      status: "Completed"
    },
    {
      date: "Dec 2, 2024", 
      route: "Ludhiana → Bathinda",
      distance: "178 km",
      duration: "4h 05m",
      status: "Completed"
    },
    {
      date: "Dec 1, 2024",
      route: "Bathinda → Jalandhar",
      distance: "156 km",
      duration: "3h 40m",
      status: "Completed"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-primary" />
            Automated GPS Logbook
          </CardTitle>
          <CardDescription>
            Real-time GPS tracking with automated journey logging
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Journey Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <Route className="w-6 h-6 mx-auto mb-2 text-primary" />
              <div className="text-lg font-bold">145 km</div>
              <div className="text-sm text-muted-foreground">Today's Distance</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Clock className="w-6 h-6 mx-auto mb-2 text-secondary" />
              <div className="text-lg font-bold">1h 15m</div>
              <div className="text-sm text-muted-foreground">Journey Time</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <MapPin className="w-6 h-6 mx-auto mb-2 text-accent" />
              <div className="text-lg font-bold">89%</div>
              <div className="text-sm text-muted-foreground">Fuel Remaining</div>
            </div>
          </div>

          {/* Auto-generated Entry Notice */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">📍 Auto GPS Logging Active</h4>
            <p className="text-sm text-blue-700">
              All journey data is being automatically recorded via GPS module. No manual entry required.
              Location, speed, and route deviations are logged every 30 seconds.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Today's Journey Log */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Journey Log</CardTitle>
          <CardDescription>
            Automated entries from GPS tracking system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todayLogs.map((log, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h5 className="font-medium text-sm">{log.event}</h5>
                    <Badge variant="outline" className="text-xs">
                      Auto-logged
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{log.location}</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {log.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {log.coordinates}
                    </span>
                    <span>Speed: {log.speed}</span>
                    <span>Fuel: {log.fuel}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Performance Summary</CardTitle>
          <CardDescription>
            Automated performance metrics from GPS data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-3 border rounded-lg">
              <div className="text-lg font-bold text-primary">{weeklyStats.totalDistance}</div>
              <div className="text-xs text-muted-foreground">Total Distance</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-lg font-bold text-secondary">{weeklyStats.totalTime}</div>
              <div className="text-xs text-muted-foreground">Total Time</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-lg font-bold text-accent">{weeklyStats.avgSpeed}</div>
              <div className="text-xs text-muted-foreground">Avg Speed</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-lg font-bold text-warning">{weeklyStats.fuelConsumed}</div>
              <div className="text-xs text-muted-foreground">Fuel Used</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-lg font-bold text-green-600">{weeklyStats.routeCompletion}</div>
              <div className="text-xs text-muted-foreground">Route Completion</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-lg font-bold text-blue-600">{weeklyStats.onTimePerformance}</div>
              <div className="text-xs text-muted-foreground">On-Time Performance</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Previous Journeys */}
      <Card>
        <CardHeader>
          <CardTitle>Previous Journeys</CardTitle>
          <CardDescription>
            Historical journey data from GPS logbook
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {previousJourneys.map((journey, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-sm">{journey.route}</p>
                    <p className="text-xs text-muted-foreground">
                      {journey.date} • {journey.distance} • {journey.duration}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">{journey.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export Logbook Data</CardTitle>
          <CardDescription>
            Download GPS logbook data for compliance and reporting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-16 flex-col">
              <Download className="w-5 h-5 mb-2" />
              <span className="text-sm">Today's Log</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <Download className="w-5 h-5 mb-2" />
              <span className="text-sm">Weekly Report</span>
            </Button>
            <Button variant="outline" className="h-16 flex-col">
              <Download className="w-5 h-5 mb-2" />
              <span className="text-sm">Monthly Summary</span>
            </Button>
          </div>
          
          <div className="mt-4 p-3 bg-muted rounded-lg text-sm text-muted-foreground">
            <p><strong>Note:</strong> All GPS data is automatically backed up to government servers for compliance.
            Exported files include timestamps, coordinates, speed data, and route information.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GPSLogbook;