import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Ticket, User, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const OfflineBooking = () => {
  const { toast } = useToast();
  const [bookingData, setBookingData] = useState({
    passengerName: "",
    phoneNumber: "",
    destination: "",
    seats: 1,
    paymentMethod: "cash"
  });

  const destinations = [
    "Amritsar", "Jalandhar", "Bathinda", "Patiala", "Mohali",
    "Hoshiarpur", "Batala", "Pathankot", "Moga", "Abohar"
  ];

  const availableSeats = ["6A", "6B", "7A", "9A", "9B", "10A", "10B", "13A", "13B", "14A", "14B", "16A", "16B", "17A", "17B"];

  const handleBooking = () => {
    if (!bookingData.passengerName || !bookingData.phoneNumber || !bookingData.destination) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const offlineBookingId = `OFF${Date.now()}`;
    
    toast({
      title: "Offline Booking Successful!",
      description: `Ticket booked for ${bookingData.passengerName}. ID: ${offlineBookingId}`,
    });

    // Reset form
    setBookingData({
      passengerName: "",
      phoneNumber: "",
      destination: "",
      seats: 1,
      paymentMethod: "cash"
    });
  };

  const recentBookings = [
    { id: "OFF1701234567", passenger: "Ramesh Kumar", destination: "Amritsar", seat: "6A", time: "10:25 AM" },
    { id: "OFF1701234566", passenger: "Sarla Devi", destination: "Jalandhar", seat: "7B", time: "10:20 AM" },
    { id: "OFF1701234565", passenger: "Gurmeet Singh", destination: "Bathinda", seat: "9A", time: "10:15 AM" },
    { id: "OFF1701234564", passenger: "Priya Sharma", destination: "Patiala", seat: "10B", time: "10:10 AM" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-primary" />
            Offline Ticket Booking
          </CardTitle>
          <CardDescription>
            Book tickets for passengers without smartphones
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Passenger Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="passengerName">Passenger Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="passengerName"
                  placeholder="Enter full name"
                  className="pl-10"
                  value={bookingData.passengerName}
                  onChange={(e) => setBookingData(prev => ({ ...prev, passengerName: e.target.value }))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="Enter phone number"
                  className="pl-10"
                  value={bookingData.phoneNumber}
                  onChange={(e) => setBookingData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Journey Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="destination">Destination *</Label>
              <Select 
                value={bookingData.destination} 
                onValueChange={(value) => setBookingData(prev => ({ ...prev, destination: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select destination" />
                </SelectTrigger>
                <SelectContent>
                  {destinations.map((dest) => (
                    <SelectItem key={dest} value={dest}>
                      {dest}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="seats">Number of Seats</Label>
              <Select 
                value={bookingData.seats.toString()} 
                onValueChange={(value) => setBookingData(prev => ({ ...prev, seats: parseInt(value) }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4].map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} Seat{num > 1 ? 's' : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <Label>Payment Method</Label>
            <div className="flex gap-2">
              <Button
                variant={bookingData.paymentMethod === "cash" ? "default" : "outline"}
                onClick={() => setBookingData(prev => ({ ...prev, paymentMethod: "cash" }))}
              >
                Cash
              </Button>
              <Button
                variant={bookingData.paymentMethod === "card" ? "default" : "outline"}
                onClick={() => setBookingData(prev => ({ ...prev, paymentMethod: "card" }))}
              >
                Card
              </Button>
            </div>
          </div>

          {/* Available Seats */}
          <div className="space-y-2">
            <Label>Available Seats</Label>
            <div className="grid grid-cols-6 gap-2">
              {availableSeats.slice(0, 12).map((seat) => (
                <div key={seat} className="p-2 border rounded text-center text-sm hover:bg-muted">
                  {seat}
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Click on conductor system to assign specific seats
            </p>
          </div>

          {/* Fare Information */}
          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Fare Calculation</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Base Fare ({bookingData.seats} seat{bookingData.seats > 1 ? 's' : ''})</span>
                <span>₹{bookingData.seats * 150}</span>
              </div>
              <div className="flex justify-between">
                <span>Service Charge</span>
                <span>₹0</span>
              </div>
              <div className="flex justify-between font-medium border-t pt-1">
                <span>Total Amount</span>
                <span>₹{bookingData.seats * 150}</span>
              </div>
            </div>
          </div>

          <Button 
            onClick={handleBooking}
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
          >
            Book Offline Ticket - ₹{bookingData.seats * 150}
          </Button>
        </CardContent>
      </Card>

      {/* Recent Offline Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Offline Bookings</CardTitle>
          <CardDescription>Recently booked offline tickets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{booking.passenger}</p>
                    <p className="text-xs text-muted-foreground">
                      To {booking.destination} • Seat {booking.seat} • {booking.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary">Offline</Badge>
                  <p className="text-xs text-muted-foreground mt-1">{booking.id}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OfflineBooking;