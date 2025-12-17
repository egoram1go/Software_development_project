import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import LoginPage from "@/components/LoginPage";
import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";
import TaskList from "@/components/TaskList";
import CalendarView from "@/components/CalendarView";
import ProfileSettings from "@/components/ProfileSettings";

import { me, logout } from "@/lib/api";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [currentView, setCurrentView] = useState("dashboard");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    me().then((user) => {
      setIsAuthenticated(!!user);
    });
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const handleLogin = async () => {
    const user = await me();
    setIsAuthenticated(!!user);
  };

  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
    setCurrentView("dashboard");
  };

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard />;
      case "tasks":
        return <TaskList />;
      case "calendar":
        return <CalendarView />;
      case "settings":
        return <ProfileSettings />;
      default:
        return <Dashboard />;
    }
  };

  if (isAuthenticated === null) return null;

  if (!isAuthenticated) {
    return (
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LoginPage onLogin={handleLogin} />
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="flex min-h-screen bg-background">
        <Sidebar
          currentView={currentView}
          onNavigate={setCurrentView}
          onLogout={handleLogout}
          isDark={isDark}
          onToggleTheme={() => setIsDark(!isDark)}
        />
        <main className="flex-1 overflow-auto">
          {renderView()}
        </main>
      </div>
    </TooltipProvider>
  );
};

export default App;
