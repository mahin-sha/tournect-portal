
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface DashboardModuleProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
  to: string;
  color?: string;
}

const DashboardModule: React.FC<DashboardModuleProps> = ({
  title,
  description,
  icon,
  to,
  color = "bg-primary/10 text-primary",
}) => {
  return (
    <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
      <Link to={to} className="h-full flex flex-col">
        <CardHeader className="pb-2">
          <div className={`p-2 w-10 h-10 flex items-center justify-center rounded-lg ${color} mb-2`}>
            {icon}
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="flex-grow">
          {/* Content can be added here */}
        </CardContent>
        <CardFooter className="pt-0">
          <Button variant="ghost" className="p-0 h-auto text-sm text-muted-foreground hover:text-foreground">
            View <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default DashboardModule;
