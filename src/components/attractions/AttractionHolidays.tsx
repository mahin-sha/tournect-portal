
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
  Calendar,
  ArrowUpDown,
  Percent
} from 'lucide-react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue
} from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';

// Mock data for holidays
const initialHolidays = [
  {
    id: 1,
    name: 'Christmas Day',
    date: new Date('2023-12-25'),
    priceAdjustmentType: 'percentage',
    priceAdjustmentValue: 20,
    note: 'Increased pricing due to high demand during Christmas holidays.',
    affectsAllTickets: true,
  },
  {
    id: 2,
    name: 'New Year\'s Day',
    date: new Date('2024-01-01'),
    priceAdjustmentType: 'percentage',
    priceAdjustmentValue: 25,
    note: 'Premium pricing for New Year celebration.',
    affectsAllTickets: true,
  },
  {
    id: 3,
    name: 'Valentine\'s Day',
    date: new Date('2024-02-14'),
    priceAdjustmentType: 'fixed',
    priceAdjustmentValue: 15,
    note: 'Special couples packages available.',
    affectsAllTickets: false,
  }
];

interface AttractionHolidaysProps {
  attractionId?: number;
  attractionName?: string;
}

const AttractionHolidays: React.FC<AttractionHolidaysProps> = ({ 
  attractionId, 
  attractionName = "Attraction"
}) => {
  const { toast } = useToast();
  const [holidays, setHolidays] = useState(initialHolidays);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingHoliday, setEditingHoliday] = useState<any | null>(null);
  
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [formData, setFormData] = useState({
    name: '',
    priceAdjustmentType: 'percentage',
    priceAdjustmentValue: '',
    note: '',
    affectsAllTickets: true,
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
  
  const handleAffectsAllTicketsChange = (value: boolean) => {
    setFormData({
      ...formData,
      affectsAllTickets: value
    });
  };
  
  const resetForm = () => {
    setFormData({
      name: '',
      priceAdjustmentType: 'percentage',
      priceAdjustmentValue: '',
      note: '',
      affectsAllTickets: true,
    });
    setDate(undefined);
    setEditingHoliday(null);
  };
  
  const handleAddHoliday = () => {
    if (!date) {
      toast({
        title: "Date Required",
        description: "Please select a date for the holiday.",
        variant: "destructive"
      });
      return;
    }
    
    const newHoliday = {
      id: holidays.length > 0 ? Math.max(...holidays.map(h => h.id)) + 1 : 1,
      name: formData.name,
      date: date,
      priceAdjustmentType: formData.priceAdjustmentType,
      priceAdjustmentValue: parseFloat(formData.priceAdjustmentValue),
      note: formData.note,
      affectsAllTickets: formData.affectsAllTickets,
    };
    
    if (editingHoliday) {
      setHolidays(holidays.map(holiday => 
        holiday.id === editingHoliday.id ? { ...newHoliday, id: holiday.id } : holiday
      ));
      toast({
        title: "Holiday Updated",
        description: `${newHoliday.name} has been updated successfully.`,
      });
    } else {
      setHolidays([...holidays, newHoliday]);
      toast({
        title: "Holiday Added",
        description: `${newHoliday.name} has been added to the calendar.`,
      });
    }
    
    resetForm();
    setIsAddDialogOpen(false);
  };
  
  const handleEditHoliday = (holiday: any) => {
    setEditingHoliday(holiday);
    setFormData({
      name: holiday.name,
      priceAdjustmentType: holiday.priceAdjustmentType,
      priceAdjustmentValue: holiday.priceAdjustmentValue.toString(),
      note: holiday.note,
      affectsAllTickets: holiday.affectsAllTickets,
    });
    setDate(holiday.date);
    setIsAddDialogOpen(true);
  };
  
  const handleDeleteHoliday = (id: number) => {
    const holidayToDelete = holidays.find(h => h.id === id);
    setHolidays(holidays.filter(holiday => holiday.id !== id));
    toast({
      title: "Holiday Deleted",
      description: `${holidayToDelete?.name} has been removed from the calendar.`,
    });
  };
  
  const formatAdjustment = (holiday: any) => {
    if (holiday.priceAdjustmentType === 'percentage') {
      return `+${holiday.priceAdjustmentValue}%`;
    } else {
      return `+$${holiday.priceAdjustmentValue.toFixed(2)}`;
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl">Holiday Settings</CardTitle>
          <CardDescription>
            Manage special dates and pricing for {attractionName}
          </CardDescription>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Add Holiday</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingHoliday ? 'Edit' : 'Add'} Holiday Date</DialogTitle>
              <DialogDescription>
                Set special pricing for holidays and peak dates.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Holiday Name</Label>
                  <Input 
                    id="name" 
                    name="name"
                    placeholder="e.g. Christmas Day"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="priceAdjustmentType">Adjustment Type</Label>
                  <Select 
                    value={formData.priceAdjustmentType}
                    onValueChange={(value) => handleSelectChange('priceAdjustmentType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage Increase</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="priceAdjustmentValue">
                    {formData.priceAdjustmentType === 'percentage' ? 'Percentage (%)' : 'Amount ($)'}
                  </Label>
                  <div className="relative">
                    <Input 
                      id="priceAdjustmentValue" 
                      name="priceAdjustmentValue"
                      type="number"
                      step={formData.priceAdjustmentType === 'percentage' ? '1' : '0.01'}
                      min="0"
                      placeholder="0"
                      value={formData.priceAdjustmentValue}
                      onChange={handleInputChange}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      {formData.priceAdjustmentType === 'percentage' ? (
                        <Percent className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <span className="text-muted-foreground">$</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="note">Notes</Label>
                <Input 
                  id="note" 
                  name="note"
                  placeholder="Add any special notes for this holiday"
                  value={formData.note}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Apply To</Label>
                <Select 
                  value={formData.affectsAllTickets ? 'all' : 'selected'}
                  onValueChange={(value) => handleAffectsAllTicketsChange(value === 'all')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tickets" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ticket Types</SelectItem>
                    <SelectItem value="selected">Selected Tickets Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => {
                setIsAddDialogOpen(false);
                resetForm();
              }}>
                Cancel
              </Button>
              <Button type="button" onClick={handleAddHoliday}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      
      <CardContent>
        {holidays.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Holiday</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Price Adjustment</TableHead>
                <TableHead>Applies To</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {holidays.map((holiday) => (
                <TableRow key={holiday.id}>
                  <TableCell className="font-medium">
                    {holiday.name}
                  </TableCell>
                  <TableCell>
                    {format(new Date(holiday.date), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-orange-500 hover:bg-orange-600">
                      {formatAdjustment(holiday)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {holiday.affectsAllTickets ? 'All Tickets' : 'Selected Tickets'}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {holiday.note}
                  </TableCell>
                  <TableCell className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleEditHoliday(holiday)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteHoliday(holiday.id)}
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
            No holiday dates configured. Add holidays for special pricing.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AttractionHolidays;
