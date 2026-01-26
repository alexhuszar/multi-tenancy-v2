import { useFileUploadContext } from './FileUploadContext';

type FileUploadDropzoneProps = {
  children: React.ReactNode;
  className?: string;
};

export const FileUploadDropzone = ({
  children,
  className,
}: FileUploadDropzoneProps) => {
  const { getRootProps, getInputProps } = useFileUploadContext();

  return (
    <div {...getRootProps({ className })}>
      <input {...getInputProps()} />
      {children}
    </div>
  );
};
