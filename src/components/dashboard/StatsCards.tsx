import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserX, Clock } from "lucide-react";
import { DashboardStats } from "@/types";

interface StatsCardsProps {
  stats: DashboardStats;
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  const cards = [
    {
      title: "Total Employees",
      value: stats.totalEmployees.toString(),
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary-light"
    },
    {
      title: "Present Today",
      value: stats.presentToday.toString(),
      icon: UserCheck,
      color: "text-success",
      bgColor: "bg-success-light"
    },
    {
      title: "On Leave",
      value: stats.onLeave.toString(),
      icon: UserX,
      color: "text-warning",
      bgColor: "bg-warning-light"
    },
    {
      title: "Avg. Hours/Day",
      value: `${stats.averageHours}h`,
      icon: Clock,
      color: "text-primary",
      bgColor: "bg-primary-light"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Card key={index} className="card-elevated">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <div className={`w-10 h-10 rounded-lg ${card.bgColor} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${card.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Updated in real-time
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCards;