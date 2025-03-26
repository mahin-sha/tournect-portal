import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Wallet, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  BarChart4, 
  DollarSign, 
  Calendar, 
  Search, 
  Filter, 
  ArrowDownUp, 
  Plus,
  Clock
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import TopUpModal from '@/components/wallet/TopUpModal';

const walletStats = {
  totalBalance: 145700.00,
  outstandingCredit: 58250.00,
  availableCredit: 91750.00,
  totalCreditIssued: 150000.00,
  pendingPayments: 12500.00,
  weeklyInflow: 35000.00,
  weeklyOutflow: 28500.00
};

const transactions = [
  {
    id: "TRX1001",
    agent: {
      id: "A1001",
      name: "TravelMasters Inc.",
    },
    type: "deposit",
    amount: 5000.00,
    method: "bank-transfer",
    status: "completed",
    date: "2024-06-15T14:32:00",
    reference: "INV-2406-1001"
  },
  {
    id: "TRX1002",
    agent: {
      id: "A1002",
      name: "Global Tours Co.",
    },
    type: "withdrawal",
    amount: 2500.00,
    method: "refund",
    status: "completed",
    date: "2024-06-14T11:15:00",
    reference: "REF-2406-1002"
  },
  {
    id: "TRX1003",
    agent: {
      id: "A1003",
      name: "Adventure Travels",
    },
    type: "booking",
    amount: 3250.00,
    method: "wallet",
    status: "completed",
    date: "2024-06-14T09:45:00",
    reference: "BKG-2406-1003"
  },
  {
    id: "TRX1004",
    agent: {
      id: "A1001",
      name: "TravelMasters Inc.",
    },
    type: "deposit",
    amount: 7500.00,
    method: "credit-card",
    status: "pending",
    date: "2024-06-13T16:22:00",
    reference: "INV-2406-1004"
  },
  {
    id: "TRX1005",
    agent: {
      id: "A1004",
      name: "Sunshine Vacations",
    },
    type: "credit-adjustment",
    amount: 2000.00,
    method: "manual",
    status: "completed",
    date: "2024-06-12T10:30:00",
    reference: "ADJ-2406-1005"
  }
];

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase();
};

const getTransactionIcon = (type: string) => {
  switch (type) {
    case 'deposit':
      return <ArrowDownLeft className="h-4 w-4 text-green-500" />;
    case 'withdrawal':
      return <ArrowUpRight className="h-4 w-4 text-red-500" />;
    case 'booking':
      return <Calendar className="h-4 w-4 text-blue-500" />;
    case 'credit-adjustment':
      return <CreditCard className="h-4 w-4 text-purple-500" />;
    default:
      return <DollarSign className="h-4 w-4" />;
  }
};

const WalletPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const { user } = useAuth();
  
  const handleTopUp = (amount: number, method: string) => {
    console.log(`Top up of $${amount} via ${method}`);
    
    const newTransaction = {
      id: `TRX${Math.floor(Math.random() * 10000)}`,
      agent: {
        id: user?.id || "unknown",
        name: user?.name || "Current User",
      },
      type: "deposit",
      amount: amount,
      method: method,
      status: "completed",
      date: new Date().toISOString(),
      reference: `TOP-${Date.now()}`
    };
    
    toast.success(`Successfully added $${amount.toLocaleString()} to your wallet`);
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Wallet Management</h1>
          <p className="text-muted-foreground">
            Monitor and manage agent wallet balances, credit limits, and financial transactions.
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            onClick={() => setIsTopUpModalOpen(true)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Top Up
          </Button>
          {user?.role === 'admin' && (
            <Button className="gap-2">
              <Wallet className="h-4 w-4" />
              Manage Credits
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Wallet Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${walletStats.totalBalance.toLocaleString()}</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              <span className="text-green-500 inline-flex items-center font-medium">
                <ArrowDownLeft className="h-3 w-3 mr-1" />
                +12.5%
              </span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Outstanding Credit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${walletStats.outstandingCredit.toLocaleString()}</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              <span className="text-red-500 inline-flex items-center font-medium">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +5.2%
              </span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Credit Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-1">
              <div className="text-2xl font-bold">
                {Math.round((walletStats.outstandingCredit / walletStats.totalCreditIssued) * 100)}%
              </div>
              <div className="text-xs text-muted-foreground">
                ${walletStats.outstandingCredit.toLocaleString()} of ${walletStats.totalCreditIssued.toLocaleString()}
              </div>
            </div>
            <Progress 
              value={(walletStats.outstandingCredit / walletStats.totalCreditIssued) * 100} 
              className="h-2"
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${walletStats.pendingPayments.toLocaleString()}</div>
            <div className="flex items-center pt-1 text-xs text-muted-foreground">
              <span className="inline-flex items-center font-medium">
                <Clock className="h-3 w-3 mr-1" />
                5 pending transactions
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="mt-6 space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="deposits">Deposits</TabsTrigger>
          <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
          <TabsTrigger value="credit">Credit Management</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <CardTitle>Recent Transactions</CardTitle>
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
                    New Transaction
                  </Button>
                </div>
              </div>
              <CardDescription>
                View and manage all financial transactions across agent accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative flex-1">
                  <Input 
                    placeholder="Search transactions by ID, agent, or reference..."
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
                    <SelectValue placeholder="Transaction Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="deposit">Deposits</SelectItem>
                    <SelectItem value="withdrawal">Withdrawals</SelectItem>
                    <SelectItem value="booking">Bookings</SelectItem>
                    <SelectItem value="credit-adjustment">Credit Adjustments</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                        <th className="h-12 px-4 text-left align-middle font-medium">Transaction ID</th>
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
                      {transactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                          <td className="p-4 align-middle font-medium">{transaction.id}</td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-7 w-7">
                                <AvatarImage src="" alt={transaction.agent.name} />
                                <AvatarFallback>{getInitials(transaction.agent.name)}</AvatarFallback>
                              </Avatar>
                              <span>{transaction.agent.name}</span>
                            </div>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                {getTransactionIcon(transaction.type)}
                              </div>
                              <span className="capitalize">{transaction.type.replace('-', ' ')}</span>
                            </div>
                          </td>
                          <td className="p-4 align-middle font-medium">
                            <span className={
                              transaction.type === 'deposit' || transaction.type === 'credit-adjustment' 
                                ? 'text-green-600' 
                                : transaction.type === 'withdrawal' || transaction.type === 'booking' 
                                  ? 'text-red-600' 
                                  : ''
                            }>
                              {transaction.type === 'deposit' || transaction.type === 'credit-adjustment' ? '+' : '-'}
                              ${transaction.amount.toLocaleString()}
                            </span>
                          </td>
                          <td className="p-4 align-middle capitalize">{transaction.method.replace('-', ' ')}</td>
                          <td className="p-4 align-middle">
                            {new Date(transaction.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric' 
                            })}
                          </td>
                          <td className="p-4 align-middle">
                            <Badge className={
                              transaction.status === 'completed' ? 'bg-green-100 text-green-800' : 
                              'bg-yellow-100 text-yellow-800'
                            }>
                              {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </Badge>
                          </td>
                          <td className="p-4 align-middle text-xs font-mono">
                            {transaction.reference}
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
        
        <TabsContent value="deposits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Wallet Deposits</CardTitle>
              <CardDescription>
                Manage agent deposits and payment methods
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  View and process wallet top-ups from agents through various payment methods.
                </p>
                <Button variant="default">Process New Deposit</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="withdrawals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Withdrawals & Refunds</CardTitle>
              <CardDescription>
                Process agent withdrawal requests and refunds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Manage agent withdrawal requests, process refunds, and track payout history.
                </p>
                <Button variant="default">Review Withdrawal Requests</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="credit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Credit Management</CardTitle>
              <CardDescription>
                Set and adjust agent credit limits and payment terms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Define credit limits, manage payment schedules, and track credit utilization for agents.
                </p>
                <Button variant="default">Manage Credit Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <TopUpModal 
        isOpen={isTopUpModalOpen}
        onClose={() => setIsTopUpModalOpen(false)}
        onTopUp={handleTopUp}
      />
    </div>
  );
};

export default WalletPage;
