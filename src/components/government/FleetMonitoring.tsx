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
          <div className="relative h-96 bg-muted rounded-lg overflow-hidden border-2 border-dashed border-muted-foreground/20">
            {/* Map background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50"></div>
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d1d5db' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}></div>
            
            {/* Fleet markers */}
            <div className="absolute top-20 left-24">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs animate-pulse">🚌</div>
                <span className="text-xs bg-white px-1 rounded mt-1">Bus 1</span>
              </div>
            </div>
            
            <div className="absolute top-32 right-20">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs">🚌</div>
                <span className="text-xs bg-white px-1 rounded mt-1">Bus 2</span>
              </div>
            </div>
            
            <div className="absolute bottom-24 left-32">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs animate-pulse">🚌</div>
                <span className="text-xs bg-white px-1 rounded mt-1">Bus 3</span>
              </div>
            </div>
            
            {/* Facility markers */}
            <div className="absolute top-16 right-32">
              <div className="w-4 h-4 bg-red-400 rounded-full flex items-center justify-center text-white text-xs">🏥</div>
            </div>
            <div className="absolute bottom-20 right-24">
              <div className="w-4 h-4 bg-green-400 rounded-full flex items-center justify-center text-white text-xs">💊</div>
            </div>
            
            {/* Map title */}
            <div className="absolute top-4 left-4 bg-white/90 px-3 py-2 rounded-lg">
              <h3 className="text-sm font-semibold text-primary">Punjab Fleet Overview</h3>
              <p className="text-xs text-muted-foreground">3 Active Buses</p>
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