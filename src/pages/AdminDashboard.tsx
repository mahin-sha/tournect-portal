
import React from 'react';
import { 
  BarChart, 
  Users, 
  Building, 
  Map, 
  Ticket, 
  Wallet, 
  CalendarClock, 
  CreditCard, 
  FileText, 
  Bell,
  Bus,
  ScrollText,
  Receipt
} from 'lucide-react';
import DashboardModule from '@/components/admin/DashboardModule';

const AdminDashboard = () => {
  const adminModules = [
    {
      title: 'Reports',
      description: 'Sales, Revenue by Attraction & Agent',
      icon: <BarChart className="h-5 w-5" />,
      to: '/reports',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'User Management',
      description: 'Add, Edit, Delete Admin Users',
      icon: <Users className="h-5 w-5" />,
      to: '/users',
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      title: 'Agency Management',
      description: 'Add Agents & Manage Users',
      icon: <Building className="h-5 w-5" />,
      to: '/agents',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Attraction Management',
      description: 'Add Attractions & Packages',
      icon: <Map className="h-5 w-5" />,
      to: '/attractions',
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Ticket Management',
      description: 'Add Tickets & Inventory',
      icon: <Ticket className="h-5 w-5" />,
      to: '/tickets',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      title: 'Transport Management',
      description: 'Manage Transport Options',
      icon: <Bus className="h-5 w-5" />,
      to: '/transport',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      title: 'Payments & TopUp',
      description: 'Add Payment & Listing',
      icon: <CreditCard className="h-5 w-5" />,
      to: '/payments',
      color: 'bg-red-100 text-red-600'
    },
    {
      title: 'Agent Wallet',
      description: 'Markup, Discount & Reports',
      icon: <Wallet className="h-5 w-5" />,
      to: '/wallet',
      color: 'bg-pink-100 text-pink-600'
    },
    {
      title: 'Bookings',
      description: 'New Bookings & History',
      icon: <CalendarClock className="h-5 w-5" />,
      to: '/bookings',
      color: 'bg-teal-100 text-teal-600'
    },
    {
      title: 'Accounts',
      description: 'Financial Management',
      icon: <ScrollText className="h-5 w-5" />,
      to: '/accounts',
      color: 'bg-gray-100 text-gray-600'
    },
    {
      title: 'Invoice & Tax',
      description: 'Manage Invoices & Taxes',
      icon: <Receipt className="h-5 w-5" />,
      to: '/invoices',
      color: 'bg-violet-100 text-violet-600'
    },
    {
      title: 'Notifications',
      description: 'App Communications',
      icon: <Bell className="h-5 w-5" />,
      to: '/notifications',
      color: 'bg-cyan-100 text-cyan-600'
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Manage your tour booking system from a single dashboard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {adminModules.map((module) => (
          <DashboardModule
            key={module.title}
            title={module.title}
            description={module.description}
            icon={module.icon}
            to={module.to}
            color={module.color}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
