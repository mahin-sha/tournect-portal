
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
  Users,
  PercentIcon,
  ArrowDown,
  ArrowUp
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';

// Mock data for agents
const agents = [
  { id: 1, name: 'Global Tours Inc.', type: 'Wholesaler', tier: 'Gold' },
  { id: 2, name: 'City Explorers', type: 'Retailer', tier: 'Silver' },
  { id: 3, name: 'Adventure Seekers Co.', type: 'Wholesaler', tier: 'Platinum' },
  { id: 4, name: 'Local Travel Agency', type: 'Retailer', tier: 'Bronze' },
  { id: 5, name: 'Voyage Unlimited', type: 'Wholesaler', tier: 'Gold' }
];

// Mock data for agent pricing rules
const initialPricingRules = [
  {
    id: 1,
    agentId: 1,
    agentName: 'Global Tours Inc.',
    adjustmentType: 'discount',
    valueType: 'percentage',
    value: 15,
    isActive: true,
    applyToAllTickets: true,
    minQuantity: 0,
  },
  {
    id: 2,
    agentId: 3,
    agentName: 'Adventure Seekers Co.',
    adjustmentType: 'discount',
    valueType: 'percentage',
    value: 20,
    isActive: true,
    applyToAllTickets: true,
    minQuantity: 10,
  },
  {
    id: 3,
    agentId: 2,
    agentName: 'City Explorers',
    adjustmentType: 'markup',
    valueType: 'fixed',
    value: 5,
    isActive: true,
    applyToAllTickets: false,
    minQuantity: 0,
  }
];

interface AttractionAgentPricingProps {
  attractionId?: number;
  attractionName?: string;
  basePrice?: number;
}

