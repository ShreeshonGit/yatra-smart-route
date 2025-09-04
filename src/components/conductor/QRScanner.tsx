import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrCode, Camera, CheckCircle, XCircle, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const QRScanner = () => {
  const { toast } = useToast();
  const [isScanning, setIsScanning] = useState(false);
  const [lastScannedTicket, setLastScannedTicket] = useState(null);

  // Simulate QR scanning
  const startScanning = () => {
    setIsScanning(true);
    
    // Simulate scan after 3 seconds
    setTimeout(() => {
      const mockTicketData = {
        bookingId: `SY${Date.now()}`,
        passengerName: "Rajesh Kumar",
        from: "Ludhiana",
        to: "Amritsar", 
        seats: ["12A", "12B"],
        busNumber: "PB-10-AB-1234",
        date: new Date().toLocaleDateString(),
        status: Math.random() > 0.2 ? "valid" : "invalid"
      };
      
      setLastScannedTicket(mockTicketData);
      setIsScanning(false);
      
      if (mockTicketData.status === "valid") {
        toast({
          title: "Valid Ticket",
          description: `Ticket verified for ${mockTicketData.passengerName}`,
        });
      } else {
        toast({
          title: "Invalid Ticket",
          description: "This ticket is not valid or has expired",
          variant: "destructive"
        });
      }
    }, 3000);
  };

  const recentScans = [
    { id: 1, passenger: "Amit Singh", seat: "5A", time: "10:30 AM", status: "valid" },
    { id: 2, passenger: "Priya Sharma", seat: "8B", time: "10:28 AM", status: "valid" },
    { id: 3, passenger: "Ravi Kumar", seat: "15A", time: "10:25 AM", status: "invalid" },
    { id: 4, passenger: "Sunita Devi", seat: "3A", time: "10:22 AM", status: "valid" },
    { id: 5, passenger: "Harpreet Singh", seat: "11B", time: "10:20 AM", status: "valid" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5 text-primary" />
            QR Code Scanner
          </CardTitle>
          <CardDescription>
            Scan passenger QR tickets for verification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Scanner Interface */}
          <div className="text-center space-y-4">
            <div className="w-64 h-64 mx-auto border-2 border-dashed border-muted-foreground rounded-lg flex items-center justify-center relative overflow-hidden">
              {isScanning ? (
                <div className="animate-pulse">
                  <Camera className="w-16 h-16 text-primary" />
                  <p className="text-sm text-muted-foreground mt-2">Scanning...</p>
                  <div className="absolute inset-0 border-2 border-primary animate-ping rounded-lg"></div>
                </div>
              ) : (
                <div>
                  <QrCode className="w-16 h-16 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mt-2">Point camera at QR code</p>
                </div>
              )}
            </div>
            
            <Button 
              onClick={startScanning}
              disabled={isScanning}
              className="bg-primary hover:bg-primary/90"
              size="lg"
            >
              {isScanning ? "Scanning..." : "Start QR Scanner"}
            </Button>
          </div>

          {/* Last Scanned Ticket */}
          {lastScannedTicket && (
            <div className="p-4 border rounded-lg bg-muted/50">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                Last Scanned Ticket
                {lastScannedTicket.status === "valid" ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : (
                  <XCircle className="w-4 h-4 text-destructive" />
                )}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <p><span className="text-muted-foreground">Booking ID:</span> {lastScannedTicket.bookingId}</p>
                  <p><span className="text-muted-foreground">Passenger:</span> {lastScannedTicket.passengerName}</p>
                  <p><span className="text-muted-foreground">Route:</span> {lastScannedTicket.from} → {lastScannedTicket.to}</p>
                </div>
                <div>
                  <p><span className="text-muted-foreground">Seats:</span> {lastScannedTicket.seats.join(", ")}</p>
                  <p><span className="text-muted-foreground">Bus:</span> {lastScannedTicket.busNumber}</p>
                  <p><span className="text-muted-foreground">Date:</span> {lastScannedTicket.date}</p>
                </div>
              </div>
              <div className="mt-3">
                <Badge 
                  variant={lastScannedTicket.status === "valid" ? "secondary" : "destructive"}
                >
                  {lastScannedTicket.status === "valid" ? "Valid Ticket" : "Invalid Ticket"}
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Scans */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Scans</CardTitle>
          <CardDescription>Recently verified passenger tickets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentScans.map((scan) => (
              <div key={scan.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{scan.passenger}</p>
                    <p className="text-xs text-muted-foreground">Seat {scan.seat} • {scan.time}</p>
                  </div>
                </div>
                <Badge 
                  variant={scan.status === "valid" ? "secondary" : "destructive"}
                  className="text-xs"
                >
                  {scan.status === "valid" ? "Valid" : "Invalid"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Manual Verification */}
      <Card>
        <CardHeader>
          <CardTitle>Manual Verification</CardTitle>
          <CardDescription>Enter booking ID for manual verification</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter Booking ID"
              className="flex-1 px-3 py-2 border rounded-md"
            />
            <Button variant="outline">
              Verify
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRScanner;