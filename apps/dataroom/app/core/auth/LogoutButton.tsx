'use client';

import { LogOut } from 'lucide-react';
import { Button } from '../../components/Button';
import { useAuth } from './AuthContext';

export const LogoutButton = () => {
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Button onClick={handleSignOut} variant="outline" size="sm">
      <LogOut />
    </Button>
  );
};
