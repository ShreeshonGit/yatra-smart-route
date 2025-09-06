import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User, Clock, MapPin, Camera, Search, Download } from "lucide-react";

const BiometricLogs = () => {
  const [logs, setLogs] = useState([
    {
      id: 1,
      driverId: "DRV001",
      name: "Rajesh Kumar Singh",
      loginTime: "2025-01-06 08:30:15",
      tripStartTime: "2025-01-06 08:45:22",
      photo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iMjAiIGZpbGw9IiM2MzY2RjEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9IndoaXRlIj4KICA8cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS43OSA0LTRzLTEuNzktNC00LTQtNCAxLjc5LTQgNCAxLjc5IDQgNCA0em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6Ii8+Cjwvc3ZnPgo8L3N2Zz4K",
      busNumber: "PB-10-AB-1234",
      route: "Ludhiana → Amritsar",
      status: "Active",
      confidence: 98.5
    },
    {
      id: 2,
      driverId: "DRV002",
      name: "Sukhwinder Singh",
      loginTime: "2025-01-06 09:15:30",
      tripStartTime: "2025-01-06 09:30:45",
      photo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iMjAiIGZpbGw9IiM2MzY2RjEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9IndoaXRlIj4KICA8cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS43OSA0LTRzLTEuNzktNC00LTQtNCAxLjc5LTQgNCAxLjc5IDQgNCA0em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6Ii8+Cjwvc3ZnPgo8L3N2Zz4K",
      busNumber: "PB-11-CD-2235",
      route: "Jalandhar → Bathinda",
      status: "Completed",
      confidence: 96.2
    },
    {
      id: 3,
      driverId: "DRV003",
      name: "Amarjeet Kaur",
      loginTime: "2025-01-06 10:00:12",
      tripStartTime: "2025-01-06 10:15:28",
      photo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iMjAiIGZpbGw9IiM2MzY2RjEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9IndoaXRlIj4KICA8cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS43OSA0LTRzLTEuNzktNC00LTQtNCAxLjc5LTQgNCAxLjc5IDQgNCA0em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6Ii8+Cjwvc3ZnPgo8L3N2Zz4K",
      busNumber: "PB-12-EF-3236",
      route: "Patiala → Mohali",
      status: "Active",
      confidence: 99.1
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newLogAlert, setNewLogAlert] = useState(false);

  // Simulate new biometric logs
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setNewLogAlert(true);
        setTimeout(() => setNewLogAlert(false), 3000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const filteredLogs = logs.filter(log => 
    log.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.driverId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.busNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary" />
              Driver Biometric Authentication Logs
            </div>
            {newLogAlert && (
              <Badge variant="default" className="bg-green-500 animate-pulse">
                New Log Received
              </Badge>
            )}
          </CardTitle>
          <CardDescription>
            Real-time face recognition login records and trip start times
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by driver name, ID, or bus number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">Total Logins Today</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">24</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Camera className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium">Success Rate</span>
              </div>
              <p className="text-2xl font-bold text-green-600">98.5%</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium">Active Drivers</span>
              </div>
              <p className="text-2xl font-bold text-orange-600">12</p>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium">Avg Login Time</span>
              </div>
              <p className="text-lg font-bold text-purple-600">2.3s</p>
            </Card>
          </div>

          {/* Logs Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Authentication Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredLogs.map((log) => (
                  <div key={log.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    {/* Driver Photo */}
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-primary-foreground" />
                    </div>

                    {/* Driver Info */}
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="font-medium">{log.name}</p>
                        <p className="text-sm text-muted-foreground">ID: {log.driverId}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium">{log.busNumber}</p>
                        <p className="text-xs text-muted-foreground">{log.route}</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-1 mb-1">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Login</span>
                        </div>
                        <p className="text-sm font-mono">{log.loginTime.split(' ')[1]}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Trip Start</span>
                        </div>
                        <p className="text-sm font-mono">{log.tripStartTime.split(' ')[1]}</p>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant={log.status === 'Active' ? 'default' : 'secondary'}>
                          {log.status}
                        </Badge>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Confidence</p>
                          <p className="text-sm font-bold text-green-600">{log.confidence}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h5 className="font-medium text-blue-800 mb-2">Biometric System Status:</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-blue-700">CV Engine: Online</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-blue-700">Database: Connected</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-blue-700">Real-time Sync: Active</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BiometricLogs;