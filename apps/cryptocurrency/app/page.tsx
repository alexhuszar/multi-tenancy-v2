'use client';

import { Button } from './components/Button';
import { useToast } from '@multi-tenancy/design-system';

export default function Index() {
  const { toast } = useToast();
  const handleClick = () => {
    toast({
      variant: 'success',
      title: 'Saved!',
      subtitle: 'Your changes have been saved.',
    });
  };
  return (
    <Button variant="primary" size="lg" onClick={handleClick}>
      Hello world!
    </Button>
  );
}
