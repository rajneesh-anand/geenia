import { useState, useEffect } from "react";
import Input from "@components/ui/form/input";
import PasswordInput from "@components/ui/form/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import { useLoginMutation, LoginInputType } from "@framework/auth/use-login";
import Logo from "@components/ui/logo";
import { useTranslation } from "next-i18next";
import Image from "@components/ui/image";
import { useModalAction } from "@components/common/modal/modal.context";
import Switch from "@components/ui/switch";
import CloseButton from "@components/ui/close-button";
import { FaFacebook, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import cn from "classnames";
import PhoneInput from "@components/ui/phone-input";
import { useUserAuth } from "@contexts/user.context";
import Alert from "@components/ui/alert";
import Link from "@components/ui/link";
import { ROUTES } from "@utils/routes";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

interface LoginFormProps {
  isPopup?: boolean;
  className?: string;
  csrfToken: any;
}

const LoginForm: React.FC<LoginFormProps> = ({
  isPopup = true,
  className,
  csrfToken,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { closeModal, openModal } = useModalAction();
  const [remember, setRemember] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [number, setNumber] = useState<string | undefined>("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState<string | any>("");
  const { setUpRecaptha, mobileAuth, logIn, loginSuccess, error, setError } =
    useUserAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputType>();

  function handleNavigate(path: string) {
    router.push(`/${path}`);
    closeModal();
  }

  const getOtp = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    if (number === "" || number === undefined)
      return setError("Please enter a valid phone number!");
    try {
      const response = await setUpRecaptha(number);
      setResult(response);
      setFlag(true);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const verifyOtp = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    if (otp === "" || otp === null) return;
    try {
      await result.confirm(otp);
      mobileAuth(number);
      closeModal();
    } catch (err: any) {
      setError(err.message);
    }
  };

  async function onSubmit({ email, password }: LoginInputType) {
    const result = await signIn<"credentials">("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    if (result?.error) {
      setError(result?.error);
    } else {
      loginSuccess();
      closeModal();
    }
  }

  function handleSignUp() {
    return openModal("SIGN_UP_VIEW");
  }
  function handleForgetPassword() {
    return openModal("FORGET_PASSWORD");
  }
  return (
    <div
      className={cn(
        "w-full lg:w-[920px] xl:w-[1000px] 2xl:w-[1200px] relative",
        className
      )}
    >
      {isPopup === true && <CloseButton onClick={closeModal} />}

      <div className="flex bg-skin-fill mx-auto rounded-lg overflow-hidden">
        <div className="md:w-[55%] xl:w-[60%] registration hidden relative md:block">
          <Image
            src="/images/login.png"
            alt="signin Image"
            layout="fill"
            // width={800}
            // height={600}
            // objectFit="contain"
            className="w-full"
          />
        </div>
        <div className="w-full md:w-[45%] xl:w-[40%] py-6 sm:py-10 px-4 sm:px-8 xl:px-12 rounded-md shadow-dropDown flex flex-col justify-center">
          <div className="text-center mb-6 ">
            <div onClick={closeModal}>
              <Logo />
            </div>

            <div className="text-sm sm:text-15px text-body text-center mt-3 mb-1">
              {t("common:text-don’t-have-account")}{" "}
              <button
                type="button"
                className="text-skin-primary sm:text-15px text-sm ml-1  font-semibold hover:no-underline focus:outline-none"
                onClick={handleSignUp}
              >
                {t("common:text-create-account")}
              </button>
            </div>
          </div>

          <button
            onClick={() => signIn("google")}
            aria-label="Continue with google"
            role="button"
            className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 p-3 border rounded-lg border-gray-700 flex items-center w-full  hover:bg-gray-100"
          >
            <svg
              width={19}
              height={20}
              viewBox="0 0 19 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z"
                fill="#4285F4"
              />
              <path
                d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z"
                fill="#34A853"
              />
              <path
                d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z"
                fill="#FBBC05"
              />
              <path
                d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z"
                fill="#EB4335"
              />
            </svg>
            <p className="text-base font-medium ml-4 text-gray-700">
              Continue with Google
            </p>
          </button>
          <button
            onClick={() => signIn("facebook")}
            aria-label="Continue with github"
            role="button"
            className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 p-3 border rounded-lg border-gray-700 flex items-center w-full mt-4 hover:bg-gray-100"
          >
            <svg
              width={28}
              height={28}
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 30.627 15.416 C 30.627 7.398 24.015 0.899 15.862 0.899 C 7.702 0.9 1.092 7.398 1.092 15.417 C 1.092 22.661 6.493 28.666 13.55 29.757 L 13.55 19.611 L 9.805 19.611 L 9.805 15.417 L 13.552 15.417 L 13.552 12.217 C 13.552 8.579 15.759 6.571 19.132 6.571 C 20.748 6.571 22.437 6.854 22.437 6.854 L 22.437 10.424 L 20.576 10.424 C 18.743 10.424 18.17 11.545 18.17 12.695 L 18.17 15.416 L 22.263 15.416 L 21.609 19.61 L 18.169 19.61 L 18.169 29.756 C 25.225 28.665 30.627 22.66 30.627 15.416 Z"
                id="mainIconPathAttribute"
                fill="#3b5998"
              ></path>
            </svg>

            <p className="text-[#3b5998] font-medium ml-4 ">
              Continue with Facebook
            </p>
          </button>

          <div className="w-full flex items-center justify-between py-3">
            <hr className="w-full bg-gray-400" />
            <p className="text-base font-medium leading-4 px-2.5 text-gray-500">
              OR
            </p>
            <hr className="w-full bg-gray-400" />
          </div>

          {error && (
            <Alert
              message={error}
              variant="error"
              closeable={true}
              className="my-2"
              onClose={() => setError(null)}
            />
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center"
          >
            <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
            <div className="flex flex-col space-y-3.5">
              <Input
                label="Email"
                type="email"
                {...register("email", {
                  required: "Email address is mandatory !",
                  pattern: {
                    value:
                      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: t("forms:email-error"),
                  },
                })}
                error={errors.email?.message}
              />
              <PasswordInput
                label="Password"
                {...register("password", {
                  required: "Password is mandatory !",
                })}
                error={errors.password?.message}
              />

              <div className="relative">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full font-nunito px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-skin-primary rounded-sm shadow-sm focus:outline-none hover:bg-opacity-90"
                >
                  {t("common:text-sign-in")}
                </button>
              </div>
            </div>
          </form>
          <div className="text-center mt-2">
            <button
              className="text-teal-900 font-nunito text-[15px]"
              type="button"
              onClick={handleForgetPassword}
            >
              Forgot your password ?
            </button>
          </div>

          <div className="mb-16 md:mb-3">
            <p className="mt-4 mb-7 px-2 text-center text-sm leading-relaxed text-body sm:mt-5 sm:mb-10 sm:px-0 md:text-base">
              {t("registration-helper")}
              <span
                onClick={() => handleNavigate("terms")}
                className="mx-1 cursor-pointer text-skin-primary underline hover:no-underline"
              >
                {t("text-terms")}
              </span>
              &amp;
              <span
                onClick={() => handleNavigate("privacy")}
                className="cursor-pointer text-skin-primary underline hover:no-underline ltr:ml-1 rtl:mr-1"
              >
                {t("text-policy")}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
