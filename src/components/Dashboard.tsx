import { TrendingUp, CheckCircle2, Clock, Target } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const weeklyData = [
  { day: "Mon", tasks: 8 },
  { day: "Tue", tasks: 12 },
  { day: "Wed", tasks: 6 },
  { day: "Thu", tasks: 15 },
  { day: "Fri", tasks: 10 },
  { day: "Sat", tasks: 4 },
  { day: "Sun", tasks: 2 },
];

const Dashboard = () => {
  const stats = [
    { label: "Total Tasks", value: "24", icon: CheckCircle2, trend: "+12%", color: "text-primary" },
    { label: "Completed", value: "18", icon: TrendingUp, trend: "+8%", color: "text-success" },
    { label: "In Progress", value: "4", icon: Clock, trend: "-2%", color: "text-warning" },
    { label: "Due Today", value: "2", icon: Target, trend: "0%", color: "text-destructive" },
  ];

  return (
    <div className="p-8 space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Welcome back, Alex!</h1>
        <p className="text-muted-foreground mt-1">Here's what's happening with your tasks today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-smooth animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center ${stat.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <span className={`text-sm font-medium ${stat.trend.startsWith('+') ? 'text-success' : stat.trend.startsWith('-') ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {stat.trend}
                </span>
              </div>
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Progress Chart */}
        <div className="lg:col-span-2 bg-card rounded-xl p-6 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Weekly Progress</h2>
              <p className="text-sm text-muted-foreground">Tasks completed this week</p>
            </div>
            <select className="px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option>This Week</option>
              <option>Last Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" axisLine={false} tickLine={false} className="text-xs" />
                <YAxis axisLine={false} tickLine={false} className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                    boxShadow: "var(--shadow-md)",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Bar dataKey="tasks" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
