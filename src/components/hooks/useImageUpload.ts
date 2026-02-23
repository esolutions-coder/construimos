import { useState, useRef } from "react";
import { useMutation } from "@apollo/client";
import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
import {GET_UPLOAD_URL} from "../../api/images/images.mutation"

const MAX_SIZE_MB = 5;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function useImageUpload(){
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const xhrRef = useRef<XMLHttpRequest | null>(null);

  const [getUploadUrl] = useMutation(GET_UPLOAD_URL);

  const validateFile = (file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      throw new Error("Formato no permitido (solo JPG, PNG, WEBP)");
    }

    if (file.size / 1024 / 1024 > MAX_SIZE_MB) {
      throw new Error(`La imagen supera ${MAX_SIZE_MB}MB`);
    }
  };

  const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    return await imageCompression(file, options);
  };

  const uploadImage = async (file: File, folder = "images") => {
    try {
      setError(null);
      setProgress(0);
      setIsUploading(true);

      validateFile(file);

      // 1️⃣ Comprimir
      const compressedFile = await compressImage(file);

      // 2️⃣ Generar nombre único
      const extension = compressedFile.name.split(".").pop();
      const uniqueName = `${folder}/${uuidv4()}.${extension}`;

      // 3️⃣ Pedir signed URL
      const { data } = await getUploadUrl({
        variables: {
          filename: uniqueName,
          filetype: compressedFile.type,
        },
      });

      const signedUrl = data.getUploadUrl;
      // 4️⃣ Subida con progreso + cancelación
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhrRef.current = xhr;

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = (event.loaded / event.total) * 100;
            setProgress(Math.round(percent));
          }
        };

        xhr.onload = () => resolve();
        xhr.onerror = () => reject(new Error("Error subiendo imagen"));
        xhr.onabort = () => reject(new Error("Subida cancelada"));

        xhr.open("PUT", signedUrl);
        xhr.setRequestHeader("Content-Type", compressedFile.type);
        xhr.send(compressedFile);
      });

      const publicUrl = signedUrl.split("?")[0];

      setIsUploading(false);
      return publicUrl;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Error desconocido";
      setError(errorMessage);
      setIsUploading(false);
      throw err;
    }
  };

  const cancelUpload = () => {
    if (xhrRef.current) {
      xhrRef.current.abort();
      setIsUploading(false);
    }
  };

  return {
    uploadImage,
    cancelUpload,
    progress,
    error,
    isUploading,
  };
};