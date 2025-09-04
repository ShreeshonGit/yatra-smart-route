import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, Phone, Lock, UserPlus } from "lucide-react";
import saralYatraLogo from "/lovable-uploads/840dd5e2-0b9e-4979-a974-de75ae35b815.png";
import { useToast } from "@/hooks/use-toast";

const PassengerLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const handleAutoLogin = () => {
    toast({
      title: "Welcome to Saral Yatra!",
      description: "You have been automatically logged in as a passenger.",
    });
    navigate("/passenger");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      toast({
        title: "Login Successful!",
        description: "Welcome back to Saral Yatra.",
      });
      navigate("/passenger");
    } else {
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Error",
          description: "Passwords do not match.",
          variant: "destructive"
        });
        return;
      }
      toast({
        title: "Registration Successful!",
        description: "Your account has been created successfully.",
      });
      navigate("/passenger");
    }
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
            <CardTitle className="text-2xl text-accent">
              {isLogin ? "Passenger Login" : "Create Account"}
            </CardTitle>
            <CardDescription>
              {isLogin 
                ? "Access your passenger portal to book tickets and track buses"
                : "Register for a new passenger account"
              }
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Auto Login Button */}
            <Button 
              onClick={handleAutoLogin}
              className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
              size="lg"
            >
              Quick Access (Auto Login)
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Login/Register Form */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email ID</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    className="pl-10"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
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

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      className="pl-10"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      required
                    />
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90">
                {isLogin ? "Login" : "Create Account"}
              </Button>

              {isLogin && (
                <div className="text-center">
                  <Button variant="link" className="text-primary hover:text-primary/80">
                    Forgot Password?
                  </Button>
                </div>
              )}
            </form>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <Button 
                  variant="link" 
                  className="text-primary hover:text-primary/80 p-0"
                  onClick={() => setIsLogin(!isLogin)}
                >
                  {isLogin ? "Register here" : "Login here"}
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PassengerLogin;