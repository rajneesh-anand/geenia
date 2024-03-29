interface Props {
  message?: string | undefined;
}

export const Error = ({ message }: Props) => {
  return <p className="my-2 text-xs text-start text-red-500">{message!}</p>;
};

const ErrorMessage = ({ message }: Props) => {
  return (
    <div className="text-center mt-[80px] mb-[80px] ">
      <p className="bg-red-700 p-2 mx-auto max-w-sm min-w-min text-center text-lg text-white font-semibold rounded-sm">
        {message!}
      </p>
    </div>
  );
};

export default ErrorMessage;
