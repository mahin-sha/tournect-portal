
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Ticket, AlertCircle, Filter, ArrowDownUp, Plus, FileText } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data for ticket inventory
const ticketInventory = [
  {
    id: "T1001",
    attraction: "Paris Tour",
    serialFrom: "PT00010001",
    serialTo: "PT00010100",
    quantity: 100,
    purchasePrice: 35.00,
    sellingPrice: 55.00,
    expiryDate: "2024-12-31",
    vendor: "DirectSupplier",
    status: "active"
  },
  {
    id: "T1002",
    attraction: "London Eye",
    serialFrom: "LE00020001",
    serialTo: "LE00020150",
    quantity: 150,
    purchasePrice: 22.50,
    sellingPrice: 42.00,
    expiryDate: "2024-10-15",
    vendor: "TicketBroker",
    status: "active"
  },
  {
    id: "T1003",
    attraction: "NYC Pass",
    serialFrom: "NY00030001",
    serialTo: "NY00030200",
    quantity: 200,
    purchasePrice: 45.00,
    sellingPrice: 75.00,
    expiryDate: "2024-09-30",
    vendor: "NYCVendor",
    status: "active"
  },
  {
    id: "T1004",
    attraction: "Tokyo Tour",
    serialFrom: "TK00040001",
    serialTo: "TK00040100",
    quantity: 100,
    purchasePrice: 60.00,
    sellingPrice: 90.00,
    expiryDate: "2024-11-30",
    vendor: "AsiaTravel",
    status: "low"
  },
  {
    id: "T1005",
    attraction: "Rome Pass",
    serialFrom: "RM00050001",
    serialTo: "RM00050050",
    quantity: 50,
    purchasePrice: 40.00,
    sellingPrice: 65.00,
    expiryDate: "2024-08-15",
    vendor: "EuroTravel",
    status: "critical"
  }
];

const TicketsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Ticket Management</h1>
        <p className="text-muted-foreground">
          Manage your ticket inventory, pricing, and sales across all attractions.
        </p>
      </div>

      <Tabs defaultValue="inventory" className="mt-6 space-y-4">
        <TabsList>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="purchase">Purchase Tickets</TabsTrigger>
          <TabsTrigger value="pricing">Pricing & Discounts</TabsTrigger>
          <TabsTrigger value="sales">Sales History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle>Ticket Inventory</CardTitle>
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
                    Add Tickets
                  </Button>
                </div>
              </div>
              <CardDescription>
                View and manage your ticket inventory for all attractions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Input 
                    placeholder="Search tickets by ID, attraction or vendor..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute left-3 top-2.5 text-muted-foreground">
                    <Ticket className="h-4 w-4" />
                  </div>
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tickets</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="low">Low Stock</SelectItem>
                    <SelectItem value="critical">Critical Stock</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Attraction</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Quantity</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Serial Range</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Purchase Price</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Selling Price</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Expiry</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {ticketInventory.map((ticket) => (
                        <tr key={ticket.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle">{ticket.id}</td>
                          <td className="p-4 align-middle font-medium">{ticket.attraction}</td>
                          <td className="p-4 align-middle">{ticket.quantity}</td>
                          <td className="p-4 align-middle text-xs text-muted-foreground">
                            {ticket.serialFrom} - {ticket.serialTo}
                          </td>
                          <td className="p-4 align-middle">${ticket.purchasePrice.toFixed(2)}</td>
                          <td className="p-4 align-middle">${ticket.sellingPrice.toFixed(2)}</td>
                          <td className="p-4 align-middle">{ticket.expiryDate}</td>
                          <td className="p-4 align-middle">
                            <Badge className={
                              ticket.status === 'active' ? 'bg-green-100 text-green-800' : 
                              ticket.status === 'low' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'
                            }>
                              {ticket.status === 'active' ? 'Active' : 
                              ticket.status === 'low' ? 'Low Stock' : 
                              'Critical Stock'}
                            </Badge>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <FileText className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <AlertCircle className="h-4 w-4" />
                              </Button>
                            </div>
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
        
        <TabsContent value="purchase" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Purchase New Tickets</CardTitle>
              <CardDescription>
                Add new tickets to your inventory from suppliers and vendors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Create purchase orders for new tickets, set prices, and manage serial number ranges.
                </p>
                <Button variant="default">Create New Purchase Order</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Discounts</CardTitle>
              <CardDescription>
                Manage ticket pricing, margins, and discount rules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Set up pricing rules, markup percentages, and volume-based discounts for your agents.
                </p>
                <Button variant="default">Configure Pricing Rules</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Sales History</CardTitle>
              <CardDescription>
                View historical ticket sales data and analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Track sales performance, popular attractions, and agent purchasing patterns.
                </p>
                <Button variant="default">View Sales Reports</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TicketsPage;
