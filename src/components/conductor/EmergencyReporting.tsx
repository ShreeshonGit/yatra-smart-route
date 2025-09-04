import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Phone, Camera, Users, Car } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EmergencyReporting = () => {
  const { toast } = useToast();
  const [reportType, setReportType] = useState("");
  const [emergencyData, setEmergencyData] = useState({
    passengerName: "",
    phoneNumber: "",
    emergencyType: "",
    description: "",
    seatNumber: ""
  });

  const emergencyTypes = [
    "Driver Misbehavior - Rash Driving",
    "Driver Misbehavior - Drunk Driving",
    "Driver Misbehavior - Verbal Abuse",
    "Medical Emergency",
    "Safety Concern",
    "Harassment",
    "Other"
  ];

  const handleEmergencyReport = () => {
    if (!emergencyData.emergencyType || !emergencyData.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in the emergency type and description.",
        variant: "destructive"
      });
      return;
    }

    const reportId = `EMG${Date.now()}`;
    
    toast({
      title: "Emergency Report Submitted",
      description: `Report ${reportId} has been sent to authorities immediately.`,
      variant: "destructive"
    });

    // Reset form
    setEmergencyData({
      passengerName: "",
      phoneNumber: "",
      emergencyType: "",
      description: "",
      seatNumber: ""
    });
    setReportType("");
  };

  const handleUrgentSeatAssignment = () => {
    if (!emergencyData.passengerName || !emergencyData.phoneNumber) {
      toast({
        title: "Missing Information",
        description: "Please provide passenger name and phone number.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Emergency Seat Assigned",
      description: `Passenger ${emergencyData.passengerName} assigned to emergency seat 2A.`,
    });

    // Reset form
    setEmergencyData({
      passengerName: "",
      phoneNumber: "",
      emergencyType: "",
      description: "",
      seatNumber: ""
    });
    setReportType("");
  };

  const recentReports = [
    { id: "EMG1701234567", type: "Medical Emergency", time: "09:45 AM", status: "Resolved" },
    { id: "EMG1701234566", type: "Driver Misbehavior", time: "08:30 AM", status: "Under Investigation" },
    { id: "EMG1701234565", type: "Safety Concern", time: "07:15 AM", status: "Resolved" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            Emergency Reporting System
          </CardTitle>
          <CardDescription>
            Report emergencies and manage urgent passenger needs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Emergency Type Selection */}
          <div className="space-y-4">
            <Label>Select Emergency Type</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Button
                variant={reportType === "driver" ? "destructive" : "outline"}
                onClick={() => setReportType("driver")}
                className="justify-start h-auto p-4"
              >
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <Car className="w-4 h-4" />
                    <span className="font-medium">Driver Misbehavior</span>
                  </div>
                  <p className="text-xs opacity-70">Rash driving, drunk driving, abuse</p>
                </div>
              </Button>
              
              <Button
                variant={reportType === "passenger" ? "default" : "outline"}
                onClick={() => setReportType("passenger")}
                className="justify-start h-auto p-4"
              >
                <div className="text-left">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">Emergency Seat Assignment</span>
                  </div>
                  <p className="text-xs opacity-70">Urgent travel with photo & phone</p>
                </div>
              </Button>
            </div>
          </div>

          {/* Driver Misbehavior Form */}
          {reportType === "driver" && (
            <div className="space-y-4 p-4 border border-destructive/30 rounded-lg bg-destructive/5">
              <h4 className="font-medium text-destructive">Driver Misbehavior Report</h4>
              
              <div className="space-y-2">
                <Label htmlFor="emergencyType">Type of Misbehavior</Label>
                <Select 
                  value={emergencyData.emergencyType} 
                  onValueChange={(value) => setEmergencyData(prev => ({ ...prev, emergencyType: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select misbehavior type" />
                  </SelectTrigger>
                  <SelectContent>
                    {emergencyTypes.filter(type => type.includes("Driver")).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Incident Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the incident in detail..."
                  value={emergencyData.description}
                  onChange={(e) => setEmergencyData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Camera className="w-4 h-4 mr-2" />
                  Take Photo Evidence
                </Button>
                <Button 
                  onClick={handleEmergencyReport}
                  variant="destructive" 
                  className="flex-1"
                >
                  Submit Emergency Report
                </Button>
              </div>
            </div>
          )}

          {/* Emergency Seat Assignment Form */}
          {reportType === "passenger" && (
            <div className="space-y-4 p-4 border border-primary/30 rounded-lg bg-primary/5">
              <h4 className="font-medium text-primary">Emergency Seat Assignment</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="passengerName">Passenger Name *</Label>
                  <Input
                    id="passengerName"
                    placeholder="Enter full name"
                    value={emergencyData.passengerName}
                    onChange={(e) => setEmergencyData(prev => ({ ...prev, passengerName: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="Enter phone number"
                    value={emergencyData.phoneNumber}
                    onChange={(e) => setEmergencyData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Reason for Emergency Travel</Label>
                <Textarea
                  id="description"
                  placeholder="Explain the emergency situation..."
                  value={emergencyData.description}
                  onChange={(e) => setEmergencyData(prev => ({ ...prev, description: e.target.value }))}
                  rows={2}
                />
              </div>

              <div className="p-3 bg-warning/10 border border-warning/30 rounded-lg">
                <p className="text-sm text-warning-foreground">
                  <strong>Note:</strong> Emergency seat assignment will be recorded in government database with passenger photo and contact details.
                </p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Camera className="w-4 h-4 mr-2" />
                  Take Passenger Photo
                </Button>
                <Button 
                  onClick={handleUrgentSeatAssignment}
                  className="flex-1"
                >
                  Assign Emergency Seat
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5 text-primary" />
            Emergency Contacts
          </CardTitle>
          <CardDescription>Quick access to emergency services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="destructive" className="h-16 flex-col">
              <Phone className="w-5 h-5 mb-1" />
              <span className="text-sm">Police: 100</span>
            </Button>
            <Button variant="destructive" className="h-16 flex-col">
              <Phone className="w-5 h-5 mb-1" />
              <span className="text-sm">Ambulance: 108</span>
            </Button>
            <Button variant="destructive" className="h-16 flex-col">
              <Phone className="w-5 h-5 mb-1" />
              <span className="text-sm">Control Room</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Emergency Reports</CardTitle>
          <CardDescription>Track submitted emergency reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-sm">{report.type}</p>
                  <p className="text-xs text-muted-foreground">
                    {report.id} • {report.time}
                  </p>
                </div>
                <Badge 
                  variant={report.status === "Resolved" ? "secondary" : "destructive"}
                >
                  {report.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmergencyReporting;