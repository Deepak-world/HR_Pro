import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import StatsCards from "./StatsCards";
import { 
  Clock, 
  TrendingUp, 
  Users, 
  Calendar,
  ArrowRight,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { DashboardStats } from "@/types";

const DashboardOverview = () => {
  // Mock data - in a real app, this would come from an API
  const stats: DashboardStats = {
    totalEmployees: 24,
    presentToday: 18,
    onLeave: 3,
    lateArrivals: 2,
    averageHours: 8.2
  };

  const recentActivity = [
    {
      id: "1",
      employeeName: "Deepak.Dash",
      action: "Clocked in",
      time: "09:15 AM",
      status: "late"
    },
    {
      id: "2",
      employeeName: "Monish Gupta",
      action: "Clocked out",
      time: "05:30 PM",
      status: "on-time"
    },
    {
      id: "3",
      employeeName: "Nandini RK",
      action: "Clocked in",
      time: "08:45 AM",
      status: "early"
    },
    {
      id: "4",
      employeeName: "Mike Johnson",
      action: "Applied for leave",
      time: "02:30 PM",
      status: "pending"
    }
  ];

  const upcomingEvents = [
    {
      id: "1",
      title: "Team Meeting",
      time: "10:00 AM",
      date: "Today",
      type: "meeting"
    },
    {
      id: "2",
      title: "Sarah Wilson - Leave",
      time: "All Day",
      date: "Tomorrow",
      type: "leave"
    },
    {
      id: "3",
      title: "Performance Review",
      time: "02:00 PM",
      date: "Friday",
      type: "review"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-time':
      case 'early':
        return 'bg-success text-success-foreground';
      case 'late':
        return 'bg-warning text-warning-foreground';
      case 'pending':
        return 'bg-primary text-primary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Good morning, Deepak Dash! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your team today.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <p className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="card-elevated">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                Recent Activity
              </CardTitle>
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="text-sm">
                        {getInitials(activity.employeeName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{activity.employeeName}</p>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{activity.time}</p>
                    <Badge className={`mt-1 ${getStatusColor(activity.status)}`}>
                      {activity.status.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                View All Employees
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Clock className="w-4 h-4 mr-2" />
                Attendance Report
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Meeting
              </Button>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                Upcoming Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{event.title}</p>
                    <p className="text-sm text-muted-foreground">{event.time}</p>
                    <p className="text-xs text-muted-foreground mt-1">{event.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-success" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Google Sheets Sync</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-success mr-2"></div>
                  <span className="text-sm text-success">Active</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Clock System</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-success mr-2"></div>
                  <span className="text-sm text-success">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Notifications</span>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-warning mr-2"></div>
                  <span className="text-sm text-warning">Limited</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;