import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { User, UserCheck, Clock, Users } from "lucide-react";

interface SeatLayoutProps {
  onSeatSelect: (seats: string[]) => void;
  maxSeats: number;
}

const SeatLayout = ({ onSeatSelect, maxSeats }: SeatLayoutProps) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Generate seat layout (2x2 configuration for 40 seats)
  const generateSeats = () => {
    const seats = [];
    const seatTypes = {
      occupied: ['1A', '2B', '5A', '7B', '12A', '15B'],
      reserved_women: ['3A', '3B', '4A', '4B'], // First 2 rows for women
      reserved_senior: ['18A', '18B'], // Senior citizen seats
      reserved_pwd: ['19A', '19B'], // PWD seats
      available: [] as string[]
    };

    // Generate all seats and categorize
    for (let row = 1; row <= 20; row++) {
      for (let col of ['A', 'B']) {
        const seatId = `${row}${col}`;
        
        if (!seatTypes.occupied.includes(seatId) && 
            !seatTypes.reserved_women.includes(seatId) &&
            !seatTypes.reserved_senior.includes(seatId) &&
            !seatTypes.reserved_pwd.includes(seatId)) {
          seatTypes.available.push(seatId);
        }
        
        seats.push({
          id: seatId,
          row,
          col,
          type: seatTypes.occupied.includes(seatId) ? 'occupied' :
                seatTypes.reserved_women.includes(seatId) ? 'reserved_women' :
                seatTypes.reserved_senior.includes(seatId) ? 'reserved_senior' :
                seatTypes.reserved_pwd.includes(seatId) ? 'reserved_pwd' : 'available',
          vacatedAt: seatTypes.occupied.includes(seatId) ? 
            `${Math.floor(Math.random() * 3) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} hrs` : 
            null
        });
      }
    }
    
    return seats;
  };

  const seats = generateSeats();

  const handleSeatClick = (seatId: string, seatType: string) => {
    if (seatType === 'occupied') return;
    
    const isSelected = selectedSeats.includes(seatId);
    let newSelectedSeats;
    
    if (isSelected) {
      newSelectedSeats = selectedSeats.filter(id => id !== seatId);
    } else {
      if (selectedSeats.length >= maxSeats) {
        return; // Max seats reached
      }
      newSelectedSeats = [...selectedSeats, seatId];
    }
    
    setSelectedSeats(newSelectedSeats);
    onSeatSelect(newSelectedSeats);
  };

  const getSeatIcon = (type: string) => {
    switch (type) {
      case 'reserved_pwd':
        return <Users className="w-3 h-3" />;
      case 'occupied':
        return <UserCheck className="w-3 h-3" />;
      default:
        return <User className="w-3 h-3" />;
    }
  };

  const getSeatClass = (seat: any) => {
    const baseClass = "w-12 h-12 rounded-lg border-2 flex items-center justify-center text-xs font-medium transition-all cursor-pointer";
    
    if (seat.type === 'occupied') {
      return cn(baseClass, "bg-destructive/20 border-destructive text-destructive cursor-not-allowed");
    }
    
    if (selectedSeats.includes(seat.id)) {
      return cn(baseClass, "bg-primary border-primary text-primary-foreground");
    }
    
    switch (seat.type) {
      case 'reserved_women':
        return cn(baseClass, "bg-pink-50 border-pink-300 text-pink-700 hover:bg-pink-100");
      case 'reserved_senior':
        return cn(baseClass, "bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100");
      case 'reserved_pwd':
        return cn(baseClass, "bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100");
      default:
        return cn(baseClass, "bg-secondary/50 border-border hover:bg-secondary text-foreground");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Bus Seat Layout
          <Badge variant="outline">
            Selected: {selectedSeats.length}/{maxSeats}
          </Badge>
        </CardTitle>
        <CardDescription>
          Click on available seats to select. 2x2 seating configuration.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Legend */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-secondary/50 border border-border rounded"></div>
            <span className="text-xs">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary border border-primary rounded"></div>
            <span className="text-xs">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-destructive/20 border border-destructive rounded"></div>
            <span className="text-xs">Occupied</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-pink-50 border border-pink-300 rounded"></div>
            <span className="text-xs">Women Reserved</span>
          </div>
        </div>

        {/* Driver Section */}
        <div className="text-center py-2 bg-accent/10 rounded-lg">
          <span className="text-sm font-medium text-accent">Driver</span>
        </div>

        {/* Seat Grid */}
        <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
          {Array.from({ length: 20 }).map((_, rowIndex) => {
            const rowSeats = seats.filter(seat => seat.row === rowIndex + 1);
            
            return (
              <div key={rowIndex} className="contents">
                {/* Left side seats (A) */}
                {rowSeats.filter(seat => seat.col === 'A').map(seat => (
                  <div
                    key={seat.id}
                    className={getSeatClass(seat)}
                    onClick={() => handleSeatClick(seat.id, seat.type)}
                    title={seat.type === 'occupied' ? `Occupied - Available in ${seat.vacatedAt}` : seat.id}
                  >
                    {getSeatIcon(seat.type)}
                    {seat.type === 'occupied' && (
                      <div className="absolute -bottom-1 left-0 right-0">
                        <div className="flex items-center justify-center">
                          <Clock className="w-2 h-2 text-destructive" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Right side seats (B) */}
                {rowSeats.filter(seat => seat.col === 'B').map(seat => (
                  <div
                    key={seat.id}
                    className={getSeatClass(seat)}
                    onClick={() => handleSeatClick(seat.id, seat.type)}
                    title={seat.type === 'occupied' ? `Occupied - Available in ${seat.vacatedAt}` : seat.id}
                  >
                    {getSeatIcon(seat.type)}
                    {seat.type === 'occupied' && (
                      <div className="absolute -bottom-1 left-0 right-0">
                        <div className="flex items-center justify-center">
                          <Clock className="w-2 h-2 text-destructive" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Selected Seats Summary */}
        {selectedSeats.length > 0 && (
          <div className="p-4 bg-primary/10 rounded-lg">
            <h4 className="font-medium mb-2">Selected Seats:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map(seatId => (
                <Badge key={seatId} variant="default">
                  {seatId}
                </Badge>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Total Fare: ₹{selectedSeats.length * 150}
            </p>
          </div>
        )}

        {/* Occupied Seats Info */}
        <div className="space-y-2">
          <h4 className="font-medium">Occupied Seats Timeline:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            {seats.filter(seat => seat.type === 'occupied').map(seat => (
              <div key={seat.id} className="flex items-center justify-between p-2 bg-muted rounded">
                <span>Seat {seat.id}</span>
                <div className="flex items-center gap-1 text-destructive">
                  <Clock className="w-3 h-3" />
                  <span>{seat.vacatedAt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeatLayout;