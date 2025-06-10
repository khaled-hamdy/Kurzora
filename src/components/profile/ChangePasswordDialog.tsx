
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ChangePasswordDialog: React.FC<ChangePasswordDialogProps> = ({ open, onOpenChange }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    console.log('Changing password...');
    
    // TODO: Connect to backend logic via /src/backend-functions/ChangePassword.ts
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setNewPassword('');
    setConfirmPassword('');
    onOpenChange(false);
    alert('Password changed successfully!');
  };

  const handleClose = () => {
    setNewPassword('');
    setConfirmPassword('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center text-white">
            <Lock className="h-5 w-5 mr-2 text-blue-400" />
            Change Password
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="text-slate-300">New Password</Label>
            <div className="relative mt-1">
              <Input
                type={showNewPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white pr-10"
                placeholder="Enter new password"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div>
            <Label className="text-slate-300">Confirm New Password</Label>
            <div className="relative mt-1">
              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white pr-10"
                placeholder="Confirm new password"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <DialogFooter className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !newPassword || !confirmPassword}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? 'Changing...' : 'Change Password'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
