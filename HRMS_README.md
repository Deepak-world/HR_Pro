# CronosHR - Human Resource Management System

A comprehensive HRMS (Human Resource Management System) built with React, TypeScript, and Tailwind CSS, featuring real-time attendance tracking, employee management, and Google Sheets integration.

## 🚀 Features

- **Dashboard Overview**: Real-time statistics and activity monitoring
- **Clock In/Out System**: Easy time tracking with Google Sheets integration  
- **Employee Management**: Complete employee directory with search and filtering
- **Attendance History**: Comprehensive attendance tracking and reporting
- **Real-time Data Sync**: Automatic data synchronization with Google Sheets
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Professional UI**: Clean, corporate design with excellent UX

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                     # Reusable UI components (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ... (other UI components)
│   ├── layout/
│   │   └── DashboardLayout.tsx # Main application layout with sidebar
│   ├── dashboard/
│   │   ├── DashboardOverview.tsx   # Main dashboard view
│   │   └── StatsCards.tsx          # Statistics cards component
│   ├── attendance/
│   │   ├── ClockInOut.tsx          # Clock in/out functionality
│   │   └── AttendanceHistory.tsx   # Attendance records display
│   └── employees/
│       └── EmployeeList.tsx        # Employee management interface
├── pages/
│   ├── Index.tsx               # Main application page
│   └── NotFound.tsx           # 404 error page
├── lib/
│   ├── utils.ts               # Utility functions
│   └── google-sheets.ts       # Google Sheets integration service
├── hooks/
│   ├── use-toast.ts           # Toast notification hook
│   └── use-mobile.tsx         # Mobile detection hook
├── types/
│   └── index.ts               # TypeScript type definitions
├── index.css                  # Global styles and design system
└── main.tsx                   # Application entry point
```

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui
- **State Management**: React hooks
- **Routing**: React Router DOM
- **Data Integration**: Google Sheets API
- **Icons**: Lucide React
- **Notifications**: Sonner + Custom toast system

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd hrms-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080`

### Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔗 Google Sheets Integration

The system integrates with Google Sheets for data persistence. The provided Google Apps Script URL is configured to handle:

- Employee name and email
- Clock in/out timestamps
- Date tracking
- Total hours calculation
- Automatic data synchronization

### Google Sheets Setup

1. The system uses the provided Google Apps Script URL for data submission
2. Data is automatically formatted and sent when employees clock in/out
3. All attendance data is stored persistently in your Google Sheet
4. Real-time synchronization ensures data integrity

## 🎨 Design System

The application features a professional corporate design system with:

- **Clean white background** as requested
- **Professional blue/gray color palette**
- **Consistent spacing and typography**
- **Subtle shadows and borders**
- **Smooth animations and transitions**
- **Responsive grid layouts**
- **Accessible color contrasts**

### Color Palette

- Primary: Professional blue (`hsl(217 91% 60%)`)
- Success: Clean green (`hsl(142 71% 45%)`)
- Warning: Professional orange (`hsl(38 92% 50%)`)
- Background: Pure white (`hsl(0 0% 100%)`)
- Text: Dark gray (`hsl(220 13% 18%)`)

## 📊 Key Components

### Dashboard
- Real-time employee statistics
- Recent activity feed
- Quick action buttons
- System status indicators
- Upcoming events calendar

### Attendance System
- One-click clock in/out functionality
- Real-time working hours tracking
- Automatic Google Sheets data submission
- Visual time tracking with live updates
- Employee information validation

### Employee Management
- Complete employee directory
- Advanced search and filtering
- Employee status tracking (active, on-leave, inactive)
- Contact information management
- Department and position tracking

### Reports & Analytics
- Attendance history with detailed records
- Status-based filtering (present, late, absent)
- Export functionality for reports
- Date-range filtering
- Visual status indicators

## 🔧 Development Commands

```bash
# Development server
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Responsive Design

The application is fully responsive and optimized for:

- **Desktop**: Full sidebar navigation with expanded layout
- **Tablet**: Collapsible sidebar with optimized spacing
- **Mobile**: Mobile-first design with touch-friendly interactions

## 🔐 Security Features

- Input validation for all form fields
- Secure data transmission to Google Sheets
- Client-side data persistence with localStorage
- Error handling and user feedback
- Graceful degradation for network issues

## 🚀 Deployment

The application can be deployed to any modern web hosting platform:

1. **Build the project**: `npm run build`
2. **Deploy the `dist` folder** to your hosting provider
3. **Configure environment variables** if needed
4. **Ensure Google Sheets URL** is accessible from your domain

## 📈 Future Enhancements

- Advanced reporting and analytics
- Role-based access control
- Email notifications
- Mobile app integration
- Advanced leave management
- Performance metrics dashboard
- Integration with payroll systems

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of an academic assignment and is for educational purposes.

---

**CronosHR** - Making HR management simple, efficient, and modern. ⏰