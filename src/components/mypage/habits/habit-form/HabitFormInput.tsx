import CommonInputBar from '@/components/common/CommonInputBar';

type InputFieldProps = {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

const HabitFormInput = ({
  id,
  label,
  placeholder,
  value,
  onChange,
  error,
}: InputFieldProps) => (
  <div className="flex items-start gap-4">
    <label
      htmlFor={id}
      className="w-20 text-xs font-semibold text-gray-700 shrink-0"
    >
      {label}
    </label>
    <div className="flex-1">
      <CommonInputBar
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <div className="min-h-4 mt-1">
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    </div>
  </div>
);

export default HabitFormInput;
