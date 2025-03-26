
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Search, 
  Filter, 
  ArrowDownUp, 
  Plus, 
  MapPin, 
  Ticket,
  Users,
  CalendarClock,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock data for bookings
const bookingsData = [
  {
    id: "BKG1001",
    attraction: "Paris Tour",
    agent: {
      id: "A1001",
      name: "TravelMasters Inc."
    },
    ticketCount: 25,
    totalAmount: 1375.00,
    bookingDate: "2024-06-15T10:15:00",
    visitDate: "2024-07-10",
    status: "confirmed",
    paymentStatus: "paid"
  },
  {
    id: "BKG1002",
    attraction: "London Eye",
    agent: {
      id: "A1002",
      name: "Global Tours Co."
    },
    ticketCount: 15,
    totalAmount: 630.00,
    bookingDate: "2024-06-14T14:30:00",
    visitDate: "2024-07-05",
    status: "confirmed",
    paymentStatus: "paid"
  },
  {
    id: "BKG1003",
    attraction: "NYC Pass",
    agent: {
      id: "A1003",
      name: "Adventure Travels"
    },
    ticketCount: 10,
    totalAmount: 750.00,
    bookingDate: "2024-06-14T09:45:00",
    visitDate: "2024-08-12",
    status: "pending",
    paymentStatus: "awaiting"
  },
  {
    id: "BKG1004",
    attraction: "Tokyo Tour",
    agent: {
      id: "A1001",
      name: "TravelMasters Inc."
    },
    ticketCount: 12,
    totalAmount: 1080.00,
    bookingDate: "2024-06-13T16:22:00",
    visitDate: "2024-07-25",
    status: "confirmed",
    paymentStatus: "paid"
  },
  {
    id: "BKG1005",
    attraction: "Rome Pass",
    agent: {
      id: "A1004",
      name: "Sunshine Vacations"
    },
    ticketCount: 8,
    totalAmount: 520.00,
    bookingDate: "2024-06-12T10:30:00",
    visitDate: "2024-07-18",
    status: "cancelled",
    paymentStatus: "refunded"
  }
];

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'confirmed':
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    case 'pending':
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    case 'cancelled':
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
};

const BookingsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Booking Management</h1>
        <p className="text-muted-foreground">
          Track and manage all agent bookings, ticket allocations, and visit schedules.
        </p>
      </div>

      <Tabs defaultValue="all" className="mt-6 space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Bookings</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle>Booking History</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <ArrowDownUp className="h-4 w-4 mr-2" />
                    Sort
                  </Button>
                  <Button variant="default" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Booking
                  </Button>
                </div>
              </div>
              <CardDescription>
                View and manage all agent bookings across attractions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Input 
                    placeholder="Search bookings by ID, attraction or agent..."
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
                        <th className="h-12 px-4 text-left align-middle font-medium">Booking ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Attraction</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Agent</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Ticket Count</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Total Amount</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Booking Date</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Visit Date</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Payment</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {bookingsData.map((booking) => (
                        <tr key={booking.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle font-medium">{booking.id}</td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              {booking.attraction}
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-7 w-7">
                                <AvatarImage src="" alt={booking.agent.name} />
                                <AvatarFallback>{getInitials(booking.agent.name)}</AvatarFallback>
                              </Avatar>
                              <span>{booking.agent.name}</span>
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                              <Ticket className="h-4 w-4 text-muted-foreground" />
                              {booking.ticketCount}
                            </div>
                          </td>
                          <td className="p-4 align-middle font-medium">
                            ${booking.totalAmount.toLocaleString()}
                          </td>
                          <td className="p-4 align-middle">
                            {new Date(booking.bookingDate).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                              <CalendarClock className="h-4 w-4 text-muted-foreground" />
                              {new Date(booking.visitDate).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-1">
                              {getStatusIcon(booking.status)}
                              <Badge className={
                                booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                                booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'
                              }>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </Badge>
                            </div>
                          </td>
                          <td className="p-4 align-middle capitalize">
                            <Badge variant="outline">
                              {booking.paymentStatus}
                            </Badge>
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
        <TabsContent value="confirmed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Confirmed Bookings</CardTitle>
              <CardDescription>
                View and manage all confirmed bookings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  This tab shows all confirmed bookings that have been validated and processed.
                </p>
                <Button variant="default">View Confirmed Bookings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Bookings</CardTitle>
              <CardDescription>
                Review and approve pending booking requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  This tab shows bookings that are awaiting approval or payment confirmation.
                </p>
                <Button variant="default">Review Pending Bookings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cancelled" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cancelled Bookings</CardTitle>
              <CardDescription>
                View cancelled bookings and refund history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  This tab shows bookings that have been cancelled and any associated refunds.
                </p>
                <Button variant="default">View Cancelled Bookings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookingsPage;
