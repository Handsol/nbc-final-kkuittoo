import { InputHTMLAttributes, ReactNode } from 'react';
import { SELECTBUTTON_MODE } from '@/constants/mode.constants';

type SelectButtonProps = InputHTMLAttributes<HTMLInputElement> & {
  mode: string;
  isSelected: boolean;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  inputType?: 'checkbox' | 'radio';
  name?: string;
};

const SelectButton = ({
  mode,
  isSelected,
  children,
  className = '',
  disabled = false,
  inputType = 'radio',
  name,
  onClick,
  ...props
}: SelectButtonProps) => {
  const baseStyle =
    'px-2 py-1 rounded-full border text-xs text-center cursor-pointer transition font-pretendard';

  let sizeStyle: string;
  let variantStyle: string;

  switch (mode) {
    case SELECTBUTTON_MODE.CATEGORY:
      sizeStyle = 'min-w-[80px] text-xs';
      variantStyle = isSelected
        ? 'bg-main text-white'
        : 'bg-white text-dark-gray border-gray-300';
      break;
    case SELECTBUTTON_MODE.DAY:
      sizeStyle = 'w-[42px] h-[42px] flex items-center justify-center text-xs';
      variantStyle = isSelected
        ? 'bg-sub text-white border-none'
        : 'bg-white text-dark-gray border-light-gray';
      break;
    default:
      sizeStyle = 'min-w-[80px] text-xs';
      variantStyle = isSelected
        ? 'bg-main text-white'
        : 'bg-white text-dark-gray border-gray-300';
      break;
  }

  const disabledStyle = disabled
    ? 'bg-light-gray text-medium-gray cursor-not-allowed border-gray-300'
    : variantStyle;

  return (
    <label
      className={`
          ${baseStyle} ${sizeStyle} ${disabledStyle} ${className}
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

export default SelectButton;
