import { FileUploadDropzone } from './FileDropzone';
import { DropzoneSurface, DropzoneSurfaceProps } from './FileDropzoneSurface';
import { FileUploadRoot, FileUploadRootProps } from './FileUploadRoot';
import { useFileUploadState } from '../../hooks/useFileUpload';
import { FileUploadErrors } from './FileUploadErrors';

export type FileUploadProps = FileUploadRootProps &
  Omit<DropzoneSurfaceProps, 'active'> & {
    errorClassName: string;
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
  const { isDragActive } = useFileUploadState();

  return (
    <FileUploadRoot
      onFilesAdded={onFilesAdded}
      disabled={disabled}
      multiple={multiple}
    >
      <FileUploadDropzone>
        <DropzoneSurface
          active={isDragActive}
          activeClassName={activeClassName}
          className={className}
        >
          {children}
        </DropzoneSurface>
      </FileUploadDropzone>

      <FileUploadErrors className={errorClassName} />
    </FileUploadRoot>
  );
};
