
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { 
  ChevronDown, 
  LogOut, 
  Menu, 
  User, 
  Bell, 
  Search
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 h-16 z-40 glass-morphism border-b border-border/40 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="mr-2 text-foreground/80 hover:text-foreground transition-colors"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="font-semibold text-lg">TourConnect</div>
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
