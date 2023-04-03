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
import { IoCheckmarkCircle } from "react-icons/io5";

type FormValues = {
  email: string;
};

const ForgetPasswordForm = () => {
  const [status, setStatus] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | undefined>("");
  const { t } = useTranslation();
  const { closeModal, openModal } = useModalAction();
  const [flag, setFlag] = useState(false);
  const { resetPassword, error, setError, user } = useUserAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  function handleSignIn() {
    return openModal("LOGIN_VIEW");
  }

  async function onSubmit(data: FormValues) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_API}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: data.email }),
        }
      );

      const result = await res.json();
      if (res.status >= 400 && res.status < 600) {
        throw new Error(result.message);
      } else {
        setStatus("success");
      }
    } catch (error: any) {
      setStatus("failed");
      setErrorMsg(error.message);
    }
  }

  return (
    <div className="py-6 px-5 sm:p-8 bg-skin-fill mx-auto rounded-lg w-full sm:w-96 md:w-450px">
      <CloseButton onClick={closeModal} />
      <div className="text-center mb-9 pt-2.5">
        <div onClick={closeModal}>
          <Logo />
        </div>
      </div>

      {status === "success" ? (
        <div className="flex items-center justify-center text-green-700 ">
          <span className="w-10 h-10 me-3 lg:me-4 rounded-full bg-skin-primary bg-opacity-20 flex items-center justify-center flex-shrink-0">
            <IoCheckmarkCircle className="w-5 h-5 text-skin-primary" />
          </span>
          Password reset link has been sent to your email address. The Link is
          valid for 10 minutes only.
        </div>
      ) : (
        <>
          <div className="text-center">
            <p className="text-sm md:text-base text-body mt-3 sm:mt-4 mb-8 sm:mb-10">
              {t("common:forgot-password-helper")}
            </p>
          </div>
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
          {errorMsg && (
            <Alert
              message={error}
              variant="error"
              closeable={true}
              className="mt-5"
              onClose={() => setErrorMsg("")}
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