import { InputHTMLAttributes, ReactNode } from 'react';
import { SELECTBUTTON_MODE } from '@/constants/mode.constants';

type HabitSelectButtonProps = InputHTMLAttributes<HTMLInputElement> & {
  mode: string;
  isSelected: boolean;
  children: ReactNode;
  disabled?: boolean;
  inputType?: 'checkbox' | 'radio';
  name?: string;
};

const HabitSelectButton = ({
  mode,
  isSelected,
  children,
  disabled = false,
  inputType = 'radio',
  name,
  onClick,
  ...props
}: HabitSelectButtonProps) => {
  const baseStyle =
    'border text-center cursor-pointer transition font-pretendard';

  let sizeStyle: string;
  let variantStyle: string;

  switch (mode) {
    case SELECTBUTTON_MODE.CATEGORY:
      sizeStyle = 'p-[8px] text-body-sm rounded-lg truncate';
      variantStyle = isSelected
        ? 'bg-sub-light text-main border-main'
        : 'bg-white text-dark-gray border-medium-gray hover:text-main hover:bg-sub hover:text-white';
      break;
    case SELECTBUTTON_MODE.DAY:
      sizeStyle =
        'w-[42px] h-[42px] flex items-center justify-center text-body-md rounded-full';
      variantStyle = isSelected
        ? 'bg-sub text-main border-main text-main'
        : 'bg-white text-medium-gray border-medium-gray hover:bg-sub hover:border-main hover:bg-sub hover:text-white';
      break;
    default:
      sizeStyle = 'min-w-[80px] text-xs';
      variantStyle = isSelected
        ? 'bg-main text-white'
        : 'bg-white text-dark-gray border-light-gray';
      break;
  }

  const disabledStyle = disabled
    ? 'bg-light-gray text-medium-gray cursor-not-allowed border-light-gray'
    : variantStyle;

  return (
    <label
      className={`
          ${baseStyle} ${sizeStyle} ${disabledStyle} 
          ${disabled ? 'pointer-events-none' : ''}
        `}
    >
      <input
        type={inputType}
        name={name}
        checked={isSelected}
        disabled={disabled}
        onChange={() => {}}
        className="hidden"
        {...props}
      />
      <span
        onClick={onClick}
        className="flex items-center justify-center w-full h-full"
      >
        {children}
      </span>
    </label>
  );
};

export default HabitSelectButton;
