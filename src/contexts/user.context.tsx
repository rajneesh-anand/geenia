import React, { createContext, useContext, useEffect, useReducer } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@utils/firebase";
import { useLocalStorage } from "@utils/use-local-storage";
import { decryptData, encryptData } from "@utils/crypt";

export type User = {
  name?: string;
  email?: string;
  mobile?: string;
  image?: string;
};

export type State = {
  user: User;
  isAuthorized: boolean;
  loginSuccess?: boolean;
  error?: string | null;
  logIn?: (email: string, password: string) => void;
  signUp?: (email: string, password: string) => void;
  logOut?: () => void;
  googleSignIn?: () => void;
  setUpRecaptha?: (number: string) => void;
};

export const initialState = {
  isAuthorized: false,
  loginSuccess: false,
  error: null,
  user: {},
};

type Props = {
  children?: React.ReactNode;
};

type Action =
  | { type: "USER_LOGIN_MOBILE"; number: string }
  | { type: "USER_LOGOUT" }
  | { type: "USER_LOGIN_GMAIL" }
  | { type: "USER_LOGIN_EMAIL" }
  | { type: "EMAIL_LOGIN_SUCCESS"; email: string }
  | { type: "EMAIL_LOGIN_FAILED"; error: string }
  | { type: "EMAIL_REGISTER_SUCCESS"; email: string }
  | { type: "EMAIL_REGISTER_FAILED"; error: string }
  | { type: "SET_ERROR"; error: string | null }
  | { type: "RESET_PASSWORD_SUCCESS"; email: string }
  | { type: "RESET_PASSWORD_FAILED"; error: string };

export const userAuthContext = createContext<State | any>(initialState);

const userReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "USER_LOGIN_MOBILE": {
      return {
        ...state,
        user: { mobile: action.number },
        isAuthorized: true,
      };
    }

    case "EMAIL_LOGIN_SUCCESS": {
      return {
        ...state,
        user: { email: action.email },
        isAuthorized: true,
      };
    }
    case "EMAIL_LOGIN_FAILED": {
      return {
        ...state,
        user: {},
        isAuthorized: false,
        loginSuccess: false,
        error: action.error,
      };
    }

    case "EMAIL_REGISTER_SUCCESS": {
      return {
        ...state,
        user: { email: action.email },
        loginSuccess: true,
      };
    }

    case "EMAIL_REGISTER_FAILED": {
      return {
        ...state,
        user: {},
        isAuthorized: false,
        loginSuccess: false,
        error: action.error,
      };
    }

    case "USER_LOGOUT": {
      return {
        user: {},
        isAuthorized: false,
        loginSuccess: false,
      };
    }

    case "SET_ERROR": {
      return {
        ...state,
        error: action.error,
      };
    }

    case "RESET_PASSWORD_SUCCESS": {
      return {
        ...state,
        user: { email: action.email },
        error: null,
      };
    }

    case "RESET_PASSWORD_FAILED": {
      return {
        ...state,
        error: action.error,
      };
    }

    default:
      return state;
  }
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const salt = "6d090796-ecdf-11ea-adc1-0242ac112345";
  const encryptedData = encryptData(initialState, salt);

  const [savedUser, saveUser] = useLocalStorage(
    "user",
    JSON.stringify(encryptedData)
  );
  const [state, dispatch] = useReducer(
    userReducer,
    decryptData(savedUser!, salt)
  );

  const setError = (msg: string | null) =>
    dispatch({ type: "SET_ERROR", error: msg });

  const mobileAuth = (mobile: string) =>
    dispatch({ type: "USER_LOGIN_MOBILE", number: mobile });

  function logIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        dispatch({ type: "EMAIL_LOGIN_SUCCESS", email: email });
      })
      .catch((err) => {
        console.log(err.message);
        dispatch({ type: "EMAIL_LOGIN_FAILED", error: err.message });
      });
  }
  function signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        sendEmailVerification(auth.currentUser!)
          .then(() => {
            dispatch({ type: "EMAIL_REGISTER_SUCCESS", email: email });
          })
          .catch((err) => alert(err.message));
      })
      .catch((err) =>
        dispatch({ type: "EMAIL_REGISTER_FAILED", error: err.message })
      );
  }

  function resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email)
      .then(() => {
        dispatch({ type: "RESET_PASSWORD_SUCCESS", email: email });
      })
      .catch((err) => {
        console.log(err.message);
        dispatch({ type: "RESET_PASSWORD_FAILED", error: err.message });
      });
  }
  function logOut() {
    dispatch({ type: "USER_LOGOUT" });
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  function setUpRecaptha(number: any) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      { size: "invisible" },
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

  useEffect(() => {
    saveUser(JSON.stringify(encryptedData));
  }, [state, saveUser]);

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (currentuser: any) => {
  //     console.log("Auth", currentuser);
  //     initialState.mobileUser = currentuser;
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);

  return (
    <userAuthContext.Provider
      value={{
        ...state,
        mobileAuth,
        logIn,
        signUp,
        logOut,
        googleSignIn,
        setUpRecaptha,
        resetPassword,
        setError,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
};

export function useUserAuth() {
  return useContext(userAuthContext);
}
