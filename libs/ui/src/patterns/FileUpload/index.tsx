import { FileUploadDropzone } from './FileDropzone';
import { DropzoneSurface, DropzoneSurfaceProps } from './FileDropzoneSurface';
import { FileUploadRoot, FileUploadRootProps } from './FileUploadRoot';
import { useFileUploadState } from '../../hooks/useFileUpload';
import { FileDropError } from './FileDropError';

export type FileUploadProps = FileUploadRootProps &
  Omit<DropzoneSurfaceProps, 'active'> & {
    errorClassName: string;
  };

const DropZoneSurfaceWrap = ({
  activeClassName,
  className,
  children,
}: DropzoneSurfaceProps) => {
  const { isDragActive } = useFileUploadState();
  return (
    <DropzoneSurface
      active={isDragActive}
      activeClassName={activeClassName}
      className={className}
    >
      {children}
    </DropzoneSurface>
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
      <FileUploadDropzone>
        <DropZoneSurfaceWrap
          className={className}
          activeClassName={activeClassName}
        >
          {children}
        </DropZoneSurfaceWrap>
      </FileUploadDropzone>

      <FileDropError className={errorClassName} />
    </FileUploadRoot>
  );
};
