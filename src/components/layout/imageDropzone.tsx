import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import useImageUpload from "../hooks/useImageUpload";


export default function ImageDropzone({ folder = "images", onUploadComplete }: { folder?: string; onUploadComplete?: (url: string) => void }){
  const {
    uploadImage,
    progress,
    error,
    isUploading,
    cancelUpload,
  } = useImageUpload();

  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(async (acceptedFiles: any) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Preview
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    try {
      const uploadedUrl = await uploadImage(file, folder);
      
      if (onUploadComplete) {
        onUploadComplete(uploadedUrl);
      }
    } catch (err) {
      console.error(err);
    }
  }, [uploadImage, folder, onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
  });

  return (
    <div className="w-full max-w-md mx-auto">
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition
          ${isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}
        `}
      >
        <input {...getInputProps()} />

        {preview ? (
          <img
            src={preview}
            alt="preview"
            className="mx-auto max-h-60 rounded-lg object-contain"
          />
        ) : (
          <p className="text-gray-500">
            Arrastra una imagen aquí o haz click para seleccionar
          </p>
        )}
      </div>

      {isUploading && (
        <div className="mt-4">
          <div className="h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-blue-500 rounded transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-1">
            Subiendo... {progress}%
          </p>
          <button
            onClick={cancelUpload}
            className="text-red-500 text-sm mt-2"
          >
            Cancelar
          </button>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-sm mt-2">
          {error}
        </p>
      )}
    </div>
  );
};