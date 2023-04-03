import { Fragment, useState, useEffect } from "react";
import PasswordInput from "@components/ui/form/password-input";
import { useForm, Controller } from "react-hook-form";
import Alert from "@components/ui/alert";
import { IoCheckmarkCircle } from "react-icons/io5";
import { useRouter } from "next/router";
import Link from "@components/ui/link";
import { useModalAction } from "@components/common/modal/modal.context";

interface FormValues {
  password: string;
}

export default function ResetPassword() {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const { closeModal, openModal } = useModalAction();

  const [errorMsg, setErrorMsg] = useState<string | undefined>("");
  const [passwordStatus, setPasswordStatus] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  function handleSignIn() {
    return openModal("LOGIN_VIEW");
  }

  useEffect(() => {
    const fetchTokenStatus = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_NODE_API}/auth/reset-password/${router.query.access}`
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
    };
    fetchTokenStatus();
  }, []);

  async function onSubmit(data: FormValues) {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NODE_API}/auth/reset-password/reset/${router.query.access}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: data.password }),
        }
      );

      const result = await res.json();
      if (res.status >= 400 && res.status < 600) {
        throw new Error(result.message);
      } else {
        setStatus("paymentSuccess");
      }
    } catch (error: any) {
      setErrorMsg(error.message);
    }
  }

  return (
    <div className="flex h-full justify-center items-center h-[300px]">
      <div className="w-[400px]">
        {status === "success" && (
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
            <div className="w-full mb-3 ">
              <PasswordInput
                label="Set Your New Password"
                variant="outline"
                placeholder="Reset Your Password"
                {...register("password", {
                  required: "You must set your password !",
                  pattern: {
                    value: /^(?=.*).{8,}$/,
                    message: "Invalid Password, minimum 8 characters  !",
                  },
                })}
                error={errors?.password?.message!}
              />
            </div>
            <div className="text-center mt-8 mb-8">
              <button className="px-6 py-2 text-sm text-blue-100 transition-colors duration-300 bg-blue-500 rounded-full shadow-md hover:bg-blue-600 shadow-blue-400/30">
                Reset Password
              </button>
            </div>
            {errorMsg && (
              <Alert
                message={errorMsg}
                variant="error"
                closeable={true}
                className="mt-5"
                onClose={() => setErrorMsg("")}
              />
            )}
          </form>
        )}
        {status === "failed" && (
          <div>
            <Alert
              message={errorMsg}
              variant="error"
              closeable={true}
              className="mt-5"
              onClose={() => setErrorMsg("")}
            />
          </div>
        )}

        {status === "paymentSuccess" && (
          <div className="text-center">
            <p>Password set successfully</p>
            <button onClick={handleSignIn}>Login </button>
          </div>
        )}
      </div>
    </div>
  );
}
