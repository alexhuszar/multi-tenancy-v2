import React from 'react';
import {
  FileUploadError,
  useFileUploadContext,
} from '../patterns/FileUpload/FileUploadContext';

export function useFileUploadState() {
  const { isDragActive } = useFileUploadContext();
  return { isDragActive };
}

export function useFileUploadErrors() {
  const { errors, setErrors, clearErrors } = useFileUploadContext();

  const addError = React.useCallback(
    (error: FileUploadError) => {
      setErrors((prev) => [...prev, error]);
    },
    [setErrors],
  );

  return {
    errors,
    addError,
    clearErrors,
    hasErrors: errors.length > 0,
  };
}
