
import React from 'react';
import { 
  CreditCard, 
  Receipt, 
  FileText, 
  DollarSign, 
  BarChart3, 
  Wallet,
  FileDown,
  ClipboardList,
  Landmark,
  BriefcaseBusiness
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

const Accounts = () => {
  const accountsSections = [
    {
      title: 'Financial Overview',
      items: [
        {
          title: 'Revenue Summary',
          description: 'View total revenue, expenses, and profit',
          icon: <BarChart3 className="h-5 w-5 text-primary" />,
          action: 'View Summary'
        },
        {
          title: 'Cash Flow',
          description: 'Monitor incoming and outgoing cash',
          icon: <DollarSign className="h-5 w-5 text-primary" />,
          action: 'View Cash Flow'
        },
        {
          title: 'Balance Sheet',
          description: 'Assets, liabilities, and equity overview',
          icon: <Landmark className="h-5 w-5 text-primary" />,
          action: 'View Balance Sheet'
        }
      ]
    },
    {
      title: 'Invoicing',
      items: [
        {
          title: 'Pending Invoices',
          description: 'View and manage unpaid invoices',
          icon: <Receipt className="h-5 w-5 text-primary" />,
          action: 'View Invoices'
        },
        {
          title: 'Create Invoice',
          description: 'Generate a new invoice for clients',
          icon: <FileText className="h-5 w-5 text-primary" />,
          action: 'Create Invoice'
        },
        {
          title: 'Invoice Templates',
          description: 'Manage and create invoice templates',
          icon: <ClipboardList className="h-5 w-5 text-primary" />,
          action: 'Manage Templates'
        }
      ]
    },
    {
      title: 'Tax Management',
      items: [
        {
          title: 'Tax Reports',
          description: 'Generate tax reports for specific periods',
          icon: <FileDown className="h-5 w-5 text-primary" />,
          action: 'Generate Reports'
        },
        {
          title: 'Tax Settings',
          description: 'Configure tax rates and rules',
          icon: <BriefcaseBusiness className="h-5 w-5 text-primary" />,
          action: 'Tax Settings'
        },
        {
          title: 'Tax Payments',
          description: 'View and record tax payments',
          icon: <Wallet className="h-5 w-5 text-primary" />,
          action: 'View Payments'
        }
      ]
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Accounts</h1>
        <p className="text-muted-foreground mt-2">
          Manage financial accounts, invoices, and tax reporting
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="tax">Tax</TabsTrigger>
          <TabsTrigger value="reports">Financial Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {accountsSections.map((section, index) => (
            <div key={index} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">{section.title}</h2>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
                  View All
                </Button>
              </div>
              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {section.items.map((item, itemIndex) => (
                  <Card key={itemIndex} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="rounded-md bg-primary/10 p-2">
                            {item.icon}
                          </div>
                          <CardTitle className="text-lg">{item.title}</CardTitle>
                        </div>
                      </div>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" size="sm" className="w-full">
                        {item.action}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Management</CardTitle>
              <CardDescription>Manage and generate invoices for clients and agents</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Create, edit, and manage invoices for all transactions in the system. 
                Set up recurring invoices, track payment status, and manage invoice templates.
              </p>
              <div className="flex space-x-2">
                <Button>Create New Invoice</Button>
                <Button variant="outline">View All Invoices</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tax" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tax Management</CardTitle>
              <CardDescription>Configure and manage tax settings and reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Set up tax rules, generate tax reports, and manage tax payments for your business.
                Configure different tax rates for various services and locations.
              </p>
              <div className="flex space-x-2">
                <Button>Configure Tax Settings</Button>
                <Button variant="outline">Generate Tax Report</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>Access and generate financial reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Generate various financial reports including profit and loss statements, 
                balance sheets, and cash flow statements for different time periods.
              </p>
              <div className="flex space-x-2">
                <Button>Generate Report</Button>
                <Button variant="outline">View Saved Reports</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Accounts;
