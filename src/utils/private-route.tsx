import Loader from "@components/ui/loaders/spinner/spinner";
import { useRouter } from "next/router";
import { BackArrowRound } from "@components/icons/back-arrow-round";
import { useUserAuth } from "@contexts/user.context";
import LoginView from "@components/auth/login-form";
import { useEffect } from "react";

const PrivateRoute = ({ children }: any) => {
  const router = useRouter();
  const { isAuthorized } = useUserAuth();

  useEffect(() => {
    if (!isAuthorized) {
      router.push("/");
    }
  }, []);

  // if (isAuthorized) {
  //   return <>{children}</>;
  // }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <Loader showText={false} />;
};

export default PrivateRoute;
