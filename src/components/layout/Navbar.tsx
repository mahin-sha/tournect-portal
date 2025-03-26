
import React, { useState } from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { 
  ChevronDown, 
  LogOut, 
  Menu, 
  User, 
  Bell, 
  Search,
  LayoutDashboard,
  Map,
  Ticket,
  Users,
  Wallet,
  Calendar,
  CreditCard,
  BarChart,
  Settings,
  UserPlus
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showSearch, setShowSearch] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed top-0 left-0 right-0 h-16 z-40 glass-morphism border-b border-border/40 px-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="text-foreground/80 hover:text-foreground transition-colors"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="font-semibold text-lg">TourConnect</div>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavLink to="/">
                <NavigationMenuLink 
                  className={cn(
                    navigationMenuTriggerStyle(),
                    isActive('/') && "bg-accent text-accent-foreground"
                  )}
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavLink to="/attractions">
                <NavigationMenuLink 
                  className={cn(
                    navigationMenuTriggerStyle(),
                    isActive('/attractions') && "bg-accent text-accent-foreground"
                  )}
                >
                  <Map className="w-4 h-4 mr-2" />
                  Attractions
                </NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavLink to="/tickets">
                <NavigationMenuLink 
                  className={cn(
                    navigationMenuTriggerStyle(),
                    isActive('/tickets') && "bg-accent text-accent-foreground"
                  )}
                >
                  <Ticket className="w-4 h-4 mr-2" />
                  Tickets
                </NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger className={isActive('/agents') ? "bg-accent text-accent-foreground" : ""}>
                <Users className="w-4 h-4 mr-2" />
                Agents
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-2 p-2">
                  <li>
                    <NavigationMenuLink asChild>
                      <NavLink 
                        to="/agents" 
                        className={cn(
                          "flex items-center gap-2 p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors",
                          isActive('/agents') && "bg-accent text-accent-foreground"
                        )}
                      >
                        <Users className="w-4 h-4" />
                        <span>All Agents</span>
                      </NavLink>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => {
                          // Handle create user action
                          const agentId = "current-agent-id"; // In a real app, get the current agent ID
                          const agentName = "Current Agent"; // In a real app, get the current agent name
                          navigate(`/agents?action=add-user&agentId=${agentId}&agentName=${encodeURIComponent(agentName)}`);
                        }}
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        <span>Create User</span>
                      </Button>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavLink to="/wallet">
                <NavigationMenuLink 
                  className={cn(
                    navigationMenuTriggerStyle(),
                    isActive('/wallet') && "bg-accent text-accent-foreground"
                  )}
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Wallet
                </NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavLink to="/bookings">
                <NavigationMenuLink 
                  className={cn(
                    navigationMenuTriggerStyle(),
                    isActive('/bookings') && "bg-accent text-accent-foreground"
                  )}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Bookings
                </NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavLink to="/payments">
                <NavigationMenuLink 
                  className={cn(
                    navigationMenuTriggerStyle(),
                    isActive('/payments') && "bg-accent text-accent-foreground"
                  )}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Payments
                </NavigationMenuLink>
              </NavLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="flex items-center gap-2">
        <div className={cn(
          "transition-all duration-300 overflow-hidden flex items-center",
          showSearch ? "w-64" : "w-0"
        )}>
          <Input 
            placeholder="Search..." 
            className={cn(
              "rounded-full bg-secondary/80 border-none h-9 pl-4 pr-8 focus-visible:ring-1 focus-visible:ring-primary/20",
              !showSearch && "opacity-0"
            )}
          />
        </div>

        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setShowSearch(!showSearch)}
          className="text-foreground/70 hover:text-foreground transition-colors"
        >
          <Search className="h-5 w-5" />
        </Button>

        <Button 
          variant="ghost" 
          size="icon"
          className="text-foreground/70 hover:text-foreground transition-colors"
        >
          <Bell className="h-5 w-5" />
        </Button>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 h-9 px-2 hover:bg-secondary/80 transition-colors">
                <div className="h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                  <User className="h-4 w-4" />
                </div>
                <div className="flex flex-col items-start text-sm">
                  <span className="font-medium">{user.name}</span>
                  <span className="text-xs text-muted-foreground capitalize">{user.role}</span>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 mt-1">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button
            variant="default"
            size="sm"
            onClick={() => navigate('/login')}
            className="ml-2"
          >
            Sign In
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
