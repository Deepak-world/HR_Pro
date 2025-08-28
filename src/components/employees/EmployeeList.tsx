import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Plus, Mail, MapPin, Calendar } from "lucide-react";
import { Employee } from "@/types";

const EmployeeList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data - in a real app, this would come from an API
  const [employees] = useState<Employee[]>([
    {
      id: "1",
      name: "Deepak Dash",
      email: "deepakdash1@company.com",
      department: "Engineering",
      position: "Senior Developer",
      startDate: "2023-01-15",
      status: "active"
    },
    {
      id: "2",
      name: "Monish Gupta",
      email: "monish.gupta@company.com",
      department: "Design",
      position: "UX Designer",
      startDate: "2023-03-20",
      status: "active"
    },
    {
      id: "3",
      name: "mohit Das",
      email: "mohit.das@company.com",
      department: "Marketing",
      position: "Marketing Manager",
      startDate: "2022-11-10",
      status: "on-leave"
    },
    {
      id: "4",
      name: "Nandini RK",
      email: "nandini.RK@company.com",
      department: "Engineering",
      position: "Frontend Developer",
      startDate: "2023-05-01",
      status: "active"
    },
    {
      id: "5",
      name: "David Brown",
      email: "david.brown@company.com",
      department: "Sales",
      position: "Sales Representative",
      startDate: "2023-02-14",
      status: "active"
    }
  ]);

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Employee['status']) => {
    switch (status) {
      case 'active':
        return 'bg-success text-success-foreground';
      case 'on-leave':
        return 'bg-warning text-warning-foreground';
      case 'inactive':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Employees</h1>
          <p className="text-muted-foreground mt-1">Manage your team members</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Employee
        </Button>
      </div>

      {/* Search */}
      <Card className="card-elevated">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search employees by name, email, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => (
          <Card key={employee.id} className="card-elevated hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={employee.avatar} />
                  <AvatarFallback className="text-lg font-semibold">
                    {getInitials(employee.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg truncate">{employee.name}</CardTitle>
                  <p className="text-sm text-muted-foreground truncate">{employee.position}</p>
                  <Badge className={`mt-2 ${getStatusColor(employee.status)}`}>
                    {employee.status.replace('-', ' ')}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">{employee.email}</span>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>{employee.department}</span>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>Started {new Date(employee.startDate).toLocaleDateString()}</span>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <Card className="card-elevated">
          <CardContent className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No employees found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search terms or add a new employee.
            </p>
            <Button className="mt-4">
              <Plus className="w-4 h-4 mr-2" />
              Add First Employee
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EmployeeList;