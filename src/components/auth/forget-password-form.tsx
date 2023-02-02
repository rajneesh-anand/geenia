import { useState, useEffect } from "react";
import Button from "@components/ui/button";
import Input from "@components/ui/form/input";
import Logo from "@components/ui/logo";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { useModalAction } from "@components/common/modal/modal.context";
import CloseButton from "@components/ui/close-button";
import { useUserAuth } from "@contexts/user.context";
import Alert from "@components/ui/alert";
type FormValues = {
  email: string;
};

const defaultValues = {
  email: "",
};

const ForgetPasswordForm = () => {
  const { t } = useTranslation();
  const { closeModal, openModal } = useModalAction();
  const [flag, setFlag] = useState(false);
  const { resetPassword, error, setError, user } = useUserAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });

  function handleSignIn() {
    return openModal("LOGIN_VIEW");
  }

  const onSubmit = ({ email }: FormValues) => {
    resetPassword(email);
    if (!error) {
      setFlag(true);
    }
  };

  return (
    <div className="py-6 px-5 sm:p-8 bg-skin-fill mx-auto rounded-lg w-full sm:w-96 md:w-450px">
      <CloseButton onClick={closeModal} />
      <div className="text-center mb-9 pt-2.5">
        <div onClick={closeModal}>
          <Logo />
        </div>
        <p className="text-sm md:text-base text-body mt-3 sm:mt-4 mb-8 sm:mb-10">
          {t("common:forgot-password-helper")}
        </p>
      </div>

      {flag ? (
        <div className="text-center text-green-900">
          <h1>Reset Your Password</h1>
          <p>
            A reset password email has been sent to
            <br />
            <span>
              {" "}
              <strong>{user?.email}</strong>
            </span>
          </p>
          <span>
            Follow the instruction in the email to reset your password
          </span>
        </div>
      ) : (
        <>
          <form
            onSubmit={handleSubmit((data) => onSubmit(data))}
            className="flex flex-col justify-center"
            noValidate
          >
            <Input
              label={t("forms:label-email")}
              type="email"
              variant="outline"
              className="mb-4"
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

            <button
              type="submit"
              className="inline-flex items-center justify-center w-full font-nunito px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-skin-primary rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-opacity-90"
            >
              {t("common:text-reset-password")}
            </button>
          </form>
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
      )}
      <div className="flex flex-col items-center justify-center relative text-sm text-heading mt-8 sm:mt-10 mb-6 sm:mb-7">
        <hr className="w-full border-gray-300" />
        <span className="absolute -top-2.5 px-2 bg-skin-fill">
          {t("common:text-or")}
        </span>
      </div>
      <div className="text-sm sm:text-15px text-skin-muted text-center">
        {t("common:text-back-to")}{" "}
        <button
          type="button"
          className="text-skin-base underline font-medium hover:no-underline focus:outline-none"
          onClick={handleSignIn}
        >
          {t("common:text-login")}
        </button>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;
