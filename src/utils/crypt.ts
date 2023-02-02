import CryptoJS from "crypto-js";

export type User = {
  name?: string;
  email?: string;
  mobile?: string;
  image?: string;
};

export type State = {
  user: User;
  isAuthorized: boolean;
  logIn?: (email: string, password: string) => void;
  signUp?: (email: string, password: string) => void;
  logOut?: () => void;
  googleSignIn?: () => void;
  setUpRecaptha?: (number: string) => void;
};

export const encryptData = (data: State, salt: string) =>
  CryptoJS.AES.encrypt(JSON.stringify(data), salt).toString();

export const decryptData = (ciphertext: string, salt: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, salt);
  try {
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (err) {
    return null;
  }
};
