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
  const baseStyle = 'py-2 font-semibold transition-colors font-dohyeon';

  let sizeStyle: string;
  let variantStyle: string;

  switch (mode) {
    case ACTIONBUTTON_MODE.PRIMARY:
      sizeStyle = 'px-6 text-sm';
      variantStyle = 'bg-medium-gray text-white rounded-full ';
      break;
    case ACTIONBUTTON_MODE.SECONDARY:
      sizeStyle = 'px-6 text-sm';
      variantStyle = 'bg-light-gray text-black rounded-full';
      break;
    case ACTIONBUTTON_MODE.PRIMARY_SMALL:
      sizeStyle = 'px-4 text-xs';
      variantStyle = 'bg-medium-gray text-white rounded-full';
      break;
    case ACTIONBUTTON_MODE.SECONDARY_SMALL:
      sizeStyle = 'px-4 text-xs';
      variantStyle = 'bg-light-gray text-black ';
      break;
    case ACTIONBUTTON_MODE.ROUNDED_MD:
      sizeStyle = 'w-[180px] h-[40px] text-sm ';
      variantStyle = 'bg-main text-white rounded-md';
      break;
    case ACTIONBUTTON_MODE.LOGOUT:
      sizeStyle = 'px-4 text-sm';
      variantStyle = 'text-black';
      break;
    default:
      sizeStyle = 'px-6 text-sm';
      variantStyle = 'bg-medium-gray text-white rounded-full';
      break;
  }

  const disabledStyle = disabled
    ? 'bg-light-gray text-medium-gray cursor-not-allowed '
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
