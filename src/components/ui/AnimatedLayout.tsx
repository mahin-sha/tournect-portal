
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Navbar from '@/components/layout/Navbar';
import SideNav from '@/components/layout/SideNav';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

interface AnimatedLayoutProps {
  children: React.ReactNode;
}

const AnimatedLayout: React.FC<AnimatedLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  
  // Handle sidebar state based on screen size
  useEffect(() => {
    const handleResize = () => {
      // Keep sidebar closed by default even on larger screens
      // since we now have navigation in the top bar
      setSidebarOpen(false);
    };
    
    // Set initial state
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Don't render navigation for login page or unauthenticated users
  const showNavigation = isAuthenticated && location.pathname !== '/login';

  return (
    <div className="min-h-screen bg-background">
      {showNavigation && (
        <>
          <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <SideNav isOpen={sidebarOpen} />
        </>
      )}
      
      <main className={cn(
        "min-h-screen transition-all duration-300",
        showNavigation ? "pt-16" : "",
        showNavigation && sidebarOpen ? "pl-64" : showNavigation ? "pl-16" : ""
      )}>
        <div className={cn(
          showNavigation ? "container py-6 px-4 md:px-6 max-w-7xl mx-auto" : "w-full h-full"
        )}>
          <TransitionGroup component={null}>
            <CSSTransition
              key={location.pathname}
              timeout={300}
              classNames="page-transition"
              unmountOnExit
            >
              <div className="page-container">
                {children}
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
      </main>
    </div>
  );
};

export default AnimatedLayout;
