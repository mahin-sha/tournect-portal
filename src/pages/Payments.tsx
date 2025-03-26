
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  CreditCard, 
  Search, 
  Filter, 
  ArrowDownUp, 
  Plus, 
  Download,
  Receipt,
  CalendarClock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Wallet,
  BadgeCheck,
  ArrowDownLeft,
  ArrowUpRight
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from 'recharts';

// Mock data for payments
const paymentsData = [
  {
    id: "PMT1001",
    agent: {
      id: "A1001",
      name: "TravelMasters Inc."
    },
    amount: 5000.00,
    method: "Bank Transfer",
    type: "deposit",
    transactionDate: "2024-06-15T14:32:00",
    status: "completed",
    reference: "INV-2406-1001"
  },
  {
    id: "PMT1002",
    agent: {
      id: "A1002",
      name: "Global Tours Co."
    },
    amount: 2500.00,
    method: "Credit Card",
    type: "refund",
    transactionDate: "2024-06-14T11:15:00",
    status: "completed",
    reference: "REF-2406-1002"
  },
  {
    id: "PMT1003",
    agent: {
      id: "A1003",
      name: "Adventure Travels"
    },
    amount: 3250.00,
    method: "Wallet",
    type: "booking_payment",
    transactionDate: "2024-06-14T09:45:00",
    status: "completed",
    reference: "BKG-2406-1003"
  },
  {
    id: "PMT1004",
    agent: {
      id: "A1001",
      name: "TravelMasters Inc."
    },
    amount: 7500.00,
    method: "PayPal",
    type: "deposit",
    transactionDate: "2024-06-13T16:22:00",
    status: "pending",
    reference: "INV-2406-1004"
  },
  {
    id: "PMT1005",
    agent: {
      id: "A1004",
      name: "Sunshine Vacations"
    },
    amount: 2000.00,
    method: "Credit Card",
    type: "booking_payment",
    transactionDate: "2024-06-12T10:30:00",
    status: "completed",
    reference: "BKG-2406-1005"
  }
];

// Chart data
const paymentMethodData = [
  { name: 'Bank Transfer', value: 45 },
  { name: 'Credit Card', value: 30 },
  { name: 'PayPal', value: 15 },
  { name: 'Wallet', value: 10 },
];

const monthlyRevenueData = [
  { month: 'Jan', income: 42000, refunds: 2200 },
  { month: 'Feb', income: 48000, refunds: 3000 },
  { month: 'Mar', income: 55000, refunds: 2500 },
  { month: 'Apr', income: 61000, refunds: 3200 },
  { month: 'May', income: 58000, refunds: 2800 },
  { month: 'Jun', income: 65000, refunds: 3500 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case 'pending':
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    case 'failed':
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'deposit':
      return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
    case 'refund':
      return <ArrowUpRight className="h-4 w-4 text-red-500" />;
    case 'booking_payment':
      return <BadgeCheck className="h-4 w-4 text-blue-500" />;
    default:
      return <CreditCard className="h-4 w-4" />;
  }
};

const PaymentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Payment Management</h1>
        <p className="text-muted-foreground">
          Track and manage all financial transactions, payments, and refunds.
        </p>
      </div>

      {/* Payment analytics cards */}
      <div className="grid gap-4 md:grid-cols-3 mt-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-medium">Monthly Revenue</CardTitle>
            <CardDescription>Income vs refunds over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyRevenueData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`$${value.toLocaleString()}`, undefined]}
                  />
                  <Legend />
                  <Bar dataKey="income" name="Income" fill="#0088FE" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="refunds" name="Refunds" fill="#FF8042" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-medium">Payment Methods</CardTitle>
            <CardDescription>Distribution by payment type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-72 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethodData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {paymentMethodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value, name) => [`${value}%`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="mt-6 space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Payments</TabsTrigger>
          <TabsTrigger value="deposits">Deposits</TabsTrigger>
          <TabsTrigger value="bookings">Booking Payments</TabsTrigger>
          <TabsTrigger value="refunds">Refunds</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle>Payment History</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="default" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Payment
                  </Button>
                </div>
              </div>
              <CardDescription>
                View and manage all payment transactions across your platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Input 
                    placeholder="Search payments by ID, agent, or reference..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute left-3 top-2.5 text-muted-foreground">
                    <Search className="h-4 w-4" />
                  </div>
                </div>
                <Select defaultValue="all-time">
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Time Period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-time">All Time</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="this-week">This Week</SelectItem>
                    <SelectItem value="this-month">This Month</SelectItem>
                    <SelectItem value="last-month">Last Month</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">Payment ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Agent</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Type</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Amount</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Method</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Date</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Reference</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {paymentsData.map((payment) => (
                        <tr key={payment.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle font-medium">{payment.id}</td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-7 w-7">
                                <AvatarImage src="" alt={payment.agent.name} />
                                <AvatarFallback>{getInitials(payment.agent.name)}</AvatarFallback>
                              </Avatar>
                              <span>{payment.agent.name}</span>
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                {getTypeIcon(payment.type)}
                              </div>
                              <span className="capitalize">{payment.type.replace('_', ' ')}</span>
                            </div>
                          </td>
                          <td className="p-4 align-middle font-medium">
                            <span className={
                              payment.type === 'deposit' ? 'text-green-600' : 
                              payment.type === 'refund' ? 'text-red-600' : 
                              'text-blue-600'
                            }>
                              {payment.type === 'refund' ? '-' : ''}
                              ${payment.amount.toLocaleString()}
                            </span>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                              {payment.method === "Credit Card" ? <CreditCard className="h-4 w-4" /> : 
                               payment.method === "Wallet" ? <Wallet className="h-4 w-4" /> : 
                               <Receipt className="h-4 w-4" />}
                              {payment.method}
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                              <CalendarClock className="h-4 w-4 text-muted-foreground" />
                              {new Date(payment.transactionDate).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-1">
                              {getStatusIcon(payment.status)}
                              <Badge className={
                                payment.status === 'completed' ? 'bg-green-100 text-green-800' : 
                                payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'
                              }>
                                {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                              </Badge>
                            </div>
                          </td>
                          <td className="p-4 align-middle text-xs font-mono">
                            {payment.reference}
                          </td>
                          <td className="p-4 align-middle">
                            <Button variant="outline" size="sm">View</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* For simplicity, other tabs show simple content for now */}
        <TabsContent value="deposits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Deposit Transactions</CardTitle>
              <CardDescription>
                View and manage all wallet deposits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  This tab shows all agent deposit transactions, including payment methods and status.
                </p>
                <Button variant="default">View Deposit Transactions</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Booking Payments</CardTitle>
              <CardDescription>
                Track payments associated with bookings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  This tab shows payments made for attraction bookings, with links to the associated bookings.
                </p>
                <Button variant="default">View Booking Payments</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="refunds" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Refund Transactions</CardTitle>
              <CardDescription>
                Manage refunds for cancelled bookings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  This tab shows all refund transactions, including the original booking details and refund status.
                </p>
                <Button variant="default">View Refund Transactions</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentsPage;
