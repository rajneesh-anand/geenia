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

interface LoginFormProps {
  isPopup?: boolean;
  className?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ isPopup = true, className }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { closeModal, openModal } = useModalAction();
  const [remember, setRemember] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [number, setNumber] = useState<string | undefined>("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [result, setResult] = useState<string | any>("");
  const { setUpRecaptha, mobileAuth, logIn, error, setError } = useUserAuth();

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

  function onSubmit({ email, password }: LoginInputType) {
    logIn(email, password);
    if (!error) {
      setError(null);
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
            // layout="fill"
            width={800}
            height={600}
            objectFit="contain"
            className="w-full"
          />
        </div>
        <div className="w-full md:w-[45%] xl:w-[40%] py-6 sm:py-10 px-4 sm:px-8 xl:px-12 rounded-md shadow-dropDown flex flex-col justify-center">
          <div className="text-center mb-6 ">
            <div onClick={closeModal}>
              <Logo />
            </div>

            {showLoginForm && (
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
            )}
          </div>
          {showLoginForm ? (
            <>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col justify-center"
              >
                <div className="flex flex-col space-y-3.5">
                  <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email address"
                    variant="outline"
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
                    variant="outline"
                    placeholder="Enter your password"
                    error={errors.password?.message}
                    {...register("password", {
                      required: "Password is mandatory !",
                    })}
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

              {error && (
                <Alert
                  message={error}
                  variant="error"
                  closeable={true}
                  className="mt-5"
                  onClose={() => setError(null)}
                />
              )}
            </>
          ) : flag ? (
            <form onSubmit={verifyOtp} className="flex flex-col justify-center">
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="\d{6}"
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <div className="relative">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center w-full font-nunito px-4 py-2 mt-3  text-base font-medium leading-6 text-white whitespace-no-wrap bg-skin-primary rounded-sm shadow-sm focus:outline-none hover:bg-opacity-90"
                >
                  Verify OTP
                </button>
              </div>
            </form>
          ) : (
            <>
              <form onSubmit={getOtp} className="flex flex-col justify-center">
                <PhoneInput
                  defaultCountry="IN"
                  value={number}
                  onChange={setNumber}
                  placeholder="Enter Mobile Number"
                  className="font-nunito"
                  required
                />
                <div id="recaptcha-container"></div>

                <div className="relative">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full font-poppins uppercase text-[12px] px-4 py-2 mt-3 text-base font-medium leading-6 text-white whitespace-no-wrap bg-skin-primary rounded-sm shadow-sm focus:outline-none  hover:bg-opacity-90"
                  >
                    Login with Mobile Number
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowLoginForm((current) => !current)}
                    className="inline-flex items-center justify-center w-full font-poppins uppercase text-[12px] px-4 py-2 mt-3 text-base font-medium leading-6 text-white whitespace-no-wrap bg-skin-primary rounded-sm shadow-sm focus:outline-none  hover:bg-opacity-90"
                  >
                    Login with Email/Password
                  </button>
                </div>
              </form>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
