import React from 'react';
import { FileUploadContext, FileUploadError } from './FileUploadContext';
import { useDropzone } from 'react-dropzone';

export type FileUploadRootProps = {
  onFilesAdded: (files: File[]) => void;
  multiple?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
};

export const FileUploadRoot = ({
  onFilesAdded,
  multiple = true,
  disabled = false,
  children,
}: FileUploadRootProps) => {
  const [errors, setErrors] = React.useState<FileUploadError[]>([]);

  const onDrop = React.useCallback(
    (files: File[]) => {
      setErrors([]);
      if (!disabled) onFilesAdded(files);
    },
    [onFilesAdded, disabled],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    disabled,
  });

  const value = React.useMemo(
    () => ({
      getRootProps,
      getInputProps,
      isDragActive,
      errors,
      setErrors,
      clearErrors: () => setErrors([]),
    }),
    [getRootProps, getInputProps, isDragActive, errors],
  );
  return (
    <FileUploadContext.Provider value={value}>
      {children}
    </FileUploadContext.Provider>
  );
};
