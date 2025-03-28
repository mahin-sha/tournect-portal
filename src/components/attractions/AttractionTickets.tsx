
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Plus, 
  Trash2, 
  Edit, 
  Ticket, 
  Calendar, 
  Users 
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';

// Mock data for tickets
const initialTickets = [
  {
    id: 1,
    name: 'Adult Standard',
    description: 'Standard admission ticket for adults (18+ years).',
    basePrice: 25.00,
    tax: 5.00,
    ageRange: '18+',
    isAvailable: true,
    isTimeSlotRequired: false,
  },
  {
    id: 2,
    name: 'Child Standard',
    description: 'Standard admission ticket for children (5-17 years).',
    basePrice: 15.00,
    tax: 3.00,
    ageRange: '5-17',
    isAvailable: true,
    isTimeSlotRequired: false,
  },
  {
    id: 3,
    name: 'Family Pass',
    description: 'Admission for 2 adults and up to 3 children.',
    basePrice: 75.00,
    tax: 10.00,
    ageRange: 'All',
    isAvailable: true,
    isTimeSlotRequired: false,
  },
  {
    id: 4,
    name: 'Express Pass',
    description: 'Skip the regular lines with priority access.',
    basePrice: 40.00,
    tax: 8.00,
    ageRange: 'All',
    isAvailable: true,
    isTimeSlotRequired: true,
  }
];

interface AttractionTicketsProps {
  attractionId?: number;
  attractionName?: string;
  basePrice?: number;
}

const AttractionTickets: React.FC<AttractionTicketsProps> = ({ 
  attractionId, 
  attractionName = "Attraction",
  basePrice = 0
}) => {
  const { toast } = useToast();
  const [tickets, setTickets] = useState(initialTickets);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<any | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    basePrice: '',
    tax: '',
    ageRange: 'All',
    isAvailable: true,
    isTimeSlotRequired: false
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData({
      ...formData,
      [name]: checked
    });
  };
  
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      basePrice: '',
      tax: '',
      ageRange: 'All',
      isAvailable: true,
      isTimeSlotRequired: false
    });
    setEditingTicket(null);
  };
  
  const handleAddTicket = () => {
    const newTicket = {
      id: tickets.length > 0 ? Math.max(...tickets.map(t => t.id)) + 1 : 1,
      name: formData.name,
      description: formData.description,
      basePrice: parseFloat(formData.basePrice),
      tax: parseFloat(formData.tax),
      ageRange: formData.ageRange,
      isAvailable: formData.isAvailable,
      isTimeSlotRequired: formData.isTimeSlotRequired
    };
    
    if (editingTicket) {
      setTickets(tickets.map(ticket => 
        ticket.id === editingTicket.id ? { ...newTicket, id: ticket.id } : ticket
      ));
      toast({
        title: "Ticket Updated",
        description: `${newTicket.name} has been updated successfully.`,
      });
    } else {
      setTickets([...tickets, newTicket]);
      toast({
        title: "Ticket Added",
        description: `${newTicket.name} has been added to ${attractionName}.`,
      });
    }
    
    resetForm();
    setIsAddDialogOpen(false);
  };
  
  const handleEditTicket = (ticket: any) => {
    setEditingTicket(ticket);
    setFormData({
      name: ticket.name,
      description: ticket.description,
      basePrice: ticket.basePrice.toString(),
      tax: ticket.tax.toString(),
      ageRange: ticket.ageRange,
      isAvailable: ticket.isAvailable,
      isTimeSlotRequired: ticket.isTimeSlotRequired
    });
    setIsAddDialogOpen(true);
  };
  
  const handleDeleteTicket = (id: number) => {
    const ticketToDelete = tickets.find(t => t.id === id);
    setTickets(tickets.filter(ticket => ticket.id !== id));
    toast({
      title: "Ticket Deleted",
      description: `${ticketToDelete?.name} has been removed.`,
    });
  };
  
  const handleToggleAvailability = (id: number) => {
    setTickets(tickets.map(ticket => 
      ticket.id === id ? { ...ticket, isAvailable: !ticket.isAvailable } : ticket
    ));
    
    const ticket = tickets.find(t => t.id === id);
    const newStatus = !ticket?.isAvailable;
    
    toast({
      title: `Ticket ${newStatus ? 'Activated' : 'Deactivated'}`,
      description: `${ticket?.name} is now ${newStatus ? 'available' : 'unavailable'} for purchase.`,
    });
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl">Ticket Management</CardTitle>
          <CardDescription>
            Manage ticket types for {attractionName}
          </CardDescription>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Add Ticket</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingTicket ? 'Edit' : 'Add'} Ticket</DialogTitle>
              <DialogDescription>
                Configure ticket details for {attractionName}.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Ticket Name</Label>
                  <Input 
                    id="name" 
                    name="name"
                    placeholder="e.g. Adult Standard"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description"
                    name="description"
                    placeholder="Enter ticket description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="basePrice">Base Price ($)</Label>
                  <Input 
                    id="basePrice" 
                    name="basePrice"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.basePrice}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tax">Tax Amount ($)</Label>
                  <Input 
                    id="tax" 
                    name="tax"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.tax}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="ageRange">Age Range</Label>
                <Select 
                  value={formData.ageRange}
                  onValueChange={(value) => handleSelectChange('ageRange', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select age range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Ages</SelectItem>
                    <SelectItem value="0-4">Infant (0-4)</SelectItem>
                    <SelectItem value="5-17">Child (5-17)</SelectItem>
                    <SelectItem value="18+">Adult (18+)</SelectItem>
                    <SelectItem value="65+">Senior (65+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="isTimeSlotRequired"
                    checked={formData.isTimeSlotRequired}
                    onCheckedChange={(checked) => handleSwitchChange('isTimeSlotRequired', checked)}
                  />
                  <Label htmlFor="isTimeSlotRequired">Require Time Slot Booking</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="isAvailable"
                    checked={formData.isAvailable}
                    onCheckedChange={(checked) => handleSwitchChange('isAvailable', checked)}
                  />
                  <Label htmlFor="isAvailable">Available for Purchase</Label>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => {
                setIsAddDialogOpen(false);
                resetForm();
              }}>
                Cancel
              </Button>
              <Button type="button" onClick={handleAddTicket}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      
      <CardContent>
        {tickets.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ticket Type</TableHead>
                <TableHead>Age Range</TableHead>
                <TableHead>Base Price</TableHead>
                <TableHead>Tax</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-medium">{ticket.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{ticket.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>{ticket.ageRange}</TableCell>
                  <TableCell>${ticket.basePrice.toFixed(2)}</TableCell>
                  <TableCell>${ticket.tax.toFixed(2)}</TableCell>
                  <TableCell className="font-medium">${(ticket.basePrice + ticket.tax).toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={ticket.isAvailable ? "default" : "secondary"}>
                      {ticket.isAvailable ? "Available" : "Unavailable"}
                    </Badge>
                    {ticket.isTimeSlotRequired && (
                      <Badge variant="outline" className="ml-2">Time Slot</Badge>
                    )}
                  </TableCell>
                  <TableCell className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleToggleAvailability(ticket.id)}
                      title={ticket.isAvailable ? "Deactivate" : "Activate"}
                    >
                      {ticket.isAvailable ? (
                        <Users className="h-4 w-4" />
                      ) : (
                        <Users className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleEditTicket(ticket)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteTicket(ticket.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            No tickets available. Add a ticket to get started.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AttractionTickets;
