import { LayoutDashboard, CheckSquare, Calendar, Settings, LogOut, Sun, Moon, CheckCircle } from "lucide-react";

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
  isDark: boolean;
  onToggleTheme: () => void;
}

const Sidebar = ({ currentView, onNavigate, onLogout, isDark, onToggleTheme }: SidebarProps) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "tasks", label: "Tasks", icon: CheckSquare },
    { id: "calendar", label: "Calendar", icon: Calendar },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="w-64 h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-sidebar-foreground">TaskTrackr</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full nav-item ${isActive ? "nav-item-active" : ""}`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-sidebar-border space-y-2">
        {/* Theme toggle */}
        <button
          onClick={onToggleTheme}
          className="w-full nav-item"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
        </button>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full nav-item text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
