import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Clock } from "lucide-react";

const AnalyticsDashboard = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Analytics Dashboard
          </CardTitle>
          <CardDescription>Performance metrics and insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold">94%</div>
              <div className="text-sm text-muted-foreground">On-Time Performance</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold">2,847</div>
              <div className="text-sm text-muted-foreground">Daily Passengers</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <Clock className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <div className="text-2xl font-bold">8.5 min</div>
              <div className="text-sm text-muted-foreground">Avg Delay</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <BarChart3 className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold">87%</div>
              <div className="text-sm text-muted-foreground">Route Efficiency</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;