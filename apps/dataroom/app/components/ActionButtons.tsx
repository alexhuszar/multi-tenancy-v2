'use client';

import { useState, useRef } from 'react';
import { FolderPlus, Upload } from 'lucide-react';
import { useParams, usePathname } from 'next/navigation';
import { Button } from './Button';
import { twMerge } from 'tailwind-merge';
import { cn } from '@multi-tenancy/design-system';
// import { CreateFolderDialog } from "@/components/CreateFolderDialog";
// import { FileUploader, FileUploaderHandle } from "@/components/FileUploader";
// import { navItems } from "@/lib/utils/constants";

interface Props {
  accountId: string;
  className?: string;
}

const getButtonStyles = () =>
  cn('bg-brand/10 text-brand flex items-center gap-3');

export const ActionButtons = ({ accountId, className }: Props) => {
  const params = useParams();
  // const path = usePathname();
  const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false);
  // const fileUploaderRef = useRef<FileUploaderHandle>(null);

  const currentFolderId = (params?.id as string) || null;

  const handleUploadClick = () => {
    // fileUploaderRef.current?.openFilePicker();
  };

  // const boardRoute = path === navItems[0].url;

  // if (!boardRoute) return null;

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

      {/* <FileUploader
        ref={fileUploaderRef}
        ownerId={ownerId}
        accountId={accountId}
        currentFolderId={currentFolderId}
      />

      <CreateFolderDialog
        open={isFolderDialogOpen}
        onOpenChange={setIsFolderDialogOpen}
      /> */}
    </>
  );
};
