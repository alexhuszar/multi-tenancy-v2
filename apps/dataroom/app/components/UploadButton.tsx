'use client';

import { Upload } from 'lucide-react';
import { Button } from './Button';
import { cn, FileUpload } from '@multi-tenancy/design-system';

interface Props {
  accountId: string;
  className?: string;
}

const getButtonStyles = ({ className }: { className?: string }) =>
  cn('[&>span]:flex [&>span]:items-center [&>span]:gap-3', className);

export const UploadButton = ({ accountId, className }: Props) => {
  const handleUploadClick = (files: File[]) => {
    console.log(files);
    // Implement file upload logic here, e.g., open file dialog or navigate to upload page
  };

  return (
    <FileUpload
      errorClassName="border-red-500"
      onFilesAdded={handleUploadClick}
      activeClassName="border"
      className="flex"
    >
      <Button variant="primary" className={getButtonStyles({ className })}>
        <Upload size={18} /> Upload File
      </Button>
    </FileUpload>
  );
};
