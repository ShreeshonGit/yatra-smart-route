import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, ArrowRight, Calendar } from "lucide-react";

const SchedulesRoutes = () => {
  const routes = [
    {
      id: 1,
      route: "Ludhiana → Amritsar",
      buses: [
        { time: "06:00 AM", arrival: "09:30 AM", busNo: "PB-10-AB-1234", status: "On Time" },
        { time: "08:30 AM", arrival: "12:00 PM", busNo: "PB-10-AB-1235", status: "Delayed 15 min" },
        { time: "11:00 AM", arrival: "02:30 PM", busNo: "PB-10-AB-1236", status: "On Time" },
        { time: "02:00 PM", arrival: "05:30 PM", busNo: "PB-10-AB-1237", status: "On Time" },
        { time: "05:00 PM", arrival: "08:30 PM", busNo: "PB-10-AB-1238", status: "On Time" }
      ]
    },
    {
      id: 2,
      route: "Jalandhar → Bathinda",
      buses: [
        { time: "07:00 AM", arrival: "11:45 AM", busNo: "PB-11-CD-2234", status: "On Time" },
        { time: "10:00 AM", arrival: "02:45 PM", busNo: "PB-11-CD-2235", status: "On Time" },
        { time: "01:00 PM", arrival: "05:45 PM", busNo: "PB-11-CD-2236", status: "Delayed 10 min" },
        { time: "04:00 PM", arrival: "08:45 PM", busNo: "PB-11-CD-2237", status: "On Time" }
      ]
    },
    {
      id: 3,
      route: "Patiala → Mohali",
      buses: [
        { time: "06:30 AM", arrival: "08:15 AM", busNo: "PB-12-EF-3234", status: "On Time" },
        { time: "09:00 AM", arrival: "10:45 AM", busNo: "PB-12-EF-3235", status: "On Time" },
        { time: "12:00 PM", arrival: "01:45 PM", busNo: "PB-12-EF-3236", status: "On Time" },
        { time: "03:00 PM", arrival: "04:45 PM", busNo: "PB-12-EF-3237", status: "On Time" },
        { time: "06:00 PM", arrival: "07:45 PM", busNo: "PB-12-EF-3238", status: "On Time" }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    if (status.includes("Delayed")) {
      return <Badge variant="destructive">{status}</Badge>;
    }
    return <Badge variant="secondary">{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Bus Schedules & Routes
          </CardTitle>
          <CardDescription>
            View all available routes and their timings across Punjab cities
          </CardDescription>
        </CardHeader>
      </Card>

      {routes.map((route) => (
        <Card key={route.id}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="w-5 h-5 text-secondary" />
              {route.route}
            </CardTitle>
            <CardDescription>
              {route.buses.length} daily services available
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {route.buses.map((bus, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        {bus.time}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                        <ArrowRight className="w-3 h-3" />
                        {bus.arrival}
                      </div>
                    </div>
                    <div className="h-8 w-px bg-border"></div>
                    <div>
                      <p className="font-medium text-sm">{bus.busNo}</p>
                      <p className="text-xs text-muted-foreground">
                        Duration: {(() => {
                          const start = new Date(`2024-01-01 ${bus.time}`);
                          const end = new Date(`2024-01-01 ${bus.arrival}`);
                          const diff = Math.abs(end.getTime() - start.getTime());
                          const hours = Math.floor(diff / (1000 * 60 * 60));
                          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                          return `${hours}h ${minutes}m`;
                        })()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {getStatusBadge(bus.status)}
                    <Button size="sm" variant="outline">
                      Book Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-muted rounded-lg">
              <h4 className="text-sm font-medium mb-2">Route Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-muted-foreground">
                <div>• Standard fare: ₹150 per seat</div>
                <div>• AC buses available</div>
                <div>• Free Wi-Fi on select buses</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Popular Routes */}
      <Card>
        <CardHeader>
          <CardTitle>Popular Routes</CardTitle>
          <CardDescription>Most frequently traveled routes in Punjab</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Chandigarh → Ludhiana",
              "Amritsar → Jalandhar", 
              "Bathinda → Patiala",
              "Mohali → Hoshiarpur",
              "Pathankot → Batala",
              "Sangrur → Moga"
            ].map((route, index) => (
              <div key={index} className="p-3 border rounded-lg text-center hover:bg-muted/50 transition-colors cursor-pointer">
                <p className="text-sm font-medium">{route}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {Math.floor(Math.random() * 8) + 5} daily services
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SchedulesRoutes;