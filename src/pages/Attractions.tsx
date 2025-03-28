import React, { useState } from 'react';
import { MapPin, Search, Plus, Filter, ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TransportManagement from '@/components/attractions/TransportManagement';

// Mock data for attractions
const attractions = [
  {
    id: 1,
    name: 'Eiffel Tower Experience',
    location: 'Paris, France',
    description: 'Skip-the-line tickets to the iconic Eiffel Tower with guided tour options.',
    image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=500&auto=format&fit=crop',
    price: 89.99,
    category: 'Monument',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Colosseum Underground Tour',
    location: 'Rome, Italy',
    description: 'Exclusive access to the underground chambers and arena floor of the Colosseum.',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=500&auto=format&fit=crop',
    price: 79.99,
    category: 'Historical',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Louvre Museum Fast Pass',
    location: 'Paris, France',
    description: 'Skip the line and explore the world\'s largest art museum at your own pace.',
    image: 'https://images.unsplash.com/photo-1565799557186-1cbf92e8e69a?q=80&w=500&auto=format&fit=crop',
    price: 65.50,
    category: 'Museum',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Tokyo Skytree Observation',
    location: 'Tokyo, Japan',
    description: 'Breathtaking views of Tokyo from the tallest tower in Japan.',
    image: 'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?q=80&w=500&auto=format&fit=crop',
    price: 45.00,
    category: 'Observation',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Barcelona Sagrada Familia',
    location: 'Barcelona, Spain',
    description: 'Guided tour of Gaudí\'s architectural masterpiece, including tower access.',
    image: 'https://images.unsplash.com/photo-1583779457094-ab6f9164a1b8?q=80&w=500&auto=format&fit=crop',
    price: 59.99,
    category: 'Monument',
    status: 'Active',
  },
  {
    id: 6,
    name: 'Statue of Liberty Ferry',
    location: 'New York, USA',
    description: 'Ferry ticket to Liberty Island with access to the statue\'s pedestal.',
    image: 'https://images.unsplash.com/photo-1575529312257-ee19baa2e979?q=80&w=500&auto=format&fit=crop',
    price: 28.50,
    category: 'Monument',
    status: 'Inactive',
  },
];

const Attractions = () => {
  const [selectedAttraction, setSelectedAttraction] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  
  const handleViewDetails = (id: number) => {
    setSelectedAttraction(id);
    setViewMode('detail');
  };
  
  const handleBackToList = () => {
    setViewMode('list');
    setSelectedAttraction(null);
  };
  
  const attraction = selectedAttraction 
    ? attractions.find(a => a.id === selectedAttraction) 
    : null;
  
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
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Attraction</DialogTitle>
                  <DialogDescription>
                    Enter the details for the new attraction. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Attraction Name
                    </label>
                    <Input id="name" placeholder="Enter attraction name" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="location" className="text-sm font-medium">
                      Location
                    </label>
                    <Input id="location" placeholder="City, Country" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="price" className="text-sm font-medium">
                      Base Price
                    </label>
                    <Input id="price" type="number" placeholder="0.00" />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="description" className="text-sm font-medium">
                      Description
                    </label>
                    <textarea 
                      id="description" 
                      className="min-h-20 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Enter description"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                  <Button type="submit">Save Attraction</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search attractions..." 
                className="pl-10"
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
                  <DropdownMenuItem>
                    <span className="mr-2">🏛️</span> Monuments
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span className="mr-2">🏺</span> Historical
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span className="mr-2">🎨</span> Museums
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span className="mr-2">🌅</span> Observation
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {attractions.map((attraction, index) => (
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
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Manage Tickets</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription>{attraction.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="rounded-md">
                      {attraction.category}
                    </Badge>
                    <Badge variant={attraction.status === 'Active' ? 'default' : 'secondary'} className="rounded-md">
                      {attraction.status}
                    </Badge>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between">
                  <p className="text-lg font-bold">
                    ${attraction.price.toFixed(2)}
                  </p>
                  <Button variant="default" size="sm" onClick={() => handleViewDetails(attraction.id)}>
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
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
              <Button variant="outline">Edit Attraction</Button>
              <Button variant="default">Manage Tickets</Button>
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
                <p className="text-lg font-bold">Base Price: ${attraction?.price.toFixed(2)}</p>
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
            </div>
          </div>
          
          <div className="mt-6">
            <Tabs defaultValue="transport">
              <TabsList className="mb-4">
                <TabsTrigger value="transport">Transport</TabsTrigger>
                <TabsTrigger value="tickets">Tickets</TabsTrigger>
                <TabsTrigger value="combos">Combo Packs</TabsTrigger>
                <TabsTrigger value="holidays">Holidays</TabsTrigger>
              </TabsList>
              
              <TabsContent value="transport" className="mt-0">
                <TransportManagement 
                  attractionId={attraction?.id} 
                  attractionName={attraction?.name} 
                />
              </TabsContent>
              
              <TabsContent value="tickets" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Ticket Management</CardTitle>
                    <CardDescription>
                      Manage ticket types for {attraction?.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Ticket management content will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="combos" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Combo Packs</CardTitle>
                    <CardDescription>
                      Create and manage combo packs that include {attraction?.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Combo packs content will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="holidays" className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Holiday Settings</CardTitle>
                    <CardDescription>
                      Manage holiday dates and special pricing
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Holiday settings content will appear here.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </>
      )}
    </div>
  );
};

export default Attractions;
