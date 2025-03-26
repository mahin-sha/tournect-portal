
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Users, Search, Filter, ArrowDownUp, Plus, Mail, Phone, Wallet, UserPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AddUserDialog } from '@/components/agents/AddUserDialog';

// Mock data for agents
const agentsData = [
  {
    id: "A1001",
    name: "TravelMasters Inc.",
    contactPerson: "John Smith",
    email: "john@travelmasters.com",
    phone: "+1 (555) 123-4567",
    status: "active",
    tier: "platinum",
    walletBalance: 12500.00,
    creditLimit: 25000.00,
    monthlyVolume: 45000.00,
    discountRate: 12
  },
  {
    id: "A1002",
    name: "Global Tours Co.",
    contactPerson: "Sarah Johnson",
    email: "sarah@globaltours.com",
    phone: "+1 (555) 987-6543",
    status: "active",
    tier: "gold",
    walletBalance: 8200.00,
    creditLimit: 15000.00,
    monthlyVolume: 28000.00,
    discountRate: 8
  },
  {
    id: "A1003",
    name: "Adventure Travels",
    contactPerson: "Mike Williams",
    email: "mike@adventuretravels.com",
    phone: "+1 (555) 456-7890",
    status: "inactive",
    tier: "silver",
    walletBalance: 2100.00,
    creditLimit: 5000.00,
    monthlyVolume: 8500.00,
    discountRate: 5
  },
  {
    id: "A1004",
    name: "Sunshine Vacations",
    contactPerson: "Emma Davis",
    email: "emma@sunshine.com",
    phone: "+1 (555) 234-5678",
    status: "active",
    tier: "bronze",
    walletBalance: 1800.00,
    creditLimit: 3000.00,
    monthlyVolume: 5200.00,
    discountRate: 3
  },
  {
    id: "A1005",
    name: "Express Journeys",
    contactPerson: "David Brown",
    email: "david@express.com",
    phone: "+1 (555) 876-5432",
    status: "pending",
    tier: "standard",
    walletBalance: 500.00,
    creditLimit: 1000.00,
    monthlyVolume: 0,
    discountRate: 0
  }
];

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

const AgentsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgentId, setSelectedAgentId] = useState('');
  const [selectedAgentName, setSelectedAgentName] = useState('');
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  
  const handleAddUser = (agentId: string, agentName: string) => {
    setSelectedAgentId(agentId);
    setSelectedAgentName(agentName);
    setShowAddUserDialog(true);
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Agent Management</h1>
        <p className="text-muted-foreground">
          Manage your travel agents, track performance, and set commission structures.
        </p>
      </div>

      <Tabs defaultValue="all" className="mt-6 space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Agents</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle>Agent Directory</CardTitle>
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
                    Add Agent
                  </Button>
                </div>
              </div>
              <CardDescription>
                View and manage all registered travel agents and their accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Input 
                    placeholder="Search agents by name, ID or contact person..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <div className="absolute left-3 top-2.5 text-muted-foreground">
                    <Search className="h-4 w-4" />
                  </div>
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Tier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tiers</SelectItem>
                    <SelectItem value="platinum">Platinum</SelectItem>
                    <SelectItem value="gold">Gold</SelectItem>
                    <SelectItem value="silver">Silver</SelectItem>
                    <SelectItem value="bronze">Bronze</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">Agent</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Contact</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Tier</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Wallet Balance</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Credit Limit</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Monthly Volume</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Discount</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {agentsData.map((agent) => (
                        <tr key={agent.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarImage src="" alt={agent.name} />
                                <AvatarFallback>{getInitials(agent.name)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{agent.name}</div>
                                <div className="text-xs text-muted-foreground">{agent.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <div>
                              <div className="font-medium">{agent.contactPerson}</div>
                              <div className="text-xs text-muted-foreground flex items-center gap-1">
                                <Mail className="h-3 w-3" /> {agent.email}
                              </div>
                              <div className="text-xs text-muted-foreground flex items-center gap-1">
                                <Phone className="h-3 w-3" /> {agent.phone}
                              </div>
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <Badge className={
                              agent.status === 'active' ? 'bg-green-100 text-green-800' : 
                              agent.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'
                            }>
                              {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="p-4 align-middle capitalize">{agent.tier}</td>
                          <td className="p-4 align-middle">${agent.walletBalance.toLocaleString()}</td>
                          <td className="p-4 align-middle">${agent.creditLimit.toLocaleString()}</td>
                          <td className="p-4 align-middle">${agent.monthlyVolume.toLocaleString()}</td>
                          <td className="p-4 align-middle">{agent.discountRate}%</td>
                          <td className="p-4 align-middle">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Wallet className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8" 
                                onClick={() => handleAddUser(agent.id, agent.name)}
                                title="Add User">
                                <UserPlus className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">View</Button>
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
        
        {/* For simplicity, we'll make other tabs show the same content for now */}
        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Agents</CardTitle>
              <CardDescription>
                View and manage all currently active travel agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  This tab displays all active agents in your system. You can filter by tier, volume, and performance metrics.
                </p>
                <Button variant="default">View Active Agents</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Agents</CardTitle>
              <CardDescription>
                Review and approve new agent applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  This tab shows agent applications awaiting your approval. Review their details and credentials before activation.
                </p>
                <Button variant="default">Review Applications</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inactive" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inactive Agents</CardTitle>
              <CardDescription>
                View and manage inactive or suspended agent accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  This tab displays agents who are no longer active. You can reactivate accounts or archive them as needed.
                </p>
                <Button variant="default">Manage Inactive Accounts</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AddUserDialog 
        open={showAddUserDialog}
        onOpenChange={setShowAddUserDialog}
        agentId={selectedAgentId}
        agentName={selectedAgentName}
      />
    </div>
  );
};

export default AgentsPage;
