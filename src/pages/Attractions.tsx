import React, { useState } from 'react';
import { MapPin, Search, Plus, Filter, ArrowUpDown, MoreHorizontal, Trash2, Edit, Tag, Calendar, Ticket, X, Bus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import TransportManagement from '@/components/attractions/TransportManagement';
import AttractionTickets from '@/components/attractions/AttractionTickets';
import AttractionCombos from '@/components/attractions/AttractionCombos';
import AttractionHolidays from '@/components/attractions/AttractionHolidays';
import AttractionAgentPricing from '@/components/attractions/AttractionAgentPricing';
import { useToast } from '@/components/ui/use-toast';

// Mock data for attractions
const initialAttractions = [
  {
    id: 1,
    name: 'Eiffel Tower Experience',
    location: 'Paris, France',
    description: 'Skip-the-line tickets to the iconic Eiffel Tower with guided tour options.',
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=500&auto=format&fit=crop',
    basePrice: 79.99,
    tax: 10.00,
    category: 'Monument',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Colosseum Underground Tour',
    location: 'Rome, Italy',
    description: 'Exclusive access to the underground chambers and arena floor of the Colosseum.',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=500&auto=format&fit=crop',
    basePrice: 69.99,
    tax: 10.00,
    category: 'Historical',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Louvre Museum Fast Pass',
    location: 'Paris, France',
    description: 'Skip the line and explore the world\'s largest art museum at your own pace.',
    image: 'https://images.unsplash.com/photo-1565799557186-1cbf92e8e69a?q=80&w=500&auto=format&fit=crop',
    basePrice: 55.50,
    tax: 10.00,
    category: 'Museum',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Tokyo Skytree Observation',
    location: 'Tokyo, Japan',
    description: 'Breathtaking views of Tokyo from the tallest tower in Japan.',
    image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=500&auto=format&fit=crop',
    basePrice: 35.00,
    tax: 10.00,
    category: 'Observation',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Barcelona Sagrada Familia',
    location: 'Barcelona, Spain',
    description: 'Guided tour of Gaudí\'s architectural masterpiece, including tower access.',
    image: 'https://images.unsplash.com/photo-1583779457094-ab6f9164a1b8?q=80&w=500&auto=format&fit=crop',
    basePrice: 49.99,
    tax: 10.00,
    category: 'Monument',
    status: 'Active',
  },
  {
    id: 6,
    name: 'Statue of Liberty Ferry',
    location: 'New York, USA',
    description: 'Ferry ticket to Liberty Island with access to the statue\'s pedestal.',
    image: 'https://images.unsplash.com/photo-1575529312257-ee19baa2e979?q=80&w=500&auto=format&fit=crop',
    basePrice: 18.50,
    tax: 10.00,
    category: 'Monument',
    status: 'Inactive',
  },
];

const categoryOptions = [
  { label: '🏛️ Monuments', value: 'Monument' },
  { label: '🏺 Historical', value: 'Historical' },
  { label: '🎨 Museums', value: 'Museum' },
  { label: '🌅 Observation', value: 'Observation' },
  { label: '🌊 Water Activities', value: 'Water' },
  { label: '🏞️ Adventure', value: 'Adventure' },
];

interface AttractionFormValues {
  name: string;
  location: string;
  description: string;
  image: string;
  basePrice: string;
  tax: string;
  category: string;
  status: string;
}

const Attractions = () => {
  const { toast } = useToast();
  const [attractions, setAttractions] = useState(initialAttractions);
  const [selectedAttraction, setSelectedAttraction] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [attractionToDelete, setAttractionToDelete] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<string | null>(null);
  
  const form = useForm<AttractionFormValues>({
    defaultValues: {
      name: '',
      location: '',
      description: '',
      image: '',
      basePrice: '',
      tax: '',
      category: '',
      status: 'Active',
    }
  });
  
  const handleViewDetails = (id: number) => {
    setSelectedAttraction(id);
    setViewMode('detail');
  };
  
  const handleBackToList = () => {
    setViewMode('list');
    setSelectedAttraction(null);
  };
  
  const handleAddAttraction = (data: AttractionFormValues) => {
    const newAttraction = {
      id: attractions.length > 0 ? Math.max(...attractions.map(a => a.id)) + 1 : 1,
      name: data.name,
      location: data.location,
      description: data.description,
      image: data.image || 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=500&auto=format&fit=crop',
      basePrice: parseFloat(data.basePrice),
      tax: parseFloat(data.tax),
      category: data.category,
      status: data.status,
    };
    
    setAttractions([...attractions, newAttraction]);
    form.reset();
    
    toast({
      title: "Attraction Added",
      description: `${data.name} has been successfully added.`,
    });
  };
  
  const handleEditAttraction = (id: number) => {
    const attraction = attractions.find(a => a.id === id);
    if (attraction) {
      form.reset({
        name: attraction.name,
        location: attraction.location,
        description: attraction.description,
        image: attraction.image,
        basePrice: attraction.basePrice.toString(),
        tax: attraction.tax.toString(),
        category: attraction.category,
        status: attraction.status,
      });
      
      const dialogTrigger = document.querySelector('[data-dialog-trigger="edit"]') as HTMLButtonElement;
      if (dialogTrigger) dialogTrigger.click();
    }
  };
  
  const handleUpdateAttraction = (data: AttractionFormValues) => {
    setAttractions(attractions.map(attr => 
      attr.id === selectedAttraction ? {
        ...attr,
        name: data.name,
        location: data.location,
        description: data.description,
        image: data.image || attr.image,
        basePrice: parseFloat(data.basePrice),
        tax: parseFloat(data.tax),
        category: data.category,
        status: data.status,
      } : attr
    ));
    
    form.reset();
    
    toast({
      title: "Attraction Updated",
      description: `${data.name} has been successfully updated.`,
    });
  };
  
  const confirmDelete = (id: number) => {
    setAttractionToDelete(id);
    setShowDeleteDialog(true);
  };
  
  const handleDeleteAttraction = () => {
    if (attractionToDelete) {
      const attractionName = attractions.find(a => a.id === attractionToDelete)?.name;
      setAttractions(attractions.filter(attr => attr.id !== attractionToDelete));
      setShowDeleteDialog(false);
      setAttractionToDelete(null);
      
      if (selectedAttraction === attractionToDelete) {
        handleBackToList();
      }
      
      toast({
        title: "Attraction Deleted",
        description: `${attractionName} has been removed from your attractions.`,
      });
    }
  };
  
  const handleToggleStatus = (id: number) => {
    setAttractions(attractions.map(attr => 
      attr.id === id ? {
        ...attr,
        status: attr.status === 'Active' ? 'Inactive' : 'Active',
      } : attr
    ));
    
    const attraction = attractions.find(a => a.id === id);
    const newStatus = attraction?.status === 'Active' ? 'Inactive' : 'Active';
    
    toast({
      title: `Status Updated`,
      description: `${attraction?.name} is now ${newStatus}.`,
    });
  };
  
  const filteredAttractions = attractions.filter(attr => {
    const matchesSearch = attr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          attr.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory ? attr.category === filterCategory : true;
    return matchesSearch && matchesCategory;
  });
  
  const attraction = selectedAttraction 
    ? attractions.find(a => a.id === selectedAttraction) 
    : null;
  
  const totalPrice = attraction ? (attraction.basePrice + attraction.tax).toFixed(2) : '0.00';
  
  return (
    <div className="animate-fade-in">
      {viewMode === 'list' ? (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Attractions</h1>
              <p className="text-muted-foreground mt-1">
                Manage your tours and attractions
              </p>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Attraction</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Add New Attraction</DialogTitle>
                  <DialogDescription>
                    Enter the details for the new attraction. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleAddAttraction)} className="space-y-4 py-4">
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Attraction Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter attraction name" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input placeholder="City, Country" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
                      <FormField
                        control={form.control}
                        name="basePrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Base Price</FormLabel>
                            <FormControl>
                              <Input type="number" step="0.01" placeholder="0.00" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="tax"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Tax Amount</FormLabel>
                            <FormControl>
                              <Input type="number" step="0.01" placeholder="0.00" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {categoryOptions.map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Image URL</FormLabel>
                          <FormControl>
                            <Input placeholder="https://example.com/image.jpg" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter a URL for the attraction image (optional)
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Enter description"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Active">Active</SelectItem>
                              <SelectItem value="Inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                    
                    <DialogFooter>
                      <Button type="submit">Save Attraction</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search attractions..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ArrowUpDown className="h-4 w-4" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Category
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-2 h-4 w-4"
                    >
                      <path
                        d="M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.26618 11.9026 7.38064 11.95 7.49999 11.95C7.61933 11.95 7.73379 11.9026 7.81819 11.8182L10.0682 9.56819Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setFilterCategory(null)}>
                    All Categories
                  </DropdownMenuItem>
                  {categoryOptions.map(option => (
                    <DropdownMenuItem key={option.value} onClick={() => setFilterCategory(option.value)}>
                      <span className="mr-2">{option.label.split(' ')[0]}</span> {option.value}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {filteredAttractions.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredAttractions.map((attraction, index) => (
                <Card 
                  key={attraction.id} 
                  className="relative overflow-hidden hover:shadow-md transition-shadow animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <AspectRatio ratio={16 / 9}>
                    <img
                      src={attraction.image}
                      alt={attraction.name}
                      className="object-cover w-full h-full rounded-t-lg"
                    />
                  </AspectRatio>
                  
                  <CardHeader className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{attraction.name}</CardTitle>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4" />
                          {attraction.location}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(attraction.id)}>View Details</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedAttraction(attraction.id);
                            handleEditAttraction(attraction.id);
                          }}>Edit</DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleToggleStatus(attraction.id)}>
                            {attraction.status === 'Active' ? 'Deactivate' : 'Activate'}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-destructive"
                            onClick={() => confirmDelete(attraction.id)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription>{attraction.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="rounded-md">
                        {attraction.category}
                      </Badge>
                      <Badge variant={attraction.status === 'Active' ? 'default' : 'secondary'} className="rounded-md">
                        {attraction.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <span className="text-muted-foreground">Base: </span>
                        <span className="font-medium">${attraction.basePrice.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Tax: </span>
                        <span className="font-medium">${attraction.tax.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Total: </span>
                        <span className="font-bold">${(attraction.basePrice + attraction.tax).toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" size="sm" onClick={() => {
                      setSelectedAttraction(attraction.id);
                      handleEditAttraction(attraction.id);
                    }}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="default" size="sm" onClick={() => handleViewDetails(attraction.id)}>
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center p-10 border rounded-md">
              <p className="text-muted-foreground mb-4">No attractions found matching your criteria.</p>
              <Button onClick={() => {
                setSearchTerm('');
                setFilterCategory(null);
              }}>Clear Filters</Button>
            </div>
          )}
          
          {/* Hidden dialog trigger for edit */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="hidden" data-dialog-trigger="edit">Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Edit Attraction</DialogTitle>
                <DialogDescription>
                  Update the details for this attraction.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleUpdateAttraction)} className="space-y-4 py-4">
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Attraction Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter attraction name" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="City, Country" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="basePrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Base Price</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.01" placeholder="0.00" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="tax"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tax Amount</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.01" placeholder="0.00" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categoryOptions.map(option => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter a URL for the attraction image (optional)
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Enter description"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  
                  <DialogFooter>
                    <Button type="submit">Update Attraction</Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          
          <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the attraction
                  and all associated data like tickets, transport options, and pricing.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteAttraction} className="bg-destructive text-destructive-foreground">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleBackToList}>
                ← Back to Attractions
              </Button>
              <h1 className="text-2xl font-bold">{attraction?.name}</h1>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => {
                  if (attraction) handleEditAttraction(attraction.id);
                }}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Attraction
              </Button>
              <Button 
                variant={attraction?.status === 'Active' ? 'secondary' : 'default'}
                onClick={() => {
                  if (attraction) handleToggleStatus(attraction.id);
                }}
              >
                {attraction?.status === 'Active' ? 'Deactivate' : 'Activate'}
              </Button>
            </div>
          </div>
          
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <AspectRatio ratio={16 / 9}>
                <img
                  src={attraction?.image}
                  alt={attraction?.name}
                  className="object-cover w-full h-full rounded-t-lg"
                />
              </AspectRatio>
              <CardHeader>
                <CardTitle>{attraction?.name}</CardTitle>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {attraction?.location}
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{attraction?.description}</p>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="rounded-md">
                    {attraction?.category}
                  </Badge>
                  <Badge variant={attraction?.status === 'Active' ? 'default' : 'secondary'} className="rounded-md">
                    {attraction?.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Base Price</div>
                    <div className="text-lg font-medium">${attraction?.basePrice.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Tax Amount</div>
                    <div className="text-lg font-medium">${attraction?.tax.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Total Price</div>
                    <div className="text-lg font-bold">${totalPrice}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Tickets Sold (Month)</div>
                    <div className="text-2xl font-bold">1,245</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Revenue (Month)</div>
                    <div className="text-2xl font-bold">$112,680</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Active Ticket Types</div>
                    <div className="text-2xl font-bold">4</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="w-full" size="sm">
                    <Ticket className="h-4 w-4 mr-2" />
                    Add Ticket
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Set Holiday
                  </Button>
                  <Button variant="outline" className="w-full" size="sm">
                    <Tag className="h-4 w-4 mr-2" />
                    Create Combo
                  </Button>
                  <Button variant="outline" className="w-full" size="sm" onClick={() => confirmDelete(selectedAttraction!)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-6">
            <Tabs defaultValue="tickets">
              <TabsList className="mb-4">
                <TabsTrigger value="tickets">
                  <Ticket className="h-4 w-4 mr-2" />
                  Tickets
                </TabsTrigger>
                <TabsTrigger value="combos">
                  <Tag className="h-4 w-4 mr-2" />
                  Combo Packs
                </TabsTrigger>
                <TabsTrigger value="holidays">
                  <Calendar className="h-4 w-4 mr-2" />
                  Holidays
                </TabsTrigger>
                <TabsTrigger value="transport">
                  <Bus className="h-4 w-4 mr-2" />
                  Transport
                </TabsTrigger>
                <TabsTrigger value="agent-pricing">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  Agent Pricing
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="tickets" className="mt-0">
                <AttractionTickets 
                  attractionId={attraction?.id} 
                  attractionName={attraction?.name} 
                  basePrice={attraction?.basePrice}
                />
              </TabsContent>
              
              <TabsContent value="combos" className="mt-0">
                <AttractionCombos
                  attractionId={attraction?.id}
                  attractionName={attraction?.name}
                  basePrice={attraction?.basePrice}
                />
              </TabsContent>
              
              <TabsContent value="holidays" className="mt-0">
                <AttractionHolidays
                  attractionId={attraction?.id}
                  attractionName={attraction?.name}
                />
              </TabsContent>
              
              <TabsContent value="transport" className="mt-0">
                <TransportManagement 
                  attractionId={attraction?.id} 
                  attractionName={attraction?.name} 
                />
              </TabsContent>
              
              <TabsContent value="agent-pricing" className="mt-0">
                <AttractionAgentPricing
                  attractionId={attraction?.id}
                  attractionName={attraction?.name}
                  basePrice={attraction?.basePrice}
                />
              </TabsContent>
            </Tabs>
          </div>
        </>
      )}
    </div>
  );
};

export default Attractions;
