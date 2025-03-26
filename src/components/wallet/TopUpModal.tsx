
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import { CreditCard, Wallet, Building, AlertCircle } from 'lucide-react';

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTopUp: (amount: number, method: string) => void;
}

const TopUpModal: React.FC<TopUpModalProps> = ({ isOpen, onClose, onTopUp }) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount greater than 0",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      onTopUp(parseFloat(amount), paymentMethod);
      setIsProcessing(false);
      setAmount('');
      setPaymentMethod('credit-card');
      onClose();
      
      toast({
        title: "Top Up Successful",
        description: `$${parseFloat(amount).toLocaleString()} has been added to your wallet balance`,
      });
    }, 1500);
  };

  const getPaymentMethodIcon = () => {
    switch (paymentMethod) {
      case 'credit-card':
        return <CreditCard className="h-4 w-4" />;
      case 'bank-transfer':
        return <Building className="h-4 w-4" />;
      default:
        return <Wallet className="h-4 w-4" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Top Up Wallet Balance</DialogTitle>
          <DialogDescription>
            Add funds to your wallet to book attractions and tickets.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              placeholder="Enter amount"
              type="number"
              min="1"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select
              value={paymentMethod}
              onValueChange={setPaymentMethod}
            >
              <SelectTrigger id="paymentMethod">
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="credit-card">Credit/Debit Card</SelectItem>
                <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                <SelectItem value="digital-wallet">Digital Wallet</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {user?.role === 'agent' && user.creditLimit && (
            <div className="flex items-start p-3 bg-blue-50 rounded-md text-sm">
              <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-700">Current Status</p>
                <p className="text-blue-600 mt-1">
                  Wallet Balance: ${user.walletBalance?.toLocaleString()}<br />
                  Credit Limit: ${user.creditLimit?.toLocaleString()}
                </p>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isProcessing}
              className="gap-2"
            >
              {isProcessing ? (
                <>Processing...</>
              ) : (
                <>
                  {getPaymentMethodIcon()}
                  Top Up Now
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TopUpModal;
