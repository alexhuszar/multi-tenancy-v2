import { useFileUploadError } from '../../hooks/useFileUpload';
import { FileUploadError } from './FileUploadContext';

type FileUploadErrorsPropsProps = {
  children?: (errors: FileUploadError[]) => React.ReactNode;
  className: string;
};

export const FileUploadErrors = ({
  children,
  className,
}: FileUploadErrorsPropsProps) => {
  const { errors } = useFileUploadError();

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
