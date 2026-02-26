# FileUpload

Drag-and-drop file upload with visual feedback, error display, and a composable sub-component API. Built on react-dropzone.

## Import

```tsx
// Composite (recommended for most cases)
import { FileUpload } from '@multi-tenancy/ui';

// Individual sub-components for custom layouts
import {
  FileUploadRoot,
  FileUploadDropzone,
  DropzoneSurface,
  FileUploadErrors,
} from '@multi-tenancy/ui';
```

---

## `FileUpload` (composite)

Single-component API that wires everything together automatically.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onFilesAdded` | `(files: File[]) => void` | — | **Required.** Called with accepted files after drop or browse |
| `children` | `ReactNode` | — | **Required.** Content rendered inside the drop zone (instructions, button, preview, …) |
| `className` | `string` | — | **Required.** CSS class for the dropzone surface |
| `activeClassName` | `string` | — | **Required.** CSS class applied to the surface while dragging |
| `errorClassName` | `string` | — | **Required.** CSS class for the error list container |
| `multiple` | `boolean` | `true` | Allow multiple files at once |
| `disabled` | `boolean` | `false` | Disables the drop zone |

### Usage

```tsx
import { FileUpload } from '@multi-tenancy/ui';

function Uploader() {
  const handleFiles = (files: File[]) => {
    console.log('Dropped:', files);
  };

  return (
    <FileUpload
      onFilesAdded={handleFiles}
      className="dropzone"
      activeClassName="dropzone--active"
      errorClassName="dropzone-errors"
    >
      <p>Drag files here or <button type="button">browse</button></p>
    </FileUpload>
  );
}
```

### Single-file upload

```tsx
<FileUpload
  multiple={false}
  onFilesAdded={([file]) => uploadFile(file)}
  className="dropzone"
  activeClassName="dropzone--active"
  errorClassName="dropzone-errors"
>
  <p>Drop a PDF here</p>
</FileUpload>
```

---

## Sub-components

Use these when you need full control over the layout.

### `FileUploadRoot`

Context provider. Must wrap all other FileUpload sub-components.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `onFilesAdded` | `(files: File[]) => void` | — | **Required.** Callback with accepted files |
| `children` | `ReactNode` | — | **Required.** Sub-components |
| `multiple` | `boolean` | `true` | Allow multiple files |
| `disabled` | `boolean` | `false` | Disable file picking |

### `FileUploadDropzone`

Applies react-dropzone handlers to its child div.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | **Required.** Content |
| `className` | `string` | — | CSS class for the dropzone div |

### `DropzoneSurface`

Visual feedback wrapper. Applies `activeClassName` while a drag is in progress.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | **Required.** Content |
| `className` | `string` | — | **Required.** Base CSS class |
| `activeClassName` | `string` | — | **Required.** CSS class added while dragging |
| `active` | `boolean` | — | Whether dragging is in progress (provided automatically when used inside `FileUploadRoot`) |

### `FileUploadErrors`

Displays dropzone validation errors.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | — | **Required.** CSS class for the error list |
| `children` | `(errors: FileUploadError[]) => ReactNode` | — | Custom error renderer; receives array of `{ code, message }` |

Renders `null` when there are no errors. Default output is a `<ul role="alert" aria-live="polite">`.

### Custom layout example

```tsx
import {
  FileUploadRoot,
  FileUploadDropzone,
  DropzoneSurface,
  FileUploadErrors,
} from '@multi-tenancy/ui';

function CustomUploader() {
  return (
    <FileUploadRoot onFilesAdded={handleFiles} multiple={false}>
      <FileUploadDropzone className="zone-wrapper">
        <DropzoneSurface className="surface" activeClassName="surface--active">
          <p>Drop your file here</p>
        </DropzoneSurface>
      </FileUploadDropzone>

      <FileUploadErrors className="errors">
        {(errors) =>
          errors.map((e) => (
            <p key={e.code} role="alert">
              {e.message}
            </p>
          ))
        }
      </FileUploadErrors>
    </FileUploadRoot>
  );
}
```
