import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Camera, CheckCircle, XCircle, User, Clock } from "lucide-react";

const FaceLogin = ({ onLoginSuccess }: { onLoginSuccess: () => void }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [loginStatus, setLoginStatus] = useState<'idle' | 'scanning' | 'success' | 'failed'>('idle');
  const [driverInfo, setDriverInfo] = useState<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Simulate camera access and face recognition
  const startFaceRecognition = async () => {
    setIsScanning(true);
    setLoginStatus('scanning');

    // Simulate face recognition process
    setTimeout(() => {
      // Simulate successful face match
      const mockDriverInfo = {
        name: "Rajesh Kumar Singh",
        employeeId: "DRV001",
        license: "PB-12-2019-0123456",
        loginTime: new Date().toLocaleTimeString(),
        photo: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iMjAiIGZpbGw9IiM2MzY2RjEiLz4KPHN2ZyB4PSI4IiB5PSI4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIGZpbGw9IndoaXRlIj4KICA8cGF0aCBkPSJNMTIgMTJjMi4yMSAwIDQtMS43OSA0LTRzLTEuNzktNC00LTQtNCAxLjc5LTQgNCAxLjc5IDQgNCA0em0wIDJjLTIuNjcgMC04IDEuMzQtOCA0djJoMTZ2LTJjMC0yLjY2LTUuMzMtNC04LTR6Ii8+Cjwvc3ZnPgo8L3N2Zz4K"
      };
      
      setDriverInfo(mockDriverInfo);
      setLoginStatus('success');
      setIsScanning(false);
      
      // Send login data to government portal
      setTimeout(() => {
        onLoginSuccess();
      }, 2000);
    }, 3000);
  };

  const resetLogin = () => {
    setLoginStatus('idle');
    setDriverInfo(null);
    setIsScanning(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-primary" />
            Biometric Face Authentication
          </CardTitle>
          <CardDescription>
            Automated driver login using computer vision and face recognition
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Camera View */}
          <div className="relative">
            <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
              {loginStatus === 'idle' && (
                <div className="text-center">
                  <Camera className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 font-medium">Position your face in the camera</p>
                  <p className="text-sm text-gray-500 mt-2">Face recognition will start automatically</p>
                </div>
              )}
              
              {loginStatus === 'scanning' && (
                <div className="text-center">
                  <div className="relative">
                    <div className="w-32 h-32 bg-blue-500/20 rounded-full border-4 border-blue-500 border-dashed animate-spin mx-auto mb-4"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <User className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  <p className="text-blue-600 font-medium animate-pulse">Scanning face...</p>
                  <p className="text-sm text-gray-500 mt-2">Please look straight at the camera</p>
                </div>
              )}
              
              {loginStatus === 'success' && driverInfo && (
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-green-600 font-medium">Authentication Successful!</p>
                  <p className="text-sm text-gray-500 mt-2">Welcome back, {driverInfo.name}</p>
                </div>
              )}
              
              {loginStatus === 'failed' && (
                <div className="text-center">
                  <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <XCircle className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-red-600 font-medium">Authentication Failed</p>
                  <p className="text-sm text-gray-500 mt-2">Face not recognized. Please try again.</p>
                </div>
              )}
            </div>
            
            {/* Status Overlay */}
            {isScanning && (
              <div className="absolute inset-0 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-blue-700">Face Recognition Active</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Driver Information */}
          {driverInfo && loginStatus === 'success' && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-green-800">{driverInfo.name}</h4>
                    <div className="space-y-1 text-sm text-green-700">
                      <p>Employee ID: {driverInfo.employeeId}</p>
                      <p>License: {driverInfo.license}</p>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        <span>Login Time: {driverInfo.loginTime}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Authenticated
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            {loginStatus === 'idle' && (
              <Button 
                onClick={startFaceRecognition}
                className="flex-1"
              >
                <Camera className="w-4 h-4 mr-2" />
                Start Face Recognition
              </Button>
            )}
            
            {loginStatus === 'scanning' && (
              <Button 
                variant="outline" 
                onClick={() => setLoginStatus('idle')}
                className="flex-1"
              >
                Cancel Scan
              </Button>
            )}
            
            {(loginStatus === 'success' || loginStatus === 'failed') && (
              <Button 
                variant="outline" 
                onClick={resetLogin}
                className="flex-1"
              >
                Scan Again
              </Button>
            )}
          </div>

          {/* System Info */}
          <div className="bg-blue-50 rounded-lg p-3">
            <h5 className="font-medium text-blue-800 mb-2">Automation Features:</h5>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Automatic face detection when driver sits</li>
              <li>• Biometric verification using computer vision</li>
              <li>• Login data sent to Government Portal</li>
              <li>• No manual login required</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FaceLogin;