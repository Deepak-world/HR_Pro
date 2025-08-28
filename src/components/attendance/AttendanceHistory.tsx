import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  Download, 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle 
} from "lucide-react";
import { AttendanceRecord } from "@/types";

const AttendanceHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");

  // Mock data - in a real app, this would come from an API
  const [attendanceRecords] = useState<AttendanceRecord[]>([
    {
      id: "1",
      employeeId: "1",
      employeeName: "Deepak Dash",
      employeeEmail: "deepak.dash@company.com",
      clockIn: "2024-01-15T09:00:00",
      clockOut: "2024-01-15T17:30:00",
      date: "2024-01-15",
      totalHours: 8.5,
      status: "present"
    },
    {
      id: "2",
      employeeId: "2",
      employeeName: "Monish Gupta",
      employeeEmail: "monish.gupta@company.com",
      clockIn: "2024-01-15T09:15:00",
      clockOut: "2024-01-15T17:45:00",
      date: "2024-01-15",
      totalHours: 8.5,
      status: "late"
    },
    {
      id: "3",
      employeeId: "4",
      employeeName: "Emily Chen",
      employeeEmail: "emily.chen@company.com",
      clockIn: "2024-01-15T08:45:00",
      clockOut: "2024-01-15T17:15:00",
      date: "2024-01-15",
      totalHours: 8.5,
      status: "present"
    },
    {
      id: "4",
      employeeId: "1",
      employeeName: "John Doe",
      employeeEmail: "john.doe@company.com",
      clockIn: "2024-01-14T09:05:00",
      clockOut: "2024-01-14T16:00:00",
      date: "2024-01-14",
      totalHours: 6.9,
      status: "partial"
    },
    {
      id: "5",
      employeeId: "3",
      employeeName: "Mike Johnson",
      employeeEmail: "mike.johnson@company.com",
      clockIn: "",
      date: "2024-01-14",
      totalHours: 0,
      status: "absent"
    }
  ]);

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !dateFilter || record.date === dateFilter;
    return matchesSearch && matchesDate;
  });

  const getStatusIcon = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'late':
        return <AlertCircle className="w-4 h-4 text-warning" />;
      case 'partial':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'absent':
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Clock className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: AttendanceRecord['status']) => {
    switch (status) {
      case 'present':
        return 'bg-success text-success-foreground';
      case 'late':
        return 'bg-warning text-warning-foreground';
      case 'partial':
        return 'bg-warning text-warning-foreground';
      case 'absent':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatTime = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Attendance History</h1>
          <p className="text-muted-foreground mt-1">Track employee attendance and working hours</p>
        </div>
        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Filters */}
      <Card className="card-elevated">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by employee name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="pl-10 w-auto"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attendance Records */}
      <div className="space-y-4">
        {filteredRecords.map((record) => (
          <Card key={record.id} className="card-elevated">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={`/placeholder.svg`} />
                    <AvatarFallback>
                      {getInitials(record.employeeName)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-foreground">{record.employeeName}</h3>
                      <Badge className={getStatusColor(record.status)}>
                        {record.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{record.employeeEmail}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    {formatDate(record.date)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {record.totalHours ? `${record.totalHours}h worked` : 'No hours logged'}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(record.status)}
                    <div>
                      <p className="text-xs text-muted-foreground">Clock In</p>
                      <p className="text-sm font-medium">
                        {formatTime(record.clockIn)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Clock Out</p>
                      <p className="text-sm font-medium">
                        {record.clockOut ? formatTime(record.clockOut) : 'Not clocked out'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Total Hours</p>
                      <p className="text-sm font-medium">
                        {record.totalHours ? `${record.totalHours}h` : '0h'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRecords.length === 0 && (
        <Card className="card-elevated">
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No attendance records found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or date filter.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AttendanceHistory;