
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Car, 
  BusFront, 
  TrainFront, 
  CarTaxiFront, 
  Plus, 
  Trash2, 
  Edit 
} from 'lucide-react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';

// Mock data for transport options
const mockTransportOptions = [
  {
    id: 1,
    vehicleType: 'Sedan',
    privatePrice: 45,
    sharedPrice: 15,
    capacity: 4,
    description: 'Comfortable sedan with AC, suitable for city travel.',
    isAvailable: true,
    icon: Car
  },
  {
    id: 2,
    vehicleType: 'SUV',
    privatePrice: 65,
    sharedPrice: 25,
    capacity: 6,
    description: 'Spacious SUV with luggage space, ideal for families.',
    isAvailable: true,
    icon: Car
  },
  {
    id: 3,
    vehicleType: 'Minibus',
    privatePrice: 120,
    sharedPrice: 30,
    capacity: 12,
    description: 'Mini bus with comfortable seating for small groups.',
    isAvailable: true,
    icon: BusFront
  },
  {
    id: 4,
    vehicleType: 'Coach Bus',
    privatePrice: 250,
    sharedPrice: 40,
    capacity: 30,
    description: 'Large coach bus with AC and reclining seats.',
    isAvailable: false,
    icon: BusFront
  }
];

// Vehicle icon mapping
const vehicleIcons: Record<string, React.ElementType> = {
  'Sedan': Car,
  'SUV': Car,
  'Minibus': BusFront,
  'Coach Bus': BusFront,
  'Taxi': CarTaxiFront,
  'Train': TrainFront
};

interface TransportOption {
  id: number;
  vehicleType: string;
  privatePrice: number;
  sharedPrice: number;
  capacity: number;
  description: string;
  isAvailable: boolean;
  icon: React.ElementType;
}

interface TransportManagementProps {
  attractionId?: number;
  attractionName?: string;
}

const TransportManagement: React.FC<TransportManagementProps> = ({ 
  attractionId, 
  attractionName = "Attraction"
}) => {
  const [transportOptions, setTransportOptions] = useState<TransportOption[]>(mockTransportOptions);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingOption, setEditingOption] = useState<TransportOption | null>(null);
  
  const form = useForm({
    defaultValues: {
      vehicleType: '',
      transportType: 'both',
      privatePrice: '',
      sharedPrice: '',
      capacity: '',
      description: '',
      isAvailable: true
    }
  });

  const handleAddTransport = (data: any) => {
    const newOption: TransportOption = {
      id: transportOptions.length + 1,
      vehicleType: data.vehicleType,
      privatePrice: parseFloat(data.privatePrice),
      sharedPrice: parseFloat(data.sharedPrice),
      capacity: parseInt(data.capacity),
      description: data.description,
      isAvailable: true,
      icon: vehicleIcons[data.vehicleType] || Car
    };
    
    if (editingOption) {
      setTransportOptions(transportOptions.map(option => 
        option.id === editingOption.id ? { ...newOption, id: option.id } : option
      ));
      setEditingOption(null);
    } else {
      setTransportOptions([...transportOptions, newOption]);
    }
    
    form.reset();
    setIsAddDialogOpen(false);
  };

  const handleEditTransport = (option: TransportOption) => {
    setEditingOption(option);
    form.reset({
      vehicleType: option.vehicleType,
      transportType: 'both',
      privatePrice: option.privatePrice.toString(),
      sharedPrice: option.sharedPrice.toString(),
      capacity: option.capacity.toString(),
      description: option.description,
      isAvailable: option.isAvailable
    });
    setIsAddDialogOpen(true);
  };

  const handleDeleteTransport = (id: number) => {
    setTransportOptions(transportOptions.filter(option => option.id !== id));
  };

  const handleToggleAvailability = (id: number) => {
    setTransportOptions(transportOptions.map(option => 
      option.id === id ? { ...option, isAvailable: !option.isAvailable } : option
    ));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl">Transport Management</CardTitle>
          <CardDescription>
            Manage transport options for {attractionName}
          </CardDescription>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Add Transport</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingOption ? 'Edit' : 'Add'} Transport Option</DialogTitle>
              <DialogDescription>
                Configure the transport details for this attraction.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={form.handleSubmit(handleAddTransport)} className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="vehicleType">Vehicle Type</Label>
                  <Select 
                    onValueChange={(value) => form.setValue('vehicleType', value)}
                    defaultValue={form.getValues('vehicleType')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Sedan">Sedan</SelectItem>
                      <SelectItem value="SUV">SUV</SelectItem>
                      <SelectItem value="Minibus">Minibus</SelectItem>
                      <SelectItem value="Coach Bus">Coach Bus</SelectItem>
                      <SelectItem value="Taxi">Taxi</SelectItem>
                      <SelectItem value="Train">Train</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input 
                    id="capacity" 
                    type="number"
                    placeholder="Number of passengers"
                    {...form.register('capacity')}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Transport Type</Label>
                <RadioGroup 
                  defaultValue="both"
                  className="flex space-x-4"
                  onValueChange={(value) => form.setValue('transportType', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="private" id="private" />
                    <Label htmlFor="private">Private Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="shared" id="shared" />
                    <Label htmlFor="shared">Shared Only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="both" />
                    <Label htmlFor="both">Both Options</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="privatePrice">Private Price ($)</Label>
                  <Input 
                    id="privatePrice" 
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...form.register('privatePrice')}
                    disabled={form.watch('transportType') === 'shared'}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sharedPrice">Shared Price ($)</Label>
                  <Input 
                    id="sharedPrice" 
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    {...form.register('sharedPrice')}
                    disabled={form.watch('transportType') === 'private'}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description"
                  placeholder="Enter details about this transport option"
                  {...form.register('description')}
                />
              </div>
              
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => {
                  setIsAddDialogOpen(false);
                  setEditingOption(null);
                  form.reset();
                }}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      
      <CardContent>
        {transportOptions.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vehicle Type</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Private Price</TableHead>
                <TableHead>Shared Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transportOptions.map((option) => {
                const VehicleIcon = option.icon;
                return (
                  <TableRow key={option.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <VehicleIcon className="h-4 w-4" />
                        {option.vehicleType}
                      </div>
                    </TableCell>
                    <TableCell>{option.capacity} passengers</TableCell>
                    <TableCell>${option.privatePrice.toFixed(2)}</TableCell>
                    <TableCell>${option.sharedPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button 
                        variant={option.isAvailable ? "default" : "secondary"} 
                        size="sm"
                        onClick={() => handleToggleAvailability(option.id)}
                      >
                        {option.isAvailable ? "Available" : "Unavailable"}
                      </Button>
                    </TableCell>
                    <TableCell className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => handleEditTransport(option)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => handleDeleteTransport(option.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )})}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            No transport options available. Add a transport option to get started.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransportManagement;
