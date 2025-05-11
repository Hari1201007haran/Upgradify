import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { GraduationCap, User, Compass, BookOpen, LogOut, Menu, X, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  active: boolean;
  onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, href, active, onClick }) => {
  return (
    <li>
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault();
          onClick();
        }}
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
          active
            ? "bg-primary text-primary-foreground"
            : "hover:bg-secondary text-foreground"
        )}
      >
        {icon}
        <span>{label}</span>
      </a>
    </li>
  );
};

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }
  }, [isMobile]);

  const navItems = [
    {
      icon: <Compass size={20} />,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: <GraduationCap size={20} />,
      label: "Careers",
      href: "/careers",
    },
    {
      icon: <BookOpen size={20} />,
      label: "Courses & Colleges",
      href: "/courses",
    },
    {
      icon: <Lightbulb size={20} />,
      label: "Expert Tips",
      href: "/expert-tips",
    },
    {
      icon: <User size={20} />,
      label: "Profile",
      href: "/profile",
    }
  ];

  const handleNavigation = (href: string) => {
    navigate(href);
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-background">
      {/* Mobile Header */}
      {isMobile && (
        <header className="sticky top-0 z-50 flex items-center justify-between p-4 bg-white/80 backdrop-blur-md border-b">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">After School</h1>
          </div>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </header>
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "z-40 fixed inset-y-0 left-0 w-64 transform transition-transform duration-300 ease-in-out bg-white/80 backdrop-blur-md border-r",
          isMobile ? (isSidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
        )}
      >
        <div className="flex flex-col h-full p-4">
          {/* App Logo */}
          <div className="flex items-center gap-2 py-6">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-semibold">After School</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 mt-8">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  active={location.pathname === item.href}
                  onClick={() => handleNavigation(item.href)}
                />
              ))}
            </ul>
          </nav>

          {/* User Info & Logout */}
          <div className="mt-auto pt-6 border-t">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User size={20} className="text-primary" />
              </div>
              <div>
                <p className="font-medium">{user?.fullName}</p>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={() => {
                logout();
                navigate('/login');
              }}
              className="flex items-center gap-2 text-sm px-4 py-2 w-full rounded-lg text-destructive hover:bg-destructive/10 transition-all"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 transition-all duration-300",
          isSidebarOpen && !isMobile ? "ml-64" : "ml-0"
        )}
      >
        {!isMobile && (
          <header className="sticky top-0 z-30 flex items-center justify-between p-4 bg-white/80 backdrop-blur-md border-b">
            <h1 className="text-xl font-semibold">
              {navItems.find(item => item.href === location.pathname)?.label || "After School"}
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </header>
        )}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