const AttractionAgentPricing: React.FC<AttractionAgentPricingProps> = ({ 
  attractionId, 
  attractionName = "Attraction",
  basePrice = 0
}) => {
  const { toast } = useToast();
  const [pricingRules, setPricingRules] = useState(initialPricingRules);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingRule, setEditingRule] = useState<any | null>(null);
  
  const [formData, setFormData] = useState({
    agentId: '',
    adjustmentType: 'discount',
    valueType: 'percentage',
    value: '',
    isActive: true,
    applyToAllTickets: true,
    minQuantity: '0',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      agentId: '',
      adjustmentType: 'discount',
      valueType: 'percentage',
      value: '',
      isActive: true,
      applyToAllTickets: true,
      minQuantity: '0',
    });
    setEditingRule(null);
  };
  
  const handleAddPricingRule = () => {
    const selectedAgent = agents.find(agent => agent.id.toString() === formData.agentId);
    
    if (!selectedAgent) {
      toast({
        title: "Agent Required",
        description: "Please select an agent for this pricing rule.",
        variant: "destructive"
      });
      return;
    }
    
    const newRule = {
      id: pricingRules.length > 0 ? Math.max(...pricingRules.map(r => r.id)) + 1 : 1,
      agentId: parseInt(formData.agentId),
      agentName: selectedAgent.name,
      adjustmentType: formData.adjustmentType,
      valueType: formData.valueType,
      value: parseFloat(formData.value),
      isActive: formData.isActive,
      applyToAllTickets: formData.applyToAllTickets,
      minQuantity: parseInt(formData.minQuantity),
    };
    
    if (editingRule) {
      setPricingRules(pricingRules.map(rule => 
        rule.id === editingRule.id ? { ...newRule, id: rule.id } : rule
      ));
      toast({
        title: "Pricing Rule Updated",
        description: `Pricing rule for ${selectedAgent.name} has been updated.`,
      });
    } else {
      setPricingRules([...pricingRules, newRule]);
      toast({
        title: "Pricing Rule Added",
        description: `New pricing rule for ${selectedAgent.name} has been added.`,
      });
    }
    
    resetForm();
    setIsAddDialogOpen(false);
  };
  
  const handleEditPricingRule = (rule: any) => {
    setEditingRule(rule);
    setFormData({
      agentId: rule.agentId.toString(),
      adjustmentType: rule.adjustmentType,
      valueType: rule.valueType,
      value: rule.value.toString(),
      isActive: rule.isActive,
      applyToAllTickets: rule.applyToAllTickets,
      minQuantity: rule.minQuantity.toString(),
    });
    setIsAddDialogOpen(true);
  };
  
  const handleDeletePricingRule = (id: number) => {
    const ruleToDelete = pricingRules.find(r => r.id === id);
    setPricingRules(pricingRules.filter(rule => rule.id !== id));
    toast({
      title: "Pricing Rule Deleted",
      description: `Pricing rule for ${ruleToDelete?.agentName} has been removed.`,
    });
  };
  
  const handleToggleRuleStatus = (id: number) => {
    setPricingRules(pricingRules.map(rule => 
      rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
    ));
    
    const rule = pricingRules.find(r => r.id === id);
    const newStatus = !rule?.isActive;
    
    toast({
      title: `Rule ${newStatus ? 'Activated' : 'Deactivated'}`,
      description: `Pricing rule for ${rule?.agentName} is now ${newStatus ? 'active' : 'inactive'}.`,
    });
  };
  
  const formatAdjustment = (rule: any) => {
    const prefix = rule.adjustmentType === 'discount' ? '-' : '+';
    if (rule.valueType === 'percentage') {
      return `${prefix}${rule.value}%`;
    } else {
      return `${prefix}$${rule.value.toFixed(2)}`;
    }
  };
  
  // Calculate adjusted price example
  const getAdjustedPrice = (rule: any) => {
    if (rule.valueType === 'percentage') {
      if (rule.adjustmentType === 'discount') {
        return basePrice * (1 - rule.value / 100);
      } else {
        return basePrice * (1 + rule.value / 100);
      }
    } else {
      if (rule.adjustmentType === 'discount') {
        return basePrice - rule.value;
      } else {
        return basePrice + rule.value;
      }
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-xl">Agent Pricing</CardTitle>
          <CardDescription>
            Set custom pricing for travel agents and wholesalers
          </CardDescription>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="default" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              <span>Add Pricing Rule</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>{editingRule ? 'Edit' : 'Add'} Agent Pricing</DialogTitle>
              <DialogDescription>
                Configure custom pricing for specific agents.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="agentId">Select Agent</Label>
                <Select 
                  value={formData.agentId}
                  onValueChange={(value) => handleSelectChange('agentId', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an agent" />
                  </SelectTrigger>
                  <SelectContent>
                    {agents.map(agent => (
                      <SelectItem key={agent.id} value={agent.id.toString()}>
                        {agent.name} ({agent.tier})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Adjustment Type</Label>
                <RadioGroup 
                  value={formData.adjustmentType}
                  onValueChange={(value) => handleSelectChange('adjustmentType', value)}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="discount" id="discount" />
                    <Label htmlFor="discount" className="flex items-center space-x-1">
                      <ArrowDown className="h-4 w-4 text-green-500" />
                      <span>Discount</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="markup" id="markup" />
                    <Label htmlFor="markup" className="flex items-center space-x-1">
                      <ArrowUp className="h-4 w-4 text-amber-500" />
                      <span>Markup</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Value Type</Label>
                  <RadioGroup 
                    value={formData.valueType}
                    onValueChange={(value) => handleSelectChange('valueType', value)}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="percentage" id="percentage" />
                      <Label htmlFor="percentage">Percentage</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fixed" id="fixed" />
                      <Label htmlFor="fixed">Fixed Amount</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="value">Value</Label>
                  <div className="relative">
                    <Input 
                      id="value"
                      name="value" 
                      type="number"
                      step={formData.valueType === 'percentage' ? '1' : '0.01'}
                      min="0"
                      placeholder="0"
                      value={formData.value}
                      onChange={handleInputChange}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      {formData.valueType === 'percentage' ? (
                        <PercentIcon className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <span className="text-muted-foreground">$</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="minQuantity">Minimum Quantity</Label>
                <Input
                  id="minQuantity"
                  name="minQuantity"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={formData.minQuantity}
                  onChange={handleInputChange}
                />
                <p className="text-xs text-muted-foreground">
                  Minimum number of tickets required to apply this pricing.
                </p>
              </div>
              
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="applyToAllTickets"
                    checked={formData.applyToAllTickets}
                    onCheckedChange={(checked) => handleSwitchChange('applyToAllTickets', checked)}
                  />
                  <Label htmlFor="applyToAllTickets">Apply to All Ticket Types</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => handleSwitchChange('isActive', checked)}
                  />
                  <Label htmlFor="isActive">Active</Label>
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
              <Button type="button" onClick={handleAddPricingRule}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      
      <CardContent>
        {pricingRules.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agent</TableHead>
                <TableHead>Adjustment</TableHead>
                <TableHead>Min. Quantity</TableHead>
                <TableHead>Base Price</TableHead>
                <TableHead>Agent Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pricingRules.map((rule) => {
                const adjustedPrice = getAdjustedPrice(rule);
                return (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">
                    {rule.agentName}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${
                        rule.adjustmentType === 'discount'
                          ? 'text-green-600 border-green-200 bg-green-50'
                          : 'text-amber-600 border-amber-200 bg-amber-50'
                      }`}
                    >
                      {formatAdjustment(rule)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {rule.minQuantity > 0 ? `${rule.minQuantity}+ tickets` : 'No minimum'}
                  </TableCell>
                  <TableCell>${basePrice.toFixed(2)}</TableCell>
                  <TableCell className="font-medium">
                    ${adjustedPrice.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={rule.isActive ? "default" : "secondary"}>
                      {rule.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleToggleRuleStatus(rule.id)}
                      title={rule.isActive ? "Deactivate" : "Activate"}
                    >
                      <Users className={`h-4 w-4 ${!rule.isActive && 'text-muted-foreground'}`} />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => handleEditPricingRule(rule)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeletePricingRule(rule.id)}
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
            No agent pricing rules configured. Add a pricing rule to get started.
          </div>
        )}
        
        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <h4 className="font-medium mb-2">About Agent Pricing</h4>
          <p className="text-sm text-muted-foreground mb-2">
            Agent pricing rules allow you to set custom pricing for different travel agents and wholesalers. You can:
          </p>
          <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
            <li>Apply discounts or markups as percentages or fixed amounts</li>
            <li>Set minimum purchase quantities to incentivize bulk bookings</li>
            <li>Apply different pricing to specific ticket types</li>
            <li>Temporarily deactivate rules without deleting them</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttractionAgentPricing;
