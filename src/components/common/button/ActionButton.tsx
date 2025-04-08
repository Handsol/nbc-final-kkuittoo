import { ACTIONBUTTON_MODE } from '@/constants/mode.constants';
import { ButtonHTMLAttributes } from 'react';

type ActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  mode: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
};

/**
 * 다양한 스타일의 버튼을 생성하는 컴포넌트
 * @param {ActionButtonProps} props - 버튼 속성
 * @returns {JSX.Element} 스타일이 적용된 버튼
 *
 * @example
 * <ActionButton mode="primary" onClick={handleClick}>
 *   버튼이름
 * </ActionButton>
 */
const ActionButton = ({
  mode,
  children,
  className = '',
  disabled = false,
  ...props
}: ActionButtonProps) => {
  const baseStyle = 'py-2 rounded-full font-semibold transition-colors';

  let sizeStyle: string;
  let variantStyle: string;

  switch (mode) {
    case ACTIONBUTTON_MODE.PRIMARY:
      sizeStyle = 'px-6 text-sm';
      variantStyle = 'bg-gray-700 text-white hover:bg-gray-800';
      break;
    case ACTIONBUTTON_MODE.SECONDARY:
      sizeStyle = 'px-6 text-sm';
      variantStyle = 'bg-gray-300 text-black hover:bg-gray-400';
      break;
    case ACTIONBUTTON_MODE.FULL:
      sizeStyle = 'w-full text-sm';
      variantStyle = 'bg-gray-700 text-white hover:bg-gray-800';
      break;
    case ACTIONBUTTON_MODE.PRIMARY_SMALL:
      sizeStyle = 'px-4 text-xs';
      variantStyle = 'bg-gray-700 text-white hover:bg-gray-800';
      break;
    case ACTIONBUTTON_MODE.SECONDARY_SMALL:
      sizeStyle = 'px-4 text-xs';
      variantStyle = 'bg-gray-300 text-black hover:bg-gray-400';
      break;
    default:
      sizeStyle = 'px-6 text-sm';
      variantStyle = 'bg-gray-500 text-white hover:bg-gray-600';
      break;
  }

  const disabledStyle = disabled
    ? 'bg-gray-300 text-gray-400 cursor-not-allowed'
    : variantStyle;

  return (
    <button
      type={props.type || 'button'}
      disabled={disabled}
      className={`${baseStyle} ${sizeStyle} ${disabledStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ActionButton;
