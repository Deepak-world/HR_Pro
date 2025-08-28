// HRMS Type Definitions

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  avatar?: string;
  startDate: string;
  status: 'active' | 'inactive' | 'on-leave';
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  clockIn: string;
  clockOut?: string;
  date: string;
  totalHours?: number;
  status: 'present' | 'absent' | 'partial' | 'late';
  notes?: string;
}

export interface ClockInOutData {
  name: string;
  email: string;
  clockIn: string;
  clockOut?: string;
  date: string;
}

export interface DashboardStats {
  totalEmployees: number;
  presentToday: number;
  onLeave: number;
  lateArrivals: number;
  averageHours: number;
}

export interface TimeEntry {
  id: string;
  employeeId: string;
  project: string;
  task: string;
  hours: number;
  date: string;
  description?: string;
}