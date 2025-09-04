import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, BadgeCheck, Lock } from "lucide-react";
import saralYatraLogo from "/lovable-uploads/840dd5e2-0b9e-4979-a974-de75ae35b815.png";
import { useToast } from "@/hooks/use-toast";

const EmployeeLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "conductor";
  
  const [formData, setFormData] = useState({
    employeeId: "",
    password: ""
  });

  const roleConfig = {
    conductor: {
      title: "Conductor Portal",
      description: "Manage tickets, seat allocation, and passenger safety",
      route: "/conductor"
    },
    driver: {
      title: "Driver Portal", 
      description: "Navigation, traffic alerts, and route management",
      route: "/driver"
    },
    government: {
      title: "Government Portal",
      description: "Fleet monitoring, analytics, and oversight", 
      route: "/government"
    }
  };

  const currentRole = roleConfig[role as keyof typeof roleConfig] || roleConfig.conductor;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.employeeId || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Login Successful!",
      description: `Welcome to ${currentRole.title}.`,
    });
    navigate(currentRole.route);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/20"
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center gap-4">
            <img 
              src={saralYatraLogo} 
              alt="Saral Yatra Logo" 
              className="w-12 h-12 object-contain"
            />
            <div>
              <h1 className="text-xl font-bold text-white">Saral Yatra</h1>
              <p className="text-white/80 text-xs">Aapka Apna Yatra Saathi</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-elegant">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-accent capitalize">
              {currentRole.title}
            </CardTitle>
            <CardDescription>
              {currentRole.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="employeeId">Employee ID</Label>
                <div className="relative">
                  <BadgeCheck className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="employeeId"
                    type="text"
                    placeholder="Enter your employee ID"
                    className="pl-10"
                    value={formData.employeeId}
                    onChange={(e) => setFormData(prev => ({ ...prev, employeeId: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                size="lg"
              >
                Access {role.charAt(0).toUpperCase() + role.slice(1)} Portal
              </Button>

              <div className="text-center">
                <Button variant="link" className="text-primary hover:text-primary/80">
                  Forgot Password?
                </Button>
              </div>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground text-center mb-2">Demo Credentials:</p>
              <p className="text-xs text-center">ID: DEMO001 | Password: demo123</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default EmployeeLogin;