import { useFileDropError } from '../../hooks/useFileUpload';
import { FileUploadError } from './FileUploadContext';

type FileDropErrorProps = {
  children?: (errors: FileUploadError[]) => React.ReactNode;
  className: string;
};

export const FileDropError = ({ children, className }: FileDropErrorProps) => {
  const { errors } = useFileDropError();

  if (errors.length === 0) return null;

  if (children) {
    return <>{children(errors)}</>;
  }

  return (
    <ul role="alert" aria-live="polite" className={className}>
      {errors.map((error, index) => (
        <li key={`${error.code}-${index}`}>{error.message}</li>
      ))}
    </ul>
  );
};
