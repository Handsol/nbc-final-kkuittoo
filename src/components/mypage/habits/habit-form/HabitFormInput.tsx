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
    <div className="flex items-baseline gap-2">
      <label
        htmlFor={id}
        className="w-12 text-body-md font-semibold text-dark-gray font-dohyeon"
      >
        {label}
      </label>
      <div className="flex flex-col gap-1">
        <CommonInputBar id={id} ref={ref} {...rest} />
        <ErrorMessage>{error && error}</ErrorMessage>
      </div>
    </div>
  ),
);

export default HabitFormInput;
