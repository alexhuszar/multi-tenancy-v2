'use client';

import { useState } from 'react';
import { FolderPlus } from 'lucide-react';
import { Button } from './Button';
import { Dialog } from './Dialog';
import { cn } from '@multi-tenancy/design-system';
import { CreateFolderForm } from '../core/folder/CreateFolderForm';

interface Props {
  accountId: string;
  className?: string;
}

const getButtonContentStyles = ({ className }: { className?: string }) =>
  cn('[&>span]:flex [&>span]:items-center [&>span]:gap-3', className);

export const FolderButton = ({ accountId, className }: Props) => {
  const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsFolderDialogOpen(true)}
        variant="primary"
        disabled={isFolderDialogOpen}
        className={getButtonContentStyles({ className })}
      >
        <FolderPlus size={18} /> Create Folder
      </Button>

      <Dialog
        open={isFolderDialogOpen}
        onOpenChange={setIsFolderDialogOpen}
        title="Create folder"
        id="create-folder-dialog"
      >
        <CreateFolderForm accountId={accountId} />
      </Dialog>
    </>
  );
};
