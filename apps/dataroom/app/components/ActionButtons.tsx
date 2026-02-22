'use client';

import { useState } from 'react';
import { FolderPlus, Upload } from 'lucide-react';
import { useParams } from 'next/navigation';
import { Button } from './Button';
import { cn } from '@multi-tenancy/design-system';

interface Props {
  accountId: string;
  className?: string;
}

const getButtonStyles = () =>
  cn('bg-brand/10 text-brand flex items-center gap-3');

export const ActionButtons = ({ accountId, className }: Props) => {
  const params = useParams();
  const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false);

  const currentFolderId = (params?.id as string) || null;

  const handleUploadClick = () => {};

  return (
    <>
      <div className={`flex ${className} items-center justify-end gap-3`}>
        <Button
          onClick={handleUploadClick}
          className={getButtonStyles()}
          variant="outline"
        >
          <Upload size={18} />
          <span>Upload File</span>
        </Button>

        <Button
          onClick={() => setIsFolderDialogOpen(true)}
          className={getButtonStyles()}
          variant="outline"
        >
          <FolderPlus size={18} />
          <span>Create Folder</span>
        </Button>
      </div>
    </>
  );
};
