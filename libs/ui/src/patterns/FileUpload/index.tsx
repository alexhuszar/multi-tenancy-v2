import { FileUploadDropzone } from './FileDropzone';
import { DropzoneSurface, DropzoneSurfaceProps } from './FileDropzoneSurface';
import { FileUploadRoot, FileUploadRootProps } from './FileUploadRoot';
import { useFileUploadState } from '../../hooks/useFileUpload';
import { FileUploadError } from './FileUploadError';

type FileUploadInnerProps = Omit<DropzoneSurfaceProps, 'active'> & {
  errorClassName: string;
};

export type FileUploadProps = FileUploadRootProps & FileUploadInnerProps;

const FileUploadInner = ({
  activeClassName,
  errorClassName,
  className,
  children,
}: FileUploadInnerProps) => {
  const { isDragActive } = useFileUploadState();
  return (
    <FileUploadDropzone>
      <DropzoneSurface
        active={isDragActive}
        activeClassName={activeClassName}
        className={className}
      >
        {children}
      </DropzoneSurface>

      <FileUploadError className={errorClassName} />
    </FileUploadDropzone>
  );
};

export const FileUpload = ({
  onFilesAdded,
  children,
  className,
  multiple,
  disabled,
  activeClassName,
  errorClassName,
}: FileUploadProps) => {
  return (
    <FileUploadRoot
      onFilesAdded={onFilesAdded}
      disabled={disabled}
      multiple={multiple}
    >
      <FileUploadInner
        className={className}
        activeClassName={activeClassName}
        errorClassName={errorClassName}
      >
        {children}
      </FileUploadInner>
    </FileUploadRoot>
  );
};
