import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import SeatLayout from "./SeatLayout";
import { useToast } from "@/hooks/use-toast";

interface TicketBookingProps {
  onBookingComplete: (data: any) => void;
}

const punjabCities = [
  "Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", 
  "Mohali", "Hoshiarpur", "Batala", "Pathankot", "Moga",
  "Abohar", "Malerkotla", "Khanna", "Phagwara", "Muktsar",
  "Barnala", "Rajpura", "Firozpur", "Kapurthala", "Sangrur"
];

const TicketBooking = ({ onBookingComplete }: TicketBookingProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookingData, setBookingData] = useState({
    origin: "",
    destination: "",
    date: "",
    passengers: 1,
    selectedSeats: [] as string[]
  });

  const filteredCities = punjabCities.filter(city => 
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCitySelect = (city: string, type: 'origin' | 'destination') => {
    setBookingData(prev => ({ ...prev, [type]: city }));
  };

  const handleSearchBuses = () => {
    if (!bookingData.origin || !bookingData.destination || !bookingData.date) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (bookingData.origin === bookingData.destination) {
      toast({
        title: "Invalid Route",
        description: "Origin and destination cannot be the same.",
        variant: "destructive"
      });
      return;
    }

    setStep(2);
  };

  const handleSeatSelection = (seats: string[]) => {
    setBookingData(prev => ({ ...prev, selectedSeats: seats }));
  };

  const handleBookTickets = () => {
    if (bookingData.selectedSeats.length === 0) {
      toast({
        title: "No Seats Selected",
        description: "Please select at least one seat to continue.",
        variant: "destructive"
      });
      return;
    }

    const finalBookingData = {
      ...bookingData,
      busNumber: "PB-10-AB-1234",
      departureTime: "14:30",
      arrivalTime: "17:45",
      fare: bookingData.selectedSeats.length * 150,
      bookingId: `SY${Date.now()}`
    };

    onBookingComplete(finalBookingData);
    
    toast({
      title: "Booking Confirmed!",
      description: `${bookingData.selectedSeats.length} seat(s) booked successfully.`,
    });

    // Reset for next booking
    setStep(1);
    setBookingData({
      origin: "",
      destination: "",
      date: "",
      passengers: 1,
      selectedSeats: []
    });
  };

  if (step === 2) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Route Details
            </CardTitle>
            <CardDescription>
              {bookingData.origin} <ArrowRight className="w-4 h-4 inline mx-2" /> {bookingData.destination}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {bookingData.date}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {bookingData.passengers} passenger(s)
              </div>
            </div>
          </CardContent>
        </Card>

        <SeatLayout 
          onSeatSelect={handleSeatSelection}
          maxSeats={bookingData.passengers}
        />

        <div className="flex gap-4">
          <Button variant="outline" onClick={() => setStep(1)}>
            Back to Search
          </Button>
          <Button 
            onClick={handleBookTickets}
            className="bg-primary hover:bg-primary/90"
            disabled={bookingData.selectedSeats.length === 0}
          >
            Book {bookingData.selectedSeats.length} Ticket(s) - ₹{bookingData.selectedSeats.length * 150}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Your Journey</CardTitle>
        <CardDescription>
          Select your origin, destination, and travel date to find available buses
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Origin & Destination */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="origin">From (Origin)</Label>
            <Select value={bookingData.origin} onValueChange={(value) => handleCitySelect(value, 'origin')}>
              <SelectTrigger>
                <SelectValue placeholder="Select origin city" />
              </SelectTrigger>
              <SelectContent>
                <div className="p-2">
                  <Input
                    placeholder="Search cities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mb-2"
                  />
                </div>
                {filteredCities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="destination">To (Destination)</Label>
            <Select value={bookingData.destination} onValueChange={(value) => handleCitySelect(value, 'destination')}>
              <SelectTrigger>
                <SelectValue placeholder="Select destination city" />
              </SelectTrigger>
              <SelectContent>
                <div className="p-2">
                  <Input
                    placeholder="Search cities..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="mb-2"
                  />
                </div>
                {filteredCities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Date & Passengers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Travel Date</Label>
            <Input
              id="date"
              type="date"
              value={bookingData.date}
              onChange={(e) => setBookingData(prev => ({ ...prev, date: e.target.value }))}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="passengers">Number of Passengers</Label>
            <Select 
              value={bookingData.passengers.toString()} 
              onValueChange={(value) => setBookingData(prev => ({ ...prev, passengers: parseInt(value) }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} Passenger{num > 1 ? 's' : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Reserved Seats Info */}
        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">Reserved Seats Available</h4>
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">Women</Badge>
            <Badge variant="secondary">Senior Citizens</Badge>
            <Badge variant="secondary">PWD (Persons with Disabilities)</Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Special seats are reserved for women, senior citizens, and persons with disabilities.
          </p>
        </div>

        <Button 
          onClick={handleSearchBuses}
          className="w-full bg-primary hover:bg-primary/90"
          size="lg"
        >
          Search Available Buses
        </Button>
      </CardContent>
    </Card>
  );
};

export default TicketBooking;