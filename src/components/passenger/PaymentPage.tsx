import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { QrCode, CreditCard, Smartphone, Banknote, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PaymentPageProps {
  bookingData: any;
}

const PaymentPage = ({ bookingData }: PaymentPageProps) => {
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [showQRTicket, setShowQRTicket] = useState(false);
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    upiId: "",
    netBankingBank: ""
  });

  const handlePayment = () => {
    if (!bookingData) {
      toast({
        title: "No Booking Data",
        description: "Please complete your booking first.",
        variant: "destructive"
      });
      return;
    }

    // Simulate payment processing
    setTimeout(() => {
      setShowQRTicket(true);
      toast({
        title: "Payment Successful!",
        description: "Your QR ticket has been generated.",
      });
    }, 2000);
  };

  if (showQRTicket) {
    return (
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-green-600">
            <CheckCircle className="w-6 h-6" />
            Payment Successful!
          </CardTitle>
          <CardDescription>Your digital ticket is ready</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* QR Ticket */}
          <div className="border-2 border-dashed border-primary rounded-lg p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-32 h-32 bg-white border rounded-lg flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-accent" />
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-bold text-lg">Digital Bus Ticket</h3>
                <Badge variant="secondary" className="text-sm">
                  Booking ID: {bookingData?.bookingId}
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-left space-y-1">
                  <p><span className="font-medium">From:</span> {bookingData?.origin}</p>
                  <p><span className="font-medium">To:</span> {bookingData?.destination}</p>
                  <p><span className="font-medium">Date:</span> {bookingData?.date}</p>
                  <p><span className="font-medium">Bus:</span> {bookingData?.busNumber}</p>
                </div>
                <div className="text-left space-y-1">
                  <p><span className="font-medium">Departure:</span> {bookingData?.departureTime}</p>
                  <p><span className="font-medium">Arrival:</span> {bookingData?.arrivalTime}</p>
                  <p><span className="font-medium">Seats:</span> {bookingData?.selectedSeats?.join(', ')}</p>
                  <p><span className="font-medium">Amount:</span> ₹{bookingData?.fare}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Show this QR code to the conductor for verification
            </p>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" size="sm">
                Download Ticket
              </Button>
              <Button variant="outline" size="sm">
                Share via WhatsApp
              </Button>
              <Button variant="outline" size="sm">
                Email Ticket
              </Button>
            </div>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Important Instructions:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Show this QR ticket to the conductor when boarding</li>
              <li>• Keep a screenshot or download for offline access</li>
              <li>• Arrive at the boarding point 15 minutes early</li>
              <li>• Carry a valid ID proof for verification</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!bookingData) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Payment Gateway</CardTitle>
          <CardDescription>Complete your booking to proceed with payment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <CreditCard className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p>No active booking found. Please complete your ticket booking first.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Booking Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
          <CardDescription>Review your booking details before payment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Journey Details</h4>
              <div className="text-sm space-y-1">
                <p><span className="text-muted-foreground">Route:</span> {bookingData.origin} → {bookingData.destination}</p>
                <p><span className="text-muted-foreground">Date:</span> {bookingData.date}</p>
                <p><span className="text-muted-foreground">Bus Number:</span> {bookingData.busNumber}</p>
                <p><span className="text-muted-foreground">Departure:</span> {bookingData.departureTime}</p>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Booking Details</h4>
              <div className="text-sm space-y-1">
                <p><span className="text-muted-foreground">Seats:</span> {bookingData.selectedSeats?.join(', ')}</p>
                <p><span className="text-muted-foreground">Passengers:</span> {bookingData.selectedSeats?.length}</p>
                <p><span className="text-muted-foreground">Base Fare:</span> ₹{bookingData.fare}</p>
                <p className="font-medium text-lg"><span className="text-muted-foreground">Total Amount:</span> ₹{bookingData.fare}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Select Payment Method
          </CardTitle>
          <CardDescription>Choose your preferred payment option</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-center space-x-2 p-3 border rounded-lg">
              <RadioGroupItem value="upi" id="upi" />
              <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer">
                <Smartphone className="w-4 h-4 text-blue-600" />
                UPI Payment
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer">
                <CreditCard className="w-4 h-4 text-purple-600" />
                Credit/Debit Card
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg">
              <RadioGroupItem value="netbanking" id="netbanking" />
              <Label htmlFor="netbanking" className="flex items-center gap-2 cursor-pointer">
                <Banknote className="w-4 h-4 text-green-600" />
                Net Banking
              </Label>
            </div>
          </RadioGroup>

          {/* Payment Forms */}
          {paymentMethod === "upi" && (
            <div className="space-y-4">
              <Label htmlFor="upi-id">UPI ID</Label>
              <Input
                id="upi-id"
                placeholder="yourname@upi"
                value={paymentData.upiId}
                onChange={(e) => setPaymentData(prev => ({ ...prev, upiId: e.target.value }))}
              />
            </div>
          )}

          {paymentMethod === "card" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input
                  id="card-number"
                  placeholder="1234 5678 9012 3456"
                  value={paymentData.cardNumber}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, cardNumber: e.target.value }))}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={paymentData.expiryDate}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, expiryDate: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={paymentData.cvv}
                    onChange={(e) => setPaymentData(prev => ({ ...prev, cvv: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === "netbanking" && (
            <div className="space-y-4">
              <Label htmlFor="bank">Select Bank</Label>
              <select
                id="bank"
                className="w-full p-2 border rounded-md"
                value={paymentData.netBankingBank}
                onChange={(e) => setPaymentData(prev => ({ ...prev, netBankingBank: e.target.value }))}
              >
                <option value="">Choose your bank</option>
                <option value="sbi">State Bank of India</option>
                <option value="hdfc">HDFC Bank</option>
                <option value="icici">ICICI Bank</option>
                <option value="axis">Axis Bank</option>
                <option value="pnb">Punjab National Bank</option>
              </select>
            </div>
          )}

          <Button 
            onClick={handlePayment}
            className="w-full bg-primary hover:bg-primary/90" 
            size="lg"
          >
            Pay ₹{bookingData.fare}
          </Button>

          <div className="text-center text-xs text-muted-foreground">
            <p>Your payment is secured with 256-bit SSL encryption</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentPage;