import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Users, User, Clock, Heart, UserCheck } from "lucide-react";

const SeatManagement = () => {
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  // Generate seat data with current occupancy
  const generateSeats = () => {
    const seats = [];
    const seatStatuses = {
      occupied: ['1A', '1B', '5A', '7B', '12A', '15B', '18A'],
      reserved_women: ['3A', '3B', '4A', '4B'],
      reserved_senior: ['18B', '19A'],
      reserved_pwd: ['19B', '20A'],
      emergency_reserved: ['2A', '2B'], // Emergency seats
      available: [] as string[]
    };

    for (let row = 1; row <= 20; row++) {
      for (let col of ['A', 'B']) {
        const seatId = `${row}${col}`;
        
        let status = 'available';
        if (seatStatuses.occupied.includes(seatId)) status = 'occupied';
        else if (seatStatuses.reserved_women.includes(seatId)) status = 'reserved_women';
        else if (seatStatuses.reserved_senior.includes(seatId)) status = 'reserved_senior';
        else if (seatStatuses.reserved_pwd.includes(seatId)) status = 'reserved_pwd';
        else if (seatStatuses.emergency_reserved.includes(seatId)) status = 'emergency_reserved';
        
        seats.push({
          id: seatId,
          row,
          col,
          status,
          passenger: status === 'occupied' ? 
            ['Rajesh Kumar', 'Priya Singh', 'Amit Sharma', 'Sunita Devi', 'Harpreet Singh', 'Neha Gupta', 'Rohit Kumar'][Math.floor(Math.random() * 7)] : 
            null,
          boardingPoint: status === 'occupied' ? 
            ['Ludhiana Central', 'Model Town', 'Bus Stand', 'Railway Station'][Math.floor(Math.random() * 4)] : 
            null
        });
      }
    }
    
    return seats;
  };

  const seats = generateSeats();

  const getSeatIcon = (status: string) => {
    switch (status) {
      case 'reserved_pwd':
        return <Users className="w-3 h-3" />;
      case 'occupied':
        return <UserCheck className="w-3 h-3" />;
      case 'reserved_women':
        return <Heart className="w-3 h-3" />;
      case 'emergency_reserved':
        return <Clock className="w-3 h-3" />;
      default:
        return <User className="w-3 h-3" />;
    }
  };

  const getSeatClass = (seat: any) => {
    const baseClass = "w-12 h-12 rounded-lg border-2 flex items-center justify-center text-xs font-medium transition-all cursor-pointer relative";
    
    if (selectedSeat === seat.id) {
      return cn(baseClass, "bg-accent border-accent text-accent-foreground ring-2 ring-accent/50");
    }
    
    switch (seat.status) {
      case 'occupied':
        return cn(baseClass, "bg-destructive/20 border-destructive text-destructive");
      case 'reserved_women':
        return cn(baseClass, "bg-pink-100 border-pink-400 text-pink-700");
      case 'reserved_senior':
        return cn(baseClass, "bg-amber-100 border-amber-400 text-amber-700");
      case 'reserved_pwd':
        return cn(baseClass, "bg-blue-100 border-blue-400 text-blue-700");
      case 'emergency_reserved':
        return cn(baseClass, "bg-orange-100 border-orange-400 text-orange-700");
      default:
        return cn(baseClass, "bg-secondary/50 border-border hover:bg-secondary text-foreground");
    }
  };

  const getSeatLabel = (status: string) => {
    switch (status) {
      case 'occupied': return 'Occupied';
      case 'reserved_women': return 'Women Reserved';
      case 'reserved_senior': return 'Senior Citizen';
      case 'reserved_pwd': return 'PWD Reserved';
      case 'emergency_reserved': return 'Emergency';
      default: return 'Available';
    }
  };

  const selectedSeatData = selectedSeat ? seats.find(s => s.id === selectedSeat) : null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Seat Management Dashboard
          </CardTitle>
          <CardDescription>
            Monitor and manage bus seat allocation in real-time
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Occupancy Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 border rounded-lg">
              <div className="text-2xl font-bold text-destructive">
                {seats.filter(s => s.status === 'occupied').length}
              </div>
              <div className="text-sm text-muted-foreground">Occupied</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-2xl font-bold text-secondary">
                {seats.filter(s => s.status === 'available').length}
              </div>
              <div className="text-sm text-muted-foreground">Available</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-2xl font-bold text-amber-600">
                {seats.filter(s => s.status.includes('reserved')).length}
              </div>
              <div className="text-sm text-muted-foreground">Reserved</div>
            </div>
            <div className="text-center p-3 border rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {seats.filter(s => s.status === 'emergency_reserved').length}
              </div>
              <div className="text-sm text-muted-foreground">Emergency</div>
            </div>
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 p-4 bg-muted rounded-lg text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-secondary/50 border border-border rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-destructive/20 border border-destructive rounded"></div>
              <span>Occupied</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-pink-100 border border-pink-400 rounded"></div>
              <span>Women</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-100 border border-blue-400 rounded"></div>
              <span>PWD</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-orange-100 border border-orange-400 rounded"></div>
              <span>Emergency</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Seat Layout */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Current Seat Layout</CardTitle>
              <CardDescription>Click on any seat to view details</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Driver Section */}
              <div className="text-center py-2 bg-accent/10 rounded-lg mb-4">
                <span className="text-sm font-medium text-accent">Driver</span>
              </div>

              {/* Seat Grid */}
              <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
                {Array.from({ length: 20 }).map((_, rowIndex) => {
                  const rowSeats = seats.filter(seat => seat.row === rowIndex + 1);
                  
                  return (
                    <div key={rowIndex} className="contents">
                      {rowSeats.map(seat => (
                        <div
                          key={seat.id}
                          className={getSeatClass(seat)}
                          onClick={() => setSelectedSeat(seat.id)}
                          title={`${seat.id} - ${getSeatLabel(seat.status)}`}
                        >
                          {getSeatIcon(seat.status)}
                          {seat.status === 'occupied' && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Seat Details */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Seat Details</CardTitle>
              <CardDescription>
                {selectedSeat ? `Information for seat ${selectedSeat}` : 'Select a seat to view details'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedSeatData ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Seat {selectedSeatData.id}</h4>
                    <Badge variant="outline" className="mt-1">
                      {getSeatLabel(selectedSeatData.status)}
                    </Badge>
                  </div>

                  {selectedSeatData.status === 'occupied' && (
                    <div className="space-y-2">
                      <div>
                        <label className="text-sm text-muted-foreground">Passenger Name</label>
                        <p className="font-medium">{selectedSeatData.passenger}</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Boarding Point</label>
                        <p className="font-medium">{selectedSeatData.boardingPoint}</p>
                      </div>
                      <div>
                        <label className="text-sm text-muted-foreground">Ticket Type</label>
                        <p className="font-medium">Online Booking</p>
                      </div>
                    </div>
                  )}

                  {selectedSeatData.status === 'emergency_reserved' && (
                    <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                      <h5 className="font-medium text-orange-800 mb-1">Emergency Seat</h5>
                      <p className="text-sm text-orange-700">
                        Reserved for urgent travel needs. Can be assigned by conductor for emergency situations.
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    {selectedSeatData.status === 'available' && (
                      <Button className="w-full" variant="outline">
                        Assign Passenger
                      </Button>
                    )}
                    {selectedSeatData.status === 'occupied' && (
                      <Button className="w-full" variant="outline">
                        Mark as Vacant
                      </Button>
                    )}
                    {selectedSeatData.status === 'emergency_reserved' && (
                      <Button className="w-full" variant="destructive">
                        Assign Emergency Passenger
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  Click on a seat in the layout to view its details
                </p>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                View All Passengers
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="w-4 h-4 mr-2" />
                Emergency Allocation
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <User className="w-4 h-4 mr-2" />
                Manual Seat Assignment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SeatManagement;