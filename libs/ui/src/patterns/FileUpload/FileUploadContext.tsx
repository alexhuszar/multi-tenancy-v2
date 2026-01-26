import React from 'react';
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone';

export type FileUploadError = {
  code: string;
  message: string;
};

type FileUploadContextValue = {
  getRootProps: <T extends DropzoneRootProps>(props?: T) => T;
  getInputProps: <T extends DropzoneInputProps>(props?: T) => T;
  isDragActive: boolean;
  errors: FileUploadError[];
  setErrors: React.Dispatch<React.SetStateAction<FileUploadError[]>>;
  clearErrors: () => void;
};

export const FileUploadContext =
  React.createContext<FileUploadContextValue | null>(null);

export const useFileUploadContext = () => {
  const ctx = React.useContext(FileUploadContext);
  if (!ctx) {
    throw new Error(
      'FileUpload components must be used within <FileUploadRoot />',
    );
  }
  return ctx;
};
