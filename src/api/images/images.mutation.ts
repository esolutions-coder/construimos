import { gql } from "@apollo/client";

export const GET_UPLOAD_URL = gql`mutation GetUploadUrl($filename: String!, $filetype: String!) {
  getUploadUrl(filename: $filename, filetype: $filetype)
}`

// 1️⃣ Definir mutation para actualizar avatar en la BD
export const UPDATE_USER_AVATAR = gql`
  mutation UpdateAvatar($id: ID!, $avatar: String!) {
  updateAvatar(_id: $id, avatar: $avatar) {
    code
    message
    user {
      image
      _id
    }
    success
  }
}
`;