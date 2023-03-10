import { useState } from "react";
import Input from "@components/ui/form/input";
import PasswordInput from "@components/ui/form/password-input";
import Button from "@components/ui/button";
import { useForm } from "react-hook-form";
import Logo from "@components/ui/logo";
import Alert from "@components/ui/alert";
import { useSignUpMutation, SignUpInputType } from "@framework/auth/use-signup";
import Link from "@components/ui/link";
import { useTranslation } from "next-i18next";
import Image from "@components/ui/image";
import { useModalAction } from "@components/common/modal/modal.context";
import Switch from "@components/ui/switch";
import CloseButton from "@components/ui/close-button";
import cn from "classnames";
import { ROUTES } from "@utils/routes";
import { useUserAuth } from "@contexts/user.context";

interface SignUpFormProps {
  isPopup?: boolean;
  className?: string;
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  isPopup = true,
  className,
}) => {
  const { t } = useTranslation();
  const { signUp, loginSuccess, user, error, setError } = useUserAuth();
  const { closeModal, openModal } = useModalAction();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInputType>();

  function handleSignIn() {
    return openModal("LOGIN_VIEW");
  }
  function handleForgetPassword() {
    return openModal("FORGET_PASSWORD");
  }
  function onSubmit({ name, email, password }: SignUpInputType) {
    signUp(email, password);
  }
  return (
    <div
      className={cn(
        "flex bg-skin-fill mx-auto rounded-lg w-full lg:w-[1000px] 2xl:w-[1200px]",
        className
      )}
    >
      {isPopup === true && <CloseButton onClick={closeModal} />}
      <div className="flex bg-skin-fill mx-auto rounded-lg overflow-hidden w-full">
        <div className="md:w-[55%] xl:w-[60%] registration hidden md:block">
          <Image
            src="/images/registration.png"
            alt="sign up"
            width={800}
            height={620}
            objectFit="contain"
            className="w-full"
          />
        </div>
        <div className="w-full md:w-[45%] xl:w-[40%] py-6 sm:py-10 px-4 sm:px-8 lg:px-12  rounded-md shadow-dropDown flex flex-col justify-center">
          <div className="text-center mb-6 pt-2.5">
            <div onClick={closeModal}>
              <Logo />
            </div>

            <div className="text-sm sm:text-base text-body text-center mt-3 mb-1">
              {t("common:text-already-registered")}{" "}
              <button
                type="button"
                className="ms-1 text-sm sm:text-base text-skin-primary font-semibold hover:no-underline focus:outline-none"
                onClick={handleSignIn}
              >
                {t("common:text-sign-in-now")}
              </button>
            </div>
          </div>
          {loginSuccess ? (
            <div className="text-center text-green-900">
              <h1>Verify your Email Address</h1>
              <p>
                A verification email has been sent to
                <br />
                <span>
                  {" "}
                  <strong>{user.email}</strong>
                </span>
              </p>
              <span>
                Follow the instruction in the email to verify your account
              </span>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col justify-center"
              noValidate
            >
              <div className="flex flex-col space-y-4">
                <Input
                  label={t("forms:label-name")}
                  type="text"
                  placeholder="Enter your name !"
                  variant="outline"
                  {...register("name", {
                    required: "forms:name-required",
                  })}
                  error={errors.name?.message}
                />
                <Input
                  label={t("forms:label-email")}
                  type="email"
                  variant="outline"
                  placeholder="Enter your email !"
                  {...register("email", {
                    required: `${t("forms:email-required")}`,
                    pattern: {
                      value:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: t("forms:email-error"),
                    },
                  })}
                  error={errors.email?.message}
                />
                <PasswordInput
                  placeholder="Enter your password !"
                  label={t("forms:label-password")}
                  error={errors.password?.message}
                  {...register("password", {
                    required: `${t("forms:password-required")}`,
                  })}
                />

                <div className="relative">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full font-nunito px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-skin-primary rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-opacity-90"
                  >
                    {t("common:text-register")}
                  </button>
                </div>
              </div>
            </form>
          )}
          {error && (
            <Alert
              message={error}
              variant="error"
              closeable={true}
              className="mt-5"
              onClose={() => setError(null)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
