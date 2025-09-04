import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, User, Phone, Camera } from "lucide-react";

const PassengerDatabase = () => {
  const emergencyRecords = [
    { id: 1, name: "Rajesh Kumar", phone: "+91-98765-43210", date: "Dec 3, 2024", reason: "Medical Emergency" },
    { id: 2, name: "Priya Singh", phone: "+91-87654-32109", date: "Dec 2, 2024", reason: "Urgent Travel" },
    { id: 3, name: "Amit Sharma", phone: "+91-76543-21098", date: "Dec 1, 2024", reason: "Family Emergency" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            Passenger Database
          </CardTitle>
          <CardDescription>Emergency passenger records with photos and contact details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {emergencyRecords.map((record) => (
              <div key={record.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                    <Camera className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{record.name}</p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {record.phone}
                    </p>
                    <p className="text-xs text-muted-foreground">{record.date}</p>
                  </div>
                </div>
                <Badge variant="outline">{record.reason}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PassengerDatabase;