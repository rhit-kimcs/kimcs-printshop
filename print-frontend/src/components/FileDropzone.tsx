import { FileText } from "lucide-react";
import Dropzone, { type DropzoneState } from "shadcn-dropzone";

export function FileDropzone() {
  return (
    <Dropzone
      onDrop={(acceptedFiles: File[]) => {
        // Do something with the files
      }}
      dropZoneClassName="border-2 border-dashed border-gray-300 rounded-md p-4 flex items-center justify-center cursor-pointer"
    >
      {(dropzone: DropzoneState) => (
        <>
          {dropzone.acceptedFiles.length > 0 ? (
            <div className="text-sm text-gray-500">
              <FileText />
              {dropzone.acceptedFiles.length} file
              {dropzone.acceptedFiles.length > 1 ? "s" : ""} uploaded
            </div>
          ) : dropzone.isDragActive ? (
            <div className="text-sm font-medium min-h-25 flex items-center justify-center">
              Drop your files here!
            </div>
          ) : (
            <div className="flex items-center justify-center flex-col gap-1.5 min-h-25">
              <div className="flex items-center flex-row gap-0.5 text-sm font-medium ">
                Upload files
              </div>
            </div>
          )}
        </>
      )}
    </Dropzone>
  );
}
