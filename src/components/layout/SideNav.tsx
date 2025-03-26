
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { 
  LayoutDashboard, 
  Map, 
  Ticket, 
  Users, 
  Wallet, 
  BarChart, 
  Settings,
  CreditCard,
  Calendar
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SideNavProps {
  isOpen: boolean;
}

interface NavItemProps {
  to: string;
  label: string;
  icon: React.ElementType;
  isOpen: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, label, icon: Icon, isOpen }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <NavLink
            to={to}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              isActive 
                ? "bg-primary/10 text-primary" 
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              !isOpen && "justify-center px-0"
            )}
          >
            <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
            {isOpen && <span>{label}</span>}
          </NavLink>
        </TooltipTrigger>
        {!isOpen && <TooltipContent side="right" sideOffset={10}>{label}</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
};

const SideNav: React.FC<SideNavProps> = ({ isOpen }) => {
  const { user } = useAuth();
  
  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/attractions', label: 'Attractions', icon: Map },
    { to: '/tickets', label: 'Tickets', icon: Ticket },
    { to: '/agents', label: 'Agents', icon: Users },
    { to: '/wallet', label: 'Wallet', icon: Wallet },
    { to: '/bookings', label: 'Bookings', icon: Calendar },
    { to: '/payments', label: 'Payments', icon: CreditCard },
    { to: '/reports', label: 'Reports', icon: BarChart },
    { to: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className={cn(
      "fixed top-16 bottom-0 left-0 z-30 glass-morphism border-r border-border/40 py-4 transition-all duration-300 ease-in-out flex flex-col",
      isOpen ? "w-64" : "w-16"
    )}>
      <div className="flex-1 px-3">
        {user?.role === 'agent' && (
          <div className={cn(
            "mb-6 p-3 rounded-lg bg-primary/5 border border-primary/10 text-sm",
            !isOpen && "p-2"
          )}>
            {isOpen ? (
              <>
                <div className="font-medium mb-1">Wallet Balance</div>
                <div className="text-lg font-semibold">${user.walletBalance?.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Credit Limit: ${user.creditLimit?.toLocaleString()}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center">
                <Wallet className="h-5 w-5 text-primary/70 mb-1" />
                <div className="text-xs font-semibold">${user.walletBalance?.toLocaleString()}</div>
              </div>
            )}
          </div>
        )}

        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              to={item.to}
              label={item.label}
              icon={item.icon}
              isOpen={isOpen}
            />
          ))}
        </nav>
      </div>
      
      <div className={cn(
        "mt-auto pt-4 px-3 border-t border-border/40 text-xs text-muted-foreground",
        !isOpen && "text-center"
      )}>
        {isOpen ? (
          <div>TourConnect v1.0.0</div>
        ) : (
          <div>v1.0</div>
        )}
      </div>
    </aside>
  );
};

export default SideNav;
