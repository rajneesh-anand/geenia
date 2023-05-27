import { forwardRef } from "react";
import ReactSelect, { Props } from "react-select";
import { selectStyles } from "./select.styles";

type Ref = any;

type SelectProps<P = {}> = {
  className?: string;
  labelClassName?: string;
  label?: string;
  name?: string;
  error?: string;
} & Props<P>;

const Select = forwardRef<Ref, SelectProps>(
  (
    { className = "block", label, name, error, labelClassName, ...rest },
    ref
  ) => {
    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={name}
            className="block text-gray-600 font-medium text-sm leading-none mb-3 cursor-pointer"
          >
            {label}
          </label>
        )}
        <ReactSelect ref={ref} styles={selectStyles} {...rest} />
        {error && <p className="my-2 text-[13px] text-rose-600">{error}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
export default Select;
