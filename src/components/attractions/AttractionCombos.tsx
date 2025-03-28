
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
import { Checkbox } from '@/components/ui/checkbox';
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
  Tag, 
  Percent
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';

// Mock data for attractions to include in combos
const availableAttractions = [
  { id: 1, name: 'Eiffel Tower Experience', basePrice: 79.99, tax: 10.00 },
  { id: 2, name: 'Louvre Museum Fast Pass', basePrice: 55.50, tax: 10.00 },
  { id: 3, name: 'Seine River Cruise', basePrice: 35.00, tax: 5.00 },
  { id: 4, name: 'Arc de Triomphe Visit', basePrice: 25.00, tax: 5.00 },
  { id: 5, name: 'Montmartre Walking Tour', basePrice: 18.00, tax: 2.00 }
];

// Mock data for combo packs
const initialCombos = [
  {
    id: 1,
    name: 'Paris Explorer Pass',
    description: 'Access to 3 top Paris attractions at a discounted rate.',
    attractions: [1, 2, 3],
    basePrice: 150.00,
    tax: 25.00,
    discountPercent: 15,
    isAvailable: true,
    validityDays: 3,
  },
  {
    id: 2,
    name: 'Paris Complete Pass',
    description: 'Full access to all 5 major Paris attractions with a significant discount.',
    attractions: [1, 2, 3, 4, 5],
    basePrice: 200.00,
    tax: 30.00,
    discountPercent: 25,
    isAvailable: true,
    validityDays: 5,
  }
];

interface AttractionCombosProps {
  attractionId?: number;
  attractionName?: string;
  basePrice?: number;
}

