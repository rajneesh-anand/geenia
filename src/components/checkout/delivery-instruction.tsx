import TextArea from "@components/ui/form/text-area";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import Text from "@components/ui/text";

interface ContactFormValues {
  instructionNote: string;
  default: boolean;
}

const DeliveryInstructions: React.FC<{ data?: any }> = ({ data }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: {
      instructionNote: data || "",
      default: data || false,
    },
  });

  function onSubmit(values: ContactFormValues) {
    // console.log(values, 'Delivery Note');
  }

  return (
    <div className="w-full">
      <div className="w-full  mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mb-6">
            <TextArea
              variant="normal"
              inputClassName="focus:border-2 focus:outline-none focus:border-skin-primary"
              label="forms:label-delivery-instructions-note"
              {...register("instructionNote")}
            />
          </div>
          <div className="mb-6">
            <input
              id="default-type"
              type="checkbox"
              className="form-checkbox w-5 h-5 border border-gray-300 rounded cursor-pointer transition duration-500 ease-in-out focus:ring-offset-0 hover:border-heading focus:outline-none focus:ring-0 focus-visible:outline-none focus:checked:bg-skin-primary hover:checked:bg-skin-primary checked:bg-skin-primary"
              {...register("default", { required: "Confirm the policy" })}
            />
            <label
              htmlFor="default-type"
              className="align-middle ms-3 font-medium text-skin-base text-15px"
            >
              {t("forms:label-leave-at-my-door")}
            </label>
            <Text className="ms-8 pt-2.5" variant="small">
              {t("common:text-selecting-this-option")}
            </Text>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeliveryInstructions;
