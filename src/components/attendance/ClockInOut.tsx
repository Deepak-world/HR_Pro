  import { useState, useEffect } from "react";
  import { Button } from "@/components/ui/button";
  import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Clock, Play, Square } from "lucide-react";
  import { submitToGoogleSheet, calculateTotalHours } from "@/lib/google-sheets";
  import { useToast } from "@/hooks/use-toast";

  const ClockInOut = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [isClockedIn, setIsClockedIn] = useState(false);
    const [clockInTime, setClockInTime] = useState<string>("");
    const [employeeName, setEmployeeName] = useState("");
    const [employeeEmail, setEmployeeEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
      const timer = setInterval(() => setCurrentTime(new Date()), 1000);
      return () => clearInterval(timer);
    }, []);

    useEffect(() => {
      // Check if user is already clocked in
      const clockedInData = localStorage.getItem('clockedInData');
      if (clockedInData) {
        const data = JSON.parse(clockedInData);
        setIsClockedIn(true);
        setClockInTime(data.clockInTime);
        setEmployeeName(data.employeeName);
        setEmployeeEmail(data.employeeEmail);
      }
    }, []);

    const handleClockIn = async () => {
      if (!employeeName || !employeeEmail) {
        toast({
          title: "Missing Information",
          description: "Please enter your name and email before clocking in.",
          variant: "destructive"
        });
        return;
      }

      setIsLoading(true);
      const clockInDateTime = new Date().toISOString();
      
      try {
        const success = await submitToGoogleSheet({
          name: employeeName,
          email: employeeEmail,
          clockIn: clockInDateTime,
          date: new Date().toISOString().split('T')[0]
        });

        if (success) {
          setIsClockedIn(true);
          setClockInTime(clockInDateTime);
          
          // Store in localStorage
          localStorage.setItem('clockedInData', JSON.stringify({
            clockInTime: clockInDateTime,
            employeeName,
            employeeEmail
          }));

          toast({
            title: "Clocked In Successfully",
            description: `Welcome ${employeeName}! Your attendance has been recorded.`,
          });
        } else {
          throw new Error("Failed to submit to Google Sheets");
        }
      } catch (error) {
        toast({
          title: "Clock In Failed",
          description: "There was an error recording your clock in. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    const handleClockOut = async () => {
      setIsLoading(true);
      const clockOutDateTime = new Date().toISOString();
      const totalHours = calculateTotalHours(clockInTime, clockOutDateTime);
      
      try {
        const success = await submitToGoogleSheet({
          name: employeeName,
          email: employeeEmail,
          clockIn: clockInTime,
          clockOut: clockOutDateTime,
          date: new Date().toISOString().split('T')[0],
          totalHours
        });

        if (success) {
          setIsClockedIn(false);
          setClockInTime("");
          
          // Clear localStorage
          localStorage.removeItem('clockedInData');

          toast({
            title: "Clocked Out Successfully",
            description: `Thank you ${employeeName}! You worked ${totalHours} hours today.`,
          });

          // Clear form
          setEmployeeName("");
          setEmployeeEmail("");
        } else {
          throw new Error("Failed to submit to Google Sheets");
        }
      } catch (error) {
        toast({
          title: "Clock Out Failed",
          description: "There was an error recording your clock out. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    const getWorkedTime = () => {
      if (!clockInTime) return "00:00:00";
      const start = new Date(clockInTime);
      const now = new Date();
      const diff = now.getTime() - start.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
      <div className="max-w-md mx-auto">
        <Card className="card-elevated">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">
              {currentTime.toLocaleTimeString()}
            </CardTitle>
            <p className="text-muted-foreground">
              {currentTime.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {!isClockedIn && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={employeeEmail}
                    onChange={(e) => setEmployeeEmail(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            )}

            {isClockedIn && (
              <div className="text-center space-y-2">
                <p className="text-sm text-muted-foreground">Working Time</p>
                <p className="text-3xl font-mono font-bold text-primary">{getWorkedTime()}</p>
                <p className="text-sm text-muted-foreground">
                  Clocked in at {new Date(clockInTime).toLocaleTimeString()}
                </p>
              </div>
            )}

            <Button
              className="w-full h-12 text-lg"
              onClick={isClockedIn ? handleClockOut : handleClockIn}
              disabled={isLoading}
              variant={isClockedIn ? "destructive" : "default"}
            >
              {isLoading ? (
                "Processing..."
              ) : isClockedIn ? (
                <>
                  <Square className="w-5 h-5 mr-2" />
                  Clock Out
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Clock In
                </>
              )}
            </Button>

            {isClockedIn && (
              <p className="text-center text-sm text-muted-foreground">
                Logged in as <span className="font-medium">{employeeName}</span>
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  export default ClockInOut;