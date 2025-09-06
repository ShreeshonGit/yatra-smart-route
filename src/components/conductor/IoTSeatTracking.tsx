import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Radio, Users, AlertTriangle, Smartphone, Settings } from "lucide-react";

const IoTSeatTracking = () => {
  const [seatData, setSeatData] = useState({
    totalSeats: 40,
    occupiedSeats: 23,
    availableSeats: 17,
    sensorStatus: 'active',
    lastUpdate: new Date()
  });
  
  const [isManualOverride, setIsManualOverride] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  // Simulate IoT sensor updates
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isManualOverride) {
        // Simulate passenger boarding/alighting
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2 change
        setSeatData(prev => {
          const newOccupied = Math.max(0, Math.min(40, prev.occupiedSeats + change));
          const newAvailable = 40 - newOccupied;
          
          // Generate notifications for full bus
          if (newOccupied >= 38 && prev.occupiedSeats < 38) {
            const newNotification = {
              id: Date.now(),
              message: "Bus is nearly full! SMS notifications sent to waiting passengers.",
              time: new Date().toLocaleTimeString(),
              type: "warning"
            };
            setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
          }
          
          return {
            ...prev,
            occupiedSeats: newOccupied,
            availableSeats: newAvailable,
            lastUpdate: new Date()
          };
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isManualOverride]);

  const handleManualOverride = (seats: number) => {
    setSeatData(prev => ({
      ...prev,
      occupiedSeats: seats,
      availableSeats: 40 - seats,
      lastUpdate: new Date()
    }));
  };

  const seatGrid = Array.from({ length: 40 }, (_, i) => i < seatData.occupiedSeats);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-primary" />
            IoT Seat Tracking System
          </CardTitle>
          <CardDescription>
            Real-time passenger counting using infrared sensors and computer vision
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Sensor Status */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Sensor Status</span>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Active
              </Badge>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-3 h-3 text-blue-500" />
                <span className="text-sm font-medium">Occupied</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">{seatData.occupiedSeats}</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-3 h-3 text-green-500" />
                <span className="text-sm font-medium">Available</span>
              </div>
              <p className="text-2xl font-bold text-green-600">{seatData.availableSeats}</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium">Capacity</span>
              </div>
              <p className="text-lg font-semibold">{Math.round((seatData.occupiedSeats / 40) * 100)}%</p>
            </Card>
          </div>

          {/* Seat Layout Visualization */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                Real-time Seat Status
                <span className="text-sm font-normal text-muted-foreground">
                  Last Update: {seatData.lastUpdate.toLocaleTimeString()}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
                {seatGrid.map((isOccupied, index) => (
                  <div
                    key={index}
                    className={`aspect-square rounded-lg border-2 flex items-center justify-center text-xs font-medium transition-colors ${
                      isOccupied 
                        ? 'bg-red-100 border-red-300 text-red-700' 
                        : 'bg-green-100 border-green-300 text-green-700'
                    }`}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-center gap-4 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded"></div>
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-red-100 border-2 border-red-300 rounded"></div>
                  <span>Occupied</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Manual Override */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Manual Override
              </CardTitle>
              <CardDescription>
                Override sensor data if readings are incorrect
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Button
                  variant={isManualOverride ? "destructive" : "outline"}
                  size="sm"
                  onClick={() => setIsManualOverride(!isManualOverride)}
                >
                  {isManualOverride ? "Disable Override" : "Enable Override"}
                </Button>
                {isManualOverride && (
                  <Badge variant="outline" className="text-orange-600 border-orange-300">
                    Manual Mode Active
                  </Badge>
                )}
              </div>
              
              {isManualOverride && (
                <div className="grid grid-cols-5 gap-2">
                  {[10, 15, 20, 25, 30, 35, 38, 40].map(count => (
                    <Button
                      key={count}
                      variant="outline"
                      size="sm"
                      onClick={() => handleManualOverride(count)}
                      className={seatData.occupiedSeats === count ? "bg-primary text-primary-foreground" : ""}
                    >
                      {count}
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Automated Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                Automated Passenger Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              {notifications.length > 0 ? (
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-yellow-800">{notification.message}</p>
                        <p className="text-xs text-yellow-600 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No recent notifications</p>
              )}
            </CardContent>
          </Card>

          {/* System Info */}
          <div className="bg-blue-50 rounded-lg p-3">
            <h5 className="font-medium text-blue-800 mb-2">IoT Automation Features:</h5>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Infrared sensors count passengers entering/exiting</li>
              <li>• Computer vision verifies passenger count</li>
              <li>• Real-time seat availability updates across all portals</li>
              <li>• Automated SMS notifications when bus is full</li>
              <li>• Alternative bus recommendations sent to passengers</li>
              <li>• Manual override for sensor failures</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IoTSeatTracking;