import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import DashboardOverview from "@/components/dashboard/DashboardOverview";
import ClockInOut from "@/components/attendance/ClockInOut";
import AttendanceHistory from "@/components/attendance/AttendanceHistory";
import EmployeeList from "@/components/employees/EmployeeList";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />;
      case "attendance":
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground mb-2">Attendance Tracking</h1>
              <p className="text-muted-foreground">Clock in and out to track your working hours</p>
            </div>
            <ClockInOut />
            <AttendanceHistory />
          </div>
        );
      case "employees":
        return <EmployeeList />;
      case "reports":
        return (
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">Reports & Analytics</h1>
            <p className="text-muted-foreground">Detailed reports and insights coming soon...</p>
          </div>
        );
      case "settings":
        return (
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">Settings</h1>
            <p className="text-muted-foreground">System configuration and preferences coming soon...</p>
          </div>
        );
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <DashboardLayout 
      activeTab={activeTab} 
      onTabChange={setActiveTab}
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default Index;
