
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface Position {
  id: string;
  symbol: string;
  name: string;
  entryPrice: number;
  currentPrice: number;
  shares: number;
}

interface PositionCloseDialogProps {
  position: Position | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (positionId: string, closePrice: number) => void;
}

const PositionCloseDialog: React.FC<PositionCloseDialogProps> = ({
  position,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [closePrice, setClosePrice] = useState('');
  const [error, setError] = useState('');

  const handleConfirm = () => {
    const price = parseFloat(closePrice);
    
    if (!price || price <= 0) {
      setError('Please enter a valid closing price');
      return;
    }

    if (position) {
      onConfirm(position.id, price);
      setClosePrice('');
      setError('');
      onClose();
    }
  };

  const handleClose = () => {
    setClosePrice('');
    setError('');
    onClose();
  };

  React.useEffect(() => {
    if (position && isOpen) {
      setClosePrice(position.currentPrice.toString());
    }
  }, [position, isOpen]);

  if (!position) return null;

  const estimatedPnL = closePrice ? 
    ((parseFloat(closePrice) - position.entryPrice) * position.shares) : 0;

  return (
    <AlertDialog open={isOpen} onOpenChange={handleClose}>
      <AlertDialogContent className="bg-slate-800 border-slate-700">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            Close Position: {position.symbol}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-slate-300">
            You are about to close your position in {position.name}. 
            Please confirm the closing price.
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="space-y-4 my-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-slate-400">Entry Price:</span>
              <span className="text-white ml-2">${position.entryPrice.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-slate-400">Shares:</span>
              <span className="text-white ml-2">{position.shares}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="closePrice" className="text-slate-300">
              Closing Price
            </Label>
            <Input
              id="closePrice"
              type="number"
              step="0.01"
              value={closePrice}
              onChange={(e) => {
                setClosePrice(e.target.value);
                setError('');
              }}
              placeholder="Enter closing price"
              className="bg-slate-700 border-slate-600 text-white"
            />
            {error && (
              <p className="text-red-400 text-sm">{error}</p>
            )}
          </div>

          {closePrice && (
            <div className="bg-slate-700/50 p-3 rounded-md">
              <div className="text-sm">
                <span className="text-slate-400">Estimated P&L:</span>
                <span className={`ml-2 font-semibold ${estimatedPnL >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {estimatedPnL >= 0 ? '+' : ''}${estimatedPnL.toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel 
            onClick={handleClose}
            className="bg-slate-700 text-white hover:bg-slate-600 border-slate-600"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Close Position
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PositionCloseDialog;
