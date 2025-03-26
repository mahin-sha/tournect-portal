
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  BarChart3, 
  CreditCard, 
  DollarSign, 
  MapPin, 
  Ticket, 
  TrendingUp,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';

// Mock data for charts
const revenueData = [
  { name: 'Jan', revenue: 6500 },
  { name: 'Feb', revenue: 8200 },
  { name: 'Mar', revenue: 7400 },
  { name: 'Apr', revenue: 9600 },
  { name: 'May', revenue: 8100 },
  { name: 'Jun', revenue: 11200 },
  { name: 'Jul', revenue: 12800 },
];

const ticketData = [
  { name: 'Paris Tour', sold: 120, stock: 245 },
  { name: 'London Eye', sold: 98, stock: 138 },
  { name: 'NYC Pass', sold: 156, stock: 210 },
  { name: 'Tokyo Tour', sold: 87, stock: 165 },
  { name: 'Rome Pass', sold: 75, stock: 190 },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border border-border p-2 rounded-md shadow-sm">
        <p className="text-sm font-medium">{`$${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const Index = () => {
  const { user } = useAuth();
  
  // Overview section with stats
  const stats = [
    {
      title: 'Total Revenue',
      value: '$48,560',
      description: 'Monthly revenue',
      icon: DollarSign,
      trend: { value: 12.5, isPositive: true },
    },
    {
      title: 'Ticket Sales',
      value: '1,234',
      description: 'Total tickets sold',
      icon: Ticket,
      trend: { value: 8.2, isPositive: true },
    },
    {
      title: 'Active Agents',
      value: '85',
      description: 'Agent accounts',
      icon: Users,
      trend: { value: 3.1, isPositive: true },
    },
    {
      title: 'Attractions',
      value: '24',
      description: 'Available attractions',
      icon: MapPin,
      trend: { value: 2.5, isPositive: false },
    },
  ];

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name || 'Guest'}. Here's an overview of your tour management platform.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
        {stats.map((stat, index) => (
          <DashboardCard
            key={index}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
            trend={stat.trend}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 50}ms` }}
          />
        ))}
      </div>

      <Tabs defaultValue="overview" className="mt-6 space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tickets">Tickets</TabsTrigger>
          <TabsTrigger value="agents">Agents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="animate-slide-up" style={{ animationDelay: '100ms' }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">Revenue Overview</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>Revenue trends over the past months</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={revenueData}>
                    <XAxis 
                      dataKey="name" 
                      stroke="#888888" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="revenue" 
                      fill="rgba(15, 23, 42, 0.2)" 
                      radius={[4, 4, 0, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card className="animate-slide-up" style={{ animationDelay: '150ms' }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-medium">Top Attractions</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </div>
                <CardDescription>Most popular tours and tickets</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ticketData.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-primary mr-2" />
                      <div className="flex-1 flex items-center justify-between">
                        <span className="text-sm font-medium">{item.name}</span>
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">{item.sold}</span> sold / {item.stock} in stock
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">Recent Transactions</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardDescription>Latest financial activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex justify-between items-center pb-4 border-b border-border/50 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        {i % 2 === 0 ? 
                          <CreditCard className="h-4 w-4 text-primary" /> : 
                          <Ticket className="h-4 w-4 text-primary" />
                        }
                      </div>
                      <div>
                        <div className="font-medium text-sm">
                          {i % 2 === 0 ? 'Ticket Purchase' : 'Wallet Deposit'}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className={`text-sm font-medium ${i % 2 === 0 ? 'text-red-500' : 'text-green-500'}`}>
                      {i % 2 === 0 ? '-$1,250.00' : '+$2,500.00'}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tickets">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Management</CardTitle>
              <CardDescription>
                Manage your ticket inventory, pricing, and sales.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                View detailed analytics about your ticket sales, inventory levels, and pricing strategies.
              </p>
              <Button variant="default" size="sm">View Tickets</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="agents">
          <Card>
            <CardHeader>
              <CardTitle>Agent Management</CardTitle>
              <CardDescription>
                Manage your travel agents and their bookings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Track agent performance, commissions, and manage credit limits.
              </p>
              <Button variant="default" size="sm">View Agents</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
