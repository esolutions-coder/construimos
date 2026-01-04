export default function getToken() {
  let token = undefined;
  const getUserData = localStorage.getItem("construimos") as string;
  const parsedData = JSON.parse(getUserData);
  if (parsedData) {
    token = parsedData.token;
  }
  return token;
}
