import { forwardRef } from 'react';
import CommonInputBar from '@/components/common/CommonInputBar';
import ErrorMessage from '@/components/common/ErrorMessage';

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string;
};

const HabitFormInput = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ id, label, error, ...rest }, ref) => (
    <div className="flex items-baseline gap-[8px]">
      <label
        htmlFor={id}
        className="w-[48px] text-body-md font-semibold text-dark-gray font-dohyeon"
      >
        {label}
      </label>
      <div className="flex flex-col gap-[4px]">
        <CommonInputBar
          className="w-[236px] h-[28px] text-body-sm border bg-light-gray rounded-full px-[14px] py-[4px] focus:outline-none focus:ring-1 focus:ring-main"
          id={id}
          ref={ref}
          {...rest}
        />
        <ErrorMessage>{error && error}</ErrorMessage>
      </div>
    </div>
  ),
);

export default HabitFormInput;
