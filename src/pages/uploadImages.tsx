import { useMutation } from "@apollo/client";
import ImageDropzone from "../components/layout/imageDropzone";
import { GET_UPLOAD_URL, UPDATE_USER_AVATAR } from "../api/images/images.mutation";
import { useAuth } from "../customHooks/auth/useAuth";

export default function UploadImages() {
  const [updateUserAvatar] = useMutation(UPDATE_USER_AVATAR);
  const { user } = useAuth();

  const handleUploadComplete = async (url: string) => {
    // 2️⃣ Guardamos la URL final en la BD
    await updateUserAvatar({
      variables: { avatar: url, id: user?._id || "ASD"},
    });
    console.log("Avatar actualizado:", url);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Subir Imágenes</h1>
      <ImageDropzone folder="users/avatars" onUploadComplete={handleUploadComplete} />
    </div>
  );
}
