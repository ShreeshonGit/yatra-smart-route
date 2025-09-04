import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Map, Bus, MapPin, Clock } from "lucide-react";

const FleetMonitoring = () => {
  const fleetData = [
    { id: "PB-10-AB-1234", route: "Ludhiana → Amritsar", status: "On Route", passengers: 32, delay: 0 },
    { id: "PB-11-CD-2235", route: "Jalandhar → Bathinda", status: "Delayed", passengers: 28, delay: 15 },
    { id: "PB-12-EF-3236", route: "Patiala → Mohali", status: "On Time", passengers: 24, delay: 0 }
  ];

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
        <CardContent>
          <div className="relative h-96 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Live Fleet Map</h3>
              <p className="text-muted-foreground">Google Maps integration showing all active buses</p>
            </div>
          </div>
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