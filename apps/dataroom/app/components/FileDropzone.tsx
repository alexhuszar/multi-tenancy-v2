import { FileUpload, FileUploadProps } from "@multi-tenancy/design-system"


export const FileDropzone = (props: {accountId: string}) => {
    return <FileUpload {...props} errorClassName="border-red-500" />
}