const AttractionCombos: React.FC<AttractionCombosProps> = ({ 
  attractionId, 
  attractionName = "Attraction",
  basePrice = 0
}) => {
  const { toast } = useToast();
  const [combos, setCombos] = useState(initialCombos);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingCombo, setEditingCombo] = useState<any | null>(null);
  const [selectedAttractions, setSelectedAttractions] = useState<number[]>([]);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    basePrice: '',
    tax: '',
    discountPercent: '',
    validityDays: '',
    isAvailable: true,
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
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
  
  const toggleAttraction = (attractionId: number) => {
    setSelectedAttractions(prev => {
      if (prev.includes(attractionId)) {
        return prev.filter(id => id !== attractionId);
      } else {
        return [...prev, attractionId];
      }
    });
  };
  
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      basePrice: '',
      tax: '',
      discountPercent: '',
      validityDays: '',
      isAvailable: true,
    });
    setSelectedAttractions([]);
    setEditingCombo(null);
  };
  
  const handleAddCombo = () => {
    if (selectedAttractions.length < 2) {
      toast({
        title: "Invalid Selection",
        description: "A combo pack must include at least 2 attractions.",
        variant: "destructive"
      });
      return;
    }
    
    const newCombo = {
      id: combos.length > 0 ? Math.max(...combos.map(c => c.id)) + 1 : 1,
      name: formData.name,
      description: formData.description,
      attractions: selectedAttractions,
      basePrice: parseFloat(formData.basePrice),
      tax: parseFloat(formData.tax),
      discountPercent: parseFloat(formData.discountPercent),
      isAvailable: formData.isAvailable,
      validityDays: parseInt(formData.validityDays)
    };
    
    if (editingCombo) {
      setCombos(combos.map(combo => 
        combo.id === editingCombo.id ? { ...newCombo, id: combo.id } : combo
      ));
      toast({
        title: "Combo Updated",
        description: `${newCombo.name} has been updated successfully.`,
      });
    } else {
      setCombos([...combos, newCombo]);
      toast({
        title: "Combo Added",
        description: `${newCombo.name} has been added successfully.`,
      });
    }
    
    resetForm();
    setIsAddDialogOpen(false);
  };
  
  const handleEditCombo = (combo: any) => {
    setEditingCombo(combo);
    setFormData({
      name: combo.name,
      description: combo.description,
      basePrice: combo.basePrice.toString(),
      tax: combo.tax.toString(),
      discountPercent: combo.discountPercent.toString(),
      validityDays: combo.validityDays.toString(),
      isAvailable: combo.isAvailable,
    });
    setSelectedAttractions(combo.attractions);
    setIsAddDialogOpen(true);
  };
  
  const handleDeleteCombo = (id: number) => {
    const comboToDelete = combos.find(c => c.id === id);
    setCombos(combos.filter(combo => combo.id !== id));
    toast({
      title: "Combo Deleted",
      description: `${comboToDelete?.name} has been removed.`,
    });
  };
  
  const handleToggleAvailability = (id: number) => {
    setCombos(combos.map(combo => 
      combo.id === id ? { ...combo, isAvailable: !combo.isAvailable } : combo
    ));
    
    const combo = combos.find(c => c.id === id);
    const newStatus = !combo?.isAvailable;
    
    toast({
      title: `Combo ${newStatus ? 'Activated' : 'Deactivated'}`,
      description: `${combo?.name} is now ${newStatus ? 'available' : 'unavailable'} for purchase.`,
    });
  };
  
  const getAttractionName = (id: number) => {
    return availableAttractions.find(attr => attr.id === id)?.name || 'Unknown Attraction';
  };
  
  const getComboSavings = (combo: any) => {
    const regularPrice = combo.attractions.reduce((sum: number, attrId: number) => {
      const attr = availableAttractions.find(a => a.id === attrId);
      return sum + (attr ? attr.basePrice + attr.tax : 0);
    }, 0);
    
    const comboPrice = combo.basePrice + combo.tax;
    const savings = regularPrice - comboPrice;
    
    return savings > 0 ? savings.toFixed(2) : '0.00';
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl">Combo Packs</CardTitle>
          <CardDescription>
            Create and manage combo packs that include {attractionName}
          </CardDescription>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Add Combo</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>{editingCombo ? 'Edit' : 'Create'} Combo Pack</DialogTitle>
              <DialogDescription>
                Combine multiple attractions into a discounted package.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Combo Name</Label>
                  <Input 
                    id="name" 
                    name="name"
                    placeholder="e.g. City Explorer Pass"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description"
                    name="description"
                    placeholder="Enter combo description"
                    value={formData.description}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Select Attractions</Label>
                <div className="border rounded-md divide-y">
                  {availableAttractions.map((attraction) => (
                    <div 
                      key={attraction.id} 
                      className="flex items-center space-x-2 p-3"
                    >
                      <Checkbox 
                        id={`attraction-${attraction.id}`}
                        checked={selectedAttractions.includes(attraction.id)}
                        onCheckedChange={() => toggleAttraction(attraction.id)}
                      />
                      <Label 
                        htmlFor={`attraction-${attraction.id}`}
                        className="flex flex-1 justify-between items-center"
                      >
                        <span>{attraction.name}</span>
                        <span className="font-medium">${(attraction.basePrice + attraction.tax).toFixed(2)}</span>
                      </Label>
                    </div>
                  ))}
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
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discountPercent">Discount Percentage</Label>
                  <div className="relative">
                    <Input 
                      id="discountPercent" 
                      name="discountPercent"
                      type="number"
                      step="1"
                      min="0"
                      max="100"
                      placeholder="0"
                      value={formData.discountPercent}
                      onChange={handleInputChange}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <Percent className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="validityDays">Validity (Days)</Label>
                  <Input 
                    id="validityDays" 
                    name="validityDays"
                    type="number"
                    min="1"
                    placeholder="Enter days"
                    value={formData.validityDays}
                    onChange={handleInputChange}
                  />
                </div>
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
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => {
                setIsAddDialogOpen(false);
                resetForm();
              }}>
                Cancel
              </Button>
              <Button type="button" onClick={handleAddCombo}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      
      <CardContent>
        {combos.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Combo Pack</TableHead>
                <TableHead>Included Attractions</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Savings</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {combos.map((combo) => (
                <TableRow key={combo.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-medium">{combo.name}</div>
                      <div className="text-xs text-muted-foreground mt-1">{combo.description}</div>
                      <div className="text-xs mt-1">Valid for {combo.validityDays} days</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {combo.attractions.map((attrId: number) => (
                        <span key={attrId} className="text-sm">
                          • {getAttractionName(attrId)}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>${(combo.basePrice + combo.tax).toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {combo.discountPercent}% Off
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-green-600">
                    ${getComboSavings(combo)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={combo.isAvailable ? "default" : "secondary"}>
                      {combo.isAvailable ? "Available" : "Unavailable"}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleToggleAvailability(combo.id)}
                      title={combo.isAvailable ? "Deactivate" : "Activate"}
                    >
                      <Tag className={`h-4 w-4 ${!combo.isAvailable && 'text-muted-foreground'}`} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleEditCombo(combo)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteCombo(combo.id)}
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
            No combo packs available. Create a combo pack to get started.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AttractionCombos;
